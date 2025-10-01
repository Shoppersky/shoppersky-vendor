"use client";
import Image from "next/image";
import type React from "react";

import { CheckCircle, XCircle, Loader2, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface Industry {
  industry_slug: string;
  industry_name: string;
  industry_id: string;
}

interface Step1Props {
  storeDetails: {
    storeName: string;
    storeUrl: string;
    location: string;
    industry_id: string;
  };
  setStoreDetails: React.Dispatch<
    React.SetStateAction<{
      storeName: string;
      storeUrl: string;
      location: string;
      industry_id: string;
    }>
  >;
  onNext: () => void;
}

export default function Step1StoreSetup({
  storeDetails,
  setStoreDetails,
  onNext,
}: Step1Props) {
  const handleSubmit = () => {
    if (
      storeDetails.storeName &&
      storeDetails.storeUrl &&
      storeDetails.industry_id &&
      storeDetails.location
    ) {
      onNext();
    } else {
      alert("Please fill in all store details.");
    }
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [storeNameStatus, setStoreNameStatus] = useState<
    "available" | "unavailable" | "checking" | null
  >(null);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric and non-dash
      .replace(/--+/g, "-") // Replace multiple dashes with single
      .replace(/^-+|-+$/g, ""); // Trim dashes from start and end

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/industries/?is_active=false"
        );
        setIndustries(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch industries");
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (storeDetails.storeName.trim()) {
        checkStoreNameAvailability(storeDetails.storeName.trim());
      } else {
        setStoreNameStatus(null);
      }
    }, 500); // Debounce by 500ms

    return () => clearTimeout(delayDebounce);
  }, [storeDetails.storeName]);

  const checkStoreNameAvailability = async (name: string) => {
    try {
      setStoreNameStatus("checking");
      const response = await axiosInstance.post(
        "/vendor/check-store-name-availability",
        { store_name: name }
      );

      if (response.data.status_code === 200) {
        setStoreNameStatus("available");
        const slug = slugify(name);
        setStoreDetails((prev) => ({
          ...prev,
          storeUrl: slug,
        }));
      } else {
        setStoreNameStatus("unavailable");
      }
    } catch (error) {
      setStoreNameStatus("unavailable");
    }
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    console.log("User logged out!");

    router.push("/signin");
  };

  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2">
      {/* Image Side */}
      <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-purple-100 to-purple-100 h-full">
        <div className="text-center space-y-6 max-w-md">
          <Image
            src="/images/set.jpg"
            alt="Digital storefront illustration"
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Set Up Your Digital Shop
          </h2>
          <p className="text-gray-600 text-lg">
            Start building your online presence and reach new customers in just
            a few clicks.
          </p>
        </div>
      </div>
      {/* Form Side */}
      <div className="flex items-center justify-center p-6 lg:p-8 relative h-full">
        <Button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1.5 rounded-full shadow transition-all duration-200"
        >
          Logout
        </Button>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4 shadow-lg mx-auto">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Welcome aboard, partner!
            </h1>
            <p className="text-lg text-gray-600">Now, create your store.</p>
          </div>

          <div className="relative space-y-2">
           <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              placeholder="My Awesome Store"
              value={storeDetails.storeName}
              onChange={(e) =>
                setStoreDetails({
                  ...storeDetails,
                  storeName: e.target.value,
                })
              }
              className={`h-12 border-2 pr-10 ${
                storeNameStatus === "available"
                  ? "border-green-500 focus:border-green-500"
                  : storeNameStatus === "unavailable"
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              } transition-colors duration-200`}
              required
            />

            {storeNameStatus === "checking" && (
              <Loader2 className="absolute right-3 top-3 w-5 h-5 mt-6 text-blue-500 animate-spin" />
            )}

            {storeNameStatus === "available" && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 mt-6 text-green-500" />
            )}

            {storeNameStatus === "unavailable" && (
              <XCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
            )}
          </div>

          {storeNameStatus === "unavailable" && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <XCircle className="w-4 h-4" />
              Store name not available. Try something else.
            </p>
          )}

          <div className="space-y-2 w-full">
            <Label htmlFor="storeUrl">Store URL</Label>
            <div className="flex w-full">
              <span className="inline-flex items-center px-3 h-12 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                https://shoppersky.com.au/
              </span>
              <Input
                id="storeUrl"
                placeholder="myawesomestore"
                value={storeDetails.storeUrl}
                onChange={(e) =>
                  setStoreDetails({
                    ...storeDetails,
                    storeUrl: e.target.value,
                  })
                }
                className="h-12 w-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 rounded-r-md rounded-l-none"
                disabled
              />
            </div>
          </div>

          {/* Industry Selection */}
          <div className="space-y-2">
            <Label htmlFor="industry">Select Industry</Label>
            <Select
              value={storeDetails.industry_id}
              onValueChange={(value) =>
                setStoreDetails({ ...storeDetails, industry_id: value })
              }
            >
              <SelectTrigger className="h-12 w-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem value="__loading" disabled>
                    Loading industries...
                  </SelectItem>
                ) : error ? (
                  <SelectItem value="__error" disabled>
                    {error}
                  </SelectItem>
                ) : (
                  industries.map((industry) => (
                    <SelectItem
                      key={industry.industry_id}
                      value={industry.industry_id}
                    >
                      {industry.industry_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={storeDetails.location}
              onValueChange={(value) =>
                setStoreDetails({ ...storeDetails, location: value })
              }
            >
              <SelectTrigger className="h-12 w-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sydney">Sydney</SelectItem>
                <SelectItem value="melbourne">Melbourne</SelectItem>
                <SelectItem value="brisbane">Brisbane</SelectItem>
                <SelectItem value="perth">Perth</SelectItem>
                <SelectItem value="adelaide">Adelaide</SelectItem>
                <SelectItem value="hobart">Hobart</SelectItem>
                <SelectItem value="darwin">Darwin</SelectItem>
                <SelectItem value="canberra">Canberra</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              The location where you or your business is legally registered
              (e.g. where your bank account is).
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-12  bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Create my store
          </Button>
        </div>
      </div>
    </div>
  );
}
