"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"
import { Pencil, Plus, Upload, X, ArrowLeft, XCircle } from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"
import useStore from "../../../../../lib/Zustand"

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
}

interface Category {
  category_id: string
  category_name: string
  slug: string
  description: string
  meta_title: string
  meta_description: string
  imgthumbnail: string
  featured_category: boolean
  show_in_menu: boolean
  status: boolean
  subcategories: Subcategory[]
}

interface Subcategory {
  subcategory_id: string
  subcategory_name: string
  slug: string
  description: string
  meta_title: string
  meta_description: string
  imgthumbnail: string
  featured_category: boolean
  show_in_menu: boolean
  status: boolean
}

export default function ProductForm() {
  const { userId } = useStore()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    salePrice: "",
    sku: "",
    shortDescription: "",
    fullDescription: "",
    seoKeywords: "",
    seoTitle: "",
    stock: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    tags: "",
    featured: false,
    isActive: true,
    images: [null, null, null, null] as (File | null)[]
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchVendorCategories = async () => {
      if (!userId) {
        setError("Vendor ID is required to fetch categories.")
        setLoading(false)
        return
      }
      try {
        const response = await axiosInstance.get(
          `/mapping/list-categories?vendor_ref_id=${userId}&status_value=false`
        )
        if (response.data?.statusCode === 200 && response.data?.data) {
          setCategories(response.data.data)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (error) {
        console.error("Error fetching vendor categories:", error)
        setError("Failed to load categories and subcategories. Please try again.")
      }
    }

    const fetchProduct = async () => {
      if (!slug) {
        setLoading(false)
        return
      }
      try {
        const response = await axiosInstance.get(`/products/slug/${slug}`)
        const product = response.data
        setEditingProduct({
          id: product.product_id,
          name: product.identification.product_name,
          price: `$${Number.parseFloat(product.pricing.selling_price).toFixed(2)}`,
          image: product.images?.primary_image || "/placeholder.svg?height=56&width=56",
          purchases: Math.floor(Math.random() * 100),
          sold: Math.floor(Math.random() * 50),
          status: product.status_flags.product_status ? "Active" : "Inactive",
          category: product.category_name,
          subcategory: product.subcategory_name,
          createdDate: product.timestamp.split("T")[0],
          lastUpdated: product.timestamp.split("T")[0],
          rating: Math.random() * 5,
          stock: Number.parseInt(product.inventory.quantity) || 0,
          slug: product.slug,
          sku: product.identification.product_sku,
          shortDescription: product.descriptions.short_description,
          fullDescription: product.descriptions.full_description,
          seoKeywords: product.tags_and_relationships?.product_tags?.join(", "),
          seoTitle: "",
          tags: product.tags_and_relationships?.product_tags || [],
          featured: product.status_flags.featured_product || false,
          weight: product.physical_attributes?.weight,
          length: product.physical_attributes?.dimensions?.length,
          width: product.physical_attributes?.dimensions?.width,
          height: product.physical_attributes?.dimensions?.height,
        })
        setFormData({
          name: product.identification.product_name,
          category: categories.find((cat) => cat.category_name === product.category_name)?.category_id || "",
          subcategory:
            categories
              .find((cat) => cat.category_name === product.category_name)
              ?.subcategories.find((sub) => sub.subcategory_name === product.subcategory_name)?.subcategory_id || "",
          price: Number.parseFloat(product.pricing.actual_price).toFixed(2),
          salePrice: Number.parseFloat(product.pricing.selling_price).toFixed(2),
          sku: product.identification.product_sku || "",
          shortDescription: product.descriptions.short_description || "",
          fullDescription: product.descriptions.full_description || "",
          seoKeywords: product.tags_and_relationships?.product_tags?.join(", ") || "",
          seoTitle: "",
          stock: product.inventory.quantity || "",
          weight: product.physical_attributes?.weight || "",
          length: product.physical_attributes?.dimensions?.length || "",
          width: product.physical_attributes?.dimensions?.width || "",
          height: product.physical_attributes?.dimensions?.height || "",
          tags: product.tags_and_relationships?.product_tags?.join(", ") || "",
          featured: product.status_flags.featured_product || false,
          isActive: product.status_flags.product_status,
          images: [null, null, null, null],
        })
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product details.")
      } finally {
        setLoading(false)
      }
    }

    fetchVendorCategories()
    fetchProduct()
  }, [])

  const availableSubcategories = formData.category
    ? categories.find((cat) => cat.category_id === formData.category)?.subcategories || []
    : []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }
      const newImages = [...formData.images]
      newImages[index] = file
      setFormData((prev) => ({ ...prev, images: newImages }))
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images]
    newImages[index] = null
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.price.trim() || !formData.stock.trim()) {
      toast.error("Please fill in all required fields: Product Name, Category, Price, and Stock.")
      return
    }

    if (!userId) {
      toast.error("Vendor ID is required")
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("cat_id", formData.category)
      if (formData.subcategory) {
        formDataToSend.append("subcat_id", formData.subcategory)
      }
      formDataToSend.append(
        "identification",
        JSON.stringify({
          product_name: formData.name,
          product_sku: formData.sku,
        })
      )
      formDataToSend.append(
        "descriptions",
        JSON.stringify({
          short_description: formData.shortDescription,
          full_description: formData.fullDescription,
        })
      )
      formDataToSend.append(
        "pricing",
        JSON.stringify({
          actual_price: formData.price,
          selling_price: formData.salePrice || formData.price,
        })
      )
      formDataToSend.append(
        "inventory",
        JSON.stringify({
          quantity: formData.stock,
          stock_alert_status: formData.stock ? "instock" : "outofstock",
        })
      )
      formDataToSend.append(
        "physical_attributes",
        JSON.stringify({
          weight: formData.weight,
          dimensions: { length: formData.length, width: formData.width, height: formData.height },
        })
      )
      formDataToSend.append(
        "tags_and_relationships",
        JSON.stringify({
          product_tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          linkedproductid: "",
        })
      )
      formDataToSend.append(
        "status_flags",
        JSON.stringify({
          featured_product: formData.featured,
          published_product: formData.isActive,
          product_status: formData.isActive,
        })
      )

      formData.images.forEach((image, index) => {
        if (image) {
          formDataToSend.append(`files[${index}]`, image)
        }
      })

      if (editingProduct) {
        await axiosInstance.put(`/products/slug/${editingProduct.slug}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Product updated successfully!")
      } else {
        formDataToSend.append("vendor_id", userId)
        await axiosInstance.post("/products/create-product/", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Product added successfully!")
      }
      router.push("/products")
    } catch (error) {
      toast.error(`Failed to ${editingProduct ? "update" : "add"} product: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="h-12 w-96 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-6 w-80 animate-pulse rounded bg-muted/30" />
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted/30" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/products")}
              className="border-cyan-200 bg-white/50 hover:bg-white dark:border-cyan-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200/50 bg-gradient-to-br from-red-50/80 to-rose-100/80 backdrop-blur-sm dark:border-red-800/50 dark:from-red-950/30 dark:to-rose-950/30">
            <CardContent className="flex items-center gap-4 p-6">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">Error</h3>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card className="border-0 bg-white/70 shadow-xl backdrop-blur-sm dark:bg-zinc-900/70">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 p-2">
                {editingProduct ? <Pencil className="h-5 w-5 text-white" /> : <Plus className="h-5 w-5 text-white" />}
              </div>
              <h2 className="text-xl font-semibold">
                {editingProduct ? "Update Product Details" : "Create a New Product"}
              </h2>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6 bg-cyan-50/50 dark:bg-cyan-900/20">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="seo">SEO & Tags</TabsTrigger>
                <TabsTrigger value="physical">Physical Attributes</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Product Name *
                    </label>
                    <Input
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      SKU
                    </label>
                    <Input
                      name="sku"
                      placeholder="Optional SKU"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Category *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value, subcategory: "" }))}
                    >
                      <SelectTrigger className="border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                        {categories.map((cat) => (
                          <SelectItem key={cat.category_id} value={cat.category_id}>
                            {cat.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Subcategory
                    </label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, subcategory: value }))}
                      disabled={!formData.category || availableSubcategories.length === 0}
                    >
                      <SelectTrigger className="border-cyan-200 bg-white/50 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50">
                        <SelectValue placeholder="Select subcategory (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm dark:bg-zinc-900/95">
                        {availableSubcategories.map((subcat) => (
                          <SelectItem key={subcat.subcategory_id} value={subcat.subcategory_id}>
                            {subcat.subcategory_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Short Description
                  </label>
                  <Input
                    name="shortDescription"
                    placeholder="Short description"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Description
                  </label>
                  <Textarea
                    name="fullDescription"
                    placeholder="Detailed product description"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50 min-h-[120px]"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab("pricing")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Price *
                    </label>
                    <Input
                      name="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Sale Price
                    </label>
                    <Input
                      name="salePrice"
                      type="number"
                      placeholder="0.00"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Stock Quantity *
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
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab("images")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Product Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <label
                          htmlFor={`image-upload-${index}`}
                          className="flex items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group"
                        >
                          {image ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1 h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.preventDefault()
                                  removeImage(index)
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              <Upload className="w-6 h-6 mb-1" />
                              <p className="text-xs font-medium">
                                {index === 0 ? "Main Image" : `Image ${index + 1}`}
                              </p>
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          id={`image-upload-${index}`}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e)}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Upload up to 4 images. First image will be the main product image. Max 5MB each.
                  </p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab("seo")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    SEO Keywords
                  </label>
                  <Input
                    name="seoKeywords"
                    placeholder="Comma-separated SEO keywords"
                    value={formData.seoKeywords}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    SEO Title
                  </label>
                  <Input
                    name="seoTitle"
                    placeholder="SEO title"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Tags
                  </label>
                  <Input
                    name="tags"
                    placeholder="Comma-separated tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Featured Product
                    </label>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Active Status
                    </label>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={() => setActiveTab("physical")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="physical" className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Weight (kg)
                  </label>
                  <Input
                    name="weight"
                    type="number"
                    placeholder="0.0"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="length"
                      placeholder="Length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                    <Input
                      name="width"
                      placeholder="Width"
                      value={formData.width}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                    <Input
                      name="height"
                      placeholder="Height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="border-cyan-200 bg-white/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-cyan-700 dark:bg-zinc-800/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/products")}
                    className="border-cyan-200 bg-white/50 hover:bg-white dark:border-cyan-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    {editingProduct ? "Save Changes" : "Add Product"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}