# CineVerse 🎬

World-class IMDb / TMDB-style movie & TV discovery platform.

**Features**
- Trending, Popular, Top Rated, Now Playing, Upcoming
- Bollywood (Hindi / India) & Hollywood discovery
- Full movie & TV detail pages (cast, crew, trailers, ratings, budget, similar)
- Actor / person pages with filmography
- Real-time entertainment news (Free News API – no key)
- Beautiful dark cinematic UI, responsive, fast (Next.js App Router + ISR)
- Search across movies, series & people

**Live:** Deployed on Vercel  
**Data:** [TMDB](https://www.themoviedb.org/) + [Free News API](https://freenewsapi.ai)

## Setup

1. Clone & install
```bash
git clone https://github.com/rkpnp1-debug/cineverse.git
cd cineverse
npm install
```

2. Get a free TMDB API key  
   → https://www.themoviedb.org/settings/api  
   Create `.env.local`:
```
TMDB_API_KEY=your_api_key_here
```

3. Run
```bash
npm run dev
```

4. Deploy to Vercel  
   - Import the GitHub repo  
   - Add environment variable `TMDB_API_KEY`  
   - Deploy

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB.
