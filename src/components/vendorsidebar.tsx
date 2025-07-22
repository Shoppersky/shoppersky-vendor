"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home, Users, Box, Folder, ShoppingBag,
  PackageCheck, Megaphone, CreditCard, Settings
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, path: "/home" },
    { label: "Employees", icon: Users, path: "/employees" },
    { label: "Customers", icon: Box, path: "/customers" },
    { label: "Categories", icon: Folder, path: "/categories" },
    { label: "Products", icon: ShoppingBag, path: "/products" },
    { label: "Orders", icon: PackageCheck, path: "/orders" },
    { label: "Affiliates", icon: Megaphone, path: "/affiliates" },
    { label: "Payments", icon: CreditCard, path: "/payments" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
     <aside className="fixed top-0 left-0 h-screen w-16 md:w-64 bg-gradient-to-b from-white to-gray-50 dark:from-white-900 dark:to-white-950 border-r backdrop-blur-xl z-50 transition-all duration-300 flex flex-col">
  {/* Logo */}
  <div className="flex items-center justify-center md:justify-start gap-2 h-16 px-4 border-b">
    <span className="text-2xl">🛒</span>
    <span className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hidden md:inline">
      SHOPPERSKY
    </span>
  </div>

  {/* Nav Items */}
  <nav className="flex-1 overflow-y-auto mt-4 space-y-1">
    {navItems.map((item) => {
      const active = pathname === item.path;
      return (
        <button
          key={item.label}
          onClick={() => router.push(item.path)}
         className={`group flex w-full items-center md:justify-start justify-center gap-3 px-4 py-2 rounded-none transition-all duration-200

  ${
    active
      ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800"
      : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-blue-100 hover:text-cyan-800 dark:hover:bg-white-800"
  }`}

        >
          <item.icon
            size={20}
            className={`min-w-[20px] ${
              active ? "text-cyan-700" : "text-cyan-600"
            }`}
          />
          <span className="hidden md:inline font-medium">{item.label}</span>
        </button>
      );
    })}
  </nav>
</aside>


      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-t from-white to-gray-50 dark:from-white-900 dark:to-white-950 border-t backdrop-blur-xl  flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <div key={item.label} className="relative flex flex-col items-center">
              <button
                onClick={() => router.push(item.path)}
                className={clsx(
                  "p-2 rounded-lg transition transform",
                  active
                    ? "bg-cyan-100 text-cyan-700"
                    : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"
                )}
              >
                <item.icon size={24} />
              </button>
              <span className="text-xs mt-1 text-gray-500">{item.label}</span>
            </div>
          );
        })}
      </nav>
    </>
  );
}
