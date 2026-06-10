import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import Footer from '../components/Footer';
import { store } from '../store';

const PLANS = [
  {
    key: 'discovery',
    name: 'Discovery',
    price: '$0',
    period: '/month',
    badge: 'Free forever',
    badgeColor: 'bg-green-100 text-green-700',
    description: 'Explore the MDisrupt network. Great for early evaluation.',
    features: [
      { text: 'Browse anonymized expert profiles' },
      { text: 'Submit expert hire requests' },
      { text: 'Access to all 7 service categories' },
      { text: 'Email support' },
    ],
    limitations: [
      'Expert profiles anonymized until engagement',
      'No dedicated account manager',
    ],
    cta: 'Start Free',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
  },
  {
    key: 'allaccess',
    name: 'All Access',
    price: '$5,000',
    period: '/year',
    badge: 'Most popular',
    badgeColor: 'bg-brand-100 text-brand-700',
    description: 'Full access to the expert network and priority matching.',
    features: [
      { text: 'Full expert profiles with contact info', note: null },
      { text: 'Unlimited expert hire requests', note: null },
      { text: 'Priority expert matching (48h)', note: null },
      { text: 'Dedicated account manager', note: null },
      { text: 'Analytics dashboard', note: null },
      { text: 'Phone & email support', note: null },
    ],
    limitations: [],
    cta: 'Get All Access',
    accent: '#2563eb',
    accentLight: '#eff6ff',
  },
];

export default function PlanSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('discovery');

  const handleContinue = () => {
    const plan = PLANS.find((p) => p.key === selected);
    store.setUser({ ...store.getUser(), plan: selected });
    if (selected === 'discovery') {
      navigate('/account-created');
    } else {
      navigate('/checkout');
    }
  };

  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <OnboardingHeader onLogout={handleLogout} />

      <div className="flex-1 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {['Account created', 'Email verified', 'Company info', 'Choose your plan'].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium ${i === 3 ? 'text-brand-700' : 'text-green-600'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < 3 ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'
                  }`}>
                    {i < 3 ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 3 && <div className="w-6 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Choose your plan</h1>
          <p className="text-sm text-gray-500 mb-2">You can upgrade or downgrade at any time.</p>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6 text-sm text-blue-800">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>
              Your subscription fee covers platform access only.
              Consulting fees and expert retainer rates are separate and agreed upon directly with each expert.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {PLANS.map((plan) => (
              <button
                key={plan.key}
                type="button"
                onClick={() => setSelected(plan.key)}
                className={`text-left rounded-2xl border-2 p-6 transition-all flex flex-col ${
                  selected === plan.key
                    ? 'border-brand-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                style={selected === plan.key ? { background: plan.accentLight } : {}}
              >
                {/* Fixed-height header so feature lists align across both cards */}
                <div className="min-h-[9.5rem]">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${plan.badgeColor}`}>{plan.badge}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selected === plan.key ? 'border-brand-600 bg-brand-600' : 'border-gray-300'
                    }`}>
                      {selected === plan.key && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold" style={{ color: plan.accent }}>{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-0">{plan.description}</p>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>{f.text}</span>
                    </li>
                  ))}
                  {plan.limitations.map((l, i) => (
                    <li key={`lim-${i}`} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      {l}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/company')}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>
            <button onClick={handleContinue} className="btn-gradient">
              {selected === 'discovery' ? 'Start Free' : 'Continue to Checkout'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
