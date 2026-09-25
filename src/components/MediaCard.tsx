import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { posterUrl, formatDate } from "@/lib/utils";
import type { Media } from "@/lib/api";

export function MediaCard({ item, type }: { item: Media; type?: "movie" | "tv" }) {
  const isTV = type === "tv" || item.media_type === "tv" || !!item.name;
  const title = isTV ? item.name! : item.title!;
  const date = isTV ? item.first_air_date : item.release_date;
  const href = isTV ? `/tv/${item.id}` : `/movie/${item.id}`;
  return (
    <Link href={href} className="poster-card group block w-full sm:w-[160px] shrink-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface-700 shadow-lg">
        <Image
          src={posterUrl(item.poster_path)}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, 160px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full rating-badge px-2 py-0.5 text-xs font-bold text-white">
            <Star className="h-3 w-3 fill-current" />
            {item.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-zinc-100 line-clamp-2 group-hover:text-cinema-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">{formatDate(date)}</p>
      </div>
    </Link>
  );
}
