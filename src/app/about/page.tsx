import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Clapperboard,
  Code2,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About CineVerse and its creator Ram Kumar — built for movie lovers with TMDB data and modern web tech.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cinema-500 to-cinema-700 shadow-lg shadow-cinema-500/30">
          <Clapperboard className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">About CineVerse</h1>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A modern movie & TV discovery platform — Bollywood, Hollywood, ratings, trailers, and entertainment news — built for cinephiles.
        </p>
      </div>

      {/* Creator card */}
      <section className="rounded-2xl border border-white/10 bg-surface-800/60 p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-3xl font-bold text-white ring-2 ring-white/10">
            RK
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white">Ram Kumar</h2>
            <p className="mt-1 text-cinema-400 font-medium">Creator of CineVerse</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cinema-500" />
                Gurugram, Haryana, India
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-cinema-500" />
                Publicis Sapient · since Jun 2022
              </span>
            </div>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              Publicis Sapient has been my professional home since June 2022. I build products and experiments
              at the intersection of software engineering and real user experience — CineVerse is one of those:
              a clean, fast, IMDb-style experience powered by open data (TMDB) and free news APIs.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/rkpnp1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] px-4 py-2 text-sm font-semibold text-white transition"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
              <a
                href="https://github.com/rkpnp1-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-semibold text-white transition"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & skills from LinkedIn public profile */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-cinema-500" />
          Experience & background
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-surface-800/40 p-5">
            <p className="font-semibold text-white">Publicis Sapient</p>
            <p className="text-sm text-zinc-400 mt-0.5">Professional home since June 2022</p>
            <p className="text-sm text-zinc-500 mt-2">
              Building digital products and engineering solutions in a global consultancy environment.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-surface-800/40 p-5">
            <p className="font-semibold text-white">Accenture</p>
            <p className="text-sm text-zinc-400 mt-0.5">Experience listed on LinkedIn</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-cinema-500" />
          Certifications & learning
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-xl border border-white/5 bg-surface-800/40 p-4 flex gap-3">
            <Cloud className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Microsoft Certified: Azure Fundamentals</p>
              <p className="text-xs text-zinc-500 mt-0.5">Issued Jun 2022 · Microsoft</p>
            </div>
          </li>
          <li className="rounded-xl border border-white/5 bg-surface-800/40 p-4 flex gap-3">
            <Code2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Java</p>
              <p className="text-xs text-zinc-500 mt-0.5">Informatics Computer Institute</p>
            </div>
          </li>
          <li className="rounded-xl border border-white/5 bg-surface-800/40 p-4 flex gap-3">
            <Code2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Android Programming</p>
              <p className="text-xs text-zinc-500 mt-0.5">Course</p>
            </div>
          </li>
          <li className="rounded-xl border border-white/5 bg-surface-800/40 p-4 flex gap-3">
            <Award className="h-5 w-5 text-cinema-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Digital Marketing Basics</p>
              <p className="text-xs text-zinc-500 mt-0.5">Issued Aug 2017 · DigitalDeepak.com</p>
            </div>
          </li>
        </ul>
      </section>

      {/* About the product */}
      <section className="mb-10 rounded-2xl border border-cinema-500/20 bg-cinema-950/20 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-white mb-3">Why CineVerse?</h2>
        <p className="text-zinc-300 leading-relaxed mb-4">
          Movie discovery should feel cinematic — not cluttered. CineVerse focuses on clean browsing,
          accurate metadata from TMDB, in-page trailers, Bollywood & Hollywood discovery, actor pages,
          and related entertainment news — all in one place.
        </p>
        <ul className="text-sm text-zinc-400 space-y-2 list-disc list-inside">
          <li>Data from The Movie Database (TMDB) — not endorsed or certified by TMDB</li>
          <li>News via free open news APIs</li>
          <li>Built with Next.js, TypeScript, and Tailwind CSS</li>
          <li>Open source on GitHub under rkpnp1-debug</li>
        </ul>
      </section>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-cinema-600 hover:bg-cinema-500 px-6 py-2.5 text-sm font-semibold text-white transition"
        >
          Explore movies
        </Link>
        <p className="mt-6 text-xs text-zinc-600">
          Profile details sourced from{" "}
          <a
            href="https://www.linkedin.com/in/rkpnp1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-cinema-400 underline-offset-2 hover:underline"
          >
            linkedin.com/in/rkpnp1
          </a>
        </p>
      </div>
    </div>
  );
}
