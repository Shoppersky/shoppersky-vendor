"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
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
import { toast } from "sonner";
import useStore from "@/lib/Zustand";
import axiosInstance from "@/lib/axiosInstance";

// Types
interface Thread {
  type: string;
  sender_type: string;
  user_id: string;
  username: string;
  message: string;
  timestamp: string;
}

interface Query {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  vendor_id: string;
  vendor_name: string;
  vendor_email?: string;
  created_at: string;
  updated_at: string;
  admin_response?: string;
  category: string;
  follow_up_query?: string;
  follow_up_date?: string;
}

interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

const QueriesPage = () => {
  const router = useRouter();
  const { userId } = useStore();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 20,
    has_next: false,
    has_prev: false,
  });

  useEffect(() => {
    fetchQueries();
  }, [pagination.current_page, userId]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/vendor_admin_queries/list?user_id=${userId}&page=${pagination.current_page}&limit=20`);
      console.log('API Response:', response.data); // Debug
      const { data } = response.data
console.log(data.queries)
      const mappedQueries: Query[] = data.queries.map((query: any) => ({
        id: query.id.toString(),
        title: query.title,
        description: query.last_message || query.thread?.[0]?.message || 'No description available',
        status: query.query_status?.toLowerCase() as 'open' | 'in-progress' | 'resolved' | 'closed' || 'open',
        vendor_id: query.sender_user_id,
        vendor_name: query.thread?.[0]?.username || 'Unknown',
        vendor_email: '',
        created_at: query.created_at,
        updated_at: query.updated_at,
        category: query.category || 'General',
        admin_response: query.thread?.find((t: Thread) => t.sender_type === 'admin')?.message,
        follow_up_query: query.thread?.length > 1 ? query.thread[query.thread.length - 1].message : undefined,
        follow_up_date: query.thread?.length > 1 ? query.thread[query.thread.length - 1].timestamp : undefined,
      }));

      console.log('Mapped Queries:', mappedQueries); // Debug
      setQueries(mappedQueries);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch queries");
      setQueries([]);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        items_per_page: 20,
        has_next: false,
        has_prev: false,
      });
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
const filteredQueries = queries.filter(query => 
  statusFilter.toLowerCase() === "all" || 
  query.status.toLowerCase() === statusFilter.toLowerCase()
);
  console.log('Filtered Queries:', filteredQueries); // Debug

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, current_page: newPage }));
  };

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
          <h1 className="text-3xl font-bold text-foreground">Queries</h1>
          <p className="text-muted-foreground">
            Manage communication between vendors and administrators
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchQueries} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => router.push('/enquiries/new')}>
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
                <SelectItem value="open">Open</SelectItem>
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
              <Button onClick={() => router.push('/enquiries/new')}>
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
                    <TableCell>
                      {query.created_at ? new Date(query.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/enquiries/${query.id}`)}>
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

      {/* Pagination Controls */}
      {pagination.total_pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing page {pagination.current_page} of {pagination.total_pages} ({pagination.total_items} items)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.has_prev}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!pagination.has_next}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueriesPage;