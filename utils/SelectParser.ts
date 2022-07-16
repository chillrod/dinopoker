import { IOption } from "../components/atoms/select/select";

export const SelectParser = ({
  options,
  key,
}: {
  [key: string]: any;
  key: string;
}): IOption[] => {
  return Object.keys(options).map((option) => {
    return {
      id: option,
      text: `${option.replaceAll("-", "")}
      (${options[option][key].join(", ")})
      `,
      value: options[option][key],
    };
  });
};
