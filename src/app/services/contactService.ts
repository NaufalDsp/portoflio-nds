export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormspreeResponse {
  errors?: Array<{ message: string }>;
}

export async function sendContactMessage(message: ContactMessage) {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  if (!endpoint) {
    throw new Error(
      "The contact form is not configured yet. Please contact me directly by email.",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const result = (await response
    .json()
    .catch(() => null)) as FormspreeResponse | null;

  if (!response.ok) {
    const formspreeError = result?.errors
      ?.map(({ message: errorMessage }) => errorMessage)
      .join(" ");

    throw new Error(formspreeError || "Unable to send your message.");
  }
}
