import { useNavigate } from 'react-router-dom';
import OnboardingHeader from '../components/OnboardingHeader';
import Footer from '../components/Footer';
import { store } from '../store';

// Stub — expert onboarding flow to be built in a future iteration
export default function ExpertOnboarding() {
  const navigate = useNavigate();
  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <OnboardingHeader onLogout={handleLogout} />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Expert Onboarding</h1>
          <p className="text-sm text-gray-500 mb-6">
            Your account is verified! The expert onboarding flow — compliance training, profile setup, and plan selection — will be built out in the next iteration of this variant.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-gradient"
          >
            Continue to Dashboard →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
