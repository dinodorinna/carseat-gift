import { ProductProps } from "../types/product";
import { normalizeEntries } from "../lib/interested";

interface LeaderBannerProps {
  leadingProduct?: ProductProps;
}

export default function LeaderBanner({ leadingProduct }: LeaderBannerProps) {
  const interestedList = normalizeEntries(leadingProduct?.interested);
  if (!leadingProduct || interestedList.length === 0) return null;

  const pricePerPerson = Math.round(
    leadingProduct.totalPrice / interestedList.length,
  );

  const colorCounts: Record<string, number> = {};
  for (const entry of interestedList) {
    if (!entry.color) continue;
    colorCounts[entry.color] = (colorCounts[entry.color] || 0) + 1;
  }
  const [topColorName, topColorCount] =
    Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0] || [];
  const topColorSwatch = leadingProduct.color?.find(
    (option) => option.name === topColorName,
  )?.swatch;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
      <div className="rounded-xl bg-blue-500 p-2.5 text-white">📈</div>
      <div className="text-sm">
        <span className="block font-semibold text-blue-900">
          แนวโน้มตอนนี้: {leadingProduct.name}
        </span>
        <span className="text-xs text-blue-700">
          คนสนใจมากที่สุด {interestedList.length} คน (ตกคนละ{" "}
          <b>{pricePerPerson.toLocaleString()} บาท</b>)
        </span>
        {topColorName && (
          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-700">
            🎨 สียอดนิยม: <b>{topColorName}</b> ({topColorCount} คน)
            {topColorSwatch && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={topColorSwatch}
                alt={topColorName}
                className="h-4 w-4 rounded-full border border-blue-200 object-cover"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
