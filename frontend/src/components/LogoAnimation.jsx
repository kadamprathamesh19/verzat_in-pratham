import { useRef, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define shader material inline (NO glsl.macro!)
const LogoRevealMaterial = shaderMaterial(
  { uTexture: null, uProgress: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    uniform float uProgress;
    varying vec2 vUv;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      if (vUv.y > uProgress) discard;
      gl_FragColor = texColor;
    }
  `
);

extend({ LogoRevealMaterial });

export default function LogoFillAnimation({ onComplete }) {
  const matRef = useRef();
  const texture = useTexture('/Logo_White.png');

  useEffect(() => {
    texture.encoding = THREE.sRGBEncoding;
  }, [texture]);

  useFrame(({ clock }) => {
    const t = Math.min(clock.getElapsedTime() / 2, 1); // animation duration
    if (matRef.current) {
      matRef.current.uProgress = t;
    }
    if (t >= 1 && onComplete) {
      onComplete();
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[8, 8]} />
      <logoRevealMaterial ref={matRef} uTexture={texture} transparent />
    </mesh>
  );
}
