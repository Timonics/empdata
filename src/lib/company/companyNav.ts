import type { Navigations } from "@/interfaces/navigations.interface";
import { Logs } from "lucide-react";
import { GrStatusInfo } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbReport, TbUsers } from "react-icons/tb";

export const navigations: Navigations[] = [
  {
    name: "Dashboard",
    link: "",
    icon: LuLayoutDashboard,
  },
  {
    name: "Employees",
    link: "company/employees",
    icon: TbUsers,
  },
  {
    name: "Invitations",
    link: "company/invitations",
    icon: GrStatusInfo,
  },
  {
    name: "Documents",
    link: "company/documents",
    icon: Logs,
  },
  {
    name: "Reports",
    link: "company/reports",
    icon: TbReport,
  },
];
