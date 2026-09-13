"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  alt,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIndex(0);
        onClose();
      }
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const hasMultiple = images.length > 1;
  const goTo = (i: number) => setIndex((i + images.length) % images.length);
  const handleClose = () => {
    setIndex(0);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="ปิด"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20"
      >
        ×
      </button>

      <div
        className="relative h-[70vh] w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="รูปก่อนหน้า"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="รูปถัดไป"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm hover:bg-white"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`ไปที่รูปที่ ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
