import { render, screen } from "../../../test/library";
import { fn } from "vitest";
import { Button } from "./button";

describe("Button Component", () => {
  const renderElement = (text?: string) => render(<Button>{text}</Button>);
  const renderElementFn = (fn: () => void) =>
    render(<Button onClick={() => fn()} loading={true} />);

  it("should render button component", () => {
    renderElement();

    expect(screen.getByRole("@dino-button")).toBeInTheDocument();
  });

  it("should render button component with text", () => {
    renderElement("Button");

    expect(screen.getByRole("@dino-button")).toHaveTextContent("Button");
  });

  it("should prevent click if loading", async () => {
    const func = fn(() => "hello");

    renderElementFn(func);

    const btn = screen.getByRole("@dino-button");

    btn.click();

    expect(func).toHaveBeenCalledTimes(0);
  });
});
