'use client';

import { Menu, Bell } from 'lucide-react';
import DynamicBreadcrumb from './BreadCrump';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { ModeToggle } from './ThemToggle';
import { SearchBarWithIcon } from './Searchbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
type AppHeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

export default function AppHeader({ toggleSidebar }: AppHeaderProps) {
    const [open, setOpen] = useState(false);
    const router=useRouter()
  return (
    <header className="border-b border-gray-200 px-8 py-3 h-16 flex items-center justify-between shadow-sm sticky top-0 z-40 bg-white dark:bg-neutral-900 ">
      {/* Left section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-purple-500 transition"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Vertical separator (hidden on very small screens) */}
        <Separator orientation="vertical" className="hidden sm:block" />

        {/* Breadcrumbs (truncate on small screens) */}
        <div className="truncate max-w-[180px] sm:max-w-xs md:max-w-md">
          <DynamicBreadcrumb />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Search - hidden on very small screens */}
        <div className="hidden sm:block">
          <SearchBarWithIcon />
        </div>

        {/* Bell Icon */}
        <button
          className="text-gray-600 hover:text-purple-500 transition"
          aria-label="Notifications"
        >
          <Bell  className='text-5xl  '/>
        </button>

        {/* Theme toggle */}
        <ModeToggle />

        {/* User info - hidden label on xs screens */}
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium">Jane Doe</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
             <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative inline-block"
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
           <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/Settings')}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/')}>
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
