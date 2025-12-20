// components/verification/DocumentsComponent.tsx
import React from "react";
import { 
  FileText, 
  FileArchive, 
  Image as ImageIcon, 
  File, 
  Download, 
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle
} from "lucide-react";

interface DocumentsComponentProps {
  applicantType: "individual" | "corporate";
  applicantData?: any;
}

const DocumentsComponent: React.FC<DocumentsComponentProps> = ({ 
  applicantType, 
}) => {
  // Dummy documents data
  const documents = {
    identityCards: [
      { 
        id: 1, 
        name: "Director_Passport.jpg", 
        type: "image", 
        size: "2.4 MB", 
        uploaded: "2024-01-15",
        status: "verified" as const
      },
      { 
        id: 2, 
        name: "Driver_License.pdf", 
        type: "pdf", 
        size: "1.8 MB", 
        uploaded: "2024-01-15",
        status: "verified" as const
      },
    ],
    cacDocuments: [
      { 
        id: 3, 
        name: "CAC_Certificate.pdf", 
        type: "pdf", 
        size: "3.2 MB", 
        uploaded: "2024-01-15",
        status: "verified" as const
      },
    ],
    passportPhotos: [
      { 
        id: 4, 
        name: "Passport_Photo.jpg", 
        type: "image", 
        size: "1.2 MB", 
        uploaded: "2024-01-15",
        status: "pending" as const
      },
    ],
    otherDocuments: [
      { 
        id: 5, 
        name: "Utility_Bill.pdf", 
        type: "pdf", 
        size: "0.8 MB", 
        uploaded: "2024-01-16",
        status: "in_review" as const
      },
      { 
        id: 6, 
        name: "Bank_Statement.pdf", 
        type: "pdf", 
        size: "2.1 MB", 
        uploaded: "2024-01-16",
        status: "verified" as const
      },
    ]
  };

  const documentStats = {
    total: Object.values(documents).flat().length,
    verified: Object.values(documents).flat().filter(d => d.status === "verified").length,
    pending: Object.values(documents).flat().filter(d => d.status === "pending").length,
    inReview: Object.values(documents).flat().filter(d => d.status === "in_review").length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "in_review":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified": return "Verified";
      case "pending": return "Pending";
      case "in_review": return "In Review";
      case "rejected": return "Rejected";
      default: return "Unknown";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-700 bg-green-50 border-green-200";
      case "pending": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "in_review": return "text-blue-700 bg-blue-50 border-blue-200";
      case "rejected": return "text-red-700 bg-red-50 border-red-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileArchive className="w-5 h-5" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const getFileIconColor = (type: string) => {
    switch (type) {
      case "pdf": return "text-red-600 bg-red-50";
      case "image": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const DocumentSection = ({ 
    title, 
    documents, 
    icon 
  }: { 
    title: string; 
    documents: any[]; 
    icon: React.ReactNode 
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
          {documents.length} files
        </span>
      </div>
      
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`p-2 rounded-lg ${getFileIconColor(doc.type)}`}>
                {getFileIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{doc.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">{doc.size}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Uploaded {formatDate(doc.uploaded)}</span>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getStatusColor(doc.status)}`}>
                {getStatusIcon(doc.status)}
                <span className="font-medium">{getStatusText(doc.status)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button 
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Preview"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{documentStats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{documentStats.verified}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Review</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{documentStats.inReview}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{documentStats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Identity Cards */}
      <DocumentSection
        title="Identity Cards"
        documents={documents.identityCards}
        icon={
          <div className="p-2 bg-blue-100 rounded-lg">
            <ImageIcon className="w-5 h-5 text-blue-600" />
          </div>
        }
      />

      {/* CAC Documents (Corporate Only) */}
      {applicantType === "corporate" && (
        <DocumentSection
          title="CAC Documents"
          documents={documents.cacDocuments}
          icon={
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileArchive className="w-5 h-5 text-purple-600" />
            </div>
          }
        />
      )}

      {/* Passport Photos */}
      <DocumentSection
        title="Passport Photographs"
        documents={documents.passportPhotos}
        icon={
          <div className="p-2 bg-green-100 rounded-lg">
            <ImageIcon className="w-5 h-5 text-green-600" />
          </div>
        }
      />

      {/* Other Supporting Documents */}
      <DocumentSection
        title="Other Supporting Documents"
        documents={documents.otherDocuments}
        icon={
          <div className="p-2 bg-gray-100 rounded-lg">
            <File className="w-5 h-5 text-gray-600" />
          </div>
        }
      />

      {/* Document Validation Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Validation Summary</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Identity Verification</span>
              <span className="text-sm font-medium text-green-700">Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Document Verification</span>
              <span className="text-sm font-medium text-green-700">Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Photo Verification</span>
              <span className="text-sm font-medium text-yellow-700">Pending</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: '60%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Address Verification</span>
              <span className="text-sm font-medium text-blue-700">In Progress</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Overall Document Status</h4>
              <p className="text-sm text-gray-600">
                {documentStats.verified} of {documentStats.total} documents verified
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((documentStats.verified / documentStats.total) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Download All Documents
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Mark All as Verified
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Request Missing Documents
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium">
            Reject All Pending
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsComponent;