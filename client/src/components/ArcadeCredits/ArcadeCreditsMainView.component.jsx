import React from "react";
import ArcadeCreditsOptionSelect from "./ArcadeCreditsOptionSelect.component";
import ArcadeCreditsDetailView from "./ArcadeCreditsDetailView.component";

const ArcadeCreditsMainView = (props) => {
  const { selectedOption, showDetails } = props;
  // Helper functions

  return (
    <div className="h-[80px] w-[142.5px]">
      {showDetails ? (
        <ArcadeCreditsDetailView selectedOption={selectedOption} />
      ) : (
        <ArcadeCreditsOptionSelect selectedOption={selectedOption} />
      )}
    </div>
  );
};

export default ArcadeCreditsMainView;
