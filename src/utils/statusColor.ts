export const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "Delayed":
        return "bg-red-100 text-red-700";
      case "Planning":
        return "bg-blue-100 text-blue-700";
      case "Proposal":
        return "bg-purple-100 text-purple-700";
      case "Mobilizing":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };