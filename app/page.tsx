"use client";

import { useEffect, useState } from "react";
import { ProductProps } from "./types/product";
import Header from "./components/header";
import LeaderBanner from "./components/leaderBanner";
import NameGateModal from "./components/nameGateModal";
import NoticeModal from "./components/noticeModal";
import ProductCard from "./components/productCard";
import UserInput from "./components/userInput";
import { initialProducts } from "./data/mockProducts";
import { ref, onValue, set } from "firebase/database";
import { db } from "./lib/firebase";

const USERNAME_STORAGE_KEY = "carseat-gift:username";

export default function CarSeatSplitApp() {
  const [currentUser, setCurrentUser] = useState<string>("");

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isNoticeOpen, setNoticeOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. ดึงข้อมูลและฟังการอัปเดตแบบ Real-time จาก Firebase
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    // ชื่อจะถูกล็อกไว้ใน localStorage ตั้งแต่ครั้งแรกที่กรอก แก้ไขภายหลังไม่ได้
    const savedName = window.localStorage.getItem(USERNAME_STORAGE_KEY);
    if (savedName) {
      setCurrentUser(savedName);
    }

    const productsRef = ref(db, "products");

    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProducts(data);
        } else {
          // ถ้าใน DB ยังไม่มีข้อมูล ให้เอา initialProducts บันทึกเข้าไปครั้งแรก
          set(productsRef, initialProducts);
        }
      },
      (error) => {
        console.error("Firebase Read Error:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  // 2. ฟังก์ชันอัปเดตข้อมูลขึ้น Firebase เมื่อเพื่อนกดปุ่ม
  const handleToggleInterest = (productId: number) => {
    if (!currentUser.trim()) {
      setNoticeOpen(true);
      return;
    }

    const updatedProducts = products.map((p) => {
      const currentInterested = p.interested || [];

      if (p.id === productId) {
        const exists = currentInterested.includes(currentUser);
        const updated = exists
          ? currentInterested.filter((name) => name !== currentUser)
          : [...currentInterested, currentUser];
        return { ...p, interested: updated };
      }

      // 1 คนเลือกได้แค่ 1 รุ่นเท่านั้น เลยต้องลบชื่อออกจากรุ่นอื่นทั้งหมดด้วย
      return {
        ...p,
        interested: currentInterested.filter((name) => name !== currentUser),
      };
    });

    set(ref(db, "products"), updatedProducts).catch((err) =>
      console.error("Firebase Write Error:", err),
    );
  };

  const handleNameSubmit = (name: string) => {
    window.localStorage.setItem(USERNAME_STORAGE_KEY, name);
    setCurrentUser(name);
  };

  const leadingProduct =
    products.length > 0
      ? [...products].sort(
          (a, b) => (b.interested?.length || 0) - (a.interested?.length || 0),
        )[0]
      : undefined;

  // ป้องกันการ Render บน Server ก่อนที่ Client จะเตรียมพร้อมเสร็จ
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
        <Header />
        <div className="mx-auto -mt-6 max-w-xl px-4 text-center py-12 text-slate-400">
          กำลังโหลดข้อมูล...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-800">
      <Header />

      <div className="mx-auto -mt-6 max-w-xl px-4">
        <UserInput currentUser={currentUser} />

        <LeaderBanner leadingProduct={leadingProduct} />

        <div className="space-y-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentUser={currentUser}
              onToggleInterest={handleToggleInterest}
            />
          ))}
        </div>
      </div>

      <NoticeModal
        message="กรุณาระบุชื่อของคุณก่อนกดเลือกครับ"
        isOpen={isNoticeOpen}
        onClose={() => setNoticeOpen(false)}
      />

      <NameGateModal isOpen={!currentUser} onSubmit={handleNameSubmit} />
    </main>
  );
}
