import { render, userEvent, screen } from "../../../test/library";
import { Input } from "./input";

describe("Base", () => {
  it("should render Input", () => {
    render(<Input />);

    expect(screen.getByRole("@dino-input")).toBeInTheDocument();
  });

  it("should change the placeholder", () => {
    render(<Input placeholder="hello" />);

    const input = screen.getByRole("@dino-input");

    expect(input).toHaveAttribute("placeholder", "hello");
  });

  it("should prevent typing if disabled", () => {
    render(<Input placeholder="hello" disabled={true} />);

    const input = screen.getByRole("@dino-input");

    userEvent.type(input, "hello");

    expect(input).toHaveValue("");
    expect(input).not.toHaveValue("hello");
  });

  it("should return the value", () => {
    const value = "hello";

    render(<Input placeholder="hello" value={value} />);

    const input = screen.getByRole("@dino-input");

    expect(input).toHaveValue("hello");
  });
});
