import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Wallet, Store } from 'lucide-react';
import { Button } from './components/ui/Button';
import UserApp from './pages/UserApp';
import VendorApp from './pages/VendorApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserApp />} />
        <Route path="/vendor" element={<VendorApp />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                  Blockchain-Enhanced NFC Payment System
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {/* User App Card */}
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-4">
                      <Wallet className="w-12 h-12 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">User App</h2>
                    <p className="text-gray-600 mb-6">
                      Manage your digital wallet, load funds, and make secure offline payments
                      using NFC technology.
                    </p>
                    <Link to="/user">
                      <Button className="w-full">
                        Access User App
                      </Button>
                    </Link>
                  </div>

                  {/* Vendor App Card */}
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-4">
                      <Store className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Vendor App</h2>
                    <p className="text-gray-600 mb-6">
                      Accept payments, manage transactions, and process offline NFC
                      payments securely.
                    </p>
                    <Link to="/vendor">
                      <Button className="w-full" variant="outline">
                        Access Vendor App
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;