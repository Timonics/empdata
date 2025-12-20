import React from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  User,
  Building,
  Users,
} from "lucide-react";

interface PendingItem {
  id: string;
  name: string;
  type: "Individual" | "Corporate" | "Group Life";
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  policyType?: string;
  documents: number;
}

const PendingApprovalComponent: React.FC = () => {
  // Dummy data
  const pendingItems: PendingItem[] = [
    {
      id: "APP-001",
      name: "John Doe",
      type: "Individual",
      submittedDate: "2024-01-15",
      status: "pending",
      policyType: "Life Insurance",
      documents: 3,
    },
    {
      id: "APP-002",
      name: "Tech Solutions Inc.",
      type: "Corporate",
      submittedDate: "2024-01-14",
      status: "pending",
      policyType: "Employee Benefits",
      documents: 5,
    },
    {
      id: "APP-003",
      name: "Sarah Johnson",
      type: "Individual",
      submittedDate: "2024-01-13",
      status: "pending",
      policyType: "Health Insurance",
      documents: 4,
    },
    {
      id: "APP-004",
      name: "Global Manufacturing Ltd",
      type: "Corporate",
      submittedDate: "2024-01-12",
      status: "pending",
      policyType: "Group Life",
      documents: 6,
    },
    {
      id: "APP-005",
      name: "Michael Brown",
      type: "Individual",
      submittedDate: "2024-01-11",
      status: "pending",
      policyType: "Retirement Plan",
      documents: 3,
    },
    {
      id: "APP-006",
      name: "Retail Chain Co.",
      type: "Group Life",
      submittedDate: "2024-01-10",
      status: "pending",
      policyType: "Employee Group Life",
      documents: 7,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Individual":
        return <User className="w-4 h-4" />;
      case "Corporate":
        return <Building className="w-4 h-4" />;
      case "Group Life":
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Approvals
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {pendingItems.length} applications awaiting review
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              This Week
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Application
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.policyType}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{item.id}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        item.type === "Individual"
                          ? "bg-blue-100 text-blue-600"
                          : item.type === "Corporate"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-900">
                    {formatDate(item.submittedDate)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.floor(
                      (Date.now() - new Date(item.submittedDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-1">
                      {Array.from({ length: Math.min(item.documents, 3) }).map(
                        (_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs text-gray-700"
                          >
                            {i === 2 && item.documents > 3
                              ? `+${item.documents - 2}`
                              : i + 1}
                          </div>
                        )
                      )}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {item.documents} files
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      Review
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">
                Individual (
                {pendingItems.filter((i) => i.type === "Individual").length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-gray-600">
                Corporate (
                {pendingItems.filter((i) => i.type === "Corporate").length})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">
                Group Life (
                {pendingItems.filter((i) => i.type === "Group Life").length})
              </span>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
            View All Applications →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalComponent;
