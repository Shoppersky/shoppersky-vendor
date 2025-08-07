'use client';

import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import DynamicBreadcrumb from './BreadCrump';
import { Separator } from './ui/separator';
import { ModeToggle } from './ThemToggle';
import { SearchBarWithIcon } from './Searchbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

type AppHeaderProps = {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
  isMobile?: boolean;
};

type User = {
  id: string;
  username: string;
  role_name: string;
  email: string;
  profile_picture: string;
};

export default function AppHeader({ toggleSidebar, sidebarOpen, isMobile }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const user: User = {
    id: '1',
    username: 'Jane Doe',
    role_name: 'Vendor',
    email: 'jane.doe@example.com',
    profile_picture: 'https://github.com/shadcn.png',
  };

  return (
    <header className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 h-16 sm:h-20 flex items-center justify-between shadow-sm sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
      
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-600 hover:text-purple-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        <Separator orientation="vertical" className="hidden sm:block" />

        {/* Breadcrumb or fallback text */}
        <div className="truncate max-w-[120px] sm:max-w-[180px] md:max-w-xs lg:max-w-md">
          <span className="sm:hidden font-semibold text-sm">Dashboard</span>
          <span className="hidden sm:inline">
            <DynamicBreadcrumb />
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        
        {/* Search Bar for desktop */}
        <div className="hidden sm:block">
          <SearchBarWithIcon />
        </div>

        {/* Notification */}
        <button
          className="p-2 text-gray-600 hover:text-purple-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* Optional Theme Toggle */}
        {/* <ModeToggle /> */}

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Hide user info on small screens */}
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.username}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{user.role_name}</span>
          </div>

          {/* Avatar + Dropdown */}
          <div className="relative inline-block cursor-pointer">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={user.profile_picture} alt={user.username} />
                  <AvatarFallback className="text-sm">
                    {user.username ? user.username[0] : 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem
                  onClick={() => router.push('/profile')}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/')}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
