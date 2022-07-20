import { render, userEvent, screen } from "../../../../test/library";
import { SelectCharacter } from "./select-character";

describe("Select Character", () => {
  it("should select the next character if clicked", () => {
    render(<SelectCharacter />);
  });

  it("should select a random character as the default selected", () => {
    render(<SelectCharacter />);
  });
});
