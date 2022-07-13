import { fn } from "vitest";
import { render, screen, userEvent } from "../../../test/library";
import { IOption, Select } from "./select";

describe("Select", () => {
  const options: IOption[] = [
    {
      id: 0,
      text: "Modified Fibonacci (0.5, 2, 30...)",
      value: [0, 0.5, 1, 2, 3, 5, 8, 13, 21],
    },
    {
      id: 1,
      text: "Fibonacci (0.5, 2, 30...)",
      value: [0, 0.5, 1, 2, 3, 5, 8, 13, 21],
    },
  ];

  it("should render Select", () => {
    render(<Select options={options} />);

    expect(screen.getByRole("@dino-select")).toBeInTheDocument();
  });

  it("should select the first value and return the value", async () => {
    const handleSelectValue = (e: any) => {
      const value = parseInt(e.target.value);

      return options.find((option) => option.id === value);
    };

    const func = fn(handleSelectValue);

    render(<Select options={options} onChange={(e) => func(e)} />);

    const select = screen.getByRole("@dino-select");

    const option = screen.getAllByRole("@dino-selectoption")[1];

    userEvent.selectOptions(select, [option]);

    expect(func).toBeCalledTimes(1);

    expect(func).toHaveReturnedWith(options[1]);
  });

  it("should disable selection if disabled", () => {
    const handleSelectValue = (e: any) => {
      return e.target.value;
    };

    const func = fn(handleSelectValue);

    render(
      <Select options={options} disabled={true} onChange={(e) => func(e)} />
    );

    const select = screen.getByRole("@dino-select");
    const option = screen.getAllByRole("@dino-selectoption")[1];

    userEvent.selectOptions(select, [option]);

    expect(option).toBeDisabled();
    expect(option).toBeDisabled();

    expect(func).toBeCalledTimes(0);
  });

  it("should change auto select value if prefetched data", () => {
    render(<Select options={options} selected={options[1].id} />);

    const select = screen.getByRole("@dino-select");

    expect(select).toHaveValue("1");
  });
});
