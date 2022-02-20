import { fn } from "vitest";
import { fireEvent, render } from "../../../test/library";
import { IOption, Select } from "./select";

describe.only("Select", () => {
  const options: IOption[] = [
    {
      action: () => "SELECTED_OPTION_FIBONACCI01",
      value: "Hi There",
      text: "Hi",
    },
    {
      action: () => "logged",
      value: "Its testing",
      text: "Testing",
    },
  ];

  it("should render Select", () => {
    const wrapper = render(<Select options={options} />);

    expect(wrapper).toBeDefined();
  });

  it("should select the first value and emit the value action", async () => {
    const handleSelectValue = (e: any) => {
      const emitEvent = options.find((item) => e.target.value === item.value);

      emitEvent?.action();

      const value = e.target.value;

      return value;
    };

    const handleFunc = () => "Hi there";

    const func = fn(handleSelectValue);

    const wrapper = render(
      <Select options={options} onChange={(e) => func(e)} />
    );

    const select = wrapper.getByRole("@dino-select");
    const option = wrapper.getAllByRole("@dino-selectoption")[1];

    fireEvent.change(select, {
      target: { option },
    });

    expect(func).toBeCalledTimes(1);
  });

  it("should disable selection if disabled", () => {
    const handleSelectValue = (e: any) => {
      return e.target.value;
    };

    const func = fn(handleSelectValue);

    const wrapper = render(
      <Select options={options} disabled={true} onChange={(e) => func(e)} />
    );

    const select = wrapper.getByRole("@dino-select");
    const option = wrapper.getAllByRole("@dino-selectoption")[0];

    fireEvent.click(select);
    expect(option).toBeDisabled();
    expect(option).toBeDisabled();
  });

  it("should change auto select value if prefetched data", () => {
    const handleSelectValue = (e: any) => {
      return e.target.value;
    };

    const func = fn(handleSelectValue);

    const wrapper = render(
      <Select
        options={options}
        selected={options[1].value}
        onChange={(e) => func(e)}
      />
    );

    const select = wrapper.getByRole("@dino-select");

    expect(select).toHaveValue(options[1].value);
  });
});