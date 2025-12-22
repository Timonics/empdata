// pages/audit-log/index.tsx
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Building, 
  Shield, 
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  ArrowUpDown,
  MoreVertical,
  UserPlus,
  Lock,
  Unlock,
  Mail,
  Clock
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Types
interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    role: string;
    type: "admin" | "user" | "system";
  };
  action: string;
  category: "authentication" | "user_management" | "document" | "policy" | "system";
  target: string;
  details: string;
  ipAddress: string;
  status: "success" | "failure" | "warning";
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

const AuditLogPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUserType, setSelectedUserType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Dummy audit log data
  const auditLogs: AuditLog[] = [
    {
      id: "AUDIT-001",
      timestamp: "2024-01-18T14:30:00",
      user: { id: "ADMIN-001", name: "Admin User", role: "System Admin", type: "admin" },
      action: "USER_LOGIN",
      category: "authentication",
      target: "User: john.doe@company.com",
      details: "User logged in successfully",
      ipAddress: "192.168.1.100",
      status: "success"
    },
    {
      id: "AUDIT-002",
      timestamp: "2024-01-18T14:25:00",
      user: { id: "ADMIN-002", name: "Sarah Johnson", role: "Verification Officer", type: "admin" },
      action: "DOCUMENT_APPROVED",
      category: "document",
      target: "Document: Director_Passport.jpg",
      details: "Approved identity document for Tech Solutions Inc.",
      ipAddress: "192.168.1.101",
      status: "success",
      changes: [
        { field: "Status", oldValue: "Pending", newValue: "Approved" }
      ]
    },
    {
      id: "AUDIT-003",
      timestamp: "2024-01-18T14:20:00",
      user: { id: "ADMIN-003", name: "Michael Brown", role: "Compliance Officer", type: "admin" },
      action: "USER_STATUS_CHANGED",
      category: "user_management",
      target: "User: Tech Solutions Inc.",
      details: "Changed user status from 'Pending' to 'Active'",
      ipAddress: "192.168.1.102",
      status: "success",
      changes: [
        { field: "Status", oldValue: "Pending", newValue: "Active" },
        { field: "Verified", oldValue: "No", newValue: "Yes" }
      ]
    },
    {
      id: "AUDIT-004",
      timestamp: "2024-01-18T14:15:00",
      user: { id: "USER-001", name: "John Doe", role: "Customer", type: "user" },
      action: "POLICY_CREATED",
      category: "policy",
      target: "Policy: PL-2024-001",
      details: "Created new life insurance policy",
      ipAddress: "203.0.113.50",
      status: "success"
    },
    {
      id: "AUDIT-005",
      timestamp: "2024-01-18T14:10:00",
      user: { id: "SYSTEM-001", name: "System", role: "Automated System", type: "system" },
      action: "BACKUP_COMPLETED",
      category: "system",
      target: "System: Database Backup",
      details: "Nightly database backup completed successfully",
      ipAddress: "127.0.0.1",
      status: "success"
    },
    {
      id: "AUDIT-006",
      timestamp: "2024-01-18T14:05:00",
      user: { id: "ADMIN-004", name: "Emma Wilson", role: "Support Agent", type: "admin" },
      action: "LOGIN_FAILED",
      category: "authentication",
      target: "User: admin@test.com",
      details: "Failed login attempt - Invalid credentials",
      ipAddress: "198.51.100.23",
      status: "failure"
    },
    {
      id: "AUDIT-007",
      timestamp: "2024-01-18T14:00:00",
      user: { id: "ADMIN-001", name: "Admin User", role: "System Admin", type: "admin" },
      action: "USER_DELETED",
      category: "user_management",
      target: "User: Test Company Ltd.",
      details: "Deleted user account and all associated data",
      ipAddress: "192.168.1.100",
      status: "warning"
    },
    {
      id: "AUDIT-008",
      timestamp: "2024-01-18T13:55:00",
      user: { id: "USER-002", name: "Jane Smith", role: "Director", type: "user" },
      action: "DOCUMENT_UPLOADED",
      category: "document",
      target: "Document: CAC_Certificate.pdf",
      details: "Uploaded company registration document",
      ipAddress: "203.0.113.51",
      status: "success"
    },
    {
      id: "AUDIT-009",
      timestamp: "2024-01-18T13:50:00",
      user: { id: "ADMIN-002", name: "Sarah Johnson", role: "Verification Officer", type: "admin" },
      action: "POLICY_UPDATED",
      category: "policy",
      target: "Policy: GL-2024-001",
      details: "Updated premium amount for group life policy",
      ipAddress: "192.168.1.101",
      status: "success",
      changes: [
        { field: "Premium", oldValue: "$4,500", newValue: "$5,000" },
        { field: "Coverage", oldValue: "$450,000", newValue: "$500,000" }
      ]
    },
    {
      id: "AUDIT-010",
      timestamp: "2024-01-18T13:45:00",
      user: { id: "SYSTEM-002", name: "Cron Job", role: "Scheduled Task", type: "system" },
      action: "CLEANUP_COMPLETED",
      category: "system",
      target: "System: Temp Files",
      details: "Cleaned up temporary files and logs",
      ipAddress: "127.0.0.1",
      status: "success"
    },
    {
      id: "AUDIT-011",
      timestamp: "2024-01-18T13:40:00",
      user: { id: "ADMIN-003", name: "Michael Brown", role: "Compliance Officer", type: "admin" },
      action: "PERMISSION_CHANGED",
      category: "user_management",
      target: "User: Verification Team",
      details: "Updated user permissions for verification team",
      ipAddress: "192.168.1.102",
      status: "success",
      changes: [
        { field: "Permissions", oldValue: "Read Only", newValue: "Read/Write" }
      ]
    },
    {
      id: "AUDIT-012",
      timestamp: "2024-01-18T13:35:00",
      user: { id: "USER-001", name: "John Doe", role: "Customer", type: "user" },
      action: "PASSWORD_CHANGED",
      category: "authentication",
      target: "User: john.doe@company.com",
      details: "Password changed successfully",
      ipAddress: "203.0.113.50",
      status: "success"
    }
  ];

  // Filter categories
  const categories = [
    { id: "all", name: "All Categories", icon: <Filter className="w-4 h-4" /> },
    { id: "authentication", name: "Authentication", icon: <Lock className="w-4 h-4" /> },
    { id: "user_management", name: "User Management", icon: <UserPlus className="w-4 h-4" /> },
    { id: "document", name: "Documents", icon: <FileText className="w-4 h-4" /> },
    { id: "policy", name: "Policies", icon: <Shield className="w-4 h-4" /> },
    { id: "system", name: "System", icon: <RefreshCw className="w-4 h-4" /> }
  ];

  const userTypes = [
    { id: "all", name: "All Users" },
    { id: "admin", name: "Administrators" },
    { id: "user", name: "Customers" },
    { id: "system", name: "System" }
  ];

  const statuses = [
    { id: "all", name: "All Status" },
    { id: "success", name: "Success" },
    { id: "failure", name: "Failure" },
    { id: "warning", name: "Warning" }
  ];

  // Filter and search logic
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      searchQuery === "" ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory;
    const matchesUserType = selectedUserType === "all" || log.user.type === selectedUserType;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;

    // Date filtering
    const logDate = new Date(log.timestamp);
    const matchesDate = 
      (!startDate || logDate >= startDate) && 
      (!endDate || logDate <= endDate);

    return matchesSearch && matchesCategory && matchesUserType && matchesStatus && matchesDate;
  });

  // Sort logic
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
  });

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      relative: getRelativeTime(date)
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "success":
        return { 
          icon: <CheckCircle className="w-4 h-4" />, 
          color: "bg-green-100 text-green-800 border-green-200",
          iconColor: "text-green-500"
        };
      case "failure":
        return { 
          icon: <XCircle className="w-4 h-4" />, 
          color: "bg-red-100 text-red-800 border-red-200",
          iconColor: "text-red-500"
        };
      case "warning":
        return { 
          icon: <AlertCircle className="w-4 h-4" />, 
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          iconColor: "text-yellow-500"
        };
      default:
        return { 
          icon: <Clock className="w-4 h-4" />, 
          color: "bg-gray-100 text-gray-800 border-gray-200",
          iconColor: "text-gray-500"
        };
    }
  };

  // Get user icon
  const getUserIcon = (type: string) => {
    switch (type) {
      case "admin": return <Building className="w-4 h-4" />;
      case "user": return <User className="w-4 h-4" />;
      case "system": return <RefreshCw className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication": return <Lock className="w-4 h-4" />;
      case "user_management": return <UserPlus className="w-4 h-4" />;
      case "document": return <FileText className="w-4 h-4" />;
      case "policy": return <Shield className="w-4 h-4" />;
      case "system": return <RefreshCw className="w-4 h-4" />;
      default: return <Filter className="w-4 h-4" />;
    }
  };

  // Export function
  const handleExport = () => {
    // In real app, this would generate and download CSV/Excel
    console.log("Exporting logs...");
    alert("Export functionality would generate a CSV file in a real application");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
            <p className="text-gray-600 mt-1">Track all system activities and user actions</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{auditLogs.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Last 30 days
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful Actions</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {auditLogs.filter(log => log.status === "success").length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            98% success rate
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed Actions</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {auditLogs.filter(log => log.status === "failure").length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            2% failure rate
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {auditLogs.filter(log => 
                  new Date(log.timestamp).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Today's activities
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedUserType("all");
              setSelectedStatus("all");
              setDateRange([null, null]);
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
                placeholder="Search logs..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update: any) => setDateRange(update)}
                placeholderText="Select date range"
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Type
            </label>
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {userTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("newest")}
                className={`flex-1 p-2 border rounded-lg font-medium ${
                  sortBy === "newest"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortBy("oldest")}
                className={`flex-1 p-2 border rounded-lg font-medium ${
                  sortBy === "oldest"
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-end">
            <div className="p-2 bg-gray-50 rounded-lg w-full">
              <p className="text-sm text-gray-600">Showing</p>
              <p className="text-lg font-semibold text-gray-900">
                {filteredLogs.length} of {auditLogs.length} logs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User & Action
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedLogs.map((log) => {
                const timestamp = formatTimestamp(log.timestamp);
                const statusInfo = getStatusInfo(log.status);
                
                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{timestamp.date}</div>
                        <div className="text-sm text-gray-500">{timestamp.time}</div>
                        <div className="text-xs text-gray-400 mt-1">{timestamp.relative}</div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          log.user.type === "admin" ? "bg-blue-100 text-blue-600" :
                          log.user.type === "user" ? "bg-green-100 text-green-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {getUserIcon(log.user.type)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{log.user.name}</div>
                          <div className="text-sm text-gray-500">{log.user.role}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="p-1 bg-gray-100 rounded">
                              {getCategoryIcon(log.category)}
                            </div>
                            <span className="text-xs text-gray-600 capitalize">
                              {log.category.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{log.action}</div>
                        <div className="text-sm text-gray-600 mt-1">{log.details}</div>
                        <div className="text-sm text-gray-500 mt-1">{log.target}</div>
                        
                        {/* Show changes if available */}
                        {log.changes && log.changes.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {log.changes.map((change, index) => (
                              <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                                <span className="font-medium">{change.field}:</span>{' '}
                                <span className="line-through text-red-500">{change.oldValue}</span>{' '}
                                →{' '}
                                <span className="text-green-600">{change.newValue}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900 font-mono">{log.ipAddress}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {log.ipAddress === "127.0.0.1" ? "Localhost" : "External"}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusInfo.color}`}>
                        <div className={statusInfo.iconColor}>
                          {statusInfo.icon}
                        </div>
                        <span className="text-sm font-medium capitalize">{log.status}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="More Options"
                        >
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

        {/* Pagination/Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredLogs.length}</span> of{' '}
              <span className="font-medium">{filteredLogs.length}</span> results
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

      {/* Summary */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Activity Summary</h3>
          <div className="space-y-3">
            {categories.slice(1).map(cat => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {cat.icon}
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {auditLogs.filter(log => log.category === cat.id).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Users</h3>
          <div className="space-y-3">
            {Array.from(new Set(auditLogs.map(log => log.user.name)))
              .slice(0, 5)
              .map((userName, index) => {
                const userLogs = auditLogs.filter(log => log.user.name === userName);
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{userName}</div>
                        <div className="text-xs text-gray-500">
                          {userLogs[0]?.user.role}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {userLogs.length} actions
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity Timeline</h3>
          <div className="space-y-4">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full ${
                  log.status === "success" ? "bg-green-500" :
                  log.status === "failure" ? "bg-red-500" : "bg-yellow-500"
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{log.action}</div>
                  <div className="text-xs text-gray-500">
                    {formatTimestamp(log.timestamp).relative}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;