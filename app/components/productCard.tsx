"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductProps } from "../types/product";
import ImageLightbox from "./imageLightbox";

interface ProductCardProps {
  product: ProductProps;
  currentUser: string;
  onToggleInterest: (productId: number) => void;
}

export default function ProductCard({
  product,
  currentUser,
  onToggleInterest,
}: ProductCardProps) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const voteCount = product?.interested?.length;
  const pricePerPerson =
    voteCount > 0
      ? Math.round(product.totalPrice / voteCount)
      : product.totalPrice;
  const isJoined = product?.interested?.includes(currentUser);

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
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-lg text-white opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
            🔍
          </span>
          {product.images.length > 1 && (
            <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              +{product.images.length - 1}
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
              className={`text-xl font-bold ${isJoined ? "text-blue-600" : "text-emerald-600"}`}
            >
              ฿{pricePerPerson.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">/ คน</span>
          </div>
          <div className="text-[11px] text-slate-400">
            ราคารวม {product.totalPrice.toLocaleString()} บาท
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            👥 สนใจแล้ว {voteCount} คน
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="mb-5 mt-4 space-y-2 text-xs text-slate-600">
        {product.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span> {feature}
          </li>
        ))}
      </ul>

      {/* Manual */}
      <a
        href={product.manual}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-5 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
      >
        📄 คู่มือการใช้งาน
      </a>

      {/* Interested Members List */}
      <div className="mb-5 border-t border-dashed border-slate-100 pt-3">
        <div className="mb-2 text-xs text-slate-400">เพื่อนที่สนใจรุ่นนี้:</div>
        <div className="flex flex-wrap gap-1.5">
          {voteCount > 0 ? (
            product?.interested?.map((name, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs ${
                  name === currentUser
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                😊 {name}
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
        onClick={() => onToggleInterest(product.id)}
        className={`w-full rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
          isJoined
            ? "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
            : "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
        }`}
      >
        {isJoined ? "✕ ยกเลิกสนใจรุ่นนี้" : "+ สนใจหารรุ่นนี้"}
      </button>

      <ImageLightbox
        images={product.images}
        alt={product.name}
        isOpen={isLightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
