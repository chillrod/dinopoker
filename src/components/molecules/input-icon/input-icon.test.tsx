import { fn } from "vitest";
import { fireEvent, render } from "../../../test/library";
import { InputIcon } from "./input-icon";

describe("Input Icon Component", () => {
  it("should render input icon", () => {
    const wrapper = render(<InputIcon ariaLabel="Hello" />);

    expect(wrapper).toBeDefined();
  });

  it("should enable the button if input value has changed", () => {
    const wrapper = render(<InputIcon ariaLabel="Hello" value="hello" />);

    const input = wrapper.getByRole("@dino-input");
    const button = wrapper.getByRole("@dino-iconbutton");

    expect(button).toBeEnabled();
  });

  it("should put the component in loading state if loading", () => {
    const wrapper = render(<InputIcon ariaLabel="Hello" loading />);

    const button = wrapper.getByRole("@dino-iconbutton");
    const loading = wrapper.getByRole("@dino-input");

    expect(button).toBeDisabled();
    expect(loading).toBeDisabled();
  });

  it("should emit the value from the input when button click", () => {
    const handleChange = (x: any) => {
      return x;
    };

    const func = fn(handleChange);

    const wrapper = render(
      <InputIcon ariaLabel="Hello" value="hi" confirm={func} />
    );

    const button = wrapper.getByRole("@dino-iconbutton");

    fireEvent.click(button);

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturnedWith("hi");
  });
});
