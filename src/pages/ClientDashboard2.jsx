import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { store } from '../store';

// ─── Wheel geometry ───────────────────────────────────────────────────────────

const CX = 240, CY = 240, R_INNER = 78, R_OUTER = 215;
const N = 8, DEG_EACH = 360 / N, GAP = 5;

function toRad(d) { return (d * Math.PI) / 180; }

function buildSegment(i) {
  const startDeg = -90 + i * DEG_EACH + GAP / 2;
  const endDeg   = -90 + (i + 1) * DEG_EACH - GAP / 2;
  const s = toRad(startDeg), e = toRad(endDeg);
  const x1 = CX + R_OUTER * Math.cos(s), y1 = CY + R_OUTER * Math.sin(s);
  const x2 = CX + R_OUTER * Math.cos(e), y2 = CY + R_OUTER * Math.sin(e);
  const x3 = CX + R_INNER * Math.cos(e), y3 = CY + R_INNER * Math.sin(e);
  const x4 = CX + R_INNER * Math.cos(s), y4 = CY + R_INNER * Math.sin(s);
  const midDeg = (startDeg + endDeg) / 2;
  const iconR  = (R_INNER + R_OUTER) / 2;
  const iconX  = CX + iconR * Math.cos(toRad(midDeg));
  const iconY  = CY + iconR * Math.sin(toRad(midDeg));
  return {
    path: `M${x1} ${y1} A${R_OUTER} ${R_OUTER} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R_INNER} ${R_INNER} 0 0 0 ${x4} ${y4}Z`,
    iconX,
    iconY,
    midDeg,
  };
}

// ─── Service data ─────────────────────────────────────────────────────────────

const WHEEL_ITEMS = [
  {
    label: 'On Demand',
    desc: 'Immediate ad-hoc expert access for targeted questions and rapid projects.',
    color: '#7c3aed',
    light: '#f5f3ff',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="0" cy="-8" r="6" fill="white" opacity="0.9"/>
        <path d="M-9 10c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.9"/>
        <polygon points="10,-4 6,4 10,4 6,12" fill="#fbbf24"/>
      </g>
    ),
  },
  {
    label: 'In The Loop',
    desc: 'An expert embedded in your workflow to review and advise continuously.',
    color: '#2563eb',
    light: '#eff6ff',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="-4" cy="-8" r="6" fill="white" opacity="0.9"/>
        <path d="M-13 10c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.9"/>
        <rect x="6" y="-6" width="12" height="16" rx="2" fill="white" opacity="0.9"/>
        <rect x="9" y="-8" width="6" height="4" rx="1" fill="#60a5fa"/>
        <line x1="8" y1="-1" x2="16" y2="-1" stroke="#2563eb" strokeWidth="1.2"/>
        <line x1="8" y1="3" x2="16" y2="3" stroke="#2563eb" strokeWidth="1.2"/>
      </g>
    ),
  },
  {
    label: 'Hourly Session',
    desc: 'A focused 1:1 meeting with a senior health executive or clinician.',
    color: '#0891b2',
    light: '#ecfeff',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="-5" cy="-8" r="6" fill="white" opacity="0.9"/>
        <path d="M-14 10c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.9"/>
        <circle cx="10" cy="0" r="10" fill="white" opacity="0.85"/>
        <line x1="10" y1="-5" x2="10" y2="0" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="0" x2="14" y2="3" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    ),
  },
  {
    label: 'Expert Hire',
    desc: 'Source a vetted health professional to join your team full-time or fractionally.',
    color: '#059669',
    light: '#ecfdf5',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="-10" cy="-8" r="5" fill="white" opacity="0.9"/>
        <path d="M-17 10c0-4.5 3-8 7-8" fill="white" opacity="0.9"/>
        <path d="M-1 0 L4 0" stroke="white" strokeWidth="1.5" strokeDasharray="2,1.5"/>
        <circle cx="9" cy="-8" r="5" fill="white" opacity="0.9"/>
        <path d="M3 10c0-4.5 3-8 6-8" fill="white" opacity="0.9"/>
      </g>
    ),
  },
  {
    label: 'Expert Panel',
    desc: 'A focus group of health experts to test ideas and gather rapid feedback.',
    color: '#d97706',
    light: '#fffbeb',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <ellipse cx="0" cy="6" rx="14" ry="4" fill="white" opacity="0.2"/>
        <circle cx="-10" cy="-6" r="4.5" fill="white" opacity="0.9"/>
        <circle cx="0" cy="-9" r="5" fill="white" opacity="0.9"/>
        <circle cx="10" cy="-6" r="4.5" fill="white" opacity="0.9"/>
      </g>
    ),
  },
  {
    label: 'Expert Board',
    desc: 'A standing advisory board of senior health leaders for ongoing strategic guidance.',
    color: '#dc2626',
    light: '#fef2f2',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="-14" cy="-4" r="4" fill="white" opacity="0.9"/>
        <circle cx="-5" cy="-8" r="5" fill="white" opacity="0.9"/>
        <circle cx="5" cy="-8" r="5" fill="white" opacity="0.9"/>
        <circle cx="14" cy="-4" r="4" fill="white" opacity="0.9"/>
        <line x1="-16" y1="4" x2="16" y2="4" stroke="white" strokeWidth="1.5" opacity="0.6"/>
      </g>
    ),
  },
  {
    label: 'Market Insights',
    desc: 'Fast, targeted market research through expert health surveys and analysis.',
    color: '#9333ea',
    light: '#fdf4ff',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="-6" cy="-8" r="6" fill="white" opacity="0.9"/>
        <path d="M-14 10c0-5 3-9 8-9" fill="white" opacity="0.9"/>
        <rect x="4" y="4" width="5" height="8" fill="white" opacity="0.9"/>
        <rect x="10" y="-1" width="5" height="13" fill="white" opacity="0.9"/>
        <rect x="16" y="-6" width="5" height="18" fill="white" opacity="0.9"/>
      </g>
    ),
  },
  {
    label: 'Custom Project',
    desc: "Tell us your goals and we'll design a tailored expert engagement for your situation.",
    color: '#374151',
    light: '#f9fafb',
    route: '/client-dashboard-1',
    icon: (
      <g>
        <circle cx="0" cy="-8" r="6" fill="white" opacity="0.9"/>
        <path d="M-9 10c0-5 4-9 9-9s9 4 9 9" fill="white" opacity="0.9"/>
        <polygon points="0,-22 2,-16 8,-16 3,-12 5,-6 0,-10 -5,-6 -3,-12 -8,-16 -2,-16" fill="#fbbf24"/>
      </g>
    ),
  },
];

const SEGMENTS = WHEEL_ITEMS.map((item, i) => ({ ...item, ...buildSegment(i) }));

// ─── Variant footer ───────────────────────────────────────────────────────────

function VariantFooter() {
  const navigate = useNavigate();
  return (
    <div className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Other variants:</span>
        <button onClick={() => navigate('/client-dashboard-1')} className="text-brand-600 hover:underline text-xs">Variant 1 — Wizard</button>
        <button onClick={() => navigate('/client-dashboard-3')} className="text-brand-600 hover:underline text-xs">Variant 3 — Accordion</button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientDashboard2() {
  const navigate = useNavigate();
  const user = store.getUser();
  const firstName = user?.firstName || 'there';
  const [hovered, setHovered] = useState(null);

  const seg = hovered !== null ? SEGMENTS[hovered] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader activeTab="dashboard" />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Choose the type of expert engagement you need.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Wheel */}
          <div className="flex-shrink-0 relative" style={{ width: 480, height: 480 }}>
            <svg
              viewBox="0 0 480 480"
              width="480"
              height="480"
              style={{ display: 'block' }}
            >
              {/* Background ring (unselected state hint) */}
              <circle cx={CX} cy={CY} r={R_OUTER + 8} fill="#f3f4f6" opacity="0.6"/>

              {/* Segments */}
              {SEGMENTS.map((seg, i) => (
                <g key={i}>
                  <path
                    d={seg.path}
                    fill={hovered === i ? seg.color : '#e5e7eb'}
                    stroke="white"
                    strokeWidth="2"
                    style={{ cursor: 'pointer', transition: 'fill 0.15s ease' }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(seg.route)}
                  />
                  {/* Icon group — centered at iconX/iconY */}
                  <g
                    transform={`translate(${seg.iconX},${seg.iconY})`}
                    style={{ pointerEvents: 'none', opacity: hovered === i ? 1 : 0.5, transition: 'opacity 0.15s' }}
                  >
                    {seg.icon}
                  </g>
                </g>
              ))}

              {/* Center circle */}
              <circle cx={CX} cy={CY} r={R_INNER - 4} fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>

              {/* Center content */}
              {hovered === null ? (
                <g>
                  <text x={CX} y={CY - 8} textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="system-ui">hover a segment</text>
                  <text x={CX} y={CY + 10} textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="system-ui">to explore</text>
                </g>
              ) : (
                <foreignObject x={CX - R_INNER + 10} y={CY - R_INNER + 10} width={(R_INNER - 10) * 2} height={(R_INNER - 10) * 2}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      textAlign: 'center',
                      padding: '6px',
                    }}
                  >
                    <p style={{ fontSize: '12px', fontWeight: '700', color: SEGMENTS[hovered].color, margin: 0, lineHeight: '1.3' }}>
                      {SEGMENTS[hovered].label}
                    </p>
                  </div>
                </foreignObject>
              )}
            </svg>
          </div>

          {/* Info panel */}
          <div className="flex-1 max-w-sm lg:pt-12">
            {seg === null ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                <p className="text-sm font-medium">Hover a segment</p>
                <p className="text-xs mt-1">to see service details</p>
              </div>
            ) : (
              <div
                className="rounded-2xl border-2 p-6 transition-all"
                style={{ borderColor: seg.color, background: seg.light }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: seg.color }}
                >
                  <svg viewBox="-20 -20 40 40" width="24" height="24">{seg.icon}</svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{seg.label}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{seg.desc}</p>
                <button
                  onClick={() => navigate(seg.route)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ background: seg.color }}
                >
                  Get Started →
                </button>
              </div>
            )}

            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
              <p className="text-xs font-semibold text-gray-500 mb-2">All services</p>
              <div className="grid grid-cols-2 gap-1">
                {WHEEL_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(item.route)}
                    className="text-left px-2 py-1.5 rounded-lg text-xs transition-colors hover:bg-gray-50"
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                      style={{ background: item.color }}
                    />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <VariantFooter />
    </div>
  );
}
