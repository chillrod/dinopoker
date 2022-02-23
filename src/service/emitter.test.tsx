import { render, screen } from "../test/library";
import { EmitTest, EmitButton } from "./emitTest";

describe("Event emitter", () => {
  it("should update the count state based on the event", () => {
    render(<EmitTest />);
    render(<EmitButton />);

    const btn = screen.getByRole("@emit-btn");
    const count = screen.getByRole("@emit-count");

    btn.click();

    expect(count).toHaveTextContent("1");

    btn.click();
    expect(count).toHaveTextContent("2");
  });
});
