import slugifyLib from "slugify";

export function slugify(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateReadTime(content: unknown): number {
  // Estimate read time from TipTap JSON content
  const text = extractTextFromContent(content);
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function extractTextFromContent(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  
  const n = node as Record<string, unknown>;
  
  if (n.type === "text" && typeof n.text === "string") {
    return n.text;
  }

  if (Array.isArray(n.content)) {
    return n.content.map(extractTextFromContent).join(" ");
  }

  return "";
}

export function getWordCount(content: unknown): number {
  const text = extractTextFromContent(content);
  return text.split(/\s+/).filter(Boolean).length;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
