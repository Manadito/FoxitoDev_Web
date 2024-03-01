import { useEffect, useRef, useState } from "react";
import { Audio, AudioLoader } from "three";
import { useThree, useLoader } from "@react-three/fiber";

const ArcadeMusic = (props) => {
  const { url, volume } = props;
  const { listener } = useThree();
  const audioBuffer = useLoader(AudioLoader, url);
  const sound = useRef(null);

  useEffect(() => {
    if (!sound.current) {
      sound.current = new Audio(listener);
      listener.add(sound.current);
    }
    sound.current.setBuffer(audioBuffer);
    sound.current.setVolume(volume);
    sound.current.setLoop(true);

    if (playArcadeMusic) {
      if (!sound.current.isPlaying) {
        sound.current.play();
      }
    } else {
      if (sound.current.isPlaying) {
        sound.current.stop();
      }
    }
    return () => sound.current && sound.current.stop();
  }, [audioBuffer, listener, playArcadeMusic, volume]);

  return null;
};

export default ArcadeMusic;
