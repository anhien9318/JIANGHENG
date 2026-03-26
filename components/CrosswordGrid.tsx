"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  allClues,
  getCellNumberMap,
  type CrosswordClue,
  type Direction,
} from "@/data/crossword";

type Props = {
  grid: readonly (readonly string[])[];
  userGrid: string[][];
  setUserGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  direction: Direction;
  setDirection: (direction: Direction) => void;
  activeClue: CrosswordClue | null;
  setActiveClue: (clue: CrosswordClue | null) => void;
};

function isBlocked(value: string) {
  return value === "#";
}

function getCellsForClue(clue: CrosswordClue) {
  return clue.answer.split("").map((_, index) => {
    const row = clue.direction === "across" ? clue.row : clue.row + index;
    const col = clue.direction === "across" ? clue.col + index : clue.col;
    return { row, col };
  });
}

function sameCell(
  a: { row: number; col: number },
  b: { row: number; col: number }
) {
  return a.row === b.row && a.col === b.col;
}

function findCluesAtCell(row: number, col: number) {
  return allClues.filter((clue) =>
    getCellsForClue(clue).some((cell) => cell.row === row && cell.col === col)
  );
}

function findClueByCellAndDirection(
  row: number,
  col: number,
  direction: Direction
): CrosswordClue | null {
  return (
    allClues.find(
      (clue) =>
        clue.direction === direction &&
        getCellsForClue(clue).some((cell) => cell.row === row && cell.col === col)
    ) || null
  );
}

export default function CrosswordGrid({
  grid,
  userGrid,
  setUserGrid,
  activeCell,
  setActiveCell,
  direction,
  setDirection,
  activeClue,
  setActiveClue,
}: Props) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const numberMap = useMemo(() => getCellNumberMap(), []);

  const activeCells = useMemo(() => {
    if (!activeClue) return [];
    return getCellsForClue(activeClue);
  }, [activeClue]);

  useEffect(() => {
    if (!activeCell) return;
    const key = `${activeCell.row}-${activeCell.col}`;
    inputRefs.current[key]?.focus();
  }, [activeCell]);

  function focusCell(row: number, col: number) {
    setActiveCell({ row, col });

    const nextClue =
      findClueByCellAndDirection(row, col, direction) ||
      findClueByCellAndDirection(
        row,
        col,
        direction === "across" ? "down" : "across"
      );

    if (nextClue) {
      setActiveClue(nextClue);
    }
  }

  function handleCellClick(row: number, col: number) {
    if (isBlocked(grid[row][col])) return;

    const sameActive =
      activeCell && activeCell.row === row && activeCell.col === col;

    const cellClues = findCluesAtCell(row, col);

    if (sameActive && cellClues.length >= 2) {
      const newDirection = direction === "across" ? "down" : "across";
      setDirection(newDirection);

      const toggledClue = findClueByCellAndDirection(row, col, newDirection);
      if (toggledClue) setActiveClue(toggledClue);
    } else {
      const clue =
        findClueByCellAndDirection(row, col, direction) ||
        cellClues[0] ||
        null;

      if (clue) {
        setDirection(clue.direction);
        setActiveClue(clue);
      }
    }

    setActiveCell({ row, col });
  }

  function moveToNextCell(row: number, col: number) {
    const current = activeClue;
    if (!current) return;

    const cells = getCellsForClue(current);
    const index = cells.findIndex((cell) => cell.row === row && cell.col === col);

    if (index >= 0 && index < cells.length - 1) {
      const next = cells[index + 1];
      setActiveCell(next);
      return;
    }

    setActiveCell({ row, col });
  }

  function moveToPreviousCell(row: number, col: number) {
    const current = activeClue;
    if (!current) return;

    const cells = getCellsForClue(current);
    const index = cells.findIndex((cell) => cell.row === row && cell.col === col);

    if (index > 0) {
      const prev = cells[index - 1];
      setActiveCell(prev);
      return;
    }

    setActiveCell({ row, col });
  }

  function handleChange(row: number, col: number, value: string) {
    const char = value.slice(-1).toUpperCase().replace(/[^A-ZÀ-Ỹ]/g, "");

    setUserGrid((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = char;
      return next;
    });

    if (char) {
      moveToNextCell(row, col);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    if (e.key === "Backspace") {
      if (userGrid[row][col]) {
        setUserGrid((prev) => {
          const next = prev.map((r) => [...r]);
          next[row][col] = "";
          return next;
        });
      } else {
        moveToPreviousCell(row, col);
      }
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      setDirection("across");
      const clue = findClueByCellAndDirection(row, col, "across");
      if (clue) setActiveClue(clue);
      moveToNextCell(row, col);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setDirection("across");
      const clue = findClueByCellAndDirection(row, col, "across");
      if (clue) setActiveClue(clue);
      moveToPreviousCell(row, col);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDirection("down");
      const clue = findClueByCellAndDirection(row, col, "down");
      if (clue) setActiveClue(clue);

      const downClue = findClueByCellAndDirection(row, col, "down");
      if (!downClue) return;

      const cells = getCellsForClue(downClue);
      const index = cells.findIndex((cell) => cell.row === row && cell.col === col);
      if (index >= 0 && index < cells.length - 1) {
        setActiveCell(cells[index + 1]);
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setDirection("down");
      const clue = findClueByCellAndDirection(row, col, "down");
      if (clue) setActiveClue(clue);

      const downClue = findClueByCellAndDirection(row, col, "down");
      if (!downClue) return;

      const cells = getCellsForClue(downClue);
      const index = cells.findIndex((cell) => cell.row === row && cell.col === col);
      if (index > 0) {
        setActiveCell(cells[index - 1]);
      }
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max justify-center px-1 sm:px-0">
        <div
          className="grid gap-[2px] sm:gap-[3px] md:gap-[4px]"
          style={{
            gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const blocked = isBlocked(cell);
              const isActive =
                activeCell?.row === rowIndex && activeCell?.col === colIndex;

              const isInActiveWord = activeCells.some((item) =>
                sameCell(item, { row: rowIndex, col: colIndex })
              );

              const cellNumber = numberMap.get(`${rowIndex}-${colIndex}`);
              const key = `${rowIndex}-${colIndex}`;

              if (blocked) {
                return (
                  <div
                    key={key}
                    className="h-8 w-8 rounded-[8px] bg-transparent xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12"
                  />
                );
              }

              return (
                <div key={key} className="relative">
                  {cellNumber && (
                    <span className="pointer-events-none absolute left-[3px] top-[3px] z-10 text-[8px] font-extrabold leading-none text-[#6f8f35] xs:text-[9px] sm:left-1 sm:top-1 sm:text-[10px] md:text-[11px]">
                      {cellNumber}
                    </span>
                  )}

                  <input
                    ref={(el) => {
                      inputRefs.current[key] = el;
                    }}
                    value={userGrid[rowIndex][colIndex]}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onFocus={() => focusCell(rowIndex, colIndex)}
                    onChange={(e) =>
                      handleChange(rowIndex, colIndex, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    maxLength={1}
                    className={`h-8 w-8 rounded-[8px] border-[2px] text-center text-[13px] font-black uppercase outline-none transition xs:h-9 xs:w-9 xs:text-sm sm:h-10 sm:w-10 sm:rounded-[9px] sm:text-base md:h-11 md:w-11 md:rounded-[10px] md:border-[2.5px] md:text-base lg:h-12 lg:w-12 lg:text-lg ${
                      isActive
                        ? "border-[#4f7f1d] bg-[#edf7cf] text-[#1f3f00] shadow-[0_0_0_2px_rgba(170,213,118,0.35)]"
                      : isInActiveWord
                        ? "border-[#b7d78a] bg-[#f7fbe9] text-[#245501]"
                        : "border-[#cfe6a8] bg-white text-[#245501]"
                    }`}
                    inputMode="text"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}