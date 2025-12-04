import React from "react";

const RedirectOnPasswordSet: React.FC = () => {
  return (
    <div>
      <div className="absolute inset-0 backdrop-blur-lg rounded-xl z-10" />

      <div className="z-10 absolute left-1/2 top-1/2 p-4 -translate-x-1/2 -translate-y-1/2 max-w-2xl mx-auto w-full flex flex-col gap-4 items-center justify-center rounded-lg bg-sky-50 shadow-2xl h-[200px]">
        <h2 className="text-xl font-semibold">
         🎉 Your Password has Successfully been set
        </h2>
        <p className="flex items-center gap-2 italic text-gray-400 text-sm">
          Redirecting you to your portal login page...
        </p>
      </div>
    </div>
  );
};

export default RedirectOnPasswordSet;
