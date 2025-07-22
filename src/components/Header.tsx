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
  collapsed: boolean;
  toggleSidebar: () => void;
};

// Static user type
type User = {
  id: string;
  username: string;
  role_name: string;
  email: string;
  profile_picture: string;
};

export default function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Static hard-coded user data
  const user: User = {
    id: '1',
    username: 'Jane Doe',
    role_name: 'Admin',
    email: 'jane.doe@example.com',
    profile_picture: 'https://github.com/shadcn.png',
  };

  return (
    <header className="border-b border-gray-200 px-8 py-3 h-20 flex items-center justify-between shadow-sm sticky top-0 z-40 bg-white dark:bg-neutral-900">
      {/* Left section */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-purple-500 transition"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <Separator orientation="vertical" className="hidden sm:block" />

        <div className="truncate max-w-[180px] sm:max-w-xs md:max-w-md">
          <DynamicBreadcrumb />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <SearchBarWithIcon />
        </div>

        <button
          className="text-gray-600 hover:text-purple-500 transition cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="text-5xl" />
        </button>

        <ModeToggle />

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium">{user.username}</span>
            <span className="text-xs text-gray-400">{user.role_name}</span>
          </div>

          <div className="relative inline-block cursor-pointer">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.profile_picture} alt={user.username} />
                  <AvatarFallback>{user.username ? user.username[0] : 'U'}</AvatarFallback>
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
                  onClick={() => router.push('/Settings')}
                  className="cursor-pointer"
                >
                  Settings
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
