import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { Header } from './Header/Header';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ theme, toggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={styles.mainWrapper}>
        <Header theme={theme} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
        <main className={styles.contentArea}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
