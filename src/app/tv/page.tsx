import { MediaRow } from "@/components/MediaRow";
import { getPopularTV, getTopRatedTV } from "@/lib/api";

export const revalidate = 3600;

export default async function TVPage() {
  const [popular, top] = await Promise.all([
    getPopularTV().catch(() => ({ results: [] })),
    getTopRatedTV().catch(() => ({ results: [] })),
  ]);
  return (
    <div className="pt-8">
      <h1 className="text-3xl font-bold px-4 sm:px-6 max-w-7xl mx-auto mb-8">TV Series</h1>
      <MediaRow title="Popular Series" items={popular.results || []} type="tv" />
      <MediaRow title="Top Rated Series" items={top.results || []} type="tv" />
    </div>
  );
}
