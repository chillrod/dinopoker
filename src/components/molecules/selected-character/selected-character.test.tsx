import { render, screen } from "../../../test/library";
import { SelectedCharacter } from "./selected-character";

describe("Selected Character", () => {
  it("should render room config", () => {
    const character = { id: 1, src: "/src/assets/blue.gif" };

    render(<SelectedCharacter character={character} />);

    expect(screen.getByRole('@dino-selectchar')).toBeDefined();
  });

  it("should show the selected character", () => {
    const character = { id: 1, src: "/src/assets/blue.gif" };

    render(<SelectedCharacter character={character} />);

    const find = screen.getByRole("@dino-characterimg");

    expect(find).toHaveAttribute("src", "/src/assets/blue.gif");
  });

  it("should show the empty character if no src provided", () => {
    render(<SelectedCharacter />);

    const find = screen.getByRole("@dino-nocharacter");

    expect(find).toBeInTheDocument();
  });
});
