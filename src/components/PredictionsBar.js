import React from "react";

function PredictionsBar(props) {
    const { predictions, handlePrediction } = props;

    const PredictionStyling = {
        position: "relative",
        overflow: "visible",
        backgroundColor: "#3f3f3f",
    };

    return (
        <div>
            {predictions?.map((data, index) => {
                if (!data) {
                    return null;
                }
                return (
                    <div
                        className={PredictionStyling}
                        key={index + data}
                        onClick={() => handlePrediction(data)}
                    >
                        {data}
                    </div>
                );
            })}
        </div>
    );
}

export default PredictionsBar;
