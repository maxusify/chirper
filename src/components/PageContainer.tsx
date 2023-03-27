import React, { type PropsWithChildren } from "react";

import Sidebar, { SidebarMobile } from "./Sidebar";

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full justify-center">
      <div className="grid w-full grid-cols-12 flex-row items-center justify-center md:max-w-5xl">
        <div className="hidden md:col-span-4 md:block">
          <Sidebar />
        </div>
        <div className="block md:hidden">
          <SidebarMobile />
        </div>
        <main className="col-span-12 flex h-screen justify-center md:col-span-8">
          <div className="h-full w-full overflow-y-scroll border-x border-slate-400">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageContainer;
