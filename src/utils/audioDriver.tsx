import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function useAudioDriver(props: {
  url: string;
  volume?: number;
}) {
  const sound = useRef<any>();
  const { camera } = useThree();
  const [audioListener] = useState(() => new THREE.AudioListener());
  const audioBuffer = useLoader(THREE.AudioLoader, props.url);

  useEffect(() => {
    if (sound.current) {
      sound.current.setBuffer(audioBuffer);
      sound.current.setRefDistance(2);
      sound.current.setLoop(true);
      sound.current.setVolume(props.volume);
      sound.current.play();
    }
    camera.add(audioListener);
    return () => {
      camera.remove(audioListener);
    };
  }, [audioBuffer, audioListener, camera]);
  return <positionalAudio ref={sound} args={[audioListener]} />;
}
