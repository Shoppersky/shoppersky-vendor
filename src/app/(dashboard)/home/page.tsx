"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, User2, TrendingUp, ShoppingCart, Package, Layers, BarChart3, FileText, Star, Bell } from "lucide-react";

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
  { name: "Sarah Johnson", order: "#12847", price: "$89.50", status: "Delivered" },
  { name: "Mike Chen", order: "#12846", price: "$156.20", status: "Pending" },
  { name: "Emma Davis", order: "#12845", price: "$45.80", status: "Cancelled" },
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

  return (
    <div className="space-y-8 p-6 bg-white animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome back, <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">John</span>! Manage and track your entire store in one place.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="relative group">
            <Avatar src="/placeholder.svg" />
            <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">John Doe</h3>
            <span className="inline-block text-xs text-gray-500 dark:text-gray-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 px-3 py-1 rounded-full border border-purple-200/50 dark:border-purple-800/50">
              Owner
            </span>
          </div>
        </div>
      </div>

      {/* --- BUSINESS & KPI SUMMARY --- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard title="Total Revenue" value={stats.revenue} change={stats.orderChange} isPositive icon={<TrendingUp className="w-6 h-6 text-purple-500" />} />
        <StatCard title="Total Orders" value={stats.orders.toLocaleString()} change={stats.ordersChange} isPositive icon={<ShoppingCart className="w-6 h-6 text-emerald-500" />} />
        <StatCard title="Products Sold" value={stats.sold.toLocaleString()} change={stats.soldChange} icon={<Package className="w-6 h-6 text-rose-500" />} />
        <StatCard title="Active Products" value={stats.activeProducts.toString()} change={stats.productsChange} isPositive icon={<Layers className="w-6 h-6 text-violet-500" />} />
        <StatCard title="Avg Order Value" value={stats.avgOrder} change="+4.9%" isPositive icon={<BarChart3 className="w-6 h-6 text-indigo-500" />} />
        <StatCard title="Conversion" value={stats.conversion} change="-0.2%" icon={<ArrowDownRight className="w-6 h-6 text-blue-400" />} />
      </div>

      {/* --- GRAPHS & RECENT ORDERS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3 p-3 text-xl font-bold text-gray-700">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Sales Overview
            </div>
            <div className="text-xs text-gray-400">Jan–Jun 2025</div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 p-3 mt-4">
              <Badge color="green">This Month +8.5%</Badge>
              <Badge color="blue">Last Month +2.9%</Badge>
            </div>
          </CardContent>
        </GlassCard>
        {/* Category Pie Chart */}
        <GlassCard>
          <CardHeader>
            <div className="flex items-center gap-3 text-lg p-3 font-bold">Category Performance</div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={65}
                  label
                >
                  {categorySales.map((entry, idx) => (
                    <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-1 text-xs mt-2">
              {categorySales.map((entry, idx) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: pieColors[idx % pieColors.length] }} />
                  <span>{entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span></span>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* --- ORDER & ALERTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <GlassCard className="md:col-span-2">
          <CardHeader>
            <div className="flex gap-2 items-center text-lg m-2 font-bold">Recent Orders</div>
            <div className="flex gap-3 text-xs mt-1 p-2">
              <Badge color="green">Delivered {orderStatusCount.delivered}</Badge>
              <Badge color="yellow">Pending {orderStatusCount.pending}</Badge>
              <Badge color="red">Cancelled {orderStatusCount.cancelled}</Badge>
              <Badge color="blue">Flagged {orderStatusCount.flagged}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((o) => (
              <OrderItem key={o.order} name={o.name} order={o.order} price={o.price} status={o.status} />
            ))}
          </CardContent>
        </GlassCard>
        {/* Alerts & Best Sellers */}
        <div className="space-y-6">
          {/* Inventory Alerts */}
          <GlassCard>
            <CardHeader>
              <div className="flex items-center justify-center gap-2 font-bold p-3 text-gray-800 dark:text-gray-200">
                <Bell className="w-4 h-4 text-amber-500" />
                Inventory Alerts
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {inventoryAlerts.map((alert) => (
                <InventoryAlert key={alert.name} name={alert.name} level={alert.level} color={alert.color as any} />
              ))}
            </CardContent>
          </GlassCard>
          {/* Best Sellers */}
          <GlassCard>
            <CardHeader>
              <div className="flex items-center gap-2 font-bold p-5">Top Products</div>
            </CardHeader>
            <CardContent className="space-y-2 p-5.5">
              {bestSellers.map((p) => (
                <ProductItem key={p.name} name={p.name} price={p.price} sold={p.sold} />
              ))}
            </CardContent>
          </GlassCard>
        </div>
      </div>

      {/* --- CUSTOMER INSIGHTS, ACTIONS, NOTIFICATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Customer Insights */}
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <div className="flex gap-2 items-center p-3 font-bold">Recent Customers</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 p-3">
              {customerInsights.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="font-medium flex items-center gap-1">
                    {c.vip && <Star className="inline-block w-4 h-4 text-yellow-400" />}
                    {c.name}
                  </span>
                  <span className="text-xs text-gray-500">Last: {c.lastOrder}</span>
                  <span className="font-semibold">{c.value}</span>
                </div>
              ))}
            </div><div className="p-3">
            <Button size="sm" className="mt-3 p-3">View All Customers</Button></div>
          </CardContent>
        </GlassCard>
        {/* Actions */}
        <GlassCard>
          <CardHeader>
            <div className="font-bold p-3">Quick Actions</div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full font-bold">+ Add New Product</Button>
            <Button variant="outline" className="w-full">Export Orders</Button>
            <Button variant="ghost" className="w-full">View Reports</Button>
            <Button variant="ghost" className="w-full">Manage Campaigns</Button>
          </CardContent>
        </GlassCard>
        {/* Notifications */}
        <GlassCard>
          <CardHeader>
            <div className="font-bold flex items-center gap-2 p-3">Notifications</div>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-2 items-center text-sm">
                {n.icon}
                <span>{n.message}</span>
                <span className="ml-auto text-xs text-gray-400">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </GlassCard>
      </div>
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
      {isPositive ? <ArrowUpRight size={12} className="animate-pulse" /> : <ArrowDownRight size={12} className="animate-pulse" />}
      {change}
    </span>
  );
  return (
    <GlassCard className="p-5 flex items-center justify-between gap-3 hover:border-purple-200/50 dark:hover:border-purple-800/50">
      <div className="flex-1">
        <div className="text-slate-600 dark:text-slate-400 uppercase text-xs font-semibold mb-2 tracking-wider">{title}</div>
        <div className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          {value}
          {changeLabel}
        </div>
      </div>
      <div className="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 rounded-xl p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
    </GlassCard>
  );
}

function OrderItem({ name, order, price, status }: { name: string; order: string; price: string; status: string }) {
  const statusMap: Record<string, string> = {
    Delivered: "green",
    Pending: "yellow",
    Cancelled: "red",
  };
  return (
    <div className="flex justify-between items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/5 group">
      <div className="flex-1">
        <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{order}</div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-slate-800 dark:text-slate-200">{price}</span>
        <Badge color={statusMap[status] as any}>{status}</Badge>
        <Button variant="outline" size="sm" className="text-xs hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/30 dark:hover:border-purple-800 transition-colors duration-300">
          Details
        </Button>
      </div>
    </div>
  );
}

function ProductItem({ name, price, sold }: { name: string; price: string; sold: number }) {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 group">
      <span className="text-gray-700 dark:text-gray-300 font-medium flex-1 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">{name}</span>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-800 dark:text-gray-200">{price}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
          Sold: {sold}
        </span>
      </div>
    </div>
  );
}

function InventoryAlert({ name, level, color }: { name: string; level: string; color: "red" | "yellow" | "blue" | "green" }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 group">
      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">{name}</span>
      <Badge color={color}>{level}</Badge>
    </div>
  );
}

function Badge({ children, color }: { children: React.ReactNode; color?: "green" | "red" | "yellow" | "blue" }) {
  const base = "px-3 py-1 rounded-full font-semibold text-xs border transition-all duration-300 hover:scale-105";
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
        <img src={src} alt="User avatar" className="w-full h-full object-cover" />
      ) : (
        <User2 className="w-6 h-6 text-white drop-shadow-sm" />
      )}
    </span>
  );
}
