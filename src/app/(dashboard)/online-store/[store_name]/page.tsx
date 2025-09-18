// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import {
//   Star,
//   Heart,
//   User,
//   X,
//   Filter,
//   Edit3,
//   Save,
//   Camera,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import axiosInstance from "@/lib/axiosInstance";
// import useStore from "@/lib/Zustand";
// import { toast } from "sonner";

// interface Product {
//   product_id: number;
//   identification?: {
//     product_name?: string;
//   };
//   pricing?: {
//     actual_price?: string;
//     selling_price?: string;
//   };
//   images?: {
//     urls?: string[];
//   };
//   rating?: number;
//   reviews?: number;
//   category_name?: string;
//   featured?: boolean;
// }

// interface Category {
//   category_id: string;
//   category_name: string;
// }

// interface StoreSettings {
//   storeName: string;
//   storeTagline: string;
//   bannerTitle: string | null;
//   bannerSubtitle: string | null;
//   bannerImage: string;
//   ownerName: string;
//   ownerImage: string;
// }

// const OnlineStorePage: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [cartItems, setCartItems] = useState(0);
//   const [wishlistItems, setWishlistItems] = useState<number[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);

//   // Admin States
//   const [isAdminMode, setIsAdminMode] = useState(true);
//   const [editingBanner, setEditingBanner] = useState(false);
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [editingStore, setEditingStore] = useState(false);

//   // Data States
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [productss, setProductss] = useState<Product[]>([]);
//   const { userId } = useStore();

//   // Store Settings
//   const [storeSettings, setStoreSettings] = useState<StoreSettings>({
//     storeName: "",
//     storeTagline: "Your Premium Shopping Destination", // Default value, as not provided in API
//     bannerTitle: null,
//     bannerSubtitle: null,
//     bannerImage: "/api/placeholder/1200/600", // Default placeholder
//     ownerName: "Unknown Owner", // Default value, as not provided in API
//     ownerImage: "/api/placeholder/150/150", // Default placeholder
//   });

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/mapping/?vendor_ref_id=${userId}&status_filter=false`
//       );
//       console.log("API Response for Categories:", response.data);
//       setCategories(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Failed to load category data");
//     }
//   };

//   const fetchStoreData = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get(`/products/by-vendor-id/${userId}`);
//       console.log("API Response for Store Data:", response.data);

//       // Map store settings from API response
//       setStoreSettings((prev) => ({
//         ...prev,
//         storeName: response.data.store_name || "ShopHub",
//         bannerTitle: response.data.banner_title || "Discover Amazing Products",
//         bannerSubtitle: response.data.banner_subtitle || "Shop the latest trends with unbeatable prices and quality",
//         bannerImage: response.data.banner_image || "/api/placeholder/1200/600",
//       }));

//       // Map products
//       setProductss(response.data.products || []);
//     } catch (error) {
//       console.error("Error fetching store data:", error);
//       toast.error("Failed to load store data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredProducts =
//     selectedCategory.toLowerCase() === "all"
//       ? productss
//       : productss
//           .filter(
//             (product) =>
//               product.category_name?.toLowerCase() ===
//               selectedCategory.toLowerCase()
//           )
//           .filter((product) => product.identification?.product_name);

//   const addToCart = (productId: number) => {
//     setCartItems((prev) => prev + 1);
//   };

//   const toggleWishlist = (productId: number) => {
//     setWishlistItems((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const saveStoreSettings = (newSettings: Partial<StoreSettings>) => {
//     setStoreSettings((prev) => ({ ...prev, ...newSettings }));
//   };

//   const handleImageUpload = (file: File, type: "banner" | "profile") => {
//     try {
//       if (type === "banner") {
//         setSelectedBannerFile(file);
//         const previewUrl = URL.createObjectURL(file);
//         saveStoreSettings({ bannerImage: previewUrl });
//         console.log("Banner image selected. Save changes to upload.");
//       } else {
//         const imageUrl = URL.createObjectURL(file);
//         saveStoreSettings({ ownerImage: imageUrl });
//         toast.success("Profile image updated successfully");
//       }
//     } catch (error) {
//       console.error(`Error processing ${type} image:`, error);
//       toast.error(`Failed to process ${type} image`);
//     }
//   };

//   const handleSaveBannerChanges = async () => {
//     try {
//       if (selectedBannerFile) {
//         const formData = new FormData();
//         formData.append("file", selectedBannerFile);

//         const response = await axiosInstance.post(
//           `/vendor/banner-image/${userId}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         const imageUrl = response.data.data.banner_image_url;
//         if (imageUrl) {
//           saveStoreSettings({ bannerImage: imageUrl });
//           toast.success("Banner image uploaded successfully");
//         } else {
//           throw new Error("No image URL returned from the server");
//         }
//       } else {
//         toast.success("Banner settings updated successfully");
//       }

//       setEditingBanner(false);
//       setSelectedBannerFile(null);
//     } catch (error) {
//       console.error("Error saving banner changes:", error);
//       toast.error("Failed to save banner changes");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchStoreData();
//   }, [userId]);

//   return (
//     <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
//       {/* Hero Banner */}
//       <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         {isAdminMode && (
//           <button
//             onClick={() => setEditingBanner(true)}
//             className="absolute top-4 right-4 z-10 bg-yellow-500 text-white p-3 rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
//             title="Edit Banner"
//           >
//             <Edit3 className="h-5 w-5" />
//           </button>
//         )}

//         {storeSettings.bannerImage && (
//           <div className="absolute inset-0">
//             <Image
//               src={storeSettings.bannerImage}
//               alt=""
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-black opacity-40"></div>
//           </div>
//         )}
//         <div className="absolute inset-0"></div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               {storeSettings.bannerTitle}
//             </h1>
//             <p className="text-xl md:text-2xl mb-8 opacity-90">
//               {storeSettings.bannerSubtitle}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
//                 Shop Now
//               </button>
//               <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Product Categories Menu */}
//       <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Shop by Category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {categories
//               .filter((cat) => cat.category_id !== "all")
//               .map((category) => (
//                 <div
//                   key={category.category_id}
//                   onClick={() => setSelectedCategory(category.category_name)}
//                   className={`cursor-pointer rounded-lg p-6 text-center transition-all hover:shadow-md ${
//                     selectedCategory === category.category_name
//                       ? "bg-indigo-100 border-2 border-indigo-500"
//                       : "bg-white border border-gray-200"
//                   }`}
//                 >
//                   <div className="flex flex-col items-center">
//                     <h3 className="font-medium text-lg">
//                       {category.category_name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {
//                         productss.filter(
//                           (p) =>
//                             p.category_name?.toLowerCase() ===
//                             category.category_name?.toLowerCase()
//                         ).length
//                       }{" "}
//                       Products
//                     </p>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Product Catalog
//             </h2>
//             <p className="text-gray-600">
//               Preview how customers see your products
//             </p>
//           </div>
//           <div className="flex items-center space-x-4 mt-4 sm:mt-0">
//             <div className="flex items-center space-x-2">
//               <Filter className="h-4 w-4 text-gray-500" />
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//               >
//                 {categories.map((category) => (
//                   <option
//                     key={category.category_id}
//                     value={category.category_name}
//                   >
//                     {category.category_name}
//                   </option>
//                 ))}
//                 <option value="all">All</option>
//               </select>
//             </div>
//             <div className="text-sm text-gray-500">
//               Showing {filteredProducts.length} of {productss.length} products
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {isLoading ? (
//           <div className="text-center py-8">Loading products...</div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No products found.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
//             {filteredProducts.map((product) => (
//               <Card
//                 key={product.product_id}
//                 className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md bg-white rounded-xl"
//               >
//                 {/* Product Image Container */}
//                 <div className="relative overflow-hidden">
//                   <div className="aspect-square w-full bg-gray-100 relative">
//                     <Image
//                       src={product.images?.urls?.[0] || "/placeholder.svg"}
//                       alt={product.identification?.product_name || "Product"}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
//                   </div>

//                   {/* Product Badges */}
//                   <div className="absolute top-3 left-3 flex flex-col gap-2">
//                     {product.featured && (
//                       <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
//                         Featured
//                       </span>
//                     )}
//                     {product.pricing?.actual_price &&
//                       product.pricing?.selling_price &&
//                       !isNaN(parseFloat(product.pricing.actual_price)) &&
//                       !isNaN(parseFloat(product.pricing.selling_price)) && (
//                         <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
//                           -
//                           {(
//                             ((parseFloat(product.pricing.selling_price) -
//                               parseFloat(product.pricing.actual_price)) /
//                               parseFloat(product.pricing.selling_price)) *
//                             100
//                           ).toFixed(0)}
//                           % OFF
//                         </span>
//                       )}
//                   </div>

//                   {/* Wishlist Button */}
//                   <button
//                     onClick={() => toggleWishlist(product.product_id)}
//                     className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
//                   >
//                     <Heart
//                       className={`h-4 w-4 ${
//                         wishlistItems.includes(product.product_id)
//                           ? "text-red-500 fill-current"
//                           : "text-gray-600"
//                       }`}
//                     />
//                   </button>
//                 </div>

//                 {/* Product Information */}
//                 <CardContent className="p-4 space-y-3">
//                   {/* Product Category */}
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
//                       {product.category_name || "Uncategorized"}
//                     </span>
//                   </div>

//                   {/* Product Name */}
//                   <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">
//                     {product.identification?.product_name || "Unnamed Product"}
//                   </h3>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-3 w-3 ${
//                             i < Math.floor(product.rating || 0)
//                               ? "text-yellow-400 fill-current"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Price Section */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <span className="text-lg font-bold text-indigo-600">
//                         {product.pricing?.selling_price
//                           ? `$${parseFloat(
//                               product.pricing.selling_price
//                             ).toFixed(2)}`
//                           : "N/A"}
//                       </span>
//                       {product.pricing?.actual_price && (
//                         <span className="text-sm text-gray-500 line-through">
//                           $
//                           {parseFloat(product.pricing.actual_price).toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Newsletter Section */}
//       <section className="bg-gray-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//           <p className="text-xl mb-8 opacity-90">
//             Subscribe to our newsletter for exclusive deals and new arrivals
//           </p>
//           <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-md text-gray-900 h-10"
//             />
//             <Button className="bg-indigo-600 hover:bg-indigo-700 h-10">
//               Subscribe
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Admin Edit Overlays */}
//       {editingBanner && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Edit Store Banner</h3>
//               <button
//                 onClick={() => {
//                   setEditingBanner(false);
//                   setSelectedBannerFile(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Banner Title
//                 </label>
//                 <input
//                   type="text"
//                   value={storeSettings.bannerTitle || ""}
//                   onChange={(e) =>
//                     saveStoreSettings({ bannerTitle: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Banner Subtitle
//                 </label>
//                 <textarea
//                   value={storeSettings.bannerSubtitle || ""}
//                   onChange={(e) =>
//                     saveStoreSettings({ bannerSubtitle: e.target.value })
//                   }
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Banner Background Image
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) handleImageUpload(file, "banner");
//                     }}
//                     className="hidden"
//                     id="banner-upload"
//                   />
//                   <label
//                     htmlFor="banner-upload"
//                     className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
//                   >
//                     <Camera className="h-4 w-4" />
//                     <span className="text-sm">Upload Image</span>
//                   </label>
//                   {storeSettings.bannerImage && (
//                     <div className="w-12 h-12 rounded overflow-hidden">
//                       <Image
//                         src={storeSettings.bannerImage}
//                         alt="Banner preview"
//                         width={48}
//                         height={48}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end space-x-2 mt-6">
//               <button
//                 onClick={() => {
//                   setEditingBanner(false);
//                   setSelectedBannerFile(null);
//                 }}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveBannerChanges}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
//               >
//                 <Save className="h-4 w-4" />
//                 <span>Save Changes</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OnlineStorePage;



"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  Heart,
  User,
  X,
  Filter,
  Edit3,
  Save,
  Camera,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/lib/Zustand";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface Product {
  product_id: number;
  identification?: {
    product_name?: string;
  };
  pricing?: {
    actual_price?: string;
    selling_price?: string;
  };
  images?: {
    urls?: string[];
  };
  rating?: number;
  reviews?: number;
  category_name?: string;
  featured?: boolean;
}

interface Category {
  category_id: string;
  category_name: string;
}

interface StoreSettings {
  storeName: string;
  storeTagline: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string;
  ownerName: string;
  ownerImage: string;
}

const OnlineStorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(null);

  // Admin States
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [editingBanner, setEditingBanner] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingStore, setEditingStore] = useState(false);

  // Data States
  const [categories, setCategories] = useState<Category[]>([]);
  const [productss, setProductss] = useState<Product[]>([]);
  const { userId } = useStore();

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: "",
    storeTagline: "Your Premium Shopping Destination",
    bannerTitle: "Discover Amazing Products",
    bannerSubtitle: "Shop the latest trends with unbeatable prices and quality",
    bannerImage: "/api/placeholder/1200/600",
    ownerName: "Unknown Owner",
    ownerImage: "/api/placeholder/150/150",
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `/mapping/?vendor_ref_id=${userId}&status_filter=false`
      );
      console.log("API Response for Categories:", response.data);
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load category data");
    }
  };

  const fetchStoreData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/products/by-vendor-id/${userId}`);
      console.log("API Response for Store Data:", response.data);

      // If no store exists, trigger 404
      if (!response.data || !response.data.store_name) {
        notFound(); // this shows app/not-found.tsx
      }

      // Map store settings from API response
      setStoreSettings((prev) => ({
        ...prev,
        storeName: response.data.store_name || "ShopHub",
        bannerTitle: response.data.banner_title || "Discover Amazing Products",
        bannerSubtitle:
          response.data.banner_subtitle ||
          "Shop the latest trends with unbeatable prices and quality",
        bannerImage: response.data.banner_image || "/api/placeholder/1200/600",
      }));

      // Map products
      setProductss(response.data.products || []);
    } catch (error) {
      console.error("Error fetching store data:", error);
      toast.error("Failed to load store data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory.toLowerCase() === "all"
      ? productss
      : productss
          .filter(
            (product) =>
              product.category_name?.toLowerCase() ===
              selectedCategory.toLowerCase()
          )
          .filter((product) => product.identification?.product_name);

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1);
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const saveStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleImageUpload = (file: File, type: "banner" | "profile") => {
    try {
      if (type === "banner") {
        setSelectedBannerFile(file);
        const previewUrl = URL.createObjectURL(file);
        saveStoreSettings({ bannerImage: previewUrl });
        console.log("Banner image selected. Save changes to upload.");
      } else {
        const imageUrl = URL.createObjectURL(file);
        saveStoreSettings({ ownerImage: imageUrl });
        toast.success("Profile image updated successfully");
      }
    } catch (error) {
      console.error(`Error processing ${type} image:`, error);
      toast.error(`Failed to process ${type} image`);
    }
  };

  // const handleSaveBannerChanges = async () => {
  //   try {
  //     const formData = new FormData();
  //     if (selectedBannerFile) {
  //       formData.append("file", selectedBannerFile);
  //     }
  //     formData.append("banner_title", storeSettings.bannerTitle);
  //     formData.append("banner_subtitle", storeSettings.bannerSubtitle);

  //     const response = await axiosInstance.post(
  //       `/vendor/banner-image/${userId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     const { banner_image_url, banner_title, banner_subtitle } = response.data.data;
  //     if (banner_image_url || banner_title || banner_subtitle) {
  //       saveStoreSettings({
  //         bannerImage: banner_image_url || storeSettings.bannerImage,
  //         bannerTitle: banner_title || storeSettings.bannerTitle,
  //         bannerSubtitle: banner_subtitle || storeSettings.bannerSubtitle,
  //       });
  //       toast.success("Banner settings updated successfully");
  //     } else {
  //       throw new Error("No valid data returned from the server");
  //     }

  //     setEditingBanner(false);
  //     setSelectedBannerFile(null);
  //   } catch (error) {
  //     console.error("Error saving banner changes:", error);
  //     toast.error("Failed to save banner changes");
  //   }
  // };

  const handleSaveBannerChanges = async () => {
  try {
    const formData = new FormData();

    if (selectedBannerFile) {
      // ✅ New file selected
      formData.append("file", selectedBannerFile);
    } else if (storeSettings.bannerImage) {
      // ✅ No new file → send current banner image URL (or blob if backend expects file)
      formData.append("file", storeSettings.bannerImage);
      // ⚠️ use "file_url" (or whatever your backend expects for existing images)
    }

    formData.append("banner_title", storeSettings.bannerTitle);
    formData.append("banner_subtitle", storeSettings.bannerSubtitle);

    const response = await axiosInstance.post(
      `/vendor/banner-image/${userId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const { banner_image_url, banner_title, banner_subtitle } = response.data.data;

    if (banner_image_url || banner_title || banner_subtitle) {
      saveStoreSettings({
        bannerImage: banner_image_url || storeSettings.bannerImage,
        bannerTitle: banner_title || storeSettings.bannerTitle,
        bannerSubtitle: banner_subtitle || storeSettings.bannerSubtitle,
      });
      toast.success("Banner settings updated successfully");
    } else {
      throw new Error("No valid data returned from the server");
    }

    setEditingBanner(false);
    setSelectedBannerFile(null);
  } catch (error) {
    console.error("Error saving banner changes:", error);
    toast.error("Failed to save banner changes");
  }
};

  useEffect(() => {
    fetchCategories();
    fetchStoreData();
  }, [userId]);

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        {isAdminMode && (
          <AlertDialog open={editingBanner} onOpenChange={setEditingBanner}>
  <AlertDialogTrigger asChild>
  <button
    className="absolute top-4 right-4 z-10 bg-yellow-500 text-white p-3 rounded-full shadow-md hover:bg-yellow-600 transition duration-300"
    title="Edit Banner"
  >
    <Edit3 className="h-5 w-5" />
  </button>
</AlertDialogTrigger>
  </AlertDialog>

        )}

        {storeSettings.bannerImage && (
          <div className="absolute inset-0">
            <Image
              src={storeSettings.bannerImage}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        )}
        <div className="absolute inset-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {storeSettings.bannerTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {storeSettings.bannerSubtitle}
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
                Shop Now
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
                Learn More
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Product Categories Menu */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((cat) => cat.category_id !== "all")
              .map((category) => (
                <div
                  key={category.category_id}
                  onClick={() => setSelectedCategory(category.category_name)}
                  className={`cursor-pointer rounded-lg p-6 text-center transition-all hover:shadow-md ${
                    selectedCategory === category.category_name
                      ? "bg-indigo-100 border-2 border-indigo-500"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <h3 className="font-medium text-lg">
                      {category.category_name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {
                        productss.filter(
                          (p) =>
                            p.category_name?.toLowerCase() ===
                            category.category_name?.toLowerCase()
                        ).length
                      }{" "}
                      Products
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Product Catalog
            </h2>
            <p className="text-gray-600">
              Preview how customers see your products
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-wrap space-y-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_name}
                  >
                    {category.category_name}
                  </option>
                ))}
                <option value="all">All</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {productss.length} products
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.product_id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md bg-white rounded-xl p-0"
              >
                {/* Product Image Container */}
                <div className="relative overflow-hidden">
                  <div className="aspect-square w-full bg-gray-100 relative">
                    <Image
                      src={product.images?.urls?.[0] || "/placeholder.svg"}
                      alt={product.identification?.product_name || "Product"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Product Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                        Featured
                      </span>
                    )}


                  </div>

                  {/* Wishlist Button */}
                  {/* <button
                    onClick={() => toggleWishlist(product.product_id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlistItems.includes(product.product_id)
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button> */}
                </div>

                {/* Product Information */}
                <CardContent className="p-4 space-y-1">
                  {/* Product Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {product.category_name || "Uncategorized"}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2rem] leading-tight">
                    {product.identification?.product_name || "Unnamed Product"}
                  </h3>

                  {/* Rating */}
                  {/* <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div> */}

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-indigo-600">
                        {product.pricing?.selling_price
                          ? `$${parseFloat(
                              product.pricing.selling_price
                            ).toFixed(2)}`
                          : "N/A"}
                      </span>
                      {product.pricing?.actual_price && (
                        <span className="text-sm text-gray-500 line-through">
                          $
                          {parseFloat(product.pricing.actual_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
  

      {/* Admin Edit Overlays */}
      {/* {editingBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Store Banner</h3>
              <button
                onClick={() => {
                  setEditingBanner(false);
                  setSelectedBannerFile(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={storeSettings.bannerTitle}
                  onChange={(e) =>
                    saveStoreSettings({ bannerTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Subtitle
                </label>
                <textarea
                  value={storeSettings.bannerSubtitle}
                  onChange={(e) =>
                    saveStoreSettings({ bannerSubtitle: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Background Image
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, "banner");
                    }}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="text-sm">Upload Image</span>
                  </label>
                  {storeSettings.bannerImage && (
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <Image
                        src={storeSettings.bannerImage}
                        alt="Banner preview"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setEditingBanner(false);
                  setSelectedBannerFile(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBannerChanges}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Admin Edit Overlays */}
<AlertDialog open={editingBanner} onOpenChange={setEditingBanner}>
  <AlertDialogContent className="max-w-md">
    <AlertDialogHeader>
      <AlertDialogTitle>Edit Store Banner</AlertDialogTitle>
      <AlertDialogDescription>
        Update your store banner details and upload a new image if required.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <div className="space-y-4 mt-4">
      {/* Banner Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Title
        </label>
        <input
          type="text"
          value={storeSettings.bannerTitle}
          onChange={(e) => saveStoreSettings({ bannerTitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Banner Subtitle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Subtitle
        </label>
        <textarea
          value={storeSettings.bannerSubtitle}
          onChange={(e) =>
            saveStoreSettings({ bannerSubtitle: e.target.value })
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Banner Background Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Background Image
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file, "banner")
            }}
            className="hidden"
            id="banner-upload"
          />
          <label
            htmlFor="banner-upload"
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer"
          >
            <Camera className="h-4 w-4" />
            <span className="text-sm">Upload Image</span>
          </label>
          {storeSettings.bannerImage && (
            <div className="w-12 h-12 rounded overflow-hidden">
              <Image
                src={storeSettings.bannerImage}
                alt="Banner preview"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>

    <AlertDialogFooter className="mt-6">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleSaveBannerChanges}
        className="bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Save Changes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
};

export default OnlineStorePage;