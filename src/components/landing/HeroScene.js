import { useEffect, useRef } from "react";

// ─── Crypto Sentiment segments ──────────────────────────────────────────
const CRYPTO_SENS = [
  { label: "MOONING",    color: [0, 255, 150] }, // Neon Green
  { label: "FOMO",       color: [0, 255, 255] }, // Cyan
  { label: "BULLISH",    color: [0, 100, 255] }, // Blue
  { label: "STABLE",     color: [150, 100, 255]}, // Purple
  { label: "BEARISH",    color: [255, 0, 100] }, // Red/Pink
  { label: "PANIC",      color: [255, 50, 0]  }, // Orange/Red
  { label: "CAPITULATION", color: [255, 200, 0] }, // Gold
  { label: "ACCUMULATION", color: [0, 255, 100] }, // Emerald
];

function lerpColor(c1, c2, t) {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

function getColorAtAngle(deg) {
  const norm = ((deg % 360) + 360) % 360;
  const segmentSize = 360 / CRYPTO_SENS.length;
  const index = Math.floor(norm / segmentSize);
  const nextIndex = (index + 1) % CRYPTO_SENS.length;
  const t = (norm % segmentSize) / segmentSize;
  return lerpColor(CRYPTO_SENS[index].color, CRYPTO_SENS[nextIndex].color, t);
}

export default function CryptoScene() {
  const mainRef = useRef(null);

  useEffect(() => {
    const canvas = mainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let rotation = 0;

    // Build more dense bars for that "clean" look
    const BAR_COUNT = 300;
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
      angleDeg: (i / BAR_COUNT) * 360,
      seed: Math.random() * 10,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts) => {
      const time = ts * 0.0008; // Slower time for smoothness
      rotation += 0.0015; // Slow, elegant rotation

      const W = canvas.width;
      const H = canvas.height;

      // Deep dark background
      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.5;
      const cy = H * 0.5;
      const RX = Math.min(W, H) * 0.35;
      const RY = RX * 0.6; // Slightly more tilted for 3D feel

      // Draw subtle background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for(let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, RX * (0.5 + i * 0.2), RY * (0.5 + i * 0.2), 0, 0, Math.PI * 2);
          ctx.stroke();
      }

      // Depth sorting
      const sorted = bars.map(bar => {
        const angleRad = (bar.angleDeg * Math.PI / 180) + rotation;
        const depth = Math.sin(angleRad); 
        return { ...bar, angleRad, depth };
      }).sort((a, b) => a.depth - b.depth);

      sorted.forEach((bar) => {
        const bx = cx + Math.cos(bar.angleRad) * RX;
        const by = cy + Math.sin(bar.angleRad) * RY;

        // Visualizer logic: organic wave + subtle noise
        const noise = Math.sin(time + bar.angleRad * 5) * 0.2;
        const pulse = Math.sin(time * 0.5 + bar.angleRad * 2) * 0.3;
        const baseH = 40 + (noise + pulse + 1) * 60;
        
        // Perspective scaling
        const depthFactor = (bar.depth + 2) / 3; 
        const barH = baseH * depthFactor;

        const tx = bx;
        const ty = by - barH;

        const color = getColorAtAngle(bar.angleDeg);
        const alpha = 0.2 + (bar.depth + 1) * 0.4;

        // Draw Glow Line
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(tx, ty);
        
        const grad = ctx.createLinearGradient(bx, by, tx, ty);
        grad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
        grad.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * depthFactor;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glowing head point
        if (bar.depth > 0) {
            ctx.beginPath();
            ctx.arc(tx, ty, 1.5 * depthFactor, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
            ctx.fill();
        }
      });

      // Crypto Labels
      ctx.font = "0px 'Inter', sans-serif";
      ctx.letterSpacing = "0px";
      CRYPTO_SENS.forEach((item, i) => {
          const angle = (i / CRYPTO_SENS.length) * Math.PI * 2 + rotation;
          const lx = cx + Math.cos(angle) * (RX * 1.3);
          const ly = cy + Math.sin(angle) * (RY * 1.3);
          
          ctx.fillStyle = `rgba(${item.color[0]}, ${item.color[1]}, ${item.color[2]}, 0.8)`;
          ctx.textAlign = "center";
          ctx.fillText(item.label, lx, ly);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#030305",
      width: "100vw",
      height: "100vh"
    }}>
      <canvas ref={mainRef} style={{ display: "block", scale: "150%" }} />
    </div>
  );
}