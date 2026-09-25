import { MediaCard } from "./MediaCard";
import type { Media } from "@/lib/api";

export function MediaGrid({
  items,
  type = "movie",
}: {
  items: Media[];
  type?: "movie" | "tv";
}) {
  if (!items?.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 px-4 sm:px-6 max-w-7xl mx-auto">
      {items.map((item) => (
        <div key={item.id} className="w-full min-w-0">
          <div className="[&>a]:w-full">
            <MediaCard item={item} type={type} />
          </div>
        </div>
      ))}
    </div>
  );
}
