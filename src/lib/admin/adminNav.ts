import type { Navigations } from "@/interfaces/navigations.interface";
import { Logs, StickyNote } from "lucide-react";
import { GrStatusInfo } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBuilding, TbReport, TbSettings, TbUsers } from "react-icons/tb";

export const navigations: Navigations[] = [
  {
    name: "Dashboard",
    link: "",
    icon: LuLayoutDashboard,
  },
  {
    name: "Registrations",
    link: "registrations",
    icon: StickyNote,
    children: [
      { name: "Group Life", link: "registrations/group-life" },
      { name: "Individual", link: "registrations/individual" },
      { name: "Corporate", link: "registrations/corporate" },
    ],
  },
  {
    name: "Company",
    link: "company",
    icon: TbBuilding,
    // children: [
    //   { name: "Add Company ", link: "" },
    //   { name: "View Company Details", link: "" },
    // ],
  },
  {
    name: "Employees",
    link: "employees",
    icon: TbUsers,
  },
  {
    name: "Verification Status",
    link: "verification-status",
    icon: GrStatusInfo,
  },
  {
    name: "Audit Logs",
    link: "audit-logs",
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
