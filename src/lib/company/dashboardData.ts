import { CheckCircle, ListCheck, ShieldX, Users2 } from "lucide-react";

export const dashboardData = [
  {
    name: "Total Employees",
    amount: 1500,
    icon: Users2,
    bgColor: "from-indigo-50 to-indigo-100",
    borderColor: "border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    name: "Verified Employees",
    amount: 1100,
    icon: CheckCircle,
    bgColor: "from-zinc-50 to-zinc-100",
    borderColor: "border-zinc-200",
    iconColor: "text-zinc-600",
  },
  {
    name: "Pending Verifications",
    amount: 370,
    icon: ListCheck,
    bgColor: "from-teal-50 to-teal-100",
    borderColor: "border-teal-200",
    iconColor: "text-teal-600",
  },
  {
    name: "Suspended Accounts",
    amount: 30,
    icon: ShieldX,
    bgColor: "from-red-50 to-red-100",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
  },
];
