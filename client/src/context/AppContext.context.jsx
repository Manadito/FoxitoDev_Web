import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize joystickAnimationActions as an empty object. We will eventually
  // pass this state variable to its corresponding GLB component in order to
  // store its actions (animations) in the variable.
  const [joystickAnimationActions, setJoystickAnimationActions] = useState({});
  const [buttonAAnimationAction, setButtonAAnimationAction] = useState({});
  const [buttonBAnimationAction, setButtonBAnimationAction] = useState({});
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <AppContext.Provider
      value={{
        joystickAnimationActions,
        setJoystickAnimationActions,
        buttonAAnimationAction,
        setButtonAAnimationAction,
        buttonBAnimationAction,
        setButtonBAnimationAction,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// We will import useAppContext into the components that require specific states from this file
// We will import them like so: import { useAppContext } from '../contexts/AppContext'
export const useAppContext = () => {
  return useContext(AppContext);
};
