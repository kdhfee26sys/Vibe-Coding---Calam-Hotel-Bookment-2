import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NewStaffModal } from '../../components/NewStaffModal/NewStaffModal';
import { Button } from '../../../../components/design-system/Button/Button';
import styles from './StaffManagementPage.module.css';

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  shift: string;
  status: 'Aktif' | 'Nonaktif';
}

const mockStaff: Staff[] = [
  { id: '1', name: 'Wulan Sari', email: 'wulan@calam.id', role: 'Manager', shift: 'Pagi', status: 'Aktif' },
  { id: '2', name: 'Rendra Kusuma', email: 'rendra@calam.id', role: 'Owner', shift: '-', status: 'Aktif' },
  { id: '3', name: 'Dita Anggraini', email: 'dita@calam.id', role: 'Receptionist', shift: 'Pagi', status: 'Aktif' },
  { id: '4', name: 'Joko Susilo', email: 'joko@calam.id', role: 'Housekeeping', shift: 'Siang', status: 'Aktif' },
  { id: '5', name: 'Sinta Dewi', email: 'sinta@calam.id', role: 'Finance', shift: 'Pagi', status: 'Nonaktif' },
  { id: '6', name: 'Amanda Putri', email: 'amanda@calam.id', role: 'Marketing', shift: 'Pagi', status: 'Aktif' },
];

export const StaffManagementPage: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>(mockStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStaff = (newStaff: Staff) => {
    setStaffList([...staffList, newStaff]);
  };

  const activeCount = staffList.filter(s => s.status === 'Aktif').length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Staff Management</h1>
          <p className={styles.subtitle}>{activeCount} active staff from {staffList.length} accounts.</p>
        </div>
        <div className={styles.actionArea}>
          <Button variant="primary" style={{ paddingLeft: '0.75rem' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Staff
          </Button>
        </div>
      </header>

      <div className={`${styles.tableContainer} animate-pop-in`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Shift</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th} style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className={styles.tr}>
                <td className={styles.td}>{staff.name}</td>
                <td className={`${styles.td} ${styles.emailText}`}>{staff.email}</td>
                <td className={styles.td}>{staff.role}</td>
                <td className={styles.td}>{staff.shift}</td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${staff.status === 'Aktif' ? styles.badgeActive : styles.badgeInactive}`}>
                    {staff.status === 'Aktif' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actionCell}>
                    <Button variant="secondary">Reset Password</Button>
                    <Button variant="secondary">
                      {staff.status === 'Aktif' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewStaffModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStaff={handleAddStaff}
      />
    </div>
  );
};
