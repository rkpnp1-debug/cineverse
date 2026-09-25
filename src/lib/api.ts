const KEY = process.env.TMDB_API_KEY || "";
const BASE = "https://api.themoviedb.org/3";

async function tmdb<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(BASE + path);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

export type Media = {
  id: number; title?: string; name?: string; overview: string;
  poster_path: string | null; backdrop_path: string | null;
  release_date?: string; first_air_date?: string;
  vote_average: number; vote_count: number; popularity: number;
  original_language: string; media_type?: string; genre_ids?: number[];
};

export type Paginated = { page: number; results: Media[]; total_pages: number; total_results: number };

export const getTrending = (m: "all" | "movie" | "tv" = "all") => tmdb<Paginated>(`/trending/${m}/week`);
export const getPopularMovies = () => tmdb<Paginated>("/movie/popular");
export const getTopRatedMovies = () => tmdb<Paginated>("/movie/top_rated");
export const getUpcoming = () => tmdb<Paginated>("/movie/upcoming");
export const getNowPlaying = () => tmdb<Paginated>("/movie/now_playing");
export const getPopularTV = () => tmdb<Paginated>("/tv/popular");
export const getTopRatedTV = () => tmdb<Paginated>("/tv/top_rated");

/** Hindi / Bollywood discover — supports page + sort */
export const getBollywood = (
  page = 1,
  sortBy: string = "popularity.desc"
) =>
  tmdb<Paginated>("/discover/movie", {
    with_original_language: "hi",
    region: "IN",
    sort_by: sortBy,
    page: String(page),
    include_adult: "false",
  });

/** Fetch multiple pages of Bollywood and merge */
export async function getBollywoodMany(pages = 3, sortBy = "popularity.desc"): Promise<Media[]> {
  const requests = Array.from({ length: pages }, (_, i) =>
    getBollywood(i + 1, sortBy).catch(() => ({ results: [] as Media[] }))
  );
  const results = await Promise.all(requests);
  const seen = new Set<number>();
  const merged: Media[] = [];
  for (const r of results) {
    for (const m of r.results || []) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        merged.push(m);
      }
    }
  }
  return merged;
}

export const getHollywood = () =>
  tmdb<Paginated>("/discover/movie", {
    with_original_language: "en",
    region: "US",
    sort_by: "popularity.desc",
  });

export const getMovie = (id: number) =>
  tmdb<any>(`/movie/${id}`, {
    append_to_response: "videos,credits,similar,recommendations,reviews,external_ids",
  });
export const getTV = (id: number) =>
  tmdb<any>(`/tv/${id}`, {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  });
export const getPerson = (id: number) =>
  tmdb<any>(`/person/${id}`, { append_to_response: "combined_credits,external_ids" });
export const search = (q: string) =>
  tmdb<Paginated>("/search/multi", { query: q, include_adult: "false" });

export async function searchNews(q: string, size = 12) {
  try {
    const url = `https://freenewsapi.ai/v1/search?q=${encodeURIComponent(q)}&size=${size}&lang=en&sort=date&date=7d`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles || data.results || [];
  } catch {
    return [];
  }
}
export const getEntNews = () =>
  searchNews("movie OR film OR bollywood OR hollywood OR cinema OR series", 16);
export const getMovieNews = (t: string) => searchNews(`"${t}" movie OR film`, 8);
export const getPersonNews = (n: string) =>
  searchNews(`"${n}" actor OR actress OR director`, 8);
