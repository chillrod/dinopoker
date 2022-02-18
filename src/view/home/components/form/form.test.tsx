import { render, screen } from "../../../../test/library";
import { Form } from "./form";

describe("Player Form", () => {
  it("should render the form in home view", () => {
    render(<Form />);

    const nameInput = screen.getByRole("@dino-inputname");
    const codeInput = screen.getByRole("@dino-inputcode");

    expect(nameInput).toBeInTheDocument();
    expect(codeInput).toBeInTheDocument();
  });
});
