// "use client";

// import { useState, useEffect, useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import {
//   Search,
//   Folder,
//   Tag,
//   CheckCircle,
//   XCircle,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
// import { ToggleSwitch } from "@/components/ui/toggle-switch";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";
// import useStore from "../../../lib/Zustand";

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
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mappedCategories, setMappedCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         const [industryRes, mappedRes] = await Promise.all([
//           axiosInstance.get(
//             "/industries/by-industry/vahhnv?status_filter=false"
//           ),
//           axiosInstance.get(
//             `/mapping/?vendor_ref_id=${userId}&status_filter=false`
//           ),
//         ]);

//         const industryData: Category[] = industryRes.data.data.map(
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

//         const mappedData: Category[] = mappedRes.data.data.map((item: any) => ({
//           category_id: item.category_id,
//           category_name: item.category_name,
//           category_description: item.category_description,
//           category_status: item.category_status,
//           subcategories: item.subcategories.map((sub: any) => ({
//             subcategory_id: sub.subcategory_id,
//             subcategory_name: sub.subcategory_name,
//             subcategory_description: sub.subcategory_description,
//             subcategory_status: sub.subcategory_status,
//           })),
//         }));

//         setCategories(industryData);
//         setMappedCategories(mappedData);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Failed to load data.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const isMapped = (categoryId: string, subcategoryId?: string) => {
//     const matchedCategory = mappedCategories.find(
//       (cat) => cat.category_id === categoryId
//     );

//     if (!matchedCategory) return false;

//     if (!subcategoryId) {
//       return true; // entire category is mapped
//     }

//     return matchedCategory.subcategories.some(
//       (sub) => sub.subcategory_id === subcategoryId
//     );
//   };

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
//         (statusFilter === "active" && !category.category_status) ||
//         (statusFilter === "inactive" && category.category_status);

//       return matchesSearch && matchesStatus;
//     });
//   }, [categories, searchTerm, statusFilter]);

//   const handleToggle = async (
//     categoryId: string,
//     subcategoryId?: string,
//     isCurrentlyActive?: boolean
//   ) => {
//     try {
//       const endpoint = !isCurrentlyActive ? "/mapping/remove" : "/mapping/add";
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
//                     ? { ...sub, subcategory_status: !sub.subcategory_status }
//                     : sub
//                 ),
//               };
//             } else {
//               return {
//                 ...category,
//                 category_status: !category.category_status,
//               };
//             }
//           }
//           return category;
//         })
//       );

//       toast.success(
//         `Successfully ${!isCurrentlyActive ? "disabled" : "enabled"} category`
//       );
//     } catch (error) {
//       console.error("Toggle error:", error);
//       toast.error(
//         `Failed to ${!isCurrentlyActive ? "disable" : "enable"} category`
//       );
//     }
//   };

//   const toggleCategoryExpansion = (categoryId: string) => {
//     setExpandedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const getStatusDisplay = (status: boolean) =>
//     !status ? "Active" : "Inactive";

//   const renderCategoryTable = (categoryList: Category[]) => {
//     if (categoryList.length === 0) {
//       return (
//         <div className="text-center py-12">
//           <Folder className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//             No categories found
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400">
//             Try adjusting your search or filters.
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="p-0 overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Category</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {categoryList.map((category, index) => (
//               <>
//                 <TableRow key={category.category_id}>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() =>
//                           toggleCategoryExpansion(category.category_id)
//                         }
//                       >
//                         {expandedCategories.includes(category.category_id) ? (
//                           <ChevronDown className="w-5 h-5 text-cyan-600" />
//                         ) : (
//                           <ChevronRight className="w-5 h-5 text-cyan-600" />
//                         )}
//                       </Button>
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
//                         <Tag className="w-4 h-4" />
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800 dark:text-gray-100">
//                           {category.category_name}
//                         </div>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                       {category.category_description}
//                     </p>
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`px-3 py-1 ${
//                         !category.category_status
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {!category.category_status ? (
//                         <CheckCircle className="w-4 h-4 mr-1" />
//                       ) : (
//                         <XCircle className="w-4 h-4 mr-1" />
//                       )}
//                       {getStatusDisplay(category.category_status)}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <ToggleSwitch
//                       checked={!category.category_status}
//                       onCheckedChange={() =>
//                         handleToggle(
//                           category.category_id,
//                           undefined,
//                           !category.category_status
//                         )
//                       }
//                       className={
//                         isMapped(category.category_id) ? "bg-red-500" : ""
//                       }
//                     />
//                   </TableCell>
//                 </TableRow>

//                 {/* Subcategories */}
//                 {expandedCategories.includes(category.category_id) &&
//                   category.subcategories.map((sub) => (
//                     <TableRow
//                       key={sub.subcategory_id}
//                       className="bg-cyan-50/30 dark:bg-cyan-900/10"
//                     >
//                       <TableCell className="pl-12">
//                         <div className="flex items-center gap-3">
//                           <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
//                             <Tag className="w-3 h-3" />
//                           </div>
//                           <div className="font-medium text-gray-700 dark:text-gray-300">
//                             {sub.subcategory_name}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                           {sub.subcategory_description}
//                         </p>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           className={`px-3 py-1 ${
//                             !sub.subcategory_status
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {!sub.subcategory_status ? (
//                             <CheckCircle className="w-4 h-4 mr-1" />
//                           ) : (
//                             <XCircle className="w-4 h-4 mr-1" />
//                           )}
//                           {getStatusDisplay(sub.subcategory_status)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <ToggleSwitch
//                           checked={!sub.subcategory_status}
//                           onCheckedChange={() =>
//                             handleToggle(
//                               category.category_id,
//                               sub.subcategory_id,
//                               !sub.subcategory_status
//                             )
//                           }
//                           className={
//                             isMapped(category.category_id, sub.subcategory_id)
//                               ? "bg-red-500"
//                               : ""
//                           }
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading categories...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6 space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-cyan-600">
//           Category Management
//         </h1>
//         <div className="flex gap-4">
//           <Input
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-32">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Mapped Categories */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2 text-green-700">
//           Mapped Categories
//         </h2>
//         {renderCategoryTable(mappedCategories)}
//       </div>

//       {/* Industry Categories */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2 text-cyan-700">
//           Industry-Relevant Categories
//         </h2>
//         {renderCategoryTable(filteredCategories)}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Search,
  Folder,
  Tag,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import useStore from "../../../lib/Zustand";

interface SubCategory {
  subcategory_id: string;
  subcategory_name: string;
  subcategory_description: string;
  subcategory_status: boolean;
}

interface Category {
  category_id: string;
  category_name: string;
  category_description: string;
  category_status: boolean;
  subcategories: SubCategory[];
}

export default function CategoriesPage() {
  const { userId } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mappedCategories, setMappedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [industryRes, mappedRes] = await Promise.all([
          axiosInstance.get(
            "/industries/by-industry/vahhnv?status_filter=false"
          ),
          axiosInstance.get(
            `/mapping/?vendor_ref_id=${userId}&status_filter=false`
          ),
        ]);

        const industryData: Category[] = industryRes.data.data.map(
          (item: any) => ({
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
          })
        );

        const mappedData: Category[] = mappedRes.data.data.map((item: any) => ({
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
        }));

        setCategories(industryData);
        setMappedCategories(mappedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const isMapped = (categoryId: string, subcategoryId?: string) => {
    const matchedCategory = mappedCategories.find(
      (cat) => cat.category_id === categoryId
    );

    if (!matchedCategory) return false;

    if (!subcategoryId) return true;

    return matchedCategory.subcategories.some(
      (sub) => sub.subcategory_id === subcategoryId
    );
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.category_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        category.category_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        category.subcategories.some(
          (sub) =>
            sub.subcategory_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            sub.subcategory_description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !category.category_status) ||
        (statusFilter === "inactive" && category.category_status);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const handleToggle = async (
    categoryId: string,
    subcategoryId?: string,
    isCurrentlyMapped?: boolean
  ) => {
    try {
      const endpoint = isCurrentlyMapped ? "/mapping/remove" : "/mapping/add";
      const payload = {
        vendor_ref_id: userId,
        category_id: categoryId,
        subcategory_id: subcategoryId || "",
      };

      await axiosInstance.post(endpoint, payload);

      // Refetch mappings after toggle to update UI
      const mappedRes = await axiosInstance.get(
        `/mapping/?vendor_ref_id=${userId}&status_filter=false`
      );

      const updatedMappedData: Category[] = mappedRes.data.data.map(
        (item: any) => ({
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
        })
      );

      setMappedCategories(updatedMappedData);

      toast.success(
        `Successfully ${isCurrentlyMapped ? "unmapped" : "mapped"} ${
          subcategoryId ? "subcategory" : "category"
        }`
      );
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error(
        `Failed to ${isCurrentlyMapped ? "unmap" : "map"} ${
          subcategoryId ? "subcategory" : "category"
        }`
      );
    }
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getStatusDisplay = (status: boolean) =>
    !status ? "Active" : "Inactive";

  const renderCategoryTable = (categoryList: Category[]) => {
    if (categoryList.length === 0) {
      return (
        <div className="text-center py-12">
          <Folder className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No categories found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      );
    }

    return (
      <div className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryList.map((category) => (
              <>
                <TableRow key={category.category_id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toggleCategoryExpansion(category.category_id)
                        }
                      >
                        {expandedCategories.includes(category.category_id) ? (
                          <ChevronDown className="w-5 h-5 text-cyan-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-cyan-600" />
                        )}
                      </Button>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100">
                          {category.category_name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {category.category_description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`px-3 py-1 ${
                        !category.category_status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
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
                  <TableCell className="text-right">
                    <ToggleSwitch
                      checked={isMapped(category.category_id)}
                      onCheckedChange={() =>
                        handleToggle(
                          category.category_id,
                          undefined,
                          isMapped(category.category_id)
                        )
                      }
                      className={
                        isMapped(category.category_id)
                          ? "bg-red-500"
                          : "bg-green-500"
                      }
                    />
                  </TableCell>
                </TableRow>

                {expandedCategories.includes(category.category_id) &&
                  category.subcategories.map((sub) => (
                    <TableRow
                      key={sub.subcategory_id}
                      className="bg-cyan-50/30 dark:bg-cyan-900/10"
                    >
                      <TableCell className="pl-12">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                            <Tag className="w-3 h-3" />
                          </div>
                          <div className="font-medium text-gray-700 dark:text-gray-300">
                            {sub.subcategory_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {sub.subcategory_description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`px-3 py-1 ${
                            !sub.subcategory_status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {!sub.subcategory_status ? (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-1" />
                          )}
                          {getStatusDisplay(sub.subcategory_status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <ToggleSwitch
                          checked={isMapped(
                            category.category_id,
                            sub.subcategory_id
                          )}
                          onCheckedChange={() =>
                            handleToggle(
                              category.category_id,
                              sub.subcategory_id,
                              isMapped(category.category_id, sub.subcategory_id)
                            )
                          }
                          className={
                            isMapped(category.category_id, sub.subcategory_id)
                              ? "bg-red-500"
                              : "bg-green-500"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-6">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-600">
          Category Management
        </h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Unified Category Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-cyan-700">
          Industry Categories
        </h2>
        {renderCategoryTable(
          mappedCategories.length === 0 ? filteredCategories : categories
        )}
      </div>
    </div>
  );
}
