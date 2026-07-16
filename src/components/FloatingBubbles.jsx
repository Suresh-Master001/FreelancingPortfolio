import { useEffect, useRef } from 'react';

// ─── PHYSICS CONFIG ────────────────────────────
const CANVAS_CONFIG = {
  bubbleCount: 60,
  sparkleCount: 20,
  bokehCount: 10,
};

// ─── BUBBLE CLASS ──────────────────────────────
class Bubble {
  constructor(w, h, depth) {
    this.reset(w, h, depth);
  }

  reset(w, h, depth) {
    this.depth = depth || (Math.random() < 0.4 ? 'far' : Math.random() < 0.6 ? 'mid' : 'near');

    // Size based on depth
    const sizeScale = this.depth === 'far' ? 0.4 : this.depth === 'mid' ? 1 : 2.2;
    this.baseRadius = (2 + Math.random() * 28) * sizeScale;
    this.radius = this.baseRadius;

    // Position — fixed in background
    const edgeBias = 0.6;
    this.x = Math.random() < edgeBias
      ? (Math.random() < 0.5 ? -5 - Math.random() * 15 : 105 + Math.random() * 15)
      : Math.random() * 100;
    this.y = Math.random() * 100;
    this.startY = this.y;

    // Static — no movement
    this.speed = 0;
    this.driftSpeed = 0;
    this.wobbleAmp = 0;
    this.wobbleFreq = 0;
    this.wobbleOffset = Math.random() * Math.PI * 2;

    // Rotation (static)
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = 0;

    // Opacity — far = more transparent
    this.baseOpacity = this.depth === 'far'
      ? 0.15 + Math.random() * 0.15
      : this.depth === 'mid'
        ? 0.2 + Math.random() * 0.2
        : 0.25 + Math.random() * 0.3;
    this.opacity = this.baseOpacity;

    // Color tint
    const tints = [
      { r: 0.3, g: 0.72, b: 1.0 }, // blue
      { r: 0.0, g: 0.96, b: 0.83 }, // cyan
      { r: 0.7, g: 0.9, b: 1.0 },   // light blue
      { r: 0.5, g: 0.8, b: 1.0 },   // sky blue
    ];
    const tint = tints[Math.floor(Math.random() * tints.length)];
    this.tintR = tint.r;
    this.tintG = tint.g;
    this.tintB = tint.b;

    // Highlight position (static)
    this.highlightAngle = Math.random() * Math.PI * 2;
    this.highlightSpeed = 0;
    this.highlightIntensity = 0.4 + Math.random() * 0.6;

    // No sparkles in static mode
    this.hasSparkle = false;

    // Age
    this.age = Math.random() * 100;
  }

  draw(ctx, w, h, hovered = false) {
    const px = (this.x / 100) * w;
    const py = (this.y / 100) * h;
    const r = this.radius * (w / 1920);

    if (this.opacity < 0.01 || r < 0.5) return;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = hovered ? Math.min(1, this.opacity * 1.8) : this.opacity;

    // ─── GLASS BODY ──────────────────────────
    // Outer glow
    const grad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r);
    grad.addColorStop(0, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.08)`);
    grad.addColorStop(0.3, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.04)`);
    grad.addColorStop(0.7, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.02)`);
    grad.addColorStop(1, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.01)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Glass body — refraction gradient (inner bright ring)
    const glassGrad = ctx.createRadialGradient(
      r * -0.2, r * -0.2, r * 0.05,
      0, 0, r
    );
    glassGrad.addColorStop(0, `rgba(255,255,255,0.06)`);
    glassGrad.addColorStop(0.2, `rgba(255,255,255,0.02)`);
    glassGrad.addColorStop(0.5, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.03)`);
    glassGrad.addColorStop(0.8, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.06)`);
    glassGrad.addColorStop(1, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0.04)`);
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    // Rim edge (glass outline) — brighter on hover
    ctx.strokeStyle = `rgba(255,255,255,${hovered ? this.opacity * 0.2 : this.opacity * 0.06})`;
    ctx.lineWidth = Math.max(0.3, r * (hovered ? 0.04 : 0.02));
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
    ctx.stroke();

    // ─── SPECULAR HIGHLIGHT ──────────────────
    const hx = Math.cos(this.highlightAngle) * r * 0.4;
    const hy = Math.sin(this.highlightAngle) * r * 0.4;

    // Primary highlight (sharp, bright) — boosted on hover
    const hGrad = ctx.createRadialGradient(
      hx - r * 0.1, hy - r * 0.1, r * 0.01,
      hx, hy, r * 0.35
    );
    const hi = this.highlightIntensity * (hovered ? 0.7 : 0.35);
    hGrad.addColorStop(0, `rgba(255,255,255,${hi})`);
    hGrad.addColorStop(0.2, `rgba(255,255,255,${hi * 0.3})`);
    hGrad.addColorStop(0.5, `rgba(255,255,255,${hi * 0.05})`);
    hGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hGrad;
    ctx.beginPath();
    ctx.arc(hx, hy, r * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Small bright core within highlight
    const coreGrad = ctx.createRadialGradient(
      hx - r * 0.05, hy - r * 0.05, 0,
      hx - r * 0.05, hy - r * 0.05, r * 0.08
    );
    coreGrad.addColorStop(0, `rgba(255,255,255,${hi * 0.8})`);
    coreGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(hx - r * 0.05, hy - r * 0.05, r * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Secondary reflection (opposite side, dimmer)
    const sx2 = Math.cos(this.highlightAngle + Math.PI * 0.8) * r * 0.35;
    const sy2 = Math.sin(this.highlightAngle + Math.PI * 0.8) * r * 0.35;
    const sGrad = ctx.createRadialGradient(sx2, sy2, 0, sx2, sy2, r * 0.12);
    sGrad.addColorStop(0, `rgba(255,255,255,${hi * 0.08})`);
    sGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sGrad;
    ctx.beginPath();
    ctx.arc(sx2, sy2, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // ─── CAUSTIC GLOW (bottom) ──────────────
    const cx = Math.cos(this.highlightAngle + Math.PI * 0.3) * r * 0.2;
    const cy = Math.sin(this.highlightAngle + Math.PI * 0.3) * r * 0.2;
    const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
    cGrad.addColorStop(0, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},${this.opacity * (hovered ? 0.12 : 0.04)})`);
    cGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = cGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Outer glow — stronger on hover
    const outerGlow = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 1.4);
    outerGlow.addColorStop(0, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},${hovered ? 0.15 : 0.05})`);
    outerGlow.addColorStop(1, `rgba(${this.tintR * 255},${this.tintG * 255},${this.tintB * 255},0)`);
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// ─── SPARKLE PARTICLE ──────────────────────────
class Sparkle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.size = 0.3 + Math.random() * 1.2;
    this.opacityBase = 0.3 + Math.random() * 0.7;
    this.freq = 2 + Math.random() * 3;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = 0;
    this.driftX = 0;
  }
  draw(ctx, w, h, time) {
    const px = this.x / 100 * w;
    const py = this.y / 100 * h;
    const intensity = this.opacityBase * (0.5 + Math.sin(time * this.freq + this.phase) * 0.5);
    if (intensity < 0.01) return;
    ctx.save();
    ctx.globalAlpha = intensity;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.shadowColor = 'rgba(200,230,255,0.5)';
    ctx.shadowBlur = this.size * 4;
    ctx.beginPath();
    ctx.arc(px, py, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── BOKEH LIGHT ───────────────────────────────
class Bokeh {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * 100;
    this.y = Math.random() * 100;
    this.size = 15 + Math.random() * 50;
    this.speed = 0;
    this.phase = Math.random() * Math.PI * 2;
    this.freq = 0.2 + Math.random() * 0.5;
    this.opacityBase = 0.02 + Math.random() * 0.04;
    this.driftX = 0;
    this.color = Math.random() < 0.5 ? '200,230,255' : '180,255,245';
  }
  draw(ctx, w, h, time) {
    const px = this.x / 100 * w;
    const py = this.y / 100 * h;
    const intensity = this.opacityBase * (0.6 + Math.sin(time * this.freq + this.phase) * 0.4);
    if (intensity < 0.002) return;
    ctx.save();
    ctx.globalAlpha = intensity;
    const grad = ctx.createRadialGradient(px, py, 0, px, py, this.size);
    grad.addColorStop(0, `rgba(${this.color},0.6)`);
    grad.addColorStop(0.3, `rgba(${this.color},0.2)`);
    grad.addColorStop(1, `rgba(${this.color},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ─── MAIN COMPONENT ────────────────────────────
export default function FloatingBubbles({ bubbleCount = 180 }) {
  const canvasRef = useRef(null);
  const resizeRef = useRef({ w: 0, h: 0 });
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Init particles — static positions
    const bubbles = Array.from({ length: CANVAS_CONFIG.bubbleCount }, () => new Bubble());
    const sparkles = Array.from({ length: CANVAS_CONFIG.sparkleCount }, () => new Sparkle());
    const bokehs = Array.from({ length: CANVAS_CONFIG.bokehCount }, () => new Bokeh());

    // Check if mouse is near a bubble
    const isHovered = (bubble) => {
      const px = (bubble.x / 100) * resizeRef.current.w;
      const py = (bubble.y / 100) * resizeRef.current.h;
      const r = bubble.radius * (resizeRef.current.w / 1920);
      const dx = mouseRef.current.x - px;
      const dy = mouseRef.current.y - py;
      return Math.sqrt(dx * dx + dy * dy) < r * 2;
    };

    // Track mouse for hover effect
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      drawStatic(performance.now() / 1000);
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      drawStatic(performance.now() / 1000);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Resize handler
    const resize = () => {
      resizeRef.current.w = window.innerWidth;
      resizeRef.current.h = window.innerHeight;
      canvas.width = resizeRef.current.w * (window.devicePixelRatio || 1);
      canvas.height = resizeRef.current.h * (window.devicePixelRatio || 1);
      canvas.style.width = `${resizeRef.current.w}px`;
      canvas.style.height = `${resizeRef.current.h}px`;
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

      // Redraw on resize (no animation loop)
      drawStatic(performance.now() / 1000);
    };

    // Static render — no animation
    const drawStatic = (time = 0) => {
      const { w, h } = resizeRef.current;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      // Light rays (subtle)
      const rayGrad = ctx.createLinearGradient(0, 0, w * 0.6, h);
      rayGrad.addColorStop(0, 'rgba(200,230,255,0.015)');
      rayGrad.addColorStop(0.3, 'rgba(180,255,245,0.008)');
      rayGrad.addColorStop(1, 'rgba(200,230,255,0)');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, w, h);

      // Draw bokeh (background layer)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      bokehs.forEach(b => b.draw(ctx, w, h, time));
      ctx.restore();

      // Draw far bubbles with hover check
      bubbles.filter(b => b.depth === 'far').forEach(b => b.draw(ctx, w, h, isHovered(b)));

      // Draw mid bubbles with hover check
      bubbles.filter(b => b.depth === 'mid').forEach(b => b.draw(ctx, w, h, isHovered(b)));

      // Draw sparkles (mid layer)
      sparkles.forEach(s => s.draw(ctx, w, h, time));

      // Draw near bubbles with hover check (foreground)
      bubbles.filter(b => b.depth === 'near').forEach(b => b.draw(ctx, w, h, isHovered(b)));
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Ambient background gradient */}
      <div className="bubble-ambient-bg" aria-hidden="true" />

      {/* Light rays overlay */}
      <div className="bubble-light-rays" aria-hidden="true" />

      {/* Canvas for all particles */}
      <canvas
        ref={canvasRef}
        className="bubble-canvas"
        aria-hidden="true"
      />

      {/* Vignette overlay */}
      <div className="bubble-vignette" aria-hidden="true" />
    </>
  );
}
