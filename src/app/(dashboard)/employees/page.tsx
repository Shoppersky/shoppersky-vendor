"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Plus, 
  Eye, 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Users, 
  UserCheck, 
  UserX,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  Shield,
  Crown,
  User,
  Edit,
  Save,
  X,
  Info,
  Store
} from "lucide-react";

// StatCard Component
function StatCard({ 
  title, 
  value, 
  icon, 
  color = "purple" 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  color?: "purple" | "green" | "red" | "blue" | "yellow" | "indigo";
}) {
  const colorClasses = {
    purple: "hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-purple-500/10",
    green: "hover:border-green-200/50 dark:hover:border-green-800/50 hover:shadow-green-500/10",
    red: "hover:border-red-200/50 dark:hover:border-red-800/50 hover:shadow-red-500/10",
    blue: "hover:border-blue-200/50 dark:hover:border-blue-800/50 hover:shadow-blue-500/10",
    yellow: "hover:border-yellow-200/50 dark:hover:border-yellow-800/50 hover:shadow-yellow-500/10",
    indigo: "hover:border-indigo-200/50 dark:hover:border-indigo-800/50 hover:shadow-indigo-500/10",
  };

  return (
    <Card className={`backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colorClasses[color]} group`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  phone?: string;
  joinDate: string;
  lastActive: string;
  totalOrders?: number;
  totalSpent?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "U001",
      name: "Mohanth Sai",
      email: "mohanthsai07@gmail.com",
      role: "Admin",
      status: "Active",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-01-15",
      lastActive: "2024-01-20",
      totalOrders: 0,
      totalSpent: "$0",
    },
    {
      id: "U002",
      name: "John Doe",
      email: "john@example.com",
      role: "Manager",
      status: "Active",
      phone: "+1 (555) 987-6543",
      joinDate: "2023-03-22",
      lastActive: "2024-01-18",
      totalOrders: 0,
      totalSpent: "$0",
    },
    {
      id: "U003",
      name: "Priya Sharma",
      email: "priya@gmail.com",
      role: "Employee",
      status: "Active",
      phone: "+1 (555) 456-7890",
      joinDate: "2023-06-10",
      lastActive: "2024-01-20",
      totalOrders: 12,
      totalSpent: "$1,245.50",
    },
    {
      id: "U004",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Employee",
      status: "Active",
      phone: "+1 (555) 234-5678",
      joinDate: "2023-08-05",
      lastActive: "2024-01-19",
      totalOrders: 8,
      totalSpent: "$892.30",
    },
    {
      id: "U005",
      name: "Mike Chen",
      email: "mike.chen@example.com",
      role: "Vendor",
      status: "Active",
      phone: "+1 (555) 345-6789",
      joinDate: "2023-09-12",
      lastActive: "2024-01-20",
      totalOrders: 15,
      totalSpent: "$2,156.75",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active",
  });

  // Filtered users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter;
      const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchTerm, statusFilter, roleFilter]);

  // Statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === "Active").length;
    const inactiveUsers = users.filter(u => u.status === "Inactive").length;
    const adminUsers = users.filter(u => u.role === "Admin").length;
    const managerUsers = users.filter(u => u.role === "Manager").length;
    const employeeUsers = users.filter(u => u.role === "Employee").length;
    const vendorUsers = users.filter(u => u.role === "Vendor").length;
    
    return {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      admin: adminUsers,
      manager: managerUsers,
      employee: employeeUsers,
      vendor: vendorUsers,
    };
  }, [users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: `U${(users.length + 1).toString().padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: "$0",
    };

    if (editingUser) {
      setUsers((prev) => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, newUser]);
    }
    
    setFormData({ name: "", email: "", phone: "", role: "", status: "Active" });
    setOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      status: user.status,
    });
    setOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter(user => user.id !== userId));
  };

  const handleExportUsers = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Phone", "Role", "Status", "Join Date", "Last Active", "Total Orders", "Total Spent"],
      ...filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.phone || "",
        user.role,
        user.status,
        user.joinDate,
        user.lastActive,
        user.totalOrders?.toString() || "0",
        user.totalSpent || "$0"
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 bg-white p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold p-1 tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your users, roles, and permissions
          </p>
        </div>
        </div>
        <div className="flex items-center gap-3 w-full justify-end">
          <Button 
            variant="outline" 
            onClick={handleExportUsers}
            className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-900/30 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ name: "", email: "", phone: "", role: "", status: "Active" });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-lg backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-white/20 dark:border-zinc-800/50 shadow-2xl rounded-2xl transition-all duration-300 hover:shadow-3xl hover:shadow-purple-500/20">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent flex items-center gap-3">
                {editingUser ? (
                  <>
                    <Edit className="w-6 h-6 text-purple-600" />
                    Edit Employee
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-purple-600" />
                    Add New Employee
                  </>
                )}
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {editingUser ? "Update employee information" : "Fill in the details to add a new employee to your team"}
              </p>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <Input
                      placeholder="Enter full name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:shadow-md hover:shadow-purple-500/10"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      placeholder="Enter email address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:shadow-md hover:shadow-purple-500/10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <Input
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:shadow-md hover:shadow-purple-500/10"
                  />
                </div>
              </div>

              {/* Role & Status Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Role & Access
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Role *
                    </label>
                    <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:shadow-md hover:shadow-purple-500/10">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-yellow-600" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem value="Manager">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            Manager
                          </div>
                        </SelectItem>
                        <SelectItem value="Employee">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-600" />
                            Employee
                          </div>
                        </SelectItem>
                        <SelectItem value="Vendor">
                          <div className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-purple-600" />
                            Vendor
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Status
                    </label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 hover:shadow-md hover:shadow-purple-500/10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-green-600" />
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value="Inactive">
                          <div className="flex items-center gap-2">
                            <UserX className="w-4 h-4 text-red-600" />
                            Inactive
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {!editingUser && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Welcome Email</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        A welcome email with login credentials will be sent to the employee's email address.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="pt-6 gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setOpen(false);
                  setEditingUser(null);
                  setFormData({ name: "", email: "", phone: "", role: "", status: "Active" });
                }}
                className="flex-1 transition-all duration-300 hover:shadow-md hover:shadow-gray-500/20 hover:scale-105"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleAddUser} 
                disabled={!formData.name || !formData.email || !formData.role}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingUser ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Employee
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard
          title="Total Employees"
          value={stats.total.toString()}
          icon={<Users className="w-5 h-5 text-purple-600" />}
          color="purple"
        />
        <StatCard
          title="Active"
          value={stats.active.toString()}
          icon={<UserCheck className="w-5 h-5 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Inactive"
          value={stats.inactive.toString()}
          icon={<UserX className="w-5 h-5 text-red-600" />}
          color="red"
        />
        <StatCard
          title="Admins"
          value={stats.admin.toString()}
          icon={<Crown className="w-5 h-5 text-yellow-600" />}
          color="yellow"
        />
        <StatCard
          title="Managers"
          value={stats.manager.toString()}
          icon={<Shield className="w-5 h-5 text-blue-600" />}
          color="blue"
        />
        <StatCard
          title="Employees"
          value={stats.employee.toString()}
          icon={<User className="w-5 h-5 text-green-600" />}
          color="green"
        />
        <StatCard
          title="Vendors"
          value={stats.vendor.toString()}
          icon={<Store className="w-5 h-5 text-indigo-600" />}
          color="indigo"
        />
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
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
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
        <CardHeader className="border-b border-gray-200/50 dark:border-zinc-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Users ({filteredUsers.length})
              </h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200/50 dark:border-zinc-800/50">
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">User</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Role</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Activity</TableHead>
                  <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Orders</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-300 border-b border-gray-100/50 dark:border-zinc-800/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        {user.role === "Admin" && <Shield className="w-4 h-4 text-blue-600" />}
                        {user.role === "Vendor" && <Crown className="w-4 h-4 text-yellow-600" />}
                        {user.role === "Customer" && <User className="w-4 h-4 text-gray-600" />}
                        <span className="font-medium text-gray-800 dark:text-gray-200">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`transition-all duration-300 hover:scale-105 ${
                          user.status === "Active"
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 dark:border-green-800/50"
                            : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400 dark:border-red-800/50"
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          Joined: {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Last active: {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{user.totalOrders || 0}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.totalSpent || "$0"}</div>
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
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/30 transition-colors duration-300"
                          title="Edit User"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleDeleteUser(user.id)}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors duration-300"
                          title="Delete User"
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
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No users found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
