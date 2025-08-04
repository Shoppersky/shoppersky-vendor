"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MessageSquare, 
  Plus,
  RefreshCw,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

import useStore from "@/lib/Zustand";
import { toast } from "sonner";

// Types
interface Query {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  vendor_id: string;
  vendor_name: string;
  vendor_email: string;
  created_at: string;
  updated_at: string;
  admin_response?: string;
  category: string;
  follow_up_query?: string;
  follow_up_date?: string;
}

const QueriesPage = () => {
  const router = useRouter();
  const { user } = useStore();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for demonstration - replace with actual API calls
  const mockQueries: Query[] = [
    {
      id: "1",
      title: "Event Setup Issue",
      description: "Having trouble setting up the event venue details. The location field is not accepting special characters.",
      status: "pending",
      vendor_id: "vendor_1",
      vendor_name: "John Vendor",
      vendor_email: "john@vendor.com",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
      category: "Technical"
    },
    {
      id: "2",
      title: "Payment Gateway Integration",
      description: "Need assistance with integrating the payment gateway for ticket sales. Getting error codes during checkout process.",
      status: "in-progress",
      vendor_id: "vendor_2",
      vendor_name: "Sarah Events",
      vendor_email: "sarah@events.com",
      created_at: "2024-01-14T14:20:00Z",
      updated_at: "2024-01-15T09:15:00Z",
      category: "Payment",
      admin_response: "We're looking into this issue. Our technical team is working on a solution.",
      follow_up_query: "The solution you provided didn't work. I'm still getting the same error. Can you provide more specific steps?",
      follow_up_date: "2024-01-16T08:30:00Z"
    },
    {
      id: "3",
      title: "Bulk Ticket Upload",
      description: "How can I upload multiple ticket types at once? The current interface only allows one at a time.",
      status: "resolved",
      vendor_id: "vendor_3",
      vendor_name: "Mike Productions",
      vendor_email: "mike@productions.com",
      created_at: "2024-01-13T16:45:00Z",
      updated_at: "2024-01-14T11:30:00Z",
      category: "Feature Request",
      admin_response: "You can use the bulk upload feature in the advanced settings. Please check the documentation for detailed steps."
    }
  ];

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await axiosInstance.get('/api/v1/queries');
      // setQueries(response.data.data);
      
      // Using mock data for now
      setTimeout(() => {
        setQueries(mockQueries);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
      setLoading(false);
    }
  };



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const filteredQueries = queries.filter(query => {
    const matchesStatus = statusFilter === "all" || query.status === statusFilter;
    return matchesStatus;
  });

  // Table columns definition
  const columns: ColumnDef<Query>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-[300px]">
          <div className="font-medium truncate">{row.getValue("title")}</div>
          <div className="text-sm text-muted-foreground truncate">
            {row.original.description.substring(0, 80)}...
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.getValue("category") || "General"}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <Badge className={getStatusColor(row.getValue("status"))}>
            {row.getValue("status")}
          </Badge>
          {row.original.follow_up_query && (
            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
              Follow-up
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.getValue("created_at")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const query = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/queries/${query.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
             Queries</h1>
          <p className="text-muted-foreground">
            Manage communication between vendors and administrators
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchQueries} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => router.push('/queries/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Query
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Queries Table */}
      <Card>
        <CardContent className="p-6">
          {filteredQueries.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Queries Found</h3>
              <p className="text-gray-500 mb-4">
                {queries.length === 0 
                  ? "No queries have been submitted yet." 
                  : "No queries match your current filters."
                }
              </p>
              <Button onClick={() => router.push('/queries/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Submit Your First Query
              </Button>
            </div>
          ) : (
           <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Created</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredQueries.map((query) => (
      <TableRow key={query.id}>
        <TableCell>
          <div className="font-medium truncate">{query.title}</div>
          <div className="text-sm text-muted-foreground truncate">
            {query.description.substring(0, 80)}...
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="text-xs">{query.category}</Badge>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-1">
            <Badge className={getStatusColor(query.status)}>{query.status}</Badge>
            {query.follow_up_query && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                Follow-up
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell>{new Date(query.created_at).toLocaleDateString()}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/queries/${query.id}`)}>
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


    </div>
  );
};

export default QueriesPage;