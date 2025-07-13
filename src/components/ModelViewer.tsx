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
    <div onWheel={(e) => {
        const el = e.currentTarget;
        const isAtTop = el.scrollTop === 0 && e.deltaY < 0;
        const isAtBottom =
          el.scrollHeight - el.scrollTop === el.clientHeight && e.deltaY > 0;
    
        if (isAtTop || isAtBottom) {
          e.stopPropagation(); // prevent scroll bubbling
          e.preventDefault();  // prevent native propagation
        }
      }}
         className="w-[40%]
          h-[1200px] z-100 bg-transparent rounded-xl absolute top-[90%] -left-[0%]">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={3.0} />
        <directionalLight position={[3, 3, 3]} />
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>
        <OrbitControls enableZoom enablePan autoRotate />
      </Canvas>
    </div>
  );
}
