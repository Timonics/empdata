import React, { useState } from "react";
import { dashboardData } from "@/lib/admin/dashboardData";
import AddCorporateClient from "../clients/component/AddCompany";
import { Button } from "@/components/ui/button";
import PendingApprovals from "./PendingApprovals";
import RecentActivityTimeline from "./RecentActivityTimeline";

const Home: React.FC = () => {
  const [addClient, setAddClient] = useState(false);
  return (
    <div>
      <div className="p-4 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="flex flex-col  gap-8 p-4 min-h-[400px] overflow-auto mt-4">
        <PendingApprovals />
        <RecentActivityTimeline />
      </div>

      {/* <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full h-[400px]"></div>
      </div> */}

      {/* <hr className="border border-black/10 my-4" /> */}
      {addClient && <AddCorporateClient setAddClient={setAddClient} />}
    </div>
  );
};

export default Home;
