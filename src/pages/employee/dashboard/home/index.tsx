import { Button } from "@/components/ui/button";
import { dashboardData } from "@/lib/employee/dashboardData";
import React from "react";

const EmployeeHome: React.FC = () => {
  return (
    <div>
      <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dashboardData.map((data) => {
          const Icon = data.icon;
          return (
            <div
              key={data.name}
              className="p-4 py-8 flex flex-col gap-1 rounded-xl border-2 border-black/10"
            >
              <div className="flex flex-col font-medium text-black/50 items-start gap-2">
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="pointer-events-none"
                >
                  <Icon className="text-sky-400" />
                </Button>
                <h6 className="">{data.name}</h6>
              </div>
              <p className="font-semibold text-2xl text-sky-400">
                {data.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeHome;
