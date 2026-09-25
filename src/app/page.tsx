import { Hero } from "@/components/Hero";
import { MediaRow } from "@/components/MediaRow";
import { getTrending, getPopularMovies, getTopRatedMovies, getUpcoming, getNowPlaying, getPopularTV, getBollywood, getHollywood, getEntNews } from "@/lib/api";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const [trending, popular, topRated, upcoming, nowPlaying, popularTV, bollywood, hollywood, news] = await Promise.all([
    getTrending().catch(() => ({ results: [] })),
    getPopularMovies().catch(() => ({ results: [] })),
    getTopRatedMovies().catch(() => ({ results: [] })),
    getUpcoming().catch(() => ({ results: [] })),
    getNowPlaying().catch(() => ({ results: [] })),
    getPopularTV().catch(() => ({ results: [] })),
    getBollywood().catch(() => ({ results: [] })),
    getHollywood().catch(() => ({ results: [] })),
    getEntNews().catch(() => []),
  ]);
  const hero = trending.results?.[0] || popular.results?.[0];
  return (
    <>
      {hero && <Hero item={hero} />}
      <div className="pt-8 space-y-2">
        <MediaRow title="Trending This Week" items={trending.results || []} href="/movies" />
        <MediaRow title="Now Playing" items={nowPlaying.results || []} type="movie" href="/movies" />
        <MediaRow title="Popular Movies" items={popular.results || []} type="movie" href="/movies" />
        <MediaRow title="Top Rated" items={topRated.results || []} type="movie" href="/movies" />
        <MediaRow title="Coming Soon" items={upcoming.results || []} type="movie" href="/movies" />
        <MediaRow title="Bollywood Hits" items={bollywood.results || []} type="movie" href="/bollywood" />
        <MediaRow title="Hollywood" items={hollywood.results || []} type="movie" href="/movies" />
        <MediaRow title="Popular TV Series" items={popularTV.results || []} type="tv" href="/tv" />
        {news.length > 0 && (
          <section className="mb-10 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2"><Newspaper className="h-6 w-6 text-cinema-500" />Entertainment News</h2>
              <Link href="/news" className="text-sm text-cinema-400 hover:text-cinema-300">All news →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {news.slice(0, 8).map((a: any) => (
                <a key={a.id || a.url} href={a.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/5 bg-surface-800/60 p-4 hover:border-cinema-500/30 transition">
                  <p className="text-xs text-zinc-500 mb-1">{a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}</p>
                  <h3 className="text-sm font-medium line-clamp-3 group-hover:text-cinema-300">{a.title}</h3>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
