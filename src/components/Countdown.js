import React, { useEffect, useState } from "react";

// next Saturday at 10:00 local time, a recurring demo drop
function nextDrop(now = new Date()) {
  const d = new Date(now);
  d.setHours(10, 0, 0, 0);
  const add = (6 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + add);
  if (d <= now) d.setDate(d.getDate() + 7);
  return d;
}

const pad = (n) => String(n).padStart(2, "0");

function Countdown({ sneaker }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = nextDrop(now);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(diff / 86400);
  diff -= days * 86400;
  const hrs = Math.floor(diff / 3600);
  diff -= hrs * 3600;
  const mins = Math.floor(diff / 60);
  const secs = diff - mins * 60;
  const parts = [
    ["Days", days],
    ["Hrs", hrs],
    ["Min", mins],
    ["Sec", secs]
  ];

  return (
    <div className="countdown" style={{ "--glow": sneaker.glow }}>
      <div className="countdown-copy">
        <p className="eyebrow"><span className="dot" aria-hidden="true" /> Next drop · Saturday 10:00</p>
        <p className="countdown-title">{sneaker.name}</p>
        <p className="muted small">Demo release timer, resets every week.</p>
      </div>
      <div className="countdown-clock" role="timer" aria-label={`${days} days ${hrs} hours ${mins} minutes until the next drop`}>
        {parts.map(([label, v]) => (
          <div key={label} className="tick" aria-hidden="true">
            <span className="tick-num" key={`${label}-${v}`}>{pad(v)}</span>
            <span className="tick-label">{label}</span>
          </div>
        ))}
      </div>
      <img src={sneaker.image} alt="" className="countdown-img" aria-hidden="true" />
    </div>
  );
}

export default Countdown;
