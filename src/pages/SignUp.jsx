import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { store } from '../store';

const EXPERTS = [
  { initials: 'AM', name: 'Ainsley M.', title: 'AI Strategy in Healthcare & Life Sciences', color: '#7C3AED' },
  { initials: 'MR', name: 'Melissa R.', title: 'Payer Reimbursement & Market Access', color: '#2563EB' },
  { initials: 'SL', name: 'Sarah L.', title: "Women's Health & Healthcare Strategy", color: '#6B7280' },
];

const PW_REQS = 'Passwords must match. No other restrictions.';

function PasswordHint({ password, confirm, visible }) {
  if (!visible) return null;
  const hasValue = password.length > 0;
  const matches = password === confirm && password.length > 0;
  return (
    <div className="mt-1.5 space-y-1 text-xs">
      <p className={hasValue ? 'text-green-600' : 'text-gray-400'}>
        {hasValue ? '✓' : '○'} Password entered
      </p>
      <p className={matches ? 'text-green-600' : confirm.length > 0 ? 'text-red-500' : 'text-gray-400'}>
        {matches ? '✓' : '○'} Passwords match
      </p>
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('client');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const set = (f) => (e) => {
    setForm((prev) => ({ ...prev, [f]: e.target.value }));
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Required';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!termsAgreed) e.terms = 'You must agree to continue';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    store.setUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      accountType,
    });
    navigate('/verify');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left panel */}
        <div
          className="hidden lg:flex w-[44%] flex-col items-center justify-center relative overflow-hidden py-12 px-8"
          style={{ background: 'linear-gradient(135deg, #1e1035 0%, #3b0764 55%, #1e1035 100%)' }}
        >
          {/* Trust badges */}
          <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
            <div className="flex items-center gap-1.5 bg-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5H11L8.25 6.75L9.25 10.5L6 8.25L2.75 10.5L3.75 6.75L1 4.5H4.5L6 1Z" fill="currentColor"/></svg>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/20 text-green-300 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-green-500/30">
              ✓ Free to get started
            </div>
          </div>

          <div className="text-center text-white z-10 max-w-xs">
            <div className="flex justify-center mb-6"><Logo white /></div>
            <h2 className="text-2xl font-bold mb-3 leading-tight">
              Vetted health industry experts, on demand.
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              Built for digital health innovators. Access senior healthcare expertise — fast, flexible, and without the consulting firm overhead.
            </p>
          </div>

          {/* Expert cards */}
          <div className="mt-10 flex gap-3 w-full max-w-sm">
            {EXPERTS.map((ex) => (
              <div key={ex.initials} className="flex-1 bg-white rounded-xl p-3 shadow-lg">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2 mx-auto"
                  style={{ background: ex.color }}
                >
                  {ex.initials}
                </div>
                <p className="text-xs font-semibold text-gray-800 text-center leading-tight">{ex.name}</p>
                <p className="text-[9px] text-gray-500 text-center mt-0.5 leading-tight">{ex.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex justify-center mb-6 lg:hidden"><Logo /></div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-sm text-gray-500 mb-6">Free to start — no credit card required.</p>

            {/* Account type toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              {[{ val: 'client', label: "I'm a Client" }, { val: 'expert', label: "I'm an Expert" }].map(({ val, label }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAccountType(val)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                    accountType === val
                      ? 'bg-white shadow text-brand-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input className="input-field" placeholder="First Name" value={form.firstName} onChange={set('firstName')} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="flex-1">
                  <input className="input-field" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input
                  className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Work Email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                />
                {errors.email
                  ? <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  : form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                    <p className="text-green-600 text-xs mt-1">✓ Valid email</p>
                  )}
              </div>

              <div>
                <div className="relative">
                  <input
                    className="input-field pr-10"
                    placeholder="Password"
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    onFocus={() => setPwFocused(true)}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                    {showPw
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <PasswordHint password={form.password} confirm={form.confirm} visible={pwFocused} />
              </div>

              <div className="relative">
                <input
                  className={`input-field pr-10 ${errors.confirm ? 'border-red-400' : ''}`}
                  placeholder="Confirm Password"
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirm}
                  onChange={set('confirm')}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                  {showConfirm
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              {/* Inline T&C */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Before you continue:</p>
                <ul className="text-xs text-gray-600 space-y-1 mb-3">
                  <li>• MDisrupt facilitates expert connections and charges a platform fee on transactions</li>
                  <li>• Your data is kept confidential and not shared outside the platform</li>
                  <li>• Disputes are resolved by binding arbitration under Texas law</li>
                </ul>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => { setTermsAgreed(e.target.checked); if (errors.terms) setErrors((p) => ({ ...p, terms: '' })); }}
                    className="mt-0.5 w-4 h-4 accent-brand-600 flex-shrink-0"
                  />
                  <span className="text-xs text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-brand-600 underline">Terms of Use</a>
                    {' '}and{' '}
                    <a href="#" className="text-brand-600 underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
              </div>

              <button type="submit" className="btn-gradient mt-2">Create Account</button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link to="/signin" className="text-brand-600 font-medium hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
