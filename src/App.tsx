import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Wallet, Store, ArrowRight} from 'lucide-react';
import { Button } from './components/ui/Button';
import UserApp from './pages/UserApp';
import VendorApp from './pages/VendorApp';
import dpaylogo from './assets/dpaylogo.svg';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserApp />} />
        <Route path="/vendor" element={<VendorApp />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <div className="w-[auto]">
              <div className="text-center">
                <div className='w-[auto] mx-auto flex justify-center items-center py-[25px] bg-white'>
                <img src={dpaylogo} className='w-[100px] h-[25px]'/>
                </div>
                

{/* Hero Section */}
            <section className="py-20 px-4 md:px-8">
              <div className="max-w-2xl mx-auto flex justify-center gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    <span className="gradient-text">Offline Payments</span> for India's Next Billion
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    DPay is a revolutionary blockchain-powered NFC payment system that works without internet or banks. Perfect for India's cash-dependent economy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
                    <Link to="/user">
                      <Button size="lg" className="font-semibold bg-hero-gradient text-white hover:opacity-90 focus-visible:ring-primary-500">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-12">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">85%</p>
                      <p className="text-sm text-gray-500">Cash Preference</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">35%</p>
                      <p className="text-sm text-gray-500">Poor Connectivity</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">190M+</p>
                      <p className="text-sm text-gray-500">Unbanked Indians</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* App Access Section */}
            <section id="access" className="py-20 px-4 md:px-8 bg-gray-50">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">Access DPay</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Choose the app that fits your needs</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* User App Card */}
                  <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">User App</h2>
                    <p className="text-gray-600 mb-8 text-center">
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
                  <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center">
                        <Store className="w-8 h-8 text-secondary" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Vendor App</h2>
                    <p className="text-gray-600 mb-8 text-center">
                      Accept payments, manage transactions, and process offline NFC
                      payments securely.
                    </p>
                    <Link to="/vendor">
                      <Button className="w-full" variant="secondary">
                        Access Vendor App
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white p-[20px]">
                <div className="text-center text-gray-400 text-sm">
                  <p>© 2025 DPay - All rights reserved.</p>
                </div>
            </footer>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;