import React, { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";
import * as TWEEN from "@tweenjs/tween.js";
import styles from "../GameCanvas/GameCanvas.module.css";

// Loader
import LoaderPartOne from "../components/LoaderPartOne/LoaderPartOne.component";

// General Game Assets
import bgSheet from "../assets/imgs/bgs/bg.jpg";
import bridgeSheet from "../assets/imgs/props/bridge.png";
import crateSheet from "../assets/imgs/props/crate.png";
import foxitoSpriteSheet from "../assets/imgs/character_sprites/baby_foxito.png";
import textBoxSheet from "../assets/imgs/dialogue/textBox.png";
import roundTreeBottomSheet from "../assets/imgs/props/round_tree_bottom.png";
import roundTreeTopSheet from "../assets/imgs/props/round_tree_top.png";

// Island One Imports
import computerSheet from "../assets/imgs/props/computer.png";
import islandOneSheet from "../assets/imgs/islands/island_1.png";
import islandOneBushesSheet from "../assets/imgs/props/bushes_island_1.png";
import islandOneBushSheet from "../assets/imgs/props/bush.png";
import islandOneBushTopSheet from "../assets/imgs/props/bush_island_one_top.png";
import islandOneBushesTopSheet from "../assets/imgs/props/bushes_island_one_top.png";
import islandOneBushesBottomSheet from "../assets/imgs/props/bushes_island_one_bottom.png";
import crateDownSheet from "../assets/imgs/props/crate_down.png";

// Island Two Imports
import islandTwoSheet from "../assets/imgs/islands/island_2.png";
import islandTwoThinTreesTopSheet from "../assets/imgs/props/thin_trees_top.png";
import islandTwoThinTreesBottomSheet from "../assets/imgs/props/thin_trees_bottom.png";
import bigTreeTopSheet from "../assets/imgs/props/big_tree_top.png";
import bigTreeBottomSheet from "../assets/imgs/props/big_tree_bottom.png";
import crateRightSheet from "../assets/imgs/props/crate_right.png";
import chestSheet from "../assets/imgs/props/chest.png";
import bigTreeTopSpriteSheet from "../assets/imgs/props/big_tree_animation_top.png";
import bigTreeBottomSpriteSheet from "../assets/imgs/props/big_tree_animation_bottom.png";
import keySheet from "../assets/imgs/props/key.png";
import chestBottomSheet from "../assets/imgs/props/chest_bottom.png";
import tokenKeySheet from "../assets/imgs/props/token_key.png";
import chestTopSpriteSheet from "../assets/imgs/props/chest_top_animation.png";

// Island Three Imports
import islandThreeSheet from "../assets/imgs/islands/island_3.png";
import islandThreeThinTreeTopSheet from "../assets/imgs/props/thin_tree_top.png";
import islandThreeThinTreeBottomSheet from "../assets/imgs/props/thin_tree_bottom.png";
import islandThreeBushesBottomTopSheet from "../assets/imgs/props/island_three_bushes_top.png";
import islandThreeBushesBottomBottomSheet from "../assets/imgs/props/island_three_bushes_bottom.png";
import islandThreeBushesTopSheet from "../assets/imgs/props/island_three_bushes.png";
import portalSheet from "../assets/imgs/props/portal.png";
import portalSpriteSheet from "../assets/imgs/props/portal_animation.png";

// Island Four Imports
import islandFourSheet from "../assets/imgs/islands/island_4.png";
import whalecitoSheet from "../assets/imgs/props/whalecito.png";
import whalecitoSpriteSheet from "../assets/imgs/props/whalecito_animation.png";

const GameCanvas = () => {
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//
  //-------------------------------------- I VARIABLES -------------------------------------------//

  // Loading state for Loading Screen
  const [isLoading, setIsLoading] = useState(true);

  // Screen controls variables
  const lastDirectionRef = useRef(null);
  let movementInterval;

  // Background music variables
  const bgMusic = new Audio(
    `${import.meta.env.VITE_APP_BASE_URL}sound/bg_music.mp3`,
  ); // Create a new 'Audio' html element.
  bgMusic.loop = true; // Loop the mp3.
  const itemPickupSound = new Audio(
    `${import.meta.env.VITE_APP_BASE_URL}sound/item_sfx.mp3`,
  ); // Create a new 'Audio' element for item pick ups.
  const keyPickupSound = new Audio(
    `${import.meta.env.VITE_APP_BASE_URL}sound/Key_Pick_SFX.mp3`,
  ); // Create a new 'Audio' element for ground key pick ups.
  const achievementSound = new Audio(
    `${import.meta.env.VITE_APP_BASE_URL}sound/success_sfx.mp3`,
  ); // Create a new 'Audio' element for an achievement.

  // Initial game state variable
  const isInitialState = useRef(true); // Assuming you want to start in the initial state.

  // Dialogue box variables
  const isDialogueState = useRef(false);
  // Disabling movement controllers for dialogues and scene animations
  const controlsDisabledRef = useRef(false);
  // Dialogue states used to manage the currently displayed dialogue and how much of it has been rendered
  const currentDialogueIndex = useRef(0);
  const currentTextIndex = useRef(0);
  // State management for the texbox animation
  let textBoxScale = 0; // Start collapsed
  const animationSpeed = 0.1;
  const isAnimatingTextBox = useRef(false); // To start/stop animation
  // State management for textbox text animation
  const isAnimatingText = useRef(false);
  let textAnimationSpeed = 20; // 50ms per character
  let lastTextUpdateTime = 0;

  // loop counter - this will keep track of the number of times the updateGameState function has run.
  const loopCounterRef = useRef(0);

  // Canvas ref
  const canvasRef = useRef(null); // useRef references a DOM node. With this, you can change values avoiding re-renders. '.current' property is mutable.
  // In this particular case, the 'null' is the current value

  // Initial position ref
  const positionRef = useRef({ x: 0, y: 0 }); // Setting up the initial position for the box

  // Matter js utilities destructuring
  const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
  const engineRef = useRef(null);

  // Matter ref
  const matterContainerRef = useRef(null); // Similarly as above, we need to reference a container for the canvas used by Matter.js, this is done to use it for debugging purposes

  // Baby Foxito variables
  const characterRef = useRef(null);
  const animationSpeedRef = useRef(0); // Determining Animation Frames Speed
  const speed = 0.4; // Define the speed of character movement
  // Calculating the width and height of each individual sprite for Baby Foxito
  const spriteWidth = 32; // Width of individual sprite for Character
  const spriteHeight = 32; // Height of individual sprite
  const scale = 1; // Defining a scale either to reduce or increase sprite size. In this case it will be reduced by half
  const currentFrameRef = useRef(0); // This tracks the current frame we are on

  // Item refs to be used with Matter JS
  const crateDownRef = useRef(null); // Storing a reference to the crate's Matter.js body
  const crateRightRef = useRef(null);
  const computerRef = useRef(null);
  const chestRef = useRef(null);
  const blockedPassageRef = useRef(null);

  // Tree variables
  const treeSpriteWidth = 40; // Calculating the width and height of each individual sprite for the big tree
  const treeSpriteHeight = 42;
  const treeSpriteScale = 1;
  const treeIsAnimatingRef = useRef(false); // Initiate the animation as not playing. When true, then it will play.
  const treeTotalFrames = 13; // Total number of frames in the sprite sheet
  const treeCurrentFrameRef = useRef(0); // This tracks the current frame we are on
  const treeAnimationSpeedRef = useRef(5); // Dtermining Animation Speed

  // Variables for Key projetile motion
  const keyIsThrownRef = useRef(false); // Key boolean flag, when true, initiate throw
  const keyPosXRef = useRef(195); // Key initial position x
  const keyPosYRef = useRef(170); // Key initial position y
  const keyVelocityXRef = useRef(-1); // Key initial velocity x direction
  const keyVelocityYRef = useRef(-2); // Key initial velocity y direction
  const gravity = 0.05; // Gravity constant
  const ground = 180; // This is a position in Y we will use as a ground/stop point for the key

  // Variables for Key pickup
  const keyWidth = 11;
  const keyHeight = 6;
  const keyIsCollectedRef = useRef(false);
  const playKeyCollectedSFXRef = useRef(true);

  // Variables for Treasure Chest animation
  // Calculating the width and height of each individual sprite for the big tree
  const chestSpriteWidth = 16;
  const chestSpriteHeight = 22;
  const chestSpriteScale = 1;
  const chestIsAnimatingRef = useRef(false); // Initiate the animation as not playing. When true, then it will play.
  const chestTotalFrames = 5; // Total number of frames in the sprite sheet
  const chestCurrentFrameRef = useRef(0); // This tracks the current frame we are on
  const chestAnimationSpeedRef = useRef(2); // Determining Animation Speed

  // Variables for Token Key pickup
  const tokenKeyIsCollectedRef = useRef(false); // Boolean flag

  // Inventory state manager
  const inventoryRef = useRef({
    hasKey: false,
    hasToken: false,
    hasAccess: false,
  });

  // Whalecito variables
  const whalecitoPosRef = useRef({ x: 328, y: 181, angle: 0 });
  const whalecitoCurrentFrameRef = useRef(0);
  const whalecitoSpriteWidth = 42;
  const whalecitoSpriteHeight = 47;
  const whalecitoScale = 1;
  const whalecitoDialogueTriggered = useRef(false);
  const whalecitoTotalFrames = 6;
  const whalecitoAnimationSpeedRef = useRef(10);

  // Portal state management and variables
  const portalIsAnimatingRef = useRef(false);
  const portalTotalFrames = 4; // Total number of frames in the sprite sheet
  const portalCurrentFrameRef = useRef(0); // This tracks the current frame we are on
  const portalAnimationSpeedRef = useRef(5); // Determining Animation Speed
  const portalSpriteWidth = 32;
  const portalSpriteHeight = 32;
  const portalSpriteScale = 1;

  // Variables for Portal entering
  const portalPosXRef = useRef(323);
  const portalPosYRef = useRef(64);

  // Dialogues variables
  // Define dialogue content by setting up arrays of objects
  const dialogues = [
    {
      speaker: "Baby Foxito",
      text: "Hi...Hello?...Hmmm...Press the ENTER key or click the A button.",
    },
    {
      speaker: "Baby Foxito",
      text: "There you go! You can press/click one or the other to communicate with me.",
    },
    {
      speaker: "Baby Foxito",
      text: "Oh yeah, sorry I haven't introduced myself yet, my name is Baby Foxito...",
    },
    {
      speaker: "Baby Foxito",
      text: "I am the guardian and master of FoxitoDev's web. Pleased to meet you...",
    },
    {
      speaker: "Baby Foxito",
      text: "What is that? You are telling me you were just on your way over there.",
    },
    {
      speaker: "Baby Foxito",
      text: "And you got sucked into this 2D pixel world while navigating the paracosm.",
    },
    {
      speaker: "Baby Foxito",
      text: "Well that makes two of us. We need to find a way back to the main 3D HQ then.",
    },
    {
      speaker: "Baby Foxito",
      text: "I see there's a portal on one of the islands. We have to activate it somehow.",
    },
    {
      speaker: "Baby Foxito",
      text: "Oh look! There's a supercomputer on this island. I think it could be useful.",
    },
    {
      speaker: "Baby Foxito",
      text: "I should be able to hack it and use it to communicate with my friend Baby Bunny.",
    },
    {
      speaker: "Baby Foxito",
      text: "I am sure she can help us out...Literally. Let's get moving!",
    },
    {
      speaker: "Baby Foxito",
      text: "Press the DIRECTIONAL keys or click on the onscreen PAD to move and...",
    },
    {
      speaker: "Baby Foxito",
      text: "Press the ENTER key or click the A button to interact with the supercomputer.",
    },
  ];
  // Initial computer dialoques
  const computerDialogues = [
    { speaker: "Baby Foxito", text: "... click click clack clack..." },
    {
      speaker: "Supercomputer",
      text: "... beep beep bop bop ... Access granted.",
    },
    {
      speaker: "Supercomputer",
      text: "Opening all paracosmic metaverse communication channels.",
    },
    {
      speaker: "Baby Bunny",
      text: "Buzzzzzz...Oh hey, I was wondering where you'd gone!",
    },
    {
      speaker: "Baby Foxito",
      text: "Well, hello there to you as well, chuckles chuckles.",
    },
    {
      speaker: "Baby Foxito",
      text: "I'm stuck inside some random strange 2D pixel world. My tail didn't even load!",
    },
    {
      speaker: "Baby Foxito",
      text: "I need energy to run a portal and make it out of this place.",
    },
    {
      speaker: "Baby Bunny",
      text: "You are in luck. All 2D pixel worlds are equipped with emergency token keys.",
    },
    {
      speaker: "Baby Bunny",
      text: "These keys, often found in digital chests, have the energy you need.",
    },
    {
      speaker: "Baby Bunny",
      text: "Find one and come back to this terminal so I can help you activate it.",
    },
    {
      speaker: "Baby Bunny",
      text: "BTW...You may pick up ground items by passing through them and...",
    },
    {
      speaker: "Baby Bunny",
      text: "Open chests and pick up token keys by pressing ENTER or clicking the A button.",
    },
    {
      speaker: "Baby Bunny",
      text: "Ok then, good luck! See you in a bit.",
    },
  ];
  // Initial treasure chest dialoques
  const chestDialogues = [
    {
      speaker: "Baby Foxito",
      text: "It's locked! Looks like we need another key to open it.",
    },
  ];
  // Computer with token dialogues
  const computerWithTokenDialogues = [
    { speaker: "Baby Foxito", text: "... click click clack clack..." },
    {
      speaker: "Supercomputer",
      text: "... beep beep bop bop ... Access granted.",
    },
    {
      speaker: "Supercomputer",
      text: "Opening all paracosmic metaverse communication channels.",
    },
    {
      speaker: "Baby Bunny",
      text: "Buzzzzz...Ah, about time, I see you finally got a hold of the token key.",
    },
    { speaker: "Baby Foxito", text: "Of course! Now do your magic." },
    {
      speaker: "Baby Bunny",
      text: "K, just a sec ... click click bop bop ...",
    },
    {
      speaker: "Baby Bunny",
      text: "All set, get to da choppah, I mean portal.",
    },
    { speaker: "Baby Foxito", text: "Chuckles...See you soon." },
  ];
  // Whalecito dialogue
  const whalecitoDialogue = [
    { speaker: "Whalecito", text: "Whieeeeeeaooooooooooooooooo!!!!" },
  ];
  // Managing dialogues arrays, this order matters. This variable needs to be below the dialogues
  const currentDialoguesRef = useRef(dialogues);

  // Animation State Management for Baby Foxito
  const animationStateRef = useRef({
    current: "idleDown", // We initialize with the 'idle' state
    frame: 0, // This is the frame of the animation we are on
    row: 0, // This is the row to which the sprite sheet corresponds to the current animation, as is the case right now of 'idle'
  });

  // Animation COnfiguration for Baby Foxito
  const animationConfig = {
    // We create an object literal with the different states and their individual/particular values for speed, frames and row number
    idleLeft: { speed: 1, frames: 1, row: 4 },
    idleRight: { speed: 1, frames: 1, row: 6 },
    idleTop: { speed: 1, frames: 1, row: 2 },
    idleDown: { speed: 1, frames: 1, row: 0 },
    walkingLeft: { speed: 15, frames: 8, row: 5 },
    walkingRight: { speed: 15, frames: 8, row: 7 },
    walkingDown: { speed: 15, frames: 8, row: 1 },
    walkingUp: { speed: 15, frames: 8, row: 3 },
  };

  // Loading images/sprite sheets using the "image" constructor
  // BG
  const bg = new Image();
  bg.src = bgSheet;
  // ISLAND ONE
  const islandOne = new Image(); // An image object is created to load the sprite sheet
  islandOne.src = islandOneSheet; // Images have the src property
  // ISLAND TWO
  const islandTwo = new Image();
  islandTwo.src = islandTwoSheet;
  // ISLAND THREE
  const islandThree = new Image();
  islandThree.src = islandThreeSheet;
  // ISLAND FOUR
  const islandFour = new Image();
  islandFour.src = islandFourSheet;
  // ROUND TREE ONE
  const treeRoundOneBottom = new Image();
  treeRoundOneBottom.src = roundTreeBottomSheet;
  const treeRoundOneTop = new Image();
  treeRoundOneTop.src = roundTreeTopSheet;
  // BRIDGE
  const bridge = new Image();
  bridge.src = bridgeSheet;
  // CRATE GENERAL
  const crate = new Image();
  crate.src = crateSheet;
  // CRATE DOWN
  const crateDown = new Image();
  crateDown.src = crateDownSheet;
  // CRATE RIGHT
  const crateRight = new Image();
  crateRight.src = crateRightSheet;
  // COMPUTER
  const computer = new Image();
  computer.src = computerSheet;
  // CHEST
  const chest = new Image();
  chest.src = chestSheet;
  // BIG TREE BOTTOM
  const bigTreeBottomAnimationSprite = new Image();
  bigTreeBottomAnimationSprite.src = bigTreeBottomSpriteSheet;
  // PORTAL ANIMATION
  const portalAnimationSprite = new Image();
  portalAnimationSprite.src = portalSpriteSheet;
  // BABY FOXITO
  const foxitoSprite = new Image();
  foxitoSprite.src = foxitoSpriteSheet; // Images have the src property
  // BIG TREE TOP
  const bigTreeTopAnimationSprite = new Image();
  bigTreeTopAnimationSprite.src = bigTreeTopSpriteSheet;
  // TEXT BOX
  const textBox = new Image();
  textBox.src = textBoxSheet;
  // KEY
  const key = new Image();
  key.src = keySheet;
  // CHEST BOTTOM
  const chestBottom = new Image();
  chestBottom.src = chestBottomSheet;
  // TOKEN KEY
  const tokenKey = new Image();
  tokenKey.src = tokenKeySheet;
  // CHEST TOP
  const chestTopAnimationSprite = new Image();
  chestTopAnimationSprite.src = chestTopSpriteSheet;
  // WHALECITO
  const whalecito = new Image();
  whalecito.src = whalecitoSheet;
  // WHALECITO ANIMATION
  const whalecioAnimationSprite = new Image();
  whalecioAnimationSprite.src = whalecitoSpriteSheet;
  // ISLAND ONE BUSHES
  const islandOneBushes = new Image();
  islandOneBushes.src = islandOneBushesSheet;
  // ISLAND ONE BUSHES
  const islandOneBush = new Image();
  islandOneBush.src = islandOneBushSheet;
  const islandOneBushTop = new Image();
  islandOneBushTop.src = islandOneBushTopSheet;
  const islandOneBushesTop = new Image();
  islandOneBushesTop.src = islandOneBushesTopSheet;
  const islandOneBushesBottom = new Image();
  islandOneBushesBottom.src = islandOneBushesBottomSheet;
  // ISLAND TWO THIN TREES
  const islandTwoThinTreesTop = new Image();
  islandTwoThinTreesTop.src = islandTwoThinTreesTopSheet;
  const islandTwoThinTreesBottom = new Image();
  islandTwoThinTreesBottom.src = islandTwoThinTreesBottomSheet;
  // ISLAND THREE THIN TREES
  const islandThreeThinTreeTop = new Image();
  islandThreeThinTreeTop.src = islandThreeThinTreeTopSheet;
  const islandThreeThinTreeBottom = new Image();
  islandThreeThinTreeBottom.src = islandThreeThinTreeBottomSheet;
  // ISLAND THREE BUSHES
  const islandThreeBushesTop = new Image();
  islandThreeBushesTop.src = islandThreeBushesTopSheet;
  const islandThreeBushesBottomTop = new Image();
  islandThreeBushesBottomTop.src = islandThreeBushesBottomTopSheet;
  const islandThreeBushesBottomBottom = new Image();
  islandThreeBushesBottomBottom.src = islandThreeBushesBottomBottomSheet;
  // BIG TREE
  const bigTreeTop = new Image();
  bigTreeTop.src = bigTreeTopSheet;
  const bigTreeBottom = new Image();
  bigTreeBottom.src = bigTreeBottomSheet;
  // PORTAL STATIC
  const portal = new Image();
  portal.src = portalSheet;

  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE--------------------------------------//
  //----------------------------------- II LOGIC STARTS HERE -------------------------------------//

  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//
  //------------------------ UPDATE GAME MANAGEMENT STATE FUNCTION ------------------------------//

  // This is a contantly running function.

  function updateGameState() {
    loopCounterRef.current++;
    //console.log(loopCounterRef.current);

    // Define world variable here to use it in this scope
    let world = engineRef.current.world; // Ask chatGPT if its ok to have the same name as the one in the useEffect
    // Using/defining the animationConfig for our current state
    const currentStateConfig =
      animationConfig[animationStateRef.current.current]; // Initially this will be the useRef current value of 'idle'
    // So this could be resumed to be like: animationConfig['idle'] ----> hence currentStateConfig.speed is pretty much idle.speed
    // This logic should reside within the updateGameState function because it deals with updating game states (in this case, the animation state).
    // check proximity between the character and the passage to the portal island
    const distanceToPassage = Matter.Vector.magnitude(
      Matter.Vector.sub(
        characterRef.current.position,
        blockedPassageRef.current.position,
      ),
    );
    const interactionDistancePassage = 50;
    //1. Updating the physics engine
    Engine.update(engineRef.current);

    if (!controlsDisabledRef.current) {
      // Making sure the animation is also disabled when the controllers are disabled
      // CHARACTER ANIMATION LOGIC
      animationSpeedRef.current++;
      if (animationSpeedRef.current > currentStateConfig.speed) {
        // currentStateConfig.speed refers to the animation threshold
        currentFrameRef.current++; // Move to the next frame
        animationSpeedRef.current = 0; // Reset the animation speed counter
      }
      // Check if we've reached the end of the animation
      if (currentFrameRef.current >= currentStateConfig.frames) {
        // This is the total number of frames in the particular animation we are using for this exercise
        currentFrameRef.current = 0; // Loop back to the start
      }
    }
    // Adjust position based on movement and speed
    if (characterRef.current) {
      positionRef.current.x = characterRef.current.position.x;
      positionRef.current.y = characterRef.current.position.y;
    }
    // BIG TREE ANIMATION LOGIC //
    // BIG TREE ANIMATION LOGIC //
    // BIG TREE ANIMATION LOGIC //
    if (treeIsAnimatingRef.current) {
      if (loopCounterRef.current % treeAnimationSpeedRef.current === 0) {
        if (treeCurrentFrameRef.current < treeTotalFrames - 1) {
          treeCurrentFrameRef.current++;
        } else {
          // Once we reach the last frame, stop animating
          treeIsAnimatingRef.current = false;
          keyIsThrownRef.current = true;
        }
      }
    }
    // KEY THROW ANIMATION LOGIC //
    // KEY THROW ANIMATION LOGIC //
    // KEY THROW ANIMATION LOGIC //
    if (keyIsThrownRef.current) {
      keyPosXRef.current += keyVelocityXRef.current; // Horizontal motion
      keyPosYRef.current += keyVelocityYRef.current; // Vertical motion
      keyVelocityYRef.current += gravity; // Gravity starts increasing the downward speed
      // Stop the motion when the key hits the 'ground' which in this particular case could a position in Y
      if (keyPosYRef.current >= ground) {
        keyIsThrownRef.current = false; // Stop the throw
        keyPosYRef.current = ground; // Don't make it go past the 'ground'
      }
    }
    // KEY PICKUP LOGIC //
    // KEY PICKUP LOGIC //
    // KEY PICKUP LOGIC //
    if (keyPosYRef.current === ground) {
      if (
        areRectsColliding(
          {
            x: keyPosXRef.current,
            y: keyPosYRef.current,
            width: keyWidth,
            height: keyHeight,
          },
          {
            x: characterRef.current.position.x,
            y: characterRef.current.position.y,
            width: spriteWidth, // FIX THIS
            height: spriteHeight,
          },
        ) &&
        playKeyCollectedSFXRef.current
      ) {
        // Baby Foxito collects the key
        inventoryRef.current.hasKey = true;
        handleKeyPickup();
        setTimeout(() => {
          playKeyCollectedSFXRef.current = false;
        }, 500); // Assuming it takes 1 second for the animation to stop.
        keyIsCollectedRef.current = true;
        //console.log("the key is collected");
        //console.log(inventoryRef.current.hasKey);
      }
    }
    // TREASURE CHEST OPENING ANIMATION LOGIC //
    // TREASURE CHEST OPENING ANIMATION LOGIC //
    // TREASURE CHEST OPENING ANIMATION LOGIC //
    if (chestIsAnimatingRef.current) {
      if (loopCounterRef.current % chestAnimationSpeedRef.current === 0) {
        if (chestCurrentFrameRef.current < chestTotalFrames - 1) {
          chestCurrentFrameRef.current++;
        } else {
          // Once we reach the last frame, stop animating
          chestIsAnimatingRef.current = false;
          //keyIsThrownRef.current = true;
        }
      }
    }
    // TOKEN COLLECTION LOGIC //
    // TOKEN COLLECTION LOGIC //
    // TOKEN COLLECTION LOGIC //
    if (inventoryRef.current.hasToken === true) {
      tokenKeyIsCollectedRef.current = true;
      //console.log("the token was collected");
    }
    // PORTAL ANIMATION LOGIC //
    // PORTAL ANIMATION LOGIC //
    // PORTAL ANIMATION LOGIC //
    if (currentDialoguesRef.current === computerWithTokenDialogues) {
      /*  console.log(
        "Checking if dialogue is at the correct stage for animation:",
        currentDialogueIndex.current,
      ); */
      if (currentDialogueIndex.current === 6) {
        portalIsAnimatingRef.current = true;
        /*   console.log("Portal animation should now be playing."); */
      }
    }
    if (portalIsAnimatingRef.current) {
      if (loopCounterRef.current % portalAnimationSpeedRef.current === 0) {
        // Increment the frame
        portalCurrentFrameRef.current++;

        // If we've reached the end of the animation, loop back to the start
        if (portalCurrentFrameRef.current >= portalTotalFrames) {
          portalCurrentFrameRef.current = 0; // reset to first frame to loop
        }
      }
    }
    // WHALECITO DIALOGUE ACTIVATION LOGIC //
    // WHALECITO DIALOGUE ACTIVATION LOGIC //
    // WHALECITO DIALOGUE ACTIVATION LOGIC //
    if (
      distanceToPassage < interactionDistancePassage &&
      inventoryRef.current.hasAccess === true
    ) {
      initiateWhalecitoDialogue();

      World.remove(world, blockedPassageRef.current);
    }
    // WHALECITO ANIMATION LOGIC //
    // WHALECITO ANIMATION LOGIC //
    // WHALECITO ANIMATION LOGIC //
    if (whalecitoDialogueTriggered.current) {
      if (loopCounterRef.current % whalecitoAnimationSpeedRef.current === 0) {
        // Increment the frame
        whalecitoCurrentFrameRef.current++;

        // If we've reached the end of the animation, loop back to the start
        if (whalecitoCurrentFrameRef.current >= whalecitoTotalFrames) {
          whalecitoCurrentFrameRef.current = 0; // reset to first frame to loop
        }
      }
    }
    // PORTAL CONTACT / FINAL LOGIC //
    // PORTAL CONTACT / FINAL LOGIC //
    // PORTAL CONTACT / FINAL LOGIC //
    if (
      areRectsColliding(
        {
          x: portalPosXRef.current,
          y: portalPosYRef.current,
          width: 10,
          height: 10,
        },
        {
          x: characterRef.current.position.x,
          y: characterRef.current.position.y,
          width: spriteWidth,
          height: spriteHeight,
        },
      )
    ) {
      // Stop game background music
      stopBackgroundMusic();

      // Navigate to Three.js component
      window.location.href = "/headquarters";
    }
  }

  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//
  //-------------------------------- RENDER GAME STATE FUNCTION ---------------------------------//

  function renderGameState() {
    const canvas = canvasRef.current; // Storing current value in a variable
    if (!canvas) return; // Exit if the canvas is not available
    const ctx = canvas.getContext("2d", {
      alpha: false,
      imageSmoothingEnabled: false,
    }); // getContext is a method that returns an object with tools (methods) for drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    // Draw initial game state
    const scaleFactor = window.innerWidth >= 1024 ? 2 : 0.9;
    drawInitialState(ctx, scaleFactor);
    if (isDialogueState.current) {
      drawDialogueState(ctx);
    }
    // Handle any additional game states
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations after drawing the sprite
  }

  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//
  //---------------------------- DRAW INITIAL GAME STATE FUNCTIONS ------------------------------//

  // This function takes x and y coordinates and length and height of items to draw them on the canvas.
  // Drawing order matters. Drawings drawn first are laid on the background, kind of like z-index

  function drawInitialState(ctx) {
    // BG
    ctx.drawImage(bg, 0, 0, 400, 225);
    // ISLAND ONE
    ctx.drawImage(islandOne, 8, 17, 224, 112);
    // ISLAND TWO
    ctx.drawImage(islandTwo, 8, 145, 224, 64);
    // ISLAND THREE
    ctx.drawImage(islandThree, 264, 17, 128, 112);
    // ISLAND FOUR
    ctx.drawImage(islandFour, 288, 145, 80, 64);
    // ROUND TREE ONE BOTTOM
    ctx.drawImage(treeRoundOneBottom, 61, 3, 22, 28);
    // ROUND TREE TWO BOTTOM
    ctx.drawImage(treeRoundOneBottom, 105, 3, 22, 28);
    // ROUND TREE THREE BOTTOM
    ctx.drawImage(treeRoundOneBottom, 146, 3, 22, 28);
    // BRIDGE
    ctx.drawImage(bridge, 151, 129, 32, 16);
    // CRATE GENERAL 1
    ctx.drawImage(crate, 167, 113, 16, 16);
    // CRATE GENERAL 2
    ctx.drawImage(crate, 151, 161, 16, 16);
    // CRATE DOWN
    ctx.drawImage(
      crateDown,
      crateDownRef.current.position.x - 16 / 2, // We use the crateDownRef from its body rectangle to update its movement
      crateDownRef.current.position.y - 16 / 2, // We use the crateDownRef from its body rectangle to update its movement
      16,
      16,
    );
    // CRATE RIGHT
    ctx.drawImage(
      crateRight,
      crateRightRef.current.position.x - 16 / 2,
      crateRightRef.current.position.y - 16 / 2,
      16,
      16,
    );
    // ISLAND ONE BUSH BOTTOM
    ctx.drawImage(islandOneBush, 54, 44, 16, 15);
    // ISLAND ONE BUSHES LEFT BOTTOM
    ctx.drawImage(islandOneBushesBottom, 38, 54, 16, 25);
    // ISLAND ONE BUSHES RIGHT BOTTOM
    ctx.drawImage(islandOneBushesBottom, 70, 54, 16, 25);
    // COMPUTER
    ctx.drawImage(computer, 56, 55, 12, 16);
    // CHEST
    ctx.drawImage(chest, 8, 159, 16, 12);
    // BIG TREE BOTTOM STATIC
    ctx.drawImage(bigTreeBottom, 213, 161, 16, 21);
    // BIG TREE BOTTOM ANIMATION SPRITE
    ctx.drawImage(
      bigTreeBottomAnimationSprite,
      treeCurrentFrameRef.current * treeSpriteWidth,
      0, // Row 0, since we only have one row
      treeSpriteWidth,
      treeSpriteHeight,
      183,
      159,
      treeSpriteWidth * treeSpriteScale,
      treeSpriteHeight * treeSpriteScale,
    );
    // KEY
    if (!keyIsCollectedRef.current) {
      ctx.drawImage(key, keyPosXRef.current, keyPosYRef.current, 11, 6);
    }
    // CHEST BOTTOM
    ctx.drawImage(chestBottom, 8, 149, 16, 22);
    // TOKEN KEY
    if (!tokenKeyIsCollectedRef.current) {
      ctx.drawImage(tokenKey, 8, 149, 16, 22);
    }
    // CHEST TOP ANIMATION SPRITE
    ctx.drawImage(
      chestTopAnimationSprite,
      chestCurrentFrameRef.current * chestSpriteWidth,
      0, // Row 0, since we only have one row
      chestSpriteWidth,
      chestSpriteHeight,
      8,
      149,
      chestSpriteWidth * chestSpriteScale,
      chestSpriteHeight * chestSpriteScale,
    );
    // PORTAL
    ctx.drawImage(portal, 285, 48, 65, 49);
    // PORTAL ANIMATION SPRITE
    if (portalIsAnimatingRef.current) {
      ctx.drawImage(
        portalAnimationSprite,
        portalCurrentFrameRef.current * portalSpriteWidth,
        0,
        portalSpriteWidth,
        portalSpriteHeight,
        312,
        53,
        portalSpriteWidth * portalSpriteScale,
        portalSpriteHeight * portalSpriteScale,
      );
    }
    // WHALECITO SLEEPING STATIC IMAGE
    if (!whalecitoDialogueTriggered.current) {
      ctx.drawImage(whalecito, 307, 150, 42, 47);
    }
    // WHALECITO ANIMATION
    if (whalecitoDialogueTriggered.current) {
      ctx.save();
      ctx.translate(whalecitoPosRef.current.x, whalecitoPosRef.current.y);
      ctx.rotate(whalecitoPosRef.current.angle); // Rotate by the angle stored in whalecitoPosRef
      ctx.drawImage(
        whalecioAnimationSprite,
        whalecitoCurrentFrameRef.current * whalecitoSpriteWidth,
        0,
        whalecitoSpriteWidth,
        whalecitoSpriteHeight,
        (-whalecitoSpriteWidth * whalecitoScale) / 2,
        (-whalecitoSpriteHeight + 16) * whalecitoScale,
        whalecitoSpriteWidth * whalecitoScale,
        whalecitoSpriteHeight * whalecitoScale,
      );
      ctx.restore();
    }
    // ISLAND TWO THIN TREE BOTTOM
    ctx.drawImage(islandTwoThinTreesBottom, 51, 133, 59, 28);
    // ISLAND THREE THIN TREE TOP TRUNK
    ctx.drawImage(islandThreeThinTreeBottom, 359, 18, 14, 28);
    // ISLAND THREE THIN TREE BOTTOM TRUNK
    ctx.drawImage(islandThreeThinTreeBottom, 359, 79, 14, 28);
    // ISLAND THREE BUSHES
    ctx.drawImage(islandThreeBushesBottomBottom, 300, 16, 56, 15);
    // BABY FOXITO ANIMATION SPRITE
    ctx.drawImage(
      // This method helps us draw a specific sprite.
      foxitoSprite, // image source
      currentFrameRef.current * spriteWidth, // This manages the starting point of the width on the sprite sheet. We start at 0
      animationStateRef.current.row * spriteHeight, // This manages the height for every frame in the first row. For the next row, we would substitute the 0 with 1
      spriteWidth, // source width. This is what you add to the starting point to manage the length of the actual frame
      spriteHeight, // source height. ''
      positionRef.current.x - 19,
      positionRef.current.y - 18, // destination x and y on canvas
      spriteWidth * scale,
      spriteHeight * scale, // destination width and height
    );
    // ISLAND THREE BUSHES
    ctx.drawImage(islandThreeBushesBottomTop, 300, 16, 56, 15);
    ctx.drawImage(islandThreeBushesTop, 300, 111, 56, 15);
    // ISLAND TWO THIN TREE TOP
    ctx.drawImage(islandTwoThinTreesTop, 51, 133, 59, 28);
    // ISLAND THREE THIN TREE TOP FOLIAGE
    ctx.drawImage(islandThreeThinTreeTop, 359, 18, 14, 28);
    // ISLAND THREE THIN TREE BOTTOM FOLIAGE
    ctx.drawImage(islandThreeThinTreeTop, 359, 79, 14, 28);
    // BIG TREE TOP STATIC
    ctx.drawImage(bigTreeTop, 201, 140, 40, 32);
    // BIG TREE TOP ANIMATION SPRITE
    ctx.drawImage(
      bigTreeTopAnimationSprite,
      treeCurrentFrameRef.current * treeSpriteWidth,
      0, // Row 0, since we only have one row
      treeSpriteWidth,
      treeSpriteHeight,
      183,
      159,
      treeSpriteWidth * treeSpriteScale,
      treeSpriteHeight * treeSpriteScale,
    );
    // ROUND TREE ONE TOP COPY
    ctx.drawImage(treeRoundOneTop, 61, 3, 22, 28);
    // ROUND TREE TWO TOP COPY
    ctx.drawImage(treeRoundOneTop, 105, 3, 22, 28);
    // ROUND TREE THREE TOP COPY
    ctx.drawImage(treeRoundOneTop, 146, 3, 22, 28);
    // ISLAND ONE BUSH
    ctx.drawImage(islandOneBushTop, 54, 44, 16, 15);
    // ISLAND ONE BUSHES LEFT TOP
    ctx.drawImage(islandOneBushesTop, 38, 54, 16, 25);
    // ISLAND ONE BUSHES RIGHT TOP
    ctx.drawImage(islandOneBushesTop, 70, 54, 16, 25);
  }

  // Logic for drawing Dialogue boxes
  // Logic for drawing Dialogue boxes
  // Logic for drawing Dialogue boxes

  function drawDialogueState(ctx) {
    //console.log("drawDialogueState called");
    // Draw the text box
    const originalHeight = 0;
    const yOffset = originalHeight - originalHeight * textBoxScale;

    if (characterRef.current.position.y > 225 / 2) {
      // Setup a condition based on the canvas' height
      ctx.drawImage(textBox, 10, 32 + yOffset, 380, 40 * textBoxScale);
    } else {
      //console.log("Drawing textbox at bottom position");
      ctx.drawImage(textBox, 10, 113 + yOffset, 380, 40 * textBoxScale);
    }

    if (isDialogueState.current) {
      let currentDialogue = currentDialoguesRef.current;
      if (
        currentDialogueIndex.current >= 0 &&
        currentDialogueIndex.current < currentDialogue.length
      ) {
        let dialogue = currentDialogue[currentDialogueIndex.current];
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        if (characterRef.current.position.y > 225 / 2) {
          // Similar adjustment as above
          ctx.fillText(dialogue.speaker + ":", 20, 59); // adjust x,y coordinates as needed
          ctx.fillText(
            dialogue.text.substring(0, currentTextIndex.current),
            20,
            79,
          ); // displays text up to currentTextIndex
        } else {
          ctx.fillText(dialogue.speaker + ":", 20, 140); // adjust x,y coordinates as needed
          ctx.fillText(
            dialogue.text.substring(0, currentTextIndex.current),
            20,
            160,
          ); // displays text up to currentTextIndex
        }
      } else {
        /* console.error("Invalid dialogue index:", currentDialogueIndex.current); */
      }
    }
  }

  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//
  //------------------------------------ HELPER FUNCTIONS ---------------------------------------//

  // Update the textbox animation
  // Update the textbox animation
  // Update the textbox animation

  function updateTextBoxAnimation(timestamp) {
    // console.log("Textbox scale: ", textBoxScale);
    if (isAnimatingTextBox.current) {
      textBoxScale += animationSpeed;
      if (textBoxScale >= 2) {
        textBoxScale = 2;
        isAnimatingTextBox.current = false;
        // Start the text animation when the textbox finishes animating.
        isAnimatingText.current = true;
        lastTextUpdateTime = timestamp;
      }
    }
  }

  // Update the text animation
  // Update the text animation
  // Update the text animation

  function updateTextAnimation(timestamp) {
    // console.log("Animating text...");
    // console.log("Time difference:", timestamp - lastTextUpdateTime);
    if (
      currentDialogueIndex.current >= 0 &&
      currentDialogueIndex.current < currentDialoguesRef.current.length
    ) {
      if (
        isAnimatingText.current &&
        timestamp - lastTextUpdateTime > textAnimationSpeed
      ) {
        // console.log("Adding a character");
        currentTextIndex.current++;
        lastTextUpdateTime = timestamp;
        if (
          currentTextIndex.current >=
          currentDialoguesRef.current[currentDialogueIndex.current].text.length
        ) {
          //   console.log("finished animating text");
          isAnimatingText.current = false;
        }
      }
    } else {
      /* console.error("Invalid dialogue index:", currentDialogueIndex.current); */
    }
  }

  // START GAME HELPER FUNCTION
  // START GAME HELPER FUNCTION
  // START GAME HELPER FUNCTION

  function startGame() {
    /* console.log("Starting Game"); */
    isInitialState.current = true;

    // You can also initiate any animations or other effects here.
    // Move on to dialogue phase after another delay or an event.
    setTimeout(() => {
      startDialoguePhase();
    }, 2000); // e.g., after 2 seconds
  }
  function startDialoguePhase() {
    /*  console.log("Dialogue starting"); */
    // isInitialState.current = false;
    isDialogueState.current = true;
    isAnimatingTextBox.current = true;
    // You'll set up dialogue rendering and handle user input here.
  }

  // WHALECITO DIALOGUE HELPER FUNCTION
  // WHALECITO DIALOGUE HELPER FUNCTION
  // WHALECITO DIALOGUE HELPER FUNCTION

  function initiateWhalecitoDialogue() {
    if (!whalecitoDialogueTriggered.current) {
      controlsDisabledRef.current = true; // Disable the movement arrows
      Matter.Body.setVelocity(characterRef.current, { x: 0, y: 0 }); // Freeze the character so it doesnt slide due to its physics forces
      // Only if it hasn't been triggered before
      isDialogueState.current = true; // set the state to dialogue
      currentDialogueIndex.current = 0; // start from the first dialogue
      currentTextIndex.current = 0;
      isAnimatingText.current = true;
      currentDialoguesRef.current = whalecitoDialogue; // point to the Whalecito dialogues array
      whalecitoDialogueTriggered.current = true; // mark it as triggered
    }
    // console.log(isDialogueState.current); Upon pressing ENTER dialogue state goes back to false, we will use this as a check
  }

  // HELPER FUNCTIONS FOR CRATE DIRECTION COLLISIONS
  // HELPER FUNCTIONS FOR CRATE DIRECTION COLLISIONS
  // HELPER FUNCTIONS FOR CRATE DIRECTION COLLISIONS

  function getCollisionDirection(bodyA, bodyB) {
    let dx = bodyB.position.x - bodyA.position.x;
    let dy = bodyB.position.y - bodyA.position.y;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (angle >= -45 && angle <= 45) return "right"; // Imagine a circle being drawn from the center of the crateDownRef body
    if (angle <= -135 || angle >= 135) return "left";
    if (angle > 45 && angle < 135) return "top";
    if (angle < -45 && angle > -135) return "bottom";
  }

  function handleCrateCollision(crateRef, direction) {
    let collisionDirection = getCollisionDirection(
      characterRef.current,
      crateRef,
    );
    if (collisionDirection !== direction) {
      Body.setStatic(crateRef, true);
    } else {
      Body.setStatic(crateRef, false);
    }
  }

  // KEY COLLECTION AABB HELPER FUNCTION (Axis-Aligned Bounding Box)
  // KEY COLLECTION AABB HELPER FUNCTION (Axis-Aligned Bounding Box)
  // KEY COLLECTION AABB HELPER FUNCTION (Axis-Aligned Bounding Box)

  // This will check wether two boxes overlap on both the X and Y axis
  // In this case it will check wether Baby Foxito is overlapping with the key

  function areRectsColliding(rectA, rectB) {
    return (
      rectA.x < rectB.x + rectB.width &&
      rectA.x + rectA.width > rectB.x &&
      rectA.y < rectB.y + rectB.height &&
      rectA.y + rectA.height > rectB.y
    );
  }

  // HANDLE GAME START HELPER FUNCTION
  // HANDLE GAME START HELPER FUNCTION
  // HANDLE GAME START HELPER FUNCTION

  const handleGameStart = () => {
    setIsLoading(false); // Set loading to false to render the canvas

    // Start the game loop here
    requestAnimationFrame(gameLoop);
    setTimeout(() => {
      startGame();
    }, 2000);
    startBackgroundMusic(); // Start the background music after interaction
  };

  // AUDIO SOUND FX HELPER FUNCTIONS
  // AUDIO SOUND FX HELPER FUNCTIONS
  // AUDIO SOUND FX HELPER FUNCTIONS

  // Function to start the background music.
  function startBackgroundMusic() {
    bgMusic
      .play()
      .catch((error) => console.error("Playback was prevented:", error));
  }

  function stopBackgroundMusic() {
    bgMusic.pause();
    bgMusic.currentTime = 0; // Reset the time if you want to start from the beginning next time
  }

  // Helper function to handle item pick ups SFX.
  function handleItemPickup() {
    itemPickupSound.volume = 0.2; // This value may be adjusted between 0.0 and 1.0 as needed.
    itemPickupSound.play();
  }

  // Helper function to handle item pick ups SFX.
  function handleKeyPickup() {
    if (playKeyCollectedSFXRef.current) {
      keyPickupSound.volume = 0.1; // This value may be adjusted between 0.0 and 1.0 as needed.
      keyPickupSound.play();
    } else {
      keyPickupSound.volume = 0;
      keyPickupSound.pause();
    }
  }

  // Helper function to handle the achievement SFX.
  function handleAchievementSFX() {
    achievementSound.volume = 0.2; // This value may be adjusted between 0.0 and 1.0 as needed.
    achievementSound.play();
  }

  // BABY FOXITO DIRECTONAL CONTROL SETUP HELPER FUNCTIONS
  // BABY FOXITO DIRECTONAL CONTROL SETUP HELPER FUNCTIONS
  // BABY FOXITO DIRECTONAL CONTROL SETUP HELPER FUNCTIONS

  const handleRightArrowPress = () => {
    if (!controlsDisabledRef.current) {
      lastDirectionRef.current = "right";
      animationStateRef.current.current = "walkingRight";
      animationStateRef.current.row = 7; // This assumes the current row that has the images for this particular action.
      Matter.Body.setVelocity(characterRef.current, {
        x: speed,
        y: characterRef.current.velocity.y,
      });
    }
  };

  const handleLeftArrowPress = () => {
    if (!controlsDisabledRef.current) {
      lastDirectionRef.current = "left";
      animationStateRef.current.current = "walkingLeft";
      animationStateRef.current.row = 5; // Same as above.
      Matter.Body.setVelocity(characterRef.current, {
        x: -speed,
        y: characterRef.current.velocity.y,
      });
    }
  };

  const handleUpArrowPress = () => {
    if (!controlsDisabledRef.current) {
      lastDirectionRef.current = "up";
      animationStateRef.current.current = "walkingUp";
      animationStateRef.current.row = 3; // Same as above
      Matter.Body.setVelocity(characterRef.current, {
        x: characterRef.current.velocity.x,
        y: -speed,
      });
    }
  };

  const handleDownArrowPress = () => {
    if (!controlsDisabledRef.current) {
      lastDirectionRef.current = "down";
      animationStateRef.current.current = "walkingDown";
      animationStateRef.current.row = 1; // Same as above
      Matter.Body.setVelocity(characterRef.current, {
        x: characterRef.current.velocity.x,
        y: speed,
      });
    }
  };

  // ONSCREEN A BUTTON HANDLEKEYUP SIMULATION HELPER FUNCTION
  // ONSCREEN A BUTTON HANDLEKEYUP SIMULATION HELPER FUNCTION
  // ONSCREEN A BUTTON HANDLEKEYUP SIMULATION HELPER FUNCTION

  // Trying to manage the idle states based on charcter movement  is another challenge
  // that sought a different  solution to  that used for  the pressing of the screen A
  // button. Pressing a key up and  then letting go  had to be mimicked but with mouse
  // clicks. As a result we ended up having two similar functions. One inside the ctrls
  // useEffect, to manage the key presses for  directional movement, and one outside to
  // manage screen presses for directional movement. This had to be done since keyboard
  // events and mouse events dont work similarly in a browser. Furthermore "handleKeyUp"
  // was defined in the  scope of the  useEffect function and could not be used outside
  // The solution to this was to create a separate function, "transitionToIdle" to stop
  // movement when the user uses  the screen  arrow buttons/keys. This particular outer
  // functions base their functionality on the last  direction movement which is stored
  // in the variable  "lastDirectionRef"  as opossed to  "e" in the case of key presses.
  const transitionToIdle = () => {
    /* console.log("keypressed"); */
    if (!controlsDisabledRef.current && lastDirectionRef.current) {
      // Stop the character's movement
      /*  console.log(`Last direction: ${lastDirectionRef.current}`);
      console.log(
        `Current animation state before transition: ${animationStateRef.current.current}, row: ${animationStateRef.current.row}`,
      );
      console.log(
        `Character velocity before stopping: x=${characterRef.current.velocity.x}, y=${characterRef.current.velocity.y}`,
      ); */
      // Apply the appropriate idle animation based on the last movement direction
      switch (lastDirectionRef.current) {
        case "right":
          /* console.log("Transitioning to idleRight"); */
          animationStateRef.current.current = "idleRight";
          animationStateRef.current.row = 6; // Assuming row 6 has the idleRight animation
          /*   Matter.Body.setVelocity(characterRef.current, {
            x: 0,
            y: characterRef.current.velocity.y,
          }); */
          break;
        case "left":
          animationStateRef.current.current = "idleLeft";
          animationStateRef.current.row = 4; // Assuming row 4 has the idleLeft animation
          /*  Matter.Body.setVelocity(characterRef.current, {
            x: -speed,
            y: characterRef.current.velocity.y,
          }); */
          break;
        case "down":
          /*   Matter.Body.setVelocity(characterRef.current, {
            x: characterRef.current.velocity.x,
            y: 0,
          }); */
          animationStateRef.current.current = "idleDown";
          animationStateRef.current.row = 0; // Assuming row 0 has the idleDown animation
          break;
        case "up":
          /*    Matter.Body.setVelocity(characterRef.current, {
            x: characterRef.current.velocity.x,
            y: 0,
          }); */
          animationStateRef.current.current = "idleTop";
          animationStateRef.current.row = 2; // Assuming row 2 has the idleTop animation
          break;
        default:
          break;
      }

      // Applying the velocity change
      Matter.Body.setVelocity(characterRef.current, { x: 0, y: 0 });
      /*  console.log(
        `Character velocity after stopping: x=${characterRef.current.velocity.x}, y=${characterRef.current.velocity.y}`,
      ); */

      lastDirectionRef.current = null;
    } else {
      /* console.log(
        "Transition to Idle not executed due to controls disabled or no last direction",
      ); */
    }
  };

  // SCREEN CTRLS KEY UP SIMULATION HELPER FUNCTIONS
  // SCREEN CTRLS KEY UP SIMULATION HELPER FUNCTIONS
  // SCREEN CTRLS KEY UP SIMULATION HELPER FUNCTIONS

  const startMoving = (directionFunction) => {
    stopMoving(); // Ensure no existing movement
    directionFunction(); // Start movement
    movementInterval = setInterval(directionFunction, 100); // Continue movement
  };

  const stopMoving = () => {
    if (movementInterval) {
      clearInterval(movementInterval);
      movementInterval = null;
      transitionToIdle(); // This will transition to the idle state
    }
  };

  // A ONSCREEN BUTTON/ENTER KEY HELPER FUNCTION
  // A ONSCREEN BUTTON/ENTER KEY HELPER FUNCTION
  // A ONSCREEN BUTTON/ENTER KEY HELPER FUNCTION

  const handleAPress = useCallback(() => {
    /*    console.log("Before handling A Press:", {
      isAnimatingText: isAnimatingText.current,
      currentTextIndex: currentTextIndex.current,
      currentDialogueIndex: currentDialogueIndex.current,
    }); */
    if (isDialogueState.current) {
      if (isAnimatingText.current) {
        isAnimatingText.current = false;
        currentTextIndex.current =
          currentDialoguesRef.current[currentDialogueIndex.current].text.length; // instantly display all text
      } else {
        // Before progressing to the next dialogue, check if we're already at the end
        if (
          currentDialogueIndex.current + 1 >=
          currentDialoguesRef.current.length
        ) {
          // end of dialogues, transition to next game phase
          isDialogueState.current = false;
          // ... other transitions if any
          if (whalecitoDialogueTriggered.current) {
            setTimeout(() => {
              handleAchievementSFX();
            }, 7900);
            const rotate90CCW = {
              angle: whalecitoPosRef.current.angle - Math.PI / 2,
            };
            const rotate180CCW = {
              angle: whalecitoPosRef.current.angle - (Math.PI / 2) * 2,
            };
            const rotate270CCW = {
              angle: whalecitoPosRef.current.angle - (Math.PI / 2) * 3,
            };
            const rotate360CCW = {
              angle: whalecitoPosRef.current.angle - (Math.PI / 2) * 4,
            };
            const initialRotateTween = new TWEEN.Tween(
              whalecitoPosRef.current,
            ).to(rotate90CCW, 1000);

            const moveRightTween = new TWEEN.Tween(whalecitoPosRef.current).to(
              { x: whalecitoPosRef.current.x + 110 },
              1000,
            );

            const firstRotateTween = new TWEEN.Tween(
              whalecitoPosRef.current,
            ).to(rotate180CCW, 1000);

            const moveUpTween = new TWEEN.Tween(whalecitoPosRef.current).to(
              { y: whalecitoPosRef.current.y - 205 },
              1000,
            );

            const secondRotateTween = new TWEEN.Tween(
              whalecitoPosRef.current,
            ).to(rotate270CCW, 1000);

            const moveLeftTween = new TWEEN.Tween(whalecitoPosRef.current).to(
              { x: whalecitoPosRef.current.x - 80 },
              1000,
            );

            const thirdRotateTween = new TWEEN.Tween(
              whalecitoPosRef.current,
            ).to(rotate360CCW, 1000);

            const moveDownTween = new TWEEN.Tween(whalecitoPosRef.current)
              .to({ y: whalecitoPosRef.current.y - 108 }, 1000)
              .onComplete(() => {
                //console.log(
                // "Whalecito's final position:",
                //  whalecitoPosRef.current
                // );
                controlsDisabledRef.current = false;
                /* console.log(controlsDisabledRef); */
              });

            // Chain the tweens
            initialRotateTween.chain(moveRightTween);
            moveRightTween.chain(firstRotateTween);
            firstRotateTween.chain(moveUpTween);
            moveUpTween.chain(secondRotateTween);
            secondRotateTween.chain(moveLeftTween);
            moveLeftTween.chain(thirdRotateTween);
            thirdRotateTween.chain(moveDownTween);

            // Start the first tween
            initialRotateTween.start();
          }
        } else {
          // progress to next dialogue
          currentDialogueIndex.current++;
          currentTextIndex.current = 0;
          if (
            currentDialogueIndex.current >= currentDialoguesRef.current.length
          ) {
            // end of dialogues, transition to next game phase
            isDialogueState.current = false;
            //... other transitions
          } else {
            isAnimatingText.current = true;
          }
        }
      }
    } else {
      // Check proximity between the character and the computer
      const distanceToComputer = Matter.Vector.magnitude(
        Matter.Vector.sub(
          characterRef.current.position,
          computerRef.current.position,
        ),
      );

      // check proximity between the character and the treasure chest
      const distanceToChest = Matter.Vector.magnitude(
        Matter.Vector.sub(
          characterRef.current.position,
          chestRef.current.position,
        ),
      );

      // Set a threshold for how close the character needs to be to an item to interact
      const interactionDistance = 50; // This value may be adjusted
      // Define facing direction of the character
      let facingDirection;
      if (
        animationStateRef.current.current === "walkingUp" ||
        animationStateRef.current.current === "idleTop"
      ) {
        facingDirection = "bottom";
      }
      if (
        animationStateRef.current.current === "walkingDown" ||
        animationStateRef.current.current === "idleDown"
      ) {
        facingDirection = "top";
      }
      if (
        animationStateRef.current.current === "walkingRight" ||
        animationStateRef.current.current === "idleRight"
      ) {
        facingDirection = "right";
      }
      if (
        animationStateRef.current.current === "walkingLeft" ||
        animationStateRef.current.current === "idleLeft"
      ) {
        facingDirection = "left";
      }
      // Managing computer initial dialogue
      if (distanceToComputer < interactionDistance) {
        // Check the facing direction of the character using our getCollisionDirection helper function
        const directionFromComputer = getCollisionDirection(
          characterRef.current,
          computerRef.current,
        );
        // We'll assume the character's 'facingDirection' based on its animation state (or movement)

        if (
          facingDirection === "bottom" &&
          directionFromComputer === "bottom"
        ) {
          //console.log("Do Something");
          isDialogueState.current = true; // set the state to dialogue
          currentDialogueIndex.current = 0; // start from the first dialogue
          currentTextIndex.current = 0;
          isAnimatingText.current = true;
          currentDialoguesRef.current = computerDialogues; // point to the computer dialogues array
        }
        if (
          facingDirection === "bottom" &&
          directionFromComputer === "bottom" &&
          inventoryRef.current.hasToken
        ) {
          isDialogueState.current = true; // set the state to dialogue
          currentDialogueIndex.current = 0; // start from the first dialogue
          currentTextIndex.current = 0;
          isAnimatingText.current = true;
          currentDialoguesRef.current = computerWithTokenDialogues; // point to the computer with token dialogues array
          inventoryRef.current.hasAccess = true;
        }
        // Test logs
        // console.log(
        //   "Current Dialogues Length:",
        //    currentDialoguesRef.current.length
        //   );
        //  console.log(
        //    "Current Dialogue Index:",
        //    currentDialogueIndex.current
        //   );
      }
      // Managing treasure chest initial dialogue
      if (distanceToChest < interactionDistance) {
        // Check the facing direction of the character using our getCollisionDirection helper function
        const directionFromChest = getCollisionDirection(
          characterRef.current,
          chestRef.current,
        );
        // We'll assume the character's 'facingDirection' based on its animation state (or movement)

        if (
          facingDirection === "bottom" &&
          directionFromChest === "bottom" &&
          inventoryRef.current.hasKey === false
        ) {
          //console.log("Do Something");
          isDialogueState.current = true; // set the state to dialogue
          currentDialogueIndex.current = 0; // start from the first dialogue
          currentTextIndex.current = 0;
          isAnimatingText.current = true;
          currentDialoguesRef.current = chestDialogues; // point to the computer dialogues array
        } else if (
          facingDirection === "bottom" &&
          directionFromChest === "bottom" &&
          inventoryRef.current.hasKey === true
        ) {
          chestIsAnimatingRef.current = true;
          if (chestCurrentFrameRef.current === 4) {
            inventoryRef.current.hasToken = true;
            handleItemPickup();
          }
          // Test logs
          // console.log("hasToken is true");
          // console.log("chest animated!");
        }

        // Testing logs
        //console.log(
        //  "Current Dialogues Length:",
        //  currentDialoguesRef.current.length
        //);
        //console.log(
        //  "Current Dialogue Index:",
        //  currentDialogueIndex.current
        //);
      }
    }
    return; // If you're in the dialogue state, don't process other key inputs below this.
  }, []);

  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//
  //---------------------------USEEFFECT INITIAL MOUNTING FUNCTION  -----------------------------//

  useEffect(() => {
    // This use effect mounts initially and only once. Think of the camera mounting analogy
    // Process Input
    const handleKeyDown = (e) => {
      // There was an issue when  switching between  pressing the  Enter key, pressing the A
      // screen  button and then  switching back to using the  Enter key. Things  worked well
      // when  initially  pressing the Enter key for  a dialogue  and then  continuing  that
      // dialogue while pressing the A screen button. Text animations were working correctly,
      // nevertheless,  as I  switched back to  pressing the Enter key, the  text  animations
      // stopped working and the text would just print completely with one press. I happended
      // to notice that the  issue was fixed if I  clicked outside of the browser main screen
      // like for example clicking on the console and then clicking back on the app. The brow-
      // ser must have some default function associated to the Enter key leading to undesired
      // behaviour (probably also related to focus  management). In the end, adding e.prevent
      // default() fixed the issue and is a recommended practice.
      e.preventDefault(); // This prevents the browser's default Enter key action.

      if (e.key === "Enter") {
        handleAPress();
      }
      if (!controlsDisabledRef.current) {
        switch (e.code) {
          case "ArrowRight":
            handleRightArrowPress();
            break;
          case "ArrowLeft":
            handleLeftArrowPress();
            break;
          case "ArrowUp":
            handleUpArrowPress();
            break;
          case "ArrowDown":
            handleDownArrowPress();
            break;
          default:
            break;
        }
      }
    };

    const handleKeyUp = (e) => {
      if (!controlsDisabledRef.current) {
        // Stop the characters movement.
        switch (e.code) {
          case "ArrowRight":
            Matter.Body.setVelocity(characterRef.current, {
              x: 0,
              y: characterRef.current.velocity.y,
            });
            animationStateRef.current.current = "idleRight";
            animationStateRef.current.row = 6; // This assumes the current row has the images for the idle action
            break;
          case "ArrowLeft":
            Matter.Body.setVelocity(characterRef.current, {
              x: 0,
              y: characterRef.current.velocity.y,
            });
            animationStateRef.current.current = "idleLeft";
            animationStateRef.current.row = 4; // This assumes the current row has the images for the idle action
            break;
          case "ArrowDown":
            Matter.Body.setVelocity(characterRef.current, {
              x: characterRef.current.velocity.x,
              y: 0,
            });
            animationStateRef.current.current = "idleDown";
            animationStateRef.current.row = 0; // This assumes the current row has the images for the idle action
            break;
          case "ArrowUp":
            Matter.Body.setVelocity(characterRef.current, {
              x: characterRef.current.velocity.x,
              y: 0,
            });
            animationStateRef.current.current = "idleTop";
            animationStateRef.current.row = 2; // This assumes the current row has the images for the idle action
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown); // As the user clicks, execute the handleKeyDown function
    window.addEventListener("keyup", handleKeyUp);

    engineRef.current = Engine.create({
      gravity: { x: 0, y: 0 }, // this sets gravity to zero in both axes
    });
    let runner = Runner.create();
    let world = engineRef.current.world;

    // Create a renderer
    let render = Render.create({
      element: matterContainerRef.current,
      engine: engineRef.current,
      options: {
        width: 400,
        height: 225,
        wireframes: true, // set this to true if you want to see the wireframes for debugging, else to false if you want to see the textures
      },
    });
    // Define the first rectangle
    let rectangle1 = Bodies.rectangle(40 + 320 / 2, 0 + 17 / 2, 320, 17, {
      isStatic: true,
      friction: 0,
    });
    // Define the first rectangle
    let rectangle2 = Bodies.rectangle(0 + 40 / 2, 17 + 16 / 2, 40, 16, {
      isStatic: true,
      friction: 0,
    });
    // Define the first rectangle
    let rectangle3 = Bodies.rectangle(0 + 24 / 2, 33 + 16 / 2, 24, 16, {
      isStatic: true,
      friction: 0,
    });
    // Define the first rectangle
    let rectangle4 = Bodies.rectangle(0 + 8 / 2, 49 + 48 / 2, 8, 48, {
      isStatic: true,
      friction: 0,
    });
    let rectangle5 = Bodies.rectangle(0 + 24 / 2, 97 + 16 / 2, 24, 16, {
      isStatic: true,
      friction: 0,
    });
    let rectangle6 = Bodies.rectangle(0 + 40 / 2, 113 + 16 / 2, 40, 16, {
      isStatic: true,
      friction: 0,
    });
    let rectangle7 = Bodies.rectangle(0 + 151 / 2, 129 + 8 / 2, 151, 8, {
      isStatic: true,
      friction: 0,
    });
    let rectangle8 = Bodies.rectangle(183 + 177 / 2, 129 + 8 / 2, 177, 8, {
      isStatic: true,
      friction: 0,
    });
    let rectangle9 = Bodies.rectangle(200 + 96 / 2, 113 + 16 / 2, 96, 16, {
      isStatic: true,
      friction: 0,
    });
    let rectangle10 = Bodies.rectangle(216 + 64 / 2, 97 + 16 / 2, 64, 16, {
      isStatic: true,
      friction: 0,
    });
    let rectangle11 = Bodies.rectangle(232 + 32 / 2, 89 + 8 / 2, 32, 8, {
      isStatic: true,
      friction: 0,
    });
    let rectangle12 = Bodies.rectangle(232 + 32 / 2, 49 + 8 / 2, 32, 8, {
      isStatic: true,
      friction: 0,
    });
    let rectangle13 = Bodies.rectangle(216 + 64 / 2, 33 + 16 / 2, 64, 16, {
      isStatic: true,
      friction: 0,
    });
    let rectangle14 = Bodies.rectangle(200 + 96 / 2, 17 + 16 / 2, 96, 16, {
      isStatic: true,
      friction: 0,
    });
    // console.log(rectangle1.position);

    // Create a compound body consisting of all the border rectangles
    let compoundBodyIslandOne = Body.create({
      parts: [
        rectangle1,
        rectangle2,
        rectangle3,
        rectangle4,
        rectangle5,
        rectangle6,
        rectangle7,
        rectangle8,
        rectangle9,
        rectangle10,
        rectangle11,
        rectangle12,
        rectangle13,
        rectangle14,
      ],
      isStatic: true,
    });
    // Define the first rectangle
    let island2rectangle1 = Bodies.rectangle(0 + 151 / 2, 137 + 8 / 2, 151, 8, {
      isStatic: true,
      friction: 0,
    });
    let island2rectangle2 = Bodies.rectangle(0 + 24 / 2, 145 + 15 / 2, 24, 15, {
      isStatic: true,
      friction: 0,
    });
    let island2rectangle3 = Bodies.rectangle(0 + 8 / 2, 161 + 33 / 2, 8, 33, {
      isStatic: true,
      friction: 0,
    });
    let island2rectangle4 = Bodies.rectangle(0 + 24 / 2, 193 + 16 / 2, 24, 16, {
      isStatic: true,
      friction: 0,
    });
    let island2rectangle5 = Bodies.rectangle(
      0 + 216 / 2,
      209 + 16 / 2,
      216,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island2rectangle6 = Bodies.rectangle(
      216 + 16 / 2,
      193 + 16 / 2,
      16,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island2rectangle7 = Bodies.rectangle(
      232 + 16 / 2,
      161 + 32 / 2,
      16,
      32,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island2rectangle8 = Bodies.rectangle(
      216 + 16 / 2,
      145 + 16 / 2,
      16,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island2rectangle9 = Bodies.rectangle(183 + 33 / 2, 137 + 8 / 2, 33, 8, {
      isStatic: true,
      friction: 0,
    });
    let compoundBodyIslandTwo = Body.create({
      parts: [
        island2rectangle1,
        island2rectangle2,
        island2rectangle3,
        island2rectangle4,
        island2rectangle5,
        island2rectangle6,
        island2rectangle7,
        island2rectangle8,
        island2rectangle9,
      ],
      isStatic: true,
    });
    // Compound body sorrounding island 3
    // Define the first rectangle
    let island3rectangle1 = Bodies.rectangle(
      360 + 40 / 2,
      17 + 16 / 2,
      40,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island3rectangle2 = Bodies.rectangle(
      376 + 24 / 2,
      33 + 16 / 2,
      24,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island3rectangle3 = Bodies.rectangle(392 + 8 / 2, 49 + 48 / 2, 8, 48, {
      isStatic: true,
      friction: 0,
    });
    let island3rectangle4 = Bodies.rectangle(
      376 + 24 / 2,
      97 + 16 / 2,
      24,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let island3rectangle5 = Bodies.rectangle(
      360 + 40 / 2,
      113 + 16 / 2,
      40,
      16,
      {
        isStatic: true,
        friction: 0,
      },
    );
    let compoundBodyIslandThree = Body.create({
      parts: [
        island3rectangle1,
        island3rectangle2,
        island3rectangle3,
        island3rectangle4,
        island3rectangle5,
      ],
      isStatic: true,
    });
    // TREE ROUND ONE COLLIDER
    let treeRoundOne = Bodies.rectangle(67 + 10 / 2, 12 + 19 / 2, 10, 19, {
      label: "treeRound1",
      isStatic: true,
    });
    // TREE ROUND TWO COLLIDER
    let treeRoundTwo = Bodies.rectangle(111 + 10 / 2, 12 + 19 / 2, 10, 19, {
      label: "treeRound2",
      isStatic: true,
    });
    // TREE ROUND THREE COLLIDER
    let treeRoundThree = Bodies.rectangle(152 + 10 / 2, 12 + 19 / 2, 10, 19, {
      label: "treeRound3",
      isStatic: true,
    });
    // CRATE GENERAL 1 BODY WITH MATTER.JS
    let crateOne = Bodies.rectangle(167 + 16 / 2, 113 + 16 / 2, 16, 16, {
      label: "crate1",
      isStatic: true,
    });
    // BIG TREE BOTTOM BODY WITH MATTER.JS
    let bigTree = Bodies.rectangle(195 + 16 / 2, 182 + 19 / 2, 16, 19, {
      label: "bigTree",
      isStatic: true,
    });
    // CRATE GENERAL 2 BODY WITH MATTER.JS
    let crateTwo = Bodies.rectangle(151 + 16 / 2, 161 + 16 / 2, 16, 16, {
      label: "crate2",
      isStatic: true,
    });
    // CRATE DOWN BODY WITH MATTER.JS
    crateDownRef.current = Bodies.rectangle(
      151 + 16 / 2,
      113 + 16 / 2,
      16,
      16,
      {
        label: "crateDown",
        inertia: Infinity,
        friction: 0,
        isStatic: false,
      },
    );
    // CRATE RIGHT BODY WITH MATTER.JS
    crateRightRef.current = Bodies.rectangle(
      136 + 16 / 2,
      188 + 16 / 2,
      16,
      16,
      {
        label: "crateRight",
        inertia: Infinity,
        friction: 0,
        isStatic: false,
      },
    );

    // ISLAND ONE BUSH COLLIDER
    let islandOneBush = Bodies.rectangle(54 + 16 / 2, 48 + 11 / 2, 16, 11, {
      label: "bush",
      isStatic: true,
    });

    // ISLAND ONE BUSHES LEFT  COLLIDER
    let islandOneBushesLeft = Bodies.rectangle(
      38 + 16 / 2,
      58 + 25 / 2,
      16,
      25,
      {
        label: "bushesLeft",
        isStatic: true,
      },
    );
    // ISLAND ONE BUSHES RIGHT COLLIDER
    let islandOneBushesRight = Bodies.rectangle(
      70 + 16 / 2,
      58 + 25 / 2,
      16,
      25,
      {
        label: "bushesRight",
        isStatic: true,
      },
    );

    // ISLAND TWO THIN TREES TOP COLLIDERS

    let islandTwoThinTreesTop1 = Bodies.rectangle(
      55 + 6 / 2,
      137 + 13 / 2,
      6,
      13,
      {
        label: "thinTreesTop1",
        isStatic: true,
      },
    );

    let islandTwoThinTreesTop2 = Bodies.rectangle(
      70 + 6 / 2,
      137 + 13 / 2,
      6,
      13,
      {
        label: "thinTreesTop2",
        isStatic: true,
      },
    );

    let islandTwoThinTreesTop3 = Bodies.rectangle(
      85 + 6 / 2,
      137 + 13 / 2,
      6,
      13,
      {
        label: "thinTreesTop3",
        isStatic: true,
      },
    );

    let islandTwoThinTreesTop4 = Bodies.rectangle(
      100 + 6 / 2,
      137 + 13 / 2,
      6,
      13,
      {
        label: "thinTreesTop4",
        isStatic: true,
      },
    );

    // ISLAND TWO THIN TREES BOTTOM COLLIDER

    let islandTwoThinTreesBottom1 = Bodies.rectangle(
      55 + 6 / 2,
      154 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesTop1",
        isStatic: true,
      },
    );

    let islandTwoThinTreesBottom2 = Bodies.rectangle(
      70 + 6 / 2,
      154 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesTop2",
        isStatic: true,
      },
    );

    let islandTwoThinTreesBottom3 = Bodies.rectangle(
      85 + 6 / 2,
      154 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesTop3",
        isStatic: true,
      },
    );

    let islandTwoThinTreesBottom4 = Bodies.rectangle(
      100 + 6 / 2,
      154 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesTop4",
        isStatic: true,
      },
    );

    // ISLAND THREE THIN TREES TOP & BOTTOM

    let islandThreeThinTreeTopFoliage = Bodies.rectangle(
      363 + 6 / 2,
      22 + 13 / 2,
      6,
      13,
      {
        label: "thinTreeTopFoliage",
        isStatic: true,
      },
    );

    let islandThreeThinTreeTopTrunk = Bodies.rectangle(
      363 + 6 / 2,
      39 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesTopTrunk",
        isStatic: true,
      },
    );

    let islandThreeThinTreeBottomFoliage = Bodies.rectangle(
      363 + 6 / 2,
      83 + 13 / 2,
      6,
      13,
      {
        label: "thinTreeBottomFoliage",
        isStatic: true,
      },
    );

    let islandThreeThinTreeBottomTrunk = Bodies.rectangle(
      363 + 6 / 2,
      100 + 6 / 2,
      6,
      6,
      {
        label: "thinTreesBottomTrunk",
        isStatic: true,
      },
    );

    // PORTAL COLLIDERS

    let portalCollider1 = Bodies.rectangle(349 + 2 / 2, 48 + 49 / 2, 2, 49, {
      label: "portalCollider1",
      isStatic: true,
    });

    let portalCollider2 = Bodies.rectangle(307 + 41 / 2, 47 + 2 / 2, 41, 2, {
      label: "portalCollider2",
      isStatic: true,
    });

    let portalCollider3 = Bodies.rectangle(306 + 2 / 2, 49 + 10 / 2, 2, 10, {
      label: "portalCollider3",
      isStatic: true,
    });

    let portalCollider4 = Bodies.rectangle(293 + 13 / 2, 57 + 2 / 2, 13, 2, {
      label: "portalCollider4",
      isStatic: true,
    });

    let portalCollider5 = Bodies.rectangle(292 + 2 / 2, 59 + 5 / 2, 2, 5, {
      label: "portalCollider5",
      isStatic: true,
    });

    let portalCollider6 = Bodies.rectangle(285 + 7 / 2, 62 + 2 / 2, 7, 2, {
      label: "portalCollider6",
      isStatic: true,
    });

    let portalCollider7 = Bodies.rectangle(307 + 42 / 2, 90 + 7 / 2, 42, 7, {
      label: "portalCollider7",
      isStatic: true,
    });

    let portalCollider8 = Bodies.rectangle(293 + 14 / 2, 84 + 5 / 2, 14, 5, {
      label: "portalCollider8",
      isStatic: true,
    });

    let portalCollider9 = Bodies.rectangle(285 + 8 / 2, 83 + 3 / 2, 8, 3, {
      label: "portalCollider9",
      isStatic: true,
    });

    // ISLAND THREE BUSH COLLIDERS

    let bottomBushCollider = Bodies.rectangle(
      300 + 56 / 2,
      111 + 4 / 2,
      56,
      4,
      {
        label: "bottomBushCollider",
        isStatic: true,
      },
    );

    let topBushCollider = Bodies.rectangle(300 + 56 / 2, 16 + 15 / 2, 56, 15, {
      label: "bottomBushCollider",
      isStatic: true,
    });

    // STATIC BIG TREE COLLIDER

    let staticBigTreeTopCollider = Bodies.rectangle(
      212 + 18 / 2,
      154 + 13 / 2,
      18,
      13,
      {
        label: "staticBigTreeTopCollider",
        isStatic: true,
      },
    );

    let staticBigTreeBottomCollider = Bodies.rectangle(
      213 + 16 / 2,
      171 + 11 / 2,
      16,
      11,
      {
        label: "staticBigTreeBottomCollider",
        isStatic: true,
      },
    );

    // COMPUTER BODY WITH MATTER.JS
    computerRef.current = Bodies.rectangle(56 + 12 / 2, 55 + 16 / 2, 12, 16, {
      label: "computer",
      isStatic: true,
    });
    // CHEST BODY WITH MATTER.JS
    chestRef.current = Bodies.rectangle(8 + 16 / 2, 159 + 12 / 2, 16, 12, {
      label: "chest",
      isStatic: true,
    });
    // CHARACTER BODY WITH MATTER.JS
    characterRef.current = Bodies.rectangle(
      100 + 15 / 2, // The first value determines where we initially position the character on x
      65 + (19 - 11 / 2), // The first value determines where we initially position the character on y
      9,
      11,
      {
        label: "character",
        inertia: Infinity,
        friction: 0,
        isStatic: false, // We ignore gravity and ensure the body is not static
      },
    );
    //console.log(characterRef.current.position.x);
    //console.log(characterRef.current.position.y);
    // BLOCKED PASSAGE ZONE
    blockedPassageRef.current = Bodies.rectangle(
      232 + 32 / 2,
      57 + 32 / 2,
      32,
      32,
      { label: "blockedPassage", isStatic: true },
    );

    World.add(world, characterRef.current); // For some reason, these all need to be separated, cannot have them all in the same World.add
    World.add(world, treeRoundOne);
    World.add(world, treeRoundTwo);
    World.add(world, treeRoundThree);
    World.add(world, bigTree);
    World.add(world, crateOne);
    World.add(world, crateTwo);
    World.add(world, islandOneBush);
    World.add(world, islandOneBushesLeft);
    World.add(world, islandOneBushesRight);

    // ISLAND TWO THIN TREES GROUP
    World.add(world, islandTwoThinTreesTop1);
    World.add(world, islandTwoThinTreesTop2);
    World.add(world, islandTwoThinTreesTop3);
    World.add(world, islandTwoThinTreesTop4);
    World.add(world, islandTwoThinTreesBottom1);
    World.add(world, islandTwoThinTreesBottom2);
    World.add(world, islandTwoThinTreesBottom3);
    World.add(world, islandTwoThinTreesBottom4);

    // ISLAND THREE THIN TREES
    World.add(world, islandThreeThinTreeTopFoliage);
    World.add(world, islandThreeThinTreeTopTrunk);
    World.add(world, islandThreeThinTreeBottomFoliage);
    World.add(world, islandThreeThinTreeBottomTrunk);

    // ISLAND THREE PORTAL COLLIDERS
    World.add(world, portalCollider1);
    World.add(world, portalCollider2);
    World.add(world, portalCollider3);
    World.add(world, portalCollider4);
    World.add(world, portalCollider5);
    World.add(world, portalCollider6);
    World.add(world, portalCollider7);
    World.add(world, portalCollider8);
    World.add(world, portalCollider9);

    // ISLAND THREE BUSHES COLLIDERS
    World.add(world, bottomBushCollider);
    World.add(world, topBushCollider);

    // ISLAND THREE BIG TREE COLLIDERS
    World.add(world, staticBigTreeTopCollider);
    World.add(world, staticBigTreeBottomCollider);

    World.add(world, crateDownRef.current);
    World.add(world, crateRightRef.current);
    // World.add(world, crateOneRef.current);
    World.add(world, computerRef.current);
    World.add(world, chestRef.current);
    World.add(world, compoundBodyIslandOne);
    World.add(world, compoundBodyIslandTwo);
    World.add(world, compoundBodyIslandThree);
    World.add(world, blockedPassageRef.current);
    //---------------------------------------------------------------------
    Events.on(engineRef.current, "collisionStart", (event) => {
      let pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];

        if (
          (pair.bodyA === characterRef.current &&
            pair.bodyB === crateDownRef.current) ||
          (pair.bodyB === characterRef.current &&
            pair.bodyA === crateDownRef.current)
        ) {
          handleCrateCollision(crateDownRef.current, "top");
        } else if (
          (pair.bodyA === characterRef.current &&
            pair.bodyB === crateRightRef.current) ||
          (pair.bodyB === characterRef.current &&
            pair.bodyA === crateRightRef.current)
        ) {
          // Check the direction of the collision

          handleCrateCollision(crateRightRef.current, "right");
        } else if (
          (pair.bodyA === crateRightRef.current &&
            pair.bodyB.label === "bigTree") ||
          (pair.bodyA.label === "bigTree" &&
            pair.bodyB === crateRightRef.current)
        ) {
          // Start the tree animation when the crate collides with the tree
          treeIsAnimatingRef.current = true;
        }
      }
    });

    Events.on(engineRef.current, "collisionEnd", (event) => {
      let pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];

        if (
          (pair.bodyA === characterRef.current &&
            pair.bodyB === crateDownRef.current) ||
          (pair.bodyB === characterRef.current &&
            pair.bodyA === crateDownRef.current)
        ) {
          // Reset the crate's isStatic property to false once the collision ends
          Body.setStatic(crateDownRef.current, false);
        } else if (
          (pair.bodyA === characterRef.current &&
            pair.bodyB === crateRightRef.current) ||
          (pair.bodyB === characterRef.current &&
            pair.bodyA === crateRightRef.current)
        ) {
          // Reset the crate's isStatic property to false once the collision ends
          Body.setStatic(crateRightRef.current, false);
        }
      }
    });

    //---------------------------------------------------------------------
    // Run the engine
    Runner.run(runner, engineRef.current); // This line replaces Engine.run(engine)
    // Run the renderer
    // Render.run(render); // This is the black square on the top left corner of the screen. This is Matter.js' default renderer used for debugging. You may comment this line out if you don't want to see the black box

    // Start the game after some delay (e.g., after 2 seconds)
    /* setTimeout(() => {
      startGame();
    }, 2000); */

    // Initiate the game loop after the component renders/mounts
    requestAnimationFrame(gameLoop);

    return () => {
      Render.stop(render);
      Runner.stop(runner); // Stop the Runner on unmount
      Engine.clear(engineRef.current);
      World.clear(engineRef.current.world);
      window.removeEventListener("keydown", handleKeyDown); // Cleanup. Remove the 'handleKeyDown' function from being an active listener on the 'window'
      window.removeEventListener("keyup", handleKeyUp);
      if (movementInterval) clearInterval(movementInterval);
      /////////////////////////////////////////////////////
      Events.off(engineRef.current, "collisionStart");
      Events.off(engineRef.current, "collisionEnd");
    };
  }, [handleAPress]);

  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//
  //--------------------------------------- GAME LOOP  ------------------------------------------//

  const gameLoop = (timestamp) => {
    updateTextAnimation(timestamp);
    updateGameState();
    updateTextBoxAnimation(timestamp);
    renderGameState();

    // This progresses the tweens over time
    TWEEN.update(timestamp); // 'timestamp' is the time since the page loaded in milliseconds

    //Request the next frame by repeating the cycle
    requestAnimationFrame(gameLoop); // The requestAnimationFrame method tells the browser you want to make an animation.
    // This tells the browser to program a redraw of the canvas for the next cycle
  };

  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//
  //--------------------------------------III JSX STARTS HERE --------------------------------------//

  return (
    <div>
      {isLoading ? (
        <LoaderPartOne
          isLoading={isLoading}
          handleGameStart={handleGameStart}
        ></LoaderPartOne>
      ) : (
        <div className="grid h-screen w-screen bg-black">
          <div className={styles.gameConsoleContainer}>
            <div className={styles.consoleSpeaker}>
              <img src="./images/console/Speaker.svg" alt="console speaker" />
            </div>
            <div className={styles.consoleLogo}>
              <img
                src="./images/console/FoxitoDevConsoleLogo.svg"
                alt="console brand"
              />
            </div>
            <div className={styles.gameConsoleScreenContainer}>
              <div className={styles.consoleModel}>
                <img
                  src="./images/console/PockettoMiniLogo.svg"
                  alt="console model"
                />
              </div>
              <div className={styles.gameConsoleScreenOutline}>
                <div
                  ref={matterContainerRef}
                  width={400}
                  height={225}
                  className={styles.gameCanvas}
                />
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={225}
                  className={styles.gameCanvas}
                />
              </div>
            </div>
            <div className={styles.gameConsoleCtrlsContainer}>
              <div className={styles.gameConsolePadContainer}>
                <div className={styles.gameConsolePad}>
                  <div className={styles.topArrowPos}>
                    <button
                      onMouseDown={() => startMoving(handleUpArrowPress)}
                      onMouseUp={stopMoving}
                      onTouchStart={() => startMoving(handleUpArrowPress)}
                      onTouchEnd={stopMoving}
                      onContextMenu={(e) => e.preventDefault()}
                      className={styles.topArrowDesign}
                    >
                      <img
                        className={styles.topArrowArrow}
                        src="./images/console/TriangleUp.svg"
                        alt="triangle up"
                      />
                    </button>
                  </div>
                  <div className={styles.middleArrowLeftPos}>
                    <button
                      onMouseDown={() => startMoving(handleLeftArrowPress)}
                      onMouseUp={stopMoving}
                      onTouchStart={() => startMoving(handleLeftArrowPress)}
                      onTouchEnd={stopMoving}
                      onContextMenu={(e) => e.preventDefault()}
                      className={styles.middleArrowLeftDesign}
                    >
                      <img
                        className={styles.middleArrowLeftArrow}
                        src="./images/console/TriangleLeft.svg"
                        alt="triangle left"
                      />
                    </button>
                  </div>
                  <div className={styles.middleArrowRightPos}>
                    <button
                      onMouseDown={() => startMoving(handleRightArrowPress)}
                      onMouseUp={stopMoving}
                      onTouchStart={() => startMoving(handleRightArrowPress)}
                      onTouchEnd={stopMoving}
                      onContextMenu={(e) => e.preventDefault()}
                      className={styles.middleArrowRightDesign}
                    >
                      <img
                        className={styles.middleArrowRightArrow}
                        src="./images/console/TriangleRight.svg"
                        alt="triangle right"
                      />
                    </button>
                  </div>
                  <div className={styles.middleArrowMiddlePos}>
                    <div className={styles.middleArrowCircle}></div>
                  </div>
                  <div className={styles.bottomArrowPos}>
                    <button
                      onMouseDown={() => startMoving(handleDownArrowPress)}
                      onMouseUp={stopMoving}
                      onTouchStart={() => startMoving(handleDownArrowPress)}
                      onTouchEnd={stopMoving}
                      onContextMenu={(e) => e.preventDefault()}
                      className={styles.bottomArrowDesign}
                    >
                      <img
                        className={styles.bottomArrowArrow}
                        src="./images/console/TriangleDown.svg"
                        alt="triangle up"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.gameConsoleButtons}>
                <div className={styles.buttonBContainer}>
                  <button className={styles.buttonB}>
                    <a
                      href="/headquarters"
                      onClick={() => stopBackgroundMusic()}
                    >
                      <p className={styles.buttonText}>B</p>
                    </a>
                  </button>
                </div>
                <div className={styles.buttonAContainer}>
                  <button onClick={handleAPress} className={styles.buttonA}>
                    <p className={styles.buttonText}>A</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ); // All this (Canvas) defines a bitmapped area in an HTML page
};

export default GameCanvas;
