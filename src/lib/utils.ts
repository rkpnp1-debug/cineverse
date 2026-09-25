import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatRuntime(m?: number | null) {
  if (!m) return "—";
  const h = Math.floor(m / 60), min = m % 60;
  return h ? `${h}h ${min}m` : `${min}m`;
}
export function formatDate(d?: string | null) {
  if (!d) return "TBA";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
export function formatMoney(a?: number | null) {
  if (!a) return "—";
  if (a >= 1e9) return `$${(a / 1e9).toFixed(1)}B`;
  if (a >= 1e6) return `$${(a / 1e6).toFixed(1)}M`;
  return `$${a.toLocaleString()}`;
}
const BASE = "https://image.tmdb.org/t/p";
export function posterUrl(p: string | null, s = "w342") {
  return p ? `${BASE}/${s}${p}` : "/placeholder.svg";
}
export function backdropUrl(p: string | null, s = "w1280") {
  return p ? `${BASE}/${s}${p}` : null;
}
export function profileUrl(p: string | null, s = "w185") {
  return p ? `${BASE}/${s}${p}` : "/placeholder.svg";
}
