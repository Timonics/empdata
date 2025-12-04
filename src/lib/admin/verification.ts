import { Building, Flag, Users } from "lucide-react";
import { TbFile } from "react-icons/tb";

export const verificationData = [
  {
    name: "Company Verifications",
    icon: Building,
    amount: 42,
    color: "text-sky-400",
  },
  {
    name: "Employee Verifications",
    icon: Users,
    amount: 156,
    color: "text-green-400",
  },
  {
    name: "Document Approvals",
    icon: TbFile,
    amount: 20,
    color: "text-orange-400",
  },
  {
    name: "Flagged Accounts",
    icon: Flag,
    amount: 7,
    color: "text-red-400",
  },
];

export const verificationWorkFlow = [
  {
    name: "PENDING",
    amount: 12,
    data: [
      {
        name: "A Company",
        type: "Company",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
      {
        name: "A Employee",
        type: "Employee",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
    ],
  },
  {
    name: "IN REVIEW",
    amount: 12,
    data: [
      {
        name: "B Employee",
        type: "Employee",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
      {
        name: "B Company",
        type: "Company",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
    ],
  },
  {
    name: "APPROVED",
    amount: 12,
    data: [
      {
        name: "C Company",
        type: "Company",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
      {
        name: "C Employee",
        type: "Employee",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
    ],
  },
  {
    name: "REJECTED",
    amount: 12,
    data: [
      {
        name: "D Employee",
        type: "Employee",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
      {
        name: "D Company",
        type: "Company",
        submitted_docs: ["CAC Registration", "Director IDs", "Address Proof"],
      },
    ],
  },
];
