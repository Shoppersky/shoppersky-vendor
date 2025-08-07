"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Optional: fetch vendor status from backend
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
            MS
          </div>
          <span className="text-sm font-medium">My Store</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-center">Welcome to Vendor Dashboard</h2>
      </div>

      {/* Application Under Process Modal */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Application Under Process</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Thank you for registering your business. Your application is currently under review. We’ll notify you once your business is verified and approved.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
