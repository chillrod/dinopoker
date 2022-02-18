interface DinoState {
  [state: string]: number;
  next: number;
  back: number;
}

export const changeDino = (state: string, currentState: number) => {
  const dinoState: DinoState = {
    next: currentState + 1,
    back: currentState - 1,
  };

  if (state === "next" && currentState >= 3) return 0;
  if (state === "back" && currentState <= 0) return 3;

  return dinoState[state];
};
