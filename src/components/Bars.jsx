import React from "react";

const Bars = ({ array, comparing, sortedIndex }) => {
  return (
    <div className="bars-container">
      {array.map((value, index) => {
        let color = "blue";

        if (comparing.includes(index)) {
          color = "red";
        } else if (sortedIndex.includes(index)) {
          color = "green";
        }

        return (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value}px`,
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Bars;
