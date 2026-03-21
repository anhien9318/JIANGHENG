"use client";

import React from "react";

type Direction = "across" | "down";
type ActiveCell = { row: number; col: number } | null;

type Props = {
  grid: string[][];
  values: string[][];
  setValues: React.Dispatch<React.SetStateAction<string[][]>>;
  submitted: boolean;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<React.SetStateAction<ActiveCell>>;
  direction: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  activeAcrossIndex: number | null;
  activeDownIndex: number | null;
  cellNumberMap: Map<string, number>;
  acrossIndexMap: Map<string, number>;
  downIndexMap: Map<string, number>;
};

export default function CrosswordGrid({
  grid,
  values,
  setValues,
  submitted,
  activeCell,
  setActiveCell,
  direction,
  setDirection,
  activeAcrossIndex,
  activeDownIndex,
  cellNumberMap,
  acrossIndexMap,
  downIndexMap,
}: Props) {
  function updateCell(row: number, col: number, value: string) {
    const char = value ? value.slice(-1).toUpperCase() : "";

    setValues((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = char;
      return next;
    });
  }

  function focusCell(row: number, col: number) {
    if (grid[row][col] === "#") return;

    if (activeCell && activeCell.row === row && activeCell.col === col) {
      setDirection((prev) => (prev === "across" ? "down" : "across"));
    } else {
      setActiveCell({ row, col });
    }
  }

  function moveToNextCell(row: number, col: number) {
    let nextRow = row;
    let nextCol = col;

    if (direction === "across") {
      nextCol++;
      while (nextCol < grid[row].length && grid[row][nextCol] === "#") {
        nextCol++;
      }
      if (nextCol < grid[row].length) {
        setActiveCell({ row: nextRow, col: nextCol });
        document.getElementById(`cell-${nextRow}-${nextCol}`)?.focus();
      }
    } else {
      nextRow++;
      while (nextRow < grid.length && grid[nextRow][col] === "#") {
        nextRow++;
      }
      if (nextRow < grid.length) {
        setActiveCell({ row: nextRow, col: nextCol });
        document.getElementById(`cell-${nextRow}-${nextCol}`)?.focus();
      }
    }
  }

  function moveToPrevCell(row: number, col: number) {
    let prevRow = row;
    let prevCol = col;

    if (direction === "across") {
      prevCol--;
      while (prevCol >= 0 && grid[row][prevCol] === "#") {
        prevCol--;
      }
      if (prevCol >= 0) {
        setActiveCell({ row: prevRow, col: prevCol });
        document.getElementById(`cell-${prevRow}-${prevCol}`)?.focus();
      }
    } else {
      prevRow--;
      while (prevRow >= 0 && grid[prevRow][col] === "#") {
        prevRow--;
      }
      if (prevRow >= 0) {
        setActiveCell({ row: prevRow, col: prevCol });
        document.getElementById(`cell-${prevRow}-${prevCol}`)?.focus();
      }
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    if (e.key === "Backspace") {
      if (values[row][col]) {
        updateCell(row, col, "");
      } else {
        moveToPrevCell(row, col);
      }
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      setDirection("across");
      moveToNextCell(row, col);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDirection("across");
      moveToPrevCell(row, col);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDirection("down");
      let nextRow = row + 1;
      while (nextRow < grid.length && grid[nextRow][col] === "#") nextRow++;
      if (nextRow < grid.length) {
        setActiveCell({ row: nextRow, col });
        document.getElementById(`cell-${nextRow}-${col}`)?.focus();
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setDirection("down");
      let prevRow = row - 1;
      while (prevRow >= 0 && grid[prevRow][col] === "#") prevRow--;
      if (prevRow >= 0) {
        setActiveCell({ row: prevRow, col });
        document.getElementById(`cell-${prevRow}-${col}`)?.focus();
      }
    }
  }

  function getCellClass(row: number, col: number) {
    const isActive = activeCell?.row === row && activeCell?.col === col;

    const isInAcross =
      activeAcrossIndex !== null &&
      acrossIndexMap.get(`${row}-${col}`) === activeAcrossIndex;

    const isInDown =
      activeDownIndex !== null &&
      downIndexMap.get(`${row}-${col}`) === activeDownIndex;

    const isInPrimaryWord = direction === "across" ? isInAcross : isInDown;
    const isInSecondaryWord = direction === "across" ? isInDown : isInAcross;

    const base =
      "relative flex h-9 w-9 items-center justify-center rounded-lg border text-center text-sm font-bold uppercase outline-none transition-all duration-200 sm:h-10 sm:w-10 sm:text-base md:h-12 md:w-12 md:rounded-xl md:text-lg lg:h-14 lg:w-14 lg:text-xl";

    if (isActive) {
      return `${base} z-20 scale-105 border-[#7f7f7f] bg-white text-black shadow-[0_10px_24px_rgba(0,0,0,0.12)] ring-2 ring-[#cccccc]`;
    }

    if (isInPrimaryWord) {
      return `${base} border-[#a5a5a5] bg-[#e9e9e9] text-black shadow-sm`;
    }

    if (isInSecondaryWord) {
      return `${base} border-[#cccccc] bg-[#f6f6f6] text-[#333333]`;
    }

    return `${base} border-[#cccccc] bg-white text-black hover:-translate-y-[1px] hover:shadow-sm`;
  }

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div
        className="mx-auto grid w-max gap-1.5 sm:gap-2 md:gap-2.5"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, max-content))`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const key = `${r}-${c}`;

            if (cell === "#") {
              return (
                <div
                  key={key}
                  className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
                />
              );
            }

            const clueNumber = cellNumberMap.get(key);

            const isCorrect =
              submitted &&
              values[r][c].toUpperCase() === grid[r][c].toUpperCase();

            const isWrong =
              submitted &&
              values[r][c] &&
              values[r][c].toUpperCase() !== grid[r][c].toUpperCase();

            return (
              <div key={key} className="relative">
                {clueNumber && (
                  <span className="pointer-events-none absolute left-1 top-0.5 z-10 text-[8px] font-bold text-[#666] sm:left-1.5 sm:top-1 sm:text-[9px] md:text-[10px]">
                    {clueNumber}
                  </span>
                )}

                <input
                  id={`cell-${r}-${c}`}
                  maxLength={1}
                  inputMode="text"
                  autoCapitalize="characters"
                  value={values[r][c]}
                  onFocus={() => setActiveCell({ row: r, col: c })}
                  onClick={() => focusCell(r, c)}
                  onChange={(e) => {
                    updateCell(r, c, e.target.value);
                    if (e.target.value) moveToNextCell(r, c);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  className={`${getCellClass(r, c)} ${
                    isCorrect
                      ? "!border-[#4f4f4f] !bg-[#d1ffd6] !text-black"
                      : ""
                  } ${
                    isWrong
                      ? "!border-[#999999] !bg-[#ffe3e3] !text-black"
                      : ""
                  }`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}