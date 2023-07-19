import { ReactNode } from 'react';
import Titlebar from '@/components/Titlebar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

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
      {children}
      <Footer />
    </>
  );
};

export default Layout;
