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
import useStore from "../../../../lib/Zustand";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [published, setIsPublished] = useState(true);
  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [activeTab, setActiveTab] = useState("basic");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

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
        setError(
          "Failed to load categories and subcategories. Please try again."
        );
      }
    };

    fetchVendorCategories();
  }, [userId]);

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    if (
      !productName.trim() ||
      !category.trim() ||
      !price.trim() ||
      !stock.trim()
    ) {
      toast.error(
        "Please fill in all required fields: Product Name, Category, Price, and Stock."
      );
      return;
    }

    //   if (parseFloat(salePrice) > parseFloat(price)) {
    //   toast.error("Sale Price cannot be greater than Actual Price.");
    //   return;
    // }

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
          published_product: published,
          product_status: false,
        })
      );

      // Append images as a list under the 'files' key
      images.forEach((image) => {
        if (image) {
          formData.append("files", image); // Use 'files' as the key for all images
        }
      });

      const response = await axiosInstance.post(
        "/products/create-product/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to create product");
      }

      toast.success("Product added successfully!");
      resetForm();
      router.push("/products");
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
    setFeatured(true);
    setIsPublished(true);
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
    ? categories.find((cat) => cat.category_id === category)?.subcategories ||
      []
    : [];

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-8">
          Add a New Product
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

      <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/20 overflow-hidden rounded-lg">
  <div className="p-4 md:p-6">
    <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
      Product Information
    </h2>

   <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  {/* Tabs List */}
  <TabsList
    className="
      flex flex-nowrap items-center gap-2 mb-3 overflow-x-auto overflow-y-hidden
      px-2 py-1 scrollbar-hide
      md:gap-3 md:px-3 md:py-2
      lg:grid lg:grid-cols-4 lg:gap-4 lg:px-0 lg:py-0 lg:overflow-visible
    "
    style={{
      WebkitOverflowScrolling: "touch",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
    }}
  >
    {[
      { value: "basic", label: "Basic Info" },
      { value: "pricing", label: "Pricing & Inventory" },
      { value: "images-tags", label: "Images & Tags" },
      { value: "physical", label: "Physical Attributes" },
    ].map((tab) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        className="
          flex-shrink-0 min-w-[90px] max-w-[140px] md:min-w-[100px] md:max-w-[160px]
          px-2 py-1.5 text-xs md:text-sm text-center truncate
          rounded-md border border-transparent
          data-[state=active]:bg-background data-[state=active]:shadow-sm
          focus-visible:ring-2 focus-visible:ring-ring focus:outline-none
        "
      >
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>

  {/* === Tabs Content === */}
  <TabsContent value="basic" className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Product Name *
        </label>
        <Input
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="text-sm md:text-base"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          SKU
        </label>
        <Input
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Optional SKU"
          className="text-sm md:text-base"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Category *
        </label>
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setSubcategory("");
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
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
        Short Description
      </label>
      <Input
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
        placeholder="Short description"
        className="text-sm md:text-base"
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
        className="text-sm md:text-base"
      />
    </div>

    <div className="flex justify-end mt-4">
      <Button
        onClick={handleNext}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 text-sm md:text-base"
      >
        Next
      </Button>
    </div>
  </TabsContent>

  {/* Pricing Tab */}
  <TabsContent value="pricing" className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          Price *
        </label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className="text-sm md:text-base"
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
          className="text-sm md:text-base"
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
        className="text-sm md:text-base"
      />
    </div>
  </TabsContent>

  {/* Images & Tags Tab */}
  <TabsContent value="images-tags" className="space-y-6">
    {/* Images Section */}
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Product Images
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <label
              htmlFor={`image-upload-${index}`}
              className="flex items-center justify-center h-20 md:h-24 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 bg-gray-50 dark:bg-gray-800 group"
            >
              {image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
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
                  <Upload className="w-5 h-5 md:w-6 md:h-6 mb-1" />
                  <p className="text-xs font-medium">{index === 0 ? "Main" : `Image ${index + 1}`}</p>
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
    </div>

    {/* SEO & Tags Section */}
    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
        SEO Keywords
      </label>
      <Input
        value={seo}
        onChange={(e) => setSeo(e.target.value)}
        placeholder="Comma-separated SEO keywords"
        className="text-sm md:text-base"
      />
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
          SEO Title
        </label>
        <Input
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="SEO title"
          className="text-sm md:text-base"
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
          className="text-sm md:text-base"
        />
      </div>
    </div>
  </TabsContent>

  {/* Physical Tab */}
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
        className="text-sm md:text-base"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
        Dimensions (cm)
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input
          placeholder="Length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="text-sm md:text-base"
        />
        <Input
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="text-sm md:text-base"
        />
        <Input
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="text-sm md:text-base"
        />
      </div>
    </div>
  </TabsContent>
</Tabs>
  </div>
</div>
<style jsx>{`
  .scrollbar-hide {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
`}</style>

      </div>
    </div>
  );
}
