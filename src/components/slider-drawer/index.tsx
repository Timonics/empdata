import React from "react";
import { X } from "lucide-react";
import Logo from "../logo";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: string; // optional custom width
  children: React.ReactNode;
};

const SlideDrawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  width = "w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]",
  children,
}) => {
  return (
    <div className="relative">
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300 z-40
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 right-0 h-full bg-white/95 shadow-2xl shadow-black/30 border-l-4 border-black/40 ${width} transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          z-50 flex flex-col gap-4
        `}
      >
        <div className="flex justify-between items-center p-4">
          <Logo />
          <X
            className="cursor-pointer hover:text-red-500 transition"
            onClick={onClose}
          />
        </div>

        {title && (
          <h2 className="text-4xl underline font-semibold text-center">{title}</h2>
        )}

        <div className="flex-1 overflow-auto p-4 items-center flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideDrawer;
