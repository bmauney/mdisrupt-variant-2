import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { store } from '../store';

// ─── Silhouette icons (small inline SVGs) ────────────────────────────────────

const icons = {
  partial: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <defs><clipPath id="cd3-half"><rect x="0" y="0" width="21" height="40"/></clipPath></defs>
      <g clipPath="url(#cd3-half)"><circle cx="20" cy="12" r="8" fill="#a78bfa"/><path d="M2 38c0-9.9 8.1-18 18-18s18 8.1 18 18" fill="#a78bfa"/></g>
      <line x1="21" y1="2" x2="21" y2="38" stroke="#ddd6fe" strokeWidth="1" strokeDasharray="3,2"/>
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="14" cy="11" r="7" fill="#a78bfa"/>
      <path d="M2 36c0-7.7 5.4-14 12-14" fill="#a78bfa"/>
      <polygon points="28,4 22,20 28,20 22,36 36,16 28,16 36,4" fill="#fbbf24"/>
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="14" cy="11" r="7" fill="#a78bfa"/>
      <path d="M2 36c0-7.7 5.4-14 12-14" fill="#a78bfa"/>
      <rect x="24" y="10" width="14" height="20" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2"/>
      <rect x="28" y="8" width="6" height="4" rx="1" fill="#6366f1"/>
      <line x1="27" y1="17" x2="35" y2="17" stroke="#6366f1" strokeWidth="1"/>
      <line x1="27" y1="21" x2="35" y2="21" stroke="#6366f1" strokeWidth="1"/>
      <line x1="27" y1="25" x2="32" y2="25" stroke="#6366f1" strokeWidth="1"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="14" cy="11" r="7" fill="#a78bfa"/>
      <path d="M2 36c0-7.7 5.4-14 12-14" fill="#a78bfa"/>
      <circle cx="30" cy="22" r="10" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2"/>
      <line x1="30" y1="15" x2="30" y2="22" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="22" x2="35" y2="26" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  joinGroup: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="8" cy="11" r="6" fill="#a78bfa"/>
      <path d="M0 36c0-7 3.6-12 8-12" fill="#a78bfa"/>
      <path d="M16 22 L22 22" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2,1.5" markerEnd="url(#arr3)"/>
      <defs><marker id="arr3" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#6366f1"/></marker></defs>
      <circle cx="30" cy="10" r="5.5" fill="#6366f1"/>
      <path d="M21 36c0-7 4-12 9-12" fill="#6366f1"/>
      <circle cx="38" cy="9" r="4" fill="#818cf8"/>
    </svg>
  ),
  group: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="10" cy="13" r="5.5" fill="#a78bfa"/>
      <path d="M1 36c0-6.5 4-12 9-12" fill="#a78bfa"/>
      <circle cx="20" cy="11" r="6.5" fill="#7c3aed"/>
      <path d="M11 36c0-7 4-13 9-13" fill="#7c3aed"/>
      <circle cx="30" cy="13" r="5.5" fill="#a78bfa"/>
      <path d="M22 36c0-6.5 4-12 8-12" fill="#a78bfa"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="14" cy="11" r="7" fill="#a78bfa"/>
      <path d="M2 36c0-7.7 5.4-14 12-14" fill="#a78bfa"/>
      <rect x="24" y="26" width="4" height="10" fill="#6366f1"/>
      <rect x="29" y="20" width="4" height="16" fill="#7c3aed"/>
      <rect x="34" y="14" width="4" height="22" fill="#a78bfa"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 40 40" width="40" height="40">
      <circle cx="14" cy="11" r="7" fill="#a78bfa"/>
      <path d="M2 36c0-7.7 5.4-14 12-14" fill="#a78bfa"/>
      <polygon points="30,6 32,13 39,13 33,17 35,24 30,20 25,24 27,17 21,13 28,13" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5"/>
    </svg>
  ),
};

// ─── Row definitions ──────────────────────────────────────────────────────────

const ROWS = [
  {
    id: 'fractional',
    label: 'A one-off or fractional expert',
    desc: 'Get targeted help from a senior health professional — flexible and fast.',
    icon: icons.partial,
    color: '#7c3aed',
    light: '#f5f3ff',
    expandable: true,
    subs: [
      { id: 'ondemand', label: 'On Demand', desc: 'Immediate expert access for ad-hoc questions and targeted projects.', icon: icons.lightning },
      { id: 'intheloop', label: 'In The Loop', desc: 'An expert embedded in your workflow to review and advise continuously.', icon: icons.clipboard },
      { id: 'hourly', label: 'Hourly Session', desc: 'Book a 1:1 focused session with a senior clinician or executive.', icon: icons.clock },
    ],
  },
  {
    id: 'hire',
    label: 'An expert hire to join your team',
    desc: 'Source a vetted health professional for a full-time or fractional role.',
    icon: icons.joinGroup,
    color: '#059669',
    light: '#ecfdf5',
    expandable: false,
    subs: [],
  },
  {
    id: 'group',
    label: 'A group of experts',
    desc: 'Engage multiple health experts for collective intelligence — panels to boards.',
    icon: icons.group,
    color: '#d97706',
    light: '#fffbeb',
    expandable: true,
    subs: [
      {
        id: 'panel',
        label: 'Expert Panel',
        desc: 'A focus group of 4–8 clinicians or executives to test ideas and gather feedback.',
        icon: icons.group,
      },
      {
        id: 'board',
        label: 'Expert Board',
        desc: 'A standing advisory board of senior health leaders for ongoing strategic guidance.',
        icon: icons.group,
      },
    ],
  },
  {
    id: 'insights',
    label: 'An expert for market and industry insights',
    desc: 'Fast, targeted market research through expert health surveys and analysis.',
    icon: icons.chart,
    color: '#9333ea',
    light: '#fdf4ff',
    expandable: false,
    subs: [],
  },
  {
    id: 'custom',
    label: 'A project customized to your needs',
    desc: "Tell us your goals and we'll design a tailored expert engagement.",
    icon: icons.star,
    color: '#374151',
    light: '#f9fafb',
    expandable: false,
    subs: [],
  },
];

// ─── Variant footer ───────────────────────────────────────────────────────────

function VariantFooter() {
  const navigate = useNavigate();
  return (
    <div className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Other variants:</span>
        <button onClick={() => navigate('/dashboard')} className="text-brand-600 hover:underline text-xs">Base Dashboard</button>
        <button onClick={() => navigate('/client-dashboard-1')} className="text-brand-600 hover:underline text-xs">Variant 1 — Wizard</button>
        <button onClick={() => navigate('/client-dashboard-2')} className="text-brand-600 hover:underline text-xs">Variant 2 — Wheel</button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientDashboard3() {
  const navigate = useNavigate();
  const user = store.getUser();
  const firstName = user?.firstName || 'there';

  const [expanded, setExpanded] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleRowClick = (row) => {
    if (row.expandable) {
      setExpanded((e) => (e === row.id ? null : row.id));
      setSelected(null);
    } else {
      setSelected({ rowId: row.id, subId: null });
      setExpanded(null);
    }
  };

  const handleSubClick = (rowId, sub) => {
    setSelected({ rowId, subId: sub.id, label: sub.label });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader activeTab="dashboard" />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>
          <p className="text-sm text-gray-500 mt-1">What type of expert help do you need?</p>
        </div>

        <div className="space-y-2">
          {ROWS.map((row) => {
            const isExpanded = expanded === row.id;
            const isSelected = selected?.rowId === row.id && !selected?.subId;
            const hasSubSelected = selected?.rowId === row.id && selected?.subId;

            return (
              <div
                key={row.id}
                className="bg-white rounded-2xl border-2 overflow-hidden transition-all"
                style={{ borderColor: isExpanded || isSelected || hasSubSelected ? row.color : '#e5e7eb' }}
              >
                {/* Row header */}
                <button
                  onClick={() => handleRowClick(row)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">{row.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{row.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{row.desc}</p>
                  </div>
                  {row.expandable ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke={isExpanded ? row.color : '#9ca3af'}
                      strokeWidth="2"
                      className="flex-shrink-0 transition-transform"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" className="flex-shrink-0">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  )}
                </button>

                {/* Expanded sub-options */}
                {isExpanded && row.subs.length > 0 && (
                  <div className="border-t border-gray-100 px-5 pb-4 pt-3" style={{ background: row.light }}>
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Choose a type</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {row.subs.map((sub) => {
                        const subActive = selected?.rowId === row.id && selected?.subId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSubClick(row.id, sub)}
                            className="flex flex-col items-start gap-2 p-3 rounded-xl border-2 text-left transition-all hover:border-gray-400"
                            style={{
                              borderColor: subActive ? row.color : '#e5e7eb',
                              background: subActive ? 'white' : 'white',
                              boxShadow: subActive ? `0 0 0 2px ${row.color}33` : 'none',
                            }}
                          >
                            <div className="flex items-center gap-2 w-full">
                              {sub.icon}
                              <span className="text-xs font-semibold text-gray-800">{sub.label}</span>
                              {subActive && (
                                <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: row.color }}>
                                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-snug">{sub.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                    {selected?.rowId === row.id && selected?.subId && (
                      <div className="mt-3 flex justify-end">
                        <button
                          className="text-xs font-semibold px-4 py-2 rounded-lg text-white"
                          style={{ background: row.color }}
                          onClick={() => navigate('/client-dashboard-1')}
                        >
                          Continue with {selected.label} →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Directly selected (no subs) */}
                {isSelected && (
                  <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between" style={{ background: row.light }}>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold" style={{ color: row.color }}>{row.label}</span> selected — ready to create a project.
                    </p>
                    <button
                      className="text-xs font-semibold px-4 py-2 rounded-lg text-white flex-shrink-0"
                      style={{ background: row.color }}
                      onClick={() => navigate('/client-dashboard-1')}
                    >
                      Create Project →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty project area */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 text-center">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 text-gray-300"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>
          <p className="text-sm font-medium text-gray-500">No recent project activity</p>
          <p className="text-xs text-gray-400 mt-1">Select an engagement type above to create your first project.</p>
        </div>
      </main>

      <VariantFooter />
    </div>
  );
}
