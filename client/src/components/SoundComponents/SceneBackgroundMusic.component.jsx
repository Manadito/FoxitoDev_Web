import { useEffect, useRef } from "react";
import { PositionalAudio as DreiPositionalAudio } from "@react-three/drei";

const SceneBackgroundMusic = (props) => {
  const { url, volume } = props;
  const soundRef = useRef();

  useEffect(() => {
    if (soundRef.current) {
      const audio = soundRef.current._audio || soundRef.current; // Assuming `soundRef.current` gives us access to the underlying Three.js Audio object
      // This might require validation or adjustment based on drei's implementation details
      audio.setVolume(volume);
    }
  }, [volume]);

  return <DreiPositionalAudio ref={soundRef} url={url} />;
};

export default SceneBackgroundMusic;
