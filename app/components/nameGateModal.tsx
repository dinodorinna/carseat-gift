"use client";

import { useState, type FormEvent } from "react";

interface NameGateModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export default function NameGateModal({ isOpen, onSubmit }: NameGateModalProps) {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <div className="mb-3 text-3xl">👋</div>
        <h2 className="mb-1 text-base font-bold text-slate-800">
          ก่อนเริ่มใช้งาน
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          กรุณาระบุชื่อของคุณ เพื่อใช้ในการโหวตและหารค่าใช้จ่าย
          (ระบุครั้งเดียว แก้ไขภายหลังไม่ได้)
        </p>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ใส่ชื่อของคุณ"
          className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          เริ่มใช้งาน
        </button>
      </form>
    </div>
  );
}
