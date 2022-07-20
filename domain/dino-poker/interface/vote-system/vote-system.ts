export const VoteSystemOptions: { [key: string]: { voteSystem: number[] } } = {
  ["fibonacci"]: {
    voteSystem: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  },
  ["modified-fibonacci"]: {
    voteSystem: [0.5, 1, 2, 3, 5, 8, 13, 21],
  },
};
