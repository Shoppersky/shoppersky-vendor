"use client";

import { useEffect, useState } from "react";
import { Menu, Bell } from "lucide-react";
import DynamicBreadcrumb from "./BreadCrump";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import useStore from "@/lib/Zustand";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

type AppHeaderProps = {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
  isMobile?: boolean;
  sidebarCollapsed?: boolean;
};

type ProfileData = {
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
};

export default function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const router = useRouter();
  const { userId } = useStore();

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const fetchProfileData = async () => {
    if (!userId) return;

    try {
      setProfileLoading(true);
      setProfileError(null);

      const response = await axiosInstance.get(
        `/vendor/vendor-profile-details/${userId}`
      );
      const { data } = response.data;

      let name = data.username || "Unknown";
      if (name.trim().toLowerCase() === "unknown user" && data.email) {
        name = data.email.split("@")[0]; // strip part before @
      }

      setProfileData({
        name,
        email: data.email || "",
        role: data.role || "Unknown",
        avatar:
          data.profile_picture_url ||
          "/placeholder.svg?height=120&width=120&text=JD",
        joinDate: data.join_date || "Unknown",
      });
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setProfileError(
        error.response?.data?.message || "Failed to fetch profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-8 h-15 sm:h-12 flex items-center justify-between shadow-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:text-purple-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <Separator orientation="vertical" className="hidden sm:block" />

        <div className="truncate max-w-[120px] sm:max-w-[180px] md:max-w-xs lg:max-w-md">
          <span className="sm:hidden font-semibold text-sm">Dashboard</span>
          <span className="hidden sm:inline">
            <DynamicBreadcrumb />
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Notifications */}
        <button
          className="p-2 text-gray-600 hover:text-purple-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Name & role */}
          {profileData && (
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {profileData.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {profileData.role}
              </span>
            </div>
          )}

          {/* Avatar + Menu */}
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              asChild
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage
                  src={profileData?.avatar}
                  alt={profileData?.name || "User"}
                />
                <AvatarFallback className="text-sm">
                  {profileData?.name ? profileData.name[0] : "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const { logout } = useStore.getState();
                    logout();
                    localStorage.removeItem("id");
                    router.push("/signin");
                  } catch {
                    toast.error("Logout failed, applying fallback.");
                    window.location.href = "/signin";
                  }
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
