import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { store } from '../store';

const TIMEZONES = [
  { label: 'Hawaii (HST, UTC-10)', tz: 'Pacific/Honolulu' },
  { label: 'Alaska (AKST, UTC-9)', tz: 'America/Anchorage' },
  { label: 'Pacific (PT, UTC-8/-7)', tz: 'America/Los_Angeles' },
  { label: 'Mountain (MT, UTC-7/-6)', tz: 'America/Denver' },
  { label: 'Arizona (MST, UTC-7)', tz: 'America/Phoenix' },
  { label: 'Central (CT, UTC-6/-5)', tz: 'America/Chicago' },
  { label: 'Eastern (ET, UTC-5/-4)', tz: 'America/New_York' },
  { label: 'Atlantic (AT, UTC-4/-3)', tz: 'America/Halifax' },
  { label: 'Newfoundland (NST, UTC-3:30)', tz: 'America/St_Johns' },
  { label: 'Brasília (BRT, UTC-3)', tz: 'America/Sao_Paulo' },
  { label: 'Buenos Aires (ART, UTC-3)', tz: 'America/Argentina/Buenos_Aires' },
  { label: 'Santiago (CLT, UTC-3/-4)', tz: 'America/Santiago' },
  { label: 'Bogotá / Lima (COT, UTC-5)', tz: 'America/Bogota' },
  { label: 'Mexico City (CST, UTC-6/-5)', tz: 'America/Mexico_City' },
  { label: 'UTC (UTC+0)', tz: 'UTC' },
  { label: 'Reykjavik (GMT, UTC+0)', tz: 'Atlantic/Reykjavik' },
  { label: 'London (GMT/BST, UTC+0/+1)', tz: 'Europe/London' },
  { label: 'Dublin (IST, UTC+0/+1)', tz: 'Europe/Dublin' },
  { label: 'Lisbon (WET/WEST, UTC+0/+1)', tz: 'Europe/Lisbon' },
  { label: 'Amsterdam (CET, UTC+1/+2)', tz: 'Europe/Amsterdam' },
  { label: 'Berlin (CET, UTC+1/+2)', tz: 'Europe/Berlin' },
  { label: 'Paris (CET, UTC+1/+2)', tz: 'Europe/Paris' },
  { label: 'Madrid (CET, UTC+1/+2)', tz: 'Europe/Madrid' },
  { label: 'Rome (CET, UTC+1/+2)', tz: 'Europe/Rome' },
  { label: 'Stockholm (CET, UTC+1/+2)', tz: 'Europe/Stockholm' },
  { label: 'Oslo (CET, UTC+1/+2)', tz: 'Europe/Oslo' },
  { label: 'Copenhagen (CET, UTC+1/+2)', tz: 'Europe/Copenhagen' },
  { label: 'Zurich (CET, UTC+1/+2)', tz: 'Europe/Zurich' },
  { label: 'Brussels (CET, UTC+1/+2)', tz: 'Europe/Brussels' },
  { label: 'Vienna (CET, UTC+1/+2)', tz: 'Europe/Vienna' },
  { label: 'Warsaw (CET, UTC+1/+2)', tz: 'Europe/Warsaw' },
  { label: 'Prague (CET, UTC+1/+2)', tz: 'Europe/Prague' },
  { label: 'Helsinki (EET, UTC+2/+3)', tz: 'Europe/Helsinki' },
  { label: 'Athens (EET, UTC+2/+3)', tz: 'Europe/Athens' },
  { label: 'Bucharest (EET, UTC+2/+3)', tz: 'Europe/Bucharest' },
  { label: 'Kyiv (EET, UTC+2/+3)', tz: 'Europe/Kyiv' },
  { label: 'Cairo (EET, UTC+2)', tz: 'Africa/Cairo' },
  { label: 'Johannesburg (SAST, UTC+2)', tz: 'Africa/Johannesburg' },
  { label: 'Lagos (WAT, UTC+1)', tz: 'Africa/Lagos' },
  { label: 'Nairobi (EAT, UTC+3)', tz: 'Africa/Nairobi' },
  { label: 'Casablanca (WET, UTC+1)', tz: 'Africa/Casablanca' },
  { label: 'Moscow (MSK, UTC+3)', tz: 'Europe/Moscow' },
  { label: 'Istanbul (TRT, UTC+3)', tz: 'Europe/Istanbul' },
  { label: 'Riyadh (AST, UTC+3)', tz: 'Asia/Riyadh' },
  { label: 'Dubai (GST, UTC+4)', tz: 'Asia/Dubai' },
  { label: 'Tehran (IRST, UTC+3:30)', tz: 'Asia/Tehran' },
  { label: 'Baku (AZT, UTC+4)', tz: 'Asia/Baku' },
  { label: 'Kabul (AFT, UTC+4:30)', tz: 'Asia/Kabul' },
  { label: 'Karachi (PKT, UTC+5)', tz: 'Asia/Karachi' },
  { label: 'Mumbai / Delhi (IST, UTC+5:30)', tz: 'Asia/Kolkata' },
  { label: 'Colombo (IST, UTC+5:30)', tz: 'Asia/Colombo' },
  { label: 'Kathmandu (NPT, UTC+5:45)', tz: 'Asia/Kathmandu' },
  { label: 'Dhaka (BST, UTC+6)', tz: 'Asia/Dhaka' },
  { label: 'Yangon (MMT, UTC+6:30)', tz: 'Asia/Yangon' },
  { label: 'Bangkok / Jakarta (ICT, UTC+7)', tz: 'Asia/Bangkok' },
  { label: 'Ho Chi Minh City (ICT, UTC+7)', tz: 'Asia/Ho_Chi_Minh' },
  { label: 'Kuala Lumpur (MYT, UTC+8)', tz: 'Asia/Kuala_Lumpur' },
  { label: 'Singapore (SGT, UTC+8)', tz: 'Asia/Singapore' },
  { label: 'Hong Kong (HKT, UTC+8)', tz: 'Asia/Hong_Kong' },
  { label: 'Shanghai / Beijing (CST, UTC+8)', tz: 'Asia/Shanghai' },
  { label: 'Manila (PHT, UTC+8)', tz: 'Asia/Manila' },
  { label: 'Taipei (CST, UTC+8)', tz: 'Asia/Taipei' },
  { label: 'Seoul (KST, UTC+9)', tz: 'Asia/Seoul' },
  { label: 'Tokyo (JST, UTC+9)', tz: 'Asia/Tokyo' },
  { label: 'Perth (AWST, UTC+8)', tz: 'Australia/Perth' },
  { label: 'Darwin (ACST, UTC+9:30)', tz: 'Australia/Darwin' },
  { label: 'Adelaide (ACST, UTC+9:30/+10:30)', tz: 'Australia/Adelaide' },
  { label: 'Brisbane (AEST, UTC+10)', tz: 'Australia/Brisbane' },
  { label: 'Sydney (AEST, UTC+10/+11)', tz: 'Australia/Sydney' },
  { label: 'Melbourne (AEST, UTC+10/+11)', tz: 'Australia/Melbourne' },
  { label: 'Auckland (NZST, UTC+12/+13)', tz: 'Pacific/Auckland' },
  { label: 'Fiji (FJT, UTC+12)', tz: 'Pacific/Fiji' },
];

export default function DashboardHeader({ activeTab = 'dashboard' }) {
  const navigate = useNavigate();
  const user = store.getUser();
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'U';
  const plan = user?.plan || 'discovery';

  const [time, setTime] = useState(new Date());
  const [tz, setTz] = useState('America/New_York');

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleLogout = () => { store.clearAll(); navigate('/'); };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <Logo />
        <nav className="flex items-center gap-6 ml-6 text-sm font-medium text-gray-600">
          {[
            { label: 'Dashboard', tab: 'dashboard', path: '/dashboard' },
            { label: 'My Projects', tab: 'projects', path: '/dashboard' },
            { label: 'My Meetings', tab: 'meetings', path: '/dashboard' },
          ].map(({ label, tab, path }) => (
            <button
              key={tab}
              onClick={() => navigate(path)}
              className={`pb-0.5 transition-colors ${
                activeTab === tab
                  ? 'text-brand-700 border-b-2 border-brand-600'
                  : 'hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* Live clock + timezone picker */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-sm font-semibold text-gray-800 tabular-nums w-[5.5rem]">{timeStr}</span>
            <select
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              className="text-xs text-gray-500 bg-transparent border-none outline-none cursor-pointer max-w-[160px]"
            >
              {TIMEZONES.map((t) => (
                <option key={t.tz} value={t.tz}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Plan badge */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <div className="text-right">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider leading-none">
                {plan === 'discovery' ? 'Discovery' : 'All Access'}
              </p>
              {plan === 'discovery' && (
                <p className="text-[9px] text-gray-400 leading-none mt-0.5">No Credits</p>
              )}
            </div>
            {plan === 'discovery' && (
              <button
                onClick={() => navigate('/plan')}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors"
              >
                Upgrade
              </button>
            )}
          </div>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-gray-700">Logout</button>
        </div>
      </div>
    </header>
  );
}
