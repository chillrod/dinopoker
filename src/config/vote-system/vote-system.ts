interface IVoteSystem {
  voteSystem: number[];
}

export const VoteSystemOptions: { [key: string]: IVoteSystem } = {
  ["modified-fibonacci"]: {
    voteSystem: [0.5, 1, 2, 3, 5, 8, 13, 21],
  },
};
