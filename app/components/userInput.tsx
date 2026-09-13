interface UserInputProps {
  currentUser: string;
}

export default function UserInput({ currentUser }: UserInputProps) {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className="whitespace-nowrap text-sm font-semibold text-slate-600">
        👤 ชื่อของคุณ:
      </span>
      <span className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
        {currentUser}
      </span>
    </div>
  );
}
