// components/verification/VerificationStatusComponent.tsx
import React from "react";
import { 
  Clock, 
  CheckCircle, 
  UserCheck, 
  Shield, 
  User, 
  XCircle,
  AlertCircle
} from "lucide-react";

interface VerificationStatusComponentProps {
  currentStatus: "pending" | "approved" | "invited" | "active" | "verified" | "rejected";
  applicantType?: "individual" | "corporate";
  applicantName?: string;
  dateSubmitted?: string;
}

const VerificationStatusComponent: React.FC<VerificationStatusComponentProps> = ({
  currentStatus = "invited",
  applicantType = "corporate",
  applicantName = "Tech Solutions Inc.",
  dateSubmitted = "2024-01-15"
}) => {
  const statusOrder: { 
    key: string; 
    label: string; 
    description: string; 
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      key: "pending",
      label: "Pending",
      description: "Application submitted and awaiting initial review",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-gray-400"
    },
    {
      key: "approved",
      label: "Approved",
      description: "Initial review completed and approved",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      key: "invited",
      label: "Invited",
      description: applicantType === "corporate" 
        ? "Director invited for KYC verification" 
        : "Customer invited for KYC verification",
      icon: <UserCheck className="w-5 h-5" />,
      color: "bg-purple-500"
    },
    {
      key: "active",
      label: "Active",
      description: "KYC completed, account is now active",
      icon: <User className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      key: "verified",
      label: "Verified",
      description: "Full verification completed",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-indigo-600"
    }
  ];

  const currentStatusIndex = statusOrder.findIndex(status => status.key === currentStatus);
  const isRejected = currentStatus === "rejected";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Verification Status</h2>
          <p className="text-gray-600 mt-1">
            {applicantType === "corporate" ? "Company" : "Individual"}:{" "}
            <span className="font-semibold">{applicantName}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Submitted on {formatDate(dateSubmitted)}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isRejected
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
            {isRejected ? (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Application Rejected
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </>
            )}
          </span>
        </div>
      </div>

      {isRejected ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Application Rejected</h3>
              <p className="text-red-700 mt-1">
                This application has been rejected during the verification process.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span>Incomplete documentation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span>Director identity verification failed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle className="w-4 h-4" />
                  <span>CAC document validation failed</span>
                </div>
              </div>
              <button className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                View Rejection Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="relative mb-12">
            {/* Background Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            {/* Colored Progress Line */}
            <div 
              className="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all duration-500"
              style={{ 
                width: `${(currentStatusIndex + 1) / statusOrder.length * 100}%` 
              }}
            ></div>

            {/* Status Points */}
            <div className="relative flex justify-between">
              {statusOrder.map((status, index) => {
                const isActive = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                
                return (
                  <div key={status.key} className="relative">
                    {/* Status Point */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-300 ${
                      isActive 
                        ? `${status.color} text-white` 
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {isActive ? status.icon : index + 1}
                    </div>
                    
                    {/* Status Label */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {status.label}
                      </div>
                      {isCurrent && (
                        <div className="mt-1 text-xs text-blue-600 font-medium">
                          Current Step
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                statusOrder[currentStatusIndex]?.color.replace('bg-', 'bg-')
              } bg-opacity-10`}>
                <div className={statusOrder[currentStatusIndex]?.color.replace('bg-', 'text-')}>
                  {statusOrder[currentStatusIndex]?.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {statusOrder[currentStatusIndex]?.label} Status
                </h3>
                <p className="text-gray-600 mt-1">
                  {statusOrder[currentStatusIndex]?.description}
                </p>
                
                {/* Next Steps */}
                {currentStatusIndex < statusOrder.length - 1 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Next Steps:</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">
                        {statusOrder[currentStatusIndex + 1]?.description}
                      </span>
                    </div>
                    {currentStatusIndex + 2 < statusOrder.length && (
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        <span className="text-sm text-gray-500">
                          {statusOrder[currentStatusIndex + 2]?.description}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Estimated Timeline */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Estimated Completion:</span>
                      <p className="text-sm text-gray-600">
                        {(() => {
                          const daysRemaining = (statusOrder.length - 1 - currentStatusIndex) * 2;
                          const completionDate = new Date();
                          completionDate.setDate(completionDate.getDate() + daysRemaining);
                          return completionDate.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                          });
                        })()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">Progress:</span>
                      <p className="text-sm text-gray-600">
                        {Math.round((currentStatusIndex + 1) / statusOrder.length * 100)}% Complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {currentStatus === "pending" && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Start Review
              </button>
            )}
            {currentStatus === "approved" && (
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Send Invitation
              </button>
            )}
            {currentStatus === "invited" && (
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Mark as Active
              </button>
            )}
            {currentStatus === "active" && (
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                Complete Verification
              </button>
            )}
            
            {/* Common Actions */}
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Request More Info
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
              Reject Application
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Download Documents
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Status Preview Component (for testing different statuses)
export const VerificationStatusPreview: React.FC = () => {
  const statuses: Array<VerificationStatusComponentProps['currentStatus']> = [
    "pending", "approved", "invited", "active", "verified", "rejected"
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Preview All Statuses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statuses.map((status) => (
          <div key={status} className="border rounded-lg p-4">
            <div className="mb-2 text-sm font-medium text-gray-700">
              Status: <span className="capitalize">{status}</span>
            </div>
            <div className="scale-75 origin-top-left">
              <VerificationStatusComponent 
                currentStatus={status}
                applicantType="corporate"
                applicantName="Sample Company"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStatusComponent;