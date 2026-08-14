import React, { useState, useMemo } from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '../../../../components/design-system/Button/Button';
import { Select } from '../../../../components/design-system/Select/Select';
import { NotePaymentModal } from '../../components/NotePaymentModal/NotePaymentModal';
import styles from './PaymentCenterPage.module.css';

interface Payment {
  id: string;
  bookingId: string;
  guest: string;
  method: string;
  date: string;
  status: 'Paid' | 'Partial' | 'Refunded' | 'Unpaid';
  amount: string;
}

const initialPayments: Payment[] = [
  { id: 'PAY-9001', bookingId: 'BK-1042', guest: 'Andini Prasetya', method: 'Bank Transfer', date: '2026-07-29', status: 'Paid', amount: 'Rp 2.400.000' },
  { id: 'PAY-9002', bookingId: 'BK-1044', guest: 'Clara Wijaya', method: 'Credit Card', date: '2026-07-29', status: 'Partial', amount: 'Rp 4.000.000' },
  { id: 'PAY-9003', bookingId: 'BK-1046', guest: 'Erika Santoso', method: 'QRIS', date: '2026-07-28', status: 'Paid', amount: 'Rp 1.500.000' },
  { id: 'PAY-9004', bookingId: 'BK-1047', guest: 'Farhan Maulana', method: 'Bank Transfer', date: '2026-07-27', status: 'Refunded', amount: 'Rp 3.500.000' },
  { id: 'PAY-9005', bookingId: 'BK-1043', guest: 'Bagas Wirawan', method: 'Unpaid', date: '2026-07-31', status: 'Unpaid', amount: 'Rp 750.000' },
];

export const PaymentCenterPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const getBadgeClass = (status: Payment['status']) => {
    switch (status) {
      case 'Paid': return styles.badgePaid;
      case 'Partial': return styles.badgePartial;
      case 'Refunded': return styles.badgeRefunded;
      case 'Unpaid': return styles.badgeUnpaid;
      default: return '';
    }
  };

  const handleAction = (id: string, action: 'done' | 'refund') => {
    setPayments(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (action === 'done') {
        return { ...p, status: 'Paid' };
      }
      if (action === 'refund') {
        return { ...p, status: 'Refunded' };
      }
      return p;
    }));
  };

  const filteredPayments = useMemo(() => {
    if (statusFilter === 'All Status') return payments;
    return payments.filter(p => p.status === statusFilter);
  }, [payments, statusFilter]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Payment Center</h1>
          <p className={styles.subtitle}>All payment transactions and invoice status.</p>
        </div>
        <div className={styles.actionArea}>
          <Select
            options={['All Status', 'Paid', 'Partial', 'Refunded', 'Unpaid']}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Button variant="secondary">
            <Download size={16} /> Export
          </Button>
          <Button variant="primary" onClick={() => setIsNoteModalOpen(true)}>
            <Plus size={16} /> Note Payment
          </Button>
        </div>
      </header>

      <div className={`${styles.summaryGrid} animate-pop-in`}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Total Received</p>
          <h2 className={styles.summaryValue}>Rp 3.900.000</h2>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Outstanding</p>
          <h2 className={styles.summaryValue}>Rp 4.750.000</h2>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>Transactions</p>
          <h2 className={styles.summaryValue}>{payments.length} transactions</h2>
        </div>
      </div>

      <div className={`${styles.tableContainer} animate-pop-in`} style={{ animationDelay: '0.1s' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Booking</th>
              <th className={styles.th}>Guest</th>
              <th className={styles.th}>Method</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th} style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className={styles.tr}>
                <td className={styles.td}>{payment.id}</td>
                <td className={styles.td}>{payment.bookingId}</td>
                <td className={styles.td}>{payment.guest}</td>
                <td className={styles.td}>{payment.method}</td>
                <td className={styles.td}>{payment.date}</td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${getBadgeClass(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className={styles.td}>{payment.amount}</td>
                <td className={styles.td}>
                  <div className={styles.actionCell}>
                    <button className={styles.actionBtn}>Invoice</button>
                    {payment.status === 'Paid' && (
                      <button className={styles.actionBtn} onClick={() => handleAction(payment.id, 'refund')}>Refund</button>
                    )}
                    {(payment.status === 'Partial' || payment.status === 'Unpaid') && (
                      <button className={styles.actionBtnPrimary} onClick={() => handleAction(payment.id, 'done')}>Mark as Done</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#667085' }}>
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NotePaymentModal 
        isOpen={isNoteModalOpen} 
        onClose={() => setIsNoteModalOpen(false)} 
        onPaymentAdded={(newPayment) => {
          setPayments(prev => [
            { ...newPayment, id: `PAY-${9000 + prev.length + 1}` },
            ...prev
          ]);
        }} 
      />
    </div>
  );
};
