export default function Logo({ white = false }) {
  const iconColor = white ? '#ffffff' : '#1B3FC4';
  const textColor = white ? '#ffffff' : '#111827';
  return (
    <div className="flex items-center gap-2">
      <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 22 V14 H5 V10 H10 V6 H16 V0 H26 V22 Z" fill={iconColor} />
        <rect x="0" y="8" width="5" height="4" rx="0.5" fill={iconColor} />
      </svg>
      <span className="font-bold text-xl tracking-tight leading-none select-none" style={{ color: textColor }}>
        mdisrupt
      </span>
    </div>
  );
}
