import { ReactNode } from 'react';
import Titlebar from '@/components/Titlebar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/components/themeProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <motion.main
        className={'w-[100vw]'}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <br />
        <Titlebar />
        <br />
        <br />
        <Separator />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Footer />
      </motion.main>
    </>
  );
};

export default Layout;
