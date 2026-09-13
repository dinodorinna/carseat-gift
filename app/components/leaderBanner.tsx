import { ProductProps } from "../types/product";

interface LeaderBannerProps {
  leadingProduct?: ProductProps;
}

export default function LeaderBanner({ leadingProduct }: LeaderBannerProps) {
  const interestedList = leadingProduct?.interested || [];
  if (!leadingProduct || interestedList.length === 0) return null;

  const pricePerPerson = Math.round(
    leadingProduct.totalPrice / (interestedList.length ?? 0),
  );

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
      <div className="rounded-xl bg-blue-500 p-2.5 text-white">📈</div>
      <div className="text-sm">
        <span className="block font-semibold text-blue-900">
          แนวโน้มตอนนี้: {leadingProduct.name}
        </span>
        <span className="text-xs text-blue-700">
          คนสนใจมากที่สุด {interestedList?.length ?? 0} คน (ตกคนละ{" "}
          <b>{pricePerPerson.toLocaleString()} บาท</b>)
        </span>
      </div>
    </div>
  );
}
