import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { store } from '../store';

// ─── Card icons matching the real platform ────────────────────────────────────

function IconOnDemand() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="13" r="7" fill="#ef4444"/>
      <path d="M2 36c0-9 5.4-16 12-16" fill="#ef4444"/>
      <circle cx="28" cy="11" r="6" fill="#fca5a5"/>
      <path d="M20 36c0-8 4.8-14 10-14" fill="#fca5a5"/>
      {/* Lightning bolt — "on demand" urgency */}
      <polygon points="33,6 29,16 33,16 29,26 39,12 34,12 39,6" fill="#f97316" opacity="0.85"/>
    </svg>
  );
}

function IconInTheLoop() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* Person silhouette */}
      <circle cx="14" cy="13" r="7" fill="#6366f1"/>
      <path d="M2 36c0-9 5.4-16 12-16" fill="#6366f1"/>
      {/* AI circuit/loop element */}
      <rect x="24" y="8" width="14" height="14" rx="3" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
      <text x="31" y="19" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4f46e5">AI</text>
      {/* Loop arrow */}
      <path d="M26 26 Q31 32 36 26" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <polygon points="36,22 38,28 32,27" fill="#6366f1"/>
    </svg>
  );
}

function IconHourly() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="13" r="7" fill="#f97316"/>
      <path d="M2 36c0-9 5.4-16 12-16" fill="#f97316"/>
      <circle cx="30" cy="24" r="10" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5"/>
      <line x1="30" y1="17" x2="30" y2="24" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="24" x2="35" y2="28" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function IconHire() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="10" cy="12" r="6" fill="#ef4444"/>
      <path d="M1 34c0-7.5 4.2-13 9-13" fill="#ef4444"/>
      <path d="M19 21 L24 21" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2,1.5" markerEnd="url(#hire-arr)"/>
      <defs><marker id="hire-arr" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#dc2626"/></marker></defs>
      <circle cx="31" cy="11" r="6" fill="#dc2626"/>
      <path d="M23 34c0-7.5 4-13 8-13" fill="#dc2626"/>
      <circle cx="38" cy="10" r="4" fill="#fca5a5"/>
    </svg>
  );
}

function IconPanel() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* 4 people around a table */}
      <ellipse cx="20" cy="26" rx="16" ry="5" fill="#fde8d8" stroke="#f97316" strokeWidth="1"/>
      <circle cx="10" cy="14" r="5.5" fill="#ef4444"/>
      <path d="M3 28c0-7 3.2-12 7-12" fill="#ef4444"/>
      <circle cx="20" cy="12" r="6" fill="#dc2626"/>
      <path d="M12 28c0-8 3.6-14 8-14" fill="#dc2626"/>
      <circle cx="30" cy="14" r="5.5" fill="#ef4444"/>
      <path d="M23 28c0-7 3.2-12 7-12" fill="#ef4444"/>
    </svg>
  );
}

function IconBoard() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      {/* Formal row of 4 */}
      <circle cx="6" cy="14" r="5" fill="#2563eb"/>
      <circle cx="16" cy="11" r="6" fill="#1d4ed8"/>
      <circle cx="26" cy="11" r="6" fill="#1d4ed8"/>
      <circle cx="36" cy="14" r="5" fill="#2563eb"/>
      <line x1="2" y1="23" x2="38" y2="23" stroke="#93c5fd" strokeWidth="1.5"/>
      <path d="M0 36c0-7 2.5-11 6-11" fill="#2563eb"/>
      <path d="M8 36c0-8 4-13 8-13" fill="#1d4ed8"/>
      <path d="M19 36c0-8 3.6-13 7-13" fill="#1d4ed8"/>
      <path d="M29 36c0-7 3.2-11 7-11" fill="#2563eb"/>
    </svg>
  );
}

function IconSomethingElse() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="16" cy="13" r="7" fill="#ef4444"/>
      <path d="M4 36c0-9 5.4-16 12-16" fill="#ef4444"/>
      {/* Question mark badge */}
      <circle cx="30" cy="28" r="10" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="30" y="33" textAnchor="middle" fontSize="14" fontWeight="800" fill="#dc2626">?</text>
    </svg>
  );
}

function IconInsights() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="14" cy="13" r="7" fill="#7c3aed"/>
      <path d="M2 36c0-9 5.4-16 12-16" fill="#7c3aed"/>
      {/* Bar chart / survey */}
      <rect x="22" y="24" width="5" height="12" fill="#a78bfa"/>
      <rect x="29" y="18" width="5" height="18" fill="#7c3aed"/>
      <rect x="36" y="12" width="5" height="24" fill="#6d28d9"/>
      {/* Trending arrow */}
      <polyline points="22,22 29,16 36,10" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="36" cy="10" r="2" fill="#0ea5e9"/>
    </svg>
  );
}

// ─── Service definitions ──────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'ondemand',
    Icon: IconOnDemand,
    name: 'Health Expert OnDemand',
    desc: 'Fractional health leaders embedded within your team for hands-on support.',
  },
  {
    id: 'intheloop',
    Icon: IconInTheLoop,
    name: 'Health Expert In The Loop',
    desc: 'Work with clinicians to refine, validate, and train your health AI models.',
    badge: 'New',
    badgeStyle: 'bg-green-100 text-green-700',
  },
  {
    id: 'hourly',
    Icon: IconHourly,
    name: 'Health Expert Hourly',
    desc: 'Hourly 1:1 meetings with clinicians, health system leaders, payer executives, and more.',
  },
  {
    id: 'hire',
    Icon: IconHire,
    name: 'Health Expert Hire',
    desc: 'Hire experienced and vetted full-time employees (FTEs) to scale your team.',
  },
  {
    id: 'panel',
    Icon: IconPanel,
    name: 'Health Expert Panel',
    desc: 'Focus groups to test ideas with clinicians, health system leaders, payer executives, and more.',
  },
  {
    id: 'board',
    Icon: IconBoard,
    name: 'Health Expert Board',
    desc: 'Build strategic advisory boards across 50+ clinical specialties for ongoing strategic engagement.',
  },
  {
    id: 'other',
    Icon: IconSomethingElse,
    name: 'Something Else',
    desc: 'Tell us your goals—get a customized expert solution.',
  },
  {
    id: 'insights',
    Icon: IconInsights,
    name: 'Health Expert Insights',
    desc: 'Fast market insights through targeted health expert surveys.',
    badge: 'Coming Soon',
    badgeStyle: 'bg-gray-100 text-gray-500 border border-gray-300',
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const user = store.getUser();
  const plan = user?.plan || 'discovery';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader activeTab="dashboard" />

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

        <div className="mb-3">
          <h2 className="text-sm font-semibold text-gray-800">Health Expert Services</h2>
          <p className="text-xs text-gray-500">What type of project do you want to create?</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              className="relative bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-brand-300 hover:shadow-md transition-all group"
            >
              {svc.badge && (
                <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${svc.badgeStyle}`}>
                  {svc.badge}
                </span>
              )}
              <div className="mb-3">
                <svc.Icon />
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">{svc.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{svc.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          <p className="font-medium text-gray-500">No recent project activity</p>
          <button className="mt-3 px-5 py-2 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700">
            Create Project
          </button>
        </div>
      </main>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dashboard variants:</span>
          <button onClick={() => navigate('/client-dashboard-1')} className="text-brand-600 hover:underline text-xs">Variant 1 — Wizard</button>
          <button onClick={() => navigate('/client-dashboard-2')} className="text-brand-600 hover:underline text-xs">Variant 2 — Wheel</button>
          <button onClick={() => navigate('/client-dashboard-3')} className="text-brand-600 hover:underline text-xs">Variant 3 — Accordion</button>
        </div>
      </div>
    </div>
  );
}
