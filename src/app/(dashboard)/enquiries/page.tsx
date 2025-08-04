"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Send,
  MessageSquare,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  CheckCircle,
  Clock,
  HelpCircle,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Eye,
  Calendar,
  MessageCircle,
  Star,
  Archive,
} from "lucide-react"

interface EnquiryFormData {
  vendorName: string
  email: string
  phone: string
  companyName: string
  subject: string
  category: string
  priority: string
  message: string
}

interface Enquiry {
  id: string
  subject: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "new" | "in-progress" | "resolved" | "closed"
  message: string
  response?: string
  createdAt: string
  updatedAt: string
  rating?: number
  adminName?: string
}

export default function VendorEnquiryPage() {
  const [activeTab, setActiveTab] = useState("new-enquiry")
  const [formData, setFormData] = useState<EnquiryFormData>({
    vendorName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    companyName: "Tech Solutions Inc.",
    subject: "",
    category: "",
    priority: "medium",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  // Mock enquiry data
  const [enquiries] = useState<Enquiry[]>([
    {
      id: "ENQ-001",
      subject: "Product listing approval process",
      category: "products",
      priority: "medium",
      status: "resolved",
      message: "I need help understanding the product approval process for electronics category.",
      response:
        "Thank you for your enquiry. The product approval process typically takes 2-3 business days. Please ensure all product images meet our quality standards and include detailed descriptions.",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-16T14:20:00Z",
      rating: 5,
      adminName: "Sarah Johnson",
    },
    {
      id: "ENQ-002",
      subject: "Payment processing delay",
      category: "billing",
      priority: "high",
      status: "in-progress",
      message: "My last payment has been delayed for over a week. Can you please check the status?",
      createdAt: "2024-01-18T09:15:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      adminName: "Mike Chen",
    },
    {
      id: "ENQ-003",
      subject: "Account verification documents",
      category: "account",
      priority: "low",
      status: "new",
      message: "What documents are required for business account verification?",
      createdAt: "2024-01-20T11:20:00Z",
      updatedAt: "2024-01-20T11:20:00Z",
    },
    {
      id: "ENQ-004",
      subject: "API integration support",
      category: "technical",
      priority: "urgent",
      status: "resolved",
      message: "I'm having trouble integrating with your inventory management API. Getting 401 errors consistently.",
      response:
        "The issue was related to API key permissions. I've updated your access level and sent you the new integration guide. Please try again and let us know if you need further assistance.",
      createdAt: "2024-01-12T14:30:00Z",
      updatedAt: "2024-01-13T10:15:00Z",
      rating: 4,
      adminName: "Alex Rodriguez",
    },
  ])

  const categories = [
    { value: "account", label: "Account & Registration" },
    { value: "products", label: "Product Management" },
    { value: "orders", label: "Orders & Payments" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Invoicing" },
    { value: "policies", label: "Policies & Guidelines" },
    { value: "partnership", label: "Partnership Opportunities" },
    { value: "other", label: "Other" },
  ]

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  ]

  const statusConfig = {
    new: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: Clock },
    "in-progress": {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      icon: RefreshCw,
    },
    resolved: { color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
    closed: { color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", icon: Archive },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData((prev) => ({ ...prev, subject: "", category: "", message: "" }))
      setActiveTab("my-enquiries")
    }, 2000)
  }

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusStats = () => {
    const stats = {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === "new").length,
      inProgress: enquiries.filter((e) => e.status === "in-progress").length,
      resolved: enquiries.filter((e) => e.status === "resolved").length,
      closed: enquiries.filter((e) => e.status === "closed").length,
    }
    return stats
  }

  const stats = getStatusStats()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="container mx-auto max-w-7xl p-4 lg:p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Enquiries
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Manage your questions and support requests
              </p>
            </div>
          </div>

          {/* Add this prominent Ask Question button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setActiveTab("new-enquiry")}
              className="h-16 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
            >
              <Plus className="w-6 h-6 mr-3" />
              Ask a Question
            </Button>
            <Button
              onClick={() => setActiveTab("my-enquiries")}
              variant="outline"
              className="h-16 px-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl text-lg font-semibold transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              View My Questions ({enquiries.length})
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stats.total}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">New</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">In Progress</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Resolved</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Closed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-2xl rounded-3xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border-b border-slate-200/50 dark:border-slate-700/50 p-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-1">
                <TabsTrigger
                  value="new-enquiry"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 h-12 text-base font-semibold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Ask a Question
                </TabsTrigger>
                <TabsTrigger
                  value="my-enquiries"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 h-12 text-base font-semibold"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  My Questions ({enquiries.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="new-enquiry" className="p-8 space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* New Enquiry Form */}
                <div className="xl:col-span-2">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Ask Your Question</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                          Get help from our support team - we're here to help!
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Personal Information (Pre-filled) */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                            Personal Information
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Vendor Name
                            </Label>
                            <Input
                              name="vendorName"
                              value={formData.vendorName}
                              onChange={handleInputChange}
                              className="h-12 bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
                              disabled
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address
                            </Label>
                            <Input
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="h-12 bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
                              disabled
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Phone Number
                            </Label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="h-12 bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
                              disabled
                            />
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Company Name
                            </Label>
                            <Input
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="h-12 bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      {/* Enquiry Details */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Enquiry Details</h3>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Subject *
                            </Label>
                            <Input
                              name="subject"
                              placeholder="Brief description of your enquiry"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="h-12 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Category *
                              </Label>
                              <Select
                                value={formData.category}
                                onValueChange={(value) => handleSelectChange("category", value)}
                              >
                                <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl">
                                  <SelectValue placeholder="Select enquiry category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* <div className="space-y-3">
                              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Priority
                              </Label>
                              <Select
                                value={formData.priority}
                                onValueChange={(value) => handleSelectChange("priority", value)}
                              >
                                <SelectTrigger className="h-12 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  {priorities.map((priority) => (
                                    <SelectItem key={priority.value} value={priority.value}>
                                      <div className="flex items-center gap-2">
                                        <div
                                          className={`w-2 h-2 rounded-full ${
                                            priority.value === "low"
                                              ? "bg-green-500"
                                              : priority.value === "medium"
                                                ? "bg-yellow-500"
                                                : priority.value === "high"
                                                  ? "bg-orange-500"
                                                  : "bg-red-500"
                                          }`}
                                        />
                                        {priority.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div> */}
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Message *
                            </Label>
                            <Textarea
                              name="message"
                              placeholder="Please provide detailed information about your enquiry..."
                              value={formData.message}
                              onChange={handleInputChange}
                              className="bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl min-h-[150px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              required
                            />
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span>Minimum 10 characters required</span>
                              <span>{formData.message.length} characters</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData((prev) => ({ ...prev, subject: "", category: "", message: "" }))}
                          className="flex-1 h-14 rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 bg-transparent"
                          disabled={isSubmitting}
                        >
                          <RefreshCw className="w-5 h-5 mr-2" />
                          Reset Form
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                              Submitting Your Question...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Submit My Question
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Sidebar - Help & Information */}
                <div className="space-y-6">
                  {/* Response Time Card */}
                  <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-slate-200/50 dark:border-slate-700/50">
                      <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        Response Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Standard Enquiries
                          </span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-0">
                            24-48 hours
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Urgent Issues</span>
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-0">
                            4-8 hours
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Technical Support
                          </span>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                            12-24 hours
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Help Categories Card */}
                  <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-slate-200/50 dark:border-slate-700/50">
                      <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-500" />
                        Common Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <p>Account setup and verification process</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                          <p>Product listing and management guidelines</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <p>Payment processing and commission structure</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                          <p>Order fulfillment and shipping requirements</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p>Platform policies and compliance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my-enquiries" className="p-8 space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search enquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 h-12 bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Enquiries List */}
              <div className="space-y-4">
                {filteredEnquiries.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl">
                    <CardContent className="p-12 text-center">
                      <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                        No enquiries found
                      </h3>
                      <p className="text-slate-500 dark:text-slate-500">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "You haven't submitted any enquiries yet"}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredEnquiries.map((enquiry) => {
                    const StatusIcon = statusConfig[enquiry.status].icon
                    const priorityConfig = priorities.find((p) => p.value === enquiry.priority)

                    return (
                      <Card
                        key={enquiry.id}
                        className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                                  {enquiry.subject}
                                </h3>
                                <Badge className="text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0">
                                  {enquiry.id}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mb-3">
                                <Badge className={`${statusConfig[enquiry.status].color} border-0 text-xs`}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace("-", " ")}
                                </Badge>
                                <Badge className={`${priorityConfig?.color} border-0 text-xs`}>
                                  {priorityConfig?.label}
                                </Badge>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  {categories.find((c) => c.value === enquiry.category)?.label}
                                </span>
                              </div>
                              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-3">
                                {enquiry.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Created: {formatDate(enquiry.createdAt)}
                                </div>
                                {enquiry.updatedAt !== enquiry.createdAt && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Updated: {formatDate(enquiry.updatedAt)}
                                  </div>
                                )}
                                {enquiry.adminName && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {enquiry.adminName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="ml-4 bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                                  onClick={() => setSelectedEnquiry(enquiry)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-0 rounded-3xl">
                                <DialogHeader className="pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
                                  <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-blue-500" />
                                    Enquiry Details
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedEnquiry && (
                                  <div className="space-y-6 pt-6">
                                    {/* Enquiry Header */}
                                    <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                                      <div className="flex items-start justify-between mb-4">
                                        <div>
                                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                            {selectedEnquiry.subject}
                                          </h3>
                                          <div className="flex items-center gap-3">
                                            <Badge className="text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0">
                                              {selectedEnquiry.id}
                                            </Badge>
                                            <Badge
                                              className={`${statusConfig[selectedEnquiry.status].color} border-0 text-xs`}
                                            >
                                              <StatusIcon className="w-3 h-3 mr-1" />
                                              {selectedEnquiry.status.charAt(0).toUpperCase() +
                                                selectedEnquiry.status.slice(1).replace("-", " ")}
                                            </Badge>
                                            <Badge
                                              className={`${priorities.find((p) => p.value === selectedEnquiry.priority)?.color} border-0 text-xs`}
                                            >
                                              {priorities.find((p) => p.value === selectedEnquiry.priority)?.label}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                                            Category:
                                          </span>
                                          <p className="text-slate-800 dark:text-slate-200 mt-1">
                                            {categories.find((c) => c.value === selectedEnquiry.category)?.label}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                                            Created:
                                          </span>
                                          <p className="text-slate-800 dark:text-slate-200 mt-1">
                                            {formatDate(selectedEnquiry.createdAt)}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                                            Last Updated:
                                          </span>
                                          <p className="text-slate-800 dark:text-slate-200 mt-1">
                                            {formatDate(selectedEnquiry.updatedAt)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Original Message */}
                                    <div className="space-y-4">
                                      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-blue-500" />
                                        Your Message
                                      </h4>
                                      <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                          {selectedEnquiry.message}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Admin Response */}
                                    {selectedEnquiry.response && (
                                      <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                          <User className="w-5 h-5 text-green-500" />
                                          Admin Response
                                          {selectedEnquiry.adminName && (
                                            <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                                              by {selectedEnquiry.adminName}
                                            </span>
                                          )}
                                        </h4>
                                        <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50">
                                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {selectedEnquiry.response}
                                          </p>
                                        </div>

                                        {/* Rating */}
                                        {selectedEnquiry.rating && (
                                          <div className="flex items-center gap-3 pt-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                              Your Rating:
                                            </span>
                                            <div className="flex items-center gap-1">
                                              {renderStars(selectedEnquiry.rating)}
                                            </div>
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                              ({selectedEnquiry.rating}/5)
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                                      {selectedEnquiry.status === "resolved" && !selectedEnquiry.rating && (
                                        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl">
                                          <Star className="w-4 h-4 mr-2" />
                                          Rate Response
                                        </Button>
                                      )}
                                      {selectedEnquiry.status !== "closed" && (
                                        <Button
                                          variant="outline"
                                          className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl bg-transparent"
                                        >
                                          <MessageCircle className="w-4 h-4 mr-2" />
                                          Follow Up
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>

                          {/* Response Preview */}
                          {enquiry.response && (
                            <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                                  Admin Response
                                </span>
                                {enquiry.adminName && (
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    by {enquiry.adminName}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                {enquiry.response}
                              </p>
                              {enquiry.rating && (
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-slate-500 dark:text-slate-400">Your rating:</span>
                                  <div className="flex items-center gap-1">{renderStars(enquiry.rating)}</div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
