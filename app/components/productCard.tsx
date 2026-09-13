"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductProps } from "../types/product";
import { normalizeEntries } from "../lib/interested";
import ImageLightbox from "./imageLightbox";

interface ProductCardProps {
  product: ProductProps;
  currentUser: string;
  onToggleInterest: (productId: number, color?: string) => void;
}

export default function ProductCard({
  product,
  currentUser,
  onToggleInterest,
}: ProductCardProps) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  const interestedList = normalizeEntries(product?.interested);
  const featuresList = product?.features || [];
  const imagesList = product?.images || [];
  const colorList = product?.color || [];

  const voteCount = interestedList.length;
  const pricePerPerson =
    voteCount > 0
      ? Math.round((product?.totalPrice || 0) / voteCount)
      : product?.totalPrice || 0;

  const myEntry = currentUser
    ? interestedList.find((entry) => entry.name === currentUser)
    : undefined;
  const isJoined = Boolean(myEntry);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    () => colorList[0]?.name,
  );
  const activeColor = myEntry?.color ?? selectedColor;

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition-all duration-200 ${
        isJoined
          ? "border-blue-500 ring-2 ring-blue-500/20"
          : "border-slate-100"
      }`}
    >
      {/* Thumbnail & Header */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`ดูรูป ${product.name}`}
          className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-28 sm:w-28"
        >
          {imagesList[0] && (
            <Image
              src={imagesList[0]}
              alt={product.name}
              fill
              sizes="112px"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-lg text-white opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
            🔍
          </span>
          {imagesList.length > 1 && (
            <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              +{imagesList.length - 1}
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h2 className="text-base font-bold leading-tight text-slate-800">
              {product.name}
            </h2>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${product.tagBg}`}
            >
              {product.tag}
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className={`text-xl font-bold ${
                isJoined ? "text-blue-600" : "text-emerald-600"
              }`}
            >
              ฿{pricePerPerson.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">/ คน</span>
          </div>
          <div className="text-[11px] text-slate-400">
            ราคารวม {product.totalPrice?.toLocaleString()} บาท
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            👥 สนใจแล้ว {voteCount} คน
          </div>
        </div>
      </div>

      {/* Colors */}
      {colorList.length > 0 && (
        <div className="mb-4 mt-4 flex items-start gap-3">
          <span className="mt-1.5 shrink-0 text-xs font-semibold text-slate-500">
            🎨 สี:
          </span>
          <div className="flex flex-wrap gap-3">
            {colorList.map((option) => {
              // ข้อมูลเก่าจาก Firebase อาจยังเป็น string ธรรมดา (ไม่มี swatch)
              const isLegacyFormat = typeof option === "string";
              const name = isLegacyFormat ? option : option.name;
              const swatch = isLegacyFormat ? undefined : option.swatch;
              const isSelected = activeColor === name;

              return (
                <button
                  key={name}
                  type="button"
                  disabled={isJoined}
                  onClick={() => setSelectedColor(name)}
                  aria-label={`เลือกสี ${name}`}
                  className="flex flex-col items-center gap-1 disabled:cursor-not-allowed"
                >
                  <div
                    className={`relative h-9 w-9 overflow-hidden rounded-full border-2 bg-slate-100 transition-all ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-slate-200"
                    }`}
                  >
                    {swatch && (
                      <Image
                        src={swatch}
                        alt={name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] ${isSelected ? "font-semibold text-blue-600" : "text-slate-500"}`}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Features */}
      <ul className="mb-5 space-y-2 text-xs text-slate-600">
        {featuresList.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> {feature}
          </li>
        ))}
      </ul>

      {/* Manual */}
      {product.manual && (
        <a
          href={product.manual}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
        >
          📄 คู่มือการใช้งาน
        </a>
      )}

      {/* Interested Members List */}
      <div className="mb-5 border-t border-dashed border-slate-100 pt-3">
        <div className="mb-2 text-xs text-slate-400">เพื่อนที่สนใจรุ่นนี้:</div>
        <div className="flex flex-wrap gap-1.5">
          {voteCount > 0 ? (
            interestedList.map((entry, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs ${
                  entry.name === currentUser
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                😊 {entry.name}
                {entry.color ? ` (${entry.color})` : ""}
              </span>
            ))
          ) : (
            <span className="text-xs italic text-slate-300">
              ยังไม่มีใครลงชื่อ
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onToggleInterest(product.id, selectedColor)}
        className={`w-full rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
          isJoined
            ? "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
            : "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
        }`}
      >
        {isJoined ? "✕ ยกเลิกสนใจรุ่นนี้" : "+ สนใจหารรุ่นนี้"}
      </button>

      <ImageLightbox
        images={imagesList}
        alt={product.name}
        isOpen={isLightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
