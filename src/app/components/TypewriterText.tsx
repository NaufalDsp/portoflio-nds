import { useEffect, useState, type CSSProperties } from "react";

interface TypewriterTextProps {
  words: readonly string[];
  className?: string;
  style?: CSSProperties;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterText({
  words,
  className,
  style,
  typingSpeed = 85,
  deletingSpeed = 45,
  pauseDuration = 1_500,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex] ?? "";
    const wordIsComplete = displayedText === currentWord;
    const wordIsEmpty = displayedText.length === 0;

    const delay = !isDeleting && wordIsComplete
      ? pauseDuration
      : isDeleting
        ? deletingSpeed
        : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && wordIsComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && wordIsEmpty) {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        return;
      }

      const nextLength = displayedText.length + (isDeleting ? -1 : 1);
      setDisplayedText(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    displayedText,
    isDeleting,
    pauseDuration,
    typingSpeed,
    wordIndex,
    words,
  ]);

  return (
    <p className={className} style={style}>
      <span aria-hidden="true">
        {displayedText}
        <span className="ml-1 animate-pulse" aria-hidden="true">
          |
        </span>
      </span>
      <span className="sr-only">{words.join(" and ")}</span>
    </p>
  );
}
