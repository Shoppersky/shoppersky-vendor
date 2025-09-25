"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "../../../lib/Zustand";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Download,
  Pencil,
  Trash2,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  BarChart3,
  CheckCircle,
  XCircle,
  Tag,
  Filter,
  Sparkles,
  Package2,
  ExternalLink,
  AlertTriangle,
  TrendingDown,
  Activity,
  Clock,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface VendorResponse {
  vendor_id: string;
  store_name: string;
  banner_image: string;
  banner_title: string;
  banner_subtitle: string;
  total_count: number;
  products: ProductResponse[];
}

interface ProductResponse {
  product_id: string;
  vendor_id: string;
  slug: string;
  identification: {
    product_name: string;
    product_sku?: string;
  };
  descriptions: {
    short_description?: string;
    full_description?: string;
  };
  pricing: {
    actual_price: string;
    selling_price?: string;
  };
  inventory: {
    quantity: string;
    stock_alert_status?: string;
  };
  physical_attributes?: {
    weight: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
    };
  };
  images: {
    urls: string[];
  } | null;
  tags_and_relationships?: {
    product_tags?: string[];
    linkedproductid?: string;
  };
  status_flags: {
    product_status: boolean;
    featured_product?: boolean;
    published_product?: boolean;
  };
  timestamp: string;
  category_name?: string;
  subcategory_name?: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  purchases: number;
  sold: number;
  status: "Active" | "Inactive";
  category?: string;
  subcategory?: string;
  createdDate?: string;
  lastUpdated?: string;
  rating?: number;
  stock?: number;
  slug?: string;
  sku?: string;
  shortDescription?: string;
  fullDescription?: string;
  seoKeywords?: string;
  seoTitle?: string;
  tags?: string[];
  featured?: boolean;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
}

interface Category {
  category_id: string;
  category_name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  imgthumbnail: string;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
  subcategories: Subcategory[];
}

interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  imgthumbnail: string;
  featured_category: boolean;
  show_in_menu: boolean;
  status: boolean;
}

interface FormData {
  name: string;
  price: string;
  category: string;
  stock: number;
  status: "Active" | "Inactive";
  image: string;
  shortDescription: string;
}

function StatCard({
  title,
  value,
  icon,
  color = "cyan",
  trend,
  trendValue,
  delay = 0,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?:
    | "cyan"
    | "green"
    | "blue"
    | "yellow"
    | "indigo"
    | "pink"
    | "red"
    | "purple";
  trend?: "up" | "down";
  trendValue?: string;
  delay?: number;
  subtitle?: string;
}) {
  const colorClasses = {
    cyan: "from-cyan-500/10 to-cyan-600/20 border-cyan-200/50 dark:border-cyan-700/50 hover:shadow-cyan-500/20",
    green:
      "from-green-500/10 to-green-600/20 border-green-200/50 dark:border-green-700/50 hover:shadow-green-500/20",
    blue: "from-blue-500/10 to-blue-600/20 border-blue-200/50 dark:border-blue-700/50 hover:shadow-blue-500/20",
    yellow:
      "from-yellow-500/10 to-yellow-600/20 border-yellow-200/50 dark:border-yellow-700/50 hover:shadow-yellow-500/20",
    indigo:
      "from-indigo-500/10 to-indigo-600/20 border-indigo-200/50 dark:border-indigo-700/50 hover:shadow-indigo-500/20",
    pink: "from-pink-500/10 to-pink-600/20 border-pink-200/50 dark:border-pink-700/50 hover:shadow-pink-500/20",
    red: "from-red-500/10 to-red-600/20 border-red-200/50 dark:border-red-700/50 hover:shadow-red-500/20",
    purple:
      "from-purple-500/10 to-purple-600/20 border-purple-200/50 dark:border-purple-700/50 hover:shadow-purple-500/20",
  };

  return (
    <Card
      className={`group relative overflow-hidden border bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up cursor-pointer`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                {value}
              </p>
              {trend && trendValue && (
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all duration-300 ${
                    trend === "up"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {trendValue}
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="rounded-xl bg-white/50 p-3 shadow-inner transition-all duration-300 group-hover:bg-white/70 group-hover:scale-110 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800/70">
            {icon}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </CardContent>
    </Card>
  );
}

function ProductSkeleton() {
  return (
    <TableRow className="animate-pulse">
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-16 rounded bg-muted" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-6 w-20 rounded-full bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 rounded bg-muted" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-16 rounded-full bg-muted" />
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToRestore, setProductToRestore] = useState<Product | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    category: "",
    stock: 0,
    status: "Active",
    image: "",
    shortDescription: "",
  });
  const { userId } = useStore();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<VendorResponse>(
          `/products/by-vendor-id/${userId}`
        );
        const mappedProducts: Product[] = response.data.products.map((product) => ({
          id: product.product_id,
          name: product.identification.product_name,
          price: product.pricing?.selling_price
            ? `$${Number.parseFloat(product.pricing.selling_price).toFixed(2)}`
            : "$0.00",
          image:
            product.images?.urls?.[0]?.replace(/\\/g, "/") ||
            "/placeholder.svg?height=56&width=56",
          images:
            product.images?.urls?.map((url) => url.replace(/\\/g, "/")) || [],
          purchases: Math.floor(Math.random() * 100), // Placeholder; replace with actual data if available
          sold: Math.floor(Math.random() * 50), // Placeholder; replace with actual data if available
          status: product.status_flags.product_status ? "Inactive" : "Active",
          category: product.category_name,
          subcategory: product.subcategory_name,
          createdDate: product.timestamp.split("T")[0],
          lastUpdated: product.timestamp.split("T")[0],
          rating: Math.random() * 5, // Placeholder; replace with actual data if available
          stock: product.inventory?.quantity
            ? Number.parseInt(product.inventory.quantity)
            : 0,
          slug: product.slug,
          sku: product.identification.product_sku,
          shortDescription: product.descriptions?.short_description || "",
          fullDescription: product.descriptions?.full_description || "",
          seoKeywords:
            product.tags_and_relationships?.product_tags?.join(", ") || "",
          seoTitle: "",
          tags: product.tags_and_relationships?.product_tags || [],
          featured: product.status_flags.featured_product || false,
          weight: product.physical_attributes?.weight || "",
          length: product.physical_attributes?.dimensions?.length || "",
          width: product.physical_attributes?.dimensions?.width || "",
          height: product.physical_attributes?.dimensions?.height || "",
        }));
        setProducts(mappedProducts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchVendorCategories = async () => {
      if (!userId) {
        setError("Vendor ID is required to fetch categories.");
        return;
      }
      try {
        const response = await axiosInstance.get(
          `/mapping/list-categories?vendor_ref_id=${userId}&status_value=false`
        );
        if (response.data?.statusCode === 200 && response.data?.data) {
          setCategories(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching vendor categories:", error);
        setError(
          "Failed to load categories and subcategories. Please try again."
        );
      }
    };

    fetchProducts();
    fetchVendorCategories();
  }, [userId]);




  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false);

      const matchesStatus =
        statusFilter === "all" || product.status.toLowerCase() === statusFilter;
      const matchesCategory =
        categoryFilter === "all" ||
        product.category?.toLowerCase() === categoryFilter;

      let matchesPrice = true;
      if (priceRangeFilter !== "all") {
        const price = Number.parseFloat(product.price.replace("$", ""));
        switch (priceRangeFilter) {
          case "50-100":
            matchesPrice = price >= 50 && price <= 100;
            break;
          case "101-150":
            matchesPrice = price >= 101 && price <= 150;
            break;
          case "150+":
            matchesPrice = price >= 150;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, statusFilter, categoryFilter, priceRangeFilter]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.status === "Active").length;
    const inactiveProducts = products.filter(
      (p) => p.status === "Inactive"
    ).length;
    const lowStockProducts = products.filter(
      (p) => (p.stock || 0) <= 5 && p.status === "Active"
    ).length;
    const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
    const totalRevenue = products.reduce((sum, p) => {
      let price = 0;
      if (typeof p.price === "string") {
        price = Number.parseFloat(p.price.replace(/[^0-9.]/g, ""));
      } else if (typeof p.price === "number") {
        price = p.price;
      }
      return sum + price * (p.sold || 0);
    }, 0);
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalRatings = products.reduce((sum, p) => sum + (p.rating || 0), 0);
    const avgRating = totalProducts
      ? (totalRatings / totalProducts).toFixed(1)
      : "0.0";

    const revenueString = totalRevenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return {
      total: totalProducts,
      active: activeProducts,
      inactive: inactiveProducts,
      lowStock: lowStockProducts,
      sold: totalSold,
      revenue: revenueString,
      stock: totalStock,
      avgRating,
    };
  }, [products]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await axiosInstance.put(
          `/products/slug/delete/${productToDelete.slug}`
        );
        setProducts((prev) =>
        prev.map((product) =>
          product.slug === productToDelete.slug
            ? { ...product, status: "Inactive" }
            : product
        )
      );
        toast.success(
          `Product "${productToDelete.name}" has been deleted successfully`
        );
      } catch (error) {
        toast.error("Failed to delete product. Please try again.");
        console.error(error);
      } finally {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const handleRestoreProduct = (product: Product) => {
    setProductToRestore(product);

    setRestoreDialogOpen(true);
  };
  // /api/v1/products/slug/asdasd/restore
  const confirmRestoreProduct = async () => {
    if (productToRestore) {
      try {
        await axiosInstance.put(
          `/products/slug/restore/${productToRestore.slug}`
        );

        setProducts((prev) =>
          prev.map((product) =>
            product.slug === productToRestore.slug
              ? { ...product, status: "Active" }
              : product
          )
        );

        toast.success(
          `Product "${productToRestore.name}" has been restored successfully`
        );
      } catch (error) {
        toast.error("Failed to restore product. Please try again.");

        console.error(error);
      } finally {
        setRestoreDialogOpen(false);

        setProductToRestore(null);
      }
    }
  };

  const handleExportProducts = () => {
    const csvContent = [
      [
        
        "Name",
        "Price",
        "Category",
        "Subcategory",
        // "Purchases",
        // "Sold",
        "Stock",
        "Status",
        // "Rating",
        "Created Date",
        
      ],
      ...filteredProducts.map((product) => [
       
        product.name,
        product.price,
        product.category || "",
        product.subcategory || "",
        // product.purchases.toString(),
        // product.sold.toString(),
        (product.stock || 0).toString(),
        product.status,
        // (product.rating || 0).toFixed(1),
        product.createdDate || "",
       
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewProduct = (slug: string) => {
    router.push(`/products/view/${slug}`);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.replace("$", ""),
      category: product.category?.toLowerCase() || "",
      stock: product.stock || 0,
      status: product.status,
      image: product.image,
      shortDescription: product.shortDescription || "",
    });
    setOpen(true);
  };

  const handleAddProduct = async () => {
    try {
      const payload = {
        identification: {
          product_name: formData.name,
          product_sku: `SKU-${Date.now()}`,
        },
        pricing: {
          actual_price: formData.price,
          selling_price: formData.price,
        },
        inventory: {
          quantity: formData.stock.toString(),
        },
        images: {
          urls: [formData.image || "/placeholder.svg?height=56&width=56"], // Use urls array
        },
        descriptions: {
          short_description: formData.shortDescription,
        },
        status_flags: {
          product_status: formData.status === "Active",
        },
        vendor_id: userId,
        category_name: formData.category,
      };

      if (editingProduct) {
        await axiosInstance.put(`/products/${editingProduct.id}`, payload);
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...p,
                  name: formData.name,
                  price: `$${Number.parseFloat(formData.price).toFixed(2)}`,
                  category: formData.category,
                  stock: formData.stock,
                  status: formData.status,
                  image:
                    formData.image?.replace(/\\/g, "/") ||
                    "/placeholder.svg?height=56&width=56",
                  images: [
                    formData.image?.replace(/\\/g, "/") ||
                      "/placeholder.svg?height=56&width=56",
                  ],
                  shortDescription: formData.shortDescription,
                }
              : p
          )
        );
        toast.success(`Product "${formData.name}" updated successfully`);
      } else {
        const response = await axiosInstance.post<ProductResponse>(
          "/products",
          payload
        );
        const newProduct: Product = {
          id: response.data.product_id,
          name: response.data.identification.product_name,
          price: `$${Number.parseFloat(
            response.data.pricing.selling_price
          ).toFixed(2)}`,
          image:
            response.data.images?.urls?.[0]?.replace(/\\/g, "/") ||
            "/placeholder.svg?height=56&width=56",
          images:
            response.data.images?.urls?.map((url) => url.replace(/\\/g, "/")) ||
            [],
          purchases: 0,
          sold: 0,
          status: response.data.status_flags.product_status
            ? "Inactive"
            : "Active",
          category: response.data.category_name,
          subcategory: response.data.subcategory_name,
          createdDate: response.data.timestamp.split("T")[0],
          lastUpdated: response.data.timestamp.split("T")[0],
          rating: 0,
          stock: Number.parseInt(response.data.inventory.quantity) || 0,
          slug: response.data.slug,
          sku: response.data.identification.product_sku,
          shortDescription: response.data.descriptions.short_description,
          fullDescription: response.data.descriptions.full_description,
          seoKeywords:
            response.data.tags_and_relationships?.product_tags?.join(", "),
          seoTitle: "",
          tags: response.data.tags_and_relationships?.product_tags || [],
          featured: response.data.status_flags.featured_product || false,
          weight: response.data.physical_attributes?.weight,
          length: response.data.physical_attributes?.dimensions?.length,
          width: response.data.physical_attributes?.dimensions?.width,
          height: response.data.physical_attributes?.dimensions?.height,
        };
        setProducts((prev) => [...prev, newProduct]);
        toast.success(`Product "${formData.name}" added successfully`);
      }
      setOpen(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: 0,
        status: "Active",
        image: "",
        shortDescription: "",
      });
    } catch (error) {
      toast.error(
        `Failed to ${
          editingProduct ? "update" : "add"
        } product. Please try again.`
      );
      console.error(error);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-12 w-96 animate-pulse rounded-lg bg-muted/50" />
              <div className="h-6 w-80 animate-pulse rounded bg-muted/30" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-24 animate-pulse rounded-lg bg-muted/50" />
              <div className="h-10 w-32 animate-pulse rounded-lg bg-muted/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-muted/30"
              />
            ))}
          </div>
          <Card className="overflow-hidden border-0 bg-white/50 dark:bg-zinc-900/50">
            <div className="h-20 animate-pulse bg-muted/30" />
            <div className="divide-y divide-muted/20">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
      <div className="mx-auto  space-y-8">
        

        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:gap-8 lg:gap-10 flex-wrap">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 p-3 shadow-lg">
                <Package2 className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl p-2 font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Product Management
              </h1>
              <Sparkles className="h-6 w-6 animate-pulse text-yellow-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your product inventory with powerful analytics and insights
            </p>
          </div>
          <div
            className="flex items-center gap-3 animate-fade-in mr-50"
            style={{ animationDelay: "200ms" }}
          >
            <Button
              variant="outline"
              onClick={handleExportProducts}
              className="group relative overflow-hidden border-cyan-200 bg-white/70 backdrop-blur-sm transition-all hover:border-cyan-300 hover:bg-white hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-800"
            >
              <Download className="mr-2 h-2 w-4 transition-transform group-hover:scale-110" />
              Export CSV
            </Button>
            <Button
  onClick={() => router.push("/products/add-product")}
  className="flex items-center px-4 py-2 text-sm sm:text-base md:px-6 md:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all hover:scale-105 rounded-md"
>
  <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
  <span className="hidden sm:inline">Add Product</span>
  <span className="inline sm:hidden">Add</span>
</Button>

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={stats.total.toString()}
            icon={<Package className="h-5 w-5 text-cyan-600" />}
            color="cyan"
            // trend="up"
            // trendValue="+12%"
            // subtitle="All time"
            delay={0}
          />
          <StatCard
            title="Active Products"
            value={stats.active.toString()}
            icon={<CheckCircle className="h-5 w-5 text-green-600" />}
            color="green"
            // trend="up"
            // trendValue="+8%"
            // subtitle="Currently selling"
            delay={100}
          />
          <StatCard
            title="Low Stock Alert"
            value={stats.lowStock.toString()}
            icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
            color="red"
            // trend="down"
            // trendValue="-3"
            // subtitle="≤ 5 items remaining"
            delay={200}
          />
          <StatCard
            title="Total Sales"
            value={0}
            icon={<ShoppingCart className="h-5 w-5 text-indigo-600" />}
            color="indigo"
            // trend="up"
            // trendValue="+15%"
            // subtitle="Units sold"
            delay={300}
          />

        </div>

        {/* Filters */}
        <Card
          className="overflow-hidden border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Search & Filter
              </h3>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative ">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-500 transition-colors" />
                <Input
                  placeholder="Search products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50 w-fit"
                />
              </div>
              <div className="flex flex-wrap gap-3 w-fit">
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-40 border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50 w-fit">
                    <Tag className="mr-2 h-4 w-4 text-cyan-600" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category!.toLowerCase()}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50 w-fit">
                    <Activity className="mr-2 h-4 w-4 text-cyan-600" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priceRangeFilter}
                  onValueChange={setPriceRangeFilter}
                >
                  <SelectTrigger className="w-40 border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50 w-fit">
                    <DollarSign className="mr-2 h-4 w-4 text-cyan-600" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="101-150">$101 - $150</SelectItem>
                    <SelectItem value="150+">$150+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card
          className="overflow-hidden border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
          style={{ animationDelay: "900ms" }}
        >
          <CardHeader className="border-b border-cyan-200/50 dark:border-cyan-800/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-cyan-600" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Products ({filteredProducts.length})
                </h3>
              </div>
              <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                <Clock className="mr-1 h-3 w-3" />
                Live Data
              </Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-cyan-200/50 dark:border-cyan-800/50 bg-cyan-50/30 dark:bg-cyan-900/10">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Product
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Category
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price
                     
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Stock
                    </div>
                  </TableHead>
                  {/* <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Sales
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Rating
                    </div>
                  </TableHead> */}
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="group border-b border-cyan-100/50 dark:border-cyan-800/50 transition-all hover:bg-gradient-to-r hover:from-cyan-50/20 hover:to-blue-50/20 dark:hover:from-cyan-900/10 dark:hover:to-blue-900/10 animate-fade-in-up"
                    style={{ animationDelay: `${1000 + index * 50}ms` }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex space-x-2">
                          {product.images?.length > 0 ? (
                            product.images.slice(0, 3).map((imgUrl, index) => (
                              <div
                                key={index}
                                className="relative overflow-hidden rounded-xl shadow-sm"
                              >
                                <Image
                                  src={imgUrl}
                                  alt={product.name}
                                  width={56}
                                  height={56}
                                  className="h-14 w-14 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {(product.stock || 0) <= 5 && product.status === "Active" && index === 0 && (
                                  <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500 shadow-lg">
                                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="relative overflow-hidden rounded-xl shadow-sm">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={56} // Match the h-14 w-14 (56px)
                                height={56}
                                className="h-14 w-14 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              {(product.stock || 0) <= 5 &&
                                product.status === "Active" && (
                                  <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500 shadow-lg">
                                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                            {product.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                           
                            <span>
                              SKU: {product.sku || product.id.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400 dark:border-blue-700/50"
                      >
                        {product.category || "Uncategorized"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-semibold text-green-600 dark:text-green-400">
                        {product.price}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            (product.stock || 0) <= 5 &&
                            product.status === "Active"
                              ? "text-red-600 dark:text-red-400"
                              : "text-foreground"
                          }`}
                        >
                          {product.stock || 0}
                        </span>
                        {(product.stock || 0) <= 5 &&
                          product.status === "Active" && (
                            <Badge className="animate-pulse bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Low
                            </Badge>
                          )}
                      </div>
                    </TableCell>
                    {/* <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-semibold">{product.sold} sold</div>
                        <div className="text-xs text-muted-foreground">
                          {product.purchases} views
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {product.rating?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </TableCell> */}
                    <TableCell className="py-4">
                      <Badge
                        className={`transition-all hover:scale-105 ${
                          product.status === "Active"
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300 dark:border-green-700/50"
                            : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50"
                        }`}
                      >
                        {product.status === "Active" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <XCircle className="mr-1 h-3 w-3" />
                        )}
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            product.slug && handleViewProduct(product.slug)
                          }
                          className="h-8 w-8 rounded-full transition-all hover:bg-cyan-100 hover:text-cyan-600 hover:scale-110 dark:hover:bg-cyan-900/30"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        {/* <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditProduct(product)}
                          className="h-8 w-8 rounded-full transition-all hover:bg-green-100 hover:text-green-600 hover:scale-110 dark:hover:bg-green-900/30"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button> */}
                        {product.status === "Active" ? (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteProduct(product)}
                            className="h-8 w-8 rounded-full transition-all hover:bg-red-100 hover:text-red-600 hover:scale-110 dark:hover:bg-red-900/30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRestoreProduct(product)}
                            className="h-8 w-8 rounded-full transition-all hover:bg-green-100 hover:text-green-600 hover:scale-110 dark:hover:bg-green-900/30"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 p-8 mb-6 dark:from-cyan-900/30 dark:to-blue-900/30">
                  <Package className="h-16 w-16 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  We couldn't find any products matching your criteria. Try
                  adjusting your search or filter settings.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                      setPriceRangeFilter("all");
                    }}
                    variant="outline"
                    className="transition-all hover:scale-105 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50 dark:border-cyan-700 dark:hover:bg-cyan-900/20"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                  
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Add/Edit Product Dialog */}
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setEditingProduct(null);
              setFormData({
                name: "",
                price: "",
                category: "",
                stock: 0,
                status: "Active",
                image: "",
                shortDescription: "",
              });
            }
          }}
        >
          <DialogContent className="max-w-4xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-zinc-900/95 animate-scale-in">
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2 shadow-lg">
                  {editingProduct ? (
                    <Pencil className="h-5 w-5 text-white" />
                  ) : (
                    <Plus className="h-5 w-5 text-white" />
                  )}
                </div>
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </span>
              </DialogTitle>
              <p className="text-muted-foreground">
                {editingProduct
                  ? "Update product details and save changes"
                  : "Create a new product for your store"}
              </p>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Name
                  </label>
                  <Input
                    name="name"
                    placeholder="Enter product name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price
                  </label>
                  <Input
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className="border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                      {uniqueCategories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category!.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock Quantity
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: value as "Active" | "Inactive",
                      }))
                    }
                  >
                    <SelectTrigger className="border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image URL
                  </label>
                  <Input
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  rows={4}
                  className="w-full rounded-lg border border-cyan-200 bg-white/50 px-3 py-2 text-sm focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none dark:border-cyan-700 dark:bg-zinc-800/50"
                  placeholder="Write a short description..."
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-cyan-200 bg-white/50 transition-all hover:bg-white hover:scale-105 dark:border-cyan-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg transition-all hover:from-cyan-700 hover:to-blue-700 hover:shadow-xl hover:scale-105"
              >
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-zinc-900/95">
            <AlertDialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-r from-red-600 to-rose-600 p-2 shadow-lg">
                  <Trash2 className="h-5 w-5 text-white" />
                </div>
                <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Delete Product
                </AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to delete "{productToDelete?.name}"? This
                action will deactivate the product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {productToDelete && (
              <div className="my-4 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-800/50">
                <div className="flex items-center gap-3">
                  <Image
                    src={productToDelete.image || "/placeholder.svg"}
                    alt={productToDelete.name}
                    width={48} // Set width (e.g., 48px to match h-12 w-12 in Tailwind)
                    height={48} // Set height (e.g., 48px to match h-12 w-12 in Tailwind)
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {productToDelete.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {productToDelete.category} • {productToDelete.price} •
                      Stock: {productToDelete.stock}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="border-cyan-200 bg-white/50 transition-all hover:bg-white hover:scale-105 dark:border-cyan-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteProduct}
                className="bg-gradient-to-r from-red-600 to-rose-600 shadow-lg transition-all hover:from-red-700 hover:to-rose-700 hover:shadow-xl hover:scale-105 text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Deactivate Product
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Restore Confirmation Dialog */}

        <AlertDialog
          open={restoreDialogOpen}
          onOpenChange={setRestoreDialogOpen}
        >
          <AlertDialogContent className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-zinc-900/95">
            <AlertDialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-2 shadow-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>

                <AlertDialogTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Restore Product
                </AlertDialogTitle>
              </div>

              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to restore "{productToRestore?.name}"?
                This will make the product active again.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {productToRestore && (
              <div className="my-4 p-4 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center gap-3">
                  <Image
                    src={productToRestore.image || "/placeholder.svg"}
                    alt={productToRestore.name}
                    width={48} // Match h-12 w-12 (48px)
                    height={48}
                    className="h-12 w-12 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {productToRestore.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {productToRestore.category} • {productToRestore.price} •
                      Stock: {productToRestore.stock}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="border-cyan-200 bg-white/50 transition-all hover:bg-white hover:scale-105 dark:border-cyan-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={confirmRestoreProduct}
                className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Restore Product
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-scale-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
