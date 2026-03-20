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
      "relative flex h-[64px] w-[64px] items-center justify-center rounded-2xl border text-center text-2xl font-bold uppercase outline-none transition-all duration-200 md:h-[72px] md:w-[72px]";

    if (isActive) {
      return `${base} z-20 scale-105 border-emerald-500 bg-white shadow-[0_10px_25px_rgba(16,185,129,0.25)] ring-4 ring-emerald-100`;
    }

    if (isInPrimaryWord) {
      return `${base} border-emerald-200 bg-emerald-50 shadow-sm`;
    }

    if (isInSecondaryWord) {
      return `${base} border-green-100 bg-green-50/80`;
    }

    return `${base} border-gray-200 bg-white hover:-translate-y-[2px] hover:shadow-sm`;
  }

  return (
    <div
      className="grid gap-3 md:gap-4"
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
                className="h-[64px] w-[64px] md:h-[72px] md:w-[72px]"
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
              {clueNumber ? (
                <span className="pointer-events-none absolute left-2 top-1.5 z-10 text-[11px] font-bold text-gray-400">
                  {clueNumber}
                </span>
              ) : null}

              <input
                id={`cell-${r}-${c}`}
                maxLength={1}
                value={values[r][c]}
                onFocus={() => setActiveCell({ row: r, col: c })}
                onClick={() => focusCell(r, c)}
                onChange={(e) => {
                  updateCell(r, c, e.target.value);
                  if (e.target.value) {
                    moveToNextCell(r, c);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, r, c)}
                className={`${getCellClass(r, c)} ${
                  isCorrect ? "!border-green-400 !bg-green-100 !text-green-700" : ""
                } ${isWrong ? "!border-red-300 !bg-red-50 !text-red-700" : ""}`}
              />
            </div>
          );
        })
      )}
    </div>
  );
}