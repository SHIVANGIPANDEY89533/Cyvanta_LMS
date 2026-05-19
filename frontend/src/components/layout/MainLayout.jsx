import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-wrap">
        <Topbar />
        <Outlet /> {/* <-- YEH BOHOT ZAROORI HAI */}
      </main>
    </div>
  );
};

export default MainLayout;