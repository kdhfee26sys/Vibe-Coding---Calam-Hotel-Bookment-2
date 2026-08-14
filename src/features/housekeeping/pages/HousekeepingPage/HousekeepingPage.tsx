import React, { useState, useMemo, useEffect } from 'react';
import { Select } from '../../../../components/design-system/Select/Select';
import { Toast } from '../../../../components/shared/Toast/Toast';
import styles from './HousekeepingPage.module.css';

interface Room {
  id: string;
  number: string;
  type: string;
  status: 'Clean' | 'Inspected' | 'Dirty' | 'In Progress';
  assignee: string;
}

const initialRooms: Room[] = [
  { id: '1', number: 'Room 101', type: 'Standard', status: 'Clean', assignee: '' },
  { id: '2', number: 'Room 105', type: 'Standard', status: 'Inspected', assignee: '' },
  { id: '3', number: 'Room 102', type: 'Standard', status: 'Dirty', assignee: 'Badru' },
  { id: '4', number: 'Room 204', type: 'Deluxe', status: 'Clean', assignee: '' },
  { id: '5', number: 'Room 203', type: 'Deluxe', status: 'Clean', assignee: '' },
  { id: '6', number: 'Room 302', type: 'Suite', status: 'Clean', assignee: '' },
  { id: '7', number: 'Room 205', type: 'Deluxe', status: 'Dirty', assignee: 'Sari' },
  { id: '8', number: 'Room 301', type: 'Suite', status: 'In Progress', assignee: 'Ahnaf' },
];

export const HousekeepingPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [reportingRooms, setReportingRooms] = useState<Record<string, boolean>>({});
  const [recentlyAssigned, setRecentlyAssigned] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'neutral'>('success');

  const getBadgeClass = (status: Room['status']) => {
    switch (status) {
      case 'Clean': return styles.badgeClean;
      case 'Inspected': return styles.badgeInspected;
      case 'Dirty': return styles.badgeDirty;
      case 'In Progress': return styles.badgeInProgress;
      default: return '';
    }
  };

  const handleAssignAll = () => {
    const workers = ['Badru', 'Sari', 'Ahnaf', 'Ahmad', 'Pogba', 'Fred'];
    let workerIndex = 0;
    let assignedCount = 0;
    const newRecentlyAssigned: Record<string, boolean> = {};

    setRooms(prevRooms => prevRooms.map(room => {
      if (!room.assignee && (room.status === 'Dirty' || room.status === 'In Progress')) {
        const assignedWorker = workers[workerIndex % workers.length];
        workerIndex++;
        assignedCount++;
        newRecentlyAssigned[room.id] = true;
        return { ...room, assignee: assignedWorker };
      }
      return room;
    }));

    if (assignedCount > 0) {
      setRecentlyAssigned(prev => ({ ...prev, ...newRecentlyAssigned }));
      setToastVariant('success');
      setToastMessage(`Successfully auto-assigned ${assignedCount} rooms!`);
      setTimeout(() => {
        setRecentlyAssigned(prev => {
          const cleared = { ...prev };
          Object.keys(newRecentlyAssigned).forEach(id => delete cleared[id]);
          return cleared;
        });
      }, 3000);
    } else {
      setToastVariant('neutral');
      setToastMessage('No dirty rooms needed assignment.');
    }
  };

  const handleAssign = (id: string, assignee: string) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, assignee } : r));
    
    if (assignee !== '') {
      setRecentlyAssigned(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setRecentlyAssigned(prev => {
          const cleared = { ...prev };
          delete cleared[id];
          return cleared;
        });
      }, 3000);
    }
  };

  const handleAction = (id: string, action: 'start' | 'done' | 'inspect' | 'report') => {
    if (action === 'report') {
      setReportingRooms(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setReportingRooms(prev => ({ ...prev, [id]: false }));
        setRooms(prevRooms => prevRooms.map(r => r.id === id ? { ...r, status: 'Dirty' } : r));
      }, 3000); // Wait 3 seconds
      return;
    }

    setRooms(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (action === 'start') {
        return { ...r, status: 'In Progress', assignee: r.assignee || 'Badru' };
      }
      if (action === 'done') {
        return { ...r, status: 'Clean' };
      }
      if (action === 'inspect') {
        return { ...r, status: 'Inspected' };
      }
      return r;
    }));
  };

  const filteredRooms = useMemo(() => {
    if (statusFilter === 'All Status') return rooms;
    return rooms.filter(room => room.status === statusFilter);
  }, [rooms, statusFilter]);

  const cleanCount = rooms.filter(r => r.status === 'Clean' || r.status === 'Inspected').length;
  const totalRooms = rooms.length;
  const progressPercent = totalRooms > 0 ? Math.round((cleanCount / totalRooms) * 100) : 0;

  const getCardStyle = (status: Room['status'], id: string) => {
    if (reportingRooms[id]) {
      return { border: '2px solid #D92D20', backgroundColor: 'rgba(217, 45, 32, 0.05)' }; // Red
    }
    if (status === 'In Progress') {
      return { border: '2px solid #006BFF', backgroundColor: 'rgba(0, 107, 255, 0.05)' }; // Blue
    }
    if (status === 'Clean') {
      return { border: '2px solid #7F56D9', backgroundColor: 'rgba(127, 86, 217, 0.05)' }; // Purple
    }
    if (status === 'Inspected') {
      return { border: '2px solid #F79009', backgroundColor: 'rgba(247, 144, 9, 0.05)' }; // Orange
    }
    return {};
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Housekeeping</h1>
          <p className={styles.subtitle}>{cleanCount} of {totalRooms} rooms are ready.</p>
        </div>
        <div className={styles.actionArea}>
          <Select
            options={['All Status', 'Clean', 'Inspected', 'Dirty', 'In Progress']}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <button className={styles.assignAllBtn} onClick={handleAssignAll}>
            Assign All
          </button>
        </div>
      </header>

      <div className={`${styles.progressCard} animate-pop-in`}>
        <h2 className={styles.progressHeader}>Today's cleaning progress</h2>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className={styles.progressText}>{progressPercent}% completed</p>
      </div>

      <div className={`${styles.grid} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
        {filteredRooms.map((room) => (
          <div key={room.id} className={styles.roomCard} style={getCardStyle(room.status, room.id)}>
            <div className={styles.roomHeader}>
              <div className={styles.roomTitleGroup}>
                <h3 className={styles.roomNumber}>{room.number}</h3>
                <p className={styles.roomType}>{room.type}</p>
              </div>
              <span className={`${styles.badge} ${getBadgeClass(room.status)}`}>
                {reportingRooms[room.id] ? 'Reporting...' : room.status}
              </span>
            </div>

            <div className={styles.assigneeSection}>
              <label className={styles.assigneeLabel}>Assignee</label>
              <div style={{ width: '100%' }}>
                <Select
                  options={['Select Workers', 'Badru', 'Sari', 'Ahnaf', 'Ahmad', 'Pogba', 'Fred']}
                  value={room.assignee || 'Select Workers'}
                  onChange={(val) => handleAssign(room.id, val === 'Select Workers' ? '' : val)}
                />
                {recentlyAssigned[room.id] && (
                  <p className={`${styles.successText} animate-pop-in`}>Successfully assigned!</p>
                )}
              </div>
            </div>

            <div className={styles.cardActions}>
              <button 
                className={styles.actionBtn} 
                onClick={() => handleAction(room.id, 'start')}
                disabled={room.status === 'In Progress' || room.status === 'Clean' || room.status === 'Inspected'}
              >
                Start
              </button>
              <button 
                className={styles.actionBtn}
                onClick={() => handleAction(room.id, 'done')}
                disabled={room.status === 'Clean'}
              >
                Done
              </button>
              <button 
                className={styles.actionBtn}
                onClick={() => handleAction(room.id, 'inspect')}
              >
                Inspect
              </button>
              <button 
                className={styles.actionBtn}
                onClick={() => handleAction(room.id, 'report')}
                disabled={reportingRooms[room.id]}
              >
                Report
              </button>
            </div>
          </div>
        ))}
        {filteredRooms.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#667085' }}>
            No rooms found for this status.
          </div>
        )}
      </div>

      <Toast 
        isVisible={!!toastMessage} 
        onClose={() => setToastMessage('')} 
        message={toastMessage} 
        variant={toastVariant}
      />
    </div>
  );
};
