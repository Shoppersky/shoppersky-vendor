// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogClose,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   Plus,
//   Search,
//   Folder,
//   Tag,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";
// import useStore from "../../../lib/Zustand";

// // Interfaces aligned with API response
// interface SubCategory {
//   subcategory_id: string;
//   subcategory_name: string;
//   subcategory_description: string;
//   subcategory_status: boolean;
// }

// interface Category {
//   category_id: string;
//   category_name: string;
//   category_description: string;
//   category_status: boolean;
//   subcategories: SubCategory[];
// }

// export default function CategoriesPage() {
//   const { userId } = useStore();
//   const [open, setOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [newCategory, setNewCategory] = useState({
//     name: "",
//     description: "",
//     status: true,
//   });

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const categoriesResponse = await axiosInstance.get(
//           "/industries/by-industry/bygkgj?status_filter=false"
//         );
//         const categoriesResult = categoriesResponse.data;
//         const mappedCategories: Category[] = categoriesResult.data.map(
//           (item: any) => ({
//             category_id: item.category_id,
//             category_name: item.category_name,
//             category_description: item.category_description,
//             category_status: item.category_status,
//             subcategories: item.subcategories.map((sub: any) => ({
//               subcategory_id: sub.subcategory_id,
//               subcategory_name: sub.subcategory_name,
//               subcategory_description: sub.subcategory_description,
//               subcategory_status: sub.subcategory_status,
//             })),
//           })
//         );
//         setCategories(mappedCategories);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Filtered categories based on search and filters
//   const filteredCategories = useMemo(() => {
//     return categories.filter((category) => {
//       const matchesSearch =
//         category.category_name
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         category.category_description
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         category.subcategories.some(
//           (sub) =>
//             sub.subcategory_name
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             sub.subcategory_description
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())
//         );
//       const matchesStatus =
//         statusFilter === "all" ||
//         (statusFilter === "active" && category.category_status) ||
//         (statusFilter === "inactive" && !category.category_status);
//       return matchesSearch && matchesStatus;
//     });
//   }, [categories, searchTerm, statusFilter]);

//   // // Handle mapping vendor to category/subcategory
//   // const handleMap = async (categoryId: string, subcategoryId?: string) => {
//   //   try {
//   //     const mappingData = {
//   //       vendor_ref_id: userId,
//   //       category_id: categoryId,
//   //       subcategory_id: subcategoryId || "",
//   //     };
//   //     await axiosInstance.post("/mapping/add", mappingData);
//   //     // Update the status to inactive (disabled) after successful mapping
//   //     setCategories((prevCategories) =>
//   //       prevCategories.map((category) => {
//   //         if (category.category_id === categoryId) {
//   //           if (subcategoryId) {
//   //             // Update subcategory status
//   //             return {
//   //               ...category,
//   //               subcategories: category.subcategories.map((sub) =>
//   //                 sub.subcategory_id === subcategoryId
//   //                   ? { ...sub, subcategory_status: false }
//   //                   : sub
//   //               ),
//   //             };
//   //           } else {
//   //             // Update category status
//   //             return { ...category, category_status: false };
//   //           }
//   //         }
//   //         return category;
//   //       })
//   //     );
//   //     // toast({
//   //     //   title: "Success",
//   //     //   description: "Vendor category mapping added successfully.",
//   //     // });
//   //   } catch (err: any) {
//   //     // toast({
//   //     //   title: "Error",
//   //     //   description: err.response?.data?.detail || "Failed to add mapping.",
//   //     //   variant: "destructive",
//   //     // });
//   //   }
//   // };

//   const handleToggle = async (
//     categoryId: string,
//     subcategoryId?: string,
//     isCurrentlyActive?: boolean
//   ) => {
//     try {
//       const endpoint = isCurrentlyActive ? "/mapping/remove" : "/mapping/add";

//       const payload = {
//         vendor_ref_id: userId,
//         category_id: categoryId,
//         subcategory_id: subcategoryId || "",
//       };

//       await axiosInstance.post(endpoint, payload);

//       setCategories((prev) =>
//         prev.map((category) => {
//           if (category.category_id === categoryId) {
//             if (subcategoryId) {
//               return {
//                 ...category,
//                 subcategories: category.subcategories.map((sub) =>
//                   sub.subcategory_id === subcategoryId
//                     ? { ...sub, subcategory_status: !isCurrentlyActive }
//                     : sub
//                 ),
//               };
//             } else {
//               return {
//                 ...category,
//                 category_status: !isCurrentlyActive,
//               };
//             }
//           }
//           return category;
//         })
//       );

//       toast.success(
//         `Successfully ${isCurrentlyActive ? "disabled" : "mapped"} category`
//       );
//     } catch (error) {
//       console.error("Toggle error:", error);
//       toast.error(
//         `Failed to ${isCurrentlyActive ? "disable" : "map"} category`
//       );
//     }
//   };

//   // Handle toggling category expansion
//   const toggleCategoryExpansion = (categoryId: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6 ml-64 p-6 min-h-screen">
//         <p className="text-gray-600 dark:text-gray-300">
//           Loading categories...
//         </p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-6 ml-64 p-6 min-h-screen">
//         <p className="text-red-600 dark:text-red-400">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 bg-white p-6 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="space-y-2">
//           <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//             Category Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Organize and manage your product categories and subcategories
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Dialog open={open} onOpenChange={setOpen}>
//             <DialogTrigger asChild>
//               <Button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
//                 <Plus className="w-4 h-4" />
//                 Add Category
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-zinc-900/95 border-cyan-200/50 dark:border-cyan-800/50">
//               <DialogHeader>
//                 <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
//                   Add New Category
//                 </DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="name" className="text-right font-medium">
//                     Name
//                   </Label>
//                   <Input
//                     id="name"
//                     value={newCategory.name}
//                     onChange={(e) =>
//                       setNewCategory({ ...newCategory, name: e.target.value })
//                     }
//                     className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label
//                     htmlFor="description"
//                     className="text-right font-medium"
//                   >
//                     Description
//                   </Label>
//                   <Input
//                     id="description"
//                     value={newCategory.description}
//                     onChange={(e) =>
//                       setNewCategory({
//                         ...newCategory,
//                         description: e.target.value,
//                       })
//                     }
//                     className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="status" className="text-right font-medium">
//                     Status
//                   </Label>
//                   <Select
//                     value={newCategory.status ? "Active" : "Inactive"}
//                     onValueChange={(value) =>
//                       setNewCategory({
//                         ...newCategory,
//                         status: value === "Active",
//                       })
//                     }
//                   >
//                     <SelectTrigger className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
//                       <SelectItem value="Active">Active</SelectItem>
//                       <SelectItem value="Inactive">Inactive</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button
//                     variant="outline"
//                     className="border-cyan-200 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
//                   >
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
//                   Create
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="transition-all duration-300 p-6">
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 w-5 h-5" />
//             <Input
//               placeholder="Search categories or subcategories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
//             />
//           </div>
//           <div className="flex gap-3 items-center">
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-32 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent className="bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//             <span className="text-gray-500 dark:text-gray-400 text-sm">
//               Auto-synced from product uploads
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Categories Table */}
//       <div className="transition-all duration-300 overflow-hidden">
//         <div className="border-b border-cyan-200/50 dark:border-cyan-800/50 p-4">
//           <div className="flex items-center gap-2">
//             <Folder className="w-6 h-6 text-cyan-600" />
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
//               Categories ({filteredCategories.length})
//             </h3>
//           </div>
//         </div>
//         <div className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="border-b border-cyan-200/50 dark:border-cyan-800/50">
//                   <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
//                     Category
//                   </TableHead>
//                   <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
//                     Description
//                   </TableHead>
//                   <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
//                     Status
//                   </TableHead>
//                   <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredCategories.map((category, index) => (
//                   <>
//                     <TableRow
//                       key={category.category_id}
//                       className="hover:bg-gradient-to-r hover:from-cyan-50/20 hover:to-blue-50/20 dark:hover:from-cyan-900/10 dark:hover:to-blue-900/10 transition-all duration-300 border-b border-cyan-100/50 dark:border-cyan-800/50"
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <TableCell className="py-4">
//                         <div className="flex items-center gap-3">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() =>
//                               toggleCategoryExpansion(category.category_id)
//                             }
//                             className="p-1 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
//                           >
//                             {expandedCategories.includes(
//                               category.category_id
//                             ) ? (
//                               <ChevronDown className="w-5 h-5 text-cyan-600" />
//                             ) : (
//                               <ChevronRight className="w-5 h-5 text-cyan-600" />
//                             )}
//                           </Button>
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
//                             <Tag className="w-4 h-4" />
//                           </div>
//                           <div>
//                             <div className="font-semibold text-gray-800 dark:text-gray-100">
//                               {category.category_name}
//                             </div>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell className="py-4">
//                         <div className="max-w-xs">
//                           <p
//                             className="text-sm text-gray-600 dark:text-gray-400 truncate"
//                             title={category.category_description}
//                           >
//                             {category.category_description}
//                           </p>
//                         </div>
//                       </TableCell>
//                       <TableCell className="py-4">
//                         <Badge
//                           className={`transition-all duration-300 hover:scale-105 px-3 py-1 ${
//                             category.category_status
//                               ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 dark:border-green-700/50"
//                               : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50"
//                           }`}
//                         >
//                           {category.category_status ? (
//                             <CheckCircle className="w-4 h-4 mr-1" />
//                           ) : (
//                             <XCircle className="w-4 h-4 mr-1" />
//                           )}
//                           {category.category_status ? "Active" : "Inactive"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="py-4">
//                         <div className="flex justify-end gap-2">
//                           <Button
//                             size="sm"
//                             variant={
//                               category.category_status ? "outline" : "default"
//                             }
//                             className={`${
//                               category.category_status
//                                 ? "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/30"
//                                 : "bg-emerald-500 hover:bg-green-700 text-white"
//                             } transition-all duration-300 rounded-lg`}
//                             onClick={() =>
//                               handleToggle(
//                                 category.category_id,
//                                 undefined,
//                                 category.category_status
//                               )
//                             }
//                           >
//                             {category.category_status ? "Disable" : "Enable"}
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                     {expandedCategories.includes(category.category_id) && (
//                       <>
//                         {category.subcategories.map((subCategory) => (
//                           <TableRow
//                             key={subCategory.subcategory_id}
//                             className="bg-cyan-50/30 dark:bg-cyan-900/10 border-b border-cyan-100/50 dark:border-cyan-800/50"
//                           >
//                             <TableCell className="py-4 pl-12">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
//                                   <Tag className="w-3 h-3" />
//                                 </div>
//                                 <div>
//                                   <div className="font-medium text-gray-700 dark:text-gray-300">
//                                     {subCategory.subcategory_name}
//                                   </div>
//                                 </div>
//                               </div>
//                             </TableCell>
//                             <TableCell className="py-4">
//                               <div className="max-w-xs">
//                                 <p
//                                   className="text-sm text-gray-600 dark:text-gray-400 truncate"
//                                   title={subCategory.subcategory_description}
//                                 >
//                                   {subCategory.subcategory_description}
//                                 </p>
//                               </div>
//                             </TableCell>
//                             <TableCell className="py-4">
//                               <Badge
//                                 className={`transition-all duration-300 hover:scale-105 px-3 py-1 ${
//                                   subCategory.subcategory_status
//                                     ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 dark:border-green-700/50"
//                                     : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50"
//                                 }`}
//                               >
//                                 {subCategory.subcategory_status ? (
//                                   <CheckCircle className="w-4 h-4 mr-1" />
//                                 ) : (
//                                   <XCircle className="w-4 h-4 mr-1" />
//                                 )}
//                                 {subCategory.subcategory_status
//                                   ? "Active"
//                                   : "Inactive"}
//                               </Badge>
//                             </TableCell>
//                             <TableCell className="py-4">
//                               <div className="flex justify-end gap-2">
//                                 <Button
//                                   size="sm"
//                                   variant={
//                                     subCategory.subcategory_status
//                                       ? "outline"
//                                       : "default"
//                                   }
//                                   className={`${
//                                     subCategory.subcategory_status
//                                       ? "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/30"
//                                       : "bg-green-600 hover:bg-green-700 text-white"
//                                   } transition-all duration-300 rounded-lg`}
//                                   onClick={() =>
//                                     handleToggle(
//                                       category.category_id,
//                                       subCategory.subcategory_id,
//                                       subCategory.subcategory_status
//                                     )
//                                   }
//                                 >
//                                   {subCategory.subcategory_status
//                                     ? "Disable"
//                                     : "Enable"}
//                                 </Button>
//                               </div>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </>
//                     )}
//                   </>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {filteredCategories.length === 0 && (
//             <div className="text-center py-12">
//               <Folder className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                 No categories found
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




"use client"

import { useState, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, Search, Folder, Tag, CheckCircle, XCircle, ChevronDown, ChevronRight } from "lucide-react"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import useStore from "../../../lib/Zustand"

// Interfaces aligned with API response
interface SubCategory {
  subcategory_id: string
  subcategory_name: string
  subcategory_description: string
  subcategory_status: boolean
}

interface Category {
  category_id: string
  category_name: string
  category_description: string
  category_status: boolean
  subcategories: SubCategory[]
}

export default function CategoriesPage() {
  const { userId } = useStore()
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: true,
  })

  // Fetch categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const categoriesResponse = await axiosInstance.get("/industries/by-industry/vahhnv?status_filter=false")
        const categoriesResult = categoriesResponse.data
        const mappedCategories: Category[] = categoriesResult.data.map((item: any) => ({
          category_id: item.category_id,
          category_name: item.category_name,
          category_description: item.category_description,
          category_status: item.category_status,
          subcategories: item.subcategories.map((sub: any) => ({
            subcategory_id: sub.subcategory_id,
            subcategory_name: sub.subcategory_name,
            subcategory_description: sub.subcategory_description,
            subcategory_status: sub.subcategory_status,
          })),
        }))
        setCategories(mappedCategories)
        setError(null)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filtered categories based on search and filters
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.subcategories.some(
          (sub) =>
            sub.subcategory_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.subcategory_description.toLowerCase().includes(searchTerm.toLowerCase()),
        )

      // Fix status filter logic - active means false, inactive means true
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !category.category_status) ||
        (statusFilter === "inactive" && category.category_status)

      return matchesSearch && matchesStatus
    })
  }, [categories, searchTerm, statusFilter])

  const handleToggle = async (categoryId: string, subcategoryId?: string, isCurrentlyActive?: boolean) => {
    try {
      // Since active means false and inactive means true, we need to invert the logic
      const endpoint = !isCurrentlyActive ? "/mapping/remove" : "/mapping/add"
      const payload = {
        vendor_ref_id: userId,
        category_id: categoryId,
        subcategory_id: subcategoryId || "",
      }

      await axiosInstance.post(endpoint, payload)

      setCategories((prev) =>
        prev.map((category) => {
          if (category.category_id === categoryId) {
            if (subcategoryId) {
              return {
                ...category,
                subcategories: category.subcategories.map((sub) =>
                  sub.subcategory_id === subcategoryId ? { ...sub, subcategory_status: !sub.subcategory_status } : sub,
                ),
              }
            } else {
              return {
                ...category,
                category_status: !category.category_status,
              }
            }
          }
          return category
        }),
      )

      toast.success(`Successfully ${!isCurrentlyActive ? "disabled" : "enabled"} category`)
    } catch (error) {
      console.error("Toggle error:", error)
      toast.error(`Failed to ${!isCurrentlyActive ? "disable" : "enable"} category`)
    }
  }

  // Handle toggling category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Get display status text based on the inverted logic
  const getStatusDisplay = (status: boolean) => {
    // Invert the status since active means false and inactive means true
    return !status ? "Active" : "Inactive"
  }

  if (isLoading) {
    return (
      <div className="space-y-6 ml-64 p-6 min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">Loading categories...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 ml-64 p-6 min-h-screen">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-white p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Category Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Organize and manage your product categories and subcategories
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-zinc-900/95 border-cyan-200/50 dark:border-cyan-800/50">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Add New Category
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right font-medium">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right font-medium">
                    Status
                  </Label>
                  <Select
                    value={newCategory.status ? "Active" : "Inactive"}
                    onValueChange={(value) =>
                      setNewCategory({
                        ...newCategory,
                        status: value === "Active",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-cyan-200 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
      {/* Filters and Search */}
      <div className="transition-all duration-300 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 w-5 h-5" />
            <Input
              placeholder="Search categories or subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
            />
          </div>
          <div className="flex gap-3 items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-800 border-cyan-200 dark:border-cyan-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Auto-synced from product uploads</span>
          </div>
        </div>
      </div>
      {/* Categories Table */}
      <div className="transition-all duration-300 overflow-hidden">
        <div className="border-b border-cyan-200/50 dark:border-cyan-800/50 p-4">
          <div className="flex items-center gap-2">
            <Folder className="w-6 h-6 text-cyan-600" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Categories ({filteredCategories.length})
            </h3>
          </div>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-cyan-200/50 dark:border-cyan-800/50">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Category</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Description</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category, index) => (
                  <>
                    <TableRow
                      key={category.category_id}
                      className="hover:bg-gradient-to-r hover:from-cyan-50/20 hover:to-blue-50/20 dark:hover:from-cyan-900/10 dark:hover:to-blue-900/10 transition-all duration-300 border-b border-cyan-100/50 dark:border-cyan-800/50"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCategoryExpansion(category.category_id)}
                            className="p-1 hover:bg-cyan-50 dark:hover:bg-cyan-900/30"
                          >
                            {expandedCategories.includes(category.category_id) ? (
                              <ChevronDown className="w-5 h-5 text-cyan-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-cyan-600" />
                            )}
                          </Button>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-100">
                              {category.category_name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="max-w-xs">
                          <p
                            className="text-sm text-gray-600 dark:text-gray-400 truncate"
                            title={category.category_description}
                          >
                            {category.category_description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          className={`transition-all duration-300 hover:scale-105 px-3 py-1 ${
                            !category.category_status
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 dark:border-green-700/50"
                              : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50"
                          }`}
                        >
                          {!category.category_status ? (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-1" />
                          )}
                          {getStatusDisplay(category.category_status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex justify-end gap-2">
                          <ToggleSwitch
                            checked={!category.category_status}
                            onCheckedChange={() =>
                              handleToggle(category.category_id, undefined, !category.category_status)
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedCategories.includes(category.category_id) && (
                      <>
                        {category.subcategories.map((subCategory) => (
                          <TableRow
                            key={subCategory.subcategory_id}
                            className="bg-cyan-50/30 dark:bg-cyan-900/10 border-b border-cyan-100/50 dark:border-cyan-800/50"
                          >
                            <TableCell className="py-4 pl-12">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                                  <Tag className="w-3 h-3" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-700 dark:text-gray-300">
                                    {subCategory.subcategory_name}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="max-w-xs">
                                <p
                                  className="text-sm text-gray-600 dark:text-gray-400 truncate"
                                  title={subCategory.subcategory_description}
                                >
                                  {subCategory.subcategory_description}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                className={`transition-all duration-300 hover:scale-105 px-3 py-1 ${
                                  !subCategory.subcategory_status
                                    ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 dark:border-green-700/50"
                                    : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50"
                                }`}
                              >
                                {!subCategory.subcategory_status ? (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                {getStatusDisplay(subCategory.subcategory_status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex justify-end gap-2">
                                <ToggleSwitch
                                  checked={!subCategory.subcategory_status}
                                  onCheckedChange={() =>
                                    handleToggle(
                                      category.category_id,
                                      subCategory.subcategory_id,
                                      !subCategory.subcategory_status,
                                    )
                                  }
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Folder className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No categories found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
