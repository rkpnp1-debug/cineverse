import Link from "next/link";
import Image from "next/image";
import { Play, Star, Info } from "lucide-react";
import { backdropUrl, formatDate } from "@/lib/utils";
import type { Media } from "@/lib/api";

export function Hero({ item }: { item: Media }) {
  const isTV = !!item.name;
  const title = isTV ? item.name! : item.title!;
  const date = isTV ? item.first_air_date : item.release_date;
  const href = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
  const bg = backdropUrl(item.backdrop_path);
  return (
    <section className="relative h-[70vh] min-h-[420px] max-h-[680px] w-full overflow-hidden">
      {bg && <Image src={bg} alt="" fill priority className="object-cover" sizes="100vw" />}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-900 via-surface-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-surface-900/40" />
      <div className="relative z-10 flex h-full max-w-7xl mx-auto items-end px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-cinema-400">Featured</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            {item.vote_average > 0 && <span className="flex items-center gap-1 font-semibold text-amber-400"><Star className="h-4 w-4 fill-current" />{item.vote_average.toFixed(1)}</span>}
            <span>{formatDate(date)}</span>
            {item.original_language && <span className="uppercase rounded bg-white/10 px-2 py-0.5 text-xs">{item.original_language}</span>}
          </div>
          <p className="mt-4 line-clamp-3 text-base text-zinc-300 max-w-xl">{item.overview}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-cinema-600 hover:bg-cinema-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cinema-600/30 transition"><Info className="h-4 w-4" />Details</Link>
            <Link href={href} className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-6 py-2.5 text-sm font-semibold text-white transition"><Play className="h-4 w-4" />Trailers</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
