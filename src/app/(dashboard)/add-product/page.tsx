"use client";

import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axiosInstance";
import useStore from "../../../lib/Zustand";

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

export default function AddProductPage() {
  const { userId } = useStore();
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [seo, setSeo] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [activeTab, setActiveTab] = useState("basic");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
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
        setError("Failed to load categories and subcategories. Please try again.");
      }
    };

    fetchVendorCategories();
  }, [userId]);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleAddProduct = async () => {
    if (!productName.trim() || !category.trim() || !price.trim() || !stock.trim()) {
      toast.error("Please fill in all required fields: Product Name, Category, Price, and Stock.");
      return;
    }

    if (!userId) {
      toast.error("Vendor ID is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cat_id", category);
      if (subcategory) {
        formData.append("subcat_id", subcategory);
      }
      formData.append("vendor_id", userId);
      formData.append(
        "identification",
        JSON.stringify({
          product_name: productName,
          product_sku: sku,
        })
      );
      formData.append(
        "descriptions",
        JSON.stringify({
          short_description: shortDescription,
          full_description: description,
        })
      );
      formData.append(
        "pricing",
        JSON.stringify({
          actual_price: price,
          selling_price: salePrice,
        })
      );
      formData.append(
        "inventory",
        JSON.stringify({
          stock_quantity: stock,
          stock_alert_status: stock ? "instock" : "outofstock",
        })
      );
      formData.append(
        "physical_attributes",
        JSON.stringify({
          weight,
          dimensions: { length, width, height },
          shipping_class: "standard",
        })
      );
      formData.append(
        "seo",
        JSON.stringify({
          keywords: seo,
          title: seoTitle,
        })
      );
      formData.append(
        "tags_and_relationships",
        JSON.stringify({
          product_tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          linkedproductid: "",
        })
      );
      formData.append(
        "status_flags",
        JSON.stringify({
          featured_product: featured,
          published_product: isActive,
          product_status: false,
        })
      );

      images.forEach((image, index) => {
        if (image) {
          formData.append(`files[${index}]`, image);
        }
      });

      const response = await axiosInstance.post("/products/create-product/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 201) {
        throw new Error("Failed to create product");
      }

      toast.success("Product added successfully!");
      resetForm();
    } catch (error) {
      toast.error(`Failed to add product: ${error.message}`);
    }
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setSubcategory("");
    setPrice("");
    setSalePrice("");
    setSku("");
    setDescription("");
    setShortDescription("");
    setSeo("");
    setSeoTitle("");
    setStock("");
    setWeight("");
    setLength("");
    setWidth("");
    setHeight("");
    setTags("");
    setFeatured(false);
    setIsActive(true);
    setImages([null, null, null, null]);
    setActiveTab("basic");
    setError("");
  };

  const handleNext = () => {
    const tabsOrder = ["basic", "pricing", "images", "seo", "physical"];
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    }
  };

  // Filter subcategories based on selected category
  const availableSubcategories = category
    ? categories.find((cat) => cat.category_id === category)?.subcategories || []
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-8">
          Add a New Product
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        <div className="backdrop-blur-xl bg-white/40 dark:bg-white-900/40 border border-white/20 dark:border-white-700/20 overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Product Information
            </h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="seo">SEO & Tags</TabsTrigger>
                <TabsTrigger value="physical">Physical Attributes</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Product Name *
                  </label>
                  <Input
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Category *
                  </label>
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      setCategory(value);
                      setSubcategory(""); // Reset subcategory when category changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
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
                    value={subcategory}
                    onValueChange={setSubcategory}
                    disabled={!category || availableSubcategories.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubcategories.map((subcat) => (
                        <SelectItem key={subcat.subcategory_id} value={subcat.subcategory_id}>
                          {subcat.subcategory_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    SKU
                  </label>
                  <Input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Optional SKU"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Short Description
                  </label>
                  <Input
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Short description"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Description
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed product description"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Price *
                    </label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      Sale Price
                    </label>
                    <Input
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Stock Quantity *
                  </label>
                  <Input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Images
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <label
                          htmlFor={`image-upload-${index}`}
                          className="flex items-center justify-center h-24 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group"
                        >
                          {image ? (
                            <div className="relative w-full h-full">
                              <img
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
                                  e.preventDefault();
                                  removeImage(index);
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              <Upload className="w-6 h-6 mb-1" />
                              <p className="text-xs font-medium">
                                {index === 0 ? "Main" : `Image ${index + 1}`}
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Upload up to 4 images. First image will be the main product image.
                  </p>
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    SEO Keywords
                  </label>
                  <Input
                    value={seo}
                    onChange={(e) => setSeo(e.target.value)}
                    placeholder="Comma-separated SEO keywords"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    SEO Title
                  </label>
                  <Input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Tags
                  </label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Comma-separated tags"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Featured Product
                  </label>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active Status
                  </label>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="physical" className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    Weight (kg)
                  </label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <Input
                      placeholder="Width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <Input
                      placeholder="Height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleAddProduct}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Add Product
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}