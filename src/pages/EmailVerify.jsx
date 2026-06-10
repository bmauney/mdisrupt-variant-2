import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import { store } from '../store';

function ConferenceRoomIllustration() {
  return (
    <svg viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Room background */}
      <rect width="560" height="340" fill="#f0f4f8"/>
      {/* Back wall */}
      <rect x="0" y="0" width="560" height="200" fill="#e8edf2"/>
      {/* Floor */}
      <rect x="0" y="200" width="560" height="140" fill="#d4dce6"/>
      {/* Window left */}
      <rect x="30" y="30" width="80" height="120" rx="4" fill="#b8d4f0" stroke="#8ab4d4" strokeWidth="2"/>
      <line x1="70" y1="30" x2="70" y2="150" stroke="#8ab4d4" strokeWidth="1.5"/>
      <line x1="30" y1="90" x2="110" y2="90" stroke="#8ab4d4" strokeWidth="1.5"/>
      {/* Window right */}
      <rect x="450" y="30" width="80" height="120" rx="4" fill="#b8d4f0" stroke="#8ab4d4" strokeWidth="2"/>
      <line x1="490" y1="30" x2="490" y2="150" stroke="#8ab4d4" strokeWidth="1.5"/>
      <line x1="450" y1="90" x2="530" y2="90" stroke="#8ab4d4" strokeWidth="1.5"/>
      {/* Presentation screen on wall */}
      <rect x="200" y="20" width="160" height="100" rx="4" fill="#1e3a5f" stroke="#2d5a8e" strokeWidth="2"/>
      <rect x="210" y="30" width="140" height="80" fill="#2563eb" opacity="0.9"/>
      {/* Chart on screen */}
      <rect x="225" y="75" width="15" height="25" fill="white" opacity="0.7"/>
      <rect x="245" y="60" width="15" height="40" fill="white" opacity="0.8"/>
      <rect x="265" y="50" width="15" height="50" fill="white" opacity="0.9"/>
      <rect x="285" y="65" width="15" height="35" fill="white" opacity="0.7"/>
      <rect x="305" y="55" width="15" height="45" fill="white"/>
      <text x="280" y="45" textAnchor="middle" fill="white" fontSize="8" fontFamily="system-ui">MDisrupt Analytics</text>
      {/* Screen stand */}
      <rect x="272" y="120" width="16" height="12" fill="#1e3a5f"/>
      <rect x="260" y="132" width="40" height="4" rx="2" fill="#1e3a5f"/>

      {/* Conference table */}
      <ellipse cx="280" cy="240" rx="220" ry="60" fill="#8b6f4e" stroke="#6b5030" strokeWidth="3"/>
      <ellipse cx="280" cy="238" rx="218" ry="58" fill="#a0835d"/>
      {/* Table surface gloss */}
      <ellipse cx="240" cy="220" rx="80" ry="20" fill="white" opacity="0.1"/>

      {/* Person 1 — doctor left (standing) */}
      <circle cx="90" cy="175" r="18" fill="#f4c7b0"/>
      <rect x="75" y="193" width="30" height="50" rx="5" fill="#2563eb"/>
      {/* white coat */}
      <rect x="72" y="195" width="12" height="45" rx="3" fill="white"/>
      <rect x="86" y="195" width="12" height="45" rx="3" fill="white"/>
      <rect x="76" y="200" width="8" height="30" rx="2" fill="#e0e7ef"/>
      {/* stethoscope */}
      <path d="M 88 205 Q 100 215 98 225" stroke="#374151" strokeWidth="2" fill="none"/>
      <circle cx="98" cy="227" r="4" fill="#374151"/>
      {/* hair */}
      <ellipse cx="90" cy="163" rx="18" ry="10" fill="#4a3728"/>

      {/* Person 2 — business person center-left */}
      <circle cx="185" cy="178" r="17" fill="#deb887"/>
      <rect x="171" y="195" width="28" height="48" rx="4" fill="#1f2937"/>
      {/* tie */}
      <polygon points="185,197 188,197 187,215 185,220 183,215 182,197" fill="#7c3aed"/>
      {/* hair */}
      <ellipse cx="185" cy="167" rx="17" ry="9" fill="#1a1a1a"/>

      {/* Person 3 — doctor center (seated, head above table) */}
      <circle cx="280" cy="175" r="18" fill="#f0d0b0"/>
      <rect x="266" y="193" width="28" height="50" rx="5" fill="#2563eb"/>
      <rect x="263" y="195" width="11" height="45" rx="3" fill="white"/>
      <rect x="277" y="195" width="11" height="45" rx="3" fill="white"/>
      {/* hair */}
      <ellipse cx="280" cy="164" rx="18" ry="9" fill="#8b4513"/>

      {/* Person 4 — business woman center-right */}
      <circle cx="370" cy="178" r="17" fill="#f4c7b0"/>
      <rect x="356" y="195" width="28" height="48" rx="4" fill="#7c3aed"/>
      {/* hair long */}
      <ellipse cx="370" cy="166" rx="17" ry="12" fill="#2d1b0e"/>
      <rect x="360" y="170" width="8" height="30" rx="4" fill="#2d1b0e"/>
      <rect x="372" y="170" width="8" height="30" rx="4" fill="#2d1b0e"/>

      {/* Person 5 — doctor right */}
      <circle cx="468" cy="175" r="18" fill="#deb887"/>
      <rect x="454" y="193" width="30" height="50" rx="5" fill="#2563eb"/>
      <rect x="451" y="195" width="12" height="45" rx="3" fill="white"/>
      <rect x="465" y="195" width="12" height="45" rx="3" fill="white"/>
      <path d="M 462 205 Q 474 215 472 225" stroke="#374151" strokeWidth="2" fill="none"/>
      <circle cx="472" cy="227" r="4" fill="#374151"/>
      {/* hair */}
      <ellipse cx="468" cy="163" rx="18" ry="8" fill="#1a1a1a"/>

      {/* Laptops / papers on table */}
      <rect x="145" y="225" width="50" height="32" rx="3" fill="#374151"/>
      <rect x="148" y="228" width="44" height="26" fill="#60a5fa"/>
      <rect x="135" y="257" width="70" height="5" rx="2" fill="#4b5563"/>

      <rect x="360" y="225" width="50" height="32" rx="3" fill="#374151"/>
      <rect x="363" y="228" width="44" height="26" fill="#a78bfa"/>
      <rect x="350" y="257" width="70" height="5" rx="2" fill="#4b5563"/>

      {/* Coffee cups */}
      <rect x="250" y="228" width="14" height="18" rx="3" fill="white" stroke="#d1d5db" strokeWidth="1"/>
      <ellipse cx="257" cy="228" rx="7" ry="3" fill="#e5e7eb"/>
      <path d="M 264 234 Q 270 238 264 242" stroke="#d1d5db" strokeWidth="1.5" fill="none"/>

      <rect x="295" y="228" width="14" height="18" rx="3" fill="white" stroke="#d1d5db" strokeWidth="1"/>
      <ellipse cx="302" cy="228" rx="7" ry="3" fill="#e5e7eb"/>
    </svg>
  );
}

export default function EmailVerify() {
  const navigate = useNavigate();
  const user = store.getUser();
  const email = user?.email || 'your email address';
  const accountType = user?.accountType || 'client';

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const handleDigit = (i, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    setError('');
    if (clean && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      refs[5].current?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length < 6) { setError('Please enter all 6 digits'); return; }
    // Any 6-digit number is valid in this prototype
    if (accountType === 'expert') {
      navigate('/expert-onboarding');
    } else {
      navigate('/company');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left — illustration */}
        <div className="hidden lg:flex w-[48%] items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          <div className="w-full h-full p-8 flex items-center">
            <ConferenceRoomIllustration />
          </div>
        </div>

        {/* Right — verify form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm text-center">
            <div className="flex justify-center mb-6"><Logo /></div>

            {/* Envelope icon */}
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your account</h1>
            <p className="text-sm text-gray-500 mb-1">
              Please verify your account by entering the code
            </p>
            <p className="text-sm text-gray-700 font-medium mb-7">
              that was just emailed to <span className="text-brand-600">{email}</span>
            </p>

            {/* OTP input */}
            <div className="flex justify-center gap-3 mb-2" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                    d ? 'border-brand-500 bg-brand-50' : 'border-gray-300'
                  } ${error ? 'border-red-400' : ''}`}
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <p className="text-xs text-gray-400 mb-6">
              Any 6-digit code works in this prototype — no email is actually sent.
            </p>

            <button
              onClick={handleVerify}
              disabled={digits.join('').length < 6}
              className="btn-gradient disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Verify Account
            </button>

            <div className="flex items-center justify-center gap-4 mt-5 text-sm">
              <button className="text-brand-600 hover:underline">Resend code</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
                Wrong email?
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
