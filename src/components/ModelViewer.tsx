import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const MODEL_URL = "https://models.readyplayer.me/687254004ae6d2c194baa617.glb";

// Preload the model
useGLTF.preload(MODEL_URL);

function AvatarModel() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} scale={1.2} position={[0, -1.3, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={3.0} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
