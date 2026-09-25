"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Clapperboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv", label: "TV" },
  { href: "/bollywood", label: "Bollywood" },
  { href: "/news", label: "News" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setQ("");
      setOpen(false);
    }
  }
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cinema-500 to-cinema-700">
            <Clapperboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">CineVerse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", pathname === href ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5")}>{label}</Link>
          ))}
        </nav>
        <form onSubmit={onSearch} className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies, series, people..." className="w-full rounded-full border border-white/10 bg-surface-800 py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-cinema-500 focus:outline-none focus:ring-1 focus:ring-cinema-500" />
          </div>
        </form>
        <button type="button" className="md:hidden p-2 text-zinc-400" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-2">
          <form onSubmit={onSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="w-full rounded-full border border-white/10 bg-surface-800 py-2.5 pl-10 pr-4 text-sm" />
            </div>
          </form>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={cn("block rounded-lg px-3 py-2.5 text-sm", pathname === href ? "bg-white/10 text-white" : "text-zinc-400")}>{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
