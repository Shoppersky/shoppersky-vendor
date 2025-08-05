"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  QrCode, 
  Search, 
  Filter, 
  MoreHorizontal,
  Users,
  DollarSign,
  TrendingUp,
  Copy,
  Mail,
  Link,
  Plus
} from "lucide-react";

interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  commissionRate: string;
  status: "Active" | "Inactive" | "Pending";
  dateJoined: string;
  totalSales: number;
  totalCommission: number;
  referralLink: string;
  clickCount: number;
  conversionRate: number;
  lastActivity: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
}

export default function AffiliatesPage() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Affiliate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: "AFF001",
      name: "Jane Affiliate",
      email: "jane@affiliate.com",
      phone: "+1 (555) 123-4567",
      commissionRate: "10%",
      status: "Active",
      dateJoined: "2024-01-15",
      totalSales: 12500,
      totalCommission: 1250,
      referralLink: "https://yourapp.com/ref/jane001",
      clickCount: 245,
      conversionRate: 8.5,
      lastActivity: "2024-03-15",
      tier: "Gold"
    },
    {
      id: "AFF002",
      name: "Raj Partner",
      email: "raj@partner.com",
      phone: "+1 (555) 987-6543",
      commissionRate: "15%",
      status: "Active",
      dateJoined: "2024-02-10",
      totalSales: 8900,
      totalCommission: 1335,
      referralLink: "https://yourapp.com/ref/raj002",
      clickCount: 189,
      conversionRate: 12.3,
      lastActivity: "2024-03-14",
      tier: "Silver"
    },
    {
      id: "AFF003",
      name: "Sarah Marketing",
      email: "sarah@marketing.com",
      commissionRate: "12%",
      status: "Pending",
      dateJoined: "2024-03-01",
      totalSales: 3200,
      totalCommission: 384,
      referralLink: "https://yourapp.com/ref/sarah003",
      clickCount: 67,
      conversionRate: 5.2,
      lastActivity: "2024-03-13",
      tier: "Bronze"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    commissionRate: "",
    status: "Active",
    tier: "Bronze"
  });

  // Filtered affiliates based on search and filters
  const filteredAffiliates = useMemo(() => {
    return affiliates.filter(affiliate => {
      const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           affiliate.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || affiliate.status === statusFilter;
      const matchesTier = tierFilter === "all" || affiliate.tier === tierFilter;
      
      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [affiliates, searchTerm, statusFilter, tierFilter]);

  // Summary statistics
  const summary = useMemo(() => {
    const active = affiliates.filter(a => a.status === "Active").length;
    const totalCommission = affiliates.reduce((sum, a) => sum + a.totalCommission, 0);
    const totalSales = affiliates.reduce((sum, a) => sum + a.totalSales, 0);
    const avgConversion = affiliates.reduce((sum, a) => sum + a.conversionRate, 0) / affiliates.length;
    
    return {
      total: affiliates.length,
      active,
      totalCommission,
      totalSales,
      avgConversion: avgConversion || 0
    };
  }, [affiliates]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAffiliate = () => {
    const newAffiliate: Affiliate = {
      id: `AFF${(affiliates.length + 1).toString().padStart(3, "0")}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      commissionRate: formData.commissionRate,
      status: formData.status as "Active" | "Inactive" | "Pending",
      dateJoined: new Date().toISOString().split("T")[0],
      totalSales: 0,
      totalCommission: 0,
      referralLink: `https://yourapp.com/ref/${formData.name.toLowerCase().replace(/ /g, "")}`,
      clickCount: 0,
      conversionRate: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      tier: formData.tier as "Bronze" | "Silver" | "Gold" | "Platinum"
    };
    setAffiliates((prev) => [...prev, newAffiliate]);
    toast.success("Affiliate added successfully");
    setFormData({ name: "", email: "", phone: "", commissionRate: "", status: "Active", tier: "Bronze" });
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setAffiliates((prev) => prev.filter((a) => a.id !== id));
    toast.success("Affiliate deleted");
    if (selected?.id === id) setSelected(null);
  };

  const handleEdit = (affiliate: Affiliate) => {
    setFormData({
      name: affiliate.name,
      email: affiliate.email,
      phone: affiliate.phone || "",
      commissionRate: affiliate.commissionRate,
      status: affiliate.status,
      tier: affiliate.tier
    });
    setSelected(affiliate);
    setEditOpen(true);
  };

  const handleUpdateAffiliate = () => {
    if (!selected) return;
    
    setAffiliates((prev) => prev.map(affiliate => 
      affiliate.id === selected.id 
        ? {
            ...affiliate,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            commissionRate: formData.commissionRate,
            status: formData.status as "Active" | "Inactive" | "Pending",
            tier: formData.tier as "Bronze" | "Silver" | "Gold" | "Platinum"
          }
        : affiliate
    ));
    
    toast.success("Affiliate updated successfully");
    setFormData({ name: "", email: "", phone: "", commissionRate: "", status: "Active", tier: "Bronze" });
    setEditOpen(false);
    setSelected(null);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const exportToCSV = () => {
    const csvRows = [
      ["ID", "Name", "Email", "Phone", "Commission", "Status", "Tier", "Date Joined", "Total Sales", "Total Commission", "Click Count", "Conversion Rate"],
      ...filteredAffiliates.map((a) => [
        a.id, a.name, a.email, a.phone || "", a.commissionRate, a.status, a.tier, 
        a.dateJoined, a.totalSales, a.totalCommission, a.clickCount, a.conversionRate
      ]),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "affiliates.csv");
    document.body.appendChild(link);
    link.click();
    toast.success("CSV downloaded");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze": return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/20 dark:text-amber-300";
      case "Silver": return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300";
      case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "Platinum": return "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-700/30">
      {/* Enhanced Header with Glass Effects */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-white/10 hover:bg-white/15 dark:hover:bg-slate-900/25 transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Affiliate Management
          </h1>
          <p className="text-foreground/70 mt-1">Manage your affiliate partners and track performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV} className="backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-800 hover:to-blue-800 text-white shadow-lg backdrop-blur-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Affiliate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl">
              <DialogHeader>
                <DialogTitle>Add New Affiliate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" placeholder="Enter email address" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate</Label>
                  <Input id="commissionRate" name="commissionRate" placeholder="e.g. 10%" value={formData.commissionRate} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tier">Tier</Label>
                    <Select value={formData.tier} onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4 gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancel</Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-800 hover:to-blue-800 text-white" onClick={handleAddAffiliate}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards with Glass Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 dark:hover:bg-slate-900/25">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/70">Total Affiliates</p>
                <p className="text-3xl font-bold text-foreground">{summary.total}</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <Users className="w-6 h-6 text-foreground/70" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 dark:hover:bg-slate-900/25">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/70">Active</p>
                <p className="text-3xl font-bold text-foreground">{summary.active}</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 dark:hover:bg-slate-900/25">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/70">Total Sales</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(summary.totalSales)}</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <DollarSign className="w-6 h-6 text-foreground/70" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 dark:hover:bg-slate-900/25">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/70">Total Commission</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(summary.totalCommission)}</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <DollarSign className="w-6 h-6 text-foreground/70" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/15 dark:hover:bg-slate-900/25">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/70">Avg Conversion</p>
                <p className="text-2xl font-bold text-foreground">{summary.avgConversion.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20">
                <TrendingUp className="w-6 h-6 text-foreground/70" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Filters and Search with Glass Effects */}
      <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-slate-900/25">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
                <Input
                  placeholder="Search affiliates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-32 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Table with Glass Effects */}
      <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-slate-900/25 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-slate-800/10 dark:to-transparent"></div>
        <div className="relative z-10">
          <CardContent className="p-6">
            <div className="rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-slate-800/10 shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border-b border-white/20 dark:border-white/10">
                    <TableHead className="font-semibold">Affiliate</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Performance</TableHead>
                    <TableHead className="font-semibold">Status & Tier</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAffiliates.map((aff) => (
                    <TableRow 
                      key={aff.id} 
                      className="hover:bg-white/10 dark:hover:bg-slate-800/20 transition-all duration-300 border-b border-white/10 dark:border-white/5"
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{aff.name}</span>
                          <span className="text-sm text-foreground/60 font-mono">{aff.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-foreground/80">{aff.email}</span>
                          {aff.phone && (
                            <span className="text-sm text-foreground/60">{aff.phone}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{formatCurrency(aff.totalSales)}</span>
                            <span className="text-xs text-foreground/60">sales</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{formatCurrency(aff.totalCommission)}</span>
                            <span className="text-xs text-foreground/60">commission</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{aff.conversionRate.toFixed(1)}%</span>
                            <span className="text-xs text-foreground/60">conversion</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-2">
                          <Badge variant="outline" className={
                            aff.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900"
                              : aff.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-900"
                              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900"
                          }>
                            {aff.status}
                          </Badge>
                          <Badge variant="outline" className={getTierColor(aff.tier)}>
                            {aff.tier}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 dark:hover:bg-slate-700/20">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10">
                            <DropdownMenuItem onClick={() => setSelected(aff)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(aff)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => copyToClipboard(aff.referralLink, "Referral link")}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(aff.email, "Email")}>
                              <Mail className="mr-2 h-4 w-4" />
                              Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(aff.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Enhanced Detail View */}
      {selected && (
        <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/15 dark:hover:bg-slate-900/25 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-slate-800/10 dark:to-transparent"></div>
          <div className="relative z-10">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Affiliate Details</h2>
                  <p className="text-foreground/70">Complete information for {selected.name}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setSelected(null)} className="hover:bg-white/10 dark:hover:bg-slate-700/20">
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="space-y-3 bg-white/5 dark:bg-slate-800/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Name:</span>
                      <span className="font-medium">{selected.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">ID:</span>
                      <span className="font-mono text-sm">{selected.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Email:</span>
                      <span className="text-sm">{selected.email}</span>
                    </div>
                    {selected.phone && (
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Phone:</span>
                        <span className="text-sm">{selected.phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Date Joined:</span>
                      <span className="text-sm">{new Date(selected.dateJoined).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Last Activity:</span>
                      <span className="text-sm">{new Date(selected.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-3 bg-white/5 dark:bg-slate-800/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Commission Rate:</span>
                      <span className="font-medium">{selected.commissionRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Total Sales:</span>
                      <span className="font-medium">{formatCurrency(selected.totalSales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Total Commission:</span>
                      <span className="font-medium">{formatCurrency(selected.totalCommission)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Click Count:</span>
                      <span className="font-medium">{selected.clickCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Conversion Rate:</span>
                      <span className="font-medium">{selected.conversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Status:</span>
                      <Badge variant="outline" className={
                        selected.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300"
                          : selected.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
                          : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300"
                      }>
                        {selected.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Tier:</span>
                      <Badge variant="outline" className={getTierColor(selected.tier)}>
                        {selected.tier}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Link Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  Referral Information
                </h3>
                <div className="bg-white/5 dark:bg-slate-800/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-foreground/70">Referral Link:</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/10 dark:bg-slate-800/20 rounded-xl border border-white/20 dark:border-white/10">
                    <span className="flex-1 text-sm font-mono truncate">{selected.referralLink}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => copyToClipboard(selected.referralLink, "Referral link")}
                      className="backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10"
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-white/20 dark:border-white/10">
                <Button 
                  onClick={() => handleEdit(selected)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-800 hover:to-purple-800 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Affiliate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => copyToClipboard(selected.email, "Email")}
                  className="backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleDelete(selected.id)}
                  className="text-red-600 dark:text-red-400 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border-white/20 dark:border-white/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit Affiliate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-commissionRate">Commission Rate</Label>
              <Input id="edit-commissionRate" name="commissionRate" value={formData.commissionRate} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tier">Tier</Label>
                <Select value={formData.tier} onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-800 hover:to-blue-800 text-white" onClick={handleUpdateAffiliate}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
