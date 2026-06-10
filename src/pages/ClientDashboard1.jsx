import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import { store } from '../store';

// ─── Silhouette SVG icons ────────────────────────────────────────────────────

function SilhouettePartial() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <defs>
        <clipPath id="cd1-half"><rect x="0" y="0" width="42" height="80"/></clipPath>
      </defs>
      <g clipPath="url(#cd1-half)">
        <circle cx="40" cy="24" r="15" fill="#a78bfa"/>
        <path d="M5 78c0-19.3 15.7-35 35-35s35 15.7 35 35" fill="#a78bfa"/>
      </g>
      <line x1="42" y1="4" x2="42" y2="76" stroke="#ddd6fe" strokeWidth="1.5" strokeDasharray="4,3"/>
    </svg>
  );
}

function SilhouetteWithLightning() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="30" cy="22" r="12" fill="#a78bfa"/>
      <path d="M5 72c0-14.4 11.2-26 25-26" fill="#a78bfa"/>
      <polygon points="54,8 46,36 54,36 46,64 66,28 56,28 66,8" fill="#fbbf24"/>
    </svg>
  );
}

function SilhouetteWithClipboard() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="30" cy="22" r="12" fill="#a78bfa"/>
      <path d="M5 72c0-14.4 11.2-26 25-26" fill="#a78bfa"/>
      <rect x="48" y="18" width="24" height="32" rx="3" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
      <rect x="54" y="14" width="12" height="7" rx="2" fill="#6366f1"/>
      <line x1="53" y1="30" x2="67" y2="30" stroke="#6366f1" strokeWidth="1.5"/>
      <line x1="53" y1="36" x2="67" y2="36" stroke="#6366f1" strokeWidth="1.5"/>
      <line x1="53" y1="42" x2="62" y2="42" stroke="#6366f1" strokeWidth="1.5"/>
    </svg>
  );
}

function SilhouetteWithClock() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="30" cy="22" r="12" fill="#a78bfa"/>
      <path d="M5 72c0-14.4 11.2-26 25-26" fill="#a78bfa"/>
      <circle cx="58" cy="36" r="18" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5"/>
      <line x1="58" y1="26" x2="58" y2="36" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
      <line x1="58" y1="36" x2="65" y2="40" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function SilhouetteJoiningGroup() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="14" cy="22" r="10" fill="#a78bfa"/>
      <path d="M1 72c0-11 5.8-20 13-20" fill="#a78bfa"/>
      <path d="M28 45 L38 45" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,2" markerEnd="url(#arr)"/>
      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6366f1"/></marker></defs>
      <circle cx="52" cy="20" r="9" fill="#6366f1"/>
      <path d="M40 68c0-9.9 5.4-18 12-18" fill="#6366f1"/>
      <circle cx="68" cy="20" r="8" fill="#818cf8"/>
      <path d="M59 68c0-9 4.9-16 9-16" fill="#818cf8"/>
    </svg>
  );
}

function SilhouetteGroup() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <ellipse cx="40" cy="62" rx="36" ry="8" fill="#ddd6fe"/>
      <circle cx="20" cy="28" r="9" fill="#a78bfa"/>
      <path d="M8 64c0-9 5.4-16 12-16" fill="#a78bfa"/>
      <circle cx="40" cy="24" r="10" fill="#7c3aed"/>
      <path d="M27 64c0-9.9 5.8-18 13-18" fill="#7c3aed"/>
      <circle cx="60" cy="28" r="9" fill="#a78bfa"/>
      <path d="M49 64c0-9 5.4-16 11-16" fill="#a78bfa"/>
    </svg>
  );
}

function SilhouetteWithChart() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="30" cy="22" r="12" fill="#a78bfa"/>
      <path d="M5 72c0-14.4 11.2-26 25-26" fill="#a78bfa"/>
      <rect x="46" y="48" width="8" height="18" fill="#6366f1"/>
      <rect x="56" y="38" width="8" height="28" fill="#7c3aed"/>
      <rect x="66" y="28" width="8" height="38" fill="#a78bfa"/>
    </svg>
  );
}

function SilhouetteWithStar() {
  return (
    <svg viewBox="0 0 80 80" width="72" height="72">
      <circle cx="30" cy="22" r="12" fill="#a78bfa"/>
      <path d="M5 72c0-14.4 11.2-26 25-26" fill="#a78bfa"/>
      <polygon points="60,12 63,22 74,22 65,29 68,39 60,33 52,39 55,29 46,22 57,22" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
    </svg>
  );
}

// ─── Service definitions ──────────────────────────────────────────────────────

const TOP_CHOICES = [
  {
    id: 'fractional',
    label: 'A one-off or fractional expert',
    desc: 'Get targeted help from a senior health professional for a specific project or on an ongoing fractional basis.',
    Icon: SilhouettePartial,
    subs: [
      { id: 'ondemand', label: 'On Demand', desc: 'A health expert available immediately for ad-hoc questions, rapid reviews, and targeted projects.', Icon: SilhouetteWithLightning },
      { id: 'intheloop', label: 'In The Loop', desc: 'An expert embedded in your workflow — reviewing decisions, validating ideas, and advising continuously.', Icon: SilhouetteWithClipboard },
      { id: 'hourly', label: 'Hourly Session', desc: 'Book a focused 1:1 session with a senior clinician, payer executive, or health leader.', Icon: SilhouetteWithClock },
    ],
  },
  {
    id: 'hire',
    label: 'An expert hire to join your team',
    desc: 'Source and onboard a vetted health professional as a full-time or part-time member of your organization.',
    Icon: SilhouetteJoiningGroup,
    subs: [],
  },
  {
    id: 'group',
    label: 'A group of experts',
    desc: 'Engage multiple health experts for collective intelligence — from rapid focus groups to ongoing advisory boards.',
    Icon: SilhouetteGroup,
    subs: [
      { id: 'panel', label: 'Expert Panel', desc: 'Bring together 4–8 clinicians or executives to test ideas, validate assumptions, and gather rapid feedback.', Icon: SilhouetteGroup },
      { id: 'board', label: 'Expert Board', desc: 'Build a standing advisory board of senior health strategists for long-term guidance and accountability.', Icon: SilhouetteGroup },
    ],
  },
  {
    id: 'insights',
    label: 'Market and industry insights',
    desc: 'Fast, targeted market research delivered through expert health surveys, analysis, and benchmarking.',
    Icon: SilhouetteWithChart,
    subs: [],
  },
  {
    id: 'custom',
    label: 'A project customized to your needs',
    desc: "Tell us your goals and we'll design a tailored expert engagement — however unconventional.",
    Icon: SilhouetteWithStar,
    subs: [],
  },
];

// ─── Chatbot ─────────────────────────────────────────────────────────────────

const BOT_REPLIES = [
  "Great question! Based on what you've described, our On Demand option gives you the most flexibility for a first engagement.",
  "For ongoing product validation, many teams find the 'In The Loop' model most efficient — it keeps an expert close to the work.",
  "If you're hiring, I'd recommend starting with an Expert Hire request so we can surface matched candidates quickly.",
  "A Panel is ideal when you need diverse perspectives fast. What domain is most important to you?",
  "Happy to connect you with our team for a quick call — they can tailor a recommendation to your exact situation!",
];

function ChatWidget() {
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Hi! I can help you decide which type of expert engagement fits your goals. What are you trying to accomplish?' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMsgs((m) => [...m, userMsg]);
    setInput('');
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', text: BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)] }]);
    }, 700);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col" style={{ height: 280 }}>
      <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <span className="text-xs font-semibold text-gray-700">Ask MDisrupt Support</span>
        <span className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0"/>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] text-xs px-3 py-2 rounded-2xl ${
              m.from === 'user' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-700 rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef}/>
      </div>
      <form onSubmit={send} className="p-2 border-t border-gray-100 flex gap-2 flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          className="flex-1 text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-400"
        />
        <button type="submit" className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0 hover:bg-brand-700">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </form>
    </div>
  );
}

// ─── Project list ─────────────────────────────────────────────────────────────

function ProjectList({ serviceLabel }) {
  const navigate = useNavigate();
  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Your Projects</h2>
          <p className="text-xs text-gray-500 mt-0.5">Service: {serviceLabel}</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Project
        </button>
      </div>
      <div className="text-center py-10 text-gray-400">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 opacity-40"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="13" y2="13"/></svg>
        <p className="text-sm font-medium text-gray-500">No recent project activity</p>
        <p className="text-xs mt-1">Create your first {serviceLabel} project to get started.</p>
      </div>
    </div>
  );
}

// ─── Variant footer ───────────────────────────────────────────────────────────

function VariantFooter() {
  const navigate = useNavigate();
  return (
    <div className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6 text-sm text-gray-400">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Other variants:</span>
        <button onClick={() => navigate('/dashboard')} className="text-brand-600 hover:underline text-xs">Base Dashboard</button>
        <button onClick={() => navigate('/client-dashboard-2')} className="text-brand-600 hover:underline text-xs">Variant 2 — Wheel</button>
        <button onClick={() => navigate('/client-dashboard-3')} className="text-brand-600 hover:underline text-xs">Variant 3 — Accordion</button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientDashboard1() {
  const user = store.getUser();
  const firstName = user?.firstName || 'there';

  const [topChoice, setTopChoice] = useState(null);
  const [subChoice, setSubChoice] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  const handleTopChoice = (choice) => {
    setTopChoice(choice);
    setSubChoice(null);
    if (choice.subs.length === 0) {
      setShowProjects(true);
    } else {
      setShowProjects(false);
    }
  };

  const handleSubChoice = (sub) => {
    setSubChoice(sub);
    setShowProjects(true);
  };

  const reset = () => { setTopChoice(null); setSubChoice(null); setShowProjects(false); };

  const finalLabel = subChoice
    ? subChoice.label
    : topChoice?.label || '';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader activeTab="dashboard" />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>
          <p className="text-sm text-gray-500 mt-1">What do you need help with today?</p>
        </div>

        {/* Wizard panels */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          {/* Breadcrumb */}
          {topChoice && (
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <button onClick={reset} className="hover:text-brand-600">What type of help?</button>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              <span className={subChoice ? 'text-gray-400 hover:text-brand-600 cursor-pointer' : 'text-gray-700 font-medium'} onClick={() => { if (subChoice) { setSubChoice(null); setShowProjects(false); } }}>
                {topChoice.label}
              </span>
              {subChoice && (
                <>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <span className="text-gray-700 font-medium">{subChoice.label}</span>
                </>
              )}
            </div>
          )}

          {/* Step 0: top-level choices */}
          {!topChoice && (
            <>
              <p className="text-base font-semibold text-gray-800 mb-4">What type of expert help do you need?</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {TOP_CHOICES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleTopChoice(c)}
                    className="flex flex-col items-center text-center p-4 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 transition-all group"
                  >
                    <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                      <c.Icon />
                    </div>
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{c.label}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-snug hidden sm:block">{c.desc.slice(0, 60)}…</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 1: sub-choices */}
          {topChoice && !subChoice && topChoice.subs.length > 0 && (
            <>
              <p className="text-base font-semibold text-gray-800 mb-1">What kind of fractional engagement?</p>
              <p className="text-xs text-gray-500 mb-4">{topChoice.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topChoice.subs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSubChoice(s)}
                    className="flex flex-col items-center text-center p-5 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 transition-all group"
                  >
                    <div className="mb-3 opacity-80 group-hover:opacity-100">
                      <s.Icon />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">{s.desc}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 1: group sub-choices */}
          {topChoice && !subChoice && topChoice.id === 'group' && (
            <>
              <p className="text-base font-semibold text-gray-800 mb-1">What kind of group engagement?</p>
              <p className="text-xs text-gray-500 mb-4">{topChoice.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topChoice.subs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSubChoice(s)}
                    className="flex flex-col items-center text-center p-5 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 transition-all group"
                  >
                    <div className="mb-3 opacity-80 group-hover:opacity-100">
                      <s.Icon />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Confirmed state */}
          {showProjects && (
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">{finalLabel} selected</p>
                <p className="text-xs text-green-600">Your projects for this engagement type are shown below.</p>
              </div>
              <button onClick={reset} className="ml-auto text-xs text-gray-400 hover:text-gray-600">Change</button>
            </div>
          )}
        </div>

        {/* Project list (shown after selection) */}
        {showProjects && <ProjectList serviceLabel={finalLabel} />}

        {/* Content cards — always visible */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Resources to help you decide</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="relative bg-gradient-to-br from-brand-100 to-indigo-100 h-36 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#7c3aed"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">3:42</span>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-brand-600 font-bold uppercase tracking-wider mb-1">Video guide</p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">How to know which expert is right for you?</p>
                <p className="text-xs text-gray-400 mt-1">Watch the overview →</p>
              </div>
            </div>

            {/* Help doc */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-1">Help center</p>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">What are examples or templates for each type of engagement?</p>
                </div>
              </div>
              <p className="text-xs text-brand-600 mt-3 font-medium">View templates →</p>
            </div>

            {/* Chatbot */}
            <ChatWidget />
          </div>
        </div>
      </main>

      <VariantFooter />
    </div>
  );
}
