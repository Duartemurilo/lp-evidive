export const liquidImageVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const liquidImageFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform sampler2D uDisplacement;
  uniform vec2 uResolution;
  uniform vec2 uTextureSize;
  uniform float uTime;
  uniform float uDistortStrength;
  uniform float uDuotone;
  uniform vec3 uDuotoneShadow;
  uniform vec3 uDuotoneHighlight;

  varying vec2 vUv;

  const float PI = 3.141592653589793238;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    ) * 2.0 - 1.0;
  }

  vec2 getCoverUV(vec2 uv, vec2 texSize) {
    float scale = max(uResolution.x / texSize.x, uResolution.y / texSize.y);
    vec2 offset = (uResolution - texSize * scale) * 0.5;
    return (uv * uResolution - offset) / (texSize * scale);
  }

  vec3 applyDuotone(vec3 c, vec3 shadow, vec3 highlight) {
    c = clamp((c - 0.5) * 1.15 + 0.5, 0.0, 1.0);
    float lum = pow(dot(c, vec3(0.299, 0.587, 0.114)), 0.92);
    vec3 duo = mix(shadow, highlight, smoothstep(0.0, 1.0, lum));
    float shift = (c.r - c.b) * 0.08;
    duo.r += shift;
    duo.b -= shift * 0.45;
    return clamp(mix(vec3(dot(duo, vec3(0.299, 0.587, 0.114))), duo, 1.2), 0.0, 1.0);
  }

  void main() {
    vec4 disp = texture2D(uDisplacement, vUv);
    float theta = disp.r * 2.0 * PI;
    vec2 coverUv = getCoverUV(vUv, uTextureSize);
    vec2 finalUv = coverUv + vec2(sin(theta), cos(theta)) * disp.r * uDistortStrength;

    vec3 sampled = texture2D(uTexture, finalUv).rgb;
    vec3 color = uDuotone > 0.5
      ? applyDuotone(sampled, uDuotoneShadow, uDuotoneHighlight)
      : sampled;

    vec2 px = vUv * uResolution;
    float edgeNoise = noise(px * 0.012 + uTime * 0.12) * 3.5;
    float vignette = smoothstep(1.05, 0.55 + edgeNoise * 0.002, length(vUv - 0.5) * 1.35);

    gl_FragColor = vec4(color * mix(1.0, 0.92, vignette * 0.35), 1.0);
  }
`;
