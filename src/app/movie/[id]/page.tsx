import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Clock, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { getMovie, getMovieNews } from "@/lib/api";
import { posterUrl, backdropUrl, profileUrl, formatRuntime, formatDate, formatMoney } from "@/lib/utils";
import { MediaRow } from "@/components/MediaRow";
import { TrailerPlayer } from "@/components/TrailerPlayer";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const m = await getMovie(Number(id));
    return { title: m.title, description: m.overview?.slice(0, 160) };
  } catch {
    return { title: "Movie" };
  }
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let movie: any;
  try {
    movie = await getMovie(Number(id));
  } catch {
    notFound();
  }
  const news = await getMovieNews(movie.title).catch(() => []);
  const director = movie.credits?.crew?.find((c: any) => c.job === "Director");
  const bg = backdropUrl(movie.backdrop_path);
  const videos = movie.videos?.results || [];

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
                src={posterUrl(movie.poster_path, "w500")}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
          </div>
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{movie.title}</h1>
            {movie.tagline && <p className="mt-1 text-lg italic text-zinc-400">{movie.tagline}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1.5 rounded-full rating-badge px-3 py-1 font-bold text-white">
                  <Star className="h-4 w-4 fill-current" />
                  {movie.vote_average.toFixed(1)}
                  <span className="font-normal opacity-80">({movie.vote_count?.toLocaleString()})</span>
                </span>
              )}
              <span className="flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {formatDate(movie.release_date)}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Clock className="h-4 w-4" />
                {formatRuntime(movie.runtime)}
              </span>
              {movie.status && (
                <span className="rounded bg-white/10 px-2 py-0.5 text-xs uppercase">{movie.status}</span>
              )}
            </div>
            {movie.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genres.map((g: any) => (
                  <span key={g.id} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-5 text-zinc-300 leading-relaxed max-w-3xl">{movie.overview}</p>
            <div className="mt-5 flex flex-wrap gap-6 text-sm">
              {director && (
                <div>
                  <span className="text-zinc-500">Director</span>
                  <p className="text-white font-medium">
                    <Link href={`/person/${director.id}`} className="hover:text-cinema-400">
                      {director.name}
                    </Link>
                  </p>
                </div>
              )}
              {movie.budget > 0 && (
                <div>
                  <span className="text-zinc-500">Budget</span>
                  <p className="text-white font-medium flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {formatMoney(movie.budget)}
                  </p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <span className="text-zinc-500">Revenue</span>
                  <p className="text-white font-medium flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5" />
                    {formatMoney(movie.revenue)}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TrailerPlayer videos={videos} title={movie.title} />
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold"
                >
                  <ExternalLink className="h-4 w-4" />
                  IMDb
                </a>
              )}
            </div>
          </div>
        </div>

        {/* TrailerPlayer also renders the embed section below buttons via its own section */}

        {movie.credits?.cast?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-2">
                {movie.credits.cast.slice(0, 16).map((p: any) => (
                  <Link key={p.id} href={`/person/${p.id}`} className="w-28 shrink-0 group">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-700">
                      <Image
                        src={profileUrl(p.profile_path)}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="112px"
                      />
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-zinc-200 line-clamp-1 group-hover:text-cinema-400">
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
        {movie.similar?.results?.length > 0 && (
          <div className="mt-12 -mx-4 sm:-mx-6">
            <MediaRow title="More Like This" items={movie.similar.results} type="movie" />
          </div>
        )}
      </div>
    </div>
  );
}
