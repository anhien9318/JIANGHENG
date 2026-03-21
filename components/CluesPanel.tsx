type Props = {
  across: string[];
  down: string[];
  activeAcrossIndex: number | null;
  activeDownIndex: number | null;
  direction: "across" | "down";
};

function ClueItem({
  clue,
  index,
  active,
}: {
  clue: string;
  index: number;
  active: boolean;
}) {
  return (
    <li
      className={`rounded-2xl border px-4 py-3 transition-all duration-200 ${
        active
          ? "scale-[1.02] border-[#a5a5a5] bg-[#f2f2f2] shadow-md"
          : "border-transparent bg-transparent hover:border-[#cccccc] hover:bg-white/80"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
            active
              ? "bg-[#7f7f7f] text-white shadow-md"
              : "bg-[#cccccc] text-[#7f7f7f]"
          }`}
        >
          {index + 1}
        </div>

        <p
          className={`text-[15px] leading-7 ${
            active ? "font-semibold text-[#7f7f7f]" : "text-[#7f7f7f]"
          }`}
        >
          {clue}
        </p>
      </div>
    </li>
  );
}

export default function CluesPanel({
  across,
  down,
  activeAcrossIndex,
  activeDownIndex,
  direction,
}: Props) {
  return (
    <div className="space-y-8 text-[#7f7f7f]">
      <div className="rounded-[28px] border border-[#cccccc] bg-[#f2f2f2]/90 p-7 shadow-[0_10px_30px_rgba(127,127,127,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(127,127,127,0.12)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#7f7f7f]">
            Câu hỏi hàng ngang
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              direction === "across"
                ? "bg-[#cccccc] text-[#7f7f7f]"
                : "bg-white text-[#a5a5a5]"
            }`}
          >
            {direction === "across" ? "Đang chọn" : "Phụ"}
          </span>
        </div>

        <ul className="space-y-3">
          {across.map((clue, index) => (
            <ClueItem
              key={index}
              clue={clue}
              index={index}
              active={index === activeAcrossIndex}
            />
          ))}
        </ul>
      </div>

      <div className="rounded-[28px] border border-[#cccccc] bg-[#f2f2f2]/90 p-7 shadow-[0_10px_30px_rgba(127,127,127,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(127,127,127,0.12)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#7f7f7f]">
            Câu hỏi hàng dọc
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              direction === "down"
                ? "bg-[#cccccc] text-[#7f7f7f]"
                : "bg-white text-[#a5a5a5]"
            }`}
          >
            {direction === "down" ? "Đang chọn" : "Phụ"}
          </span>
        </div>

        <ul className="space-y-3">
          {down.map((clue, index) => (
            <ClueItem
              key={index}
              clue={clue}
              index={index}
              active={index === activeDownIndex}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}