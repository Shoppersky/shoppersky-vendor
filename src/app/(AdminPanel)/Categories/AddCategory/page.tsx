// "use client";

// import React, { useState } from "react";
// import slugify from "slugify";
// import { useRouter } from "next/navigation";

// const CategoryCreation = () => {
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     parent: "",
//     metaTitle: "",
//     metaDescription: "",
//     features: {
//       featured: false,
//       homepage: false,
//       promotions: false,
//     },
//   });

//   const router = useRouter();

//   const handleBack = () => {
//     router.push("/Categories");
//   };

//   const handleSave = () => {
//     const isValid = formData.name && formData.slug;
//     if (!isValid) {
//       alert("Please fill in all required fields (Name and Slug).");
//       return;
//     }
//     router.push("/Categories");
//   };

//   const handleCancel = () => {
//     router.push("/Categories");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageRemove = () => {
//     setImagePreview(null);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name === "name") {
//       const generatedSlug = slugify(value, { lower: true });
//       setFormData((prev) => ({
//         ...prev,
//         name: value,
//         slug: generatedSlug,
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFeatureToggle = (
//     feature: keyof typeof formData.features
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [feature]: !prev.features[feature],
//       },
//     }));
//   };

//   return (
//     <div className="bg-gray-50 pt-6 pb-6 px-4 md:px-8">
//       <div className="max-w-6xl mx-auto text-sm">
//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <button
//             onClick={handleBack}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-all"
//           >
//             ← Back
//           </button>
//           <div className="flex gap-2">
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
//             >
//               Save Category
//             </button>
//             <button
//               onClick={handleCancel}
//               className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>

//         {/* Form Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//           {/* Upload Image Card */}
//           <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg text-sm">
//             <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Upload Image</h2>
//             <p className="text-xs md:text-sm text-gray-500 mb-4">
//               Add a thumbnail image to visually represent this category.
//             </p>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
//               {imagePreview ? (
//                 <>
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="mx-auto mb-4 h-52 object-contain rounded"
//                   />
//                   <button
//                     onClick={handleImageRemove}
//                     className="absolute top-2 right-2 text-sm bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="mx-auto h-20 w-20 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
//                     />
//                   </svg>
//                   <p className="mt-2 text-sm text-gray-600">Drag and drop your image here, or</p>
//                   <label className="inline-block mt-2 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
//                     Browse Files
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Category Details Card */}
//           <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg text-sm">
//             <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Category Details</h2>
//             <p className="text-xs md:text-sm text-gray-500 mb-4">Enter the core information that defines this category.</p>
//             <div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter category name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Slug</label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="URL friendly identifier"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2 mt-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   rows={4}
//                   placeholder="Explain what this category includes or represents."
//                 ></textarea>
//               </div>
//               <div className="md:col-span-2 mt-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
//                 <select
//                   name="parent"
//                   value={formData.parent}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select parent category (if applicable)</option>
//                   <option value="electronics">Electronics</option>
//                   <option value="clothing">Clothing</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Features Card */}
//           <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg text-sm">
//             <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">Features</h2>
//             <p className="text-xs md:text-sm text-gray-500 mb-4">
//               Select additional options to highlight or promote the category.
//             </p>
//             <div className="space-y-4">
//               {[
//                 { label: "Featured Category", key: "featured" },
//                 { label: "Display on Homepage", key: "homepage" },
//                 { label: "Enable Promotions", key: "promotions" },
//               ].map((feature) => (
//                 <label
//                   key={feature.key}
//                   className="flex items-center gap-2 text-sm text-gray-700"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={formData.features[feature.key as keyof typeof formData.features]}
//                     onChange={() => handleFeatureToggle(feature.key as keyof typeof formData.features)}
//                     className="h-4 w-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
//                   />
//                   {feature.label}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* SEO Optimization Card */}
//           <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg text-sm">
//             <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">SEO Optimization</h2>
//             <p className="text-xs md:text-sm text-gray-500 mb-4">
//               Improve the visibility of this category on search engines.
//             </p>
//             <div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
//                 <input
//                   type="text"
//                   name="metaTitle"
//                   value={formData.metaTitle}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Title that appears in search engines"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
//                 <textarea
//                   name="metaDescription"
//                   value={formData.metaDescription}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   rows={4}
//                   placeholder="Short description to improve SEO ranking."
//                 ></textarea>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryCreation;


"use client";

import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must not exceed 50 characters")
    .regex(/^[A-Za-z0-9\s-]+$/, "Only letters, numbers, spaces, and hyphens allowed"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .refine((val) => !/<[^>]*script.*?>|('|--|;|\/\*|\*\/|xp_)/gi.test(val), {
      message: "Slug contains potentially dangerous content",
    }),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  metaTitle: z
    .string()
    .max(70, "Meta title must be less than 70 characters")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta description must be less than 160 characters")
    .optional()
    .or(z.literal("")),
  parent: z.string().optional(),
  features: z.object({
    featured: z.boolean(),
    homepage: z.boolean(),
    promotions: z.boolean(),
  }),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoryCreation = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      parent: "",
      features: {
        featured: false,
        homepage: false,
        promotions: false,
      },
    },
  });

  const name = watch("name");

  useEffect(() => {
    const generatedSlug = slugify(name || "", { lower: true });
    setValue("slug", generatedSlug);
  }, [name, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
  };

  const handleBack = () => {
    router.push("/Categories");
  };

  const onSubmit = (data: CategoryFormData) => {
    console.log("Validated Category Data:", data);
    router.push("/Categories");
  };

  return (
    <div className="bg-gray-50 pt-6 pb-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
          <div className="flex gap-2">
            <button
              type="submit"
              form="category-form"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Category
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>

        <form
          id="category-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Upload Image Card */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Upload Image</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto mb-4 h-52 object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 text-sm bg-red-500 text-white rounded px-2 py-1"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <svg
                    className="mx-auto h-20 w-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Drag and drop your image here, or</p>
                  <label className="inline-block mt-2 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Category Details */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Category Details</h2>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter category name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

              <label className="block mt-3 mb-1 font-medium text-gray-700">Slug</label>
              <input
                type="text"
                {...register("slug")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Slug"
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}

              <label className="block mt-3 mb-1 font-medium text-gray-700">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}

              <label className="block mt-3 mb-1 font-medium text-gray-700">Parent Category</label>
              <select {...register("parent")} className="w-full px-3 py-2 border rounded-md">
                <option value="">Select parent category (if applicable)</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Features</h2>
            <div className="space-y-3">
              {["featured", "homepage", "promotions"].map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register(`features.${feature}` as const)}
                    className="h-4 w-4"
                  />
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* SEO Fields */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">SEO Optimization</h2>

            <label className="block mb-1 font-medium text-gray-700">Meta Title</label>
            <input
              type="text"
              {...register("metaTitle")}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="SEO title"
            />
            {errors.metaTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
            )}

            <label className="block mt-3 mb-1 font-medium text-gray-700">Meta Description</label>
            <textarea
              {...register("metaDescription")}
              rows={3}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Short SEO description"
            />
            {errors.metaDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreation;
