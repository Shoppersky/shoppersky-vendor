"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Users,
  Folder,
  ShoppingBag,
  Settings,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import Logo from "./logo";
import useStore from "../lib/Zustand";
import { useSidebar } from "./sidebarprovider";
import { useEffect } from "react";
import Link from "next/link";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  collapsed?: boolean; // desktop: icon-only when true
  onToggleCollapse?: () => void; // desktop: toggle collapse
}

export default function Sidebar({
  isOpen,
  onClose,
  isMobile,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useStore();
  const store_name = user?.vendor_store_slug;
  const { isOpen: contextIsOpen, toggleSidebar, closeSidebar } = useSidebar();

  // Use props if provided, otherwise fall back to context
  const sidebarOpen = isOpen !== undefined ? isOpen : contextIsOpen;
  const handleClose = onClose || closeSidebar;
  const isMobileDevice =
    isMobile !== undefined
      ? isMobile
      : typeof window !== "undefined" && window.innerWidth < 768;

  // Close sidebar on mobile when route changes
  // useEffect(() => {
  //   // Close sidebar on mobile after navigation
  //   if (isMobileDevice) {
  //     handleClose();
  //   }
  // }, [pathname, handleClose, isMobileDevice]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sidebarOpen && isMobileDevice) {
        document.body.classList.add("sidebar-open");
      } else {
        document.body.classList.remove("sidebar-open");
      }
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [sidebarOpen, isMobileDevice]);

  const navItems = [
    { label: "Home", icon: Home, path: "/home" },
    { label: "Employees", icon: Users, path: "/employees" },
    // { label: "Customers", icon: Box, path: "/customers" },
    { label: "Categories", icon: Folder, path: "/categories" },
    { label: "Products", icon: ShoppingBag, path: "/products" },
    // { label: "Orders", icon: PackageCheck, path: "/orders" },
    // { label: "Affiliates", icon: Megaphone, path: "/affiliates" },
    // { label: "Payments", icon: CreditCard, path: "/payments" },
    // { label: "Settings", icon: Settings, path: "/settings" },
    {
      label: "Onlinestore",
      icon: Settings,
      path: `/online-store/${encodeURIComponent(store_name || "default")}`, // Dynamically include store_name
    },
    { label: "My Enquiries", icon: Settings, path: "/enquiries" },
  ];

  const handleLogout = () => {
    localStorage.clear(); // Clear session/token
    router.push("/"); // Redirect to login
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    // Close sidebar on mobile after navigation
    if (isMobileDevice) {
      handleClose();
    }
  };

  const handleToggleSidebar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-700 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out shadow-lg",
          // Width - collapsible on desktop
          collapsed ? "w-20" : "w-64",
          // Desktop - always visible and sticky
          "md:sticky md:top-0 md:h-screen md:translate-x-0",
          // Mobile - slide in/out based on sidebarOpen state, overlay content
          isMobileDevice
            ? sidebarOpen
              ? "fixed top-0 left-0 h-screen z-50 translate-x-0"
              : "fixed top-0 left-0 h-screen z-50 -translate-x-full"
            : "sticky top-0 h-screen translate-x-0"
        )}
        style={{
          // Ensure the sidebar is always the right width
          minWidth: collapsed ? "5rem" : "16rem",
          maxWidth: collapsed ? "5rem" : "16rem",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-start gap-2 h-16 px-4 border-b">
          <Link href="/home" className="inline-flex items-center gap-2">
            <span className="text-2xl">
              <Logo />
            </span>
            <span
              className={clsx(
                "text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent transition-all",
                collapsed && "opacity-0 w-0 overflow-hidden"
              )}
            >
              SHOPPERSKY
            </span>
          </Link>
        </div>

        {/* Collapse/Expand button (desktop) and Close (mobile) */}
        {/* <button
          onClick={() => {
            if (isMobileDevice) {
              handleClose();
            } else {
              onToggleCollapse?.();
            }
          }}
          className={clsx(
            "absolute top-4 right-4 p-2 rounded-lg transition-colors touch-manipulation active:scale-95",
            "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
          aria-label={isMobileDevice ? "Close sidebar" : (collapsed ? "Expand sidebar" : "Collapse sidebar")}
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          {isMobileDevice && (
            <X className="w-5 h-5" />
          ) }
        </button> */}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto mt-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className={clsx(
                  "group flex w-full items-center justify-start gap-3 px-4 py-3 rounded-none transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-blue-100 hover:text-cyan-800 dark:hover:bg-gray-800"
                )}
              >
                <item.icon
                  size={20}
                  className={clsx(
                    "min-w-[20px]",
                    active ? "text-cyan-700" : "text-cyan-600"
                  )}
                />
                {/* Hide labels when collapsed on desktop */}
                <span
                  className={clsx(
                    "font-medium transition-all",
                    !isMobileDevice &&
                      collapsed &&
                      "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
      </aside>
    </>
  );
}
