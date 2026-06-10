import Logo from './Logo';

export default function OnboardingHeader({ onLogout }) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-5 text-sm text-brand-600">
          <button className="hover:opacity-75">Need help?</button>
          <button className="hover:opacity-75">Contact Support</button>
          {onLogout && (
            <button onClick={onLogout} className="hover:opacity-75">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}
