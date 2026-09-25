import { MediaRow } from "@/components/MediaRow";
import { MediaGrid } from "@/components/MediaGrid";
import { getBollywood, getBollywoodMany } from "@/lib/api";

export const revalidate = 3600;

export default async function BollywoodPage() {
  const [popular, topRated, latest, classics, more] = await Promise.all([
    getBollywoodMany(2, "popularity.desc").catch(() => []),
    getBollywoodMany(2, "vote_average.desc").catch(() => []),
    getBollywoodMany(2, "primary_release_date.desc").catch(() => []),
    getBollywood(1, "vote_count.desc").then((r) => r.results || []).catch(() => []),
    getBollywoodMany(3, "popularity.desc").catch(() => []),
  ]);

  // Top rated with a minimum vote count filter applied client-side for quality
  const topRatedFiltered = topRated.filter((m) => (m.vote_count || 0) >= 50);

  return (
    <div className="pt-8 pb-12">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white">Bollywood</h1>
        <p className="text-zinc-400 mt-1">
          Hindi cinema · Indian films — popular, top rated, latest releases & more
        </p>
      </div>

      <MediaRow title="Popular Bollywood" items={popular} type="movie" />
      <MediaRow
        title="Top Rated Hindi Films"
        items={topRatedFiltered.length ? topRatedFiltered : topRated}
        type="movie"
      />
      <MediaRow title="Latest Releases" items={latest} type="movie" />
      <MediaRow title="Most Voted / Classics" items={classics} type="movie" />

      <section className="mt-12">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Browse more Bollywood</h2>
          <p className="text-sm text-zinc-500 mt-1">
            {more.length} films · sorted by popularity
          </p>
        </div>
        <MediaGrid items={more} type="movie" />
      </section>
    </div>
  );
}
