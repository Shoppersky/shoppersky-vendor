'use client';

import {
  LayoutDashboard,
  Users,
  DollarSign,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/Dashboard' },
  { label: 'Users', icon: Users, href: '/Users' },
  {
    label: 'Categories',
    icon: Users,
    href:'/Categories'
  },
  { label: 'Revenue', icon: DollarSign, href: '/Revenue' },
];

export default function AppSidebar({
  collapsed,
  isMobile,
}: {
  collapsed: boolean;
  hidden?: boolean;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

const isLinkActive = (item: NavItem) => {
  if (item.href && pathname === item.href) return true;
  if (item.children) {
    return item.children.some((child) => pathname.startsWith(child.href));
  }
  return false;
};


  return (
  
      <aside
        className={`
    bg-[#111827] text-white h-full z-50 shadow-lg flex flex-col
    transition-all duration-300 ease-in-out
    ${collapsed ? 'w-20' : 'w-64'}
    ${isMobile ? 'fixed top-0 left-0' : 'md:static'}
    ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}
  `}
      >
        {/* Header */}
        <div className="flex items-center justify-center py-4 border-b border-gray-700 gap-4">
          <Image src="/logo.png" alt="Events2Go" height={40} width={40} />
          <h1
            className={`text-xl font-bold text-purple-400 transition-all ${
              collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}
          >
            Events2Go
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
  const active = isLinkActive(item);
  const Icon = item.icon;
  const isDropdownOpen = openMenus[item.label];

  return (
    <div key={item.label}>
      {item.children ? (
        <button
          onClick={() => toggleMenu(item.label)}
          className={`flex items-center w-full p-2 rounded-lg text-sm font-medium transition-all group ${
            active
              ? 'bg-purple-700 text-white'
              : 'hover:bg-purple-600/20 text-gray-300'
          }`}
        >
          <Icon className="w-5 h-5 mr-2 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              {isDropdownOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </>
          )}
        </button>
      ) : (
        <SidebarLink
          collapsed={collapsed}
          href={item.href!}
          label={item.label}
          icon={item.icon}
          active={active}
        />
      )}

      {/* Submenu */}
      {!collapsed &&
        isDropdownOpen &&
        item.children?.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className={`ml-8 block text-sm p-2  mt-2 rounded-md transition ${
              pathname === child.href
                ? 'bg-purple-600 text-white'
                : 'hover:bg-purple-600/10 text-gray-300'
            }`}
          >
            {child.label}
          </Link>
        ))}
    </div>
  );
})}

        </nav>
      </aside>
    
  );
}

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
};

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: SidebarLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`flex items-center p-3 rounded-lg text-sm font-medium transition-all group ${
            active
              ? 'bg-purple-700 text-white'
              : 'hover:bg-purple-600/20 text-gray-300'
          }`}
        >
          <Icon className="w-5 h-5 mr-2 shrink-0" />
          {!collapsed && <span>{label}</span>}
        </Link>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
}


// 'use client';

// import {
//   LayoutDashboard,
//   Users,
//   DollarSign,
//   ChevronDown,
//   ChevronRight,
// } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import { useState } from 'react';
// import {
//   Tooltip,
//   TooltipProvider,
//   TooltipContent,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';

// type NavItem = {
//   label: string;
//   icon: React.ElementType;
//   href?: string;
//   children?: { label: string; href: string }[];
// };

// const navItems: NavItem[] = [
//   { label: 'Dashboard', icon: LayoutDashboard, href: '/Dashboard' },
//   { label: 'Users', icon: Users, href: '/Users' },
//   {
//     label: 'Categories',
//     icon: Users,
//     children: [
//       { label: 'Main Categories', href: '/Categories' },
//       { label: 'Sub Categories', href: '/SubCategories' },
//     ],
//   },
//   { label: 'Revenue', icon: DollarSign, href: '/Revenue' },
// ];

// export default function AppSidebar({
//   collapsed,
//   isMobile,
// }: {
//   collapsed: boolean;
//   hidden?: boolean;
//   isMobile?: boolean;
// }) {
//   const pathname = usePathname();
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

//   const toggleMenu = (label: string) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   const isLinkActive = (item: NavItem) => {
//     if (item.href && pathname === item.href) return true;
//     if (item.children) {
//       return item.children.some((child) => pathname.startsWith(child.href));
//     }
//     return false;
//   };

//   return (
//     <TooltipProvider>
//       <aside
//         className={`
//           group bg-[#111827] text-white h-full z-50 shadow-lg flex flex-col
//           transition-all duration-300 ease-in-out
//           ${collapsed ? 'w-20 hover:w-64' : 'w-64'}
//           ${isMobile ? 'fixed top-0 left-0' : 'md:static'}
//           ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-center py-4 border-b border-gray-700 gap-4 transition-all">
//           <Image src="/logo.webp" alt="Events2Go" width={24} height={24} />
//           <h1
//             className={`
//               text-xl font-bold text-purple-400 transition-all duration-300
//               ${collapsed ? 'group-hover:opacity-100 group-hover:w-auto opacity-0 w-0' : 'opacity-100 w-auto'}
//               overflow-hidden whitespace-nowrap
//             `}
//           >
//             Events2Go
//           </h1>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
//           {navItems.map((item) => {
//             const active = isLinkActive(item);
//             const Icon = item.icon;
//             const isDropdownOpen = openMenus[item.label];

//             return (
//               <div key={item.label}>
//                 {item.children ? (
//                 <button
//     onClick={() => toggleMenu(item.label)}
//     className={`
//       flex items-center w-full p-3 rounded-lg text-sm font-medium
//       transition-all duration-300 ease-in-out group
//       ${active ? 'bg-purple-700 text-white' : 'hover:bg-purple-600/30 text-gray-300'}
//       hover:scale-[1.02] hover:shadow-md
//     `}
//   >
//     <Icon className="w-5 h-5 mr-2 shrink-0 group-hover:scale-110 transition-transform duration-300" />

//     <span
//       className={`
//         transition-all duration-300
//         whitespace-nowrap overflow-hidden
//         ${collapsed
//           ? 'group-hover:opacity-100 group-hover:w-auto group-hover:ml-2 opacity-0 w-0 ml-0'
//           : 'opacity-100 w-auto ml-2'}
//       `}
//     >
//       {item.label}
//     </span>

//    <span className={`flex-1 ${collapsed ? 'hidden group-hover:block' : ''}`} />

// <span
//   className={`
//     transition-all duration-300
//       ${collapsed ? 'w-0 opacity-0 ml-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2' : 'w-auto opacity-100 ml-2'}
//             `}
// >
//   {isDropdownOpen ? (
//     <ChevronDown className="h-4 w-4" />
//   ) : (
//     <ChevronRight className="h-4 w-4" />
//   )}
// </span>

//   </button>
//                 ) : (
//                   <SidebarLink
//                     collapsed={collapsed}
//                     href={item.href!}
//                     label={item.label}
//                     icon={item.icon}
//                     active={active}
//                   />
//                 )}

//                 {/* Submenu */}
//                 <div
//                   className={`transition-all duration-300 ease-in-out overflow-hidden ${
//                     !collapsed && isDropdownOpen ? 'max-h-40' : 'max-h-0'
//                   }`}
//                 >
//                   {!collapsed &&
//                     item.children?.map((child) => (
//                       <Link
//                         key={child.href}
//                         href={child.href}
//                         className={`ml-8 block text-sm p-2 mt-2 rounded-md transition-all duration-300 ease-in-out
//                           ${
//                             pathname === child.href
//                               ? 'bg-purple-600 text-white'
//                               : 'hover:bg-purple-600/20 text-gray-300 hover:translate-x-1'
//                           }`}
//                       >
//                         {child.label}
//                       </Link>
//                     ))}
//                 </div>
//               </div>
//             );
//           })}
//         </nav>
//       </aside>
//     </TooltipProvider>
//   );
// }

// type SidebarLinkProps = {
//   href: string;
//   label: string;
//   icon: React.ElementType;
//   active: boolean;
//   collapsed: boolean;
// };

// function SidebarLink({
//   href,
//   label,
//   icon: Icon,
//   active,
//   collapsed,
// }: SidebarLinkProps) {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Link
//           href={href}
//           className={`
//             flex items-center p-3 rounded-lg text-sm font-medium
//             transition-all duration-300 ease-in-out group
//             ${active ? 'bg-purple-700 text-white' : 'hover:bg-purple-600/30 text-gray-300'}
//             hover:scale-[1.02] hover:shadow-md
//           `}
//         >
//           <Icon className="w-5 h-5 mr-2 shrink-0 group-hover:scale-110 transition-transform duration-300" />
//           <span
//             className={`
//               transition-all duration-300
//                ${collapsed ? 'w-0 opacity-0 ml-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2' : 'w-auto opacity-100 ml-2'}
//             `}
//           >
//             {label}
//           </span>
//         </Link>
//       </TooltipTrigger>
//       {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
//     </Tooltip>
//   );
// }
