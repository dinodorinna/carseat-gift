"use client";

interface NoticeModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticeModal({
  message,
  isOpen,
  onClose,
}: NoticeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-3xl"></div>
        <p className="mb-4 text-sm text-slate-700">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
