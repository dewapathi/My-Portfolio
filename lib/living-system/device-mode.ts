export type ExperienceMode = "cinematic" | "balanced" | "lite" | "reduced-motion";

/**
 * A genuinely GPU-bound micro-benchmark — NOT a bare requestAnimationFrame
 * loop. An empty rAF loop measures nothing about rendering capability (it
 * ticks at the display refresh rate whether or not WebGL exists), so it
 * cannot tell a real GPU apart from a software rasterizer (e.g. SwiftShader
 * in a headless/sandboxed browser, or a genuinely weak integrated GPU).
 * This renders a moderately expensive fragment shader to an offscreen
 * canvas and forces GPU/CPU sync each frame via `readPixels`, so slow
 * rendering actually shows up as a low measured rate.
 */
function measureRenderFps(): Promise<number> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      resolve(0);
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compile(
      gl.VERTEX_SHADER,
      `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`
    );
    const fragmentShader = compile(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      void main() {
        vec2 uv = gl_FragCoord.xy / 256.0;
        float v = 0.0;
        for (int i = 0; i < 48; i++) {
          v += sin(uv.x * float(i) * 12.9898 + uv.y * 78.233) * 0.5;
        }
        gl_FragColor = vec4(vec3(fract(v)), 1.0);
      }
    `
    );
    if (!vertexShader || !fragmentShader) {
      resolve(0);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      resolve(0);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const pixel = new Uint8Array(4);
    let frames = 0;
    const start = performance.now();

    function tick() {
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      gl!.readPixels(0, 0, 1, 1, gl!.RGBA, gl!.UNSIGNED_BYTE, pixel); // forces GPU sync
      frames++;
      const elapsed = performance.now() - start;
      if (elapsed < 400) {
        requestAnimationFrame(tick);
      } else {
        resolve((frames / elapsed) * 1000);
      }
    }
    requestAnimationFrame(tick);
  });
}

/**
 * Decides the experience mode once, before mounting any WebGL. Mirrors
 * lib/device-tier.ts's "decide before mounting, never mount-then-hide"
 * rule, extended with a real render-throughput probe for the borderline
 * desktop case — this is what actually protects a weak/software-rendered
 * GPU from being handed the full shadow + postprocessing pipeline.
 */
export async function detectExperienceMode(): Promise<ExperienceMode> {
  if (typeof window === "undefined") return "balanced";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return "reduced-motion";

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  if (coarsePointer || narrow) return "lite";

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
  if (window.innerWidth < 1024 || cores < 6 || memory < 4) return "balanced";

  const fps = await measureRenderFps();
  if (fps < 50) return "balanced";
  return "cinematic";
}
