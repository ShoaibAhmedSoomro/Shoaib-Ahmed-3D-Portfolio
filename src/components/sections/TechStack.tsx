import * as THREE from "three";
import { Component, useRef, useMemo, useState, useEffect, type ReactNode } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGooglecloud,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
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

// Official brand glyphs (Simple Icons via react-icons) rendered to canvas textures.
const techs: { Icon: IconType; label: string; color: string }[] = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#000000" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  { Icon: SiExpress, label: "Express", color: "#000000" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { Icon: SiMysql, label: "MySQL", color: "#4479A1" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { Icon: SiPython, label: "Python", color: "#3776AB" },
  { Icon: SiLinux, label: "Linux", color: "#FCC624" },
  { Icon: SiGooglecloud, label: "Google Cloud", color: "#4285F4" },
  { Icon: SiThreedotjs, label: "Three.js", color: "#000000" },
];

function makeTexture({ Icon, label, color }: (typeof techs)[number]) {
  const svg = renderToStaticMarkup(<Icon size={420} color={color} />);
  const img = new Image();
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  return new Promise<THREE.CanvasTexture>((resolve, reject) => {
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 1404;
      c.height = 966;
      const g = c.getContext("2d")!;
      g.fillStyle = "#ffffff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, (c.width - 420) / 2, 170, 420, 420);
      g.fillStyle = "#1c1820";
      g.font = "600 110px 'Plus Jakarta Sans', system-ui, sans-serif";
      g.textAlign = "center";
      g.fillText(label, c.width / 2, 760);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = url;
  });
}

/** A failed asset (HDR, WASM, WebGL) must never take the whole page down. */
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

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
  const { isLoading } = useLoading();

  // Warm up (textures, physics WASM, shader compile) shortly after the intro,
  // while the user is still near the top, instead of freezing the scroll later.
  useEffect(() => {
    if (isLoading) return;
    const id = window.setTimeout(() => setShouldMount(true), 4000);
    return () => clearTimeout(id);
  }, [isLoading]);
  const [materials, setMaterials] = useState<THREE.MeshPhysicalMaterial[]>([]);
  const [sphereCount] = useState(() => (window.innerWidth <= 768 ? 15 : 30));

  // Lazily load textures + create materials only when we'll actually render.
  useEffect(() => {
    if (!shouldMount || materials.length > 0) return;
    let cancelled = false;
    let mats: THREE.MeshPhysicalMaterial[] = [];
    Promise.all(techs.map(makeTexture))
      .then((textures) => {
        mats = textures.map(
          (map) =>
            new THREE.MeshPhysicalMaterial({
              map,
              emissive: "#ffffff",
              emissiveMap: map,
              emissiveIntensity: 0.3,
              metalness: 0.5,
              roughness: 1,
              clearcoat: 0.1,
            })
        );
        if (!cancelled) setMaterials(mats);
        else mats.forEach((m) => m.dispose());
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      mats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    };
  }, [shouldMount]);

  const spheres = useMemo(
    () => createSpheres(sphereCount, techs.length),
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
      <h2>My tech stack</h2>
      {shouldMount && materials.length > 0 && (
        <CanvasBoundary>
        <Canvas
          shadows
          frameloop={isActive ? "always" : "demand"}
          dpr={[1, 1.5]}
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
          <Physics gravity={[0, 0, 0]} paused={!isActive}>
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
        </CanvasBoundary>
      )}
    </div>
  );
};

export default TechStack;
