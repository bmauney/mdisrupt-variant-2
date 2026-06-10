import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { store } from '../store';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = store.getUser();
    if (!user) { setError('No account found. Please sign up.'); return; }
    if (user.email !== form.email) { setError('No account found with that email.'); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div
          className="hidden lg:flex w-[45%] flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1e1035 0%, #3b0764 55%, #1e1035 100%)' }}
        >
          <div className="text-center text-white px-8">
            <div className="flex justify-center mb-6"><Logo white /></div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-purple-200 text-sm">Access the best on-demand health experts, anywhere</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6 lg:hidden"><Logo /></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={set('email')} required />
              <div className="relative">
                <input className="input-field pr-10" placeholder="Password" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                  {showPw
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="btn-gradient">Sign In</button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/" className="text-brand-600 font-medium hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
