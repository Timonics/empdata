import { CheckCircle, DollarSign, FileText, FolderKanban, Users } from "lucide-react";
import React from "react";

const RecentActivityTimeline: React.FC = () => {
  const activities = [
    {
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Instruction Approved",
      description: "INST-2025-010 approved by Finance Manager",
      user: "Emily Rodriguez",
      time: "2 hours ago",
    },
    {
      icon: DollarSign,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Payment Processed",
      description: "Client payment received: $250,000",
      user: "System",
      time: "4 hours ago",
    },
    {
      icon: FileText,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "New Invoice Submitted",
      description: "Invoice INV-2025-024 submitted for approval",
      user: "David Wilson",
      time: "6 hours ago",
    },
    {
      icon: FolderKanban,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Project Status Updated",
      description: "Shopping Mall Renovation moved to Ongoing",
      user: "John Smith",
      time: "1 day ago",
    },
    {
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      title: "Staff Assigned",
      description: "New team member assigned to Hospital Wing",
      user: "Sarah Johnson",
      time: "1 day ago",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
      <h3 className="text-gray-900 mb-6">Recent </h3>

      {/* <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex gap-4">
              <div
                className={`w-10 h-10 ${activity.iconBg} rounded-lg flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 text-sm mb-1">
                  {activity.title}
                </div>
                <div className="text-gray-600 text-xs mb-1">
                  {activity.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default RecentActivityTimeline;
