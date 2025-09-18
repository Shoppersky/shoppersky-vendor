'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/Zustand";
export default function OnlineStoreLanding() {
      const { user } = useStore();
      const store_name = user?.vendor_store_slug;
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to the Online Store</h1>
      <p className="text-gray-600">
        To visit the online store, just click the button below.
      </p>
      <Link href={`/online-store/${encodeURIComponent(store_name || "default")}`}> {/* 👈 put your default slug here */}
        <Button size="lg">Visit Online Store</Button>
      </Link>
    </div>
  );
}
