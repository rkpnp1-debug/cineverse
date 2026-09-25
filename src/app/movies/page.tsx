import { MediaRow } from "@/components/MediaRow";
import { getPopularMovies, getTopRatedMovies, getUpcoming, getNowPlaying, getHollywood } from "@/lib/api";

export const revalidate = 3600;

export default async function MoviesPage() {
  const [popular, top, upcoming, now, hollywood] = await Promise.all([
    getPopularMovies().catch(() => ({ results: [] })),
    getTopRatedMovies().catch(() => ({ results: [] })),
    getUpcoming().catch(() => ({ results: [] })),
    getNowPlaying().catch(() => ({ results: [] })),
    getHollywood().catch(() => ({ results: [] })),
  ]);
  return (
    <div className="pt-8">
      <h1 className="text-3xl font-bold px-4 sm:px-6 max-w-7xl mx-auto mb-8">Movies</h1>
      <MediaRow title="Now Playing" items={now.results || []} type="movie" />
      <MediaRow title="Popular" items={popular.results || []} type="movie" />
      <MediaRow title="Top Rated" items={top.results || []} type="movie" />
      <MediaRow title="Coming Soon" items={upcoming.results || []} type="movie" />
      <MediaRow title="Hollywood" items={hollywood.results || []} type="movie" />
    </div>
  );
}
