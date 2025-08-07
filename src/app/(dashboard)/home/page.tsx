"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight, ArrowDownRight, User2, TrendingUp, ShoppingCart, Package, Layers, BarChart3, Star, Bell, Zap, MapPin, Phone, Mail, Calendar, CreditCard, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useSidebar } from "@/components/sidebarprovider";

// FAKE DATA FOR DEMO PURPOSES
const salesData = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 14000 },
  { name: "Mar", value: 18000 },
  { name: "Apr", value: 22000 },
  { name: "May", value: 20000 },
  { name: "Jun", value: 26000 },
];

const categorySales = [
  { name: "Electronics", value: 40000 },
  { name: "Fashion", value: 32000 },
  { name: "Grocery", value: 21000 },
  { name: "Home", value: 15000 },
];

const bestSellers = [
  { name: "Wireless Headphones", price: "$4,890", sold: 390 },
  { name: "Smart Watch", price: "$3,780", sold: 288 },
  { name: "Phone Case", price: "$1,560", sold: 129 },
];

const recentOrders = [
  { 
    name: "Sarah Johnson", 
    order: "#12847", 
    price: "$89.50", 
    status: "Delivered",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: "$79.50" },
      { name: "Phone Case", quantity: 1, price: "$10.00" }
    ],
    paymentMethod: "Credit Card (**** 4567)",
    trackingNumber: "TRK123456789"
  },
  { 
    name: "Mike Chen", 
    order: "#12846", 
    price: "$156.20", 
    status: "Pending",
    email: "mike.chen@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    orderDate: "2024-01-16",
    deliveryDate: "Expected: 2024-01-20",
    items: [
      { name: "Smart Watch", quantity: 1, price: "$149.99" },
      { name: "Screen Protector", quantity: 1, price: "$6.21" }
    ],
    paymentMethod: "PayPal",
    trackingNumber: "Pending"
  },
  { 
    name: "Emma Davis", 
    order: "#12845", 
    price: "$45.80", 
    status: "Cancelled",
    email: "emma.davis@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    orderDate: "2024-01-14",
    deliveryDate: "Cancelled",
    items: [
      { name: "Bluetooth Speaker", quantity: 1, price: "$45.80" }
    ],
    paymentMethod: "Credit Card (**** 1234)",
    trackingNumber: "Cancelled"
  },
];

const inventoryAlerts = [
  { name: "Bluetooth Speaker", level: "Only 3 left", color: "red" },
  { name: "Gaming Mouse", level: "Low stock: 8", color: "yellow" },
];

const customerInsights = [
  { name: "Sarah Johnson", lastOrder: "Jul 10", value: "$110", vip: true },
  { name: "David Leehkk",     lastOrder: "Jul 9", value: "$75", vip: true },
  { name: "Jess Kimkhuuk",      lastOrder: "Jul 7", value: "$440", vip: true },
];

const notifications = [
  { icon: <Bell className="w-4 h-4" />, message: "Inventory low: Bluetooth Speaker", time: "2h ago" },
  { icon: <Bell className="w-4 h-4" />, message: "Order #12846 flagged: Pending 2 days", time: "4h ago" },
  { icon: <Bell className="w-4 h-4" />, message: "Software update: v2.9 Deployed", time: "8h ago" },
];

const pieColors = ["#6366F1", "#60A5FA", "#FBBF24", "#F87171"];

// ---------- MAIN COMPONENT ----------

export default function DashboardHome() {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<typeof recentOrders[0] | null>(null);
  const { isOpen, toggleSidebar } = useSidebar();
  
  // Dashboard summary counts (can be fetched from backend)
  const stats = {
    revenue: "$24,580",
    orderChange: "+12.5%",
    orders: 1247,
    ordersChange: "+8.2%",
    sold: 2840,
    soldChange: "-2.1%",
    activeProducts: 156,
    productsChange: "+15",
    avgOrder: "$85",
    conversion: "2.4%",
    customers: 77,
    inventoryLow: 2,
  };

  // Order Status Summary
  const orderStatusCount = {
    delivered: recentOrders.filter((o) => o.status === "Delivered").length,
    pending: recentOrders.filter((o) => o.status === "Pending").length,
    cancelled: recentOrders.filter((o) => o.status === "Cancelled").length,
    flagged: 1, // demo
  };

  // Quick Action Handlers
  const handleAddProduct = async () => {
    toast.loading("Redirecting to add product...");
    setTimeout(() => {
      toast.success("Redirected to add product page!");
      router.push("/add-product");
    }, 1000);
  };

  const handleExportOrders = async () => {
    toast.loading("Exporting orders...");
    setTimeout(() => {
      toast.success("Orders exported successfully!");
      // Simulate file download
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,Order ID,Customer,Price,Status\n#12847,Sarah Johnson,$89.50,Delivered\n#12846,Mike Chen,$156.20,Pending\n#12845,Emma Davis,$45.80,Cancelled';
      link.download = 'orders_export.csv';
      link.click();
    }, 2000);
  };

  const handleViewReports = async () => {
    toast.loading("Loading reports...");
    setTimeout(() => {
      toast.success("Reports loaded successfully!");
      // You can navigate to reports page or show reports modal
    }, 1500);
  };

  const handleManageCampaigns = async () => {
    toast.loading("Loading campaigns...");
    setTimeout(() => {
      toast.success("Campaigns loaded successfully!");
      // You can navigate to campaigns page or show campaigns modal
    }, 1500);
  };

  const handleViewAllCustomers = () => {
    router.push("/customers");
  };

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
          {/* Debug button - remove in production */}
         
          
         
          <div className="hidden sm:block">
            
          </div>
        </div>
      </div>

      {/* --- BUSINESS & KPI SUMMARY --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard title="Total Revenue" value={stats.revenue} change={stats.orderChange} isPositive icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />} />
        <StatCard title="Total Orders" value={stats.orders.toLocaleString()} change={stats.ordersChange} isPositive icon={<ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />} />
        <StatCard title="Products Sold" value={stats.sold.toLocaleString()} change={stats.soldChange} icon={<Package className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />} />
        <StatCard title="Active Products" value={stats.activeProducts.toString()} change={stats.productsChange} isPositive icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500" />} />
      </div>

      {/* --- GRAPHS & RECENT ORDERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 text-base sm:text-lg lg:text-xl font-bold text-gray-700">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
              <span>Sales Overview</span>
            </div>
            <div className="text-xs text-gray-400 px-3 sm:px-4">Jan–Jun 2025</div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={salesData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <Badge color="green">This Month +8.5%</Badge>
              <Badge color="blue">Last Month +2.9%</Badge>
            </div>
          </CardContent>
        </GlassCard>
        {/* Category Pie Chart */}
        <GlassCard>
          <CardHeader>
            <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg p-3 sm:p-4 font-bold">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
              <span>Category Performance</span>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={55}
                  label={false}
                >
                  {categorySales.map((entry, idx) => (
                    <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1 text-xs mt-2">
              {categorySales.map((entry, idx) => (
                <div key={entry.name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: pieColors[idx % pieColors.length] }} />
                    <span className="truncate">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-700">${entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* --- ORDER & ALERTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <div className="flex gap-2 items-center text-base sm:text-lg p-3 sm:p-4 font-bold">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              <span>Recent Orders</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs px-3 sm:px-4 pb-2">
              <Badge color="green">Delivered {orderStatusCount.delivered}</Badge>
              <Badge color="yellow">Pending {orderStatusCount.pending}</Badge>
              <Badge color="red">Cancelled {orderStatusCount.cancelled}</Badge>
              <Badge color="blue">Flagged {orderStatusCount.flagged}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-4">
            {recentOrders.map((o) => (
              <OrderItem 
                key={o.order} 
                name={o.name} 
                order={o.order} 
                price={o.price} 
                status={o.status}
                orderData={o}
                onDetailsClick={setSelectedOrder}
              />
            ))}
          </CardContent>
        </GlassCard>
        {/* Alerts & Best Sellers */}
        <div className="space-y-4 sm:space-y-6">
          {/* Inventory Alerts */}
          <GlassCard>
            <CardHeader>
              <div className="flex items-center justify-center gap-2 font-bold p-3 sm:p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                <Bell className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Inventory Alerts</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-4">
              {inventoryAlerts.map((alert) => (
                <InventoryAlert key={alert.name} name={alert.name} level={alert.level} color={alert.color as any} />
              ))}
            </CardContent>
          </GlassCard>
          {/* Best Sellers */}
          <GlassCard>
            <CardHeader>
              <div className="flex items-center gap-2 font-bold p-3 sm:p-4 text-sm sm:text-base">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span>Top Products</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-3 sm:p-4">
              {bestSellers.map((p) => (
                <ProductItem key={p.name} name={p.name} price={p.price} sold={p.sold} />
              ))}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* --- CUSTOMER INSIGHTS, ACTIONS, NOTIFICATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Customer Insights */}
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <div className="flex gap-2 items-center p-3 sm:p-4 font-bold text-sm sm:text-base">
              <User2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
              <span>Recent Customers</span>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="space-y-3">
              {customerInsights.map((c) => (
                <div key={c.name} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {c.vip && <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                    <span className="font-medium truncate text-sm">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-500 hidden sm:inline">Last: {c.lastOrder}</span>
                    <span className="font-semibold text-sm">{c.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button onClick={handleViewAllCustomers} size="sm" className="w-full text-sm">View All Customers</Button>
            </div>
          </CardContent>
        </GlassCard>
        {/* Actions */}
        <GlassCard>
          <CardHeader>
            <div className="font-bold p-3 sm:p-4 text-sm sm:text-base flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" />
              <span>Quick Actions</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 p-3 sm:p-4">
            <Button onClick={handleAddProduct} className="w-full font-medium text-xs sm:text-sm">+ Add New Product</Button>
            <Button onClick={handleExportOrders} variant="outline" className="w-full text-xs sm:text-sm">Export Orders</Button>
            <Button onClick={handleViewReports} variant="ghost" className="w-full text-xs sm:text-sm">View Reports</Button>
            <Button onClick={handleManageCampaigns} variant="ghost" className="w-full text-xs sm:text-sm">Manage Campaigns</Button>
          </CardContent>
        </GlassCard>
        {/* Notifications */}
        <GlassCard>
          <CardHeader>
            <div className="font-bold flex items-center gap-2 p-3 sm:p-4 text-sm sm:text-base">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              <span>Notifications</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 p-3 sm:p-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex flex-col gap-1 text-sm p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">{n.icon}</div>
                  <span className="flex-1 text-xs sm:text-sm leading-relaxed">{n.message}</span>
                </div>
                <span className="text-xs text-gray-400 ml-6">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </GlassCard>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">Order Details - {selectedOrder?.order}</span>
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
                    <p><strong>Name:</strong> {selectedOrder.name}</p>
                    <p className="flex items-start gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-all">{selectedOrder.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{selectedOrder.phone}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{selectedOrder.address}</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                    <span>Order Information</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Order ID:</strong> {selectedOrder.order}</p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span><strong>Order Date:</strong> {selectedOrder.orderDate}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Truck className="w-4 h-4 flex-shrink-0" />
                      <span><strong>Delivery:</strong> {selectedOrder.deliveryDate}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span><strong>Payment:</strong> {selectedOrder.paymentMethod}</span>
                    </p>
                    <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <Badge color={
                        selectedOrder.status === "Delivered" ? "green" :
                        selectedOrder.status === "Pending" ? "yellow" : "red"
                      }>
                        {selectedOrder.status}
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
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="px-3 sm:px-4 py-3 grid grid-cols-3 gap-2 sm:gap-4 border-t text-xs sm:text-sm">
                      <span className="truncate">{item.name}</span>
                      <span className="text-center">{item.quantity}</span>
                      <span className="text-right font-semibold">{item.price}</span>
                    </div>
                  ))}
                  <div className="bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-3 border-t">
                    <div className="flex justify-between items-center font-bold text-sm sm:text-base">
                      <span>Total:</span>
                      <span className="text-base sm:text-lg">{selectedOrder.price}</span>
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
                    navigator.clipboard.writeText(`Order ${selectedOrder.order} - ${selectedOrder.name} - ${selectedOrder.price}`);
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

// ---------- SUB-COMPONENTS ----------

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl shadow-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01] group overflow-hidden ${className}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-blue-500/[0.02] dark:from-purple-400/[0.03] dark:to-blue-400/[0.03] pointer-events-none" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
function StatCard({ title, value, change, isPositive = false, icon }: { title: string; value: string; change?: string; isPositive?: boolean; icon?: React.ReactNode }) {
  const changeLabel = change && (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-300 ${isPositive ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"}`}>
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
  onDetailsClick 
}: { 
  name: string; 
  order: string; 
  price: string; 
  status: string;
  orderData: typeof recentOrders[0];
  onDetailsClick: (order: typeof recentOrders[0]) => void;
}) {
  const statusMap: Record<string, string> = {
    Delivered: "green",
    Pending: "yellow",
    Cancelled: "red",
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

function ProductItem({ name, price, sold }: { name: string; price: string; sold: number }) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 group">
      <div className="flex-1 min-w-0">
        <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 truncate text-sm block">{name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">Sold: {sold}</span>
      </div>
      <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm flex-shrink-0">{price}</span>
    </div>
  );
}

function InventoryAlert({ name, level, color }: { name: string; level: string; color: "red" | "yellow" | "blue" | "green" }) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 group">
      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 truncate text-sm flex-1">{name}</span>
      <Badge color={color}>{level}</Badge>
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

function Avatar({ src }: { src?: string }) {
  return (
    <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-purple-400 via-purple-300 to-blue-300 dark:from-purple-600 dark:via-purple-500 dark:to-blue-500 rounded-full shadow-lg ring-2 ring-purple-200 dark:ring-purple-800/50 overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20">
      {src ? (
        <Image
          src={src}
          alt="User avatar"
          fill
          className="object-cover"
        />
      ) : (
        <User2 className="w-6 h-6 text-white drop-shadow-sm" />
      )}
    </span>
  );
}
