"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = {
    name: "Vineetha",
    email: "vineetha@example.com",
    role: "Admin",
    phone: "+91 98765 43210",
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      // You can also send the file to your server here
      console.log("Selected file:", file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-gray-500">View your personal and account information</p>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={avatarPreview ?? "/placeholder-avatar.png"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border border-gray-300"
        />
        <Button variant="outline" size="sm" onClick={triggerFileInput} className="cursor-pointer">
          Change Photo
        </Button>
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      <Separator />

      {/* Profile Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <Label className="text-gray-600">Full Name</Label>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <Label className="text-gray-600">Email</Label>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <Label className="text-gray-600">Role</Label>
          <p className="font-medium">{user.role}</p>
        </div>
        <div>
          <Label className="text-gray-600">Phone</Label>
          <p className="font-medium">{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
