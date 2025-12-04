import type { Navigations } from "@/interfaces/navigations.interface";
import { Building2, User } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbFile } from "react-icons/tb";

export const navigations: Navigations[] = [
  {
    name: "Dashboard",
    link: "",
    icon: LuLayoutDashboard,
  },
  {
    name: "Profile",
    link: "employee/profile",
    icon: User,
  },
  {
    name: "Documents",
    link: "employee/documents",
    icon: TbFile,
  },
  {
    name: "Company info",
    link: "company/company-info",
    icon: Building2,
  },
];
