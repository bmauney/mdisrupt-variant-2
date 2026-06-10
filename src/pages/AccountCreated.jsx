import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { store } from '../store';

export default function AccountCreated() {
  const navigate = useNavigate();
  const user = store.getUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left */}
        <div
          className="hidden lg:flex w-[45%] flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1e1035 0%, #3b0764 55%, #1e1035 100%)' }}
        >
          <div className="text-center text-white px-8">
            <div className="flex justify-center mb-6"><Logo white /></div>
            <h2 className="text-2xl font-bold mb-2">Welcome to MDisrupt!</h2>
            <p className="text-purple-200 text-sm">The health industry expert network</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-full max-w-md text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your account is ready, {firstName}!</h1>
            <p className="text-sm text-gray-500 mb-8">Here's how to get the most out of MDisrupt right away:</p>

            <ul className="text-left space-y-3 mb-8">
              {[
                ['Browse the expert network', 'Explore 500+ vetted health industry professionals.'],
                ['Submit your first expert request', 'Tell us what you need — we\'ll match you in 48h.'],
                ['Complete your company profile', 'A full profile leads to better expert matches.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="10 3 5 8 2 5" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button onClick={() => navigate('/dashboard')} className="btn-gradient">
              Get Started →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
