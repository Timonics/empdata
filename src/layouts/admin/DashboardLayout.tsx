import React, { useState } from "react";
import Navigations from "@/pages/admin/dashboard/navigations";
import { Outlet, useLocation } from "react-router";
import { LogOut, PanelRight, X } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "@/components/logo";
import { LuLayoutDashboard } from "react-icons/lu";
import { navigations } from "@/lib/admin/adminNav";

const AdminDashboardLayout: React.FC = () => {
  const location = useLocation();
  const [navIsOpen, setNavIsOpen] = useState(true);
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden p-4">
      <div className="flex h-full bg-white/90 shadow-lg rounded-xl relative border-4 border-black/15">
        <div
          className={`${
            !navIsOpen ? "w-20" : "w-2/10"
          } transition-all duration-300 ease-in-out max-xl:hidden flex flex-col h-full border-r-2 bg-black/2 rounded-l-xl border-black/10 px-2`}
        >
          <Navigations navIsOpen={navIsOpen} />
        </div>
        <div
          className={`${
            !navIsOpen ? "w-full" : "xl:w-8/10"
          } w-full transition-all duration-300 ease-in-out flex flex-col rounded-r-xl`}
        >
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
        className={`absolute left-0 top-0 h-full w-64 sm:w-70 bg-white xl:hidden transform transition-transform ease-in-out duration-300 p-2 flex flex-col gap-4 ${
          mobileNavIsOpen
            ? "translate-x-0 shadow-2xl shadow-sky-100"
            : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <Logo />
          <X
            className="text-black/75 mr-2 cursor-pointer hover:text-red-600 transition duration-300"
            onClick={() => setMobileNavIsOpen(false)}
          />
        </div>
        <div className="mt-5 flex flex-col h-full items-start gap-4 outfit text-black">
          <NavLink
            end
            to={``}
            onClick={() => setMobileNavIsOpen(false)}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-sky-100 text-sky-600 font-bold"
                  : "bg-black/85 text-white/85"
              } p-2 rounded-lg ${
                navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100 hover:text-gray-800"
              } transition duration-300 hover:scale-95 flex w-full items-center gap-2`
            }
          >
            <LuLayoutDashboard size={20} />
            {navIsOpen && <h5>Dashboard</h5>}
          </NavLink>
          <h4 className="mt-6 pl-2 text-sm opacity-50">ORGANISATIONS</h4>
          <div className="flex flex-col gap-1 w-full">
            {navigations.slice(1, 3).map((nav) => (
              <NavLink
                end
                to={`${nav.link}`}
                onClick={() => setMobileNavIsOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center hover:scale-95 transition duration-300 gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-sky-100 text-sky-600 font-bold"
                      : "opacity-75 font-medium"
                  }`
                }
              >
                <nav.icon size={20} />
                <h5 className="">{nav.name}</h5>
              </NavLink>
            ))}
          </div>
          <h4 className="mt-6 pl-2 text-sm opacity-50">
            REPORTS AND COMPLIANCE
          </h4>
          <div className="flex flex-col gap-1 w-full">
            {navigations.slice(3, navigations.length - 1).map((nav) => (
              <NavLink
                end
                to={`${nav.link}`}
                onClick={() => setMobileNavIsOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center hover:scale-95 transition duration-300 gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-sky-100 text-sky-600 font-bold"
                      : "opacity-75 font-medium"
                  }`
                }
              >
                <nav.icon size={20} />
                <h5 className="">{nav.name}</h5>
              </NavLink>
            ))}
          </div>
          <h4 className="mt-auto pl-2 text-sm opacity-50">SYSTEM</h4>
          <div className="flex flex-col gap-1 w-full mb-2">
            {navigations.slice(navigations.length - 1).map((nav) => (
              <NavLink
                end
                to={`${nav.link}`}
                onClick={() => setMobileNavIsOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center hover:scale-95 transition duration-300 gap-2 p-2 rounded-lg ${
                    isActive
                      ? "bg-sky-100 text-sky-600 font-bold"
                      : "opacity-75 font-medium"
                  }`
                }
              >
                <nav.icon size={20} />
                <h5 className="">{nav.name}</h5>
              </NavLink>
            ))}
            <button className="w-full flex items-center gap-2 p-2 rounded-lg opacity-75 font-medium hover:bg-red-100 hover:text-red-600 transition duration-300">
              <LogOut size={20}/>
              <h5>Logout</h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
