import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";

import Radio from "./Radio";
import Snowman from "./Snowman";

// const Box = () => {
//   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
//   return (
//     <mesh
//       ref={ref}
//       position={[0, 2, 0]}
//       onClick={() => {
//         api.velocity.set(0, 2, 0);
//       }}
//     >
//       <boxBufferGeometry attach="geometry" />
//       <meshStandardMaterial attach="material" color="red" />
//     </mesh>
//   );
// };
const Plane = () => {
  usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[200, 200]} />
      <meshLambertMaterial attach="material" color="#93bde4" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas>
      <Stars />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <spotLight position={[10, 15, 10]} angle={0.2} color={"blue"} />
      <Physics>
        <Radio position={[16, 0, 0]} rotation={[0, -0.3, 0]} />
        <Snowman position={[-12, 0, 0]} rotation={[0, -1.5, 0]} />
        <Plane />
      </Physics>
    </Canvas>
  );
};

export default Scene;
