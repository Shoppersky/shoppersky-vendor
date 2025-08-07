"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { 
  Search, 
  Download, 
  Eye, 
  Edit, 
  ChevronUp, 
  ChevronDown,
  Calendar as CalendarIcon,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  Copy,
  Mail,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Bell,
  ExternalLink,
  MessageSquare,
  Calendar as CalendarDays,
  BarChart3,
  Activity
} from "lucide-react";
import { format, isToday, isYesterday, isThisWeek, isThisMonth, parseISO } from "date-fns";
import { toast } from "sonner";

// Enhanced interfaces with better type safety
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  sku?: string;
  category?: string;
}

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: "Delivered" | "Pending" | "Cancelled" | "Processing" | "Shipped";
  priority: "Low" | "Medium" | "High" | "Urgent";
  date: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  customerRating?: number;
  refundAmount?: string;
  shippingCost?: string;
  discount?: string;
  taxAmount?: string;
}

type SortField = 'customer' | 'amount' | 'status' | 'date' | 'priority';
type SortDirection = 'asc' | 'desc';

type FilterPreset = 'all' | 'today' | 'yesterday' | 'thisWeek' | 'thisMonth' | 'highValue' | 'urgent';

interface OrderFilters {
  search: string;
  status: string;
  priority: string;
  dateRange: { from?: Date; to?: Date };
  amountRange: { min?: number; max?: number };
  paymentMethod: string;
  preset: FilterPreset;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function OrdersPage() {
  // Enhanced sample data with more realistic information
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "O001",
      customer: "Mohanth Sai",
      amount: "₹1299",
      status: "Delivered",
      priority: "Medium",
      date: "2025-01-10",
      email: "mohanth@example.com",
      phone: "+91 9876543210",
      address: "123 Main St, Hyderabad, Telangana",
      items: [
        { id: "I001", name: "Premium Widget", quantity: 2, price: "₹649.50", sku: "PW001", category: "Electronics" }
      ],
      paymentMethod: "Credit Card",
      trackingNumber: "TRK001234567",
      notes: "Customer requested express delivery",
      estimatedDelivery: "2025-01-12",
      createdAt: "2025-01-10T10:30:00Z",
      updatedAt: "2025-01-10T14:45:00Z",
      tags: ["VIP", "Express"],
      customerRating: 5,
      shippingCost: "₹99",
      taxAmount: "₹156"
    },
    {
      id: "O002",
      customer: "John Doe",
      amount: "₹499",
      status: "Processing",
      priority: "Low",
      date: "2025-01-12",
      email: "john@example.com",
      phone: "+91 9876543211",
      address: "456 Oak Ave, Mumbai, Maharashtra",
      items: [
        { id: "I002", name: "Basic Widget", quantity: 1, price: "₹499", sku: "BW001", category: "Accessories" }
      ],
      paymentMethod: "UPI",
      createdAt: "2025-01-12T09:15:00Z",
      updatedAt: "2025-01-12T09:15:00Z",
      shippingCost: "₹49",
      taxAmount: "₹60"
    },
    {
      id: "O003",
      customer: "Alice Smith",
      amount: "₹2499",
      status: "Shipped",
      priority: "High",
      date: "2025-01-08",
      email: "alice@example.com",
      phone: "+91 9876543212",
      address: "789 Pine St, Bangalore, Karnataka",
      items: [
        { id: "I003", name: "Deluxe Widget", quantity: 1, price: "₹1999", sku: "DW001", category: "Premium" },
        { id: "I004", name: "Widget Accessory", quantity: 1, price: "₹500", sku: "WA001", category: "Accessories" }
      ],
      paymentMethod: "Debit Card",
      trackingNumber: "TRK001234568",
      estimatedDelivery: "2025-01-15",
      createdAt: "2025-01-08T11:20:00Z",
      updatedAt: "2025-01-09T16:30:00Z",
      tags: ["Bulk Order"],
      customerRating: 4,
      shippingCost: "₹149",
      discount: "₹200",
      taxAmount: "₹300"
    },
    {
      id: "O004",
      customer: "Bob Johnson",
      amount: "₹799",
      status: "Cancelled",
      priority: "Low",
      date: "2025-01-11",
      email: "bob@example.com",
      phone: "+91 9876543213",
      address: "321 Elm St, Chennai, Tamil Nadu",
      items: [
        { id: "I005", name: "Standard Widget", quantity: 1, price: "₹799", sku: "SW001", category: "Standard" }
      ],
      paymentMethod: "Net Banking",
      notes: "Customer requested cancellation due to delayed delivery",
      createdAt: "2025-01-11T13:45:00Z",
      updatedAt: "2025-01-11T15:20:00Z",
      refundAmount: "₹799",
      shippingCost: "₹0",
      taxAmount: "₹96"
    },
    {
      id: "O005",
      customer: "Carol Davis",
      amount: "₹1899",
      status: "Pending",
      priority: "Urgent",
      date: "2025-01-13",
      email: "carol@example.com",
      phone: "+91 9876543214",
      address: "654 Maple Dr, Pune, Maharashtra",
      items: [
        { id: "I006", name: "Pro Widget", quantity: 1, price: "₹1899", sku: "PRW001", category: "Professional" }
      ],
      paymentMethod: "Credit Card",
      notes: "Rush order - customer needs by tomorrow",
      estimatedDelivery: "2025-01-14",
      createdAt: "2025-01-13T08:00:00Z",
      updatedAt: "2025-01-13T08:00:00Z",
      tags: ["Rush", "Same Day"],
      shippingCost: "₹199",
      taxAmount: "₹228"
    },
    // Additional sample orders for better testing
    {
      id: "O006",
      customer: "David Wilson",
      amount: "₹3299",
      status: "Delivered",
      priority: "High",
      date: "2025-01-09",
      email: "david@example.com",
      phone: "+91 9876543215",
      address: "987 Cedar Ln, Delhi, Delhi",
      items: [
        { id: "I007", name: "Enterprise Widget", quantity: 1, price: "₹2999", sku: "EW001", category: "Enterprise" },
        { id: "I008", name: "Support Package", quantity: 1, price: "₹300", sku: "SP001", category: "Services" }
      ],
      paymentMethod: "Bank Transfer",
      trackingNumber: "TRK001234569",
      estimatedDelivery: "2025-01-11",
      createdAt: "2025-01-09T14:30:00Z",
      updatedAt: "2025-01-11T10:15:00Z",
      tags: ["Enterprise", "Support"],
      customerRating: 5,
      shippingCost: "₹0",
      taxAmount: "₹396"
    }
  ]);

  // Enhanced state management with better organization
  const [filters, setFilters] = useState<OrderFilters>({
    search: "",
    status: "all",
    priority: "all",
    dateRange: {},
    amountRange: {},
    paymentMethod: "all",
    preset: "all"
  });
  
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: "",
    type: "info"
  });
  
// Performance optimization with refs
const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
const tableRef = useRef<HTMLDivElement>(null);
;
  
  // Advanced filter presets
  const filterPresets = {
    all: () => true,
    today: (order: Order) => isToday(parseISO(order.date)),
    yesterday: (order: Order) => isYesterday(parseISO(order.date)),
    thisWeek: (order: Order) => isThisWeek(parseISO(order.date)),
    thisMonth: (order: Order) => isThisMonth(parseISO(order.date)),
    highValue: (order: Order) => parseFloat(order.amount.replace('₹', '').replace(',', '')) > 2000,
    urgent: (order: Order) => order.priority === "Urgent"
  };

  // Enhanced filtering and sorting with performance optimization
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      // Search filter with enhanced matching
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search || 
        order.customer.toLowerCase().includes(searchLower) ||
        order.id.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.phone.includes(filters.search) ||
        order.items.some(item => item.name.toLowerCase().includes(searchLower)) ||
        (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchLower));
      
      // Status filter
      const matchesStatus = filters.status === "all" || order.status === filters.status;
      
      // Priority filter
      const matchesPriority = filters.priority === "all" || order.priority === filters.priority;
      
      // Payment method filter
      const matchesPaymentMethod = filters.paymentMethod === "all" || order.paymentMethod === filters.paymentMethod;
      
      // Date range filter
      const orderDate = parseISO(order.date);
      const matchesDateRange = 
        (!filters.dateRange.from || orderDate >= filters.dateRange.from) &&
        (!filters.dateRange.to || orderDate <= filters.dateRange.to);
      
      // Amount range filter
      const orderAmount = parseFloat(order.amount.replace('₹', '').replace(',', ''));
      const matchesAmountRange = 
        (!filters.amountRange.min || orderAmount >= filters.amountRange.min) &&
        (!filters.amountRange.max || orderAmount <= filters.amountRange.max);
      
      // Preset filter
      const matchesPreset = filters.preset === "all" || filterPresets[filters.preset](order);
      
      return matchesSearch && matchesStatus && matchesPriority && 
             matchesPaymentMethod && matchesDateRange && matchesAmountRange && matchesPreset;
    });

    // Enhanced sorting with multiple field support
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      switch (sortField) {
        case 'amount':
          aValue = parseFloat(aValue.replace('₹', '').replace(',', ''));
          bValue = parseFloat(bValue.replace('₹', '').replace(',', ''));
          break;
        case 'date':
          aValue = parseISO(aValue);
          bValue = parseISO(bValue);
          break;
        case 'priority':
          const priorityOrder = { "Urgent": 4, "High": 3, "Medium": 2, "Low": 1 };
          aValue = priorityOrder[aValue as keyof typeof priorityOrder];
          bValue = priorityOrder[bValue as keyof typeof priorityOrder];
          break;
        case 'status':
          const statusOrder = { "Delivered": 5, "Shipped": 4, "Processing": 3, "Pending": 2, "Cancelled": 1 };
          aValue = statusOrder[aValue as keyof typeof statusOrder];
          bValue = statusOrder[bValue as keyof typeof statusOrder];
          break;
        default:
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [orders, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const paginatedOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Enhanced summary calculations with more metrics
  const summary = useMemo(() => {
    const delivered = filteredAndSortedOrders.filter(o => o.status === "Delivered").length;
    const pending = filteredAndSortedOrders.filter(o => o.status === "Pending").length;
    const processing = filteredAndSortedOrders.filter(o => o.status === "Processing").length;
    const shipped = filteredAndSortedOrders.filter(o => o.status === "Shipped").length;
    const cancelled = filteredAndSortedOrders.filter(o => o.status === "Cancelled").length;
    const urgent = filteredAndSortedOrders.filter(o => o.priority === "Urgent").length;
    
    const totalRevenue = filteredAndSortedOrders
      .filter(o => o.status === "Delivered")
      .reduce((sum, o) => sum + parseFloat(o.amount.replace('₹', '').replace(',', '')), 0);
    
    const pendingRevenue = filteredAndSortedOrders
      .filter(o => ["Pending", "Processing", "Shipped"].includes(o.status))
      .reduce((sum, o) => sum + parseFloat(o.amount.replace('₹', '').replace(',', '')), 0);
    
    const averageOrderValue = filteredAndSortedOrders.length > 0 
      ? filteredAndSortedOrders.reduce((sum, o) => sum + parseFloat(o.amount.replace('₹', '').replace(',', '')), 0) / filteredAndSortedOrders.length
      : 0;
    
    const totalCustomers = new Set(filteredAndSortedOrders.map(o => o.customer)).size;
    
    // Calculate trends (mock data for demo)
    const previousPeriodRevenue = totalRevenue * 0.85; // Simulated previous period
    const revenueTrend = totalRevenue > previousPeriodRevenue ? 'up' : 'down';
    const revenueChange = Math.abs(((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100);
    
    return { 
      delivered, 
      pending, 
      processing,
      shipped,
      cancelled, 
      urgent,
      totalRevenue, 
      pendingRevenue,
      averageOrderValue,
      totalCustomers,
      revenueTrend,
      revenueChange
    };
  }, [filteredAndSortedOrders]);

  // Enhanced handlers with better UX and error handling
  const showNotification = useCallback((message: string, type: NotificationState['type'] = 'info') => {
    setNotification({ show: true, message, type });
    toast[type](message);
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  }, []);
  const summaryCardColorClasses = {
  delivered: "hover:border-green-200/50 dark:hover:border-green-800/50 hover:shadow-green-500/10",
  processing: "hover:border-blue-200/50 dark:hover:border-blue-800/50 hover:shadow-blue-400/10",
  pending: "hover:border-yellow-200/50 dark:hover:border-yellow-800/50 hover:shadow-yellow-500/10",
  urgent: "hover:border-red-200/50 dark:hover:border-red-800/50 hover:shadow-red-500/10",
  revenue: "hover:border-indigo-200/50 dark:hover:border-indigo-800/50 hover:shadow-indigo-500/10",
  customers: "hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-purple-500/10"
};


  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  const handleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(order => order.id));
    }
  }, [selectedOrders.length, paginatedOrders]);

  const handleStatusUpdate = useCallback(async (orderId: string, newStatus: Order['status']) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
          : order
      ));
      
      showNotification(`Order ${orderId} status updated to ${newStatus}`, 'success');
    } catch (error) {
      showNotification('Failed to update order status', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const handleBulkStatusUpdate = useCallback(async (newStatus: Order['status']) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prev => prev.map(order => 
        selectedOrders.includes(order.id) 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
          : order
      ));
      
      showNotification(`${selectedOrders.length} orders updated to ${newStatus}`, 'success');
      setSelectedOrders([]);
    } catch (error) {
      showNotification('Failed to update orders', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrders, showNotification]);

  const handleBulkDelete = useCallback(async () => {
    if (!confirm(`Are you sure you want to delete ${selectedOrders.length} orders? This action cannot be undone.`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prev => prev.filter(order => !selectedOrders.includes(order.id)));
      showNotification(`${selectedOrders.length} orders deleted successfully`, 'success');
      setSelectedOrders([]);
    } catch (error) {
      showNotification('Failed to delete orders', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrders, showNotification]);

  const handleFilterChange = useCallback((key: keyof OrderFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const handlePresetFilter = useCallback((preset: FilterPreset) => {
    setFilters(prev => ({ ...prev, preset }));
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    // Debounce search for better performance
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      handleFilterChange('search', value);
    }, 300);
  }, [handleFilterChange]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: "",
      status: "all",
      priority: "all",
      dateRange: {},
      amountRange: {},
      paymentMethod: "all",
      preset: "all"
    });
    setCurrentPage(1);
    showNotification('Filters cleared', 'info');
  }, [showNotification]);

  const handleExportCSV = useCallback(async () => {
    try {
      setIsLoading(true);
      showNotification('Preparing export...', 'info');
      
      // Simulate processing time for large datasets
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const csvContent = [
        [
          'Order ID', 'Customer', 'Amount', 'Status', 'Priority', 'Date', 
          'Email', 'Phone', 'Payment Method', 'Tracking Number', 'Items Count',
          'Shipping Cost', 'Tax Amount', 'Notes'
        ],
        ...filteredAndSortedOrders.map(order => [
          order.id,
          order.customer,
          order.amount,
          order.status,
          order.priority,
          order.date,
          order.email,
          order.phone,
          order.paymentMethod,
          order.trackingNumber || 'N/A',
          order.items.length.toString(),
          order.shippingCost || '₹0',
          order.taxAmount || '₹0',
          order.notes || 'No notes'
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-export-${format(new Date(), 'yyyy-MM-dd-HHmm')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showNotification(`Exported ${filteredAndSortedOrders.length} orders successfully`, 'success');
    } catch (error) {
      showNotification('Failed to export orders', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [filteredAndSortedOrders, showNotification]);

  const handleExportJSON = useCallback(async () => {
    try {
      setIsLoading(true);
      showNotification('Preparing JSON export...', 'info');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const jsonContent = JSON.stringify(filteredAndSortedOrders, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-export-${format(new Date(), 'yyyy-MM-dd-HHmm')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showNotification(`Exported ${filteredAndSortedOrders.length} orders as JSON`, 'success');
    } catch (error) {
      showNotification('Failed to export JSON', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [filteredAndSortedOrders, showNotification]);

  const handleRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      showNotification('Refreshing orders...', 'info');
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would fetch fresh data from the API
      // For demo, we'll just update the timestamps
      setOrders(prev => prev.map(order => ({
        ...order,
        updatedAt: new Date().toISOString()
      })));
      
      showNotification('Orders refreshed successfully', 'success');
    } catch (error) {
      showNotification('Failed to refresh orders', 'error');
    } finally {
      setIsRefreshing(false);
    }
  }, [showNotification]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing && !isLoading) {
        // Auto-refresh every 5 minutes in a real app
        // handleRefresh();
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [isRefreshing, isLoading]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'r':
            event.preventDefault();
            handleRefresh();
            break;
          case 'e':
            event.preventDefault();
            handleExportCSV();
            break;
         case 'f':
  event.preventDefault();
  (document.querySelector('input[placeholder*="Search"]') as HTMLInputElement)?.focus();
  break;
const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

          case 'a':
            if (event.shiftKey) {
              event.preventDefault();
              handleSelectAll();
            }
            break;
        }
      }
      
      if (event.key === 'Escape') {
        setSelectedOrders([]);
        setIsDetailsOpen(false);
        setIsEditOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleRefresh, handleExportCSV, handleSelectAll]);

  // Enhanced helper components and functions
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1 text-foreground/70" /> : 
      <ChevronDown className="w-4 h-4 ml-1 text-foreground/70" />;
  };

  const StatusBadge = ({ status, className = "" }: { status: Order['status'], className?: string }) => {
    const statusConfig = {
      "Delivered": { icon: CheckCircle },
      "Shipped": { icon: Truck },
      "Processing": { icon: Activity },
      "Pending": { icon: Clock },
      "Cancelled": { icon: X }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge variant="outline" className={`${className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const PriorityBadge = ({ priority, className = "" }: { priority: Order['priority'], className?: string }) => {
    const priorityConfig = {
      "Urgent": { color: "bg-red-100 text-red-700 border-red-300", icon: AlertCircle },
      "High": { color: "bg-orange-100 text-orange-700 border-orange-300", icon: TrendingUp },
      "Medium": { color: "bg-yellow-100 text-yellow-700 border-yellow-300", icon: Activity },
      "Low": { color: "bg-gray-100 text-gray-700 border-gray-300", icon: TrendingDown }
    };
    
    const config = priorityConfig[priority];
    const Icon = config.icon;
    
    return (
      <Badge variant="outline" className={`${config.color} ${className} flex items-center gap-1 text-xs`}>
        <Icon className="w-3 h-3" />
        {priority}
      </Badge>
    );
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount.replace('₹', '').replace(',', ''));
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getRelativeTime = (dateString: string) => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
      {/* Enhanced Header with Glass Effects */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 dark:border-white/10 hover:bg-white/15 dark:hover:bg-slate-900/25 transition-all duration-300">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Orders Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your orders in one place
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick Filter Presets */}
          <div className="hidden md:flex items-center gap-2">
            {Object.entries({
              all: 'All',
              today: 'Today',
              urgent: 'Urgent',
              highValue: 'High Value'
            }).map(([key, label]) => (
              <Button
                key={key}
                variant={filters.preset === key ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetFilter(key as FilterPreset)}
                className="text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
          
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="relative"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCSV} disabled={isLoading}>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJSON} disabled={isLoading}>
                <FileText className="mr-2 h-4 w-4" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Summary Cards */}
    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-green-200/50 dark:hover:border-purple-800/50 hover:shadow-green-500/10 group`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Delivered</p>
          <p className="text-3xl font-bold">{summary.delivered}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-blue-500/10 group`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Processing</p>
          <p className="text-3xl font-bold">{summary.processing}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-yellow-500/10 group`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Pending</p>
          <p className="text-3xl font-bold">{summary.pending}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Clock className="w-6 h-6 text-yellow-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-red-500/10 group`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Urgent</p>
          <p className="text-3xl font-bold">{summary.urgent}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-green-500/10 group`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Revenue</p>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalRevenue.toString())}</p>
          <div className="flex items-center mt-1">
            {summary.revenueTrend === 'up' ? (
              <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
            )}
            <span className={`text-xs ${summary.revenueTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {summary.revenueChange.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-xl group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <DollarSign className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className={`text-card-foreground flex flex-col gap-6 py-6 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-purple-500/10 group}`}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Customers</p>
          <p className="text-3xl font-bold">{summary.totalCustomers}</p>
          <p className="text-xs mt-1">
            Avg: {formatCurrency(summary.averageOrderValue.toString())}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-zinc-800/90 dark:to-zinc-700/90 shadow-lg group-hover:shadow-x4 transition-all duration-300 group-hover:scale-110">
          <Users className="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </CardContent>
  </Card>
</div>


      {/* Main Content Card */}
      <Card className="border shadow rounded-lg transition-all duration-300 hover:shadow-lg relative overflow-hidden">
        <div className="relative z-10">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-semibold">Orders Table</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredAndSortedOrders.length} of {orders.length} orders
                {selectedOrders.length > 0 && ` • ${selectedOrders.length} selected`}
              </p>
            </div>
            
            {/* Items per page selector */}
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Enhanced Filters and Search */}
          <div className="space-y-4">
            {/* Primary Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders, customers, emails, tracking..."
                  defaultValue={filters.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.priority} onValueChange={(value) => handleFilterChange('priority', value)}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.paymentMethod} onValueChange={(value) => handleFilterChange('paymentMethod', value)}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="Net Banking">Net Banking</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.from ? (
                        filters.dateRange.to ? (
                          <>
                            {format(filters.dateRange.from, "LLL dd")} - {format(filters.dateRange.to, "LLL dd")}
                          </>
                        ) : (
                          format(filters.dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={filters.dateRange.from}
                      selected={filters.dateRange}
                      onSelect={(range) => handleFilterChange('dateRange', range || {})}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                {(filters.search || filters.status !== 'all' || filters.priority !== 'all' || 
                  filters.paymentMethod !== 'all' || filters.dateRange.from || filters.preset !== 'all') && (
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Bulk Actions with Glass Effects */}
            {selectedOrders.length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-white/20 shadow-lg">
                <span className="text-sm font-medium text-foreground/80">
                  {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
                </span>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" disabled={isLoading}>
                        <Edit className="w-4 h-4 mr-2" />
                        Update Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Processing")}>
                        <Activity className="mr-2 h-4 w-4" />
                        Mark as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Shipped")}>
                        <Truck className="mr-2 h-4 w-4" />
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Delivered")}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleBulkStatusUpdate("Cancelled")}>
                        <X className="mr-2 h-4 w-4" />
                        Mark as Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="outline" size="sm" onClick={handleBulkDelete} disabled={isLoading}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Orders Table with Glass Effects */}
          <div className="rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-slate-800/10 shadow-lg" ref={tableRef}>
            {isLoading ? (
              <div className="p-8">
                <LoadingSkeleton />
              </div>
            ) : paginatedOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No orders found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filters.search || filters.status !== 'all' || filters.priority !== 'all' 
                    ? 'Try adjusting your filters to see more results.'
                    : 'Get started by creating your first order.'}
                </p>
                {(filters.search || filters.status !== 'all' || filters.priority !== 'all') && (
                  <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm border-b border-white/20 dark:border-white/10">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedOrders.length === paginatedOrders.length && paginatedOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all orders"
                      />
                    </TableHead>
                    <TableHead className="font-semibold">Order ID</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                      onClick={() => handleSort('customer')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSort('customer')}
                      aria-label="Sort by customer"
                    >
                      <div className="flex items-center">
                        Customer
                        <SortIcon field="customer" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                      onClick={() => handleSort('amount')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSort('amount')}
                      aria-label="Sort by amount"
                    >
                      <div className="flex items-center">
                        Amount
                        <SortIcon field="amount" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                      onClick={() => handleSort('status')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSort('status')}
                      aria-label="Sort by status"
                    >
                      <div className="flex items-center">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                      onClick={() => handleSort('priority')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSort('priority')}
                      aria-label="Sort by priority"
                    >
                      <div className="flex items-center">
                        Priority
                        <SortIcon field="priority" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                      onClick={() => handleSort('date')}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSort('date')}
                      aria-label="Sort by date"
                    >
                      <div className="flex items-center">
                        Date
                        <SortIcon field="date" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order, index) => (
                    <TableRow 
                      key={order.id} 
                      className={`hover:bg-white/10 dark:hover:bg-slate-800/20 transition-all duration-300 border-b border-white/10 dark:border-white/5 ${
                        selectedOrders.includes(order.id) ? 'bg-white/15 dark:bg-slate-800/25 backdrop-blur-sm' : ''
                      }`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.id)}
                          onCheckedChange={() => handleSelectOrder(order.id)}
                          aria-label={`Select order ${order.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono font-medium text-foreground/80">
                        {order.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{order.customer}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{order.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg">{formatCurrency(order.amount)}</span>
                          {order.items.length > 1 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {order.items.length} items
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value: Order['status']) => handleStatusUpdate(order.id, value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-[140px] border-none p-0 h-auto">
                            <StatusBadge status={order.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Processing">
                              <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Processing
                              </div>
                            </SelectItem>
                            <SelectItem value="Shipped">
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                Shipped
                              </div>
                            </SelectItem>
                            <SelectItem value="Delivered">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Delivered
                              </div>
                            </SelectItem>
                            <SelectItem value="Pending">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Pending
                              </div>
                            </SelectItem>
                            <SelectItem value="Cancelled">
                              <div className="flex items-center gap-2">
                                <X className="w-4 h-4" />
                                Cancelled
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={order.priority} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{format(parseISO(order.date), 'MMM dd, yyyy')}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getRelativeTime(order.updatedAt)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                              aria-label={`Actions for order ${order.id}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Order ID
                            </DropdownMenuItem>
                            {order.email && (
                              <DropdownMenuItem onClick={() => window.open(`mailto:${order.email}`)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Customer
                              </DropdownMenuItem>
                            )}
                            {order.phone && (
                              <DropdownMenuItem onClick={() => window.open(`tel:${order.phone}`)}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call Customer
                              </DropdownMenuItem>
                            )}
                            {order.trackingNumber && (
                              <DropdownMenuItem>
                                <Truck className="mr-2 h-4 w-4" />
                                Track Package
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Enhanced Pagination */}
          {filteredAndSortedOrders.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/20 dark:border-white/10 backdrop-blur-sm bg-white/5 dark:bg-slate-800/10 rounded-t-2xl px-4 pb-2">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length} orders
                {filteredAndSortedOrders.length !== orders.length && (
                  <span className="ml-2 text-foreground/60">
                    (filtered from {orders.length} total)
                  </span>
                )}
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="hidden sm:flex"
                  >
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronUp className="w-4 h-4 rotate-[-90deg]" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const maxVisiblePages = 5;
                      const halfVisible = Math.floor(maxVisiblePages / 2);
                      let startPage = Math.max(1, currentPage - halfVisible);
                      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                      
                      if (endPage - startPage + 1 < maxVisiblePages) {
                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                      }
                      
                      const pages = [];
                      
                      if (startPage > 1) {
                        pages.push(
                          <Button
                            key={1}
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(1)}
                            className="w-8 h-8 p-0"
                          >
                            1
                          </Button>
                        );
                        if (startPage > 2) {
                          pages.push(
                            <span key="ellipsis1" className="px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                      }
                      
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <Button
                            key={i}
                            variant={currentPage === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i)}
                            className="w-8 h-8 p-0"
                          >
                            {i}
                          </Button>
                        );
                      }
                      
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span key="ellipsis2" className="px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <Button
                            key={totalPages}
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(totalPages)}
                            className="w-8 h-8 p-0"
                          >
                            {totalPages}
                          </Button>
                        );
                      }
                      
                      return pages;
                    })()}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="hidden sm:flex"
                  >
                    Last
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
        </div>
      </Card>

      {/* Enhanced Order Details Modal with Glass Effects */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Order Details - {selectedOrder?.id}
              </DialogTitle>
              <div className="flex items-center gap-2">
                {selectedOrder && (
                  <>
                    <StatusBadge status={selectedOrder.status} />
                    <PriorityBadge priority={selectedOrder.priority} />
                  </>
                )}
              </div>
            </div>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer and Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-foreground/70" />
                    <h3 className="font-semibold text-lg">Customer Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Name:</span>
                      <span>{selectedOrder.customer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Email:</span>
                      <a href={`mailto:${selectedOrder.email}`} className="text-foreground/80 hover:underline">
                        {selectedOrder.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Phone:</span>
                      <a href={`tel:${selectedOrder.phone}`} className="text-foreground/80 hover:underline">
                        {selectedOrder.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <span className="font-medium">Address:</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {selectedOrder.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Order Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Order ID:</span>
                      <span className="font-mono text-foreground/80">{selectedOrder.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(selectedOrder.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Date:</span>
                      <span>{format(parseISO(selectedOrder.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Payment:</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Tracking:</span>
                        <span className="font-mono text-blue-600">{selectedOrder.trackingNumber}</span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                    {selectedOrder.estimatedDelivery && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Est. Delivery:</span>
                        <span>{format(parseISO(selectedOrder.estimatedDelivery), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Order Items */}
              <Card className="p-4 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-lg">Order Items</h3>
                </div>
                <div className="border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-slate-800/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800">
                        <TableHead>Item</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="font-mono text-sm text-gray-600">
                            {item.sku || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {item.category || 'General'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency((parseFloat(item.price.replace('₹', '')) * item.quantity).toString())}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-4 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-lg">Order Summary</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.amount)}</span>
                  </div>
                  {selectedOrder.discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-{formatCurrency(selectedOrder.discount)}</span>
                    </div>
                  )}
                  {selectedOrder.shippingCost && (
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{formatCurrency(selectedOrder.shippingCost)}</span>
                    </div>
                  )}
                  {selectedOrder.taxAmount && (
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatCurrency(selectedOrder.taxAmount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.amount)}</span>
                  </div>
                </div>
              </Card>

              {/* Notes and Tags */}
              {(selectedOrder.notes || selectedOrder.tags?.length) && (
                <Card className="p-4 backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                  </div>
                  {selectedOrder.notes && (
                    <div className="mb-4">
                      <span className="font-medium">Notes:</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                  {selectedOrder.tags && selectedOrder.tags.length > 0 && (
                    <div>
                      <span className="font-medium">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedOrder.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex gap-2">
              {selectedOrder && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Order
                  </Button>
                  <Button onClick={() => window.print()}>
                    <FileText className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Edit Order Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Order - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer">Customer Name</Label>
                  <Input
                    id="customer"
                    defaultValue={selectedOrder.customer}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={selectedOrder.email}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={selectedOrder.phone}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedOrder.status}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select defaultValue={selectedOrder.priority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    defaultValue={selectedOrder.trackingNumber || ''}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  defaultValue={selectedOrder.address}
                  className="mt-1"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  defaultValue={selectedOrder.notes || ''}
                  placeholder="Add any notes about this order..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // In a real app, this would save the changes
              showNotification('Order updated successfully', 'success');
              setIsEditOpen(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="p-4 shadow-2xl border-l-4 border-l-foreground/30 backdrop-blur-xl rounded-2xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-white/10">
            <div className="flex items-center gap-2">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
              {notification.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
              {notification.type === 'info' && <Bell className="w-5 h-5 text-blue-600" />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
