import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-wrap">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;