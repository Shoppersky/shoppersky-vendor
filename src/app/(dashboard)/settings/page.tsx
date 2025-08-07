"use client";

import Image from "next/image";
import { useState } from "react";
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  Palette, 
  Mail, 
  MapPin, 
  Camera, 
  Upload, 
  Save, 
  Settings, 
  Trash2, 
  Check, 
  AlertTriangle, 
  Share2, 
  Download, 
  RefreshCw, 
  Moon, 
  Sun, 
  Monitor, 
  Smartphone, 
  Laptop, 
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Crown,
  Clock,
  Building} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { toast } from "sonner";

interface VendorProfile {
  shopName: string;
  vendorName: string;
  businessEmail: string;
  personalEmail: string;
  gstNumber: string;
  phoneNumber: string;
  alternatePhone: string;
  website: string;
  storeCategory: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    industry: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
  avatarUrl: string;
  coverImageUrl: string;
  businessHours: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
}

interface NotificationSettings {
  email: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    promotionalEmails: boolean;
    weeklyReports: boolean;
    securityAlerts: boolean;
  };
  sms: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    securityAlerts: boolean;
  };
  push: {
    orderUpdates: boolean;
    paymentAlerts: boolean;
    promotionalOffers: boolean;
  };
  frequency: "immediate" | "daily" | "weekly";
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;
  trustedDevices: Array<{
    id: string;
    name: string;
    lastUsed: string;
    location: string;
  }>;
}

interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  compactMode: boolean;
  animations: boolean;
}

export default function VendorSettingsPage() {
  const [form, setForm] = useState<VendorProfile>({
    shopName: "TechStore Pro",
    vendorName: "John Doe",
    businessEmail: "business@techstore.com",
    personalEmail: "john@example.com",
    gstNumber: "22AAAAA0000A1Z5",
    phoneNumber: "+91 9876543210",
    alternatePhone: "+91 9876543211",
    website: "https://techstore.com",
    storeCategory: "electronics",
    description: "Premium electronics and gadgets store with latest technology products.",
    address: {
      street: "123 Tech Street",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      industry: "India"
    },
    socialMedia: {
      instagram: "https://instagram.com/techstore",
      facebook: "https://facebook.com/techstore",
      twitter: "https://twitter.com/techstore",
      youtube: "https://youtube.com/techstore",
      linkedin: "https://linkedin.com/company/techstore"
    },
    avatarUrl: "",
    coverImageUrl: "",
    businessHours: {
      monday: { open: "09:00", close: "18:00", isOpen: true },
      tuesday: { open: "09:00", close: "18:00", isOpen: true },
      wednesday: { open: "09:00", close: "18:00", isOpen: true },
      thursday: { open: "09:00", close: "18:00", isOpen: true },
      friday: { open: "09:00", close: "18:00", isOpen: true },
      saturday: { open: "10:00", close: "16:00", isOpen: true },
      sunday: { open: "10:00", close: "16:00", isOpen: false }
    }
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: {
      orderUpdates: true,
      paymentAlerts: true,
      promotionalEmails: false,
      weeklyReports: true,
      securityAlerts: true
    },
    sms: {
      orderUpdates: true,
      paymentAlerts: true,
      securityAlerts: true
    },
    push: {
      orderUpdates: true,
      paymentAlerts: true,
      promotionalOffers: false
    },
    frequency: "immediate"
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: "2024-01-01",
    trustedDevices: [
      { id: "1", name: "MacBook Pro", lastUsed: "2024-01-15", location: "Bangalore, India" },
      { id: "2", name: "iPhone 15", lastUsed: "2024-01-14", location: "Bangalore, India" }
    ]
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "system",
    accentColor: "#6366f1",
    fontSize: "medium",
    compactMode: false,
    animations: true
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof VendorProfile],
          [child]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNotificationToggle = (category: keyof NotificationSettings, setting: string) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSecurityToggle = (setting: keyof SecuritySettings) => {
    setSecurity((prev) => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAppearanceChange = (setting: keyof AppearanceSettings, value: any) => {
    setAppearance((prev) => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, avatarUrl: url }));
      toast.success("Profile picture updated!");
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, coverImageUrl: url }));
      toast.success("Cover image updated!");
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Saved vendor settings:", { form, notifications, security, appearance });
      setLoading(false);
      toast.success("Settings saved successfully!");
    }, 1500);
  };

  const handleExportData = () => {
    const data = { form, notifications, security, appearance };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendor-settings.json';
    a.click();
    toast.success("Settings exported successfully!");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset logic here
      toast.success("Settings reset to default!");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-2 p-2">
            Settings & Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account, store, and application preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Store
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header Card */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01]">
              <div className="relative h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
                <input
                  type="file"
                  id="cover-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
                <label htmlFor="cover-upload" className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <Camera className="w-4 h-4 text-white" />
                </label>
                {form.coverImageUrl && (
                  <Image src={form.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                )}
              </div>
              <CardContent className="p-6 -mt-16 relative">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-xl transition-all duration-300 hover:scale-110">
                      <AvatarImage src={form.avatarUrl || "/default-avatar.png"} alt="Profile" />
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        {form.vendorName.split(' ').map(n => n[0]).join('').toUpperCase() || 'VN'}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg">
                      <Camera className="w-3 h-3" />
                    </label>
                  </div>
                  <div className="flex-1 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{form.vendorName || "Vendor Name"}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{form.shopName || "Shop Name"}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vendorName" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                  <Input
                    id="vendorName"
                    name="vendorName"
                    value={form.vendorName}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 focus:shadow-lg focus:shadow-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalEmail" className="text-gray-700 dark:text-gray-300">Personal Email</Label>
                  <Input
                    id="personalEmail"
                    name="personalEmail"
                    type="email"
                    value={form.personalEmail}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 focus:shadow-lg focus:shadow-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-300">Primary Phone</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 focus:shadow-lg focus:shadow-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone" className="text-gray-700 dark:text-gray-300">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    name="alternatePhone"
                    value={form.alternatePhone}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 focus:shadow-lg focus:shadow-blue-500/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address.street" className="text-gray-700 dark:text-gray-300">Street Address</Label>
                  <Input
                    id="address.street"
                    name="address.street"
                    value={form.address.street}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 focus:shadow-lg focus:shadow-green-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.city" className="text-gray-700 dark:text-gray-300">City</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={form.address.city}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 focus:shadow-lg focus:shadow-green-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.state" className="text-gray-700 dark:text-gray-300">State</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={form.address.state}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 focus:shadow-lg focus:shadow-green-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.zipCode" className="text-gray-700 dark:text-gray-300">ZIP Code</Label>
                  <Input
                    id="address.zipCode"
                    name="address.zipCode"
                    value={form.address.zipCode}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20 focus:shadow-lg focus:shadow-green-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.industry" className="text-gray-700 dark:text-gray-300">Industry</Label>
                  <Select value={form.address.industry} onValueChange={(val) => setForm(prev => ({ ...prev, address: { ...prev.address, industry: val } }))}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-green-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Store Tab */}
          <TabsContent value="store" className="space-y-6">
            {/* Business Information */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-600" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shopName" className="text-gray-700 dark:text-gray-300">Shop Name</Label>
                  <Input
                    id="shopName"
                    name="shopName"
                    value={form.shopName}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 focus:shadow-lg focus:shadow-orange-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail" className="text-gray-700 dark:text-gray-300">Business Email</Label>
                  <Input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    value={form.businessEmail}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 focus:shadow-lg focus:shadow-orange-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber" className="text-gray-700 dark:text-gray-300">GST Number</Label>
                  <Input
                    id="gstNumber"
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 focus:shadow-lg focus:shadow-orange-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-700 dark:text-gray-300">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleInputChange}
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 focus:shadow-lg focus:shadow-orange-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">Store Category</Label>
                  <Select value={form.storeCategory} onValueChange={(val) => setForm(prev => ({ ...prev, storeCategory: val }))}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                      <SelectItem value="electronics">Electronics & Gadgets</SelectItem>
                      <SelectItem value="grocery">Grocery & Food</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports & Fitness</SelectItem>
                      <SelectItem value="books">Books & Media</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Store Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border rounded-xl bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 text-sm transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20 focus:shadow-lg focus:shadow-orange-500/30 resize-none"
                    placeholder="Tell customers about your store, products, and what makes you unique..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-pink-600" />
                  Social Media Links
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="socialMedia.instagram" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Instagram
                  </Label>
                  <Input
                    id="socialMedia.instagram"
                    name="socialMedia.instagram"
                    value={form.socialMedia.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourstore"
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-pink-500/20 focus:shadow-lg focus:shadow-pink-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia.facebook" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-500" />
                    Facebook
                  </Label>
                  <Input
                    id="socialMedia.facebook"
                    name="socialMedia.facebook"
                    value={form.socialMedia.facebook}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/yourstore"
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 focus:shadow-lg focus:shadow-blue-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia.twitter" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-sky-500" />
                    Twitter
                  </Label>
                  <Input
                    id="socialMedia.twitter"
                    name="socialMedia.twitter"
                    value={form.socialMedia.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourstore"
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-sky-500/20 focus:shadow-lg focus:shadow-sky-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia.youtube" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    YouTube
                  </Label>
                  <Input
                    id="socialMedia.youtube"
                    name="socialMedia.youtube"
                    value={form.socialMedia.youtube}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/yourstore"
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-red-500/20 focus:shadow-lg focus:shadow-red-500/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia.linkedin" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </Label>
                  <Input
                    id="socialMedia.linkedin"
                    name="socialMedia.linkedin"
                    value={form.socialMedia.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/company/yourstore"
                    className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-600/20 focus:shadow-lg focus:shadow-blue-600/30"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(form.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/20">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={hours.isOpen}
                        onCheckedChange={(checked) => 
                          setForm(prev => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, isOpen: checked }
                            }
                          }))
                        }
                      />
                      <span className="font-medium text-gray-900 dark:text-white capitalize w-20">
                        {day}
                      </span>
                    </div>
                    {hours.isOpen ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => 
                            setForm(prev => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                [day]: { ...hours, open: e.target.value }
                              }
                            }))
                          }
                          className="w-24 bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => 
                            setForm(prev => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                [day]: { ...hours, close: e.target.value }
                              }
                            }))
                          }
                          className="w-24 bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">Closed</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Email Notifications */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'orderUpdates' && 'Get notified about order status changes'}
                        {key === 'paymentAlerts' && 'Receive alerts for payment confirmations'}
                        {key === 'promotionalEmails' && 'Marketing and promotional content'}
                        {key === 'weeklyReports' && 'Weekly performance and analytics reports'}
                        {key === 'securityAlerts' && 'Important security and account alerts'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={() => handleNotificationToggle('email', key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-green-600" />
                  SMS Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications.sms).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-green-500/20">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'orderUpdates' && 'SMS alerts for order status changes'}
                        {key === 'paymentAlerts' && 'SMS alerts for payment confirmations'}
                        {key === 'securityAlerts' && 'Critical security alerts via SMS'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={() => handleNotificationToggle('sms', key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-purple-500/20">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'orderUpdates' && 'Browser push notifications for orders'}
                        {key === 'paymentAlerts' && 'Browser push notifications for payments'}
                        {key === 'promotionalOffers' && 'Promotional offers and deals'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={() => handleNotificationToggle('push', key)}
                    />
                  </div>
                ))}

                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl">
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Notification Frequency</Label>
                  <Select value={notifications.frequency} onValueChange={(val: any) => setNotifications(prev => ({ ...prev, frequency: val }))}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Account Security */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-red-500/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-orange-500/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Login Alerts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={() => handleSecurityToggle('loginAlerts')}
                  />
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Session Timeout (minutes)</Label>
                  <Select value={security.sessionTimeout.toString()} onValueChange={(val) => setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(val) }))}>
                    <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Password</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last changed: {security.passwordLastChanged}</p>
                    </div>
                    <Button variant="outline" size="sm" className="transition-all duration-300 hover:shadow-md hover:shadow-green-500/20">
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trusted Devices */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-cyan-600" />
                  Trusted Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {security.trustedDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/20">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                        {device.name.includes('MacBook') ? <Laptop className="w-5 h-5 text-cyan-600" /> : <Smartphone className="w-5 h-5 text-cyan-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{device.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last used: {device.lastUsed} • {device.location}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 transition-all duration-300 hover:shadow-md hover:shadow-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            {/* Theme Settings */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Palette className="w-5 h-5 text-violet-600" />
                  Theme & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Theme Preference</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'light', icon: Sun, label: 'Light' },
                      { value: 'dark', icon: Moon, label: 'Dark' },
                      { value: 'system', icon: Monitor, label: 'System' }
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => handleAppearanceChange('theme', value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          appearance.theme === value
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 shadow-lg shadow-violet-500/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 hover:shadow-md hover:shadow-violet-500/20'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${appearance.theme === value ? 'text-violet-600' : 'text-gray-600 dark:text-gray-400'}`} />
                        <p className={`text-sm font-medium ${appearance.theme === value ? 'text-violet-600' : 'text-gray-600 dark:text-gray-400'}`}>
                          {label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Accent Color</Label>
                  <div className="grid grid-cols-6 gap-3">
                    {[
                      '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
                      '#f59e0b', '#10b981', '#06b6d4', '#6b7280'
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleAppearanceChange('accentColor', color)}
                        className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${
                          appearance.accentColor === color ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Font Size</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'small', label: 'Small' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'large', label: 'Large' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => handleAppearanceChange('fontSize', value)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          appearance.fontSize === value
                            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 shadow-lg shadow-violet-500/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 hover:shadow-md hover:shadow-violet-500/20'
                        }`}
                      >
                        <p className={`font-medium ${
                          value === 'small' ? 'text-sm' : 
                          value === 'medium' ? 'text-base' : 'text-lg'
                        } ${appearance.fontSize === value ? 'text-violet-600' : 'text-gray-600 dark:text-gray-400'}`}>
                          {label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-violet-500/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Compact Mode</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reduce spacing and padding</p>
                  </div>
                  <Switch
                    checked={appearance.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-pink-500/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Animations</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable smooth transitions and effects</p>
                  </div>
                  <Switch
                    checked={appearance.animations}
                    onCheckedChange={(checked) => handleAppearanceChange('animations', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            {/* Data Management */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Export Settings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Download all your settings and preferences</p>
                    </div>
                    <Button onClick={handleExportData} variant="outline" className="transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/20 hover:scale-105">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Import Settings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Restore settings from a backup file</p>
                    </div>
                    <Button variant="outline" className="transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 hover:scale-105">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Reset Settings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reset all settings to default values</p>
                    </div>
                    <Button onClick={handleResetSettings} variant="outline" className="text-red-600 hover:text-red-700 transition-all duration-300 hover:shadow-md hover:shadow-red-500/20 hover:scale-105">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Deactivate Account</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Temporarily disable your account</p>
                    </div>
                    <Button variant="outline" className="text-amber-600 hover:text-amber-700 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/20 hover:scale-105">
                      Deactivate
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Delete Account</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 transition-all duration-300 hover:shadow-md hover:shadow-red-500/20 hover:scale-105">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportData} className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings} className="text-red-600 hover:text-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}




