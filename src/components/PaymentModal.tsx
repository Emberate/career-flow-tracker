
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Missing information",
        description: "Please fill out all payment fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Record payment in localStorage
      const paymentData = {
        id: `pmt_${Date.now()}`,
        date: new Date().toISOString(),
        amount: 19.99,
        type: 'Premium Plan',
      };
      
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const paymentsKey = `payments_${currentUser.email}`;
      const existingPayments = JSON.parse(localStorage.getItem(paymentsKey) || '[]');
      existingPayments.push(paymentData);
      localStorage.setItem(paymentsKey, JSON.stringify(existingPayments));
      
      toast({
        title: "Payment successful!",
        description: "Your premium plan is now active.",
      });
      
      // Close modal after 1.5 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        // Reset form
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
      }, 1500);
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            Get advanced features for just $19.99/month
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Payment Successful!</h3>
            <p className="text-gray-500 mt-2">Thank you for upgrading to Premium.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardName" className="text-right">
                  Name on Card
                </Label>
                <Input 
                  id="cardName" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="col-span-3" 
                  placeholder="John Smith"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">
                  Card Number
                </Label>
                <Input 
                  id="cardNumber" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  className="col-span-3" 
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={16}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiryDate" className="text-right">
                  Expiry Date
                </Label>
                <Input 
                  id="expiryDate" 
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="col-span-1" 
                  placeholder="MM/YY"
                  maxLength={5}
                />
                <Label htmlFor="cvv" className="text-right">
                  CVV
                </Label>
                <Input 
                  id="cvv" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="col-span-1" 
                  placeholder="123"
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay $19.99
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
