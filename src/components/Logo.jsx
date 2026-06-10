export default function Logo({ white = false }) {
  const fill = white ? '#ffffff' : '#0000FF';
  const textColor = white ? '#ffffff' : '#000000';
  return (
    <div className="flex items-center gap-2">
      {/* Icon: 3-step staircase from actual brand SVG, scaled to 33×22 */}
      <svg width="33" height="22" viewBox="0 0 33.01 21.012" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.01 0v16.152l-10.042 4.989V3.434C26.088 1.555 29.247 0 33.01 0z" fill={fill} />
        <path d="M21.466 4.346v11.715l-9.961 4.919V9.578c2.754-.88 5.054-2.181 8.665-4.422l1.296-.81z" fill={fill} />
        <path d="M9.977 16.099 0 21.012V11.35s6.533-.513 9.967-1.333l.01 6.083z" fill={fill} />
      </svg>
      <span
        className="font-bold text-xl tracking-tight leading-none select-none"
        style={{ color: textColor, fontFamily: 'Roboto, sans-serif' }}
      >
        mdisrupt
      </span>
    </div>
  );
}
