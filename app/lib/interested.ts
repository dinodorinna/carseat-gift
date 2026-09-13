import { InterestedEntry } from "../types/product";

// ข้อมูลเก่าจาก Firebase อาจยังเป็น string ธรรมดา (ไม่มี color)
export function normalizeEntry(entry: InterestedEntry | string): InterestedEntry {
  return typeof entry === "string" ? { name: entry } : entry;
}

export function normalizeEntries(
  entries: (InterestedEntry | string)[] | undefined,
): InterestedEntry[] {
  return (entries || []).map(normalizeEntry);
}
