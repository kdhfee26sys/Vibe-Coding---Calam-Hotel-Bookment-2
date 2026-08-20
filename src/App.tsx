import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { LoginPage } from './features/auth/pages/LoginPage/LoginPage';
import { RegisterPage } from './features/auth/pages/RegisterPage/RegisterPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage/DashboardPage';
import { BookingManagementPage } from './features/bookings/pages/BookingManagementPage/BookingManagementPage';
import { RoomManagementPage } from './features/rooms/pages/RoomManagementPage/RoomManagementPage';
import { ReservationCalendarPage } from './features/calendar/pages/ReservationCalendarPage/ReservationCalendarPage';
import { GuestManagementPage } from './features/guests/pages/GuestManagementPage/GuestManagementPage';
import { CheckInOutPage } from './features/check-in-out/pages/CheckInOutPage/CheckInOutPage';
import { HousekeepingPage } from './features/housekeeping/pages/HousekeepingPage/HousekeepingPage';
import { PaymentCenterPage } from './features/payments/pages/PaymentCenterPage/PaymentCenterPage';
import { ReviewManagementPage } from './features/reviews/pages/ReviewManagementPage/ReviewManagementPage';
import { StaffManagementPage } from './features/staff/pages/StaffManagementPage/StaffManagementPage';
import { ReportsPage } from './features/reports/pages/ReportsPage/ReportsPage';
import { SettingsPage } from './features/settings/pages/SettingsPage/SettingsPage';
import { ProfilePage } from './features/profile/pages/ProfilePage/ProfilePage';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<MainLayout theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bookings" element={<BookingManagementPage />} />
          <Route path="/calendar" element={<ReservationCalendarPage />} />
          <Route path="/rooms" element={<RoomManagementPage />} />
          <Route path="/guests" element={<GuestManagementPage />} />
          <Route path="/check-in-out" element={<CheckInOutPage />} />
          <Route path="/housekeeping" element={<HousekeepingPage />} />
          <Route path="/payment" element={<PaymentCenterPage />} />
          <Route path="/reviews" element={<ReviewManagementPage />} />
          <Route path="/staff" element={<StaffManagementPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more routes here later */}
        </Route>
      </Routes>
      
      {/* Theme Toggle Button (only on Auth pages, inside MainLayout we have it in Header) */}
      <Routes>
        <Route path="/login" element={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/register" element={<ThemeToggle theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}

// Extract ThemeToggle so we can use it conditionally
const ThemeToggle = ({ theme, toggleTheme }: { theme: 'light'|'dark', toggleTheme: () => void }) => (
  <button 
    onClick={toggleTheme}
    style={{
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      backgroundColor: 'var(--color-bg-bg-gray-bg-primary)',
      color: 'var(--color-text-text-gray-text-primary)',
      border: '1px solid var(--color-border-border-gray-border-secondary)',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.2s ease'
    }}
    aria-label="Toggle Theme"
  >
    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
  </button>
);

export default App;
