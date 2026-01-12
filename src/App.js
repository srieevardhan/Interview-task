import React, { useState } from "react";
import Bars from "./components/Bars";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // 🔹 Swap Counter state
  const [swapCount, setSwapCount] = useState(0);

  const generateArray = () => {
    if (isSorting) return;

    const size = Math.floor(Math.random() * 11) + 10;
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 200) + 30
    );

    setArray(newArray);
    setComparing([]);
    setSortedIndex([]);
    setSwapCount(0); // 🔹 reset swap counter
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await delay(300);

        if (arr[j] > arr[j + 1]) {
          // 🔹 swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          setArray([...arr]);
          setSwapCount((prev) => prev + 1); // 🔹 increment swap counter
          await delay(300);
        }
      }
      setSortedIndex((prev) => [...prev, n - i - 1]);
    }

    setComparing([]);
    setIsSorting(false);
  };

  return (
    <div className="app">
      <h1>Bubble Sort Visualizer</h1>
      <p className="subtitle">
        Visual step-by-step demonstration of Bubble Sort algorithm
      </p>

      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={isSorting || array.length === 0}>
          Start Sorting
        </button>
      </div>

      {/* 🔹 Swap Counter Display */}
      <div className="swap-counter">
        🔁 Swaps: <strong>{swapCount}</strong>
      </div>

      <Bars
        array={array}
        comparing={comparing}
        sortedIndex={sortedIndex}
      />

      <div className="legend">
        <div><span className="box blue"></span> Unsorted</div>
        <div><span className="box red"></span> Comparing</div>
        <div><span className="box green"></span> Sorted</div>
      </div>
    </div>
  );
}

export default App;
