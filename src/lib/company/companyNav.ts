import type { Navigations } from "@/interfaces/navigations.interface";
import { Logs } from "lucide-react";
import { GrStatusInfo } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbReport, TbSettings, TbUsers } from "react-icons/tb";

export const navigations: Navigations[] = [
  {
    name: "Dashboard",
    link: "",
    icon: LuLayoutDashboard,
  },
  {
    name: "Employees",
    link: "employees",
    icon: TbUsers,
  },
  {
    name: "Invitations",
    link: "invitations",
    icon: GrStatusInfo,
  },
  {
    name: "Documents",
    link: "documents",
    icon: Logs,
  },
  {
    name: "Reports",
    link: "reports",
    icon: TbReport,
  },
  {
    name: "Settings",
    link: "settings",
    icon: TbSettings,
  },
];
