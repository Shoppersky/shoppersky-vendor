"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useStore from "../../../lib/Zustand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  BarChart3,
  Star,
  CheckCircle,
  XCircle,
  Tag,
  Filter,
  ArrowUpDown,
  Sparkles,
  Package2,
  ExternalLink,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    selling_price: string;
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
    primary_image?: string;
    additional_images?: string[];
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
  purchases: number;
  sold: number;
  status: "Active" | "Inactive";
  category?: string;
  createdDate?: string;
  lastUpdated?: string;
  rating?: number;
  stock?: number;
  slug?: string;
}

function StatCard({
  title,
  value,
  icon,
  color = "cyan",
  trend,
  trendValue,
  delay = 0,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: "cyan" | "green" | "blue" | "yellow" | "indigo" | "pink" | "red";
  trend?: "up" | "down";
  trendValue?: string;
  delay?: number;
}) {
  const colorClasses = {
    cyan: "from-cyan-500/10 to-cyan-600/20 border-cyan-200/30 dark:border-cyan-700/30",
    green: "from-green-500/10 to-green-600/20 border-green-200/30 dark:border-green-700/30",
    blue: "from-blue-500/10 to-blue-600/20 border-blue-200/30 dark:border-blue-700/30",
    yellow: "from-yellow-500/10 to-yellow-600/20 border-yellow-200/30 dark:border-yellow-700/30",
    indigo: "from-indigo-500/10 to-indigo-600/20 border-indigo-200/30 dark:border-indigo-700/30",
    pink: "from-pink-500/10 to-pink-600/20 border-pink-200/30 dark:border-pink-700/30",
    red: "from-red-500/10 to-red-600/20 border-red-200/30 dark:border-red-700/30",
  };

  return (
    <Card
      className={`group relative overflow-hidden border bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-${color}-500/10 hover:-translate-y-2 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
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
                  <TrendingUp className={`h-3 w-3 ${trend === "down" ? "rotate-180" : ""}`} />
                  {trendValue}
                </div>
              )}
            </div>
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
          <div className="h-12 w-12 rounded-lg bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-16 rounded bg-muted" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 rounded bg-muted" />
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

export default function ProductsPage({ vendorId }: { vendorId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    status: "Active",
    category: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<ProductResponse[]>(
          `/products/by-vendor/1DXzy2`
        );
        const mappedProducts: Product[] = response.data.map((product) => ({
          id: product.product_id,
          name: product.identification.product_name,
          price: `$${parseFloat(product.pricing.selling_price).toFixed(2)}`,
          image: product.images?.primary_image || "/placeholder.svg?height=48&width=48",
          purchases: 0,
          sold: 0,
          status: product.status_flags.product_status ? "Active" : "Inactive",
          category: product.category_name,
          createdDate: product.timestamp.split("T")[0],
          lastUpdated: product.timestamp.split("T")[0],
          rating: 0,
          stock: parseInt(product.inventory.quantity) || 0,
          slug: product.slug,
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

    fetchProducts();
  }, [vendorId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter;
      const matchesCategory = categoryFilter === "all" || product.category?.toLowerCase() === categoryFilter;
      let matchesPrice = true;
      if (priceRangeFilter !== "all") {
        const price = parseFloat(product.price.replace("$", ""));
        switch (priceRangeFilter) {
          case "50-100":
            matchesPrice = price >= 50 && price <= 100;
            break;
          case "100-150":
            matchesPrice = price >= 100 && price <= 150;
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
    const inactiveProducts = products.filter((p) => p.status === "Inactive").length;
    const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
    const totalRevenue = products.reduce((sum, p) => {
      let price = 0;
      if (typeof p.price === "string") {
        price = parseFloat(p.price.replace(/[^0-9.]/g, ""));
      } else if (typeof p.price === "number") {
        price = p.price;
      }
      return sum + price * (p.sold || 0);
    }, 0);
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const totalRatings = products.reduce((sum, p) => sum + (p.rating || 0), 0);
    const avgRating = totalProducts ? (totalRatings / totalProducts).toFixed(1) : "0.0";

    const numDigits = 4;
    const formattedRevenueAmount = Number(totalRevenue.toPrecision(numDigits));
    const revenueString = formattedRevenueAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return {
      total: totalProducts,
      active: activeProducts,
      inactive: inactiveProducts,
      sold: totalSold,
      revenue: revenueString,
      stock: totalStock,
      avgRating,
    };
  }, [products]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  }, [products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : (products.length + 1).toString(),
      name: formData.name,
      price: formData.price,
      image: formData.image || "/placeholder.svg?height=48&width=48",
      purchases: 0,
      sold: 0,
      status: formData.status as "Active" | "Inactive",
      category: formData.category,
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      rating: 0,
      stock: formData.stock,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? { ...product, ...newProduct } : product))
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    setFormData({ name: "", price: "", image: "", description: "", status: "Active", category: "", stock: 0 });
    setOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: "",
      status: product.status,
      category: product.category || "",
      stock: product.stock || 0,
    });
    setOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const handleExportProducts = () => {
    const csvContent = [
      ["ID", "Name", "Price", "Category", "Purchases", "Sold", "Stock", "Status", "Rating", "Created Date", "Last Updated"],
      ...filteredProducts.map((product) => [
        product.id,
        product.name,
        product.price,
        product.category || "",
        product.purchases.toString(),
        product.sold.toString(),
        (product.stock || 0).toString(),
        product.status,
        (product.rating || 0).toString(),
        product.createdDate || "",
        product.lastUpdated || "",
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
    router.push(`/products/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-10 w-80 animate-pulse rounded-lg bg-muted" />
              <div className="h-5 w-96 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
              <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
          <Card className="overflow-hidden">
            <div className="h-16 animate-pulse bg-muted" />
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
        <Card className="w-full max-w-md border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
          <CardContent className="flex items-center gap-4 p-6">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Error Loading Products</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2 shadow-lg">
                <Package2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Product Management
              </h1>
              <Sparkles className="h-6 w-6 animate-pulse text-yellow-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your product inventory with powerful analytics and insights
            </p>
          </div>
          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button
              variant="outline"
              onClick={handleExportProducts}
              className="group relative overflow-hidden border-blue-200 bg-white/50 backdrop-blur-sm transition-all hover:border-blue-300 hover:bg-white hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Export
            </Button>
            <Link href="/add-product">
      <Button
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/25"
      >
        <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
        Add Product
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </Button>
    </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Products"
            value={stats.total.toString()}
            icon={<Package className="h-5 w-5 text-blue-600" />}
            color="blue"
            trend="up"
            trendValue="+12%"
            delay={0}
          />
          <StatCard
            title="Active Products"
            value={stats.active.toString()}
            icon={<CheckCircle className="h-5 w-5 text-green-600" />}
            color="green"
            trend="up"
            trendValue="+8%"
            delay={100}
          />
          <StatCard
            title="Inactive Products"
            value={stats.inactive.toString()}
            icon={<XCircle className="h-5 w-5 text-red-600" />}
            color="red"
            trend="down"
            trendValue="-2%"
            delay={200}
          />
          <StatCard
            title="Total Sold"
            value={stats.sold.toString()}
            icon={<ShoppingCart className="h-5 w-5 text-indigo-600" />}
            color="indigo"
            trend="up"
            trendValue="+15%"
            delay={300}
          />
          <StatCard
            title="Total Revenue"
            value={stats.revenue}
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
            color="green"
            trend="up"
            trendValue="+23%"
            delay={400}
          />
          <StatCard
            title="Avg Rating"
            value={stats.avgRating}
            icon={<Star className="h-5 w-5 text-yellow-600" />}
            color="yellow"
            trend="up"
            trendValue="+0.2"
            delay={500}
          />
        </div>

        <Card
          className="overflow-hidden border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
                <Input
                  placeholder="Search products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40 border-0 bg-muted/50 focus:ring-2 focus:ring-blue-500">
                    <Tag className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category!.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 border-0 bg-muted/50 focus:ring-2 focus:ring-blue-500">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                  <SelectTrigger className="w-40 border-0 bg-muted/50 focus:ring-2 focus:ring-blue-500">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-150">$100 - $150</SelectItem>
                    <SelectItem value="150+">$150+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
          style={{ animationDelay: "700ms" }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-muted/50 bg-muted/30">
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Product
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Category
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Stock
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Sales
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Rating
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="group border-b border-muted/30 transition-all hover:bg-muted/20 animate-fade-in-up"
                    style={{ animationDelay: `${800 + index * 50}ms` }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          {(product.stock || 0) <= 5 && product.status === "Active" && (
                            <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-lg" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold transition-colors group-hover:text-blue-600">
                            {product.name}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {product.category || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-semibold text-green-600 dark:text-green-400">{product.price}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            (product.stock || 0) <= 5 ? "text-red-600 dark:text-red-400" : "text-foreground"
                          }`}
                        >
                          {product.stock || 0}
                        </span>
                        {(product.stock || 0) <= 5 && product.status === "Active" && (
                          <Badge className="animate-pulse bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-semibold">{product.sold} sold</div>
                        <div className="text-xs text-muted-foreground">{product.purchases} purchases</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating?.toFixed(1) || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        } transition-all hover:scale-105`}
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
                          onClick={() => product.slug && handleViewProduct(product.slug)}
                          className="h-8 w-8 rounded-full transition-all hover:bg-blue-100 hover:text-blue-600 hover:scale-110 dark:hover:bg-blue-900/30"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditProduct(product)}
                          className="h-8 w-8 rounded-full transition-all hover:bg-green-100 hover:text-green-600 hover:scale-110 dark:hover:bg-green-900/30"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 w-8 rounded-full transition-all hover:bg-red-100 hover:text-red-600 hover:scale-110 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                <div className="rounded-full bg-muted/50 p-6 mb-4">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setPriceRangeFilter("all");
                  }}
                  variant="outline"
                  className="transition-all hover:scale-105"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-4xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm dark:bg-zinc-900/95 animate-scale-in">
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
                  {editingProduct ? <Pencil className="h-5 w-5 text-white" /> : <Plus className="h-5 w-5 text-white" />}
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </span>
              </DialogTitle>
              <p className="text-muted-foreground">
                {editingProduct ? "Update product details and save changes" : "Create a new product for your store"}
              </p>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input
                    name="name"
                    placeholder="Enter product name..."
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    name="price"
                    placeholder="$0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="border-0 bg-muted/50 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category!.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Quantity</label>
                  <Input
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="border-0 bg-muted/50 focus:ring-2 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="border-0 bg-muted/50 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  className="w-full rounded-lg border-0 bg-muted/50 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Write a detailed description..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-0 bg-muted/50 transition-all hover:bg-muted hover:scale-105"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105"
              >
                {editingProduct ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}