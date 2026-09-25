import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPerson, getPersonNews } from "@/lib/api";
import { profileUrl, posterUrl, formatDate } from "@/lib/utils";

export const revalidate = 3600;

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let person: any;
  try { person = await getPerson(Number(id)); } catch { notFound(); }
  const news = await getPersonNews(person.name).catch(() => []);
  const credits = [...(person.combined_credits?.cast || [])]
    .sort((a: any, b: any) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 24);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="relative w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <Image src={profileUrl(person.profile_path, "h632")} alt={person.name} fill className="object-cover" sizes="224px" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{person.name}</h1>
          <p className="mt-1 text-zinc-400">{person.known_for_department}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
            {person.birthday && <span>Born {formatDate(person.birthday)}</span>}
            {person.place_of_birth && <span>{person.place_of_birth}</span>}
          </div>
          {person.biography && (
            <p className="mt-5 text-zinc-300 leading-relaxed max-w-3xl whitespace-pre-line line-clamp-[12]">{person.biography}</p>
          )}
        </div>
      </div>
      {credits.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Known For</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {credits.map((c: any) => {
              const isTV = c.media_type === "tv" || !!c.name;
              const title = isTV ? c.name : c.title;
              const href = isTV ? `/tv/${c.id}` : `/movie/${c.id}`;
              return (
                <Link key={`${c.id}-${c.credit_id || c.character}`} href={href} className="group">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-700">
                    <Image src={posterUrl(c.poster_path)} alt={title || ""} fill className="object-cover group-hover:scale-105 transition" sizes="120px" />
                  </div>
                  <p className="mt-1 text-xs font-medium line-clamp-2 group-hover:text-cinema-400">{title}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      {news.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">News about {person.name}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((a: any) => (
              <a key={a.id || a.url} href={a.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/5 bg-surface-800/50 p-4 hover:border-cinema-500/20 transition">
                <p className="text-xs text-zinc-500 mb-1">{a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}</p>
                <h3 className="text-sm font-medium line-clamp-2">{a.title}</h3>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
