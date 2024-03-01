import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { useAppContext } from "../context/AppContext.context";
import styles from "../ThreeEnvironment/ThreeScene.module.css";
import {
  /* OrthographicCamera, // This helper allows us to create cameras, in our particular case 
  we decided not to use it as we are using the camera from the canvas. As you will see, our 
  OrbitControls is calling the canvas camera in its arguments. We are able to bring the cam
  through destructuring of the useThree() methods */
  OrbitControls,
  useHelper,
  Html,
  Billboard,
  PositionalAudio,
} from "@react-three/drei"; // useHelper will work in conjunction with native three js.
import { gsap } from "gsap"; // GreenSock Animation Platform - A js library for creating high-performance animations.
import * as THREE from "three"; // We need to import the helpers from the native three js.

// Components
import PortraitImage from "../components/PortraitImage/PortraitImage.component";
import PortraitAboutBox from "../components/PortraitImage/PortraitAboutBox.component";
import ContactForm from "../components/ContactForm/ContactForm";
import ArcadeCreditsMainView from "../components/ArcadeCredits/ArcadeCreditsMainView.component";
import ArcadeJoyStickCtrl from "../components/ArcadeCredits/ArcadeJoyStickCtrl.component";
import LaptopScreen from "../components/LaptopScreen/LaptopScreen.component";
import TelevisionScreen from "../components/TelevisionScreen/TelevisionScreen.component";
import EaselScreen from "../components/EaselScreen/EaselScreen.component";

// 3D Models and Props
import { PictureFrame } from "../ModelComponents/PictureFrame";
import { ComputerMonitor } from "../ModelComponents/ComputerMonitor";
import { Arcade } from "../ModelComponents/Arcade";
import { ArcadeJoystick } from "../ModelComponents/ArcadeJoystick";
import { ArcadeButtonA } from "../ModelComponents/ArcadeButtonA";
import { ArcadeButtonB } from "../ModelComponents/ArcadeButtonB";
import { ArcadeScreen } from "../ModelComponents/ArcadeScreen";
import { Laptop } from "../ModelComponents/Laptop";
import { LaptopButton } from "../ModelComponents/LaptopButton";
import { Television } from "../ModelComponents/Television";
import { TelevisionScreenMesh } from "../ModelComponents/TelevisionScreenMesh";
import { Easel } from "../ModelComponents/Easel";
import { HouseStructure } from "../ModelComponents/HouseStructure";
import { Props } from "../ModelComponents/Props";
import { Furniture } from "../ModelComponents/Furniture";
import { BookShelf } from "../ModelComponents/BookShelf";
import { VendingMachine } from "../ModelComponents/VendingMachine";
import { Map } from "../ModelComponents/Map";
import { BabyBunnyAnimation } from "../ModelComponents/BabyBunnyAnimation";
import { BabyFoxitoAnimation } from "../ModelComponents/BabyFoxitoAnimation";
import { BabyFoxitoTailAnimation } from "../ModelComponents/BabyFoxitoTailAnimation";
import { Text } from "../ModelComponents/Text";

function ThreeScene(props) {
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//

  // Obtaining the camera and domElement objects from the useThree context by destructuring

  const {
    camera,
    pointer,
    gl: { domElement },
  } = useThree();

  // Three context variables

  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, 1); // This accepts three paramters. 1. A reference 2. The helper we want to use from three js 3. The helper size
  const orbitRef = useRef();
  const targetRef = useRef(new THREE.Vector3(0, 20, 0));

  // Varibale to disable rotation orbiting ctrls when zoomed on an interacted object

  const [controlsEnabled, setControlsEnabled] = useState(true);

  // Initial default camera settings variable

  const [cameraSettings, setCameraSettings] = useState({
    position: { x: 50, y: 40, z: 50 },
    zoom: 10,
    target: { x: 0, y: 0, z: 0 },
  });

  // Interaction variables used for responsiveness

  const [lastInteractedObject, setLastInteractedObject] = useState(null);
  const [notYetInteracted, setNotYetInteracted] = useState(null);

  // Variables to control obstructing object visibility. This came in handy for Orthographic setups.

  const [isCharacterVisible, setIsCharacterVisible] = useState(true);
  const [isYellowChairVisible, setIsYellowChairVisible] = useState(true);

  // Timeout variable

  const timeoutRef = useRef();

  // Picture frame variable.

  const pictureFrame = useRef(); // Used to store the rotation values for its animation.

  // Variables used to setup HTML Elements' position in 3D space

  const formPosition = [-14.2233, 5.8, 3.4];
  const arcadeCreditsPos = [-15.9, 4, -7.7];
  const laptopPos = [8.4, 3.84, -12.95];
  const easelPos = [-27.96, 21, -4.25];
  const portraitPos = [-19.3, 22.01, 13.96];
  const televisionPos = [-8.4, 18.1, -11.8];
  const arcadeJoyStickCtrlPos = [-13.9, 3.27, -6.5];

  // In scope texture loader variables

  const computerScreen = useLoader(
    THREE.TextureLoader,
    "/textures/computerScreen.webp",
  ); // Method to load textures

  const arcadeScreen = useLoader(
    THREE.TextureLoader,
    "/textures/arcadeScreen.webp",
  );

  // Arcade variables
  // Arcade variables
  // Arcade variables

  // Arcade buttons variables
  const {
    joystickAnimationActions,
    buttonAAnimationAction,
    buttonBAnimationAction,
    setSelectedOption,
    selectedOption,
  } = useAppContext();
  // Arcade control variables
  const [isDragging, setIsDragging] = useState(false);
  const joystickRef = useRef();
  const buttonARef = useRef();
  const buttonBRef = useRef();
  const [showDetails, setShowDetails] = useState(false);

  // Arcade hovering variable
  const [hovered, setHovered] = useState(false);

  // Audio sound and sfx variables
  // Audio sound and sfx variables
  // Audio sound and sfx variables

  const [generalMusicDistance, setGeneralMusicDistance] = useState(10);
  const targetDistance = useRef(10);
  // Arcade sound variables
  const [playArcadeMusic, setPlayArcadeMusic] = useState(false);
  const [decreaseArcadeMusicVol, setDecreaseArcadeMusicVol] = useState(false);
  const [arcadeMusicVolume, setArcadeMusicVolume] = useState(0); // Start muted.
  const [playCoinInsertSFX, setPlayCoinInsertSFX] = useState(false);
  const [playArcadeSelectSFX, setPlayArcadeSelectSFX] = useState(false);
  const [playArcadeAcceptSFX, setPlayArcadeAcceptSFX] = useState(false);
  // Easelo sound variables
  const [playEaselMusic, setPlayEaselMusic] = useState(false);
  const [decreaseEaselMusicVol, setDecreaseEaselMusicVol] = useState(false);
  const [easelMusicVolume, setEaselMusicVolume] = useState(0);

  // Interactivity variables
  // Interactivity variables
  // Interactivity variables

  const [isArcadeClickable, setIsArcadeClickable] = useState(true);
  const [isInitialDialogueShown, setIsInitialDialogueShown] = useState(false);
  const [isLaptopClickable, setIsLaptopClickable] = useState(true);
  const [isTelevisionClickable, setIsTelevisionClickable] = useState(true);
  const [isBabyBunnyClickable, setIsBabyBunnyClickable] = useState(true);

  // Carousel state variable

  const [active, setActive] = useState(0);

  // Map animation variables
  // Map animation variables
  // Map animation variables

  const frameCount = 47; // Total number of frames.
  const [frames, setFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const mapRef = useRef(); // Map click ref variable.
  const [isHovered, setIsHovered] = useState(false);

  // Variables to control the visibility and interactivity of various elements
  // Variables to control the visibility and interactivity of various elements
  // Variables to control the visibility and interactivity of various elements

  const [showArcadeScreen, setShowArcadeScreen] = useState();
  const [showForm, setShowForm] = useState();
  const [showPortraitButton, setShowPortraitButton] = useState();
  const [showTelevisionScreen, setShowTelevisionScreen] = useState();
  const [showLaptopIcons, setShowLaptopIcons] = useState();
  const [showEaselButtons, setShowEaselButtons] = useState();

  // Portrait about section variables

  const [openAbout, setOpenAbout] = useState(false);

  // Dialogue related variables

  const [isOpen, setIsOpen] = useState(false); // Flag controlling the style/animation of the dialogue box.
  const [isDialogue, setIsDialogue] = useState(false); // Flag setting active or inactive a dialogue.
  const [isAbout, setIsAbout] = useState(false); // Flag setting active or inactive the about billboard.
  const [isAnimatingText, setIsAnimatingText] = useState(false); // Flag setting acive or inactive dialogue text animations.
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0); // Set the current index within a dialogue array.
  const [currentSpeaker, setCurrentSpeaker] = useState(""); // Set the current active speaker within a dialogue array.
  const textAnimationSpeed = 35; // Text speed animation.
  const currentTextRef = useRef("");
  const [triggerRerender, setTriggerRerender] = useState(false);
  const textAnimationIntervalRef = useRef(null);

  // Dialogues

  const babyFoxitoDialogueOne = [
    {
      speaker: "Baby Foxito",
      text: "Hey, thanks for giving a hand out there!",
    },
    {
      speaker: "Baby Foxito",
      text: "Welcome to Foxito Dev's personal website.",
    },
    {
      speaker: "Baby Foxito",
      text: "Have a look around. If you get lost, I think there is a site map on top of the yellow chair.",
    },
  ];

  const babyFoxitoDialogueTwo = [
    { speaker: "Baby Foxito", text: "Have fun exploring around." },
  ];

  const babyBunnyDialogueOne = [
    {
      speaker: "Baby Bunny",
      text: "Hi there, I hope you are enjoying your stay.",
    },
  ];

  const [currentDialogue, setCurrentDialogue] = useState(babyFoxitoDialogueOne); // Set the current active dialogue.

  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE--------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//

  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//
  //------------------------------ AUDIO, MUSIC AND SFX FUNCTIONS --------------------------------//

  // BACKGROUND MUSIC DISTANCE MANAGING HELPER FUNCTION
  // BACKGROUND MUSIC DISTANCE MANAGING HELPER FUNCTION
  // BACKGROUND MUSIC DISTANCE MANAGING HELPER FUNCTION

  // This function manages the volume of the background music based on distance.

  useFrame(() => {
    // Gradually adjust generalMusicDistance towards targetDistance.
    // This creates a smooth transition effect.
    if (generalMusicDistance !== targetDistance.current) {
      setGeneralMusicDistance((prevDistance) => {
        // Calculate the next distance step, ensuring we don't overshoot the target.
        const step = (targetDistance.current - prevDistance) * 0.1; // Adjust the multiplier to control the speed.
        const nextDistance = prevDistance + step;
        // Check if we are close enough to the target to consider it as reached.
        if (Math.abs(nextDistance - targetDistance.current) < 0.01) {
          return targetDistance.current;
        }
        return nextDistance;
      });
    }
  });

  // AUDIO CALLS HELPER FUNCTION
  // AUDIO CALLS HELPER FUNCTION
  // AUDIO CALLS HELPER FUNCTION

  // This function plays different audios based on interactivity.

  useEffect(() => {
    // Ontain the audio elements.
    const audioElementOne = document.getElementById("arcadeMusic");
    const audioElementTwo = document.getElementById("arcadeCoinInsert");
    const audioElementThree = document.getElementById("arcadeSelect");
    const audioElementFour = document.getElementById("arcadeAccept");
    const audioElementFive = document.getElementById("easelMusic");

    // Check if the audio elements are playable.
    // Check arcade music.
    if (playArcadeMusic) {
      audioElementOne.play(); // Play the audio.
      audioElementOne.volume = arcadeMusicVolume; // The audio file's volume wil be equal to the volume state varaible value.
    }
    // Check coin insert sfx.
    if (playCoinInsertSFX) {
      audioElementTwo.play(); // Play the audio.
      audioElementTwo.volume = 1; // The audio file's volume wil be equal to the volume state varaible value.
      audioElementTwo.onended = () => {
        // Only play this sound once just in case.
      };
      setPlayCoinInsertSFX(false);
    }
    // Check joystick select sfx.
    if (playArcadeSelectSFX) {
      audioElementThree.play(); // Play the audio.
      audioElementThree.volume = 0.5; // The audio file's volume wil be equal to the volume state varaible value.
    }
    // Check arcade accept sfx.
    if (playArcadeAcceptSFX) {
      audioElementFour.play(); // Play the audio.
      audioElementFour.volume = 0.5; // The audio file's volume wil be equal to the volume state varaible value.
    }
    // Check easel music.
    if (playEaselMusic) {
      audioElementFive.play(); // Play the audio.
      audioElementFive.volume = 1; // The audio file's volume wil be equal to the volume state varaible value.
    }
  }, [
    playArcadeMusic,
    playCoinInsertSFX,
    setPlayCoinInsertSFX,
    playArcadeSelectSFX,
    playArcadeAcceptSFX,
    arcadeMusicVolume,
    playEaselMusic,
  ]);

  // ARCADE MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION
  // ARCADE MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION
  // ARCADE MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION

  // This function manages audio control as the camera zooms in on the arcade and is zooms out (extis).

  useFrame(() => {
    const audioElement = document.getElementById("arcadeMusic");
    if (playArcadeMusic && arcadeMusicVolume < 1 && !decreaseArcadeMusicVol) {
      setArcadeMusicVolume((prevVolume) => {
        const nextVolume = Math.min(prevVolume + 0.01, 0.1); // Increase volume
        if (audioElement) {
          audioElement.volume = nextVolume;
        }
        return nextVolume;
      });
    } else if (
      playArcadeMusic &&
      decreaseArcadeMusicVol &&
      arcadeMusicVolume > 0
    ) {
      setArcadeMusicVolume((prevVolume) => {
        const nextVolume = Math.max(prevVolume - 0.01, 0); // Smoothly decrease volume
        if (audioElement) {
          audioElement.volume = nextVolume;
        }

        // When volume reaches 0, you might want to stop the audio and reset states
        if (nextVolume === 0) {
          audioElement.pause();
          audioElement.currentTime = 0;
          setPlayArcadeMusic(false);
          setDecreaseArcadeMusicVol(false); // Ensure we stop decreasing volume
        }
        return nextVolume;
      });
    }
  });

  // EASEL MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION
  // EASEL MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION
  // EASEL MUSIC AUDIO VOLUME CONTROL HELPER FUNCTION

  // This function manages audio control as the camera zooms in on the arcade and is zooms out (exits).

  useFrame(() => {
    const audioElement = document.getElementById("easelMusic");
    if (playEaselMusic && easelMusicVolume < 1 && !decreaseEaselMusicVol) {
      setEaselMusicVolume((prevVolume) => {
        const nextVolume = Math.min(prevVolume + 0.01, 0.2); // Increase volume
        if (audioElement) {
          audioElement.volume = nextVolume;
        }
        return nextVolume;
      });
    } else if (
      playEaselMusic &&
      decreaseEaselMusicVol &&
      easelMusicVolume > 0
    ) {
      setEaselMusicVolume((prevVolume) => {
        const nextVolume = Math.max(prevVolume - 0.01, 0); // Smoothly decrease volume
        if (audioElement) {
          audioElement.volume = nextVolume;
        }

        // When volume reaches 0, you might want to stop the audio and reset states
        if (nextVolume === 0) {
          audioElement.pause();
          audioElement.currentTime = 0;
          setPlayEaselMusic(false);
          setDecreaseEaselMusicVol(false); // Ensure we stop decreasing volume
        }
        return nextVolume;
      });
    }
  });

  // ARCADE HOVER FUNCTION
  // ARCADE HOVER FUNCTION
  // ARCADE HOVER FUNCTION

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//
  //---------------------------------- DIALOGUE LOGIC FUNCTION -----------------------------------//

  useEffect(() => {
    if (isDialogue && isAnimatingText) {
      let localTextIndex = 0;

      setCurrentSpeaker(currentDialogue[currentDialogueIndex].speaker);
      currentTextRef.current = ""; // Reset text at the start of animation

      textAnimationIntervalRef.current = setInterval(() => {
        const dialogueText = currentDialogue[currentDialogueIndex].text;

        if (localTextIndex < dialogueText.length) {
          currentTextRef.current += dialogueText[localTextIndex];
          setTriggerRerender((prev) => !prev); // Toggle to trigger re-render since Refs don't operate with re renders.
          localTextIndex++;
        } else {
          clearInterval(textAnimationIntervalRef.current);
          setIsAnimatingText(false); // Text fully displayed
        }
      }, textAnimationSpeed);

      return () => clearInterval(textAnimationIntervalRef.current);
    }
  }, [
    currentDialogueIndex,
    currentDialogue,
    isAnimatingText,
    isDialogue,
    textAnimationSpeed,
  ]);

  // Dialogue handler functions
  // Dialogue handler functions
  // Dialogue handler functions

  // Handle the user's dialogue box interaction when clicking
  // This same function will be called if the user presses ENTER

  const handleDialogueBoxClick = useCallback(() => {
    if (isAnimatingText) {
      clearInterval(textAnimationIntervalRef.current); // Clear the interval

      // Skip current text animation and display it fully
      setIsAnimatingText(false);
      currentTextRef.current = currentDialogue[currentDialogueIndex].text;
    } else {
      // Move to the next dialogue text or end the dialogue
      if (currentDialogueIndex + 1 < currentDialogue.length) {
        setCurrentDialogueIndex((prevIndex) => prevIndex + 1);
        currentTextRef.current = ""; // Reset text for next dialogue
        setIsAnimatingText(true); // Start animating next text
      } else {
        setIsDialogue(false); // No more dialogues to display.
        setIsOpen(false); // Optionally close/hide the dialogue box.

        /* console.log("initialDialogue is now false"); */
      }
    }
  }, [currentDialogue, currentDialogueIndex, isAnimatingText]);

  // Add an event listener for when the user presses the ENTER key
  // Pressing ENTER will activate the same functionality as clicking
  // That is why this function calls "handleDialogueInteraction"

  useEffect(() => {
    const handleDialogueInteraction = (e) => {
      if (e.key === "Enter" && isDialogue) {
        handleDialogueBoxClick();
      }
    };

    window.addEventListener("keydown", handleDialogueInteraction);
    return () => {
      window.removeEventListener("keydown", handleDialogueInteraction);
      clearInterval(textAnimationIntervalRef.current);
    };
  }, [isDialogue, handleDialogueBoxClick]);

  // Initiate the first Dialogue
  // Initiate the first Dialogue
  // Initiate the first Dialogue

  useEffect(() => {
    if (!isInitialDialogueShown) {
      const initialDelayTimer = setTimeout(() => {
        setIsDialogue(true);
        setIsAnimatingText(true);
        setIsOpen(true);
        setIsInitialDialogueShown(true); // We set this to true after showing the initial dialogue
      }, 3200); // 3 second delay in order to avoid showing first dialogue inmediately after scene loads.

      return () => clearTimeout(initialDelayTimer);
    }
  }, [isInitialDialogueShown]);

  useEffect(() => {
    // Clear the tiemout when the component unmounts. This is done in order to avoid memory leaks and crashes.
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle the rest of the dialogues
  // Handle the rest of the dialogues
  // Handle the rest of the dialogues

  const getDialogueForCharacter = (characterId) => {
    if (characterId === "BabyFoxito") {
      return babyFoxitoDialogueTwo;
    } else if (characterId === "BabyBunny") {
      return babyBunnyDialogueOne;
    }
  };

  const handleClickedCharacterDialogues = (characterId) => {
    const newDialogue = getDialogueForCharacter(characterId);

    setCurrentDialogue(newDialogue);
    setCurrentDialogueIndex(0); // Start dialogue from index 0.
    currentTextRef.current = ""; // Clean up last text.
    setIsDialogue(true);
    setIsOpen(true);
    setIsAnimatingText(true);
  };

  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//
  //----------------------------------- MAP LOGIC FUNCTIONS --------------------------------------//

  // Loading the frames and pushing them into an array
  // Loading the frames and pushing them into an array
  // Loading the frames and pushing them into an array

  useEffect(() => {
    const loadedFrames = []; // Temporary array to hold paths
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/images/map/frame${i}.webp`; // Corrected path
      loadedFrames.push(img.src); // Push to temporary array
    }

    setFrames(loadedFrames); // Update state with all loaded frames at once
  }, []);

  // DEBUG
  /*   useEffect(() => {
    console.log(frames); // Log to see if frames are updated
  }, [frames]); */

  // Function to handle the click event to open the map and start the animation
  // Function to handle the click event to open the map and start the animation
  // Function to handle the click event to open the map and start the animation

  const handleMapClick = () => {
    setIsMapOpen(true); // Indicate that the map is open
    setIsAnimating(true); // Start the animation
    setCurrentFrameIndex(0); // Reset to start from the first frame if needed
  };

  // Adjusted useEffect for animation
  // Adjusted useEffect for animation
  // Adjusted useEffect for animation

  useEffect(() => {
    let interval;
    if (isAnimating && isMapOpen) {
      interval = setInterval(() => {
        setCurrentFrameIndex((current) => {
          if (current === 23) {
            // If we're at the pause frame and not handling the closing animation,
            // don't increment the frame index; just pause here
            return current;
          } else if (current >= 24 && current < frameCount - 1) {
            // Allow the animation to proceed for closing
            return current + 1;
          } else if (current === frameCount - 1) {
            // If we've reached the end of the closing animation, stop the animation
            setIsAnimating(false);
            return current;
          }
          return (current + 1) % frameCount; // Loop for safety, though this case might be adjusted based on needs
        });
      }, 1000 / 24);

      return () => clearInterval(interval);
    }
  }, [isAnimating, isMapOpen, currentFrameIndex, frameCount]);

  // Function to handle closing the map, which continues the animation from the paused state
  // Function to handle closing the map, which continues the animation from the paused state
  // Function to handle closing the map, which continues the animation from the paused state

  const handleCloseMap = () => {
    // Directly move to the next frame if paused at frame 24 (index 23)
    if (currentFrameIndex === 23) {
      setCurrentFrameIndex(24);
    }
    setIsAnimating(true); // Signal to resume animation
  };

  // Adjusted useEffect to handle the end of the closing animation
  // Adjusted useEffect to handle the end of the closing animation
  // Adjusted useEffect to handle the end of the closing animation

  useEffect(() => {
    if (currentFrameIndex === frameCount - 1 && isAnimating) {
      // If it's the last frame of closing animation
      setIsAnimating(false); // Stop animating
      setIsMapOpen(false); // Close the map
      setCurrentFrameIndex(0); // Reset to first frame or set to any specific frame for next opening
    }
  }, [currentFrameIndex, isAnimating]);

  //  Map Hover with Raycast
  //  Map Hover with Raycast
  //  Map Hover with Raycast

  useFrame(() => {
    if (!mapRef.current) return;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);

    // Perform the raycasting
    const intersects = raycaster.intersectObject(mapRef.current, true);
    // Check if the mouse is over the map
    const isHovered = intersects.length > 0;
    setIsHovered(isHovered);

    // Update cursor style based on hover state
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  });

  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//
  //----------------------------- ARCADE CONTROLS LOGIC FUNCTIONS --------------------------------//

  // As you  will notice,  the following  functions do not need the use of a useEffect function to
  // attach event  listeners, since we are  currently dealing  with standard  HTML event  handling,
  // not canvas or WebGl event handling. In  this particular case, the event listeners are attached
  // directly attached to DOM elements via props like "onClick", "onMouseDown", "onPointerDown" etc.
  // They are set up and cleaned up automatically by React. And since we are not using a useEffect,
  // then we don't need to wrap the handler functions inside useCallbacks (nor add dependencies).

  // Set dragging in action
  // Set dragging in action
  // Set dragging in action

  const handlePointerDown = (event) => {
    // Make  sure  to add  this on drag functions  in order to manage
    // default  browser  behaviors that  can  interfere  with  custom
    // drag-and-drop or pointer interaction logic in web applications.
    // In this particular case, we avoid the "drag not allowed" cursor.
    event.preventDefault();
    // Get the bounding rectangle of the target element
    const rect = event.target.getBoundingClientRect();

    // Calculate coordinates relative to the element
    // This will provide us with consistent units that
    // will only change if the camera zoom is changed
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    /* console.log("Pointer Down at (relative to element):", x, y); */

    // Conditions based on app responsiveness.
    if (
      // Make sure this condition is first.
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      window.innerHeight >= 1024
    ) {
      if (x >= 100 && x <= 196 && y <= 169 && y >= 72) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1366 &&
      window.innerHeight >= 1366
    ) {
      if (x >= 130 && x <= 256 && y <= 222 && y >= 96) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 1 && window.innerWidth < 640) {
      if (x >= 50 && x <= 98 && y <= 84.5 && y >= 36) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      if (x >= 50 && x <= 98 && y <= 84.5 && y >= 36) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (x >= 60 && x <= 117.6 && y <= 101.4 && y >= 43.2) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      if (x >= 80 && x <= 156.8 && y <= 135.2 && y >= 57.6) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      if (x >= 100 && x <= 196 && y <= 169 && y >= 72) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    } else if (window.innerWidth >= 1536) {
      if (x >= 120 && x <= 235.2 && y <= 202.8 && y >= 86.4) {
        //  console.log("joystick was clicked"); Debugger.
        setIsDragging(true);
      }
    }
  };

  // Manage the dragging motion and pair it to its directional animation
  // Manage the dragging motion and pair it to its directional animation
  // Manage the dragging motion and pair it to its directional animation

  const handlePointerMove = (event) => {
    // Make  sure  to add  this on drag functions  in order to manage
    // default  browser  behaviors that  can  interfere  with  custom
    // drag-and-drop or pointer interaction logic in web applications.
    // In this particular case, we avoid the "drag not allowed" cursor.
    event.preventDefault();
    // Get the bounding rectangle of the target element
    const rect = event.target.getBoundingClientRect();
    let rightBound;
    let leftBound;
    if (!isDragging) return; // Only execute if dragging is in process
    const currentMouseX = event.clientX - rect.left;
    // Conditions based on app responsiveness.
    if (
      // Make sure this condition is first.
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      window.innerHeight >= 1024
    ) {
      rightBound = 220;
      leftBound = 79;
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1366 &&
      window.innerHeight >= 1366
    ) {
      rightBound = 286;
      leftBound = 103;
    } else if (window.innerWidth >= 1 && window.innerWidth < 640) {
      rightBound = 110;
      leftBound = 39.5;
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      rightBound = 110;
      leftBound = 39.5;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      rightBound = 132;
      leftBound = 47.4;
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      rightBound = 176;
      leftBound = 63.2;
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      rightBound = 220;
      leftBound = 79;
    } else if (window.innerWidth >= 1536) {
      rightBound = 264;
      leftBound = 94.8;
    }

    if (currentMouseX > rightBound) {
      const rightAction = joystickAnimationActions.Arcade_Joystick_RightAction;

      if (rightAction) {
        rightAction.reset(); // Must reset animation due to the way Three js handles animations
        rightAction.setLoop(THREE.LoopOnce);
        // This makes sure the animation doesn't stop at it's last frame and stay there. When
        // set to true it will cause an issue where the next animation doesnt play completely.
        rightAction.clampWhenFinished = false;
        rightAction.play();
        setSelectedOption(2);
        setPlayArcadeSelectSFX(true);
        setTimeout(() => {
          setPlayArcadeSelectSFX(false);
        }, 500); // Assuming it takes 1 second for the animation to stop.
      }
      // console.log("Joystick movement to the right activated"); Debugger.
    }
    if (currentMouseX < leftBound) {
      const leftAction = joystickAnimationActions.Arcade_Joystick_LeftAction;
      if (leftAction) {
        leftAction.reset(); // Must reset animation due to the way Three js handles animations
        leftAction.setLoop(THREE.LoopOnce);
        // This makes sure the animation doesn't stop at it's last frame and stay there. When
        // set to true it will cause an issue where the next animation doesnt play completely.
        leftAction.clampWhenFinished = false;
        leftAction.play();
        setSelectedOption(1);
        setPlayArcadeSelectSFX(true);
        setTimeout(() => {
          setPlayArcadeSelectSFX(false);
        }, 500); // Assuming it takes 1 second for the animation to stop.
      }
      // console.log("Joystick movement to the left activated"); Debugger.
    }
  };

  // Manage letting go of the click after dragging.
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    /* console.log("setIsDragging is false"); */
  }, []);

  // Handle Button A click
  // Handle Button A click
  // Handle Button A click

  const handleButtonAClick = () => {
    const action = buttonAAnimationAction.Arcade_Button_AAction;
    setIsArcadeClickable(false);
    /* console.log(action); */
    if (action) {
      action.reset(); // Must reset animation due to the way Three js handles animations
      action.setLoop(THREE.LoopOnce);
      // This makes sure the animation doesn't stop at it's last frame and stay there. When
      // set to true it will cause an issue where the next animation doesnt play completely.
      action.clampWhenFinished = false;

      action.play();
      setShowDetails(true);
    }

    setPlayArcadeAcceptSFX(true);

    /* console.log("Button A has been pressed"); */
  };

  // Handle Button B click
  // Handle Button B click
  // Handle Button B click

  const handleButtonBClick = () => {
    const action = buttonBAnimationAction.Acrade_Button_BAction;
    // Makes the arcade temporarily unclickable so it doesn't clash with the B button zoom out click.
    setIsArcadeClickable(false);
    // Makes the arcade clickable again after one second, so the user is able to zoom in to the arcade
    // again in the future if needed.
    setTimeout(() => {
      setIsArcadeClickable(true);
    }, 2000); // Assuming the zoom-out takes 1 second.
    /* console.log(action); */
    if (action && !showDetails) {
      action.reset(); // Must reset animation due to the way Three js handles animations.
      action.setLoop(THREE.LoopOnce);
      // This makes sure the animation doesn't stop at it's last frame and stay there. When
      // set to true it will cause an issue where the next animation doesnt play completely.
      action.clampWhenFinished = false;
      action.play();
      handleObjectClick("exitArcade", [50, 40, 50], [0, 20, 0], 1.1);
    } else if (action && showDetails) {
      action.reset(); // Must reset animation due to the way Three js handles animations
      action.setLoop(THREE.LoopOnce);
      // This makes sure the animation doesn't stop at it's last frame and stay there. When
      // set to true it will cause an issue where the next animation doesnt play completely.
      action.clampWhenFinished = false;
      action.play();
      setShowDetails(false);
      setSelectedOption(1); // Setting the selected option as 1 again to reset the menu.
      setPlayArcadeAcceptSFX(false);
    }
    /* console.log("Button B has been pressed"); */
  };

  // This particular useEffect makes sure the clicking is let go off html tg div bounds.
  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//
  //-------------------------------- LAPTOP BUTTON CLICK FUNCTION --------------------------------//

  // Handle Laptop exit button click
  // Handle Laptop exit button click
  // Handle Laptop exit button click

  const handleLaptopButtonClick = () => {
    // Make the laptop temporarily unclickable.
    setIsLaptopClickable(false);
    // Make the laptop clickable again.
    setTimeout(() => {
      setIsLaptopClickable(true);
    }, 2000); // Assuming the zoom-out takes 2 second.
    handleObjectClick("exitLaptop", [50, 40, 50], [0, 20, 0], 1.1);
  };

  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//
  //------------------------------- ABOUT INFO OPENING BOX FUNCTION ------------------------------//

  const handlePortraitImageClick = () => {
    setIsAbout(true); // Allow the box to render.
    setOpenAbout(true); // Allow the box's css style to animate the box into position.
    setShowPortraitButton(false); // Remove portrait button.
  };

  //-----------------------------------------------------------------------------------------------//
  // THE FOLLOWING CONSOLE LOG MAY BE USED TO OBTAIN CAMERA DATA VALUES INCLUDING POSTION, ZOOM,
  // TARGET, POLAR ANGLES AND AZIMUTHAL ANGLES

  /*  useEffect(() => {
    const logCameraData = () => {
      console.log("Camera Position:", camera.position);
      console.log("Camera Zoom:", camera.zoom);

      // If you have a ref to OrbitControls, you can log its target like this:
      if (orbitRef.current) {
        console.log("Camera Target:", orbitRef.current.target);
        console.log("maxAzimuthAngle:", orbitRef.current.maxAzimuthAngle);
        console.log("minAzimuthAngle:", orbitRef.current.minAzimuthAngle);
        console.log("maxPolarAngle:", orbitRef.current.maxPolarAngle);
        console.log("minPolarAngle:", orbitRef.current.minPolarAngle);
      }
    };

    const interval = setInterval(logCameraData, 1000); // Log every second

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [camera, orbitRef]); */

  /////////////////////////////////////////////////
  // INITIATE SCENE WITH ANIMATION

  /* useEffect(() => { // This will initate the camera and zoom at a fixed position.
    camera.position.set(50, 40, 50);
    camera.zoom = 10; // Set the initial zoom value
    camera.updateProjectionMatrix(); // Important to apply the zoom change
  }, [camera]); */

  //-----------------------------------------------------------------------------------------------//

  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//
  //-------------------- CAMERA POSITION, ZOOM AND TARGET MANAGEMENT FUNCTIONS -------------------//

  // This functions will be called by the handleObjectClick main function.

  const updateCameraTarget = (newTarget, toTargetDuration) => {
    // Receives 'target' from handleObjectClick as its argument
    gsap.to(targetRef.current, {
      x: newTarget[0],
      y: newTarget[1],
      z: newTarget[2],
      duration: toTargetDuration,
      onUpdate: () => {
        if (orbitRef.current) {
          // Directly update OrbitControls target before updating its changes.
          // This has to be done because OrbitControls doesn't automatically listen to its target changes,
          // when these are et as a THREE.vector3 reference.
          orbitRef.current.target.x = targetRef.current.x;
          orbitRef.current.target.y = targetRef.current.y;
          orbitRef.current.target.z = targetRef.current.z;
          orbitRef.current.update(); // Update the orbitControls
        }
      },
      onComplete: () => {
        /*   console.log(
          "Target Position after animation:",
          orbitRef.current.target,
        ); */
      },
    });
  };

  const updateCameraPosition = (objectType, newPosition) => {
    gsap.fromTo(
      camera.position,
      {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      },
      {
        x: newPosition[0],
        y: newPosition[1],
        z: newPosition[2],
        duration: 1, // Duration in seconds.
        // onUpdate executes the callback function every frame of the animation.
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
        // onComplete executes the callback function once the animation is completed.
        onComplete: () => {
          switch (objectType) {
            case "computerMonitor":
              setControlsEnabled(false);
              break;
            case "exitComputerMonitor":
              setControlsEnabled(true);
              setShowForm(false);
              break;
            case "pictureFrame":
              setControlsEnabled(false);
              timeoutRef.current = setTimeout(
                () => setShowPortraitButton(true),
                50,
              ); // Delay it 100 ms
              break;
            case "exitPictureFrame":
              setControlsEnabled(true);
              setIsBabyBunnyClickable(true);
              break;
            case "television":
              setControlsEnabled(false);
              break;
            case "exitTelevision":
              setShowTelevisionScreen(false);
              setControlsEnabled(true);
              break;
            case "arcade":
              setControlsEnabled(false);
              setGeneralMusicDistance(0.5);
              setPlayCoinInsertSFX(true);
              break;
            case "exitArcade":
              setControlsEnabled(true);
              setShowArcadeScreen(false);
              targetDistance.current = 10;
              break;
            case "laptop":
              setControlsEnabled(false);
              break;
            case "exitLaptop":
              setControlsEnabled(true);
              setShowLaptopIcons(false);
              break;
            case "easel":
              setGeneralMusicDistance(0.5);
              setShowEaselButtons(true);
              setControlsEnabled(false);
              setShowForm(false);
              break;
            case "exitEasel":
              setIsTelevisionClickable(true);
              setControlsEnabled(true);
              setShowEaselButtons(false);
              targetDistance.current = 10;
              break;
            default:
            // Default logic used for error handling
            /* console.log("Unknown object type"); */
          }

          /*   console.log("Camera Position after animation:", camera.position); */
        },
      },
    );
  };

  const updateCameraZoom = useCallback(
    (newZoom) => {
      gsap.to(camera, {
        zoom: newZoom,
        duration: 1,
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    },
    [camera],
  );

  //-------------------------- INITIAL CAMERA ANIMATION & SCENE VIEW SETUP -------------------------//
  //-------------------------- INITIAL CAMERA ANIMATION & SCENE VIEW SETUP -------------------------//
  //-------------------------- INITIAL CAMERA ANIMATION & SCENE VIEW SETUP -------------------------//
  //-------------------------- INITIAL CAMERA ANIMATION & SCENE VIEW SETUP -------------------------//

  // This useEffect function initializes the scene by  animating the camera to  its starting  position
  // and  zoom level. It uses "initialZoom" to set the camera's zoom conditionally based on the user's
  // window size. The  state variable  "notYetInteracted" is then updated to "initialZoom", indicating
  // the initial setup phase before any user interaction. This state is later  used  as a parameter in
  // the "calculateZoom" function  to handle  the scenario  where the user has not interacted with any
  // objects  in  the scene  yet. Conditions  are finally  checked in the  "handleResize" function: if
  // "notYetInteracted"  is  true, and  "lastInteractedObject" is  null, "newZoom"  is  determined  by
  // "calculateZoom(notYetInteracted)", which dynamically adjusts the zoom based on  window size. This
  // value is then used to update the camera's projection matrix through  "updateCameraZoom". With the
  // "resize" event  listener in  place, this  setup ensures  that the  scene's  initial zoom level is
  // responsive and  adapts  dynamically  to window  size changes, enhancing  the app's responsiveness
  // before any user interactions.

  useEffect(() => {
    // Set the initial camera position.
    camera.position.set(50, 40, -50);
    camera.zoom = 3; // Start from a base zoom level
    camera.updateProjectionMatrix();

    // Variable to determine the initial zoom based on window size.
    let initialZoom;

    if (
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      window.innerHeight >= 1024
    ) {
      initialZoom = 10;
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1366 &&
      window.innerHeight >= 1366
    ) {
      initialZoom = 13;
    } else if (window.innerWidth > 0 && window.innerWidth < 640) {
      // Zoom level for window widths bewteen 1px and 639px
      initialZoom = 5;
    } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
      // Zoom level for window widths between 640px and 767px.
      initialZoom = 5;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // Default zoom level for window widths of 768px and above
      initialZoom = 6;
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      // Default zoom level for window widths of 768px and above
      initialZoom = 8;
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      // Default zoom level for window widths of 768px and above
      initialZoom = 10;
    } else if (window.innerWidth >= 1536) {
      // Default zoom level for window widths of 1536px and above
      initialZoom = 12;
    }

    // Animate to the desired position.
    gsap.to(camera.position, {
      x: 50,
      y: 40,
      z: 50,
      duration: 2,
      ease: "power2.out",
    });

    // Animate zoom with the conditional value.
    gsap.to(camera, {
      zoom: initialZoom,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: () => {
        // Update the state variable to match the end state of the animation
        setCameraSettings({
          position: { x: 50, y: 40, z: 50 },
          zoom: initialZoom,
          target: { x: 0, y: 0, z: 0 },
        });
        // Indicate the initial setup is complete, potentially ready for resize handling.
        setNotYetInteracted("initialZoom");
      },
    });
  }, [camera]); // Necessary dependencies.

  //----------------------------------- CALCULATE ZOOM FUNCTION ------------------------------------//
  //----------------------------------- CALCULATE ZOOM FUNCTION ------------------------------------//

  const calculateZoom = (objectType) => {
    if (
      window.innerWidth >= 768 &&
      window.innerWidth < 1024 &&
      window.innerHeight >= 1024
    ) {
      // This block will now cover iPad Mini (and similar devices) in both orientations,
      // as well as provide some tolerance for minor variations in dimensions.
      switch (objectType) {
        case "computerMonitor":
          return 155;
        case "exitComputerMonitor":
          return 10;
        case "arcade":
          return 170;
        case "exitArcade":
          return 10;
        case "laptop":
          return 225;
        case "exitLaptop":
          return 10;
        case "television":
          return 180;
        case "exitTelevision":
          return 10;
        case "pictureFrame":
          return 125;
        case "exitPictureFrame":
          return 10;
        case "easel":
          return 140;
        case "exitEasel":
          return 10;
        case "initialZoom":
          return 10;
        default:
          return 10;
      }
    } else if (
      window.innerWidth >= 1024 &&
      window.innerWidth < 1366 &&
      window.innerHeight >= 1366
    ) {
      // This block will now cover iPad Pro (and similar devices) in both orientations,
      // as well as provide some tolerance for minor variations in dimensions.
      switch (objectType) {
        case "computerMonitor":
          return 201.3;
        case "exitComputerMonitor":
          return 13;
        case "arcade":
          return 221;
        case "exitArcade":
          return 13;
        case "laptop":
          return 292.5;
        case "exitLaptop":
          return 13;
        case "television":
          return 234;
        case "exitTelevision":
          return 13;
        case "pictureFrame":
          return 170;
        case "exitPictureFrame":
          return 13;
        case "easel":
          return 180;
        case "exitEasel":
          return 13;
        case "initialZoom":
          return 13;
        default:
          return 13;
      }
    } else if (window.innerWidth >= 1 && window.innerWidth < 768) {
      switch (objectType) {
        case "computerMonitor":
          return 77.5;
        case "exitComputerMonitor":
          return 5;
        case "arcade":
          return 85;
        case "exitArcade":
          return 5;
        case "laptop":
          return 112.5;
        case "exitLaptop":
          return 5;
        case "television":
          return 90;
        case "exitTelevision":
          return 5;
        case "pictureFrame":
          return 70;
        case "exitPictureFrame":
          return 5;
        case "easel":
          return 90;
        case "exitEasel":
          return 5;
        case "initialZoom":
          return 5;
        default:
          return 5;
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      switch (objectType) {
        case "computerMonitor":
          return 93;
        case "exitComputerMonitor":
          return 6;
        case "arcade":
          return 102;
        case "exitArcade":
          return 6;
        case "laptop":
          return 135;
        case "exitLaptop":
          return 6;
        case "television":
          return 108;
        case "exitTelevision":
          return 6;
        case "pictureFrame":
          return 84;
        case "exitPictureFrame":
          return 6;
        case "easel":
          return 108;
        case "exitEasel":
          return 6;
        case "initialZoom":
          return 6;
        default:
          return 6;
      }
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      switch (objectType) {
        case "computerMonitor":
          return 124;
        case "exitComputerMonitor":
          return 8;
        case "arcade":
          return 136;
        case "exitArcade":
          return 8;
        case "laptop":
          return 180;
        case "exitLaptop":
          return 8;
        case "television":
          return 144;
        case "exitTelevision":
          return 8;
        case "pictureFrame":
          return 112;
        case "exitPictureFrame":
          return 8;
        case "easel":
          return 144;
        case "exitEasel":
          return 8;
        case "initialZoom":
          return 8;
        default:
          return 8;
      }
    } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
      switch (objectType) {
        case "computerMonitor":
          return 155;
        case "exitComputerMonitor":
          return 10;
        case "arcade":
          return 170;
        case "exitArcade":
          return 10;
        case "laptop":
          return 225;
        case "exitLaptop":
          return 10;
        case "television":
          return 180;
        case "exitTelevision":
          return 10;
        case "pictureFrame":
          return 140;
        case "exitPictureFrame":
          return 10;
        case "easel":
          return 180;
        case "exitEasel":
          return 10;
        case "initialZoom":
          return 10;
        default:
          return 10;
      }
    } else if (window.innerWidth >= 1536) {
      switch (objectType) {
        case "computerMonitor":
          return 186;
        case "exitComputerMonitor":
          return 12;
        case "arcade":
          return 204;
        case "exitArcade":
          return 12;
        case "laptop":
          return 270;
        case "exitLaptop":
          return 12;
        case "television":
          return 216;
        case "exitTelevision":
          return 12;
        case "pictureFrame":
          return 168;
        case "exitPictureFrame":
          return 12;
        case "easel":
          return 216;
        case "exitEasel":
          return 12;
        case "initialZoom":
          return 12;
        default:
          return 12;
      }
    }
  };

  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//
  //------------------------------------ HANDLE RESIZE FUNCTION ------------------------------------//

  // This function is used to manage the app's responsiveness based on user interaction. It checks two
  // conditions, 1.  "lastInteractedObject"  or  2.  "notYetInteracted && !lastInteractedObject",  and
  // calculates zoom, "newZoom", accordingly by using the function  "calculateZoom". It  then  updates
  // the camera projection matrix through the function "updateCameraZoom". The event listener "resize"
  // ensures  the app's  zoom  is  adequately  updated  if  the  user decides  to resize the browser's
  // window.

  useEffect(() => {
    const handleResize = () => {
      let newZoom;
      if (lastInteractedObject) {
        newZoom = calculateZoom(lastInteractedObject);
        updateCameraZoom(newZoom); // Update the zoom based on the last interacted object and current window size
      } else if (notYetInteracted && !lastInteractedObject) {
        newZoom = calculateZoom(notYetInteracted);
        updateCameraZoom(newZoom);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lastInteractedObject, notYetInteracted, updateCameraZoom]); // Depend on lastInteractedObject to adjust zoom dynamically

  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//
  //------------------------------ PORTRAIT ROTATE ANIMATION FUNCTIONS ---------------------------//

  const animateRotation = () => {
    gsap.to(pictureFrame.current.rotation, {
      x: -0.1,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(pictureFrame.current.rotation, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        /*  console.log(
          "The picture frame rotated:",
          pictureFrame.current.rotation,
        ); */
      },
    });
  };

  const animateToOriginalRotation = () => {
    gsap.to(pictureFrame.current.rotation, {
      x: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(pictureFrame.current.rotation, {
          x: -0.1,
          duration: 0.4,
          ease: "power2.out",
        });
        /* console.log(
          "The picture frame rotated:",
          pictureFrame.current.rotation,
        ); */
      },
    });
  };

  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//
  //---------------------------------- HANDLE OBJECT CLICK FUNCTION ------------------------------//

  // This function handles object interactivity and camera placement based on an elements objectType
  // its position coordinates, target coordinates and duration time to reach a certain target value.
  // This function will call updateCameraPosition, updateCameraZoom and updateCameraTarget in order
  // to update the camera projection matrix.

  const handleObjectClick = (
    objectType,
    newPosition,
    newTarget,
    toTargetDuration,
  ) => {
    // Update the state with new camera settings
    // Animating the camera position
    // When handling position directly using GSAP (and not using React State) we dont need to
    //pass position as a prop to the OrthographicCamera tag. Either way, we need to set an initial
    // position else the default 'fromTo' will be (0,0,0). To accomplish this, we can use a useEffect
    // function to manage our initial position.
    setLastInteractedObject(objectType);
    const zoom = calculateZoom(objectType); // Calculate zoom dynamically

    switch (objectType) {
      case "computerMonitor":
        // Hide the character blocking the view.
        timeoutRef.current = setTimeout(
          () => setIsCharacterVisible(false),
          100,
        ); // Delay it 100 ms
        setShowForm(true);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function
        break;
      case "exitComputerMonitor":
        // Make the character visible again.
        timeoutRef.current = setTimeout(() => setIsCharacterVisible(true), 100); // Delay it 100 ms
        updateCameraPosition(objectType, newPosition);

        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function.

        break;

      case "pictureFrame":
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function
        timeoutRef.current = setTimeout(() => {
          animateRotation();
        }, 600);
        setIsBabyBunnyClickable(false);
        break;
      case "exitPictureFrame":
        timeoutRef.current = setTimeout(() => {
          updateCameraPosition(objectType, newPosition);
          updateCameraZoom(zoom);
          updateCameraTarget(newTarget, toTargetDuration);
        }, 1500); // Delay them all by 100 ms
        animateToOriginalRotation();
        setIsAbout(false);
        setIsAbout(false);
        break;
      case "television":
        setShowTelevisionScreen(true);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget); // Takes the target argument from our function
        break;
      case "exitTelevision":
        // Animate the zoom property
        updateCameraPosition(objectType, newPosition);
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function.
        setActive(0); // Resets the Television Carousel back to the first slide.
        break;
      case "arcade":
        // Hide the yellow chair blocking the view.
        timeoutRef.current = setTimeout(() => {
          setIsYellowChairVisible(false);
        }, 400); // Delay it 100 ms.
        /*   timeoutRef.current = setTimeout(() => {
          setPlayArcadeMusic(true);
        }, 50); // Delay it 100 ms. */
        setPlayArcadeMusic(true); // Play the arcade song.
        setShowArcadeScreen(true);
        updateCameraPosition(objectType, newPosition);

        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget); // Takes the target argument from our function
        //  console.log("To arcade");

        targetDistance.current = 0.5;
        break;
      case "exitArcade":
        // Make yellow chair visible again.
        timeoutRef.current = setTimeout(
          () => setIsYellowChairVisible(true),
          100,
        );
        setDecreaseArcadeMusicVol(true);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function.
        break;
      case "laptop":
        setShowLaptopIcons(true);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function
        break;
      case "exitLaptop":
        updateCameraPosition(objectType, newPosition);
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration);
        break;
      case "easel":
        setPlayEaselMusic(true);
        setIsTelevisionClickable(false);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function
        targetDistance.current = 0.5;
        break;
      case "exitEasel":
        setDecreaseEaselMusicVol(true);
        updateCameraPosition(objectType, newPosition);
        // Animate the zoom property
        updateCameraZoom(zoom);
        updateCameraTarget(newTarget, toTargetDuration); // Takes the target argument from our function.
        break;
      default:
      // Default logic used for error handling
      /* console.log("Unknown object type"); */
    }
  };

  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//

  return (
    <>
      {/*  GENERAL SETTINGS, SOUNDS AND PROPS JSX */}
      {/*  GENERAL SETTINGS, SOUNDS AND PROPS JSX */}
      {/*  GENERAL SETTINGS, SOUNDS AND PROPS JSX */}
      <OrbitControls
        ref={orbitRef}
        args={[camera, domElement]}
        target={targetRef.current}
        enableRotate={controlsEnabled}
        enableZoom={false}
        enablePan={true}
        maxAzimuthAngle={Math.PI * 1.25} // Adjust these angles as needed.
        maxPolarAngle={Math.PI / 2} // Make sure polar values have a range that way the target can change when it needs to focus on a particular object.
        minAzimuthAngle={-Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
      />
      <ambientLight
        intensity={
          2
        } /* This adds an unrealistic light to the scene on all sides*/
      />
      <directionalLight
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[-10, 50, 10]}
        /*  ref={
          lightRef
        } A light like sunlight We associate the reference with the directional light using the ref attribute 
         Shadow camera properties */
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />
      {/*  <axesHelper
        args={[
          10,
        ]} This creates an axis o help us visualize the coordinates 
      />
      <gridHelper args={[40]} /* This can help us visualize the floor  /> */}
      <PositionalAudio
        position={[0, 0, 0]}
        url="./sound/General_Scene_Song.mp3"
        loop
        distance={generalMusicDistance}
        autoplay
      />
      <Text />
      <VendingMachine />
      <HouseStructure />
      <Props />
      <Furniture visible={isYellowChairVisible} />
      <BookShelf />
      {/*  DIALOGUE RELATED JSX */}
      {/*  DIALOGUE RELATED JSX */}
      {/*  DIALOGUE RELATED JSX */}
      {isDialogue && (
        <Billboard
          follow={true}
          lockX={true}
          lockY={true}
          lockZ={false}
          position={[0, 20, 0]} // Make sure to set x and y as 0.
        >
          <Html>
            <div
              className={`${styles.dialogueBox} ${isOpen ? styles.open : ""}`}
            >
              <button
                className={styles.boxClickButton}
                onClick={handleDialogueBoxClick}
                aria-label="Advance dialogue"
              ></button>
              <p className={styles.nameTagTextSize}>{currentSpeaker}</p>
              <p className={styles.dialogueTextSize}>
                {currentTextRef.current}
              </p>
            </div>
          </Html>
        </Billboard>
      )}
      {/*  MAP RELATED JSX */}
      {/*  MAP RELATED JSX */}
      {/*  MAP RELATED JSX */}
      {isMapOpen && (
        <Billboard follow={true} position={[0, 38, 0]}>
          <Html>
            <div className={styles.mapSize}>
              {/* Display the current frame of the animation */}
              <img src={frames[currentFrameIndex]} alt="Map Animation Frame" />

              {/* Conditionally render the close button */}
              {currentFrameIndex === 23 && (
                <button
                  className={styles.mapCloseButton}
                  onClick={handleCloseMap}
                ></button>
              )}
            </div>
          </Html>
        </Billboard>
      )}
      <Map ref={mapRef} onClick={() => handleMapClick()} />
      {/*  PORTRAIT RELATED JSX */}
      {/*  PORTRAIT RELATED JSX */}
      {/*  PORTRAIT RELATED JSX */}
      <PictureFrame
        ref={
          pictureFrame
        } /* pictureFrame is passed as the 'ref' argument in the PictureFrame.jsx file component and this essentially allows us to manipulate the rotation */
        onClick={() => {
          if (isBabyBunnyClickable) {
            handleObjectClick(
              "pictureFrame",
              [73.53812, 21.996936, 13.59103697],
              [0.05412248, 21.996936, 13.8810369],
              0.1,
            );
          }
        }}
      >
        <button
          className={styles.portraitAboutClickButton}
          onClick={handlePortraitImageClick}
        ></button>
      </PictureFrame>
      <group rotation={[0, Math.PI / 2, 0]} position={portraitPos}>
        <Html // Picture frame HTML
          rotation={[Math.PI, 0, 0]}
          transform={true}
          style={{
            display: showPortraitButton ? "block" : "none",
          }}
          occlude
        >
          <PortraitImage
            handlePortraitImageClick={handlePortraitImageClick}
          ></PortraitImage>
        </Html>
      </group>
      {isAbout && (
        <group rotation={[0, Math.PI / 2, 0]} position={[-19.2, 22, 13.96]}>
          <Html transform={true}>
            <PortraitAboutBox
              handleObjectClick={handleObjectClick}
              openAbout={openAbout}
            ></PortraitAboutBox>
          </Html>
        </group>
      )}
      {/*  COMPUTER RELATED JSX */}
      {/*  COMPUTER RELATED JSX */}
      {/*  COMPUTER RELATED JSX */}
      <ComputerMonitor
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "auto")}
        onClick={() =>
          handleObjectClick(
            "computerMonitor",
            [76.04554, 6.047494, 2.4],
            [1, 6.047494, 3.250129],
            0.1,
          )
        }
      />
      <mesh
        position={[-14.2, 6.05, 3.38]}
        rotation={[0, Math.PI / 2, 0]}
        visible={!showForm}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "auto")}
      >
        <planeGeometry args={[4.29, 2.7]} />
        <meshBasicMaterial map={computerScreen} />
      </mesh>
      <Html // ComputerMonitor HTML
        rotation-y={Math.PI / 2}
        position={formPosition}
        transform={true}
        style={{
          display: showForm ? "block" : "none",
        }}
      >
        <div>
          <ContactForm handleObjectClick={handleObjectClick}></ContactForm>
        </div>
      </Html>
      {/*  ARCADE RELATED JSX */}
      {/*  ARCADE RELATED JSX */}
      {/*  ARCADE RELATED JSX */}
      <Arcade
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          if (isArcadeClickable) {
            handleObjectClick(
              "arcade",
              [74.49, 23.54, -7.629],
              [2.7068, 7.856, -7.6859],
              0.1,
            );
          }
        }}
      />
      <ArcadeScreen
        onClick={() => {
          if (isArcadeClickable) {
            handleObjectClick(
              "arcade",
              [74.49, 23.54, -7.629],
              [2.7068, 7.856, -7.6859],
              0.1,
            );
          }
        }}
      />
      <group rotation={[0, Math.PI / 2, 0]} position={[-16, 4.02, -7.72]}>
        <mesh rotation={[Math.PI / -12, 0, 0]} visible={!showArcadeScreen}>
          <planeGeometry args={[3.53, 1.76]} />
          <meshBasicMaterial
            map={arcadeScreen}
            transparent={true} // Enable transparency
            opacity={1}
          />
        </mesh>
      </group>
      <group rotation={[0, Math.PI / 2, 0]} position={arcadeJoyStickCtrlPos}>
        <Html // Arcade Joystick Control HTML
          rotation={[0, 0, 0]}
          transform={true}
          occlude
        >
          <div>
            <ArcadeJoyStickCtrl
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          </div>
        </Html>
      </group>
      <ArcadeJoystick ref={joystickRef} />
      <ArcadeButtonA ref={buttonARef} onPointerDown={handleButtonAClick} />
      <ArcadeButtonB ref={buttonBRef} onPointerDown={handleButtonBClick} />
      {/*       Wrap Html tags that need to be tilted, in order to be able to work their rotations else the will not be rotated properly
       */}
      <group rotation={[0, Math.PI / 2, 0]} position={arcadeCreditsPos}>
        <Html // Arcade HTML
          rotation={[Math.PI / -12, 0, 0]}
          transform={true}
          style={{
            display: showArcadeScreen ? "block" : "none",
          }}
        >
          <audio // Arcade Music
            id="arcadeMusic"
            src="/sound/Arcade_Music.mp3"
            preload="auto"
          ></audio>
          <audio // Arcade Coin Inserted Folley
            id="arcadeCoinInsert"
            src="/sound/Coin_Insert_SFX.mp3"
            preload="auto"
          ></audio>
          <audio // Arcade Joystick SFX
            id="arcadeSelect"
            src="/sound/Arcade_Select_SFX.mp3"
            preload="auto"
          ></audio>
          <audio // Arcade A Button SFX
            id="arcadeAccept"
            src="/sound/Arcade_Accept_SFX.mp3"
            preload="auto"
          ></audio>
          {/*     Just a side note, as for the present moment it is not possible to pass context to a html drei element. This is due to
           the Drei html component creating a separate ReactDom subtree, which doesn't automatically inherit the context
           from its parent components in the React tree. For now, a good alternative is to just pass props. React portals might
           be another solution, for now we will just leave it at that.
       */}
          <ArcadeCreditsMainView
            selectedOption={selectedOption}
            showDetails={showDetails}
          ></ArcadeCreditsMainView>
        </Html>
      </group>
      {/*  LAPTOP RELATED JSX */}
      {/*  LAPTOP RELATED JSX */}
      {/*  LAPTOP RELATED JSX */}
      <Laptop
        onClick={() => {
          if (isLaptopClickable) {
            handleObjectClick(
              "laptop",
              [8.08, 29.538, 67.741],
              [8.38, 5.36, -8.29],
              0.1,
            );
          }
        }}
      />
      <LaptopButton onPointerDown={handleLaptopButtonClick} />
      <group rotation={[0, 0, 0]} position={laptopPos}>
        <Html
          // Laptop HTML
          rotation={[Math.PI / -9, 0, 0]}
          transform={true}
          style={{
            display: showLaptopIcons ? "block" : "none",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        >
          <LaptopScreen></LaptopScreen>
        </Html>
      </group>
      {/*  TELEVISION RELATED JSX */}
      {/*  TELEVISION RELATED JSX */}
      {/*  TELEVISION RELATED JSX */}
      <Television
        onClick={() => {
          if (isTelevisionClickable) {
            handleObjectClick(
              "television",
              [-9.14408, 18.225559, -73.38058],
              [-8.278084, 18.225559, 0.0972417],
            );
          }
        }}
      />
      <TelevisionScreenMesh showTelevisionScreen={showTelevisionScreen} />
      <group rotation={[0, Math.PI, 0]} position={televisionPos}>
        <Html // Television HTML
          rotation={[0, 0, 0]}
          transform={true}
          style={{
            display: showTelevisionScreen ? "block" : "none",
          }}
          occlude
        >
          <div>
            <TelevisionScreen
              setActive={setActive}
              active={active}
              handleObjectClick={handleObjectClick}
            ></TelevisionScreen>
          </div>
        </Html>
      </group>
      {/*  EASEL RELATED JSX */}
      {/*  EASEL RELATED JSX */}
      {/*  EASEL RELATED JSX */}
      <Easel
        onClick={() => {
          if (isTelevisionClickable) {
            handleObjectClick(
              "easel",
              [-73.472577, 32.130096, -4.2486508],
              [-2.067577, 14.789096587, -4.2486508],
              0.1,
            );
          }
        }}
      />
      <group rotation={[0, Math.PI / -2, 0]} position={easelPos}>
        <Html // Easel HTML
          rotation={[Math.PI / -19, 0, 0]}
          transform={true}
          style={{
            display: showEaselButtons ? "block" : "none",
          }}
          occlude
        >
          <audio // Easel Music
            id="easelMusic"
            src="/sound/Baby_Bunny_Song.mp3"
            preload="auto"
          ></audio>
          <EaselScreen handleObjectClick={handleObjectClick}></EaselScreen>
        </Html>
      </group>
      {/*  CHARACTERS JSX */}
      {/*  CHARACTERS JSX */}
      {/*  CHARACTERS JSX */}
      <group position={[-26, 16.1, 3.3]} rotation={[0, -Math.PI / 2, 0]}>
        <BabyBunnyAnimation
          onClick={() => handleClickedCharacterDialogues("BabyBunny")}
        />
      </group>
      <group position={[15, 0.8, 6]} rotation={[0, Math.PI / 4, 0]}>
        <BabyFoxitoAnimation
          visible={isCharacterVisible}
          onClick={() => handleClickedCharacterDialogues("BabyFoxito")}
        />
        <BabyFoxitoTailAnimation
          visible={isCharacterVisible}
          onClick={() => handleClickedCharacterDialogues("BabyFoxito")}
        />
      </group>
    </>
  );
}

export default ThreeScene;
