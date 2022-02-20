import { chakra, Select as Sl } from "@chakra-ui/react";

type IOption = {
  action: () => void;
  text: string;
  value: string;
};

interface ISelect {
  options: IOption[];
}

const Option = chakra("option", {});

export const Select = ({ options }: ISelect) => {
  return (
    <Sl>
      {options.map((option) => (
        <Option
          key={option.text}
          value={option.value}
          onChange={() => option.action()}
        />
      ))}
    </Sl>
  );
};
