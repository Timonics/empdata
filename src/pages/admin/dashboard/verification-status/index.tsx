// import { Button } from "@/components/ui/button";
// import {
//   verificationData,
//   verificationWorkFlow,
// } from "@/lib/admin/verification";
// import React from "react";

// const VerificationStatus: React.FC = () => {
//   return (
//     <div className="py-2 h-full w-full flex flex-col gap-4">
//       <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         {verificationData.map((data) => {
//           const Icon = data.icon;
//           return (
//             <div className="p-4 py-8 flex flex-col gap-1 rounded-xl border-2 border-black/10">
//               <div className="flex flex-col font-medium text-black/50 items-start gap-2">
//                 <Button
//                   variant={"outline"}
//                   size={"icon-sm"}
//                   className="pointer-events-none"
//                 >
//                   <Icon className={`${data.color}`} />
//                 </Button>
//                 <h6 className="">{data.name}</h6>
//               </div>
//               <p className={`font-semibold text-2xl ${data.color}`}>
//                 {data.amount}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//       <hr className="border border-black/10 " />
//       <h2 className="mt-4 text-3xl pl-4">Verification Workflow</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4 w-full min-h-[400px] overflow-auto">
//         {verificationWorkFlow.map((data) => (
//           <div
//             key={data.name}
//             className="border border-muted-foreground/50 rounded-xl flex flex-col gap-2 shadow-md"
//           >
//             <div className="border-b border-muted-foreground/50 p-2 py-4">
//               <h4 className="text-center text-gray-600 font-semibold">
//                 {data.name}
//               </h4>
//             </div>
//             <div className="p-2 space-y-2">
//               {data.data.map((item) => (
//                 <div
//                   key={item.name}
//                   className="border border-muted-foreground/50 rounded-lg"
//                 >
//                   <p
//                     className={`p-1 text-xs rounded-tl-lg rounded-br-lg w-fit text-white ${
//                       item.type === "Company" ? "bg-black" : "bg-sky-400"
//                     }`}
//                   >
//                     {item.type.toUpperCase()}
//                   </p>
//                   <div className="p-2 flex items-center justify-between border-b border-muted-foreground/50">
//                     <p className="text-lg font-bold mt-2 text-wrap">
//                       {item.name}
//                     </p>
//                     {/* <p className="text-sm">May 15, 2025</p> */}
//                   </div>
//                   <div className="p-2 space-y-2">
//                     <p className="font-medium text-gray-600">
//                       Submitted documents:
//                     </p>
//                     <div className="space-y-4">
//                       {item.submitted_docs.map((doc, index) => (
//                         <div
//                           key={index}
//                           className="bg-black/5 shadow-md p-2 rounded-sm flex justify-between"
//                         >
//                           {doc}
//                           <button className="text-xs p-1 px-2 rounded-sm border bg-black text-white">
//                             View
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//       <hr className="border border-black/10" />
//       <p className="mt-4 text-3xl pl-4">Quick Actions</p>
//       <div className="flex p-2 flex-col w-full lg:w-[90%] mx-auto items-center justify-center md:flex-row gap-4">
//         {[
//           { name: "Flagged Accounts" },
//           { name: "Document Approval" },
//           { name: "Pending Reviews" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               if (index === 0) {
//                 // setAddClient(true);
//               }
//             }}
//             className="p-6 w-full lg:w-1/3 rounded-xl shadow-xl bg-linear-to-br from-gray-800 to-black text-gray-400 font-medium hover:scale-95 transition duration-300 ease-in-out hover:text-sky-400"
//           >
//             <h4 className="text-center">{item.name}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VerificationStatus;


// pages/verification-status/index.tsx
import React, { useState } from "react";
import { 
  Search, 
  Download, 
  User, 
  Building, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Mail,
  Users,
  Shield,
  TrendingUp,
  MoreVertical,
  FileText,
  BarChart3
} from "lucide-react";
import { Link } from "react-router";

interface VerificationStatusItem {
  id: string;
  type: "individual" | "corporate" | "group_life";
  name: string;
  email: string;
  phone: string;
  submittedDate: string;
  status: "pending" | "approved" | "invited" | "active" | "verified" | "rejected";
  policyType?: string;
  documents: number;
  verifiedDocuments: number;
  lastActivity: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
}

const VerificationStatusPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("newest");

  // Dummy data
  const verificationItems: VerificationStatusItem[] = [
    {
      id: "APP-001",
      type: "corporate",
      name: "Tech Solutions Inc.",
      email: "contact@techsolutions.com",
      phone: "+234 801 234 5678",
      submittedDate: "2024-01-15",
      status: "invited",
      policyType: "Employee Group Life",
      documents: 6,
      verifiedDocuments: 4,
      lastActivity: "2024-01-18T14:30:00",
      assignee: "Sarah Johnson",
      priority: "high"
    },
    {
      id: "APP-002",
      type: "individual",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 802 345 6789",
      submittedDate: "2024-01-14",
      status: "pending",
      policyType: "Life Insurance",
      documents: 3,
      verifiedDocuments: 1,
      lastActivity: "2024-01-14T11:20:00",
      priority: "medium"
    },
    {
      id: "APP-003",
      type: "group_life",
      name: "Manufacturing Ltd.",
      email: "hr@manufacturing.com",
      phone: "+234 803 456 7890",
      submittedDate: "2024-01-13",
      status: "active",
      policyType: "Group Life",
      documents: 8,
      verifiedDocuments: 8,
      lastActivity: "2024-01-18T09:15:00",
      assignee: "Michael Brown",
      priority: "medium"
    },
    {
      id: "APP-004",
      type: "corporate",
      name: "Retail Chain Co.",
      email: "admin@retailchain.com",
      phone: "+234 804 567 8901",
      submittedDate: "2024-01-12",
      status: "approved",
      policyType: "Employee Benefits",
      documents: 5,
      verifiedDocuments: 3,
      lastActivity: "2024-01-16T15:45:00",
      assignee: "Emma Wilson",
      priority: "high"
    },
    {
      id: "APP-005",
      type: "individual",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+234 805 678 9012",
      submittedDate: "2024-01-11",
      status: "verified",
      policyType: "Health Insurance",
      documents: 4,
      verifiedDocuments: 4,
      lastActivity: "2024-01-17T10:30:00",
      priority: "low"
    },
    {
      id: "APP-006",
      type: "corporate",
      name: "Finance Solutions Ltd.",
      email: "info@financesolutions.com",
      phone: "+234 806 789 0123",
      submittedDate: "2024-01-10",
      status: "rejected",
      policyType: "Corporate Insurance",
      documents: 7,
      verifiedDocuments: 2,
      lastActivity: "2024-01-15T16:20:00",
      assignee: "Admin User",
      priority: "medium"
    },
    {
      id: "APP-007",
      type: "individual",
      name: "Michael Brown",
      email: "michael.b@email.com",
      phone: "+234 807 890 1234",
      submittedDate: "2024-01-09",
      status: "invited",
      policyType: "Retirement Plan",
      documents: 3,
      verifiedDocuments: 2,
      lastActivity: "2024-01-17T14:10:00",
      assignee: "David Chen",
      priority: "medium"
    },
    {
      id: "APP-008",
      type: "group_life",
      name: "Hospitality Group",
      email: "support@hospitality.com",
      phone: "+234 808 901 2345",
      submittedDate: "2024-01-08",
      status: "pending",
      policyType: "Employee Group Life",
      documents: 6,
      verifiedDocuments: 2,
      lastActivity: "2024-01-08T13:25:00",
      priority: "high"
    },
    {
      id: "APP-009",
      type: "corporate",
      name: "Logistics Company",
      email: "contact@logistics.com",
      phone: "+234 809 012 3456",
      submittedDate: "2024-01-07",
      status: "active",
      policyType: "Group Insurance",
      documents: 5,
      verifiedDocuments: 5,
      lastActivity: "2024-01-18T11:45:00",
      assignee: "Sarah Johnson",
      priority: "low"
    },
    {
      id: "APP-010",
      type: "individual",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+234 810 123 4567",
      submittedDate: "2024-01-06",
      status: "approved",
      policyType: "Life Insurance",
      documents: 3,
      verifiedDocuments: 2,
      lastActivity: "2024-01-16T09:30:00",
      priority: "medium"
    }
  ];

  // Stats calculation
  const stats = {
    total: verificationItems.length,
    pending: verificationItems.filter(item => item.status === "pending").length,
    approved: verificationItems.filter(item => item.status === "approved").length,
    invited: verificationItems.filter(item => item.status === "invited").length,
    active: verificationItems.filter(item => item.status === "active").length,
    verified: verificationItems.filter(item => item.status === "verified").length,
    rejected: verificationItems.filter(item => item.status === "rejected").length,
    corporate: verificationItems.filter(item => item.type === "corporate").length,
    individual: verificationItems.filter(item => item.type === "individual").length,
    groupLife: verificationItems.filter(item => item.type === "group_life").length,
    highPriority: verificationItems.filter(item => item.priority === "high").length,
    assigned: verificationItems.filter(item => item.assignee).length,
    assignee: "",
    avgDocuments: Math.round(verificationItems.reduce((acc, item) => acc + item.documents, 0) / verificationItems.length),
    avgVerificationTime: "2.5 days" // This would be calculated in real app
  };

  // Filter options
  const types = [
    { id: "all", name: "All Types" },
    { id: "corporate", name: "Corporate" },
    { id: "individual", name: "Individual" },
    { id: "group_life", name: "Group Life" }
  ];

  const statuses = [
    { id: "all", name: "All Status" },
    { id: "pending", name: "Pending" },
    { id: "approved", name: "Approved" },
    { id: "invited", name: "Invited" },
    { id: "active", name: "Active" },
    { id: "verified", name: "Verified" },
    { id: "rejected", name: "Rejected" }
  ];

  const priorities = [
    { id: "all", name: "All Priorities" },
    { id: "high", name: "High" },
    { id: "medium", name: "Medium" },
    { id: "low", name: "Low" }
  ];

  // Filter logic
  const filteredItems = verificationItems.filter(item => {
    const matchesSearch = 
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Sort logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { 
          icon: <Clock className="w-4 h-4" />, 
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          progressColor: "bg-yellow-500",
          percentage: 20
        };
      case "approved":
        return { 
          icon: <CheckCircle className="w-4 h-4" />, 
          color: "bg-blue-100 text-blue-800 border-blue-200",
          progressColor: "bg-blue-500",
          percentage: 40
        };
      case "invited":
        return { 
          icon: <Mail className="w-4 h-4" />, 
          color: "bg-purple-100 text-purple-800 border-purple-200",
          progressColor: "bg-purple-500",
          percentage: 60
        };
      case "active":
        return { 
          icon: <User className="w-4 h-4" />, 
          color: "bg-green-100 text-green-800 border-green-200",
          progressColor: "bg-green-500",
          percentage: 80
        };
      case "verified":
        return { 
          icon: <Shield className="w-4 h-4" />, 
          color: "bg-indigo-100 text-indigo-800 border-indigo-200",
          progressColor: "bg-indigo-500",
          percentage: 100
        };
      case "rejected":
        return { 
          icon: <XCircle className="w-4 h-4" />, 
          color: "bg-red-100 text-red-800 border-red-200",
          progressColor: "bg-red-500",
          percentage: 0
        };
      default:
        return { 
          icon: <Clock className="w-4 h-4" />, 
          color: "bg-gray-100 text-gray-800 border-gray-200",
          progressColor: "bg-gray-500",
          percentage: 0
        };
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "corporate": return <Building className="w-4 h-4" />;
      case "individual": return <User className="w-4 h-4" />;
      case "group_life": return <Users className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "corporate": return "bg-blue-100 text-blue-600";
      case "individual": return "bg-green-100 text-green-600";
      case "group_life": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Export function
  const handleExport = () => {
    // In real app, this would generate CSV/Excel
    console.log("Exporting verification status...");
    alert("Export functionality would generate a report in a real application");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verification Status</h1>
            <p className="text-gray-600 mt-1">Overview of all application verification progress</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>+12% from last week</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {stats.pending + stats.approved + stats.invited}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Avg time: {stats.avgVerificationTime}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {stats.active + stats.verified}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {Math.round((stats.active + stats.verified) / stats.total * 100)}% completion rate
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.highPriority}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {stats.assignee ? `${stats.assigned} assigned` : "Unassigned"}
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statuses.slice(1).map(status => {
            const count = verificationItems.filter(item => item.status === status.id).length;
            const percentage = Math.round((count / stats.total) * 100);
            const statusInfo = getStatusInfo(status.id);
            
            return (
              <div key={status.id} className="text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${statusInfo.color} mb-2`}>
                  {statusInfo.icon}
                  <span className="text-sm font-medium">{status.name}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{percentage}%</div>
                <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${statusInfo.progressColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filter Applications</h2>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedStatus("all");
              setSelectedPriority("all");
            }}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, ID..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("newest")}
              className={`px-3 py-1.5 border rounded-lg text-sm font-medium ${
                sortBy === "newest"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortBy("oldest")}
              className={`px-3 py-1.5 border rounded-lg text-sm font-medium ${
                sortBy === "oldest"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Oldest First
            </button>
            <button
              onClick={() => setSortBy("priority")}
              className={`px-3 py-1.5 border rounded-lg text-sm font-medium ${
                sortBy === "priority"
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Priority
            </button>
          </div>
          
          <div className="ml-auto text-sm text-gray-600">
            Showing {filteredItems.length} of {verificationItems.length} applications
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status Progress
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedItems.map((item) => {
                const statusInfo = getStatusInfo(item.status);
                const documentPercentage = Math.round((item.verifiedDocuments / item.documents) * 100);
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-gray-900 truncate">{item.name}</div>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 truncate">{item.email}</div>
                          <div className="text-xs text-gray-400 mt-1">{item.id}</div>
                          {item.policyType && (
                            <div className="text-xs text-gray-600 mt-1">{item.policyType}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="text-sm font-medium capitalize">{item.status}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block">
                                {statusInfo.percentage}%
                              </span>
                            </div>
                          </div>
                          <div className="flex h-2 mb-4 overflow-hidden rounded bg-gray-200">
                            <div 
                              style={{ width: `${statusInfo.percentage}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${statusInfo.progressColor}`}
                            />
                          </div>
                        </div>
                        
                        {item.assignee && (
                          <div className="text-xs text-gray-600">
                            Assignee: <span className="font-medium">{item.assignee}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.verifiedDocuments}/{item.documents}
                          </span>
                          <span className="text-xs text-gray-500">verified</span>
                        </div>
                        
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${documentPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${documentPercentage}%` }}
                          />
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          {documentPercentage}% complete
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">{formatDate(item.submittedDate)}</div>
                      <div className="text-xs text-gray-500">
                        {Math.floor((Date.now() - new Date(item.submittedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">{formatTimeAgo(item.lastActivity)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/verification/${item.id}`}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{sortedItems.length}</span> of{' '}
              <span className="font-medium">{sortedItems.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Application Type Distribution</h3>
          <div className="space-y-4">
            {types.slice(1).map(type => {
              const count = verificationItems.filter(item => item.type === type.id).length;
              const percentage = Math.round((count / stats.total) * 100);
              
              return (
                <div key={type.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(type.id)}`}>
                        {getTypeIcon(type.id)}
                      </div>
                      <span className="font-medium text-gray-900">{type.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{count}</span>
                      <span className="text-sm text-gray-600 ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getTypeColor(type.id).split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Priority Distribution</h3>
          <div className="space-y-4">
            {priorities.slice(1).map(priority => {
              const count = verificationItems.filter(item => item.priority === priority.id).length;
              const percentage = Math.round((count / stats.total) * 100);
              
              return (
                <div key={priority.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full ${getPriorityColor(priority.id)}`}>
                        <span className="text-sm font-medium">{priority.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">{count}</span>
                      <span className="text-sm text-gray-600 ml-2">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPriorityColor(priority.id).split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Unassigned applications
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {stats.total - stats.assigned}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusPage;