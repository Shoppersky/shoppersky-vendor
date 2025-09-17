// "use client";


// import { Button } from "@/components/ui/button";
// import { CardContent, CardHeader } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { ArrowUpRight, ArrowDownRight, User2, TrendingUp, ShoppingCart, Package, Layers, BarChart3, Star, Bell, Zap, MapPin, Phone, Mail, Calendar, CreditCard, Truck } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useState } from "react";
// import { useSidebar } from "@/components/sidebarprovider";

// const recentOrders = [
//   { 
//     name: "Sarah Johnson", 
//     order: "#12847", 
//     price: "$89.50", 
//     status: "Delivered",
//     email: "sarah.johnson@email.com",
//     phone: "+1 (555) 123-4567",
//     address: "123 Main St, New York, NY 10001",
//     orderDate: "2024-01-15",
//     deliveryDate: "2024-01-18",
//     items: [
//       { name: "Wireless Headphones", quantity: 1, price: "$79.50" },
//       { name: "Phone Case", quantity: 1, price: "$10.00" }
//     ],
//     paymentMethod: "Credit Card (**** 4567)",
//     trackingNumber: "TRK123456789"
//   },
//   { 
//     name: "Mike Chen", 
//     order: "#12846", 
//     price: "$156.20", 
//     status: "Pending",
//     email: "mike.chen@email.com",
//     phone: "+1 (555) 987-6543",
//     address: "456 Oak Ave, Los Angeles, CA 90210",
//     orderDate: "2024-01-16",
//     deliveryDate: "Expected: 2024-01-20",
//     items: [
//       { name: "Smart Watch", quantity: 1, price: "$149.99" },
//       { name: "Screen Protector", quantity: 1, price: "$6.21" }
//     ],
//     paymentMethod: "PayPal",
//     trackingNumber: "Pending"
//   },
//   { 
//     name: "Emma Davis", 
//     order: "#12845", 
//     price: "$45.80", 
//     status: "Cancelled",
//     email: "emma.davis@email.com",
//     phone: "+1 (555) 456-7890",
//     address: "789 Pine St, Chicago, IL 60601",
//     orderDate: "2024-01-14",
//     deliveryDate: "Cancelled",
//     items: [
//       { name: "Bluetooth Speaker", quantity: 1, price: "$45.80" }
//     ],
//     paymentMethod: "Credit Card (**** 1234)",
//     trackingNumber: "Cancelled"
//   },
// ];




// // ---------- MAIN COMPONENT ----------

// export default function DashboardHome() {
//   const router = useRouter();
//   const [selectedOrder, setSelectedOrder] = useState<typeof recentOrders[0] | null>(null);

  
//   // Dashboard summary counts (can be fetched from backend)


//   // Order Status Summary
//   const orderStatusCount = {
//     delivered: recentOrders.filter((o) => o.status === "Delivered").length,
//     pending: recentOrders.filter((o) => o.status === "Pending").length,
//     cancelled: recentOrders.filter((o) => o.status === "Cancelled").length,
//     flagged: 1, // demo
//   };

//   // Quick Action Handlers


//   const handleExportOrders = async () => {
//     toast.loading("Exporting orders...");
//     setTimeout(() => {
//       toast.success("Orders exported successfully!");
//       // Simulate file download
//       const link = document.createElement('a');
//       link.href = 'data:text/csv;charset=utf-8,Order ID,Customer,Price,Status\n#12847,Sarah Johnson,$89.50,Delivered\n#12846,Mike Chen,$156.20,Pending\n#12845,Emma Davis,$45.80,Cancelled';
//       link.download = 'orders_export.csv';
//       link.click();
//     }, 2000);
//   };


//   const handleViewAllCustomers = () => {
//     router.push("/customers");
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 pt-16 md:pt-4 bg-white animate-fadeIn min-h-screen custom-scrollbar">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
//         <div className="space-y-1 sm:space-y-2 flex-1">
//           <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent leading-tight">
//             Dashboard Overview
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
//             Welcome back, <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">John</span>! Manage and track your entire store in one place.
//           </p>
//         </div>
//         <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
//           {/* Debug button - remove in production */}
         
          
         
//           <div className="hidden sm:block">
            
//           </div>
//         </div>
//       </div>

//       {/* --- BUSINESS & KPI SUMMARY --- */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//         <StatCard title="Total Revenue" value={0}  isPositive icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />} />
//         <StatCard title="Total Orders" value={0}  isPositive icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />} />
//         <StatCard title="Products Sold" value={0}  icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />} />
//         <StatCard title="Active Products" value={0}  isPositive icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500" />} />
//       </div>

//       {/* --- GRAPHS & RECENT ORDERS --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      
//       </div>

//       {/* --- ORDER & ALERTS --- */}
//       <div className="w-full">
//         {/* Recent Orders */}
//         <GlassCard className="lg:col-span-2">
//           <CardHeader>
//             <div className="flex gap-2 items-center text-base sm:text-lg p-3 sm:p-4 font-bold">
//               <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
//               <span>Recent Orders</span>
//             </div>
//             <div className="flex flex-wrap gap-2 text-xs px-3 sm:px-4 pb-2">
//               <Badge color="green">Delivered {orderStatusCount.delivered}</Badge>
//               <Badge color="yellow">Pending {orderStatusCount.pending}</Badge>
//               <Badge color="red">Cancelled {orderStatusCount.cancelled}</Badge>
//               <Badge color="blue">Flagged {orderStatusCount.flagged}</Badge>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-4">
//             {recentOrders.map((o) => (
//               <OrderItem 
//                 key={o.order} 
//                 name={o.name} 
//                 order={o.order} 
//                 price={o.price} 
//                 status={o.status}
//                 orderData={o}
//                 onDetailsClick={setSelectedOrder}
//               />
//             ))}
//           </CardContent>
//         </GlassCard>
//         {/* Alerts & Best Sellers */}
//         <div className="space-y-4 sm:space-y-6">
         
//         </div>
//       </div>

//       {/* --- CUSTOMER INSIGHTS, ACTIONS, NOTIFICATIONS --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        

//       {/* Order Details Modal */}
//       <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
//               <Package className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
//               <span className="truncate">Order Details - {selectedOrder?.order}</span>
//             </DialogTitle>
//           </DialogHeader>
          
//           {selectedOrder && (
//             <div className="space-y-4 sm:space-y-6">
//               {/* Customer Info */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
//                     <User2 className="w-4 h-4 flex-shrink-0" />
//                     <span>Customer Information</span>
//                   </h3>
//                   <div className="space-y-2 text-sm">
//                     <p><strong>Name:</strong> {selectedOrder.name}</p>
//                     <p className="flex items-start gap-2">
//                       <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span className="break-all">{selectedOrder.email}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <Phone className="w-4 h-4 flex-shrink-0" />
//                       <span>{selectedOrder.phone}</span>
//                     </p>
//                     <p className="flex items-start gap-2">
//                       <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span className="break-words">{selectedOrder.address}</span>
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
//                     <ShoppingCart className="w-4 h-4 flex-shrink-0" />
//                     <span>Order Information</span>
//                   </h3>
//                   <div className="space-y-2 text-sm">
//                     <p><strong>Order ID:</strong> {selectedOrder.order}</p>
//                     <p className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 flex-shrink-0" />
//                       <span><strong>Order Date:</strong> {selectedOrder.orderDate}</span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <Truck className="w-4 h-4 flex-shrink-0" />
//                       <span><strong>Delivery:</strong> {selectedOrder.deliveryDate}</span>
//                     </p>
//                     <p className="flex items-start gap-2">
//                       <CreditCard className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span><strong>Payment:</strong> {selectedOrder.paymentMethod}</span>
//                     </p>
//                     <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>
//                     <div className="flex items-center gap-2">
//                       <strong>Status:</strong>
//                       <Badge color={
//                         selectedOrder.status === "Delivered" ? "green" :
//                         selectedOrder.status === "Pending" ? "yellow" : "red"
//                       }>
//                         {selectedOrder.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="space-y-3">
//                 <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
//                   <Package className="w-4 h-4 flex-shrink-0" />
//                   <span>Order Items</span>
//                 </h3>
//                 <div className="border rounded-lg overflow-hidden">
//                   <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 grid grid-cols-3 gap-2 sm:gap-4 font-semibold text-xs sm:text-sm">
//                     <span>Item</span>
//                     <span className="text-center">Qty</span>
//                     <span className="text-right">Price</span>
//                   </div>
//                   {selectedOrder.items.map((item, index) => (
//                     <div key={index} className="px-3 sm:px-4 py-3 grid grid-cols-3 gap-2 sm:gap-4 border-t text-xs sm:text-sm">
//                       <span className="truncate">{item.name}</span>
//                       <span className="text-center">{item.quantity}</span>
//                       <span className="text-right font-semibold">{item.price}</span>
//                     </div>
//                   ))}
//                   <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-3 border-t">
//                     <div className="flex justify-between items-center font-bold text-sm sm:text-base">
//                       <span>Total:</span>
//                       <span className="text-base sm:text-lg">{selectedOrder.price}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
//                 <Button 
//                   variant="outline" 
//                   onClick={() => {
//                     toast.success("Order details copied to clipboard!");
//                     navigator.clipboard.writeText(`Order ${selectedOrder.order} - ${selectedOrder.name} - ${selectedOrder.price}`);
//                   }}
//                   className="flex-1 text-sm"
//                 >
//                   Copy Details
//                 </Button>
//                 <Button 
//                   onClick={() => {
//                     toast.success("Navigating to full order page...");
//                     router.push(`/orders`);
//                     setSelectedOrder(null);
//                   }}
//                   className="flex-1 text-sm"
//                 >
//                   View Full Order
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// // ---------- SUB-COMPONENTS ----------

// function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`relative rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] group overflow-hidden ${className}`}>
//       {/* Subtle gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-blue-500/[0.02] dark:from-purple-400/[0.03] dark:to-blue-400/[0.03] pointer-events-none" />
      
//       {/* Shimmer effect on hover */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }
// function StatCard({ title, value, change, isPositive = false, icon }: { title: string; value: string; change?: string; isPositive?: boolean; icon?: React.ReactNode }) {
//   const changeLabel = change && (
//     <span className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-300 ${isPositive ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"}`}>
//       {isPositive ? <ArrowUpRight size={10} className="animate-pulse" /> : <ArrowDownRight size={10} className="animate-pulse" />}
//       {change}
//     </span>
//   );
//   return (
//     <GlassCard className="p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-purple-200/50 dark:hover:border-purple-800/50">
//       <div className="flex-1 min-w-0 order-2 sm:order-1">
//         <div className="text-slate-600 dark:text-slate-400 uppercase text-xs font-semibold mb-1 tracking-wider truncate">{title}</div>
//         <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 flex flex-col gap-1">
//           <span className="truncate">{value}</span>
//           {changeLabel}
//         </div>
//       </div>
//       <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 rounded-xl p-2 sm:p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 self-end sm:self-auto order-1 sm:order-2">
//         {icon}
//       </div>
//     </GlassCard>
//   );
// }

// function OrderItem({ 
//   name, 
//   order, 
//   price, 
//   status, 
//   orderData, 
//   onDetailsClick 
// }: { 
//   name: string; 
//   order: string; 
//   price: string; 
//   status: string;
//   orderData: typeof recentOrders[0];
//   onDetailsClick: (order: typeof recentOrders[0]) => void;
// }) {
//   const statusMap: Record<string, string> = {
//     Delivered: "green",
//     Pending: "yellow",
//     Cancelled: "red",
//   };
  
//   return (
//     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/5 group border border-transparent hover:border-purple-100">
//       <div className="flex-1 min-w-0">
//         <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 truncate text-sm">{name}</div>
//         <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order}</div>
//       </div>
//       <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
//         <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{price}</span>
//         <Badge color={statusMap[status] as any}>{status}</Badge>
//         <Button 
//           variant="outline" 
//           size="sm" 
//           onClick={() => onDetailsClick(orderData)}
//           className="text-xs hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/30 dark:hover:border-purple-800 transition-colors duration-300 sm:inline-flex px-2 py-1"
//         >
//           <span className="hidden sm:inline">Details</span>
//           <span className="sm:hidden">View</span>
//         </Button>
//       </div>
//     </div>
//   );
// }



// function Badge({ children, color }: { children: React.ReactNode; color?: "green" | "red" | "yellow" | "blue" }) {
//   const base = "px-2 sm:px-3 py-1 rounded-full font-semibold text-xs border transition-all duration-300 hover:scale-105 whitespace-nowrap";
//   const colors: Record<string, string> = {
//     green: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 dark:border-green-800/50",
//     red: "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border-rose-200 dark:from-rose-900/30 dark:to-red-900/30 dark:text-rose-400 dark:border-rose-800/50",
//     yellow: "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 dark:border-yellow-800/50",
//     blue: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400 dark:border-blue-800/50",
//   };
//   return <span className={`${base} ${colors[color || "blue"]}`}>{children}</span>;
// }



"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, ArrowDownRight, User2, TrendingUp, ShoppingCart, Package, Layers, BarChart3, Star, Bell, Zap, MapPin, Phone, Mail, Calendar, CreditCard, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useSidebar } from "@/components/sidebarprovider";
import useStore from "@/lib/Zustand";
import axiosInstance from "@/lib/axiosInstance";

// Interface for API response
interface VendorAnalytics {
  total_orders: number;
  total_revenue: number;
  products_sold: number;
  active_products: number;
  recent_orders: {
    order_id: string;
    customer_name: string;
    amount: number;
    order_status: string;
    order_at: string;
  }[];
}

// Main Component
export default function DashboardHome() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<VendorAnalytics["recent_orders"][0] | null>(null);
  const [analytics, setAnalytics] = useState<VendorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
 const { userId } = useStore();
  // Fetch vendor analytics
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
       // Replace with dynamic vendor ID if needed
        const response = await axiosInstance.get(`orders/vendor-analytics/${userId}`);
        
        
          setAnalytics(response.data.data);
       
      } catch (error) {
        toast.error("Error fetching analytics data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);
console.log(analytics);
  // Order Status Summary
  const orderStatusCount = {
    delivered: analytics?.recent_orders.filter((o) => o.order_status === "DELIVERED").length || 0,
    pending: analytics?.recent_orders.filter((o) => o.order_status === "CONFIRMED").length || 0,
    cancelled: analytics?.recent_orders.filter((o) => o.order_status === "CANCELLED").length || 0,
    flagged: 1, // demo (update if API provides this)
  };

  // Quick Action Handlers
  const handleExportOrders = async () => {
    if (!analytics) return;
    toast.loading("Exporting orders...");
    setTimeout(() => {
      toast.success("Orders exported successfully!");
      const csvContent = [
        "Order ID,Customer,Price,Status",
        ...analytics.recent_orders.map(
          (o) => `${o.order_id},${o.customer_name},$${o.amount.toFixed(2)},${o.order_status}`
        ),
      ].join("\n");
      const link = document.createElement("a");
      link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
      link.download = "orders_export.csv";
      link.click();
    }, 2000);
  };

  const handleViewAllCustomers = () => {
    router.push("/customers");
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 pt-16 md:pt-4 bg-white animate-fadeIn min-h-screen custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent leading-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Welcome back, <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">John</span>! Manage and track your entire store in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden sm:block">
            <Button onClick={handleExportOrders} variant="outline" size="sm">
              Export Orders
            </Button>
          </div>
        </div>
      </div>

      {/* --- BUSINESS & KPI SUMMARY --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${analytics?.total_revenue.toFixed(2) || "0.00"}`}
          isPositive
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
        />
        <StatCard
          title="Total Orders"
          value={`${analytics?.total_orders || 0}`}
          isPositive
          icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />}
        />
        <StatCard
          title="Products Sold"
          value={`${analytics?.products_sold || 0}`}
          icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />}
        />
        <StatCard
          title="Active Products"
          value={`${analytics?.active_products || 0}`}
          isPositive
          icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500" />}
        />
      </div>

      {/* --- GRAPHS & RECENT ORDERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Placeholder for graphs */}
      </div>

      {/* --- ORDER & ALERTS --- */}
      <div className="w-full">
        {/* Recent Orders */}
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <div className="flex gap-2 items-center text-base sm:text-lg p-3 sm:p-4 font-bold">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              <span>Recent Orders</span>
            </div>
        
          </CardHeader>
       <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-4">
  {analytics?.recent_orders?.length ? (
    analytics.recent_orders.map((o) => (
      <OrderItem
        key={o.order_id}
        name={o.customer_name}
        order={o.order_id}
        price={`$${o.amount.toFixed(2)}`}
        status={o.order_status}
        orderData={o}
        onDetailsClick={setSelectedOrder}
      />
    ))
  ) : (
    <p className="text-center text-lg text-black">
      No orders yet
    </p>
  )}
</CardContent>

        </GlassCard>
        {/* Alerts & Best Sellers */}
        <div className="space-y-4 sm:space-y-6">
          {/* Placeholder for alerts */}
        </div>
      </div>

      {/* --- CUSTOMER INSIGHTS, ACTIONS, NOTIFICATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Placeholder for customer insights */}
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">Order Details - {selectedOrder?.order_id}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 sm:space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                    <User2 className="w-4 h-4 flex-shrink-0" />
                    <span>Customer Information</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                    <p className="flex items-start gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-all">N/A</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>N/A</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-words">N/A</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                    <span>Order Information</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span><strong>Order Date:</strong> {selectedOrder.order_at}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 flex-shrink-0" />
                      <span><strong>Delivery:</strong> N/A</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span><strong>Payment:</strong> N/A</span>
                    </p>
                    <p><strong>Tracking:</strong> N/A</p>
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge
                        color={
                          selectedOrder.order_status === "DELIVERED"
                            ? "green"
                            : selectedOrder.order_status === "CONFIRMED"
                            ? "yellow"
                            : "red"
                        }
                      >
                        {selectedOrder.order_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span>Order Items</span>
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 grid grid-cols-3 gap-2 sm:gap-4 font-semibold text-xs sm:text-sm">
                    <span>Item</span>
                    <span className="text-center">Qty</span>
                    <span className="text-right">Price</span>
                  </div>
                  <div className="px-3 sm:px-4 py-3 grid grid-cols-3 gap-2 sm:gap-4 border-t text-xs sm:text-sm">
                    <span className="truncate">N/A</span>
                    <span className="text-center">N/A</span>
                    <span className="text-right font-semibold">N/A</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-3 border-t">
                    <div className="flex justify-between items-center font-bold text-sm sm:text-base">
                      <span>Total:</span>
                      <span className="text-base sm:text-lg">${selectedOrder.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Order details copied to clipboard!");
                    navigator.clipboard.writeText(
                      `Order ${selectedOrder.order_id} - ${selectedOrder.customer_name} - $${selectedOrder.amount.toFixed(2)}`
                    );
                  }}
                  className="flex-1 text-sm"
                >
                  Copy Details
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Navigating to full order page...");
                    router.push(`/orders`);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 text-sm"
                >
                  View Full Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Sub-Components
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] group overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-blue-500/[0.02] dark:from-purple-400/[0.03] dark:to-blue-400/[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  isPositive = false,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}) {
  const changeLabel = change && (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-300 ${
        isPositive ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"
      }`}
    >
      {isPositive ? <ArrowUpRight size={10} className="animate-pulse" /> : <ArrowDownRight size={10} className="animate-pulse" />}
      {change}
    </span>
  );
  return (
    <GlassCard className="p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-purple-200/50 dark:hover:border-purple-800/50">
      <div className="flex-1 min-w-0 order-2 sm:order-1">
        <div className="text-slate-600 dark:text-slate-400 uppercase text-xs font-semibold mb-1 tracking-wider truncate">{title}</div>
        <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 flex flex-col gap-1">
          <span className="truncate">{value}</span>
          {changeLabel}
        </div>
      </div>
      <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 rounded-xl p-2 sm:p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 self-end sm:self-auto order-1 sm:order-2">
        {icon}
      </div>
    </GlassCard>
  );
}

function OrderItem({
  name,
  order,
  price,
  status,
  orderData,
  onDetailsClick,
}: {
  name: string;
  order: string;
  price: string;
  status: string;
  orderData: VendorAnalytics["recent_orders"][0];
  onDetailsClick: (order: VendorAnalytics["recent_orders"][0]) => void;
}) {
  const statusMap: Record<string, string> = {
    DELIVERED: "green",
    CONFIRMED: "yellow",
    CANCELLED: "red",
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/5 group border border-transparent hover:border-purple-100">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 truncate text-sm">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order}</div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{price}</span>
        <Badge color={statusMap[status] as any}>{status}</Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDetailsClick(orderData)}
          className="text-xs hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/30 dark:hover:border-purple-800 transition-colors duration-300 sm:inline-flex px-2 py-1"
        >
          <span className="hidden sm:inline">Details</span>
          <span className="sm:hidden">View</span>
        </Button>
      </div>
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color?: "green" | "red" | "yellow" | "blue" }) {
  const base = "px-2 sm:px-3 py-1 rounded-full font-semibold text-xs border transition-all duration-300 hover:scale-105 whitespace-nowrap";
  const colors: Record<string, string> = {
    green: "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 dark:border-green-800/50",
    red: "bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 border-rose-200 dark:from-rose-900/30 dark:to-red-900/30 dark:text-rose-400 dark:border-rose-800/50",
    yellow: "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 dark:border-yellow-800/50",
    blue: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400 dark:border-blue-800/50",
  };
  return <span className={`${base} ${colors[color || "blue"]}`}>{children}</span>;
}
