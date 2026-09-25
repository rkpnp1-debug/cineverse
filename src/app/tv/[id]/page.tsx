import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Calendar } from "lucide-react";
import { getTV, getMovieNews } from "@/lib/api";
import { posterUrl, backdropUrl, profileUrl, formatDate } from "@/lib/utils";
import { MediaRow } from "@/components/MediaRow";
import { TrailerPlayer } from "@/components/TrailerPlayer";

export const revalidate = 3600;

export default async function TVPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let show: any;
  try {
    show = await getTV(Number(id));
  } catch {
    notFound();
  }
  const news = await getMovieNews(show.name).catch(() => []);
  const bg = backdropUrl(show.backdrop_path);
  const videos = show.videos?.results || [];

  return (
    <div>
      <div className="relative h-[50vh] min-h-[320px]">
        {bg && <Image src={bg} alt="" fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/70 to-surface-900/40" />
      </div>
      <div className="relative z-10 -mt-40 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={posterUrl(show.poster_path, "w500")}
                alt={show.name}
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{show.name}</h1>
            {show.tagline && <p className="mt-1 text-lg italic text-zinc-400">{show.tagline}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {show.vote_average > 0 && (
                <span className="flex items-center gap-1.5 rounded-full rating-badge px-3 py-1 font-bold text-white">
                  <Star className="h-4 w-4 fill-current" />
                  {show.vote_average.toFixed(1)}
                </span>
              )}
              <span className="flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {formatDate(show.first_air_date)}
              </span>
              <span className="text-zinc-400">
                {show.number_of_seasons} Seasons · {show.number_of_episodes} Episodes
              </span>
              {show.status && (
                <span className="rounded bg-white/10 px-2 py-0.5 text-xs uppercase">{show.status}</span>
              )}
            </div>
            {show.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {show.genres.map((g: any) => (
                  <span key={g.id} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-5 text-zinc-300 leading-relaxed max-w-3xl">{show.overview}</p>
            <div className="mt-6">
              <TrailerPlayer videos={videos} title={show.name} />
            </div>
          </div>
        </div>

        {show.credits?.cast?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-2">
                {show.credits.cast.slice(0, 16).map((p: any) => (
                  <Link key={p.id} href={`/person/${p.id}`} className="w-28 shrink-0 group">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-700">
                      <Image
                        src={profileUrl(p.profile_path)}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <p className="mt-1.5 text-sm font-medium line-clamp-1 group-hover:text-cinema-400">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-500 line-clamp-1">{p.character}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        {news.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Related News</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((a: any) => (
                <a
                  key={a.id || a.url}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/5 bg-surface-800/50 p-4 hover:border-cinema-500/20 transition"
                >
                  <p className="text-xs text-zinc-500 mb-1">
                    {a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}
                  </p>
                  <h3 className="text-sm font-medium line-clamp-2">{a.title}</h3>
                </a>
              ))}
            </div>
          </section>
        )}
        {show.similar?.results?.length > 0 && (
          <div className="mt-12 -mx-4 sm:-mx-6">
            <MediaRow title="More Like This" items={show.similar.results} type="tv" />
          </div>
        )}
      </div>
    </div>
  );
}
