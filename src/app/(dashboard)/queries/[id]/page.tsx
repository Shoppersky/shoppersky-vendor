"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Send, 
  User, 
  Clock, 
  MessageSquare,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import useStore from "@/lib/Zustand";
import { toast } from "sonner";

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

const QueryDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useStore();
  const [query, setQuery] = useState<Query | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminResponse, setAdminResponse] = useState("");
  const [followUpText, setFollowUpText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Mock data - replace with actual API call
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
    fetchQuery();
  }, [params.id]);

  const fetchQuery = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await axiosInstance.get(`/api/v1/queries/${params.id}`);
      // setQuery(response.data.data);
      
      // Using mock data for now
      setTimeout(() => {
        const foundQuery = mockQueries.find(q => q.id === params.id);
        setQuery(foundQuery || null);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching query:", error);
      toast.error("Failed to fetch query details");
      setLoading(false);
    }
  };

  const handleAdminResponse = async () => {
    if (!adminResponse.trim()) {
      toast.error("Please enter a response");
      return;
    }

    try {
      setSubmitting(true);
      // Replace with actual API call
      // await axiosInstance.patch(`/api/v1/queries/${params.id}/respond`, {
      //   response: adminResponse,
      //   status: 'in-progress'
      // });

      // Mock update for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (query) {
        setQuery({
          ...query,
          admin_response: adminResponse,
          status: 'in-progress',
          updated_at: new Date().toISOString()
        });
      }
      
      setAdminResponse("");
      toast.success("Response sent successfully");
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFollowUpQuery = async () => {
    if (!followUpText.trim()) {
      toast.error("Please enter your follow-up query");
      return;
    }

    try {
      setSubmitting(true);
      // Replace with actual API call
      // await axiosInstance.patch(`/api/v1/queries/${params.id}/follow-up`, {
      //   follow_up_query: followUpText
      // });

      // Mock update for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (query) {
        setQuery({
          ...query,
          follow_up_query: followUpText,
          follow_up_date: new Date().toISOString(),
          status: 'pending',
          updated_at: new Date().toISOString()
        });
      }
      
      setFollowUpText("");
      toast.success("Follow-up query submitted successfully");
    } catch (error) {
      console.error("Error submitting follow-up query:", error);
      toast.error("Failed to submit follow-up query");
    } finally {
      setSubmitting(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/queries")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Query Not Found</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">The requested query could not be found.</p>
            <Button 
              onClick={() => router.push("/queries")} 
              className="mt-4"
            >
              Back to Queries
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push("/queries")}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Query Details</h1>
          <p className="text-muted-foreground">
            View and manage query communication
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(query.status)}
          <Badge className={getStatusColor(query.status)}>
            {query.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Query Information */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{query.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {query.vendor_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(query.created_at).toLocaleDateString()}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {query.category}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {query.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Vendor Email</Label>
                  <p>{query.vendor_email}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Last Updated</Label>
                  <p>{new Date(query.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Response */}
        {query.admin_response && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5" />
                Admin Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{query.admin_response}</p>
            </CardContent>
          </Card>
        )}

        {/* Follow-up Query */}
        {query.follow_up_query && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5" />
                Follow-up Query
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                  {new Date(query.follow_up_date!).toLocaleDateString()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{query.follow_up_query}</p>
            </CardContent>
          </Card>
        )}

        {/* Admin Response Form */}
        {user?.role_name === 'admin' && query.status !== 'resolved' && query.status !== 'closed' && (
          <Card>
            <CardHeader>
              <CardTitle>Send Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your response to help the vendor..."
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={4}
                  disabled={submitting}
                />
                <Button 
                  onClick={handleAdminResponse} 
                  disabled={submitting || !adminResponse.trim()}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Response
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Follow-up Form */}
        {user?.role_name !== 'admin' && query.admin_response && query.status !== 'resolved' && query.status !== 'closed' && (
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Query</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="If you need further clarification or the solution didn't work, please describe your issue..."
                  value={followUpText}
                  onChange={(e) => setFollowUpText(e.target.value)}
                  rows={4}
                  disabled={submitting}
                />
                <Button 
                  onClick={handleFollowUpQuery} 
                  disabled={submitting || !followUpText.trim()}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Follow-up
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QueryDetailsPage;