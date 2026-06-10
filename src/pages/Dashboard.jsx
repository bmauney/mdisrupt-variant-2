import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { store } from '../store';

const SERVICES = [
  { id: 'hire', icon: '🔍', name: 'Health Expert Hire', desc: 'Source a full-time or fractional expert for your team.', badge: 'NEW' },
  { id: 'advisory', icon: '💡', name: 'Expert Advisory', desc: 'On-demand strategic guidance from senior health professionals.' },
  { id: 'research', icon: '📊', name: 'Market Research', desc: 'Custom research on payers, providers, and health markets.' },
  { id: 'diligence', icon: '🔎', name: 'Clinical Due Diligence', desc: 'Expert clinical review for investment and M&A decisions.' },
  { id: 'speaker', icon: '🎤', name: 'Expert Speaker', desc: 'Book a health expert for panels, podcasts, or events.' },
  { id: 'training', icon: '🎓', name: 'Team Training', desc: 'Custom education sessions for your team.' },
  { id: 'other', icon: '✦', name: 'Custom Engagement', desc: 'Something else? Tell us what you need.' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = store.getUser();
  const plan = user?.plan || 'discovery';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader activeTab="dashboard" />

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'there'} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">What do you need help with today?</p>
        </div>

        {plan === 'discovery' && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-800">You're on the Discovery Plan</p>
              <p className="text-xs text-purple-600 mt-0.5">Expert profiles are anonymized. Upgrade to see full names and contact info.</p>
            </div>
            <button
              onClick={() => navigate('/plan')}
              className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700"
            >
              Upgrade
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              className="relative bg-white rounded-2xl border border-gray-200 p-5 text-left hover:border-brand-300 hover:shadow-md transition-all group"
            >
              {svc.badge && (
                <span className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                  {svc.badge}
                </span>
              )}
              <div className="text-2xl mb-3">{svc.icon}</div>
              <p className="text-sm font-semibold text-gray-800 mb-1">{svc.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
