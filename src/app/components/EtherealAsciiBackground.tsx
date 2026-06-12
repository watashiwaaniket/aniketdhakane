"use client";

import { useEffect, useRef } from "react";

// Authentic Characters-style ramp from ASCII Magic (brightness → char)
const CHAR_RAMP = "@#S08Xx+=-;:,. ";

// Warm ethereal palette (inspired by the warm tones you wanted)
const WARM_COLORS = ["#f4d35e", "#f4a261", "#e9c46a", "#e76f51", "#f5deb3", "#f4e8c1"];

interface AsciiCell {
  x: number;
  y: number;
  char: string;
  baseAlpha: number;
  size: number;
  phase: number;
  color: string;
}

export default function EtherealAsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<AsciiCell[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const CELL_SIZE = 13; // Nice readable density like the real tool

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCells();
    };

    const initCells = () => {
      const cells: AsciiCell[] = [];
      const cols = Math.ceil(canvas.width / CELL_SIZE) + 2;
      const rows = Math.ceil(canvas.height / CELL_SIZE) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * CELL_SIZE;
          const y = row * CELL_SIZE;

          // Procedural "brightness" seed for stable character assignment (like ASCII Magic)
          const seed = (col * 0.37 + row * 0.73) % 1;
          const charIndex = Math.floor(seed * CHAR_RAMP.length);
          const char = CHAR_RAMP[charIndex];

          const color = WARM_COLORS[Math.floor(seed * WARM_COLORS.length)];

          cells.push({
            x,
            y,
            char,
            baseAlpha: 0.035 + (1 - seed) * 0.055, // darker areas more transparent
            size: CELL_SIZE * (0.85 + seed * 0.3),
            phase: (col + row * 1.7) * 0.8,
            color,
          });
        }
      }
      cellsRef.current = cells;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cells = cellsRef.current;
      ctx.font = `${CELL_SIZE}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // Ethereal animated drift + subtle wave (inspired by ASCII Magic Wave / Cascade presets)
        const wave = Math.sin(t * 0.7 + cell.phase) * 0.8;
        const driftX = Math.sin(t * 0.35 + cell.phase * 0.6) * 1.8;
        const driftY = Math.cos(t * 0.28 + cell.phase) * 2.2 + wave * 0.6;

        const px = cell.x + driftX;
        const py = cell.y + driftY;

        // Gentle pulse + randomness (like Character Bloom + Pulse animation)
        const pulse = Math.sin(t * 1.1 + cell.phase) * 0.028 + 0.5;
        const alpha = cell.baseAlpha * pulse * (0.65 + Math.sin(t * 0.4 + i * 0.3) * 0.35);

        // Very subtle chromatic / warm shift on some cells (simulating post-FX)
        const colorShift = Math.sin(t * 0.6 + cell.phase * 2) > 0.6;
        ctx.fillStyle = colorShift ? "#f4a261" : cell.color;
        ctx.globalAlpha = Math.max(0.012, alpha);

        ctx.fillText(cell.char, px, py);

        // Soft character bloom / glow (simulating Character Bloom + Film Grain)
        if (i % 5 === 0) {
          ctx.globalAlpha = alpha * 0.28;
          ctx.fillText(cell.char, px + 0.8, py + 0.5);
        }
      }

      ctx.globalAlpha = 1;

      // Shader-like warm ethereal post-processing wash (vignette + soft bloom simulation)
      const grad = ctx.createRadialGradient(
        canvas.width * 0.35, canvas.height * 0.25, canvas.width * 0.1,
        canvas.width * 0.65, canvas.height * 0.75, Math.max(canvas.width, canvas.height) * 0.85
      );
      grad.addColorStop(0, "rgba(244, 211, 94, 0.015)");
      grad.addColorStop(0.45, "rgba(244, 162, 97, 0.008)");
      grad.addColorStop(1, "rgba(15, 10, 5, 0.03)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very light animated film grain (like ASCII Magic Film Grain post-FX)
      ctx.globalAlpha = 0.018;
      ctx.fillStyle = "#f4d35e";
      for (let g = 0; g < 38; g++) {
        const gx = ((t * 17 + g * 47) % canvas.width);
        const gy = ((t * 11 + g * 83) % canvas.height);
        ctx.fillRect(gx, gy, 1.2, 0.6);
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        mixBlendMode: "screen",
        opacity: 0.82,
      }}
    />
  );
}
