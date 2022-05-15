import { fn } from "vitest";
import { render, userEvent, screen } from "../../../test/library";
import { InputNumber } from "./input-number";

describe.only("Base", () => {
  it("should render Input", () => {
    render(<InputNumber />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("should change the placeholder", () => {
    render(<InputNumber placeholder="hello" />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("placeholder", "hello");
  });

  it("should prevent typing if disabled", () => {
    render(<InputNumber placeholder="hello" disabled={true} />);
    const input = screen.getByRole("spinbutton");
    userEvent.type(input, "3");
    expect(input).toHaveValue("");
    expect(input).not.toHaveValue("3");
  });

  it("should return the value", () => {
    const value = 3;
    render(<InputNumber placeholder="hello" value={value} />);
    const input = screen.getByRole("spinbutton");

    expect(input).toHaveValue("3");
  });

  it("should prevent typing if disabled", () => {
    const returnNum = (num: any) => num;

    const func = fn(returnNum);

    render(<InputNumber placeholder="hello" onChange={(e) => func(e)} />);

    const input = screen.getByRole("spinbutton");

    userEvent.type(input, "3");

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturnedWith("3");
  });
});
