import React from "react";
import { X } from "lucide-react";

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
  width = "w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]",
  children,
}) => {
  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-2xl ${width}
          rounded-l-xl transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
          z-50 flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X
            className="cursor-pointer hover:text-red-500 transition"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideDrawer;
