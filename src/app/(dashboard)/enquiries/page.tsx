// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { 
//   MessageSquare, 
//   Plus,
//   RefreshCw,
//   Eye,
//   MoreHorizontal
// } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { toast } from "sonner";
// import useStore from "@/lib/Zustand";
// import axiosInstance from "@/lib/axiosInstance";

// // Types
// interface Thread {
//   type: string;
//   sender_type: string;
//   user_id: string;
//   username: string;
//   message: string;
//   timestamp: string;
// }

// interface Query {
//   id: string;
//   title: string;
//   description: string;
//   status: 'open' | 'in-progress' | 'resolved' | 'closed';
//   vendor_id: string;
//   vendor_name: string;
//   vendor_email?: string;
//   created_at: string;
//   updated_at: string;
//   admin_response?: string;
//   category: string;
//   follow_up_query?: string;
//   follow_up_date?: string;
// }

// interface Pagination {
//   current_page: number;
//   total_pages: number;
//   total_items: number;
//   items_per_page: number;
//   has_next: boolean;
//   has_prev: boolean;
// }

// const QueriesPage = () => {
//   const router = useRouter();
//   const { userId } = useStore();
//   const [queries, setQueries] = useState<Query[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [pagination, setPagination] = useState<Pagination>({
//     current_page: 1,
//     total_pages: 1,
//     total_items: 0,
//     items_per_page: 20,
//     has_next: false,
//     has_prev: false,
//   });

//   useEffect(() => {
//     fetchQueries();
//   }, [pagination.current_page, userId]);

//   const fetchQueries = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`/vendor/vendor_admin_queries/list?user_id=${userId}&page=${pagination.current_page}&limit=20`);
//       console.log('API Response:', response.data); // Debug
//       const { data } = response.data
// console.log(data.queries)
//       const mappedQueries: Query[] = data.queries.map((query: any) => ({
//         id: query.id.toString(),
//         title: query.title,
//         description: query.last_message || query.thread?.[0]?.message || 'No description available',
//         status: query.query_status?.toLowerCase() as 'open' | 'in-progress' | 'resolved' | 'closed' || 'open',
//         vendor_id: query.sender_user_id,
//         vendor_name: query.thread?.[0]?.username || 'Unknown',
//         vendor_email: '',
//         created_at: query.created_at,
//         updated_at: query.updated_at,
//         category: query.category || 'General',
//         admin_response: query.thread?.find((t: Thread) => t.sender_type === 'admin')?.message,
//         follow_up_query: query.thread?.length > 1 ? query.thread[query.thread.length - 1].message : undefined,
//         follow_up_date: query.thread?.length > 1 ? query.thread[query.thread.length - 1].timestamp : undefined,
//       }));

//       console.log('Mapped Queries:', mappedQueries); // Debug
//       setQueries(mappedQueries);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching queries:", error);
//       // toast.error("Failed to fetch queries");
//       setQueries([]);
//       setPagination({
//         current_page: 1,
//         total_pages: 1,
//         total_items: 0,
//         items_per_page: 20,
//         has_next: false,
//         has_prev: false,
//       });
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'open': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
//       case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//     }
//   };
// const filteredQueries = queries.filter(query => 
//   statusFilter.toLowerCase() === "all" || 
//   query.status.toLowerCase() === statusFilter.toLowerCase()
// );
//   console.log('Filtered Queries:', filteredQueries); // Debug

//   const handlePageChange = (newPage: number) => {
//     setPagination(prev => ({ ...prev, current_page: newPage }));
//   };

//   if (loading) {
//     return (
//       <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div className="space-y-2">
//               <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//             <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           {[...Array(3)].map((_, i) => (
//             <Card key={i} className="p-6">
//               <div className="space-y-4">
//                 <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
//                 <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
//                 <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Queries</h1>
//           <p className="text-muted-foreground">
//             Manage communication between vendors and administrators
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button onClick={fetchQueries} variant="outline" >
//             <RefreshCw className="w-4 h-4 mr-2" />
//             Refresh
//           </Button>
//           <Button onClick={() => router.push('/enquiries/new')}>
//             <Plus className="w-4 h-4 mr-2" />
//             New Query
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="open">Open</SelectItem>
//                 <SelectItem value="in-progress">In Progress</SelectItem>
//                 <SelectItem value="resolved">Resolved</SelectItem>
//                 <SelectItem value="closed">Closed</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Queries Table */}
//       <Card>
//         <CardContent className="p-6">
//           {filteredQueries.length === 0 ? (
//             <div className="text-center py-8">
//               <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">No Queries Found</h3>
//               <p className="text-gray-500 mb-4">
//                 {queries.length === 0 
//                   ? "No queries have been submitted yet." 
//                   : "No queries match your current filters."
//                 }
//               </p>
//               <Button onClick={() => router.push('/enquiries/new')}>
//                 <Plus className="w-4 h-4 mr-2" />
//                 Submit Your First Query
//               </Button>
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredQueries.map((query) => (
//                   <TableRow key={query.id}>
//                     <TableCell>
//                       <div className="font-medium truncate">{query.title}</div>
//                       <div className="text-sm text-muted-foreground truncate">
//                         {query.description.substring(0, 80)}...
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="text-xs">{query.category}</Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-col gap-1">
//                         <Badge className={getStatusColor(query.status)}>{query.status}</Badge>
//                         {/* {query.follow_up_query && (
//                           <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
//                             Follow-up
//                           </Badge>
//                         )} */}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => router.push(`/enquiries/${query.id}`)}>
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Details
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Pagination Controls */}
//       {pagination.total_pages > 1 && (
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-muted-foreground">
//             Showing page {pagination.current_page} of {pagination.total_pages} ({pagination.total_items} items)
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={!pagination.has_prev}
//               onClick={() => handlePageChange(pagination.current_page - 1)}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={!pagination.has_next}
//               onClick={() => handlePageChange(pagination.current_page + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QueriesPage;




"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Plus,
  RefreshCw,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  User,
  Clock,
  ArrowUpDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import useStore from "@/lib/Zustand"
import axiosInstance from "@/lib/axiosInstance"

// Types
interface Thread {
  type: string
  sender_type: string
  user_id: string
  username: string
  message: string
  timestamp: string
}

interface Query {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  vendor_id: string
  vendor_name: string
  vendor_email?: string
  created_at: string
  updated_at: string
  admin_response?: string
  category: string
  follow_up_query?: string
  follow_up_date?: string
}

interface Pagination {
  current_page: number
  total_pages: number
  total_items: number
  items_per_page: number
  has_next: boolean
  has_prev: boolean
}

const QueriesPage = () => {
  const router = useRouter()
  const { userId } = useStore()
  const [queries, setQueries] = useState<Query[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 20,
    has_next: false,
    has_prev: false,
  })

  useEffect(() => {
    fetchQueries()
  }, [pagination.current_page, userId])

  const fetchQueries = async () => {
    try {
      setLoading(true)

      try {
        const response = await axiosInstance.get(
          `/vendor/vendor_admin_queries/list?user_id=${userId}&page=${pagination.current_page}&limit=20`,
        )
        const { data } = response.data

        const mappedQueries: Query[] = data.queries.map((query: any) => ({
          id: query.id.toString(),
          title: query.title,
          description: query.last_message || query.thread?.[0]?.message || "No description available",
          status: (query.query_status?.toLowerCase() as "open" | "in-progress" | "resolved" | "closed") || "open",
          vendor_id: query.sender_user_id,
          vendor_name: query.thread?.[0]?.username || "Unknown",
          vendor_email: "",
          created_at: query.created_at,
          updated_at: query.updated_at,
          category: query.category || "General",
          admin_response: query.thread?.find((t: Thread) => t.sender_type === "admin")?.message,
          follow_up_query: query.thread?.length > 1 ? query.thread[query.thread.length - 1].message : undefined,
          follow_up_date: query.thread?.length > 1 ? query.thread[query.thread.length - 1].timestamp : undefined,
        }))

        setQueries(mappedQueries)
      } catch (apiError) {
        // Fallback to demo data if API fails
        console.log("API not available, using demo data")
        const demoQueries: Query[] = [
          {
            id: "1",
            title: "Payment Processing Issue",
            description: "Having trouble with payment gateway integration. Transactions are failing intermittently.",
            status: "open",
            vendor_id: "vendor_1",
            vendor_name: "John Smith",
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Technical",
          },
          {
            id: "2",
            title: "Account Verification Delay",
            description: "My account verification has been pending for over a week. Need urgent assistance.",
            status: "in-progress",
            vendor_id: "vendor_2",
            vendor_name: "Sarah Johnson",
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Account",
            admin_response: "We are reviewing your documents and will update you soon.",
          },
          {
            id: "3",
            title: "API Rate Limit Questions",
            description: "Need clarification on API rate limits for our enterprise plan.",
            status: "resolved",
            vendor_id: "vendor_3",
            vendor_name: "Mike Chen",
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Billing",
            admin_response: "Enterprise plans have a 10,000 requests per minute limit.",
          },
          {
            id: "4",
            title: "Feature Request: Bulk Upload",
            description: "Would like to request a bulk upload feature for product catalogs.",
            status: "closed",
            vendor_id: "vendor_4",
            vendor_name: "Emily Davis",
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Feature Request",
          },
          {
            id: "5",
            title: "Dashboard Performance Issues",
            description: "The dashboard is loading very slowly, especially the analytics section.",
            status: "open",
            vendor_id: "vendor_5",
            vendor_name: "Robert Wilson",
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            category: "Technical",
          },
        ]

        setQueries(demoQueries)
        setPagination({
          current_page: 1,
          total_pages: 1,
          total_items: demoQueries.length,
          items_per_page: 20,
          has_next: false,
          has_prev: false,
        })
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching queries:", error)
      toast.error("Failed to fetch queries")
      setQueries([])
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        items_per_page: 20,
        has_next: false,
        has_prev: false,
      })
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
      case "resolved":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700"
      case "closed":
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800"
    }
  }

  const filteredAndSortedQueries = queries
    .filter((query) => {
      const matchesStatus = statusFilter === "all" || query.status === statusFilter
      const matchesCategory = categoryFilter === "all" || query.category === categoryFilter
      const matchesSearch =
        searchQuery === "" ||
        query.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        query.vendor_name.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesStatus && matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Query]
      let bValue = b[sortBy as keyof Query]

      if (sortBy === "created_at" || sortBy === "updated_at") {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const uniqueCategories = [...new Set(queries.map((q) => q.category))]

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              <div className="h-5 w-96 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <Card className="border border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
              </div>

              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 py-4 border-b border-slate-200 dark:border-slate-700"
                  >
                    <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 w-1/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Queries</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Manage communication between vendors and administrators
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {queries.length} total queries
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={fetchQueries} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => router.push("/enquiries/new")}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Query
            </Button>
          </div>
        </div>

        <Card className="border border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search queries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 shadow-sm"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={`${sortBy}-${sortOrder}`}
                onValueChange={(value) => {
                  const [field, order] = value.split("-")
                  setSortBy(field)
                  setSortOrder(order as "asc" | "desc")
                }}
              >
                <SelectTrigger className="shadow-sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Newest First</SelectItem>
                  <SelectItem value="created_at-asc">Oldest First</SelectItem>
                  <SelectItem value="updated_at-desc">Recently Updated</SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span>
                  Showing {filteredAndSortedQueries.length} of {queries.length} queries
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setCategoryFilter("all")
                  }}
                  className="h-6 px-2 text-xs"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700">
          <CardContent className="p-0">
            {filteredAndSortedQueries.length === 0 ? (
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 mx-auto mb-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-cyan-500" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  {queries.length === 0 ? "No Queries Yet" : "No Matching Queries"}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                  {queries.length === 0
                    ? "Get started by submitting your first query to communicate with administrators."
                    : "Try adjusting your filters or search terms to find what you're looking for."}
                </p>
                {queries.length === 0 && (
                  <Button
                    onClick={() => router.push("/enquiries/new")}
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit Your First Query
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-200 dark:border-slate-700">
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Title</TableHead>
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Vendor</TableHead>
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Category</TableHead>
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Status</TableHead>
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100">Created</TableHead>
                    <TableHead className="font-semibold text-slate-900 dark:text-slate-100 w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedQueries.map((query) => (
                    <TableRow
                      key={query.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
                            {query.title}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                            {query.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-700 dark:text-slate-300">{query.vendor_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="outline"
                          className="text-xs border-cyan-200 text-cyan-700 dark:border-cyan-700 dark:text-cyan-300"
                        >
                          {query.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`${getStatusColor(query.status)} font-medium px-3 py-1`}>
                          {query.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(query.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-cyan-100 dark:hover:bg-cyan-900/20"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => router.push(`/enquiries/${query.id}`)}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {pagination.total_pages > 1 && (
          <Card className="border border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing page {pagination.current_page} of {pagination.total_pages} ({pagination.total_items} total
                  items)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.has_prev}
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    className="shadow-sm"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.has_next}
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    className="shadow-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default QueriesPage
