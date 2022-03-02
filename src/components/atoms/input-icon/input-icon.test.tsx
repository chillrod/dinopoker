import { fn } from "vitest";
import { fireEvent, render, screen } from "../../../test/library";
import { InputIcon } from "./input-icon";

describe("Input Icon Component", () => {
  it("should render input icon", () => {
    render(<InputIcon ariaLabel="Hello" />);

    expect(screen.getByRole("@dino-inputicon")).toBeDefined();
  });

  it("should enable the button if input value has changed", () => {
    render(<InputIcon ariaLabel="Hello" value="hello" />);

    const input = screen.getByRole("@dino-input");
    const button = screen.getByRole("@dino-iconbutton");

    expect(button).toBeEnabled();
  });

  it("should put the component in loading state if loading", () => {
    render(<InputIcon ariaLabel="Hello" loading />);

    const button = screen.getByRole("@dino-iconbutton");
    const loading = screen.getByRole("@dino-input");

    expect(button).toBeDisabled();
    expect(loading).toBeDisabled();
  });

  it("should emit the value from the input when button click", () => {
    const handleChange = (x: any) => {
      return x;
    };

    const func = fn(handleChange);

    render(<InputIcon ariaLabel="Hello" value="hi" confirm={func} />);

    const button = screen.getByRole("@dino-iconbutton");

    fireEvent.click(button);

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturnedWith("hi");
  });
});
