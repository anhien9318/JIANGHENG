export const grid = [
  ["P", "H", "U", "T", "H", "A", "N", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "O", "#", "#", "T", "#", "M", "#", "#", "K", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "P", "#", "#", "I", "#", "O", "#", "#", "E", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "T", "#", "#", "E", "#", "O", "#", "#", "M", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "H", "#", "#", "N", "#", "Y", "#", "#", "I", "#", "#", "#", "#", "#"],
  ["#", "#", "V", "U", "O", "N", "G", "G", "I", "A", "V", "I", "N", "H", "D", "I", "E", "U"],
  ["#", "#", "#", "#", "I", "#", "#", "A", "#", "F", "#", "#", "H", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "G", "#", "#", "N", "#", "R", "#", "#", "T", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "I", "#", "#", "H", "#", "E", "#", "S", "U", "T", "U", "#", "#", "#"],
  ["#", "#", "#", "#", "A", "#", "#", "T", "#", "S", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "N", "#", "#", "H", "#", "H", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "U", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "O", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "D", "I", "N", "H", "T", "U", "Y", "O", "N", "G", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "G", "#", "#", "#", "#", "#", "A", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "M", "#", "#", "#", "#", "#", "M", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "A", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "H", "A", "I", "H", "A", "I", "#", "#", "#", "#", "#", "#", "#"],
] as const;

export type Direction = "across" | "down";

export type CrosswordClue = {
  number: number;
  text: string;
  answer: string;
  direction: Direction;
  row: number;
  col: number;
};

export const acrossClues: CrosswordClue[] = [
  {
    number: 1,
    text: "Giang Hành thích được gọi bằng biệt danh gì?",
    answer: "PHUTHAN",
    direction: "across",
    row: 0,
    col: 0,
  },
  {
    number: 6,
    text: "Game Giang Hành thích chơi nhất?",
    answer: "VUONGGIAVINHDIEU",
    direction: "across",
    row: 5,
    col: 2,
  },
  {
    number: 7,
    text: "Hình tượng động vật của Giang Hành?",
    answer: "SUTU",
    direction: "across",
    row: 8,
    col: 11,
  },
  {
    number: 8,
    text: "Địa danh nổi tiếng ở quê Giang Hành, liên quan đến một tác phẩm văn học (không phải tên hán việt).",
    answer: "DINHTUYONG",
    direction: "across",
    row: 13,
    col: 5,
  },
  {
    number: 10,
    text: "Tên của Giang Hành gồm bao nhiêu nét?",
    answer: "HAIHAI",
    direction: "across",
    row: 17,
    col: 5,
  },
];

export const downClues: CrosswordClue[] = [
  {
    number: 2,
    text: "Giang Hành muốn dựng thư tay của fan ở đâu?",
    answer: "HOPTHOIGIAN",
    direction: "down",
    row: 0,
    col: 4,
  },
  {
    number: 3,
    text: "Chuyên ngành Giang Hành từng theo học ở đại học?",
    answer: "TIENGANHTHUONGMAI",
    direction: "down",
    row: 1,
    col: 7,
  },
  {
    number: 4,
    text: "Tên nhà hàng thú cưng mà Hành Ăn dẫn Lạc Lạc tới ăn?",
    answer: "MOOYAFRESH",
    direction: "down",
    row: 1,
    col: 9,
  },
  {
    number: 5,
    text: "Giang Hành từng nói muốn đi ngắm hoa anh đào ở đâu? (tên hán việt)",
    answer: "KEMINHTU",
    direction: "down",
    row: 1,
    col: 12,
  },
  {
    number: 9,
    text: "Giang Hành tới Thượng Hải bao nhiêu năm rồi?",
    answer: "NAM",
    direction: "down",
    row: 13,
    col: 13,
  },
];

export const allClues = [...acrossClues, ...downClues];

export function getCellNumberMap() {
  const map = new Map<string, number>();

  for (const clue of allClues) {
    map.set(`${clue.row}-${clue.col}`, clue.number);
  }

  return map;
}