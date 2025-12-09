import Logo from "@/components/logo";
import { useAuth } from "@/hooks/useAuth";
import { navigations } from "@/lib/company/companyNav";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router";
import { toast } from "sonner";

type NavProps = {
  navIsOpen: boolean;
};

const CompanyNavigations: React.FC<NavProps> = ({ navIsOpen }) => {
  const [openNavChildren, setOpenNavChildren] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { logout } = useAuth("company");

  return (
    <div
      onClick={() => {
        if (openNavChildren) {
          setOpenNavChildren(false);
          setOpenIndex(null);
        }
      }}
      className={`flex flex-col h-full gap-6 py-4 ${
        navIsOpen ? "" : "items-center"
      }`}
    >
      <Logo />
      <div
        className={`flex flex-col h-full gap-2 mt-4 ${
          navIsOpen ? "" : "items-center"
        }`}
      >
        <NavLink
          end
          to={`company`}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-100 text-sky-600 font-bold"
                : "bg-black/85 text-white/85"
            } p-2 rounded-lg ${
              navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100 hover:text-gray-800"
            } transition duration-300 hover:scale-95 flex text- items-center gap-2`
          }
        >
          <LuLayoutDashboard size={25} />
          {navIsOpen && <h5>Dashboard</h5>}
        </NavLink>
        {navIsOpen ? (
          <h4 className="mt-6 pl-2 text-sm opacity-50">ORGANISATIONS</h4>
        ) : (
          <hr className="text-center border w-full mt-6 opacity-30" />
        )}
        <div className="flex flex-col gap-1">
          {navigations.slice(1, 3).map((nav, index) => {
            const Icon = nav.icon;
            return (
              <NavLink
                end
                key={nav.name}
                to={`${nav.link}`}
                className={({ isActive }) =>
                  `${index === navigations.length - 1 ? "mt-auto" : ""} ${
                    isActive
                      ? "bg-sky-100 text-sky-600 font-bold"
                      : "opacity-75 font-medium"
                  } p-2 rounded-lg relative ${
                    navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100"
                  } ${
                    !openNavChildren && "transition duration-300"
                  } flex items-center gap-2 relative ${
                    openIndex !== index && "hover:scale-95"
                  }`
                }
              >
                <Icon size={25} />
                {navIsOpen && <h5 className="">{nav.name}</h5>}
                {nav.children &&
                  navIsOpen &&
                  (!openNavChildren ? (
                    <ChevronDown
                      size={18}
                      className="ml-auto absolute right-4"
                      onClick={() => {
                        setOpenNavChildren(true);
                        setOpenIndex(index);
                      }}
                    />
                  ) : (
                    <ChevronUp
                      size={18}
                      className="ml-auto absolute right-4"
                      onClick={() => {
                        setOpenNavChildren(false);
                        setOpenIndex(null);
                      }}
                    />
                  ))}
                {navIsOpen &&
                  openNavChildren &&
                  openIndex === index &&
                  nav.children && (
                    <div className="absolute px-2 py-4 text-black/85 border-2 border-black/20 gap-2 top-11 font-medium rounded-xl left-0 w-full flex flex-col backdrop-blur-sm z-10 shadow-xl text-sm">
                      {nav.children.map((item) => (
                        <button className="hover:bg-sky-100 p-2 rounded-lg border-2 border-black/20">
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
              </NavLink>
            );
          })}
        </div>
        {navIsOpen ? (
          <h4 className="mt-6 pl-2 text-sm opacity-50">
            REPORTS AND COMPLIANCE
          </h4>
        ) : (
          <hr className="text-center border w-full mt-6 opacity-30" />
        )}
        <div className="flex flex-col gap-1">
          {navigations.slice(3).map((nav, index) => {
            const Icon = nav.icon;
            return (
              <NavLink
                end
                key={nav.name}
                to={`${nav.link}`}
                className={({ isActive }) =>
                  `${index === navigations.length - 1 ? "mt-auto" : ""} ${
                    isActive
                      ? "bg-sky-100 text-sky-600 font-bold"
                      : "opacity-75 font-medium"
                  } p-2 rounded-lg ${
                    navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100"
                  } transition duration-300 hover:scale-95 flex text- items-center gap-2`
                }
              >
                <Icon size={25} />
                {navIsOpen && <h5 className="">{nav.name}</h5>}
                {nav.children && (
                  <ChevronDown
                    size={18}
                    className="ml-auto"
                    onClick={() => setOpenNavChildren(!openNavChildren)}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
        {navIsOpen ? (
          <h4 className="mt-auto pl-2 text-sm opacity-30">SYSTEM</h4>
        ) : (
          <hr className="text-center border w-full mt-auto opacity-30" />
        )}
        <div className="flex flex-col gap-1 mr-2">
          <button
            className="w-full ml-2 flex items-center cursor-pointer gap-2 p-2 rounded-lg opacity-75 font-medium hover:bg-red-100 hover:text-red-600 transition duration-300"
            onClick={() => {
              logout();
              toast.success("Successfully Logged Out");
            }}
          >
            <LogOut size={25} />
            {navIsOpen && <h5>Logout</h5>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyNavigations;
