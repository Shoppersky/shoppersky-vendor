"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Pencil,
  Star,
  CheckCircle,
  XCircle,
  Tag,
  AlertTriangle,
  BarChart3,
  Share2,
  Calendar,
  Ruler,
  Weight,
  Package2,
  Sparkles,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Activity,
} from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"
import Image from "next/image"

interface ProductResponse {
  product_id: string;
  store_name?: string;
  slug: string;
  identification: {
    product_name: string;
    product_sku?: string;
  };
  descriptions: {
    short_description?: string;
    full_description?: string;
  } | null;
  pricing: {
    actual_price?: string;
    selling_price?: string;
  } | null;
  inventory: {
    quantity?: string;
    stock_alert_status?: string;
  } | null;
  physical_attributes?: {
    weight?: string;
    dimensions?: {
      length?: string;
      width?: string;
      height?: string;
    };
  } | null;
  images: {
    urls?: string[];
  } | null;
  tags_and_relationships?: {
    product_tags?: string[];
    linkedproductid?: string;
  } | null;
  status_flags: {
    product_status: boolean;
    featured_product?: boolean;
    published_product?: boolean;
  };
  timestamp: string;
  category_id?: string;
  category_name?: string;
  subcategory_id?: string;
  subcategory_name?: string;
}
interface Product {
  id: string
  name: string
  price: string
  image: string
  purchases: number
  sold: number
  status: "Active" | "Inactive"
  category?: string
  subcategory?: string
  createdDate?: string
  lastUpdated?: string
  rating?: number
  stock?: number
  slug?: string
  sku?: string
  shortDescription?: string
  fullDescription?: string
  seoKeywords?: string
  seoTitle?: string
  tags?: string[]
  featured?: boolean
  weight?: string
  length?: string
  width?: string
  height?: string
  additionalImages?: string[]
}

// function StatCard({
//   title,
//   value,
//   icon,
//   color = "cyan",
//   subtitle,
//   delay = 0,
// }: {
//   title: string
//   value: string
//   icon: React.ReactNode
//   color?: "cyan" | "green" | "blue" | "yellow" | "indigo" | "pink" | "red" | "purple"
//   subtitle?: string
//   delay?: number
// }) {
//   const colorClasses = {
//     cyan: "from-cyan-500/10 to-cyan-600/20 border-cyan-200/50 dark:border-cyan-700/50",
//     green: "from-green-500/10 to-green-600/20 border-green-200/50 dark:border-green-700/50",
//     blue: "from-blue-500/10 to-blue-600/20 border-blue-200/50 dark:border-blue-700/50",
//     yellow: "from-yellow-500/10 to-yellow-600/20 border-yellow-200/50 dark:border-yellow-700/50",
//     indigo: "from-indigo-500/10 to-indigo-600/20 border-indigo-200/50 dark:border-indigo-700/50",
//     pink: "from-pink-500/10 to-pink-600/20 border-pink-200/50 dark:border-pink-700/50",
//     red: "from-red-500/10 to-red-600/20 border-red-200/50 dark:border-red-700/50",
//     purple: "from-purple-500/10 to-purple-600/20 border-purple-200/50 dark:border-purple-700/50",
//   }

//   return (
//     <Card
//       className={`group relative overflow-hidden border bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up cursor-pointer`}
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="space-y-1">
//             <p className="text-xs font-medium text-muted-foreground">{title}</p>
//             <p className="text-xl font-bold">{value}</p>
//             {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
//           </div>
//           <div className="rounded-lg bg-white/50 p-2 transition-all duration-300 group-hover:scale-110 dark:bg-zinc-800/50">
//             {icon}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div
          className={`relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 transition-all duration-300 ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <Image
            src={images[currentImage] || "/placeholder.svg?height=500&width=500"}
            alt={productName}
            fill
            className={`object-cover transition-all duration-500 ${
              isZoomed ? "scale-150" : "scale-100 group-hover:scale-105"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImage(index)
              }}
            />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImage
                  ? "border-cyan-500 ring-2 ring-cyan-500/20"
                  : "border-gray-200 hover:border-gray-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image || "/placeholder.svg?height=80&width=80"}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductView() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
  const fetchProduct = async () => {
    if (!slug) {
      setError("Invalid product slug.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get<ProductResponse>(`/products/slug/${slug}`);
      const productData = response.data;

      if (response.status === 200 && productData.product_id) {
        const mappedProduct: Product = {
          id: productData.product_id,
          name: productData.identification.product_name || "Unnamed Product",
          price: productData.pricing?.selling_price
            ? `$${Number.parseFloat(productData.pricing.selling_price).toFixed(2)}`
            : "$0.00",
          image: productData.images?.urls?.[0] || "/placeholder.svg?height=500&width=500",
          purchases: Math.floor(Math.random() * 1000) + 100,
          sold: Math.floor(Math.random() * 500) + 50,
          status: productData.status_flags.product_status ? "Active" : "Inactive", // Fixed logic
          category: productData.category_name,
          subcategory: productData.subcategory_name,
          createdDate: productData.timestamp.split("T")[0],
          lastUpdated: productData.timestamp.split("T")[0],
          rating: Math.random() * 2 + 3, // 3-5 rating
          stock: productData.inventory?.quantity
            ? Number.parseInt(productData.inventory.quantity)
            : 0,
          slug: productData.slug,
          sku: productData.identification.product_sku,
          shortDescription: productData.descriptions?.short_description,
          fullDescription: productData.descriptions?.full_description,
          seoKeywords: productData.tags_and_relationships?.product_tags?.join(", "),
          seoTitle: "",
          tags: productData.tags_and_relationships?.product_tags || [],
          featured: productData.status_flags.featured_product || false,
          weight: productData.physical_attributes?.weight,
          length: productData.physical_attributes?.dimensions?.length,
          width: productData.physical_attributes?.dimensions?.width,
          height: productData.physical_attributes?.dimensions?.height,
          additionalImages: productData.images?.urls?.slice(1) || [],
        };
        setProduct(mappedProduct);
        setError(null);
      } else {
        setError("Product not found.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch product details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [slug]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-32 animate-pulse rounded-lg bg-muted/50" />
              <div className="h-8 w-64 animate-pulse rounded bg-muted/30" />
            </div>
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted/50" />
          </div>

          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 animate-pulse rounded bg-muted/30" />
            <div className="h-4 w-4 animate-pulse rounded bg-muted/30" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted/30" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted/30" />
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-[500px] w-full animate-pulse rounded-2xl bg-muted/30" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 w-20 animate-pulse rounded-lg bg-muted/30" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted/30" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-muted/30" />
              <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 w-full animate-pulse rounded-lg bg-muted/30" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="w-full max-w-md border-red-200/50 bg-gradient-to-br from-red-50/80 to-rose-100/80 backdrop-blur-sm dark:border-red-800/50 dark:from-red-950/30 dark:to-rose-950/30">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
                <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">Product Not Found</h3>
                <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => router.push("/products")}
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/20"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                  </Button>
                  <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white">
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!product) return null

  const allImages = [product.image, ...(product.additionalImages || [])].filter(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/products")}
              className="border-cyan-200 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg dark:border-cyan-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 p-3 shadow-lg">
                <Package2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Product Details
              </h1>
              <Sparkles className="h-5 w-5 animate-pulse text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => copyToClipboard(window.location.href)}
              className="border-cyan-200 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg dark:border-cyan-700 dark:bg-zinc-800/70 dark:hover:bg-zinc-800"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button
              onClick={() => router.push(`/products/edit/${product.slug}`)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg hover:from-cyan-700 hover:to-blue-700 hover:shadow-xl"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <span>Products</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

{/*       
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            title="Views"
            value={product.purchases.toLocaleString()}
            icon={<Eye className="h-4 w-4 text-blue-600" />}
            color="blue"
            subtitle="Total views"
            delay={200}
          />
          <StatCard
            title="Sales"
            value={product.sold.toString()}
            icon={<ShoppingCart className="h-4 w-4 text-green-600" />}
            color="green"
            subtitle="Units sold"
            delay={300}
          />
          <StatCard
            title="Stock"
            value={product.stock?.toString() || "0"}
            icon={<Package className="h-4 w-4 text-indigo-600" />}
            color={product.stock && product.stock <= 5 ? "red" : "indigo"}
            subtitle={product.stock && product.stock <= 5 ? "Low stock" : "Available"}
            delay={400}
          />
          <StatCard
            title="Rating"
            value={product.rating?.toFixed(1) || "N/A"}
            icon={<Star className="h-4 w-4 text-yellow-600" />}
            color="yellow"
            subtitle="Avg rating"
            delay={500}
          />
          <StatCard
            title="Revenue"
            value={`$${(product.sold * Number.parseFloat(product.price.replace("$", ""))).toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4 text-green-600" />}
            color="green"
            subtitle="Total earned"
            delay={600}
          />
          <StatCard
            title="Status"
            value={product.status}
            icon={
              product.status === "Active" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )
            }
            color={product.status === "Active" ? "green" : "red"}
            subtitle={product.status === "Active" ? "Live" : "Inactive"}
            delay={700}
          />
        </div> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <Card
            className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <CardContent className="p-6">
              <ImageGallery images={allImages} productName={product.name} />
            </CardContent>
          </Card>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card
              className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
              style={{ animationDelay: "900ms" }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-green-600 dark:text-green-400">{product.price}</span>
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 dark:from-yellow-900/40 dark:to-amber-900/40 dark:text-yellow-300">
                          <Award className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{product.rating?.toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400">
                    <Tag className="mr-1 h-3 w-3" />
                    {product.category || "Uncategorized"}
                  </Badge>
                  {product.subcategory && (
                    <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-400">
                      {product.subcategory}
                    </Badge>
                  )}
                  <Badge
                    className={`${
                      product.status === "Active"
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300"
                        : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300"
                    }`}
                  >
                    {product.status === "Active" ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {product.status}
                  </Badge>
                </div>

                {product.shortDescription && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.shortDescription}</p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <span
                      className={`font-semibold ${
                        product.stock && product.stock <= 5 ? "text-red-600 dark:text-red-400" : "text-foreground"
                      }`}
                    >
                      {product.stock}
                    </span>
                    {product.stock && product.stock <= 5 && (
                      <Badge className="animate-pulse bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Card */}
            <Card
              className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
              style={{ animationDelay: "1000ms" }}
            >
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-600" />
                  Product Information
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">SKU</label>
                    <p className="font-mono text-sm bg-muted/50 px-2 py-1 rounded">{product.sku || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{product.createdDate || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {product.fullDescription && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-muted/30 p-3 rounded-lg">
                      {product.fullDescription}
                    </p>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 dark:from-purple-900/30 dark:to-indigo-900/30 dark:text-purple-400"
                        >
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Physical Attributes Card */}
            {(product.weight || product.length || product.width || product.height) && (
              <Card
                className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
                style={{ animationDelay: "1100ms" }}
              >
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-cyan-600" />
                    Physical Attributes
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.weight && (
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <Weight className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Weight</p>
                          <p className="text-sm text-muted-foreground">{product.weight} kg</p>
                        </div>
                      </div>
                    )}
                    {product.length && product.width && product.height && (
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <Ruler className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Dimensions</p>
                          <p className="text-sm text-muted-foreground">
                            {product.length} × {product.width} × {product.height} cm
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SEO Information Card */}
            {product.seoKeywords && (
              <Card
                className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70 animate-fade-in-up"
                style={{ animationDelay: "1200ms" }}
              >
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-cyan-600" />
                    SEO Information
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Keywords</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-muted/30 p-3 rounded-lg">
                      {product.seoKeywords}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
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
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
