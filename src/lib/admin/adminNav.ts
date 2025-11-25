import { Logs, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconType } from "react-icons";
import { GrStatusInfo } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBuilding, TbReport, TbSettings, TbUsers } from "react-icons/tb";

interface Navigations {
  name: string;
  link: string;
  icon:
    | IconType
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  children?: { name: string; link: string }[];
}

export const navigations: Navigations[] = [
  {
    name: "Dashboard",
    link: "",
    icon: LuLayoutDashboard,
  },
  {
    name: "Corporate Clients",
    link: "company",
    icon: TbBuilding,
    children: [
      { name: "Add Corporate Clients ", link: "" },
      { name: "View Client Details", link: "" },
    ],
  },
  {
    name: "Client Employees",
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
