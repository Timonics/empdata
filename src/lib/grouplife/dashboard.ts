import { ListCheck, Shield, ShieldCheck, ShieldX } from "lucide-react";

export const dashboardData = [
  {
    name: "Total Registrations",
    amount: 170,
    icon: ListCheck,
    bgColor: "from-fuchsia-50 to-fuchsia-100",
    borderColor: "border-fuchsia-200",
    iconColor: "text-fuchsia-600",
  },
  {
    name: "Pending Registrations",
    amount: 24,
    icon: Shield,
    bgColor: "from-red-50 to-red-100",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
  },
  {
    name: "Approved Registrations",
    amount: 24,
    icon: ShieldCheck,
    bgColor: "from-yellow-50 to-yellow-100",
    borderColor: "border-yellow-200",
    iconColor: "text-yellow-600",
  },
  {
    name: "Rejected Verifications",
    amount: "16",
    icon: ShieldX,
    bgColor: "from-teal-50 to-teal-100",
    borderColor: "border-teal-200",
    iconColor: "text-teal-600",
  },
];
