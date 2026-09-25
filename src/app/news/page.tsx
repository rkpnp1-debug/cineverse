import { getEntNews } from "@/lib/api";
import { Newspaper } from "lucide-react";

export const revalidate = 1800;

export default async function NewsPage() {
  const news = await getEntNews().catch(() => []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Newspaper className="h-8 w-8 text-cinema-500" />Entertainment News</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((a: any) => (
          <a key={a.id || a.url} href={a.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/5 bg-surface-800/60 p-5 hover:border-cinema-500/30 transition">
            <p className="text-xs text-zinc-500 mb-2">{a.published_at ? new Date(a.published_at).toLocaleDateString("en-US", { dateStyle: "medium" }) : ""}</p>
            <h2 className="text-base font-semibold text-zinc-100 group-hover:text-cinema-300 line-clamp-3">{a.title}</h2>
            {a.description && <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{a.description}</p>}
          </a>
        ))}
      </div>
      {news.length === 0 && <p className="text-zinc-500">No news available right now. Try again later.</p>}
    </div>
  );
}
