import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { IOption, Select } from "../components/atoms/select/select";
import { InputIcon } from "../components/molecules/input-icon/input-icon";

export const App = () => {
  const [input, setInput] = useState("");
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

  const handleChange = (x: any) => {
    return x;
  };

  return (
    <>
      <InputIcon
        placeholder="Room code"
        value={input}
        ariaLabel="Join a room"
        confirm={handleChange}
      />
    </>
  );
};
