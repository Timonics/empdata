import React, { useState } from "react";
import { dashboardData } from "@/lib/admin/dashboardData";
import AddCorporateClient from "../clients/component/AddCompany";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home: React.FC = () => {
  const [addClient, setAddClient] = useState(false);
  return (
    <div>
      <div className="p-4 my-6">
        <div className="flex flex-col w-full items-center justify-center sm:flex-row gap-4">
          {[
            { name: "Add Company" },
            { name: "Invite Company HR" },
            { name: "View Latest Reports" },
          ].map((item, index) => (
            <button
              onClick={() => {
                if (index === 0) setAddClient(true);
              }}
              className="p-4 w-full flex-1 hover:bg-sky-50 hover:cursor-pointer hover:text-sky-600 transition duration-300 font-semibold rounded-xl border-2 border-dashed bg-sky-100/20 border-black/30"
            >
              <h4>{item.name}</h4>
            </button>
          ))}
        </div>
      </div>

      <hr className="border border-black/10 " />

      <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {dashboardData.map((data) => {
          const Icon = data.icon;
          return (
            <div className="p-4 py-8 flex flex-col gap-1 rounded-xl border-2 border-black/10">
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
      {/* <hr className="border border-black/10 " /> */}
      {/* <div className="h-[400px] p-4 text-2xl">
        <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-xl shadow-xl outfit">
          Graphs / Visualizations
        </div>
      </div> */}

      <div className="flex flex-col md:flex-row gap-8 p-4 min-h-[400px] overflow-auto">
        <div className="w-full md:w-1/2 h-full border-2 border-gray-200 shadow-xs rounded-lg bg-sky-50/20 flex flex-col gap-4 p-4">
          <h3 className="text-xl font-semibold">Companies Registered</h3>
          {[
            { companyName: "Company 1", employeeNo: 150 },
            { companyName: "Company 2", employeeNo: 220 },
            { companyName: "Company 3", employeeNo: 457 },
            // { companyName: "Company 4", employeeNo: 1124 },
          ].map((item) => (
            <div className="px-4 py-2 flex flex-col gap-1">
              <h3 className="text-sm text-gray-700">{item.companyName}</h3>
              <p className="font-semibold">{item.employeeNo} employee(s)</p>
              <hr className="border-gray-300"/>
            </div>
          ))}
          <Link to={""} className="p-4 mb-2 bg-black font-semibold text-sky-400 rounded-lg ml-auto">
            View All Companies
          </Link>
        </div>
        
        <div className="w-full md:w-1/2 h-full border-2 border-gray-200 shadow-xs rounded-lg bg-sky-50/20 flex flex-col gap-4 p-4">
          <h3 className="text-xl font-semibold">Employees Registered</h3>
          {[
            { companyName: "Company 1", employeeNo: 150 },
            { companyName: "Company 2", employeeNo: 220 },
            { companyName: "Company 3", employeeNo: 457 },
            // { companyName: "Company 4", employeeNo: 1124 },
          ].map((item) => (
            <div className="px-4 py-2 flex flex-col gap-1">
              <h3 className="text-sm text-gray-700">{item.companyName}</h3>
              <p className="font-semibold">{item.employeeNo} employee(s)</p>
              <hr className="border-gray-300"/>
            </div>
          ))}
          <Link to={""} className="p-4 mb-2 bg-black font-semibold text-sky-400 rounded-lg ml-auto">
            View All Employees
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 p-4 h-[400px]">
        <div className="w-full md:w-1/2 h-full border-2 border-gray-200 shadow-xs rounded-lg bg-sky-50/20"></div>
        <div className="w-full md:w-1/2 h-full border-2 border-gray-200 shadow-xs rounded-lg bg-sky-50/20"></div>
      </div>

      {/* <hr className="border border-black/10 my-4" /> */}
      {addClient && <AddCorporateClient setAddClient={setAddClient} />}
    </div>
  );
};

export default Home;
