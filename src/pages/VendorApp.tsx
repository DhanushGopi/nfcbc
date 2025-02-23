import { useState } from 'react';
import { ArrowLeft, QrCode, Store, History, DollarSign, Settings, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { isNFCSupported, readNFCTag, writeNFCTag } from '@/lib/nfc';

interface NFCData {
  balance: number;
  lastUpdated: string;
  id: string;
}

export default function VendorApp() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(isNFCSupported());
  const [transactions] = useState([
    { id: 1, amount: 50, customer: 'John D.', status: 'completed', date: '2024-03-15' },
    { id: 2, amount: 35, customer: 'Sarah M.', status: 'completed', date: '2024-03-15' },
    { id: 3, amount: 25, customer: 'Mike R.', status: 'completed', date: '2024-03-14' },
  ]);

  const handlePaymentRequest = async () => {
    if (!amount || !nfcSupported) return;

    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // Read current balance from NFC tag
      const data = await readNFCTag() as NFCData;
      
      if (!data || typeof data.balance !== 'number') {
        alert('Error: Could not read balance from NFC tag');
        return;
      }

      if (data.balance < paymentAmount) {
        alert('Insufficient funds on NFC tag');
        return;
      }

      // Deduct amount and write back to tag
      const newBalance = data.balance - paymentAmount;
      await writeNFCTag({
        ...data,
        balance: newBalance,
        lastUpdated: new Date().toISOString()
      });

      alert(`Payment successful! $${paymentAmount} deducted from NFC tag.`);
      setAmount('');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Vendor Terminal</h1>
        </div>

        {!nfcSupported && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Smartphone className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  NFC is not supported on this device. Please use an NFC-enabled Android device with Chrome browser.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Request Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <Store className="w-8 h-8 text-green-600" />
            <QrCode className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold mb-4">Request Payment</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter amount"
              disabled={loading}
            />
          </div>
          <Button 
            onClick={handlePaymentRequest}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!amount || loading || !nfcSupported}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" />
                Request Payment
              </>
            )}
          </Button>
        </div>

        {/* Today's Transactions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Transactions</h3>
            <History className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{transaction.customer}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-green-600">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button variant="outline">
            View Reports
          </Button>
          <Link to="/vendor/settings" className="w-full">
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}