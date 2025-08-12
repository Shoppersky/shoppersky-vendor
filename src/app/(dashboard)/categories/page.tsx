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
  vendor_subcategory_mapping_status?: boolean; 
}

interface Category {
  category_id: string;
  category_name: string;
  category_description: string;
  category_status: boolean;
  vendor_category_mapping_status?: boolean; 
  subcategories: SubCategory[];
}


export default function CategoriesPage() {
  const { userId, user } = useStore(); 
  const industry = user?.industry; 
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
      if (!industry || !userId) return;
      try {
        setIsLoading(true);

        const [industryRes, mappedRes] = await Promise.all([
          axiosInstance.get(`/industries/by-industry/${industry}?status_filter=false`),
          axiosInstance.get(`/mapping/?vendor_ref_id=${userId}`),
        ]);

        const industryData: Category[] = industryRes.data.data.map((item: any) => ({
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

        const mappedData: Category[] = mappedRes.data.data.map((item: any) => ({
          category_id: item.category_id,
          category_name: item.category_name,
          category_description: item.category_description,
          category_status: item.category_status,
          vendor_category_mapping_status: item.vendor_category_mapping_status,
          subcategories: item.subcategories.map((sub: any) => ({
            subcategory_id: sub.subcategory_id,
            subcategory_name: sub.subcategory_name,
            subcategory_description: sub.subcategory_description,
            subcategory_status: sub.subcategory_status,
            vendor_subcategory_mapping_status: sub.vendor_subcategory_mapping_status,
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

    if (!subcategoryId) {
      return matchedCategory.vendor_category_mapping_status === false;
    }

    const matchedSub = matchedCategory.subcategories.find(
      (sub) => sub.subcategory_id === subcategoryId
    );

    return matchedSub?.vendor_subcategory_mapping_status === false;
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
      const endpoint = isCurrentlyMapped ? "/mapping/unmap" : "/mapping/add";
      const payload = {
        vendor_ref_id: userId,
        category_id: categoryId,
        subcategory_id: subcategoryId || "",
      };

      await axiosInstance.post(endpoint, payload);

      // Refetch mappings after toggle to update UI
      const mappedRes = await axiosInstance.get(
        `/mapping/?vendor_ref_id=${userId}`
      );

      const updatedMappedData: Category[] = mappedRes.data.data.map(
        (item: any) => ({
          category_id: item.category_id,
          category_name: item.category_name,
          category_description: item.category_description,
          category_status: item.category_status,
          vendor_category_mapping_status: item.vendor_category_mapping_status,
          subcategories: item.subcategories.map((sub: any) => ({
            subcategory_id: sub.subcategory_id,
            subcategory_name: sub.subcategory_name,
            subcategory_description: sub.subcategory_description,
            subcategory_status: sub.subcategory_status,
            vendor_subcategory_mapping_status: item.vendor_subcategory_mapping_status,
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
    status ? "Unmapped" : "Mapped";

  const renderCategoryTable = (categoryList: Category[]) => {
    if (categoryList.length === 0) {
      return (
        <div className="text-center py-8 sm:py-12">
          <Folder className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
            No categories found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Category</TableHead>
                <TableHead className="text-xs sm:text-sm">Description</TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
  {categoryList.map((category) => (
    <>
      <TableRow className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
        <TableCell className="py-3">
          <div className="flex items-center gap-1 sm:gap-1 flex">
           <Button
  variant="ghost"
  size="sm"
  onClick={() => toggleCategoryExpansion(category.category_id)}
  className="p-1 min-w-[32px] min-h-[32px] rounded-md transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/20 sm:p-2 sm:min-w-[40px] sm:min-h-[40px]"
  aria-label="Toggle category expansion"
>
  {expandedCategories.includes(category.category_id) ? (
    <ChevronDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-600" />
  ) : (
    <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-600" />
  )}
</Button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">
                {category.category_name}
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell className="py-3">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
            {category.category_description}
          </p>
        </TableCell>

        <TableCell className="py-3">
          <Badge
            className={`px-2 sm:px-3 py-1 text-xs ${
              isMapped(category.category_id)
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isMapped(category.category_id) ? (
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            ) : (
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            )}
            {isMapped(category.category_id) ? "Mapped" : "Unmapped"}
          </Badge>
        </TableCell>

        <TableCell className="text-right py-3">
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
                ? "bg-green-500"
                : "bg-red-500"
            }
          />
        </TableCell>
      </TableRow>

      {expandedCategories.includes(category.category_id) &&
        category.subcategories.map((sub) => (
          <TableRow
            key={sub.subcategory_id}
            className="bg-cyan-50/30 dark:bg-cyan-900/10 hover:bg-cyan-100/40 dark:hover:bg-cyan-900/20"
          >
            <TableCell className="pl-8 sm:pl-12 py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                  <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                </div>
                <div className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {sub.subcategory_name}
                </div>
              </div>
            </TableCell>

            <TableCell className="py-3">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                {sub.subcategory_description}
              </p>
            </TableCell>

            <TableCell className="py-3">
              <Badge
                className={`px-2 sm:px-3 py-1 text-xs ${
                  isMapped(category.category_id, sub.subcategory_id)
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {isMapped(category.category_id, sub.subcategory_id) ? (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                ) : (
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                )}
                {isMapped(category.category_id, sub.subcategory_id)
                  ? "Mapped"
                  : "Unmapped"}
              </Badge>
            </TableCell>

            <TableCell className="text-right py-3">
              {isMapped(category.category_id) && (
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
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                />
              )}
            </TableCell>
          </TableRow>
        ))}
   </>
  ))}
</TableBody>

         
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden p-3 sm:p-4 space-y-3 sm:space-y-4">
  {categoryList.map((category) => (
    <div
      key={category.category_id}
      className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      {/* Category Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleCategoryExpansion(category.category_id)}
            className="p-1 min-w-[32px] min-h-[32px] rounded-md transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-900/20 sm:p-2 sm:min-w-[40px] sm:min-h-[40px]"
            aria-label="Toggle category expansion"
          >
            {expandedCategories.includes(category.category_id) ? (
              <ChevronDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-600" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-600" />
            )}
          </Button>

          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100 truncate">
              {category.category_name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
              {category.category_description}
            </p>
          </div>
        </div>

        {/* Second row: badge and toggle */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 items-center">
          <Badge
            className={`px-2 py-1 text-xs sm:text-sm flex items-center justify-center ${
              !category.category_status
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
            aria-label={`Category status: ${getStatusDisplay(category.category_status)}`}
          >
            {!category.category_status ? (
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" aria-hidden="true" />
            ) : (
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" aria-hidden="true" />
            )}
            {getStatusDisplay(category.category_status)}
          </Badge>

          <div className="flex justify-end">
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
                isMapped(category.category_id) ? "bg-red-500" : "bg-green-500"
              }
            />
          </div>
        </div>
      </div>
              {/* Subcategories */}
              {expandedCategories.includes(category.category_id) && (
                <div className="p-2 sm:p-3 space-y-2 bg-gray-50 dark:bg-slate-900/50">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.subcategory_id}
                      className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-400 flex items-center justify-center text-white flex-shrink-0">
                          <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">
                            {sub.subcategory_name}
                          </h5>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {sub.subcategory_description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge
                          className={`px-2 py-1 text-xs ${
                            !sub.subcategory_status
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {!sub.subcategory_status ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {getStatusDisplay(sub.subcategory_status)}
                        </Badge>
                        {isMapped(category.category_id) && (
                          <ToggleSwitch
                            checked={isMapped(category.category_id, sub.subcategory_id)}
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
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 bg-white animate-fadeIn min-h-screen custom-scrollbar">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 bg-white animate-fadeIn min-h-screen custom-scrollbar">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-2">Error Loading Categories</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 bg-white animate-fadeIn min-h-screen custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-cyan-700 to-blue-700 bg-clip-text text-transparent leading-tight">
            Category Management
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Manage your industry categories and subcategories. Toggle mappings to control which categories are available for your business.
          </p>
        </div>
        
       
      </div>

      {/* Mobile Search and Filters */}
      <div className="sm:hidden space-y-3">
        <div className="relative">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-sm"
          />
          <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Display */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border-0 overflow-hidden">
        <div className="border-b bg-gradient-to-r from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-cyan-900/20 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-cyan-700">
                Industry Categories ({filteredCategories.length})
              </h3>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
              {filteredCategories.length} of {categories.length}
            </Badge>
          </div>
        </div>
        
        <div className="p-0">
          {renderCategoryTable(
            mappedCategories.length === 0 ? filteredCategories : categories
          )}
        </div>
      </div>
    </div>
  );
}



