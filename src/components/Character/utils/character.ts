import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () =>
    new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        "/models/character.glb",
        async (gltf) => {
          const character = gltf.scene;

          // compileAsync is an optional perf optimization. It throws on some
          // material configurations in three@0.168; swallow and continue so we
          // still resolve the GLTF promise and the loader can finish.
          try {
            await renderer.compileAsync(character, camera, scene);
          } catch {
            // Fall back to lazy shader compilation on first render.
          }

          character.traverse((child) => {
            const mesh = child as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          resolve(gltf);

          try {
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          } catch {
            // Non-fatal — character is already resolved.
          }
        },
        undefined,
        (error) => reject(error)
      );
    });

  return { loadCharacter };
};

export default setCharacter;
