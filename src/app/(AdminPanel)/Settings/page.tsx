// "use client";

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";

// export default function SettingsPage() {
//   const [formData, setFormData] = useState({
//     defaultPassword: "",
//     enable180DayFlag: false,
//     bookingTimeout: "",
//     guestBookingEnabled: false,
//     logo: null as File | null,
//     logoPreview: null as string | null,
//     otherSettings: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggle = (key: keyof typeof formData) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         logo: file,
//         logoPreview: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSave = () => {
//     console.log("Saved settings:", formData);
//     alert("Settings saved!");
//   };

//   const handleCancel = () => {
//     alert("Cancelled changes.");
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h1 className="text-2xl font-semibold mb-6">Ticket Booking Settings</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Password Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Default Password</CardTitle>
//             <CardDescription>
//               Used for new user accounts.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Label>Default Password</Label>
//             <Input
//               type="text"
//               name="defaultPassword"
//               placeholder="e.g. Welcome@123"
//               value={formData.defaultPassword}
//               onChange={handleInputChange}
//             />
//           </CardContent>
//         </Card>

//         {/* 180 Day Flag Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>180 Day Booking Flag</CardTitle>
//             <CardDescription>
//               Restrict bookings older than 180 days.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <Label>Enable 180-Day Flag</Label>
//               <Switch
//                 checked={formData.enable180DayFlag}
//                 onCheckedChange={() => handleToggle("enable180DayFlag")}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Booking Timeout */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Booking Timeout</CardTitle>
//             <CardDescription>
//               Time (in minutes) before session expires.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Label>Timeout Duration</Label>
//             <Input
//               type="number"
//               name="bookingTimeout"
//               placeholder="e.g. 15"
//               value={formData.bookingTimeout}
//               onChange={handleInputChange}
//             />
//           </CardContent>
//         </Card>

//         {/* Guest Booking */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Guest Booking</CardTitle>
//             <CardDescription>
//               Allow unregistered users to book tickets.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <Label>Allow Guest Booking</Label>
//               <Switch
//                 checked={formData.guestBookingEnabled}
//                 onCheckedChange={() => handleToggle("guestBookingEnabled")}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Logo Upload */}
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Company Logo</CardTitle>
//             <CardDescription>
//               Upload the branding image to show in the app.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {formData.logoPreview ? (
//               <div className="mb-4">
//                 <img src={formData.logoPreview} alt="Preview" className="h-24 object-contain" />
//               </div>
//             ) : null}
//             <Input type="file" accept="image/*" onChange={handleImageChange} />
//           </CardContent>
//         </Card>

//         {/* Other Settings */}
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Other Settings</CardTitle>
//             <CardDescription>
//               Optional: Notes or additional configuration.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Textarea
//               name="otherSettings"
//               placeholder="Enter any other system-wide notes or settings here..."
//               value={formData.otherSettings}
//               onChange={handleInputChange}
//             />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-3 mt-6">
//         <Button variant="outline" onClick={handleCancel}>
//           Cancel
//         </Button>
//         <Button onClick={handleSave}>Save Settings</Button>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const SettingsForm = () => {
  const [defaultPassword, setDefaultPassword] = useState("");
  const [enable180DayFlag, setEnable180DayFlag] = useState(false);
  const [guestBooking, setGuestBooking] = useState(false);
  const [expiringTime, setExpiringTime] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const settings = {
      defaultPassword,
      enable180DayFlag,
      guestBooking,
      expiringTime,
      logoPreview,
    };
    console.log("Saved settings:", settings);
    alert("Settings saved!");
  };

  return (
    <div className="space-y-6 p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Default Password */}
        <Card>
          <CardHeader>
            <CardTitle>Default Password</CardTitle>
            <CardDescription>Password for newly created user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="mb-2">Password</Label>
            <Input
              value={defaultPassword}
              onChange={(e) => setDefaultPassword(e.target.value)}
              placeholder="e.g. Welcome@123"
            />
          </CardContent>
        </Card>

        {/* 180-Day Flag */}
        <Card>
          <CardHeader>
            <CardTitle>180-Day Flag</CardTitle>
            <CardDescription>Restrict tickets from being booked beyond 180 days</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label >Enable Flag</Label>
            <Switch
              checked={enable180DayFlag}
              onCheckedChange={() => setEnable180DayFlag(!enable180DayFlag)}
            />
          </CardContent>
        </Card>

        {/* Guest Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Booking</CardTitle>
            <CardDescription>Allow bookings without account login</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label>Allow Guest Booking</Label>
            <Switch
              checked={guestBooking}
              onCheckedChange={() => setGuestBooking(!guestBooking)}
            />
          </CardContent>
        </Card>

        {/* Expiring Ticket Time */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Expiry Time</CardTitle>
            <CardDescription>
              Time (in hours) after which an unpaid ticket is auto-cancelled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="mb-2">Expiry Time (hours)</Label>
            <Input
              type="number"
              value={expiringTime}
              onChange={(e) => setExpiringTime(e.target.value)}
              placeholder="e.g. 48"
            />
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="">
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>Upload your branding logo for the system</CardDescription>
          </CardHeader>
          <CardContent>
            {logoPreview && <img src={logoPreview} alt="Logo" className="h-20 mb-3" />}
            <Input type="file" accept="image/*" onChange={handleLogoChange} />
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default SettingsForm;
