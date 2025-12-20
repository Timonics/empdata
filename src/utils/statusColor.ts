export const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "invited":
        return "bg-purple-100 text-purple-700";
      case "approved":
        return "bg-teal-100 text-teal-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };