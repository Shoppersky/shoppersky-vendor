'use client';

import { useState } from "react";
import Sidebar from "@/components/vendorsidebar";
import Header from "@/components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-900">
      {/* Fixed sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen ${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-300 z-50`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <main
        className={`flex-1 ${
          collapsed ? "pl-16" : "pl-64"
        } transition-all duration-300`}
      >
        {/* Background layers */}
        <div className="relative min-h-screen overflow-y-auto bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/40 dark:from-zinc-900 dark:via-purple-950/20 dark:to-blue-950/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20 dark:from-purple-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none" />

          {/* Page content with Header */}
          <div className="relative z-10">
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
