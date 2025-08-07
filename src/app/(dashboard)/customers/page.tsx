"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {

  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  MapPin,
  ShoppingBag,
  Calendar,
  Mail,
  Phone,
  Star,
  TrendingUp,
  DollarSign,

} from "lucide-react";

// StatCard Component
function StatCard({ 
  title, 
  value, 
  icon, 
  color = "purple",
  trend,
  trendValue 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color?: "purple" | "green" | "blue" | "yellow" | "indigo" | "pink";
  trend?: "up" | "down";
  trendValue?: string;
}) {
  const colorClasses = {
    purple: "hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-purple-500/10",
    green: "hover:border-green-200/50 dark:hover:border-green-800/50 hover:shadow-green-500/10",
    blue: "hover:border-blue-200/50 dark:hover:border-blue-800/50 hover:shadow-blue-500/10",
    yellow: "hover:border-yellow-200/50 dark:hover:border-yellow-800/50 hover:shadow-yellow-500/10",
    indigo: "hover:border-indigo-200/50 dark:hover:border-indigo-800/50 hover:shadow-indigo-500/10",
    pink: "hover:border-pink-200/50 dark:hover:border-pink-800/50 hover:shadow-pink-500/10",
  };

  return (
    <Card className={`backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colorClasses[color]} group`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
              {trend && trendValue && (
                <span className={`text-xs font-semibold flex items-center gap-1 ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
                  {trendValue}
                </span>
              )}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  joined: string;
  lastOrder?: string;
  status: "Active" | "Inactive";
  vipStatus: boolean;
  avatar?: string;
}

export default function CustomersPage() {
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "Active" as "Active" | "Inactive",
  });

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUST001",
      name: "Mohanth Sai",
      email: "mohanth@example.com",
      phone: "+91 98765 43210",
      location: "Hyderabad",
      totalOrders: 12,
      totalSpent: "$1,245.50",
      joined: "Jan 15, 2024",
      lastOrder: "Jan 18, 2024",
      status: "Active",
      vipStatus: true,
    },
    {
      id: "CUST002",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555 123 4567",
      location: "Mumbai",
      totalOrders: 5,
      totalSpent: "$567.80",
      joined: "Feb 28, 2024",
      lastOrder: "Mar 05, 2024",
      status: "Active",
      vipStatus: false,
    },
    {
      id: "CUST003",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 555 987 6543",
      location: "Delhi",
      totalOrders: 18,
      totalSpent: "$2,156.75",
      joined: "Dec 10, 2023",
      lastOrder: "Jan 20, 2024",
      status: "Active",
      vipStatus: true,
    },
    {
      id: "CUST004",
      name: "Mike Chen",
      email: "mike.chen@example.com",
      phone: "+1 555 456 7890",
      location: "Bangalore",
      totalOrders: 3,
      totalSpent: "$234.90",
      joined: "Mar 15, 2024",
      lastOrder: "Mar 20, 2024",
      status: "Inactive",
      vipStatus: false,
    },
    {
      id: "CUST005",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 87654 32109",
      location: "Chennai",
      totalOrders: 25,
      totalSpent: "$3,456.20",
      joined: "Nov 05, 2023",
      lastOrder: "Jan 19, 2024",
      status: "Active",
      vipStatus: true,
    },
  ]);

  // Filtered customers based on search and filters
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter;
      const matchesLocation = locationFilter === "all" || customer.location.toLowerCase() === locationFilter;
      
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [customers, searchTerm, statusFilter, locationFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === "Active").length;
    const vipCustomers = customers.filter(c => c.vipStatus).length;
    const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.totalSpent.replace('$', '').replace(',', '')), 0);
    const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    return {
      total: totalCustomers,
      active: activeCustomers,
      vip: vipCustomers,
      revenue: `$${totalRevenue.toLocaleString()}`,
      orders: totalOrders,
      avgOrder: `$${avgOrderValue.toFixed(2)}`,
    };
  }, [customers]);

  // Unique locations for filter
  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(customers.map(c => c.location)));
  }, [customers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: `CUST${(customers.length + 1).toString().padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      totalOrders: 0,
      totalSpent: "$0.00",
      joined: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: formData.status,
      vipStatus: false,
    };

    if (editingCustomer) {
      setCustomers((prev) => prev.map(customer => 
        customer.id === editingCustomer.id 
          ? { ...customer, ...formData }
          : customer
      ));
      setEditingCustomer(null);
    } else {
      setCustomers((prev) => [...prev, newCustomer]);
    }
    
    setFormData({ name: "", email: "", phone: "", location: "", status: "Active" });
    setOpen(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      location: customer.location,
      status: customer.status,
    });
    setOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) => prev.filter(customer => customer.id !== customerId));
  };

  const handleExportCustomers = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Phone", "Location", "Total Orders", "Total Spent", "Joined", "Last Order", "Status", "VIP"],
      ...filteredCustomers.map(customer => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone || "",
        customer.location,
        customer.totalOrders.toString(),
        customer.totalSpent,
        customer.joined,
        customer.lastOrder || "",
        customer.status,
        customer.vipStatus ? "Yes" : "No"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl p-1 font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your customers, track orders, and analyze customer behavior
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleExportCustomers}
            className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/30 dark:hover:border-purple-800 transition-colors duration-300"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
             
            </DialogTrigger>
            <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-2xl rounded-2xl transition-all duration-300">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
                  {editingCustomer ? "Edit Customer" : "Add New Customer"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <Input
                    placeholder="Enter full name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <Input
                    placeholder="Enter email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <Input
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <Input
                    placeholder="Enter location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                  <Select value={formData.status} onValueChange={(value: "Active" | "Inactive") => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-8 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setOpen(false);
                    setEditingCustomer(null);
                    setFormData({ name: "", email: "", phone: "", location: "", status: "Active" });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddCustomer} 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {editingCustomer ? "Update Customer" : "Save Customer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.total.toString()}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          color="purple"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Active Customers"
          value={stats.active.toString()}
          icon={<UserCheck className="w-5 h-5 text-green-600" />}
          color="green"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="VIP Customers"
          value={stats.vip.toString()}
          icon={<Star className="w-5 h-5 text-yellow-600" />}
          color="yellow"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Total Revenue"
          value={stats.revenue}
          icon={<DollarSign className="w-5 h-5  text-blue-600" />}
          color="blue"
          trend="up"
          trendValue="+15%"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.toString()}
          icon={<ShoppingBag className="w-5 h-5 text-indigo-600" />}
          color="indigo"
          trend="up"
          trendValue="+10%"
        />
        <StatCard
          title="Avg Order Value"
          value={stats.avgOrder}
          icon={<TrendingUp className="w-5 h-5 text-pink-600" />}
          color="pink"
          trend="up"
          trendValue="+3%"
        />
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location.toLowerCase()}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
        <CardHeader className="border-b border-gray-200/50 dark:border-zinc-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Customers ({filteredCustomers.length})
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200/50 dark:border-zinc-800/50">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Location</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Orders & Spending</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Activity</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow 
                    key={customer.id} 
                    className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 border-b border-gray-100/50 dark:border-zinc-800/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                            {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          {customer.vipStatus && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Star className="w-2.5 h-2.5 text-yellow-800" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            {customer.name}
                            {customer.vipStatus && (
                              <Badge className="bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 dark:border-yellow-800/50 text-xs">
                                VIP
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">{customer.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-3 h-3 text-blue-500" />
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{customer.totalOrders} orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{customer.totalSpent}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`transition-all duration-300 hover:scale-105 ${
                          customer.status === "Active"
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 dark:border-green-800/50"
                            : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400 dark:border-red-800/50"
                        }`}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          Joined: {customer.joined}
                        </div>
                        {customer.lastOrder && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Last order: {customer.lastOrder}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition-colors duration-300"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleEditCustomer(customer)}
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/30 transition-colors duration-300"
                          title="Edit Customer"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors duration-300"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No customers found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
