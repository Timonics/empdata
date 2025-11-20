import React, { useState } from "react";
import Navigations from "@/pages/admin/dashboard/navigations";
import { Outlet, useLocation } from "react-router";
import { PanelRight, X } from "lucide-react";
import { navigations } from "@/lib/admin/adminNav";
import { NavLink } from "react-router";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [navIsOpen, setNavIsOpen] = useState(true);
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <div className="w-full h-screen p-4">
      <div className="flex h-full bg-white/90 shadow-lg rounded-xl relative border-2 border-black/15">
        <div
          className={`${
            !navIsOpen ? "w-20" : "w-1/6"
          } transition-all duration-300 ease-in-out max-xl:hidden flex flex-col h-full border-r-2 bg-black/2 rounded-l-xl border-black/10 px-2`}
        >
          <Navigations navIsOpen={navIsOpen} />
        </div>
        <div className={`${!navIsOpen ? "w-full" : "xl:w-5/6"} transition-all duration-300 ease-in-out flex flex-col rounded-r-xl`}>
          <div className="border-b-2 border-black/10 p-4 text-start flex items-center gap-6">
            <div className="max-xl:hidden">
              <PanelRight onClick={() => setNavIsOpen(!navIsOpen)} />
            </div>
            <div className="xl:hidden">
              <PanelRight onClick={() => setMobileNavIsOpen(true)} />
            </div>
            <h2 className="text-3xl">
              {location.pathname === "/admin"
                ? "Dashboard"
                : location.pathname.split("/").at(-1)![0].toUpperCase() +
                  location.pathname.split("/").at(-1)?.slice(1)}
            </h2>
          </div>
          <div className="h-[calc(100vh-50px)] overflow-auto scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 xl:hidden
          transition-all duration-300 ease-in-out
          ${mobileNavIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        onClick={() => setMobileNavIsOpen(false)}
      />
      <div
        className={`absolute left-0 top-0 h-full w-64 bg-white xl:hidden transform transition-transform ease-in-out duration-300 p-2 flex flex-col gap-4  ${
          mobileNavIsOpen
            ? "translate-x-0 shadow-2xl shadow-sky-100"
            : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold px-4 py-1.5 bg-black text-white rounded-md text-center">
            Josbiz
          </h1>
          <X
            className="text-black/75 mr-2"
            onClick={() => setMobileNavIsOpen(false)}
          />
        </div>
        <div className="mt-5 flex flex-col items-start gap-4 outfit text-black ml-2">
          {navigations.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive
                    ? `text-2xl font-bold ml-2`
                    : "font-light hover:scale-125"
                } transition-all duration-500 ease-in-out`
              }
              onClick={() => setMobileNavIsOpen(false)}
              end
              to={item.link}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
