import React, { useState } from "react";
import { NavLink } from "react-router";
import Logo from "@/components/logo";
import { navigations } from "@/lib/admin/adminNav";
import { ChevronDown, ChevronUp, LogOut, StickyNote } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type NavProps = {
  navIsOpen: boolean;
};

const Navigations: React.FC<NavProps> = ({ navIsOpen }) => {
  const [openNavChildren, setOpenNavChildren] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);

  const { logout } = useAuth("admin");

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(
        expandedSections.filter((section) => section !== section)
      );
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  return (
    <div
      onClick={() => {
        if (openNavChildren) {
          setOpenNavChildren(false);
          setOpenIndex(null);
        }
      }}
      className={`flex flex-col text-white h-full gap-6 py-4 ${
        navIsOpen ? "" : "items-center"
      }`}
    >
      <div className="mx-aut">
        <Logo />
      </div>
      <div
        className={`flex flex-col h-full overflow-auto scrollbar gap-2 ${
          navIsOpen ? "" : "items-center"
        }`}
      >
        <NavLink
          end
          to={``}
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-white/25 text-sky-100 shadow-lg backdrop-blur-sm font-bold"
                : "font-medium"
            } p-2 rounded-md ${
              navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100 hover:text-gray-800"
            } transition duration-300 hover:scale-95 flex text- items-center gap-2`
          }
        >
          <LuLayoutDashboard size={25} />
          {navIsOpen && <h5>Dashboard</h5>}
        </NavLink>

        {navIsOpen ? (
          <h4 className="mt-6 pl-2 text-sm opacity-50">REGISTRATIONS</h4>
        ) : (
          <hr className="text-center border w-full mt-6 opacity-30" />
        )}
        <div
          onClick={() => toggleSection(navigations[1].link)}
          className={`${
            navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100"
          } flex items-center gap-2 font-medium jost cursor-pointer relative`}
        >
          <StickyNote /> {navIsOpen && navigations[1].name}
          {navigations[1].children && navIsOpen && (
            <ChevronUp
              size={18}
              className={`ml-auto absolute right-4 transition-transform ${
                expandedSections.includes(navigations[1].link)
                  ? "rotate-180"
                  : ""
              }`}
              onClick={() => {
                setOpenIndex(1);
              }}
            />
          )}
        </div>
        {navigations[1].children &&
          expandedSections.includes(navigations[1].link) && (
            <div className="pl-4 flex flex-col gap-2 jost text-sm mt-4">
              {navigations[1].children.map((child_nav) => (
                <NavLink
                  key={child_nav.name}
                  to={child_nav.link}
                  className={({isActive}) => `${isActive ? "bg-white/25 text-sky-100 shadow-lg backdrop-blur-sm  font-bold" : "font-medium"} pl-8 p-2 rounded-lg hover:scale-95 transition duration-300`}
                >
                  {child_nav.name}
                </NavLink>
              ))}
            </div>
          )}

        {navIsOpen ? (
          <h4 className="mt-6 pl-2 text-sm opacity-50">ORGANISATIONS</h4>
        ) : (
          <hr className="text-center border w-full mt-6 opacity-30" />
        )}
        <div className="flex flex-col gap-1">
          {navigations.slice(2, 4).map((nav, index) => {
            const Icon = nav.icon;
            return (
              <NavLink
                end
                key={nav.name}
                to={`${nav.link}`}
                className={({ isActive }) =>
                  `${index === navigations.length - 1 ? "mt-auto" : ""} ${
                    isActive
                      ? "bg-white/25 text-sky-100 shadow-lg backdrop-blur-sm  font-bold"
                      : "font-medium"
                  } p-2 rounded-lg relative ${
                    navIsOpen ? "pl-4" : "px-4 hover:bg-sky-100"
                  } ${
                    !openNavChildren && "transition duration-300"
                  } flex items-center gap-2 relative ${
                    openIndex !== index && "hover:scale-95"
                  }`
                }
                onClick={() => toggleSection(nav.link)}
              >
                <Icon size={25} />
                {navIsOpen && <h5 className="">{nav.name}</h5>}
                {nav.children && navIsOpen && (
                  <ChevronUp
                    size={18}
                    className={`ml-auto absolute right-4 transition-transform ${
                      expandedSections.includes(nav.link) ? "rotate-180" : ""
                    }`}
                    // onClick={() => {
                    //   setOpenNavChildren(true);
                    //   setOpenIndex(index);
                    // }}
                  />
                )}
                {/* {expandedSections.includes("company") && (
                  <div className="border"></div>
                )} */}
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
          {navigations.slice(4, navigations.length - 1).map((nav, index) => {
            const Icon = nav.icon;
            return (
              <NavLink
                end
                key={nav.name}
                to={`${nav.link}`}
                className={({ isActive }) =>
                  `${index === navigations.length - 1 ? "mt-auto" : ""} ${
                    isActive
                      ? "bg-white/25 text-sky-100 shadow-lg backdrop-blur-sm font-bold"
                      : "font-medium"
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
          <hr className="text-center mt-auto border w-full opacity-30" />
        )}
        <div className="flex flex-col gap-1 mr-2">
          {navigations.slice(navigations.length - 1).map((nav, index) => {
            const Icon = nav.icon;
            return (
              <NavLink
                end
                key={nav.name}
                to={`${nav.link}`}
                className={({ isActive }) =>
                  `${index === navigations.length - 1 ? "mt-auto" : ""} ${
                    isActive
                      ? "bg-white/25 text-sky-100 shadow-lg backdrop-blur-sm font-bold"
                      : "font-medium"
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
          <button
            className="w-full ml-2 flex items-center cursor-pointer gap-2 p-2 rounded-lg font-medium hover:bg-red-100 hover:text-red-600 transition duration-300"
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

export default Navigations;
