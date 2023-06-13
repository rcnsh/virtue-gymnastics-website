import { ReactNode } from "react";
import Titlebar from "@/components/Titlebar";
import Bottombar from "@/components/Bottombar";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Titlebar />
      <br />
      <Separator />
      <div className={"flex"}>
        <div style={{ width: "100%" }}>
          <main className={"p-2 font-mono flex-1 overflow-y-auto"}>
            {children}
          </main>
        </div>
      </div>
      <Bottombar />
    </>
  );
};

export default Layout;
