import CompanyGroupLife from "@/pages/admin/dashboard/registrations/components/group-life/CompanyGroupLife";
import EmployeeGroupLife from "@/pages/admin/dashboard/registrations/components/group-life/EmployeeGroupLife";
import { Button } from "@/components/ui/button";
import { dashboardData } from "@/lib/grouplife/dashboard";
import { Building, User } from "lucide-react";
import React, { useState } from "react";

const GroupLifeRegistrations: React.FC = () => {
  const [active, setActive] = useState<"Company" | "Employee">("Company");

  console.log(active);

  return (
    <div className="p-6">
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardData.map((data) => {
          const Icon = data.icon;
          return (
            <div
              key={data.name}
              className={`bg-linear-to-br ${data.bgColor} border ${data.borderColor} rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 py-4 flex flex-col gap-1 border-2 border-black/10`}
            >
              <div className="flex flex-col font-medium text-black/50 items-start gap-2">
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="pointer-events-none"
                >
                  <Icon className="text-sky-400" />
                </Button>
                <p className="">{data.name}</p>
              </div>
              <h6 className="font-semibold text-2xl text-sky-400">
                {data.amount}
              </h6>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col mt-15 p-6 rounded-xl bg-white/75 border-2 shadow-lg border-black/5">
        <div className="flex items-center gap-4 jost">
          {[
            { name: "Company", icon: Building },
            { name: "Employee", icon: User },
          ].map((nav) => (
            <div
              key={nav.name}
              className={`rounded-lg cursor-pointer px-6 py-4 bg-black/5 flex items-center gap-2 ${
                active === nav.name ? "bg-blue-500 text-white font-medium" : ""
              }`}
              onClick={() => setActive(nav.name as "Company" | "Employee")}
            >
              <nav.icon />
              {nav.name}
            </div>
          ))}
        </div>

        <div className="mt-12">
          {active === "Company" ? <CompanyGroupLife /> : <EmployeeGroupLife />}
        </div>
      </div>
    </div>
  );
};

export default GroupLifeRegistrations;
