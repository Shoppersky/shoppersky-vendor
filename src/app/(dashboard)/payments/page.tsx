"use client";

import { useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Download, 
  Search, 
  Wallet, 
  Banknote , 
  Eye,
  RefreshCw,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Plus,
  Edit} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  paymentMethod: "Card" | "UPI" | "Wallet" | "Net Banking";
  paymentGateway: "Stripe" | "Razorpay" | "PayPal";
  status: "Success" | "Failed" | "Pending" | "Refunded";
  date: string;
  time: string;
  invoiceUrl?: string;
}

interface WithdrawalHistory {
  id: string;
  amount: number;
  method: "Bank" | "UPI";
  status: "Processing" | "Completed" | "Failed";
  date: string;
  reference: string;
}

interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolder: string;
  bankName: string;
}

interface PayoutSettings {
  autoWithdraw: boolean;
  frequency: "weekly" | "monthly";
  minimumAmount: number;
  kycVerified: boolean;
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [availableBalance] = useState(45750.50);
  const [autoWithdraw, setAutoWithdraw] = useState(false);
  const [withdrawFrequency, setWithdrawFrequency] = useState("monthly");

  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      orderId: "ORD-2024-001",
      customer: "Mohanth Sai",
      amount: 1299.99,
      paymentMethod: "UPI",
      paymentGateway: "Razorpay",
      status: "Success",
      date: "2024-01-15",
      time: "14:30",
      invoiceUrl: "#"
    },
    {
      id: "TXN002",
      orderId: "ORD-2024-002",
      customer: "John Doe",
      amount: 899.50,
      paymentMethod: "Card",
      paymentGateway: "Stripe",
      status: "Success",
      date: "2024-01-15",
      time: "16:45",
      invoiceUrl: "#"
    },
    {
      id: "TXN003",
      orderId: "ORD-2024-003",
      customer: "Sarah Wilson",
      amount: 2499.00,
      paymentMethod: "Net Banking",
      paymentGateway: "Razorpay",
      status: "Pending",
      date: "2024-01-16",
      time: "09:15",
    },
    {
      id: "TXN004",
      orderId: "ORD-2024-004",
      customer: "Mike Johnson",
      amount: 599.99,
      paymentMethod: "Wallet",
      paymentGateway: "PayPal",
      status: "Failed",
      date: "2024-01-16",
      time: "11:20",
    },
    {
      id: "TXN005",
      orderId: "ORD-2024-005",
      customer: "Emily Davis",
      amount: 1799.00,
      paymentMethod: "UPI",
      paymentGateway: "Razorpay",
      status: "Refunded",
      date: "2024-01-14",
      time: "13:10",
    }
  ]);

  const [withdrawalHistory] = useState<WithdrawalHistory[]>([
    {
      id: "WD001",
      amount: 15000,
      method: "Bank",
      status: "Completed",
      date: "2024-01-10",
      reference: "REF123456789"
    },
    {
      id: "WD002",
      amount: 8500,
      method: "UPI",
      status: "Processing",
      date: "2024-01-14",
      reference: "REF987654321"
    }
  ]);

  const [bankDetails] = useState<BankDetails>({
    accountNumber: "****1234",
    ifscCode: "HDFC0001234",
    accountHolder: "John Doe",
    bankName: "HDFC Bank"
  });

  const [payoutSettings, setPayoutSettings] = useState<PayoutSettings>({
    autoWithdraw: false,
    frequency: "monthly",
    minimumAmount: 1000,
    kycVerified: true
  });

  // Calculate earnings
  const todayEarnings = transactions
    .filter(t => t.date === "2024-01-16" && t.status === "Success")
    .reduce((sum, t) => sum + t.amount, 0);

  const weekEarnings = transactions
    .filter(t => t.status === "Success")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthEarnings = transactions
    .filter(t => t.status === "Success")
    .reduce((sum, t) => sum + t.amount, 0);

  const completedOrders = transactions.filter(t => t.status === "Success").length;

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    const matchesMethod = filterMethod === "all" || transaction.paymentMethod === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleWithdraw = () => {
    toast.success("Withdrawal request submitted successfully!");
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting transactions as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-2 p-2">
            Payment Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive payment tracking and management system</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Payment Overview Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{monthEarnings.toLocaleString()}</p>
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +12.5% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today&apos;s Earnings</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{todayEarnings.toLocaleString()}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +8.2% from yesterday
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedOrders}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {Math.round((completedOrders / transactions.length) * 100)}% success rate
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Balance</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{availableBalance.toLocaleString()}</p>
                      <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1">
                        <Wallet className="w-3 h-3 mr-1" />
                        Ready to withdraw
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Wallet className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Gateway Usage */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                  Payment Gateway Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Razorpay</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Primary Gateway</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Stripe</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">International</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-105 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <CreditCard className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">PayPal</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Global Payments</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Backup</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Recent Transactions
                  </CardTitle>
                  <Button variant="outline" size="sm" className="hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 hover:scale-[1.02] cursor-pointer group">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                          transaction.status === "Success" ? "bg-green-100 dark:bg-green-900/30" :
                          transaction.status === "Pending" ? "bg-yellow-100 dark:bg-yellow-900/30" :
                          transaction.status === "Failed" ? "bg-red-100 dark:bg-red-900/30" :
                          "bg-gray-100 dark:bg-gray-900/30"
                        }`}>
                          {transaction.status === "Success" && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
                          {transaction.status === "Pending" && <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                          {transaction.status === "Failed" && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
                          {transaction.status === "Refunded" && <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{transaction.customer}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.orderId} • {transaction.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">₹{transaction.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            {/* Search and Filter Controls */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.01]">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-1 gap-4 items-center w-full">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by Order ID or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/20">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Success">Success</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="Refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterMethod} onValueChange={setFilterMethod}>
                      <SelectTrigger className="w-40 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-slate-600/30 transition-all duration-300 hover:shadow-md hover:shadow-purple-500/20">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Wallet">Wallet</SelectItem>
                        <SelectItem value="Net Banking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExport("csv")} className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("excel")} className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
                      <Download className="w-4 h-4 mr-2" />
                      Export Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  All Transactions ({filteredTransactions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 dark:border-slate-700/20">
                      <TableHead className="text-gray-700 dark:text-gray-300">Order ID</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Customer</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Method</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Gateway</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Date & Time</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="border-white/20 dark:border-slate-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors">
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          {transaction.orderId}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {transaction.customer}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900 dark:text-white">
                          ₹{transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {transaction.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            {transaction.paymentGateway}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            transaction.status === "Success" ? "default" :
                            transaction.status === "Pending" ? "secondary" :
                            transaction.status === "Failed" ? "destructive" :
                            "outline"
                          }>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          <div>
                            <p>{transaction.date}</p>
                            <p className="text-xs">{transaction.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {transaction.invoiceUrl && (
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Withdraw Earnings */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Withdraw Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Balance</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{availableBalance.toLocaleString()}</p>
                      </div>
                      <Wallet className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Minimum withdrawal amount: ₹{payoutSettings.minimumAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Withdrawal Amount
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Withdrawal Method
                      </label>
                      <Select>
                        <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleWithdraw} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Wallet className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Details */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                      Bank Details
                    </CardTitle>
                    <Button size="sm" variant="outline" className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <Banknote className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{bankDetails.bankName}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Account Holder:</span>
                        <span className="text-gray-900 dark:text-white">{bankDetails.accountHolder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                        <span className="text-gray-900 dark:text-white">{bankDetails.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">IFSC Code:</span>
                        <span className="text-gray-900 dark:text-white">{bankDetails.ifscCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">KYC Status</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Identity verification</p>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Verified
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add UPI ID
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Withdrawal History */}
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                  Withdrawal History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 dark:border-slate-700/20">
                      <TableHead className="text-gray-700 dark:text-gray-300">Amount</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Method</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map((withdrawal) => (
                      <TableRow key={withdrawal.id} className="border-white/20 dark:border-slate-700/20">
                        <TableCell className="font-semibold text-gray-900 dark:text-white">
                          ₹{withdrawal.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {withdrawal.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            withdrawal.status === "Completed" ? "default" :
                            withdrawal.status === "Processing" ? "secondary" :
                            "destructive"
                          }>
                            {withdrawal.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {withdrawal.date}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {withdrawal.reference}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payout Settings */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Payout Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Auto-withdraw</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Automatically withdraw earnings</p>
                    </div>
                    <Switch
                      checked={autoWithdraw}
                      onCheckedChange={setAutoWithdraw}
                    />
                  </div>

                  {autoWithdraw && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Frequency
                        </label>
                        <Select value={withdrawFrequency} onValueChange={setWithdrawFrequency}>
                          <SelectTrigger className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Minimum Amount
                        </label>
                        <Input
                          type="number"
                          value={payoutSettings.minimumAmount}
                          className="bg-white/70 dark:bg-slate-800/70 border-white/30 dark:border-slate-600/30"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Payment Received</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notify when payment is received</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Payout Sent</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notify when payout is sent</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Failed Payments</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notify for failed payments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Earnings Chart Placeholder */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Earnings Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">Earnings chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Distribution */}
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">Payment methods chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Order Value</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">₹1,349</p>
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +5.2% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">96.8%</p>
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +2.1% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Refund Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">2.1%</p>
                      <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                        -0.5% from last month
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <RefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Refunds Tab */}
          <TabsContent value="refunds" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                  Refund Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="transition-all duration-300 hover:scale-110">
                    <RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No refunds to display</h3>
                  <p className="text-gray-600 dark:text-gray-400">Refund requests and history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
