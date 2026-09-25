"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

type Video = {
  key: string;
  site: string;
  type: string;
  name: string;
};

export function TrailerPlayer({
  videos,
  title,
}: {
  videos?: Video[];
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const youtubeVideos =
    videos?.filter((v) => v.site === "YouTube") || [];
  const trailer =
    youtubeVideos.find((v) => v.type === "Trailer") ||
    youtubeVideos.find((v) => v.type === "Teaser") ||
    youtubeVideos[0];

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

  const playKey = activeKey || trailer.key;

  function openPlayer(key?: string) {
    setActiveKey(key || trailer!.key);
    setOpen(true);
  }

  return (
    <>
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openPlayer()}
          className="inline-flex items-center gap-2 rounded-full bg-cinema-600 hover:bg-cinema-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cinema-600/30 transition"
        >
          <Play className="h-4 w-4 fill-current" />
          Play Trailer
        </button>
        {youtubeVideos.length > 1 && (
          <span className="self-center text-xs text-zinc-500">
            {youtubeVideos.length} videos available
          </span>
        )}
      </div>

      {/* Inline embed section (always visible when trailer exists) */}
      <section className="mt-10" id="trailer">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Play className="h-5 w-5 text-cinema-500" />
          Trailer{title ? ` — ${title}` : ""}
        </h2>
        <div className="relative w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 shadow-2xl aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
            title={trailer.name || "Trailer"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        </div>

        {youtubeVideos.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {youtubeVideos.slice(0, 8).map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => openPlayer(v.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  v.key === trailer.key
                    ? "bg-cinema-600 text-white"
                    : "bg-white/10 text-zinc-300 hover:bg-white/20"
                }`}
              >
                {v.type}: {v.name?.slice(0, 40) || "Video"}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Fullscreen modal player */}
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
              src={`https://www.youtube.com/embed/${playKey}?autoplay=1&rel=0&modestbranding=1`}
              title="Trailer"
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
