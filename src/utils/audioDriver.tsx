import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function useAudioDriver(props: { url: string }) {
  const sound = useRef<any>();
  const { camera } = useThree();
  const [audioListener] = useState(() => new THREE.AudioListener());
  const audioBuffer = useLoader(THREE.AudioLoader, props.url);

  useEffect(() => {
    if (sound.current) {
      sound.current.setBuffer(audioBuffer);
      sound.current.setRefDistance(1);
      sound.current.setLoop(true);
      sound.current.setVolume(0.5);
      sound.current.play();
    }
    camera.add(audioListener);
    return () => {
      camera.remove(audioListener);
    };
  }, [audioBuffer]);
  return <positionalAudio ref={sound} args={[audioListener]} />;
}
