import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
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
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'U';
  const plan = user?.plan || 'discovery';

  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <Logo />
          <nav className="flex items-center gap-6 ml-6 text-sm font-medium text-gray-600">
            <button className="text-brand-700 border-b-2 border-brand-600 pb-0.5">Dashboard</button>
            <button className="hover:text-gray-900">My Meetings</button>
            <button className="hover:text-gray-900">Projects</button>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            {/* Plan badge — Discovery Plan (no "No Credits" jargon) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {plan === 'discovery' ? 'Discovery Plan' : 'All Access'}
              </span>
              {plan === 'discovery' && (
                <button
                  onClick={() => navigate('/plan')}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                >
                  Upgrade
                </button>
              )}
            </div>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-gray-700">Logout</button>
          </div>
        </div>
      </header>

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
