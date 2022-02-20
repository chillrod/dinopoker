import { IOption, Select } from "../components/atoms/select/select";
import { Home } from "../view/home";

export const App = () => {
  const options: IOption[] = [
    {
      action: () => "emitted",
      value: "Hi There",
      text: "Hi",
    },
    {
      action: () => "logged",
      value: "Its testing",
      text: "Testing",
    },
  ];

  const handleSelectValue = (e: any) => {
    return e.target.value;
  };

  return <Select options={options} onChange={(e) => handleSelectValue(e)} />;
};
