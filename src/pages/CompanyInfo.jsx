import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import Footer from '../components/Footer';
import { store } from '../store';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Netherlands', 'Sweden', 'Switzerland', 'Japan', 'Singapore', 'India',
  'Brazil', 'Israel', 'South Korea', 'Spain', 'Italy', 'Denmark', 'Norway', 'Finland',
  'Belgium', 'Austria', 'Ireland', 'New Zealand', 'South Africa', 'United Arab Emirates',
  'Other',
];

export default function CompanyInfo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', website: '', country: 'United States', description: '' });
  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const set = (f) => (e) => {
    setForm((p) => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: '' }));
  };

  const handleGenerate = () => {
    if (!form.website.trim()) { setErrors((p) => ({ ...p, website: 'Enter a website URL to generate from' })); return; }
    setGenerating(true);
    setTimeout(() => {
      setForm((p) => ({
        ...p,
        description:
          `${p.name || 'Our company'} is a digital health innovator focused on transforming healthcare through technology. We work with leading health systems, payers, and life science organizations to accelerate the adoption of data-driven solutions. Our team combines deep clinical expertise with cutting-edge engineering to solve complex challenges in care delivery, reimbursement, and patient outcomes.`,
      }));
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.description.trim()) e.description = 'Please add a brief company description';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    store.setCompany(form);
    navigate('/plan');
  };

  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <OnboardingHeader onLogout={handleLogout} />

      <div className="flex-1 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-xl">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {['Account created', 'Email verified', 'Company info', 'Choose your plan'].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium ${i === 2 ? 'text-brand-700' : i < 2 ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < 2 ? 'bg-green-100 text-green-700' : i === 2 ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {i < 2 ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 3 && <div className="w-6 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Tell us about your company</h1>
          <p className="text-sm text-gray-500 mb-6">This helps us match you with the right experts.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Company Name *</label>
                <input className="input-field" placeholder="Acme Health Inc." value={form.name} onChange={set('name')} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                <select
                  className="input-field bg-white"
                  value={form.country}
                  onChange={set('country')}
                >
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Company Website</label>
              <div className="flex gap-2">
                <input
                  className={`input-field flex-1 ${errors.website ? 'border-red-400' : ''}`}
                  placeholder="https://yourcompany.com"
                  type="url"
                  value={form.website}
                  onChange={set('website')}
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>
                      {generated ? 'Regenerate' : 'Generate from Website'}
                    </>
                  )}
                </button>
              </div>
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
              {!errors.website && (
                <p className="text-xs text-gray-400 mt-1">Enter your URL and click "Generate from Website" to auto-fill the description below.</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">Company Description *</label>
                {generated && <span className="text-xs text-green-600 font-medium">✓ AI-generated — edit freely</span>}
              </div>
              <textarea
                className="input-field resize-none"
                rows={5}
                placeholder="Describe what your company does and what problems you're solving…"
                value={form.description}
                onChange={set('description')}
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                {errors.description
                  ? <p className="text-red-500 text-xs">{errors.description}</p>
                  : <span />}
                <span className="text-xs text-gray-400">{form.description.length}/500</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/verify')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                Back
              </button>
              <button type="submit" className="btn-gradient">
                Continue to Plan Selection
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
