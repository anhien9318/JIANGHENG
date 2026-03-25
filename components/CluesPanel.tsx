"use client";

import type { CrosswordClue } from "@/data/crossword";

type Props = {
  title: string;
  clues: CrosswordClue[];
  activeClueNumber: number | null;
  onSelectClue: (clue: CrosswordClue) => void;
};

export default function CluesPanel({
  title,
  clues,
  activeClueNumber,
  onSelectClue,
}: Props) {
  return (
    <div className="rounded-[28px] border border-[#dde5b6] bg-white/85 p-4 shadow-[0_10px_30px_rgba(36,85,1,0.08)] backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#f0ead2] px-3 text-sm font-bold text-[#538d22]">
          {title}
        </span>
      </div>

      <div className="space-y-2">
        {clues.map((clue) => {
          const isActive = activeClueNumber === clue.number;

          return (
            <button
              key={`${clue.direction}-${clue.number}`}
              type="button"
              onClick={() => onSelectClue(clue)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-[#73a942] bg-[#eef7db] shadow-sm"
                  : "border-[#edf1dd] bg-[#fdfcf7] hover:border-[#c9d99b] hover:bg-[#f8faef]"
              }`}
            >
              <div className="mb-1 text-sm font-extrabold text-[#538d22]">
                Câu {clue.number}
              </div>
              <div className="text-sm leading-6 text-[#245501]">{clue.text}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}