import { Clock, Eye } from "lucide-react";
import React from "react";

const PendingApprovals: React.FC = () => {
  interface Approval {
    id: string;
    project: string;
    amount: number;
    invoices: number;
    status: string;
    createdBy: string;
  }

  const approvals: Approval[] = [
    // {
    //   id: "INST-2025-012",
    //   project: "Riverside Commercial Complex",
    //   amount: 125000,
    //   invoices: 3,
    //   status: "Waiting for Approver 1",
    //   createdBy: "John Smith",
    // },
    // {
    //   id: "INST-2025-015",
    //   project: "Downtown Office Tower",
    //   amount: 95000,
    //   invoices: 2,
    //   status: "Waiting for Approver 2",
    //   createdBy: "Sarah Johnson",
    // },
    // {
    //   id: "INST-2025-018",
    //   project: "School Expansion Project",
    //   amount: 68000,
    //   invoices: 4,
    //   status: "Waiting for Approver 1",
    //   createdBy: "Michael Chen",
    // },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="text-gray-900">Pending Approvals</h3>
        </div>
        <button
          className="text-[#0078D4] hover:text-[#106EBE] transition-colors text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {approvals.map((approval, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <div className="text-gray-900 text-sm mb-1">{approval.id}</div>
              <div className="text-gray-600 text-xs">{approval.project}</div>
            </div>
            <div className="text-right mr-4">
              <div className="text-gray-900 text-sm">
                ${approval.amount.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">
                {approval.invoices} invoices
              </div>
            </div>
            <button className="text-[#0078D4] hover:text-[#106EBE] transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {approvals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No pending approvals
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
