// Take Home Test - Dominoes
// Thomas Pratama - JCWD3004

import React, { useState } from "react";

const startingDominoes : number[][] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export default function Home() {
  const [dominoes, setDominoes] = useState<number[][]>([...startingDominoes]);

  // 1.) Count Double Numbers -- Looping through and find the double numbers domnioes
  function doubleNumbers() {
    let count = 0;

    for (let i = 0; i < dominoes.length; i++) {
      const [a, b] = dominoes[i];

      if (a === b) {
        count++;
      }
    }
    return count;
  }

  // 2.) Sort Dominoes -- Sort the dominoes ascending & descending using .sort
  function sortDominoes(order : string) {
    const sorted = [...dominoes];

    sorted.sort((a : number[], b : number[]) => {
      const totalA = a[0] + a[1];
      const totalB = b[0] + b[1];

      if (order === "asc") {
        return totalA - totalB;
      } else if (order === "desc") {
        return totalB - totalA;
      }
      return 0;
    });
    setDominoes(sorted);
  }

  // 3.) Remove Duplicates -- Remove domino with same total number + number combination (including duplicates)
  function removeDuplicates() {
    const result : number[][] = [];
    const checkDominoes : number[][] = [];
    const dupeDominoes : number [][] = [];

    for (let i = 0; i < dominoes.length; i++) {
      const [a, b] = dominoes[i];
      let isDuplicate = false;

      for (let j = 0; j < checkDominoes.length; j++) {
        const [c, d] = checkDominoes[j];

        if ((a === c && b === d) || (a === d && b === c)) {
          isDuplicate = true;
          dupeDominoes.push([a, b]);
          dupeDominoes.push([b, a]);
          break;
        }
      }

      if (!isDuplicate) {
        checkDominoes.push([a, b]);
      }
    }

    for (let i = 0; i < dominoes.length; i++) {
      const [a, b] = dominoes[i];

      let isDuplicate = false;
      for (let j = 0; j < dupeDominoes.length; j++) {
        const [c, d] = dupeDominoes[j];
        if ((a === c && b === d) || (a === d && b === c)) {
          isDuplicate = true;
          break;
        }
      }

      if (!isDuplicate) {
        result.push([a, b]);
      }
    }

    setDominoes(result);
  }

  // 4.) Flip Dominoes -- Looping through the array and then push array inverted (B first then A dan kebalikanya)
  function flipDominoes() {
    const flippedDominoes = [];

    for (let i = 0; i < dominoes.length; i++) {
      const [a, b] = dominoes[i];
      flippedDominoes.push([b, a]);
    }

    setDominoes(flippedDominoes);
  }

  // 5.) Remove Total -- Filter dominoes with the inputed total number (show dominoes selain total input)
  const [removeTotal, setRemoveTotal] = useState("");

  function removeTotalDominoes(total : number) {
    const filtered = [];
    for (let i = 0; i < dominoes.length; i++) {
      const [a, b] = dominoes[i];
      if (a + b !== total) {
        filtered.push(dominoes[i]);
      }
    }
    setDominoes(filtered);
  }

  // 6.) Reset Dominoes -- Bring back dominoes into the starting state
  function resetDominoes() {
    setDominoes([...startingDominoes]);
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-blue-900">
      <div className="container w-full max-w-2xl items-center justify-center bg-white py-4 px-4 rounded-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-black">Dominoes</h1>

        {/* Source starting Dominoes */}
        <div className="border border-gray-300 bg-gray-100 mb-4 py-4 px-4 rounded-lg">
          <h2 className="text-lg font-extrabold text-black">Source:</h2>
          <div className="text-black text-xl">
            {startingDominoes.map(([a, b], index) => (
              <span key={index}>
                [[{a}, {b}]],
              </span>
            ))}
          </div>
        </div>

        {/* Double Numbers */}
        <div className="border border-gray-300 bg-gray-100 mb-4 py-4 px-4 rounded-lg">
          <h2 className="text-lg font-semibold text-black">Double Numbers:</h2>
          <p className="text-xl text-black">{doubleNumbers()}</p>
        </div>

        {/* Dominoes Card */}
        <div className="grid grid-cols-10 text-black">
          {dominoes.map(([a, b], index) => (
            <div
              key={index}
              className="w-10 h-28 border flex flex-col justify-between items-center border-black rounded p-2 bg-white"
            >
              <p>{a}</p>
              <p> - </p>
              <p>{b}</p>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div className="space-x-4 mb-4 mt-4">
          <button
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
            onClick={() => sortDominoes("asc")}
          >
            Sort (ASC)
          </button>

          <button
            className="bg-blue-600 text-white font-bold px-2 py-2 rounded"
            onClick={() => sortDominoes("desc")}
          >
            Sort (DESC)
          </button>

          <button
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
            onClick={flipDominoes}
          >
            Flip
          </button>

          <button
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
            onClick={removeDuplicates}
          >
            Remove Dup
          </button>

          <button
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
            onClick={resetDominoes}
          >
            Reset
          </button>
        </div>

        {/* Remove Total */}
        <div className="flex flex-col mb-4">
          <input
            type="number"
            placeholder="Input Number"
            value={removeTotal}
            onChange={(e) => setRemoveTotal(e.target.value)}
            className="text-black px-2 py-2 mb-4 border border-gray-300 rounded"
          />
          <button
            className="font-bold text-white bg-blue-600  py-2 rounded"
            onClick={() => removeTotalDominoes(Number(removeTotal))}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
