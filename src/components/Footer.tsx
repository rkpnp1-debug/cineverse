import Link from "next/link";
import { Clapperboard } from "lucide-react";
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-800/50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2"><Clapperboard className="h-5 w-5 text-cinema-500" /><span className="font-semibold">CineVerse</span></div>
        <p className="text-center text-sm text-zinc-500 max-w-md">This product uses the TMDB API but is not endorsed or certified by TMDB. News via Free News API.</p>
        <div className="flex gap-4 text-sm text-zinc-400">
          <Link href="/movies" className="hover:text-white">Movies</Link>
          <Link href="/tv" className="hover:text-white">TV</Link>
          <Link href="/bollywood" className="hover:text-white">Bollywood</Link>
          <Link href="/news" className="hover:text-white">News</Link>
        </div>
      </div>
    </footer>
  );
}
