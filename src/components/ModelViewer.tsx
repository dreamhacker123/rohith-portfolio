import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useState, useCallback, useEffect, useRef, Component, type ReactNode } from "react";

const MODEL_URL = "/model.glb";

useGLTF.preload(MODEL_URL);

function AvatarModel({ onError }: { onError: () => void }) {
  const group = useRef<any>(null);
  const { scene, animations } = useGLTF(MODEL_URL, undefined, undefined, (error) => {
    console.warn("Failed to load 3D model:", error);
    onError();
  });
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play the first available animation
      const firstAction = Object.values(actions)[0];
      firstAction?.reset().fadeIn(0.5).play();
    }
    return () => {
      mixer?.stopAllAction();
    };
  }, [actions, mixer]);

  return <primitive ref={group} object={scene} scale={1.2} position={[0, -1.3, 0]} />;
}

// Error boundary to catch Three.js / suspense errors
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("ModelViewer error boundary caught:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FallbackUI() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/40 rounded-2xl">
      <div className="text-center p-6">
        <div className="text-5xl mb-3">👤</div>
        <p className="text-gray-400 text-sm font-[Rubik]">3D model unavailable</p>
      </div>
    </div>
  );
}

export default function ModelViewer() {
  const [hasError, setHasError] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleCreated = useCallback((state: { gl: { domElement: HTMLCanvasElement } }) => {
    const canvas = state.gl.domElement;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost");
      setContextLost(true);
    };

    const onContextRestored = () => {
      console.info("WebGL context restored");
      setContextLost(false);
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
  }, []);

  // Also detect if we go offline while mounted
  useEffect(() => {
    const handleOffline = () => setHasError(true);
    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);

  if (hasError || contextLost) {
    return (
      <div className="w-full h-full relative">
        <FallbackUI />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <ModelErrorBoundary fallback={<FallbackUI />}>
        <Canvas
          camera={{ position: [0, 1, 3], fov: 50 }}
          onCreated={handleCreated as any}
        >
          <ambientLight intensity={3.0} />
          <directionalLight position={[3, 3, 3]} />
          <Suspense fallback={null}>
            <AvatarModel onError={handleError} />
          </Suspense>
          <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={2} />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}
