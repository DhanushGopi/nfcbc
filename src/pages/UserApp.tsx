import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, History, Wallet, Settings, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { isNFCSupported, readNFCTag, writeNFCTag } from '@/lib/nfc';

interface NFCData {
  balance: number;
  lastUpdated: string;
  id: string;
}

export default function UserApp() {
  const [balance, setBalance] = useState<number>(0);
  const [nfcSupported, setNfcSupported] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions] = useState([
    { id: 1, type: 'payment', amount: -50, merchant: 'Coffee Shop', date: '2024-03-15' },
    { id: 2, type: 'load', amount: 200, merchant: 'Top Up', date: '2024-03-14' },
    { id: 3, type: 'payment', amount: -30, merchant: 'Bookstore', date: '2024-03-13' },
  ]);

  useEffect(() => {
    setNfcSupported(isNFCSupported());
  }, []);

  const handleLoadMoney = async () => {
    if (!nfcSupported) {
      alert('NFC is not supported on this device');
      return;
    }

    setLoading(true);
    try {
      // Read current data from NFC tag
      const data = await readNFCTag();
      
      // Update balance (add 100 for demo)
      const newBalance = (data?.balance || 0) + 100;
      
      // Write updated data back to NFC tag
      await writeNFCTag({
        balance: newBalance,
        lastUpdated: new Date().toISOString(),
        id: data?.id || crypto.randomUUID()
      });

      setBalance(newBalance);
      alert('Successfully loaded $100 to your NFC tag!');
    } catch (error) {
      console.error('Error loading money:', error);
      alert('Error loading money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReadBalance = async () => {
    if (!nfcSupported) {
      alert('NFC is not supported on this device');
      return;
    }

    setLoading(true);
    try {
      const data = await readNFCTag();
      if (data && typeof data.balance === 'number') {
        setBalance(data.balance);
        alert('Balance successfully read from NFC tag!');
      } else {
        alert('No valid balance found on NFC tag. Try loading money first.');
      }
    } catch (error) {
      console.error('Error reading balance:', error);
      alert('Error reading balance. Please try again.');
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
          <h1 className="text-2xl font-bold">User Wallet</h1>
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

        {/* Balance Card */}
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8" />
            <Shield className="w-6 h-6" />
          </div>
          <p className="text-sm mb-1">Available Balance</p>
          <h2 className="text-3xl font-bold mb-4">${balance.toFixed(2)}</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleLoadMoney}
              className="bg-white text-blue-600 hover:bg-blue-50"
              disabled={loading || !nfcSupported}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Load Money
            </Button>
            <Button 
              onClick={handleReadBalance}
              className="bg-white text-blue-600 hover:bg-blue-50"
              disabled={loading || !nfcSupported}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Read Tag
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">{transaction.merchant}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full mb-3"
            onClick={handleReadBalance}
            disabled={loading || !nfcSupported}
          >
            Read NFC Balance
          </Button>
          <Link to="/user/settings">
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