import { ReactNode } from "react";
import Titlebar from "@/components/Titlebar";
import Bottombar from "@/components/Bottombar";
import { Separator } from "@/components/ui/separator";
import styles from "@/styles/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <br />
      <Titlebar />
      <br />
      <br />
      <Separator />
      <div className={"flex"}>
        <div className={styles.layout}>
          <div style={{ width: "100%" }}>
            <main className={styles.contentWrapper}>{children}</main>
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
};

export default Layout;
