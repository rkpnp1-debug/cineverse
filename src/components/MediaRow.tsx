import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MediaCard } from "./MediaCard";
import type { Media } from "@/lib/api";

export function MediaRow({ title, items, href, type }: { title: string; items: Media[]; href?: string; type?: "movie" | "tv" }) {
  if (!items?.length) return null;
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        {href && <Link href={href} className="flex items-center gap-1 text-sm text-cinema-400 hover:text-cinema-300 font-medium">View all <ChevronRight className="h-4 w-4" /></Link>}
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 pb-2">
          {items.slice(0, 16).map((item) => <MediaCard key={item.id + (type || "")} item={item} type={type} />)}
        </div>
      </div>
    </section>
  );
}
