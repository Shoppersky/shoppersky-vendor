// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { 
//   ArrowLeft, 
//   Send, 
//   User, 
//   Clock, 
//   MessageSquare,
//   AlertCircle,
//   CheckCircle
// } from "lucide-react";

// import useStore from "@/lib/Zustand";
// import { toast } from "sonner";
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
//   status: 'pending' | 'in-progress' | 'resolved' | 'closed';
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

// const QueryDetailsPage = () => {
//   const router = useRouter();
//   const params = useParams();
//   const { userId, user } = useStore();
//   const [query, setQuery] = useState<Query | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [followUpText, setFollowUpText] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [resolving, setResolving] = useState(false);

//   useEffect(() => {
//     fetchQuery();
//   }, [params.id]);

//   const fetchQuery = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get(`/vendor/vendor_admin_queries/${params.id}?user_id=${userId}`);
//       const queryData = response.data.data;

//       // Map API response to Query interface
//       const mappedQuery: Query = {
//         id: queryData.id.toString(),
//         title: queryData.title,
//         description: queryData.last_message || queryData.thread?.[0]?.message || 'No description available',
//         status: queryData.query_status?.toLowerCase() === 'open' ? 'pending' : queryData.query_status?.toLowerCase() as 'pending' | 'in-progress' | 'resolved' | 'closed',
//         vendor_id: queryData.sender_user_id,
//         vendor_name: queryData.thread?.[0]?.username || 'Unknown',
//         vendor_email: queryData.vendor_email || '',
//         created_at: queryData.created_at,
//         updated_at: queryData.updated_at,
//         category: queryData.category || 'General',
//         admin_response: queryData.thread?.find((t: Thread) => t.sender_type === 'admin')?.message,
//         follow_up_query: queryData.thread?.length > 1 ? queryData.thread[queryData.thread.length - 1].message : undefined,
//         follow_up_date: queryData.thread?.length > 1 ? queryData.thread[queryData.thread.length - 1].timestamp : undefined,
//       };

//       setQuery(mappedQuery);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching query:", error);
//       // toast.error("Failed to fetch query details");
//       setLoading(false);
//     }
//   };

//   const handleFollowUpQuery = async () => {
//     if (!followUpText.trim()) {
//       toast.error("Please enter your follow-up query");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const response = await axiosInstance.post(`/vendor/vendor_admin_queries/messages/${params.id}`, {
//         user_id: userId,
//         message: followUpText,
//         message_type: "followup",
//       });

//       if (query) {
//         setQuery({
//           ...query,
//           follow_up_query: followUpText,
//           follow_up_date: new Date().toISOString(),
//           status: response.data.data.query_status?.toLowerCase() || 'pending',
//           updated_at: response.data.data.updated_at || new Date().toISOString(),
//         });
//       }

//       setFollowUpText("");
//       toast.success("Follow-up query submitted successfully");
//     } catch (error) {
//       console.error("Error submitting follow-up query:", error);
//       toast.error("Failed to submit follow-up query");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleMarkAsResolved = async () => {
//     if (!query) return;

//     try {
//       setResolving(true);
//       const response = await axiosInstance.patch(`/vendor/vendor_admin_queries/status/${params.id}`, {
//         user_id: userId,
//         query_status: "closed",
//         message: "Marked as resolved by vendor",
//       });

//       setQuery({
//         ...query,
//         status: response.data.data.query_status?.toLowerCase() || 'closed',
//         updated_at: response.data.data.updated_at || new Date().toISOString(),
//         admin_response: response.data.data.thread?.find((t: Thread) => t.sender_type === 'vendor' && t.type === 'response')?.message || query.admin_response,
//       });

//       toast.success("Query marked as resolved successfully");
//     } catch (error) {
//       console.error("Error marking query as resolved:", error);
//       toast.error("Failed to mark query as resolved");
//     } finally {
//       setResolving(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
//       case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
//       case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
//       case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'pending': return <Clock className="h-4 w-4" />;
//       case 'in-progress': return <AlertCircle className="h-4 w-4" />;
//       case 'resolved': return <CheckCircle className="h-4 w-4" />;
//       case 'closed': return <CheckCircle className="h-4 w-4" />;
//       default: return <Clock className="h-4 w-4" />;
//     }
//   };

//   // Determine if follow-up is allowed
//   const canFollowUp = query && query.status !== 'closed' && query.admin_response;

//   if (loading) {
//     return (
//       <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn max-w-4xl mx-auto">
//         <div className="space-y-6">
//           <div className="flex items-center gap-4">
//             <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
//             <div className="space-y-2">
//               <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </div>
//           <Card className="p-6">
//             <div className="space-y-4">
//               <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
//               <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   if (!query) {
//     return (
//       <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn max-w-4xl mx-auto">
//         <div className="flex items-center gap-4 mb-6">
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             onClick={() => router.push("/enquiries")}
//             className="p-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Query Not Found</h1>
//           </div>
//         </div>
//         <Card>
//           <CardContent className="p-6 text-center">
//             <p className="text-muted-foreground">The requested query could not be found.</p>
//             <Button 
//               onClick={() => router.push("/enquiries")} 
//               className="mt-4"
//             >
//               Back to Queries
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-white animate-fadeIn max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center gap-4 mb-6">
//         <Button 
//           variant="ghost" 
//           size="sm" 
//           onClick={() => router.push("/enquiries")}
//           className="p-2"
//         >
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-foreground">Query Details</h1>
//           <p className="text-muted-foreground">
//             View and manage query communication
//           </p>
//         </div>
//         <div className="flex items-center gap-2">
//           {getStatusIcon(query.status)}
//           <Badge className={getStatusColor(query.status)}>
//             {query.status}
//           </Badge>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {/* Query Information */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div className="space-y-2">
//                 <CardTitle className="text-xl">{query.title}</CardTitle>
//                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-1">
//                     <User className="h-4 w-4" />
//                     {query.vendor_name}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     {new Date(query.created_at).toLocaleDateString()}
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {query.category}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <Label className="text-sm font-medium">Description</Label>
//                 <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
//                   {query.description}
//                 </p>
//               </div>
              
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 {/* <div>
//                   <Label className="text-xs font-medium text-muted-foreground">Vendor Email</Label>
//                   <p>{query.vendor_email || 'N/A'}</p>
//                 </div> */}
//                 <div>
//                   <Label className="text-xs font-medium text-muted-foreground">Last Updated</Label>
//                   <p>{new Date(query.updated_at).toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Admin Response */}
//         {query.admin_response && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <MessageSquare className="h-5 w-5" />
//                 Admin Response
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm leading-relaxed">{query.admin_response}</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Follow-up Query */}
//         {query.follow_up_query && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <MessageSquare className="h-5 w-5" />
//                 Follow-up Query
//                 <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
//                   {new Date(query.follow_up_date!).toLocaleDateString()}
//                 </Badge>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm leading-relaxed">{query.follow_up_query}</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* Resolve Query */}
//         {query.status !== 'closed' && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Resolve Query</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Button 
//                 onClick={handleMarkAsResolved} 
//                 disabled={resolving}
//                 className="bg-green-600 hover:bg-green-700"
//               >
//                 {resolving ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Marking as Resolved...
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-4 h-4 mr-2" />
//                     Mark as Resolved
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         )}

//         {/* Follow-up Form */}
//         {canFollowUp && (
//           <Card>
//             <CardHeader>
//               <CardTitle>Follow-up Query</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <Textarea
//                   placeholder="If you need further clarification or the solution didn't work, please describe your issue..."
//                   value={followUpText}
//                   onChange={(e) => setFollowUpText(e.target.value)}
//                   rows={4}
//                   disabled={submitting}
//                 />
//                 <Button 
//                   onClick={handleFollowUpQuery} 
//                   disabled={submitting || !followUpText.trim()}
//                 >
//                   {submitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <Send className="w-4 h-4 mr-2" />
//                       Submit Follow-up
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QueryDetailsPage;




"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, User, Clock, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"

import useStore from "@/lib/Zustand"
import { toast } from "sonner"
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
  status: "pending" | "in-progress" | "resolved" | "closed"
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

const QueryDetailsPage = () => {
  const router = useRouter()
  const params = useParams()
  const { userId, user } = useStore()
  const [query, setQuery] = useState<Query | null>(null)
  const [loading, setLoading] = useState(true)
  const [followUpText, setFollowUpText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [resolving, setResolving] = useState(false)

  useEffect(() => {
    fetchQuery()
  }, [params.id])

  const fetchQuery = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/vendor/vendor_admin_queries/${params.id}?user_id=${userId}`)
      const queryData = response.data.data

      // Map API response to Query interface
      const mappedQuery: Query = {
        id: queryData.id.toString(),
        title: queryData.title,
        description: queryData.last_message || queryData.thread?.[0]?.message || "No description available",
        status:
          queryData.query_status?.toLowerCase() === "open"
            ? "pending"
            : (queryData.query_status?.toLowerCase() as "pending" | "in-progress" | "resolved" | "closed"),
        vendor_id: queryData.sender_user_id,
        vendor_name: queryData.thread?.[0]?.username || "Unknown",
        vendor_email: queryData.vendor_email || "",
        created_at: queryData.created_at,
        updated_at: queryData.updated_at,
        category: queryData.category || "General",
        admin_response: queryData.thread?.find((t: Thread) => t.sender_type === "admin")?.message,
        follow_up_query:
          queryData.thread?.length > 1 ? queryData.thread[queryData.thread.length - 1].message : undefined,
        follow_up_date:
          queryData.thread?.length > 1 ? queryData.thread[queryData.thread.length - 1].timestamp : undefined,
      }

      setQuery(mappedQuery)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching query:", error)
      // toast.error("Failed to fetch query details");
      setLoading(false)
    }
  }

  const handleFollowUpQuery = async () => {
    if (!followUpText.trim()) {
      toast.error("Please enter your follow-up query")
      return
    }

    try {
      setSubmitting(true)
      const response = await axiosInstance.post(`/vendor/vendor_admin_queries/messages/${params.id}`, {
        user_id: userId,
        message: followUpText,
        message_type: "followup",
      })

      if (query) {
        setQuery({
          ...query,
          follow_up_query: followUpText,
          follow_up_date: new Date().toISOString(),
          status: response.data.data.query_status?.toLowerCase() || "pending",
          updated_at: response.data.data.updated_at || new Date().toISOString(),
        })
      }

      setFollowUpText("")
      toast.success("Follow-up query submitted successfully")
    } catch (error) {
      console.error("Error submitting follow-up query:", error)
      toast.error("Failed to submit follow-up query")
    } finally {
      setSubmitting(false)
    }
  }

  const handleMarkAsResolved = async () => {
    if (!query) return

    try {
      setResolving(true)
      const response = await axiosInstance.patch(`/vendor/vendor_admin_queries/status/${params.id}`, {
        user_id: userId,
        query_status: "closed",
        message: "Marked as resolved by vendor",
      })

      setQuery({
        ...query,
        status: response.data.data.query_status?.toLowerCase() || "closed",
        updated_at: response.data.data.updated_at || new Date().toISOString(),
        admin_response:
          response.data.data.thread?.find((t: Thread) => t.sender_type === "vendor" && t.type === "response")
            ?.message || query.admin_response,
      })

      toast.success("Query marked as resolved successfully")
    } catch (error) {
      console.error("Error marking query as resolved:", error)
      toast.error("Failed to mark query as resolved")
    } finally {
      setResolving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-cyan-50 text-cyan-700 border-cyan-200"
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "closed":
        return "bg-slate-50 text-slate-700 border-slate-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Determine if follow-up is allowed
  const canFollowUp = query && query.status !== "closed" && query.admin_response

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-slate-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 w-64 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!query) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => router.push("/enquiries")} className="hover:bg-cyan-50">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Query Not Found</h1>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <p className="text-slate-600 mb-4">The requested query could not be found.</p>
            <Button onClick={() => router.push("/enquiries")} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              Back to Queries
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push("/enquiries")} className="hover:bg-cyan-50">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-slate-900">Query Details</h1>
            <p className="text-slate-600">View and manage query communication</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(query.status)}
            <Badge className={`${getStatusColor(query.status)} border`}>
              {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-medium text-slate-900">{query.title}</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Vendor</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900">{query.vendor_name}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Created</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-900">{new Date(query.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Category</Label>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-slate-600 border-slate-300">
                      {query.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Description</Label>
                <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-900 leading-relaxed">{query.description}</p>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-500">
                Last updated: {new Date(query.updated_at).toLocaleString()}
              </div>
            </div>
          </div>

          {query.admin_response && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-blue-50 px-6 py-4">
                <h3 className="flex items-center gap-2 text-lg font-medium text-blue-900">
                  <MessageSquare className="h-5 w-5" />
                  Admin Response
                </h3>
              </div>
              <div className="p-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-900 leading-relaxed">{query.admin_response}</p>
                </div>
              </div>
            </div>
          )}

          {query.follow_up_query && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-cyan-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-medium text-cyan-900">
                    <MessageSquare className="h-5 w-5" />
                    Follow-up Query
                  </h3>
                  <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 border text-xs">
                    {new Date(query.follow_up_date!).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <p className="text-cyan-900 leading-relaxed">{query.follow_up_query}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {query.status !== "closed" && (
              <Button
                onClick={handleMarkAsResolved}
                disabled={resolving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {resolving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Marking as Resolved...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </>
                )}
              </Button>
            )}
          </div>

          {canFollowUp && (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h3 className="text-lg font-medium text-slate-900">Submit Follow-up Query</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="If you need further clarification or the solution didn't work, please describe your issue..."
                    value={followUpText}
                    onChange={(e) => setFollowUpText(e.target.value)}
                    rows={4}
                    disabled={submitting}
                    className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                  <Button
                    onClick={handleFollowUpQuery}
                    disabled={submitting || !followUpText.trim()}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueryDetailsPage
