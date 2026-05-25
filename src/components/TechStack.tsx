import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

type SphereSpec = { scale: number; materialIndex: number };

const createSpheres = (count: number, materialCount: number): SphereSpec[] =>
  Array.from({ length: count }, () => ({
    scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
    materialIndex: Math.floor(Math.random() * materialCount),
  }));

type SphereProps = {
  scale: number;
  material: THREE.Material;
  isActive: boolean;
};

const impulseVec = new THREE.Vector3();
const tmpVec = new THREE.Vector3();

function SphereGeo({ scale, material, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const r = THREE.MathUtils.randFloatSpread;
  // Stable initial position
  const initial = useMemo<[number, number, number]>(
    () => [r(20), r(20) - 25, r(20) - 10],
    []
  );

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const d = Math.min(0.1, delta);
    const t = api.current.translation();
    impulseVec.set(t.x, t.y, t.z).normalize();
    tmpVec.set(-50 * d * scale, -150 * d * scale, -50 * d * scale);
    impulseVec.multiply(tmpVec);
    api.current.applyImpulse(impulseVec, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={initial}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

const pointerTarget = new THREE.Vector3();

function Pointer({ isActive }: { isActive: boolean }) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    pointerTarget.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    ref.current.setNextKinematicTranslation(pointerTarget);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const [materials, setMaterials] = useState<THREE.MeshPhysicalMaterial[]>([]);
  const [sphereCount] = useState(() => (window.innerWidth <= 768 ? 15 : 30));

  // Lazily load textures + create materials only when we'll actually render.
  useEffect(() => {
    if (!shouldMount || materials.length > 0) return;
    const loader = new THREE.TextureLoader();
    const mats = imageUrls.map(
      (url) =>
        new THREE.MeshPhysicalMaterial({
          map: loader.load(url),
          emissive: "#ffffff",
          emissiveMap: loader.load(url),
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
    setMaterials(mats);
    return () => {
      mats.forEach((m) => {
        m.map?.dispose();
        m.emissiveMap?.dispose();
        m.dispose();
      });
    };
  }, [shouldMount]);

  const spheres = useMemo(
    () => createSpheres(sphereCount, imageUrls.length),
    [sphereCount]
  );

  // Gate mounting + activation behind an IntersectionObserver.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShouldMount(true);
          setIsActive(entry.isIntersecting);
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="techstack" ref={containerRef}>
      <h2> My Techstack</h2>
      {shouldMount && materials.length > 0 && (
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          className="tech-canvas"
        >
          <ambientLight intensity={1} />
          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <directionalLight position={[0, 5, -4]} intensity={2} />
          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />
            {spheres.map((spec, i) => (
              <SphereGeo
                key={i}
                scale={spec.scale}
                material={materials[spec.materialIndex]}
                isActive={isActive}
              />
            ))}
          </Physics>
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
};

export default TechStack;
