import * as THREE from "three";

/**
 * The "digital dissolve" transition material from EXPERIENCE_BIBLE.md §6.
 * A plain THREE.ShaderMaterial (not drei's shaderMaterial/extend helper) so
 * it needs no JSX-intrinsic registration — applied directly via a mesh's
 * `material` prop and driven imperatively through `uniforms.uProgress`.
 */
export function createDissolveMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#0C1F17") },
      uColorB: { value: new THREE.Color("#05070A") },
      uEdgeColor: { value: new THREE.Color("#4CD8E0") },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uProgress;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uEdgeColor;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        float n = noise(vUv * 6.0) * 0.6 + noise(vUv * 14.0) * 0.4;
        float edge = smoothstep(uProgress - 0.06, uProgress, n) - smoothstep(uProgress, uProgress + 0.06, n);
        vec3 base = mix(uColorB, uColorA, step(n, uProgress));
        vec3 color = mix(base, uEdgeColor, edge * 2.0);
        float alpha = step(n, uProgress + 0.4);
        gl_FragColor = vec4(color, alpha * 0.92);
      }
    `,
  });
}
