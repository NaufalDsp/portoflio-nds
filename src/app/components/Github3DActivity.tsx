import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  Activity,
  Award,
  Box,
  Flame,
  LayoutGrid,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import type {
  ContributionDay,
  ContributionStats,
} from "../services/githubService";

interface Github3DActivityProps {
  stats: ContributionStats;
  username: string;
}

const MONTH_NAMES_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTH_NAMES_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export function Github3DActivity({ stats, username }: Github3DActivityProps) {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Active view mode: starts strictly in "2d" as requested
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  // Morph progress in [0, 1]: 0 = 2D flat, 1 = 3D isometric
  const morphRef = useRef(0);
  const targetMorphRef = useRef(0);
  const [morphValue, setMorphValue] = useState(0);

  // Animation frame reference for continuous smooth transitions
  const animFrameRef = useRef<number | null>(null);

  // 3D camera angles
  const DEFAULT_YAW = 0.58; // ~33 degrees
  const DEFAULT_PITCH = 0.56; // ~32 degrees
  const [yaw, setYaw] = useState(DEFAULT_YAW);
  const [pitch, setPitch] = useState(DEFAULT_PITCH);

  // Drag interaction states
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({
    x: 0,
    y: 0,
    yaw: DEFAULT_YAW,
    pitch: DEFAULT_PITCH,
  });

  // Track if user manually locked to 2D
  const userManualOverride = useRef(false);

  // Hovered day tooltip
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    screenX: number;
    screenY: number;
  } | null>(null);

  // Build 53 columns x 7 days grid
  const gridData = useMemo(() => {
    const list = stats.contributions;
    if (!list || list.length === 0) return [];

    const cols: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    const firstDate = new Date(list[0].date);
    const startDayOfWeek = firstDate.getDay();

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (let i = 0; i < list.length; i++) {
      currentWeek.push(list[i]);
      if (currentWeek.length === 7) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      cols.push(currentWeek);
    }

    return cols;
  }, [stats.contributions]);

  // Identify month positions along weeks
  const monthLabels = useMemo(() => {
    const labels: { weekIndex: number; name: string }[] = [];
    let lastMonth = -1;

    gridData.forEach((week, wIndex) => {
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const d = new Date(validDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          lastMonth = m;
          const name =
            language === "id" ? MONTH_NAMES_ID[m] : MONTH_NAMES_EN[m];
          labels.push({ weekIndex: wIndex, name });
        }
      }
    });

    return labels;
  }, [gridData, language]);

  // Palette customized for portfolio theme (Teal/Emerald Spectrum)
  const colors = useMemo(() => {
    if (isDark) {
      return {
        level0Top: "#172023",
        level0WallRight: "#131a1c",
        level0WallLeft: "#0e1315",
        level0Stroke: "rgba(255, 255, 255, 0.05)",

        level1Top: "#1b4d3e",
        level1WallRight: "#143a2f",
        level1WallLeft: "#0e2921",

        level2Top: "#147d76",
        level2WallRight: "#0f615c",
        level2WallLeft: "#0b4642",

        level3Top: "#2dd4bf",
        level3WallRight: "#14b8a6",
        level3WallLeft: "#0d9488",

        level4Top: "#5eead4",
        level4WallRight: "#2dd4bf",
        level4WallLeft: "#14b8a6",

        hoverHighlight: "#f0fdfa",
        textMuted: "#697982",
        gridLine: "rgba(255, 255, 255, 0.04)",
      };
    } else {
      return {
        level0Top: "#edf2f4",
        level0WallRight: "#dfe5e8",
        level0WallLeft: "#cfd6da",
        level0Stroke: "rgba(0, 0, 0, 0.05)",

        level1Top: "#a7f3d0",
        level1WallRight: "#86efac",
        level1WallLeft: "#6ee7b7",

        level2Top: "#34d399",
        level2WallRight: "#10b981",
        level2WallLeft: "#059669",

        level3Top: "#0d9488",
        level3WallRight: "#0f766e",
        level3WallLeft: "#115e59",

        level4Top: "#047857",
        level4WallRight: "#065f46",
        level4WallLeft: "#064e3b",

        hoverHighlight: "#0f172a",
        textMuted: "#64748b",
        gridLine: "rgba(0, 0, 0, 0.03)",
      };
    }
  }, [isDark]);

  // Date formatter
  const formatDateStr = useCallback(
    (dateStr: string, options?: Intl.DateTimeFormatOptions) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      const locale = language === "id" ? "id-ID" : "en-US";
      return d.toLocaleDateString(
        locale,
        options || { month: "short", day: "numeric" },
      );
    },
    [language],
  );

  // Main Canvas Rendering with Continuous Smooth 2D <-> 3D Morph Interpolation
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const cols = gridData.length;
    if (cols === 0) return;

    const M = morphRef.current; // 0 = 2D flat chart, 1 = 3D isometric landscape

    // 2D Layout parameters
    const cell2D = Math.min(13, Math.floor((width - 64) / cols));
    const gap2D = 2.5;
    const startX_2D = (width - cols * (cell2D + gap2D)) / 2;
    const startY_2D = (height - 7 * (cell2D + gap2D)) / 2 + 12;

    // 3D Layout parameters
    const centerX_3D = width * 0.49;
    const centerY_3D = height * 0.53;
    const wCenter = cols / 2;
    const dCenter = 3.5;
    const step3D = Math.min(13.2, width / 72);
    const halfTile3D = (step3D * 0.8) / 2;

    // Build interpolated pillars
    interface InterpolatedPillar {
      day: ContributionDay | null;
      w: number;
      d: number;
      depth: number;
      cornersGround: { x: number; y: number }[];
      cornersTop: { x: number; y: number }[];
      heightZ: number;
    }

    const pillars: InterpolatedPillar[] = [];

    gridData.forEach((week, w) => {
      week.forEach((day, d) => {
        // --- 2D Coordinates ---
        const x2D = startX_2D + w * (cell2D + gap2D);
        const y2D = startY_2D + d * (cell2D + gap2D);
        const corners2D = [
          { x: x2D, y: y2D },
          { x: x2D + cell2D, y: y2D },
          { x: x2D + cell2D, y: y2D + cell2D },
          { x: x2D, y: y2D + cell2D },
        ];

        // --- 3D Coordinates ---
        const u = (w - wCenter) * step3D;
        const v = (d - dCenter) * step3D;
        const uRot = u * Math.cos(yaw) - v * Math.sin(yaw);
        const vRot = u * Math.sin(yaw) + v * Math.cos(yaw);

        const cornerOffsets3D = [
          { x: -halfTile3D, y: -halfTile3D },
          { x: halfTile3D, y: -halfTile3D },
          { x: halfTile3D, y: halfTile3D },
          { x: -halfTile3D, y: halfTile3D },
        ];

        const corners3D_Ground = cornerOffsets3D.map((off) => {
          const cu = u + off.x;
          const cv = v + off.y;
          const cuRot = cu * Math.cos(yaw) - cv * Math.sin(yaw);
          const cvRot = cu * Math.sin(yaw) + cv * Math.cos(yaw);
          return {
            x: centerX_3D + (cuRot - cvRot) * Math.cos(Math.PI / 6),
            y: centerY_3D + (cuRot + cvRot) * Math.sin(pitch),
          };
        });

        // 3D Height extrusion (scaled by morph factor M)
        const fullHeight =
          day && day.count > 0 ? 8 + Math.min(day.count, 28) * 2.7 : 2.5;
        const currentHeightZ = fullHeight * M;

        const corners3D_Top = corners3D_Ground.map((pt) => ({
          x: pt.x,
          y: pt.y - currentHeightZ,
        }));

        // --- Smooth Morph Linear Interpolation (2D <-> 3D) ---
        const cornersGround = corners2D.map((c2, idx) => ({
          x: c2.x * (1 - M) + corners3D_Ground[idx].x * M,
          y: c2.y * (1 - M) + corners3D_Ground[idx].y * M,
        }));

        const cornersTop = corners2D.map((c2, idx) => ({
          x: c2.x * (1 - M) + corners3D_Top[idx].x * M,
          y: c2.y * (1 - M) + corners3D_Top[idx].y * M,
        }));

        // Depth metric for painter's algorithm
        const depth = (uRot + vRot) * M + (w * 0.01 + d) * (1 - M);

        pillars.push({
          day,
          w,
          d,
          depth,
          cornersGround,
          cornersTop,
          heightZ: currentHeightZ,
        });
      });
    });

    // In 3D sort back-to-front so pillars properly occlude
    if (M > 0.05) {
      pillars.sort((a, b) => a.depth - b.depth);
    }

    // Helper: color selection by contribution level
    const getPillarColors = (level: number) => {
      switch (level) {
        case 1:
          return {
            top: colors.level1Top,
            right: colors.level1WallRight,
            left: colors.level1WallLeft,
          };
        case 2:
          return {
            top: colors.level2Top,
            right: colors.level2WallRight,
            left: colors.level2WallLeft,
          };
        case 3:
          return {
            top: colors.level3Top,
            right: colors.level3WallRight,
            left: colors.level3WallLeft,
          };
        case 4:
          return {
            top: colors.level4Top,
            right: colors.level4WallRight,
            left: colors.level4WallLeft,
          };
        default:
          return {
            top: colors.level0Top,
            right: colors.level0WallRight,
            left: colors.level0WallLeft,
          };
      }
    };

    // Draw all pillars
    pillars.forEach((p) => {
      const { day, cornersGround, cornersTop, heightZ } = p;
      const isHovered = hoveredDay && hoveredDay.day.date === day?.date;
      const level = day ? day.level : 0;
      const pColors = getPillarColors(level);

      // Draw 3D side walls only when height is extruded
      if (heightZ > 0.3) {
        // Wall edges: 4 quad faces connecting Top to Ground
        for (let i = 0; i < 4; i++) {
          const next = (i + 1) % 4;
          const p1 = cornersTop[i];
          const p2 = cornersTop[next];
          const p3 = cornersGround[next];
          const p4 = cornersGround[i];

          // Face normal 2D cross-product check: draw only front-facing walls
          const cross = (p2.x - p1.x) * (p4.y - p1.y) - (p2.y - p1.y) * (p4.x - p1.x);
          if (cross > 0) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();

            // Right vs Left wall shading
            ctx.fillStyle = i % 2 === 0 ? pColors.right : pColors.left;
            ctx.fill();

            ctx.strokeStyle = isHovered
              ? colors.hoverHighlight
              : isDark
                ? "rgba(0,0,0,0.3)"
                : "rgba(255,255,255,0.4)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw Top Face (or Flat 2D Tile)
      ctx.beginPath();
      ctx.moveTo(cornersTop[0].x, cornersTop[0].y);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(cornersTop[i].x, cornersTop[i].y);
      }
      ctx.closePath();

      if (isHovered) {
        ctx.fillStyle = colors.hoverHighlight;
      } else {
        ctx.fillStyle = pColors.top;
      }
      ctx.fill();

      // Top face borders
      if (level === 0 || isHovered) {
        ctx.strokeStyle = isHovered
          ? colors.hoverHighlight
          : colors.level0Stroke;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    // Draw Weekday Labels in 2D (Mon, Wed, Fri) on the left of 2D grid
    if (M < 0.7 && startX_2D >= 26) {
      const alpha = Math.max(0, 1 - M / 0.7);
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = isDark
        ? `rgba(105, 121, 130, ${alpha * 0.85})`
        : `rgba(100, 116, 139, ${alpha * 0.85})`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";

      const weekdays = [
        { d: 1, name: language === "id" ? "Sen" : "Mon" },
        { d: 3, name: language === "id" ? "Rab" : "Wed" },
        { d: 5, name: language === "id" ? "Jum" : "Fri" },
      ];

      weekdays.forEach((dl) => {
        const y2D = startY_2D + dl.d * (cell2D + gap2D) + cell2D / 2;
        ctx.fillText(dl.name, startX_2D - 6, y2D);
      });
    }

    // Draw Month Labels with Smooth Morph Interpolation
    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = colors.textMuted;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    monthLabels.forEach((label) => {
      // 2D label position directly above the corresponding week column
      const x2D = startX_2D + label.weekIndex * (cell2D + gap2D) + cell2D / 2;
      const y2D = startY_2D - 12;

      // 3D label position along outer baseline
      const u = (label.weekIndex - wCenter) * step3D;
      const v = (7.6 - dCenter) * step3D;
      const uRot = u * Math.cos(yaw) - v * Math.sin(yaw);
      const vRot = u * Math.sin(yaw) + v * Math.cos(yaw);
      const x3D = centerX_3D + (uRot - vRot) * Math.cos(Math.PI / 6);
      const y3D = centerY_3D + (uRot + vRot) * Math.sin(pitch) + 8;

      const lx = x2D * (1 - M) + x3D * M;
      const ly = y2D * (1 - M) + y3D * M;

      ctx.fillText(label.name, lx, ly);
    });
  }, [
    gridData,
    monthLabels,
    yaw,
    pitch,
    hoveredDay,
    colors,
    isDark,
    language,
  ]);

  // Ultra-smooth Continuous Damped Animation Loop (RAF)
  const startMorphAnimation = useCallback(() => {
    if (animFrameRef.current !== null) return; // loop already running

    const step = () => {
      const diff = targetMorphRef.current - morphRef.current;
      if (Math.abs(diff) > 0.001) {
        // Soft organic spring damping
        morphRef.current += diff * 0.07;
        setMorphValue(morphRef.current);
        renderCanvas();
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        morphRef.current = targetMorphRef.current;
        setMorphValue(morphRef.current);
        renderCanvas();
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [renderCanvas]);

  // Explicit View Mode Setter (with Smooth Damped Spring Animation)
  const handleSetMode = useCallback(
    (newMode: "2d" | "3d") => {
      userManualOverride.current = true;
      setViewMode(newMode);
      targetMorphRef.current = newMode === "3d" ? 1 : 0;
      startMorphAnimation();
    },
    [startMorphAnimation],
  );

  // Reset Camera Angles to Default
  const handleResetCamera = useCallback(() => {
    setYaw(DEFAULT_YAW);
    setPitch(DEFAULT_PITCH);
    renderCanvas();
  }, [renderCanvas]);

  // Reset from 3D to 2D
  const handleResetTo2D = useCallback(() => {
    userManualOverride.current = true;
    handleResetCamera();
    handleSetMode("2d");
  }, [handleResetCamera, handleSetMode]);

  // Window resize listener to keep canvas sharp
  useEffect(() => {
    const handleResize = () => {
      renderCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderCanvas]);

  // Initial draw
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Pointer interactions (Drag to Orbit in 3D, or Drag in 2D to engage 3D)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw,
      pitch,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      // If dragging while in 2D, smoothly engage 3D view!
      if (viewMode === "2d" && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        handleSetMode("3d");
      }

      if (morphRef.current > 0.15) {
        setYaw(dragStartRef.current.yaw + dx * 0.007);
        setPitch(
          Math.max(
            0.22,
            Math.min(0.95, dragStartRef.current.pitch + dy * 0.005),
          ),
        );
        renderCanvas();
      }
      setHoveredDay(null);
      return;
    }

    // Hover detection on interpolated grid
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const M = morphRef.current;
    const cols = gridData.length;
    if (cols === 0) return;

    const cell2D = Math.min(13, Math.floor((rect.width - 64) / cols));
    const gap2D = 2.5;
    const startX_2D = (rect.width - cols * (cell2D + gap2D)) / 2;
    const startY_2D = (rect.height - 7 * (cell2D + gap2D)) / 2 + 12;

    const centerX_3D = rect.width * 0.49;
    const centerY_3D = rect.height * 0.53;
    const wCenter = cols / 2;
    const dCenter = 3.5;
    const step3D = Math.min(13.2, rect.width / 72);

    let closest: { day: ContributionDay; dist: number } | null = null;

    gridData.forEach((week, w) => {
      week.forEach((day, d) => {
        if (!day) return;

        // 2D center
        const x2D = startX_2D + w * (cell2D + gap2D) + cell2D / 2;
        const y2D = startY_2D + d * (cell2D + gap2D) + cell2D / 2;

        // 3D center
        const u = (w - wCenter) * step3D;
        const v = (d - dCenter) * step3D;
        const uRot = u * Math.cos(yaw) - v * Math.sin(yaw);
        const vRot = u * Math.sin(yaw) + v * Math.cos(yaw);
        const x3D = centerX_3D + (uRot - vRot) * Math.cos(Math.PI / 6);
        const heightZ =
          day.count > 0 ? (8 + Math.min(day.count, 28) * 2.7) * M : 2.5 * M;
        const y3D = centerY_3D + (uRot + vRot) * Math.sin(pitch) - heightZ;

        // Interpolated center
        const px = x2D * (1 - M) + x3D * M;
        const py = y2D * (1 - M) + y3D * M;

        const dist = Math.hypot(mouseX - px, mouseY - py);
        if (dist < 11 && (!closest || dist < closest.dist)) {
          closest = { day, dist };
        }
      });
    });

    if (closest) {
      setHoveredDay({
        day: (closest as any).day,
        screenX: mouseX,
        screenY: mouseY,
      });
    } else {
      setHoveredDay(null);
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleDoubleClick = () => {
    if (viewMode === "3d") {
      handleResetTo2D();
    } else {
      handleSetMode("3d");
    }
  };

  return (
    <div
      ref={stageRef}
      className="relative flex flex-col rounded-2xl border p-5 sm:p-8 shadow-sm transition-all overflow-hidden"
      style={{
        background: "var(--portfolio-surface)",
        borderColor: "var(--portfolio-border)",
      }}>
      {/* Header: Title, Telemetry, and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: "var(--portfolio-accent)" }}>
              {language === "id"
                ? "Spektrum Aktivitas Interaktif"
                : "Interactive Activity Spectrum"}
            </span>
          </div>
          <h3
            className="text-xl sm:text-2xl font-extrabold tracking-tight"
            style={{ color: "var(--portfolio-text)" }}>
            {stats.totalLastYear}{" "}
            {language === "id"
              ? "Kontribusi Tahun Ini"
              : "Contributions This Year"}
          </h3>
        </div>

        {/* Header Controls: Clean 2D / 3D Switcher + Camera Reset */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div
            className="flex items-center rounded-xl border p-1"
            style={{
              background: "var(--portfolio-surface-raised)",
              borderColor: "var(--portfolio-border)",
            }}>
            <button
              type="button"
              onClick={() => handleSetMode("2d")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "2d"
                  ? "bg-[var(--portfolio-surface)] text-[var(--portfolio-text)] shadow-xs"
                  : "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]"
              }`}>
              <LayoutGrid size={13} />
              <span>2D Grid</span>
            </button>
            <button
              type="button"
              onClick={() => handleSetMode("3d")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "3d"
                  ? "bg-[var(--portfolio-accent)] text-[var(--portfolio-accent-contrast)] shadow-xs"
                  : "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]"
              }`}>
              <Box size={13} />
              <span>3D Isometrik</span>
            </button>
          </div>

          {viewMode === "3d" && (
            <button
              type="button"
              onClick={handleResetCamera}
              title={language === "id" ? "Reset Sudut Kamera" : "Reset Camera Angle"}
              className="flex items-center justify-center h-8 w-8 rounded-lg border text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)] transition-colors"
              style={{
                background: "var(--portfolio-surface-raised)",
                borderColor: "var(--portfolio-border)",
              }}>
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Telemetry Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Card 1: Yearly Total */}
        <div
          className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-colors"
          style={{
            background: "var(--portfolio-surface-raised)",
            borderColor: "var(--portfolio-border)",
          }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--portfolio-muted)]">
              {language === "id" ? "Total Output" : "Yearly Output"}
            </span>
            <Activity
              size={14}
              className="text-[var(--portfolio-accent)] shrink-0"
            />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--portfolio-text)]">
            {stats.totalLastYear}
          </div>
          <span className="text-[11px] text-[var(--portfolio-muted)] truncate mt-0.5">
            {formatDateStr(stats.startDate, { month: "short", year: "numeric" })} –{" "}
            {formatDateStr(stats.endDate, { month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Card 2: Busiest Day */}
        <div
          className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-colors"
          style={{
            background: "var(--portfolio-surface-raised)",
            borderColor: "var(--portfolio-border)",
          }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--portfolio-muted)]">
              {language === "id" ? "Puncak Harian" : "Peak Day"}
            </span>
            <Sparkles
              size={14}
              className="text-emerald-500 shrink-0"
            />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
            {stats.busiestDay.count}{" "}
            <span className="text-xs font-normal text-[var(--portfolio-muted)]">
              {language === "id" ? "komit" : "commits"}
            </span>
          </div>
          <span className="text-[11px] text-[var(--portfolio-muted)] truncate mt-0.5">
            {formatDateStr(stats.busiestDay.date, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Card 3: Longest Streak */}
        <div
          className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-colors"
          style={{
            background: "var(--portfolio-surface-raised)",
            borderColor: "var(--portfolio-border)",
          }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--portfolio-muted)]">
              {language === "id" ? "Streak Rekor" : "Longest Run"}
            </span>
            <Award
              size={14}
              className="text-amber-500 shrink-0"
            />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--portfolio-text)]">
            {stats.longestStreak.days}{" "}
            <span className="text-xs font-normal text-[var(--portfolio-muted)]">
              {language === "id" ? "hari" : "days"}
            </span>
          </div>
          <span className="text-[11px] text-[var(--portfolio-muted)] truncate mt-0.5">
            {formatDateStr(stats.longestStreak.startDate)} –{" "}
            {formatDateStr(stats.longestStreak.endDate)}
          </span>
        </div>

        {/* Card 4: Current Momentum */}
        <div
          className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border transition-colors"
          style={{
            background: "var(--portfolio-surface-raised)",
            borderColor: "var(--portfolio-border)",
          }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--portfolio-muted)]">
              {language === "id" ? "Momentum Kini" : "Current Run"}
            </span>
            <Flame
              size={14}
              className="text-orange-500 shrink-0"
            />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[var(--portfolio-text)]">
            {stats.currentStreak.days}{" "}
            <span className="text-xs font-normal text-[var(--portfolio-muted)]">
              {language === "id" ? "hari aktif" : "active days"}
            </span>
          </div>
          <span className="text-[11px] text-[var(--portfolio-muted)] truncate mt-0.5">
            {formatDateStr(stats.currentStreak.startDate)} –{" "}
            {formatDateStr(stats.currentStreak.endDate)}
          </span>
        </div>
      </div>

      {/* The Stage: Interactive Morphing Canvas */}
      <div
        className="relative w-full overflow-hidden rounded-xl border p-2 sm:p-4"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 50%, rgba(20, 125, 118, 0.08), transparent 75%), rgba(0,0,0,0.22)"
            : "radial-gradient(ellipse at 50% 50%, rgba(20, 125, 118, 0.04), transparent 75%), rgba(240, 244, 246, 0.5)",
          borderColor: "var(--portfolio-border)",
        }}>
        {/* Floating In-Canvas Action Pill (Reset to 2D / Orbit Hint) */}
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
          {viewMode === "3d" ? (
            <button
              type="button"
              onClick={handleResetTo2D}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-text)",
              }}>
              <RotateCcw size={12} className="text-teal-500" />
              <span>{language === "id" ? "Reset ke 2D" : "Reset to 2D"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSetMode("3d")}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-muted)",
              }}>
              <Sparkles size={12} className="text-amber-500" />
              <span>{language === "id" ? "Buka 3D" : "View in 3D"}</span>
            </button>
          )}
        </div>

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          className="h-[320px] sm:h-[390px] w-full select-none touch-pan-y cursor-grab active:cursor-grabbing"
          style={{ width: "100%" }}
        />

        {/* Holographic Tooltip */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.94 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none absolute z-30 rounded-xl border px-3.5 py-2.5 text-xs shadow-2xl backdrop-blur-xl"
              style={{
                left: `${hoveredDay.screenX}px`,
                top: `${hoveredDay.screenY - 45}px`,
                transform: "translate(-50%, -100%)",
                background: "var(--portfolio-surface)",
                borderColor: "var(--portfolio-border)",
                color: "var(--portfolio-text)",
              }}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      hoveredDay.day.level === 0
                        ? colors.level0Top
                        : hoveredDay.day.level === 1
                          ? colors.level1Top
                          : hoveredDay.day.level === 2
                            ? colors.level2Top
                            : hoveredDay.day.level === 3
                              ? colors.level3Top
                              : colors.level4Top,
                  }}
                />
                <span className="font-bold text-sm leading-tight text-emerald-600 dark:text-emerald-400">
                  {hoveredDay.day.count}{" "}
                  {language === "id" ? "kontribusi" : "contributions"}
                </span>
              </div>
              <p className="font-mono text-[11px] text-[var(--portfolio-muted)] leading-tight">
                {formatDateStr(hoveredDay.day.date, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info & Gradient Intensity Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--portfolio-muted)]">
        <div className="flex items-center gap-2">
          {viewMode === "3d" ? (
            <span>
              {language === "id"
                ? "Tahan & geser untuk rotasi 360° • Klik 'Reset ke 2D' untuk kembali"
                : "Drag to orbit 360° • Click 'Reset to 2D' to return"}
            </span>
          ) : (
            <span>
              {language === "id"
                ? "Geser kanvas atau klik tombol untuk melihat bentuk 3D"
                : "Drag canvas or click button to view 3D landscape"}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5">
          <span>{language === "id" ? "Rendah" : "Low"}</span>
          <div
            className="h-3 w-3 rounded-xs border"
            style={{
              background: colors.level0Top,
              borderColor: colors.level0Stroke,
            }}
          />
          <div
            className="h-3 w-3 rounded-xs"
            style={{ background: colors.level1Top }}
          />
          <div
            className="h-3 w-3 rounded-xs"
            style={{ background: colors.level2Top }}
          />
          <div
            className="h-3 w-3 rounded-xs"
            style={{ background: colors.level3Top }}
          />
          <div
            className="h-3 w-3 rounded-xs"
            style={{ background: colors.level4Top }}
          />
          <span>{language === "id" ? "Tinggi" : "High"}</span>
        </div>
      </div>
    </div>
  );
}
