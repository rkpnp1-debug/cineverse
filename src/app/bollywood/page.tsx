import { MediaRow } from "@/components/MediaRow";
import { getBollywood } from "@/lib/api";

export const revalidate = 3600;

export default async function BollywoodPage() {
  const data = await getBollywood().catch(() => ({ results: [] }));
  return (
    <div className="pt-8">
      <h1 className="text-3xl font-bold px-4 sm:px-6 max-w-7xl mx-auto mb-2">Bollywood</h1>
      <p className="text-zinc-400 px-4 sm:px-6 max-w-7xl mx-auto mb-8">Hindi cinema · Indian films</p>
      <MediaRow title="Popular Bollywood" items={data.results || []} type="movie" />
    </div>
  );
}
