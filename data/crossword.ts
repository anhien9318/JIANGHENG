export const grid = [
  ["#", "#", "#", "#", "T", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "D", "A", "I", "H", "A", "I", "#", "#", "#", "#", "#", "#", "P", "#"],
  ["#", "#", "#", "#", "A", "#", "#", "#", "#", "#", "#", "#", "#", "H", "#"],
  ["#", "#", "N", "A", "M", "#", "#", "#", "#", "#", "#", "#", "#", "U", "#"],
  ["#", "B", "#", "#", "V", "#", "#", "#", "#", "#", "#", "S", "U", "T", "U"],
  ["L", "A", "C", "L", "A", "C", "#", "#", "#", "H", "#", "#", "#", "H", "#"],
  ["#", "M", "#", "#", "N", "#", "A", "#", "#", "U", "#", "#", "#", "A", "#"],
  ["#", "O", "#", "#", "L", "#", "N", "#", "#", "A", "#", "#", "#", "N", "#"],
  ["#", "T", "#", "C", "A", "N", "H", "E", "O", "V", "A", "N", "G", "#", "#"],
  ["#", "#", "#", "#", "N", "#", "U", "#", "#", "I", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "G", "#", "Y", "#", "#", "K", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "I", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "E", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "N", "#", "#", "#", "#", "#"],
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
    number: 2,
    text: "Biệt danh của Giang Hành do bạn diễn đặt?",
    answer: "DAIHAI",
    direction: "across",
    row: 1,
    col: 1,
  },
  {
    number: 4,
    text: "Giang Hành tới Thượng Hải được bao lâu rồi?",
    answer: "NAM",
    direction: "across",
    row: 3,
    col: 2,
  },
  {
    number: 6,
    text: "Hình tượng động vật của Giang Hành?",
    answer: "SUUTU",
    direction: "across",
    row: 4,
    col: 11,
  },
  {
    number: 7,
    text: "Chú chó do Giang Hành nuôi tên gì?",
    answer: "LACLAC",
    direction: "across",
    row: 5,
    col: 0,
  },
  {
    number: 10,
    text: "Giang Hành thích ăn cá gì?",
    answer: "CANHEOVANG",
    direction: "across",
    row: 8,
    col: 3,
  },
];

export const downClues: CrosswordClue[] = [
  {
    number: 1,
    text: "Tên vai diễn của Giang Hành trong Thèm Muốn?",
    answer: "THAMVANLANG",
    direction: "down",
    row: 0,
    col: 4,
  },
  {
    number: 3,
    text: "Giang Hành bao nhiêu tuổi?",
    answer: "BAMOT",
    direction: "down",
    row: 4,
    col: 1,
  },
  {
    number: 5,
    text: "Quê của Giang Hành ở đâu?",
    answer: "ANHUY",
    direction: "down",
    row: 6,
    col: 6,
  },
  {
    number: 8,
    text: "Giang Hành thích được gọi bằng biệt danh nào?",
    answer: "PHUTHANH",
    direction: "down",
    row: 1,
    col: 13,
  },
  {
    number: 9,
    text: "Tên thật của Giang Hành?",
    answer: "HUAVIKIEN",
    direction: "down",
    row: 5,
    col: 9,
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