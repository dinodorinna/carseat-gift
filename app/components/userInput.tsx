interface UserInputProps {
  currentUser: string;
  onUserChange: (name: string) => void;
}

export default function UserInput({
  currentUser,
  onUserChange,
}: UserInputProps) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row">
      <label
        htmlFor="username"
        className="whitespace-nowrap text-sm font-semibold text-slate-600"
      >
        👤 ชื่อของคุณ:
      </label>
      <input
        id="username"
        type="text"
        value={currentUser}
        onChange={(e) => onUserChange(e.target.value)}
        placeholder="ใส่ชื่อของคุณ"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
