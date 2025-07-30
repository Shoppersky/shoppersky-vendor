"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Store,
  Grid3X3,
  List,
  TrendingUp,
  Activity,
  DollarSign,
} from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"
import useStore from '@/lib/Zustand';


// Enhanced StatCard Component with better responsive design
function StatCard({
  title,
  value,
  icon,
  color = "slate",
  trend,
  trendValue,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color?: "slate" | "emerald" | "red" | "blue" | "amber" | "violet" | "cyan"
  trend?: "up" | "down"
  trendValue?: string
}) {
  const colorClasses = {
    slate: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700",
    emerald:
      "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700",
    red: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700",
    blue: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700",
    amber:
      "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700",
    violet:
      "from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200 dark:border-violet-700",
    cyan: "from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-cyan-200 dark:border-cyan-700",
  }

  const iconColors = {
    slate: "text-slate-600 dark:text-slate-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    violet: "text-violet-600 dark:text-violet-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
  }

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-bold">{value}</p>
              {trend && trendValue && (
                <div
                  className={`flex items-center text-xs font-medium ${
                    trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp className={`w-3 h-3 mr-1 ${trend === "down" ? "rotate-180" : ""}`} />
                  {trendValue}
                </div>
              )}
            </div>
          </div>
          <div
            className={`p-3 rounded-xl ${iconColors[color]} group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mobile User Card Component
function UserCard({
  user,
  onEdit,
  onDelete,
}: { user: any; onEdit: (user: any) => void; onDelete: (id: string) => void }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white font-semibold">
              {user.username
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{user.username}</h3>
              <p className="text-xs text-muted-foreground">ID: {user.user_id}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user.user_id)} className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={user.status === "Active" ? "default" : "secondary"} className="text-xs">
              {user.status}
            </Badge>
            <span className="text-xs font-medium">{user.role_name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface UserInterface {
  user_id: string
  username: string
  email: string
  role_id: string
  role_name: string
  vendor_ref_id: string
  status?: string
  joinDate?: string
  lastActive?: string
}

export default function UsersPage() {
  const { userId } = useStore();
  const [users, setUsers] = useState<UserInterface[]>([])
  const [open, setOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role_id: "",
    status: "Active",
  })



  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/vendor/employee/?page=1&per_page=10')
        const employees = response.data.data.employees.map((emp: any) => ({
          ...emp,
          status: emp.status || "Active", // Default status if not provided
          joinDate: emp.joinDate || new Date().toISOString().split("T")[0],
          lastActive: emp.lastActive || new Date().toISOString().split("T")[0],
        }))
        setUsers(employees)
        setError(null)
      } catch (err) {
        setError('Failed to fetch users')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Filtered users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || user.status?.toLowerCase() === statusFilter
      const matchesRole = roleFilter === "all" || user.role_name.toLowerCase() === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, searchTerm, statusFilter, roleFilter])

  // Enhanced statistics with trends
  const stats = useMemo(() => {
    const totalUsers = users.length
    const activeUsers = users.filter((u) => u.status === "Active").length
    const inactiveUsers = users.filter((u) => u.status === "Inactive").length
    const adminUsers = users.filter((u) => u.role_name === "ADMIN").length
    const managerUsers = users.filter((u) => u.role_name === "Manager").length
    const employeeUsers = users.filter((u) => u.role_name === "Employee").length
    const vendorUsers = users.filter((u) => u.role_name === "Vendor").length

    return {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      admin: adminUsers,
      manager: managerUsers,
      employee: employeeUsers,
      vendor: vendorUsers,
    }
  }, [users])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = async () => {
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        role_id: formData.role_id,
      }

      const response = await axiosInstance.post(`/vendor/employee/create?vendor_id=${userId}`, payload)
      
      const newUser: UserInterface = {
        user_id: response.data.data.user_id,
        username: response.data.data.username,
        email: response.data.data.email,
        role_id: formData.role_id,
        role_name: formData.role_id === "289z3f" ? "ADMIN" : formData.role_id, // Map role_id to role_name as needed
        vendor_ref_id: response.data.data.vendor_ref_id,
        status: formData.status,
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      }

      if (editingUser) {
        setUsers((prev) => prev.map((user) => (user.user_id === editingUser.user_id ? { ...user, ...newUser } : user)))
      } else {
        setUsers((prev) => [...prev, newUser])
      }

      setFormData({ username: "", email: "", role_id: "", status: "Active" })
      setEditingUser(null)
      setOpen(false)
    } catch (err) {
      setError('Failed to create/update user')
      console.error(err)
    }
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      status: user.status,
    })
    setOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.user_id !== userId))
  }

  const handleExportUsers = () => {
    const csvContent = [
      ["ID", "Username", "Email", "Role", "Status", "Join Date", "Last Active"],
      ...filteredUsers.map((user) => [
        user.user_id,
        user.username,
        user.email,
        user.role_name,
        user.status,
        user.joinDate,
        user.lastActive,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-violet-700 to-blue-700 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your team members, roles, and permissions with ease
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Button
              variant="outline"
              onClick={handleExportUsers}
              className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 bg-transparent"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setEditingUser(null)
                    setFormData({ username: "", email: "", role_id: "", status: "Active" })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    {editingUser ? (
                      <>
                        <Edit className="w-6 h-6 text-violet-600" />
                        Edit User
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 text-violet-600" />
                        Add New User
                      </>
                    )}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="role">Role & Access</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Username *
                          </label>
                          <Input
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address *
                          </label>
                          <Input
                            placeholder="Enter email address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
                            required
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="role" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            Role *
                          </label>
                          <Select
                            value={formData.role_id}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, role_id: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="289z3f">
                                <div className="flex items-center gap-2">
                                  <Crown className="w-4 h-4 text-amber-600" />
                                  Admin
                                </div>
                              </SelectItem>
                              <SelectItem value="manager">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-blue-600" />
                                  Manager
                                </div>
                              </SelectItem>
                              <SelectItem value="employee">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-emerald-600" />
                                  Employee
                                </div>
                              </SelectItem>
                              <SelectItem value="vendor">
                                <div className="flex items-center gap-2">
                                  <Store className="w-4 h-4 text-violet-600" />
                                  Vendor
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Status
                          </label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">
                                <div className="flex items-center gap-2">
                                  <UserCheck className="w-4 h-4 text-emerald-600" />
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

                      {!editingUser && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Welcome Email</p>
                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                A welcome email with login credentials will be sent to the user's email address.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>

                <DialogFooter className="gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOpen(false)
                      setEditingUser(null)
                      setFormData({ username: "", email: "", role_id: "", status: "Active" })
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddUser}
                    disabled={!formData.username || !formData.email || !formData.role_id}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                  >
                    {editingUser ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update User
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <StatCard
              title="Total Users"
              value={stats.total.toString()}
              icon={<Users className="w-6 h-6" />}
              color="slate"
              trend="up"
              trendValue="+12%"
            />
          </div>
          <StatCard
            title="Active"
            value={stats.active.toString()}
            icon={<UserCheck className="w-6 h-6" />}
            color="emerald"
            trend="up"
            trendValue="+5%"
          />
          <StatCard
            title="Inactive"
            value={stats.inactive.toString()}
            icon={<UserX className="w-6 h-6" />}
            color="red"
          />
          <StatCard title="Admins" value={stats.admin.toString()} icon={<Crown className="w-6 h-6" />} color="amber" />
          <StatCard
            title="Managers"
            value={stats.manager.toString()}
            icon={<Shield className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Employees"
            value={stats.employee.toString()}
            icon={<User className="w-6 h-6" />}
            color="emerald"
          />
          <StatCard
            title="Vendors"
            value={stats.vendor.toString()}
            icon={<Store className="w-6 h-6" />}
            color="violet"
          />
        </div>

        {/* Enhanced Filters and Search */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40">
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

                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filters Toggle */}
              <div className="flex lg:hidden items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>

                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t grid grid-cols-2 gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
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
            )}
          </CardContent>
        </Card>

        {/* Users Display */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-violet-50 dark:from-slate-800 dark:to-violet-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-600" />
                <h3 className="text-lg font-semibold">Users ({filteredUsers.length})</h3>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {filteredUsers.length} of {users.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {viewMode === "grid" ? (
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.user_id} user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow
                          key={user.user_id}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                                {user.username
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold">{user.username}</div>
                                <div className="text-xs text-muted-foreground">ID: {user.user_id}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-3 h-3 text-muted-foreground" />
                                <span className="truncate max-w-[200px]">{user.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {user.role_name === "ADMIN" && <Crown className="w-4 h-4 text-amber-600" />}
                              {user.role_name === "Manager" && <Shield className="w-4 h-4 text-blue-600" />}
                              {user.role_name === "Employee" && <User className="w-4 h-4 text-emerald-600" />}
                              {user.role_name === "Vendor" && <Store className="w-4 h-4 text-violet-600" />}
                              <span className="font-medium">{user.role_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === "Active" ? "default" : "secondary"}
                              className={
                                user.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span>Joined {new Date(user.joinDate!).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Activity className="w-3 h-3" />
                                <span>Active {new Date(user.lastActive!).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleEditUser(user)}
                                className="h-8 w-8 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/30"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteUser(user.user_id)}
                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
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

                {/* Mobile Cards */}
                <div className="lg:hidden p-4 space-y-4">
                  {filteredUsers.map((user) => (
                    <UserCard key={user.user_id} user={user} onEdit={handleEditUser} onDelete={handleDeleteUser} />
                  ))}
                </div>
              </>
            )}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}