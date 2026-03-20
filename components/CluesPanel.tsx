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
          ? "scale-[1.02] border-emerald-200 bg-emerald-50 shadow-md"
          : "border-transparent bg-transparent hover:border-gray-200 hover:bg-white/80"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
            active
              ? "bg-emerald-500 text-white shadow-md"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {index + 1}
        </div>

        <p
          className={`text-[15px] leading-7 ${
            active ? "font-semibold text-gray-900" : "text-gray-700"
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
    <div className="space-y-8 text-gray-800">
      <div className="rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Câu hỏi hàng ngang
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              direction === "across"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-500"
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

      <div className="rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Câu hỏi hàng dọc
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              direction === "down"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-500"
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