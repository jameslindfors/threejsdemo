import "./App.css";
import { Suspense, useEffect, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

import AudioDriver from "./utils/audioDriver";

// @ts-ignore
import music from "./assets/audio/itsbeginningtolookalotlikechristmas.mp3";

// @ts-ignore
// import speaker from "./assets/speaker.glb";

const Box = () => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  let play = false;
  return (
    <mesh
      ref={ref}
      position={[0, 2, 0]}
      onClick={() => {
        api.velocity.set(0, 2, 0);
        play = true;
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="red" />
      <AudioDriver url={music} />
    </mesh>
  );
};
const Plane = () => {
  usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="#7a7a7a" />
    </mesh>
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Canvas>
          <Stars />
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Physics>
            <Box />
            <Plane />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
