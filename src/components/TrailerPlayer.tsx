"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

type Video = {
  key: string;
  site: string;
  type: string;
  name: string;
};

function pickTrailer(videos?: Video[]) {
  const yt = videos?.filter((v) => v.site === "YouTube") || [];
  return (
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0] ||
    null
  );
}

/** Play button + optional modal (use in action row) */
export function PlayTrailerButton({
  videos,
  className = "",
}: {
  videos?: Video[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const trailer = pickTrailer(videos);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!trailer) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full bg-cinema-600 hover:bg-cinema-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cinema-600/30 transition"
        }
      >
        <Play className="h-4 w-4 fill-current" />
        Play Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Trailer player"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
              title={trailer.name || "Trailer"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}

/** Full in-page player section with video list */
export function TrailerEmbed({
  videos,
  title,
}: {
  videos?: Video[];
  title?: string;
}) {
  const yt = videos?.filter((v) => v.site === "YouTube") || [];
  const [active, setActive] = useState<string | null>(null);
  const trailer = pickTrailer(videos);
  const key = active || trailer?.key;

  if (!key) return null;

  return (
    <section className="mt-10" id="trailer">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Play className="h-5 w-5 text-cinema-500" />
        Trailer{title ? ` — ${title}` : ""}
      </h2>
      <div className="relative w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-2xl aspect-video">
        <iframe
          key={key}
          src={`https://www.youtube.com/embed/${key}?rel=0&modestbranding=1`}
          title={title || "Trailer"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
      {yt.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {yt.slice(0, 10).map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setActive(v.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                v.key === key
                  ? "bg-cinema-600 text-white"
                  : "bg-white/10 text-zinc-300 hover:bg-white/20"
              }`}
            >
              {v.type}: {(v.name || "Video").slice(0, 42)}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/** Convenience: button + embed together (place outside flex rows) */
export function TrailerPlayer({
  videos,
  title,
}: {
  videos?: Video[];
  title?: string;
}) {
  if (!pickTrailer(videos)) return null;
  return (
    <div className="w-full">
      <div className="mb-2">
        <PlayTrailerButton videos={videos} />
      </div>
      <TrailerEmbed videos={videos} title={title} />
    </div>
  );
}
