const P = {
  records: <><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h3.5" /></>,
  lab: <><path d="M9.5 3h5M10.5 3v6.2L5.8 17.4A2.3 2.3 0 0 0 7.8 21h8.4a2.3 2.3 0 0 0 2-3.6L13.5 9.2V3" /><path d="M7.6 15h8.8" /></>,
  patients: <><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
  users: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9.5" r="2.4" /><path d="M15.6 14.4a4.6 4.6 0 0 1 5 5.1" /></>,
  billing: <><rect x="3" y="6" width="18" height="12" rx="2.5" /><circle cx="12" cy="12" r="2.4" /><path d="M6.5 12h.01M17.5 12h.01" /></>,
  analytics: <><path d="M4 20V4M4 20h16" /><path d="M8 15.5l3.2-4 3 2.2L19 7.5" /></>,
  chart: <><rect x="4" y="12" width="3.5" height="8" rx="1" /><rect x="10.25" y="7" width="3.5" height="13" rx="1" /><rect x="16.5" y="3.5" width="3.5" height="16.5" rx="1" /></>,
  shield: <><path d="M12 3l7 3v5.2c0 4.4-3 7.9-7 9.8-4-1.9-7-5.4-7-9.8V6l7-3Z" /><path d="M9 12l2 2 4-4" /></>,
  network: <><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18.5" r="2.2" /><circle cx="19" cy="18.5" r="2.2" /><path d="M12 7.2v4.3M12 11.5l-5.4 5M12 11.5l5.4 5" /></>,
  branches: <><circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" /><path d="M6 8.2v1.3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8.2M12 12.5v3.3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" /></>,
  link: <><path d="M10 14a4.5 4.5 0 0 0 6.4 0l2.3-2.3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-2.3 2.3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></>,
  route: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8 18h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  spark: <><path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8Z" /><path d="M18.5 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" /></>,
  heart: <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />,
  stethoscope: <><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M10 12v2.5a5 5 0 0 0 10 0V13" /><circle cx="20" cy="11" r="2" /></>,
  desk: <><rect x="3" y="4" width="18" height="12" rx="2.5" /><path d="M8 20h8M12 16v4" /></>,
  building: <><rect x="4" y="3" width="11" height="18" rx="1.5" /><path d="M15 9h4a1 1 0 0 1 1 1v11H15" /><path d="M8 7h3M8 11h3M8 15h3" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>,
  hospital: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M12 8v6M9 11h6M9 21v-3h6v3" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  message: <path d="M4 5h16v11H9l-5 4Z" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  brush: <><path d="M14.5 4.5l5 5-8 8-5-5Z" /><path d="M6.5 12.5c-2 0-3.5 1.5-3.5 3.5 0 1.5-.5 3-1 4 3 0 6.5-1 7.5-3.5" /></>,
  check: <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  minus: <path d="M6 12h12" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  down: <path d="M6 9l6 6 6-6" />,
  play: <path d="M8 5v14l11-7z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  upload: <><path d="M12 15V4M8 8l4-4 4 4" /><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2.5" /><path d="M4 10h16M8.5 3v4M15.5 3v4" /></>,
  trash: <><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /></>,
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
};
export default function Icon({ name, className = "", size = 24, strokeWidth = 1.7 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name] || P.spark}
    </svg>
  );
}
