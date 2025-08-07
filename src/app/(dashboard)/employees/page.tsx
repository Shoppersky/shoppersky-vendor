


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
  RotateCcw,
} from "lucide-react"
import axiosInstance from "@/lib/axiosInstance"
import useStore from '@/lib/Zustand';
import { toast } from "sonner";
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
      className={`bg-gradient-to-br ${colorClasses[color]} border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group backdrop-blur-sm`}
    >
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <div className="flex items-baseline gap-1 sm:gap-2">
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold truncate">{value}</p>
              {trend && trendValue && (
                <div
                  className={`flex items-center text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-red-600"
                    }`}
                >
                  <TrendingUp className={`w-3 h-3 mr-1 ${trend === "down" ? "rotate-180" : ""}`} />
                  <span className="hidden sm:inline">{trendValue}</span>
                </div>
              )}
            </div>
          </div>
          <div
            className={`p-2 sm:p-3 rounded-xl ${iconColors[color]} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
              {icon}
            </div>
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
  onRestore,
}: { 
  user: any; 
  onEdit: (user: any) => void; 
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
              {user.username
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-xs sm:text-sm truncate">{user.username}</h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0">
                <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user.is_active ? (
                <>
                  <DropdownMenuItem onClick={() => onEdit(user)}>
                    <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Edit Employee</span>
                  </DropdownMenuItem>
                   <DropdownMenuItem onClick={() => onRestore(user.user_id)} className="text-emerald-600">
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Restore Employee</span>
                  </DropdownMenuItem>
                </>
              ) : (
                 <DropdownMenuItem onClick={() => onDelete(user.user_id)} className="text-red-600">
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Delete Employee</span>
                  </DropdownMenuItem>
               
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
            <Badge variant={user.is_active ? "secondary" : "default"} className="text-xs flex-shrink-0">
              {user.is_active ? "Inactive" : "Active"}
            </Badge>
            <span className="text-xs font-medium truncate">{user.role_name}</span>
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
  is_active: boolean
  joinDate?: string
  lastActive?: string
}

export default function UsersPage() {
  const { userId } = useStore();
  const [users, setUsers] = useState<UserInterface[]>([])
  const [open, setOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("active")
  const [roleFilter, setRoleFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role_id: "",
    is_active: false,
  })

  interface RoleInterface {
    id: string;
    name: string;
  }

  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [roles, setRoles] = useState<RoleInterface[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoadingRoles(true);
      try {
        const response = await axiosInstance.get("/roles/?is_active=false");
        setRoles(
          response.data.data.map((role: any) => ({
            id: role.role_id,
            name: role.role_name,
          }))
        );
      } catch (err) {
        setError("Failed to fetch roles");
      } finally {
        setIsLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/vendor/employee/?page=1&per_page=10')
        const employees = response.data.data.employees.map((emp: any) => ({
          ...emp,
          is_active: emp.is_active || false, // Backend uses True for inactive, False for active
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
      const matchesStatus = 
        statusFilter === "all" ? true :
        statusFilter === "active" ? !user.is_active :
        user.is_active
      const matchesRole = roleFilter === "all" || user.role_name.toLowerCase() === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [users, searchTerm, statusFilter, roleFilter])

  // Enhanced statistics with trends
  const stats = useMemo(() => {
    const totalUsers = users.length
    const activeUsers = users.filter((u) => !u.is_active).length
    const inactiveUsers = users.filter((u) => u.is_active).length
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
        is_active: formData.is_active,
      }

      let response;
      if (editingUser) {
        // Update existing user
        response = await axiosInstance.put(`/vendor/employee/${editingUser.user_id}`, payload)
      } else {
        // Create new user
        response = await axiosInstance.post(`/vendor/employee/create?vendor_id=${userId}`, payload)
      }

      const newUser: UserInterface = {
        user_id: response.data.data.user_id,
        username: response.data.data.username,
        email: response.data.data.email,
        role_id: formData.role_id,
        role_name: roles.find(r => r.id === formData.role_id)?.name || formData.role_id,
        vendor_ref_id: response.data.data.vendor_ref_id,
        is_active: response.data.data.is_active,
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      }

      if (editingUser) {
        setUsers((prev) => prev.map((user) => (user.user_id === editingUser.user_id ? { ...user, ...newUser } : user)))
      } else {
        setUsers((prev) => [...prev, newUser])
      }
      

      setFormData({ username: "", email: "", role_id: "", is_active: false })
      setEditingUser(null)
      setOpen(false)
    } catch (err: any) {
  const status = err.response?.status;

  if (status === 409) {
    toast.error(err.response?.data?.message || "Username already exists");
  } else {
    setError(err.response?.data?.message || 'Failed to create/update user');
  }

  console.error(err);
}
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      is_active: user.is_active,
    })
    setOpen(true)
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await axiosInstance.patch(`/vendor/employee/${userId}/soft-delete`)
      setUsers((prev) => prev.map((user) => 
        user.user_id === userId ? { ...user, is_active: true } : user
      ))
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user')
      console.error(err)
    }
  }

  const handleRestoreUser = async (userId: string) => {
    try {
      await axiosInstance.patch(`/vendor/employee/${userId}/restore`)
      setUsers((prev) => prev.map((user) => 
        user.user_id === userId ? { ...user, is_active: false } : user
      ))
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to restore user')
      console.error(err)
    }
  }

  const handleExportUsers = () => {
    const csvContent = [
      ["ID", "Username", "Email", "Role", "Status", "Join Date", "Last Active"],
      ...filteredUsers.map((user) => [
        user.user_id,
        user.username,
        user.email,
        user.role_name,
        user.is_active ? "Inactive" : "Active",
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
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 pt-16 md:pt-4 bg-white animate-fadeIn min-h-screen custom-scrollbar">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-muted-foreground">Loading employees...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 pt-16 md:pt-4 bg-white animate-fadeIn min-h-screen custom-scrollbar">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-2">Error Loading Data</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 pt-16 md:pt-4 bg-white animate-fadeIn min-h-screen custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 via-purple-700 to-blue-700 bg-clip-text text-transparent leading-tight">
            Employee Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            Manage your team members, roles, and permissions with ease
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleExportUsers}
            className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 bg-transparent text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                onClick={() => {
                  setEditingUser(null)
                  setFormData({ username: "", email: "", role_id: "", is_active: false })
                }}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add Employee</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>

              <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    {editingUser ? (
                      <>
                        <Edit className="w-6 h-6 text-violet-600" />
                        Edit Employee
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 text-violet-600" />
                        Add New Employee
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
                              {isLoadingRoles ? (
                                <SelectItem value="loading" disabled>
                                  Loading roles...
                                </SelectItem>
                              ) : roles.length === 0 ? (
                                <SelectItem value="no-roles" disabled>
                                  No roles available
                                </SelectItem>
                              ) : (
                                roles.map((role) => (
                                  <SelectItem key={role.id} value={role.id}>
                                    <div className="flex items-center gap-2">
                                      {role.name.toUpperCase() === "ADMIN" && <Crown className="w-4 h-4 text-amber-600" />}
                                      {role.name.toUpperCase() === "MANAGER" && <Shield className="w-4 h-4 text-blue-600" />}
                                      {role.name.toUpperCase() === "EMPLOYEE" && <User className="w-4 h-4 text-emerald-600" />}
                                      {role.name.toUpperCase() === "VENDOR" && <Store className="w-4 h-4 text-violet-600" />}
                                      {role.name.toUpperCase() !== "ADMIN" &&
                                        role.name.toUpperCase() !== "MANAGER" &&
                                        role.name.toUpperCase() !== "EMPLOYEE" &&
                                        role.name.toUpperCase() !== "VENDOR" && <User className="w-4 h-4 text-gray-600" />}
                                      {role.name}
                                    </div>
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* <div className="space-y-2">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Status
                          </label>
                          <Select
                            value={formData.is_active ? "Inactive" : "Active"}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, is_active: value === "Inactive" }))}
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
                        </div> */}
                      </div>

                      {!editingUser && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Welcome Email</p>
                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                A welcome email with login credentials will be sent to the user&apos;s email address.
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
                      setFormData({ username: "", email: "", role_id: "", is_active: false })
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
      </div>

      {/* Enhanced Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Users"
          value={stats.total.toString()}
          icon={<Users className="w-6 h-6" />}
          color="slate"
          trend="up"
          trendValue="+12%"
        />
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
        <StatCard
          title="Managers"
          value={stats.manager.toString()}
          icon={<Shield className="w-6 h-6" />}
          color="blue"
        />
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-10 transition-all duration-300 focus:ring-2 focus:ring-violet-500/20 text-xs sm:text-sm"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-3">
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
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                  >
                    <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

            {/* Mobile Filters Toggle */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>

              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                >
                  <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden mt-3 sm:mt-4 pt-3 sm:pt-4 border-t grid grid-cols-2 gap-2 sm:gap-3">
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
        <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-violet-50 dark:from-slate-800 dark:to-violet-900/20 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold">Users ({filteredUsers.length})</h3>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
              {filteredUsers.length} of {users.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {viewMode === "grid" ? (
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredUsers.map((user) => (
                  <UserCard 
                    key={user.user_id} 
                    user={user} 
                    onEdit={handleEditUser} 
                    onDelete={handleDeleteUser}
                    onRestore={handleRestoreUser}
                  />
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
                              variant={user.is_active ? "secondary" : "default"}
                              className={
                                user.is_active
                                  ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
                              }
                            >
                              {user.is_active ? "Inactive" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span>Joined {new Date(user.joinDate!).toLocaleDateString('en-GB')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Activity className="w-3 h-3" />
                                <span>Active {new Date(user.lastActive!).toLocaleDateString('en-GB')}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              {user.is_active ? (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleRestoreUser(user.user_id)}
                                  className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/30"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                </Button>
                              ) : (
                                <>
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
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

              {/* Mobile Cards */}
              <div className="lg:hidden p-3 sm:p-4 space-y-3 sm:space-y-4">
                {filteredUsers.map((user) => (
                  <UserCard 
                    key={user.user_id} 
                    user={user} 
                    onEdit={handleEditUser} 
                    onDelete={handleDeleteUser}
                    onRestore={handleRestoreUser}
                  />
                ))}
              </div>
            </>
          )}

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Users className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-muted-foreground mb-1 sm:mb-2">No users found</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}