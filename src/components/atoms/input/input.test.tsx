import { render, userEvent } from "../../../test/library";
import { Input } from "./input";

describe("Base", () => {
  it("should render Input", () => {
    const wrapper = render(<Input />);

    expect(wrapper).toBeDefined();
  });

  it("should change the placeholder", () => {
    const wrapper = render(<Input placeholder="hello" />);

    const input = wrapper.getByRole("@dino-input");

    expect(input).toHaveAttribute("placeholder", "hello");
  });

  it("should prevent typing if disabled", () => {
    const wrapper = render(<Input placeholder="hello" disabled={true} />);

    const input = wrapper.getByRole("@dino-input");

    userEvent.type(input, "hello");

    expect(input).toHaveValue("");
    expect(input).not.toHaveValue("hello");
  });

  it("should return the value", () => {
    const value = "hello";

    const wrapper = render(<Input placeholder="hello" value={value} />);

    const input = wrapper.getByRole("@dino-input");

    expect(input).toHaveValue("hello");
  });
});
