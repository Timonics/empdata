// components/verification/OverviewComponent.tsx
import React from "react";
import { 
  Building, 
  User, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  AlertCircle,
  Users,
  DollarSign,
  CheckCircle,
  XCircle
} from "lucide-react";

interface OverviewComponentProps {
  applicantType: "individual" | "corporate";
  applicantData?: any; // You'll replace with actual type
}

const OverviewComponent: React.FC<OverviewComponentProps> = ({ 
  applicantType, 
}) => {
  // Dummy data - replace with actual props
  const data = {
    id: "APP-001",
    name: applicantType === "corporate" ? "Tech Solutions Inc." : "John Doe",
    email: "contact@techsolutions.com",
    phone: "+234 801 234 5678",
    phoneSecondary: "+234 701 987 6543",
    address: "123 Business Street, Lagos Island, Lagos",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    rcNumber: "RC123456",
    bvn: "22345678901",
    directorName: "Jane Smith",
    directorBvn: "22345678902",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-18",
    policyType: "Employee Group Life",
    beneficiaries: 3,
    totalCoverage: "$500,000",
    premiumAmount: "$5,000/year",
    dateOfBirth: "1985-01-15",
    gender: "Male",
    nationality: "Nigerian",
    bankName: "First Bank",
    accountNumber: "1234567890",
    taxId: "123-45-6789",
    verificationNotes: [
      {
        id: 1,
        author: "Verification Officer",
        timestamp: "2024-01-18T14:30:00",
        content: "All documents verified. Director identification matches records.",
        type: "info"
      },
      {
        id: 2,
        author: "Reviewer",
        timestamp: "2024-01-17T11:15:00",
        content: "Application looks good. Ready for KYC invitation.",
        type: "success"
      },
      {
        id: 3,
        author: "Compliance",
        timestamp: "2024-01-16T09:45:00",
        content: "Need to verify additional address proof.",
        type: "warning"
      }
    ]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-50 border-green-200 text-green-800";
      case "warning": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error": return "bg-red-50 border-red-200 text-red-800";
      default: return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getNoteIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertCircle className="w-4 h-4" />;
      case "error": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Company/Personal Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            {applicantType === "corporate" ? (
              <Building className="w-6 h-6 text-blue-600" />
            ) : (
              <User className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {applicantType === "corporate" ? "Company Information" : "Personal Information"}
            </h3>
            <p className="text-sm text-gray-600">Basic details and contact information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="mt-1 text-gray-900">{data.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <div className="mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{data.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Primary Phone</label>
              <div className="mt-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{data.phone}</p>
              </div>
            </div>
            {applicantType === "corporate" && (
              <div>
                <label className="text-sm font-medium text-gray-500">Secondary Phone</label>
                <div className="mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{data.phoneSecondary}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <div className="mt-1 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <p className="text-gray-900">{data.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">City</label>
                <p className="mt-1 text-gray-900">{data.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">State</label>
                <p className="mt-1 text-gray-900">{data.state}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Country</label>
              <p className="mt-1 text-gray-900">{data.country}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date Submitted</label>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{formatDate(data.submittedDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Corporate/Individual Specific Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">
              {applicantType === "corporate" ? "Corporate Details" : "Personal Details"}
            </h3>
          </div>
          
          <div className="space-y-4">
            {applicantType === "corporate" ? (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-500">RC Number</label>
                  <p className="mt-1 text-gray-900 font-mono">{data.rcNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Director Name</label>
                  <p className="mt-1 text-gray-900">{data.directorName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Director BVN</label>
                  <p className="mt-1 text-gray-900 font-mono">{data.directorBvn}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-500">BVN</label>
                  <p className="mt-1 text-gray-900 font-mono">{data.bvn}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="mt-1 text-gray-900">{formatDate(data.dateOfBirth)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="mt-1 text-gray-900">{data.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nationality</label>
                  <p className="mt-1 text-gray-900">{data.nationality}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Banking Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Banking Information</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Bank Name</label>
              <p className="mt-1 text-gray-900">{data.bankName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Number</label>
              <p className="mt-1 text-gray-900 font-mono">{data.accountNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Tax Identification Number</label>
              <p className="mt-1 text-gray-900">{data.taxId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Policy Information</h3>
            <p className="text-sm text-gray-600">Insurance policy details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Policy Type</label>
            <p className="mt-1 text-gray-900">{data.policyType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Coverage</label>
            <p className="mt-1 text-gray-900 font-semibold">{data.totalCoverage}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Premium Amount</label>
            <p className="mt-1 text-gray-900">{data.premiumAmount}</p>
          </div>
        </div>

        {applicantType === "corporate" && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">Beneficiaries</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {data.beneficiaries} beneficiaries
              </span>
            </div>
            <p className="text-gray-600">
              Total coverage of {data.totalCoverage} distributed among {data.beneficiaries} beneficiaries
            </p>
          </div>
        )}
      </div>

      {/* Verification Notes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Verification Notes</h3>
            <p className="text-sm text-gray-600">Internal notes and comments</p>
          </div>
        </div>

        <div className="space-y-4">
          {data.verificationNotes.map((note: any) => (
            <div 
              key={note.id} 
              className={`p-4 rounded-lg border ${getNoteTypeColor(note.type)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getNoteIcon(note.type)}
                  <span className="text-sm font-medium">{note.author}</span>
                </div>
                <span className="text-xs opacity-75">
                  {formatDate(note.timestamp)}
                </span>
              </div>
              <p>{note.content}</p>
            </div>
          ))}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Note
            </label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter your note here..."
            />
            <div className="flex gap-3 mt-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add Note
              </button>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;