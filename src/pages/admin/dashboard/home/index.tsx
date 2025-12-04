import React, { useState } from "react";
import { dashboardData } from "@/lib/admin/dashboardData";
import AddCorporateClient from "../clients/component/AddCompany";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const [addClient, setAddClient] = useState(false);
  return (
    <div>
      <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dashboardData.map((data) => {
          const Icon = data.icon;
          return (
            <div className="p-4 py-8 flex flex-col gap-1 rounded-xl border-2 border-black/10">
              <div className="flex flex-col font-medium text-black/50 items-start gap-2">
                <Button variant={"outline"} size={"icon-sm"} className="pointer-events-none">
                  <Icon className="text-sky-400"/>
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
      {/* <hr className="border border-black/10 " /> */}
      <div className="h-[400px] p-4 text-2xl">
        <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-xl shadow-xl outfit">
          Graphs / Visualizations
        </div>
      </div>
      {/* <hr className="border border-black/10 my-4" /> */}
      <div className="flex flex-col gap-4 p-2 my-4">
        <h3 className="text-4xl pl-4">Quick Actions</h3>
        <div className="flex flex-col w-full items-center justify-center md:flex-row gap-4">
          {[
            { name: "Add Company" },
            { name: "Invite Company HR" },
            { name: "View Latest Reports" },
          ].map((item, index) => (
            <button
              onClick={() => {
                if (index === 0) setAddClient(true);
              }}
              className="p-6 rounded-xl border-2 border-black/30"
            >
              <h4>{item.name}</h4>
            </button>
          ))}
        </div>
      </div>
      {addClient && <AddCorporateClient setAddClient={setAddClient} />}
    </div>
  );
};

export default Home;
