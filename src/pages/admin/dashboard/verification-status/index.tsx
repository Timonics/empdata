import { Button } from "@/components/ui/button";
import {
  verificationData,
  verificationWorkFlow,
} from "@/lib/admin/verification";
import React from "react";

const VerificationStatus: React.FC = () => {
  return (
    <div className="py-2 h-full w-full flex flex-col gap-4">
      <div className="p-4 my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {verificationData.map((data) => {
          const Icon = data.icon;
          return (
            <div className="p-4 py-8 flex flex-col gap-1 rounded-xl border-2 border-black/10">
              <div className="flex flex-col font-medium text-black/50 items-start gap-2">
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  className="pointer-events-none"
                >
                  <Icon className={`${data.color}`} />
                </Button>
                <h6 className="">{data.name}</h6>
              </div>
              <p className={`font-semibold text-2xl ${data.color}`}>
                {data.amount}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="border border-black/10 " />
      <h2 className="mt-4 text-3xl pl-4">Verification Workflow</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-4 w-full min-h-[400px] overflow-auto">
        {verificationWorkFlow.map((data) => (
          <div
            key={data.name}
            className="border border-muted-foreground/50 rounded-xl flex flex-col gap-2 shadow-md"
          >
            <div className="border-b border-muted-foreground/50 p-2 py-4">
              <h4 className="text-center text-gray-600 font-semibold">
                {data.name}
              </h4>
            </div>
            <div className="p-2 space-y-2">
              {data.data.map((item) => (
                <div
                  key={item.name}
                  className="border border-muted-foreground/50 rounded-lg"
                >
                  <p
                    className={`p-1 text-xs rounded-tl-lg rounded-br-lg w-fit text-white ${
                      item.type === "Company" ? "bg-black" : "bg-sky-400"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </p>
                  <div className="p-2 flex items-center justify-between border-b border-muted-foreground/50">
                    <p className="text-lg font-bold mt-2 text-wrap">
                      {item.name}
                    </p>
                    {/* <p className="text-sm">May 15, 2025</p> */}
                  </div>
                  <div className="p-2 space-y-2">
                    <p className="font-medium text-gray-600">
                      Submitted documents:
                    </p>
                    <div className="space-y-4">
                      {item.submitted_docs.map((doc, index) => (
                        <div
                          key={index}
                          className="bg-black/5 shadow-md p-2 rounded-sm flex justify-between"
                        >
                          {doc}
                          <button className="text-xs p-1 px-2 rounded-sm border bg-black text-white">
                            View
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <hr className="border border-black/10" />
      <p className="mt-4 text-3xl pl-4">Quick Actions</p>
      <div className="flex p-2 flex-col w-full lg:w-[90%] mx-auto items-center justify-center md:flex-row gap-4">
        {[
          { name: "Flagged Accounts" },
          { name: "Document Approval" },
          { name: "Pending Reviews" },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (index === 0) {
                // setAddClient(true);
              }
            }}
            className="p-6 w-full lg:w-1/3 rounded-xl shadow-xl bg-linear-to-br from-gray-800 to-black text-gray-400 font-medium hover:scale-95 transition duration-300 ease-in-out hover:text-sky-400"
          >
            <h4 className="text-center">{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStatus;
