export type character = {
  id: number;
  src?: string;
};

export type actionType = {
  fn: (id?: number) => void;
};

type selectedType = number;

export const selected: selectedType[] = [];
