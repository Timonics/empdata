import React from "react";
import { 
  UserPlus, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Upload, 
  Edit, 
  MessageSquare,
  DollarSign,
  Shield
} from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  icon: React.ReactNode;
  type: "success" | "warning" | "error" | "info";
}

const RecentActivitiesComponent: React.FC = () => {
  // Dummy data
  const activities: Activity[] = [
    {
      id: "1",
      user: "John Smith",
      action: "submitted",
      target: "new onboarding application",
      timestamp: "2024-01-15T10:30:00",
      icon: <Upload className="w-4 h-4" />,
      type: "info"
    },
    {
      id: "2",
      user: "Admin User",
      action: "approved",
      target: "Tech Solutions Inc. corporate account",
      timestamp: "2024-01-15T09:15:00",
      icon: <CheckCircle className="w-4 h-4" />,
      type: "success"
    },
    {
      id: "3",
      user: "Sarah Johnson",
      action: "uploaded",
      target: "additional identity documents",
      timestamp: "2024-01-14T16:45:00",
      icon: <FileText className="w-4 h-4" />,
      type: "info"
    },
    {
      id: "4",
      user: "Admin User",
      action: "requested",
      target: "verification for Global Manufacturing",
      timestamp: "2024-01-14T14:20:00",
      icon: <Clock className="w-4 h-4" />,
      type: "warning"
    },
    {
      id: "5",
      user: "Michael Brown",
      action: "completed",
      target: "KYC verification process",
      timestamp: "2024-01-14T11:10:00",
      icon: <Shield className="w-4 h-4" />,
      type: "success"
    },
    {
      id: "6",
      user: "Admin User",
      action: "rejected",
      target: "incomplete application #APP-007",
      timestamp: "2024-01-13T17:30:00",
      icon: <XCircle className="w-4 h-4" />,
      type: "error"
    },
    {
      id: "7",
      user: "Emma Wilson",
      action: "created",
      target: "new policy application",
      timestamp: "2024-01-13T15:45:00",
      icon: <UserPlus className="w-4 h-4" />,
      type: "info"
    },
    {
      id: "8",
      user: "Admin User",
      action: "updated",
      target: "premium rates for group policies",
      timestamp: "2024-01-13T13:20:00",
      icon: <Edit className="w-4 h-4" />,
      type: "info"
    },
    {
      id: "9",
      user: "David Chen",
      action: "processed",
      target: "premium payment of $2,500",
      timestamp: "2024-01-12T16:15:00",
      icon: <DollarSign className="w-4 h-4" />,
      type: "success"
    },
    {
      id: "10",
      user: "Customer Support",
      action: "responded to",
      target: "query about claim process",
      timestamp: "2024-01-12T14:40:00",
      icon: <MessageSquare className="w-4 h-4" />,
      type: "info"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-600 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 168) { // 7 days
      const days = Math.floor(diffInHours / 24);
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getTimeOfDay = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    if (hours < 12) return "Morning";
    if (hours < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <p className="text-sm text-gray-500 mt-1">Latest actions in the system</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Today
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              This Week
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              All Time
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg border ${getTypeColor(activity.type)}`}>
                {activity.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-900 font-medium">
                    <span className="text-blue-600">{activity.user}</span>
                    <span className="text-gray-700"> {activity.action} </span>
                    <span className="text-gray-900">{activity.target}</span>
                  </p>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                    {getTimeOfDay(activity.timestamp)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === "success" ? "bg-green-500" :
                  activity.type === "warning" ? "bg-yellow-500" :
                  activity.type === "error" ? "bg-red-500" : "bg-blue-500"
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activities.filter(a => a.type === "info").length}
            </div>
            <div className="text-sm text-gray-600">Information</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {activities.filter(a => a.type === "success").length}
            </div>
            <div className="text-sm text-gray-600">Success</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {activities.filter(a => a.type === "warning").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {activities.filter(a => a.type === "error").length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivitiesComponent;