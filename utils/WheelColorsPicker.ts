const listOfChakraUIColors = [
  "#C53030",
  "#6B46C1",
  "#F687B3",
  "#48BB78",
  "#38B2AC",
  "#4299E1",
  "#667EEA",
  "#9F7AEA",
  "#ED64A6",
  "#F56565",
  "#ECC94B",
  "#48BB78",
];

export const WheelColorsPicker = (index: number) => {
  if (index < listOfChakraUIColors.length) {
    return listOfChakraUIColors[index % listOfChakraUIColors.length];
  }

  return listOfChakraUIColors[index];
};
