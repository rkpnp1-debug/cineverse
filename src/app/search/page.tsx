import { search } from "@/lib/api";
import { MediaCard } from "@/components/MediaCard";
import Link from "next/link";
import Image from "next/image";
import { profileUrl } from "@/lib/utils";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  if (!q) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400">Type something in the search bar</div>;
  }
  const data = await search(q).catch(() => ({ results: [] }));
  const movies = data.results?.filter((r: any) => r.media_type === "movie") || [];
  const tv = data.results?.filter((r: any) => r.media_type === "tv") || [];
  const people = data.results?.filter((r: any) => r.media_type === "person") || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-8">Results for “{q}”</h1>
      {movies.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Movies</h2>
          <div className="flex flex-wrap gap-4">
            {movies.map((m: any) => <MediaCard key={m.id} item={m} type="movie" />)}
          </div>
        </section>
      )}
      {tv.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">TV Series</h2>
          <div className="flex flex-wrap gap-4">
            {tv.map((t: any) => <MediaCard key={t.id} item={t} type="tv" />)}
          </div>
        </section>
      )}
      {people.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">People</h2>
          <div className="flex flex-wrap gap-4">
            {people.map((p: any) => (
              <Link key={p.id} href={`/person/${p.id}`} className="w-28 group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-700">
                  <Image src={profileUrl(p.profile_path)} alt={p.name} fill className="object-cover" sizes="112px" />
                </div>
                <p className="mt-1.5 text-sm font-medium group-hover:text-cinema-400 line-clamp-2">{p.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {!movies.length && !tv.length && !people.length && (
        <p className="text-zinc-500">No results found.</p>
      )}
    </div>
  );
}
