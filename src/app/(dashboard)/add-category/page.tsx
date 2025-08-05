"use client";

import { useState } from "react";
import { ImageIcon, Search, Filter, Eye, Edit, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Image from "next/image";
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

interface Category {
  id: string;
  name: string;
  section: string;
  description: string;
  seo: string;
  seoTitle: string;
  image: string | null;
  createdAt: string;
  status: "Active" | "Inactive";
  showInTitle: boolean;
}

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categorySection, setCategorySection] = useState("");
  const [description, setDescription] = useState("");
  const [seo, setSeo] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [showInTitle, setShowInTitle] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Predefined category sections
  const categoryOptions = [
    "Technology",
    "Clothing",
    "Education",
    "Health & Beauty",
    "Sports & Fitness",
    "Home & Garden",
    "Food & Beverages",
    "Automotive",
    "Books & Media",
    "Toys & Games",
    "Electronics",
    "Fashion",
    "Travel",
    "Art & Crafts",
    "Music & Instruments"
  ];

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "CAT001",
      name: "Electronics",
      section: "Technology",
      description: "Latest gadgets and devices for modern lifestyle",
      seo: "electronics, gadgets, technology, devices",
      seoTitle: "Electronics - Latest Gadgets & Technology",
      image: null,
      createdAt: "2024-01-15",
      status: "Active",
      showInTitle: true
    },
    {
      id: "CAT002",
      name: "Fashion",
      section: "Clothing",
      description: "Trendy apparel and accessories for all occasions",
      seo: "fashion, clothing, apparel, accessories",
      seoTitle: "Fashion - Trendy Clothing & Accessories",
      image: null,
      createdAt: "2024-01-20",
      status: "Active",
      showInTitle: true
    },
    {
      id: "CAT003",
      name: "Books",
      section: "Education",
      description: "Educational and entertainment books for all ages",
      seo: "books, education, reading, literature",
      seoTitle: "Books - Educational & Entertainment Reading",
      image: null,
      createdAt: "2024-01-25",
      status: "Inactive",
      showInTitle: false
    }
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
    }
  };

  const handleAddCategory = () => {
    if (!categoryName.trim() || !categorySection.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newCategory: Category = {
      id: `CAT${(categories.length + 1).toString().padStart(3, "0")}`,
      name: categoryName,
      section: categorySection,
      description: description,
      seo: seo,
      seoTitle: seoTitle,
      image: image ? URL.createObjectURL(image) : null,
      createdAt: new Date().toISOString().split("T")[0],
      status: isActive ? "Active" : "Inactive",
      showInTitle: showInTitle
    };

    setCategories(prev => [...prev, newCategory]);
    toast.success("Category added successfully!");
    
    // Reset form
    setCategoryName("");
    setCategorySection("");
    setDescription("");
    setSeo("");
    setSeoTitle("");
    setShowInTitle(true);
    setIsActive(true);
    setImage(null);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Category deleted successfully!");
    if (selectedCategory?.id === id) setSelectedCategory(null);
  };

  const handleEditCategory = (category: Category) => {
    setCategoryName(category.name);
    setCategorySection(category.section);
    setDescription(category.description);
    setSeo(category.seo);
    setSeoTitle(category.seoTitle);
    setShowInTitle(category.showInTitle);
    setIsActive(category.status === "Active");
    setSelectedCategory(category);
    setEditMode(true);
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory) return;
    
    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategory.id 
        ? { 
            ...cat, 
            name: categoryName, 
            section: categorySection, 
            description: description,
            seo: seo,
            seoTitle: seoTitle,
            status: isActive ? "Active" : "Inactive",
            showInTitle: showInTitle
          }
        : cat
    ));
    
    toast.success("Category updated successfully!");
    setEditMode(false);
    setSelectedCategory(null);
    setCategoryName("");
    setCategorySection("");
    setDescription("");
    setSeo("");
    setSeoTitle("");
    setShowInTitle(true);
    setIsActive(true);
    setImage(null);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSection === "all" || category.section === filterSection;
    return matchesSearch && matchesFilter;
  });

  const sections = [...new Set(categories.map(cat => cat.section))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="pl-64 pr-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-2 p-2">
            Category Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product categories with ease</p>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Add Category Form */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                  {editMode ? "Edit Category" : "Add New Category"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category Image</label>
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center h-48 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 group"
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setImage(null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        <Upload className="w-12 h-12 mb-3" />
                        <p className="text-sm font-medium">Click to upload image</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Category Name *
                    </label>
                    <Input
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Category Section *
                    </label>
                    <Select value={categorySection} onValueChange={setCategorySection}>
                      <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30">
                        <SelectValue placeholder="Select category section" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="Enter category description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      SEO Keywords
                    </label>
                    <Input
                      placeholder="Enter SEO keywords (comma separated)"
                      value={seo}
                      onChange={(e) => setSeo(e.target.value)}
                      className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      SEO Title
                    </label>
                    <Input
                      placeholder="Enter SEO title"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                    />
                  </div>
                  
                  {/* Toggle Buttons */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Show in Title
                      </label>
                      <Switch
                        checked={showInTitle}
                        onCheckedChange={setShowInTitle}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active Status
                      </label>
                      <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {editMode && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditMode(false);
                        setSelectedCategory(null);
                        setCategoryName("");
                        setCategorySection("");
                        setDescription("");
                        setSeo("");
                        setSeoTitle("");
                        setShowInTitle(true);
                        setIsActive(true);
                        setImage(null);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    onClick={editMode ? handleUpdateCategory : handleAddCategory}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {editMode ? "Update Category" : "Add Category"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Categories Table */}
          <div className="lg:col-span-2">
            {/* Search and Filter Controls */}
            <div className="mb-6 backdrop-blur-xl bg-white/30 dark:bg-slate-900/30 rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 items-center w-full">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30"
                    />
                  </div>
                  <Select value={filterSection} onValueChange={setFilterSection}>
                    <SelectTrigger className="w-48 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sections</SelectItem>
                      {sections.map(section => (
                        <SelectItem key={section} value={section}>{section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Categories Table */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Categories ({filteredCategories.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredCategories.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 dark:border-slate-700/20">
                        <TableHead className="text-gray-700 dark:text-gray-300">Image</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Section</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Show in Title</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Created</TableHead>
                        <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCategories.map((category) => (
                        <TableRow 
                          key={category.id} 
                          className="border-white/20 dark:border-slate-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors"
                        >
                          <TableCell>
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center overflow-hidden">
                              {category.image ? (
                                <Image src={category.image} alt={category.name} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </TableCell>
                          <TableCell className="text-purple-600 dark:text-purple-400">
                            {category.section}
                          </TableCell>
                          <TableCell>
                            <Badge variant={category.status === "Active" ? "default" : "secondary"}>
                              {category.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={category.showInTitle ? "default" : "outline"}>
                              {category.showInTitle ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {category.createdAt}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => setSelectedCategory(category)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDeleteCategory(category.id)}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No categories found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm || filterSection !== "all" 
                        ? "Try adjusting your search or filter criteria" 
                        : "Get started by adding your first category"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Category Detail Card */}
            {selectedCategory && (
              <Card className="mt-6 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                      Category Details
                    </CardTitle>
                    <Button size="sm" variant="outline" onClick={() => setSelectedCategory(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCategory.image && (
                    <div className="aspect-video rounded-xl overflow-hidden max-w-md">
                      <Image src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedCategory.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Section</label>
                      <p className="text-purple-600 dark:text-purple-400">{selectedCategory.section}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                      <div className="mt-1">
                        <Badge variant={selectedCategory.status === "Active" ? "default" : "secondary"}>
                          {selectedCategory.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Show in Title</label>
                      <div className="mt-1">
                        <Badge variant={selectedCategory.showInTitle ? "default" : "outline"}>
                          {selectedCategory.showInTitle ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</label>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{selectedCategory.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                    <p className="text-gray-700 dark:text-gray-300">{selectedCategory.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">SEO Keywords</label>
                      <p className="text-gray-700 dark:text-gray-300">{selectedCategory.seo}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">SEO Title</label>
                      <p className="text-gray-700 dark:text-gray-300">{selectedCategory.seoTitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 