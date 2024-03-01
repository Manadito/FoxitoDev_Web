import React from "react";

// This is the joystick ctrl coordinate frame component.

const ArcadeJoyStickCtrl = (props) => {
  const { onPointerDown } = props;
  const { onPointerMove } = props;
  const { onPointerUp } = props;

  // Helper functions.

  return (
    <div
      className="h-[60px] w-[70px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    ></div>
  );
};

export default ArcadeJoyStickCtrl;
