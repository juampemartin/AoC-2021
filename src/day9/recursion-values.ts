export enum Dir {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
  None = 4,
}

const dirAmounts = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export const dirs = [
  [Dir.Left, ...dirAmounts[Dir.Left]],
  [Dir.Down, ...dirAmounts[Dir.Down]],
  [Dir.Right, ...dirAmounts[Dir.Right]],
  [Dir.Up, ...dirAmounts[Dir.Up]],
];
