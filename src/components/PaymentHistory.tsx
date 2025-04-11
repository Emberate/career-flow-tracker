
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Receipt, Info } from 'lucide-react';

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
}

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (user?.email) {
      const paymentsKey = `payments_${user.email}`;
      const savedPayments = localStorage.getItem(paymentsKey);
      if (savedPayments) {
        setPayments(JSON.parse(savedPayments));
      }
    }
  }, [user]);

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Receipt className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No payment history</h3>
        <p className="mt-2 text-gray-500">
          You haven't made any payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Payment History</h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info size={16} />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">About your payments</h4>
                <p className="text-sm">
                  This shows your payment history for premium features. All payments are securely processed.
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
