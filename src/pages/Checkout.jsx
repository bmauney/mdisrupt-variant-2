import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import Footer from '../components/Footer';
import { store } from '../store';

export default function Checkout() {
  const navigate = useNavigate();
  const user = store.getUser();
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const set = (f) => (e) => setCard((p) => ({ ...p, [f]: e.target.value }));

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/account-created'), 1400);
  };

  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <OnboardingHeader onLogout={handleLogout} />

      <div className="flex-1 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">All Access Plan (annual)</span>
                <span className="font-semibold">$5,000</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                <span>Total due today</span>
                <span>$5,000</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Platform access only. Consulting fees and expert retainer rates are billed separately per engagement.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Powered by Stripe
            </div>
          </div>

          {/* Payment form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Payment Details</h2>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Name on card</label>
                <input className="input-field" placeholder="Jane Smith" value={card.name} onChange={set('name')} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Card number</label>
                <input className="input-field" placeholder="1234 5678 9012 3456" value={card.number} onChange={set('number')} required />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
                  <input className="input-field" placeholder="MM / YY" value={card.expiry} onChange={set('expiry')} required />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">CVC</label>
                  <input className="input-field" placeholder="123" value={card.cvc} onChange={set('cvc')} required />
                </div>
              </div>
              <p className="text-xs text-gray-400">
                By subscribing, you authorize MDisrupt to charge $5,000 annually until cancelled.
              </p>
              <button type="submit" disabled={loading} className="btn-gradient disabled:opacity-60">
                {loading ? 'Processing…' : 'Subscribe — $5,000/yr'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
