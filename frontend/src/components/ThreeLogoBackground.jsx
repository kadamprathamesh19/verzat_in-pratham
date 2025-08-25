import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Component to load and display a static logo
const StaticLogo = () => {
    const texture = useLoader(TextureLoader, "/Logo.png");

    return (
        <mesh position={[0, 0, 0]}>
            <planeGeometry args={[9, 10]} />
            <meshStandardMaterial
                map={texture}
                color={"#1e3a8a"}
                transparent
                opacity={0.15}
            />
        </mesh>
    );
};

// Static Canvas background with no animation or interaction
const ThreeLogoBackground = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 5]  }}>
                {/* Minimal lighting just for visibility */}
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 2, 5]} />
                <StaticLogo />
            </Canvas>
        </div>
    );
};

export default ThreeLogoBackground;
