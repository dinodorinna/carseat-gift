import { ProductProps } from "../types/product";

export const initialProducts: ProductProps[] = [
  {
    id: 1,
    name: "Alfi รุ่น Cosco-9",
    tag: "รุ่นท็อป / ออปชันครบ",
    features: [
      "เหมาะกับ 0-12 ปี",
      "หมุนได้ 360 องศา",
      "ผ้ากันไรฝุ่น กันแบคทีเรีย",
      "หลังคากัน UV",
      "ที่พักเท้า/ขานิรภัย",
      "รองรับ ISOFIX & Belt",
    ],
    color: [
      { name: "Navy Blue", swatch: "/images/colors/g408-navy.avif" },
      { name: "Silver Grey", swatch: "/images/colors/g408-gray.avif" },
    ],
    totalPrice: 5340,
    interested: [],
    images: [
      "/images/alfi-cosco-9/alfi-cosco-9-1.png",
      "/images/alfi-cosco-9/alfi-cosco-9-2.png",
      "/images/alfi-cosco-9/alfi-cosco-9-3.png",
      "/images/alfi-cosco-9/alfi-cosco-9-4.png",
      "/images/alfi-cosco-9/alfi-cosco-9-5.png",
    ],
    tagBg: "bg-emerald-100 text-emerald-700",
    manual: "/manuals/alfi-cosco-9-manual.pdf",
  },
  {
    id: 2,
    name: "Alfi รุ่น Fiji-7 Ultra",
    tag: "สุดคุ้ม / ราคาสบายกระเป๋า",
    features: [
      "เหมาะกับ 0-12 ปี",
      "หมุนได้ 360 องศา",
      "ผ้าเย็นสบาย นุ่มละมุน",
      "รองรับ ISOFIX & Belt & LATCH",
    ],
    color: [
      {
        name: "Graphite Black",
        swatch: "/images/colors/g408-graphite-black.avif",
      },
    ],
    totalPrice: 3840,
    interested: [],
    images: [
      "/images/alfi-fiji-7-ultra/alfi-fiji-7-1.png",
      "/images/alfi-fiji-7-ultra/alfi-fiji-7-2.png",
      "/images/alfi-fiji-7-ultra/alfi-fiji-7-3.png",
      "/images/alfi-fiji-7-ultra/alfi-fiji-7-4.png",
    ],
    tagBg: "bg-amber-100 text-amber-700",
    manual: "/manuals/alfi-fiji-7-manual.pdf",
  },
];
