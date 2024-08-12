import { useLocation } from 'react-router-dom';
import { SideBar } from './SideBar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPath = location.pathname.startsWith('/login');
  const isSignupPath = location.pathname.startsWith('/signup');

  const isExceptSideBarPage = isLoginPath || isSignupPath;

  return (
    <>
      {/* {!isExceptSideBarPage && <SideBar />} */}
      {children}
    </>
  );
};

export default Layout;
