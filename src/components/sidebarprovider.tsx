"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set initial state based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Desktop - open by default
      } else {
        // On mobile, close the sidebar when resizing from desktop to mobile
        setIsOpen(false);
      }
    };

    // Set initial state
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Remove isOpen dependency to avoid conflicts

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
