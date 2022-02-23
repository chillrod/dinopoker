import { render, screen } from "../../../test/library";
import { CharacterCard } from "./character-card";

import YellowDino from "../../../assets/yellow.gif";
import BlueDino from "../../../assets/blue.gif";

describe("Character card", () => {
  const characters = [
    {
      id: 0,
      src: YellowDino,
    },
    {
      id: 1,
      src: BlueDino,
    },
  ];

  it("should render multiple cards and get the src of the first", async () => {
    render(
      <div>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );

    const element = screen;

    const card = element.getAllByRole("@dino-charactercard");

    const img = card[0].getElementsByTagName("img")[0];

    expect(img).toHaveAttribute("src", YellowDino);
  });

  it("should display different bg colors if isSelectedScreen prop is provided", () => {
    render(<CharacterCard character={characters[0]} isSelectedScreen />);

    const characterCard = screen.getByRole("@dino-charactercard");

    expect(characterCard).toHaveStyle({
      backgroundColor: "dino.primary",
    });
  });

  it("should display empty src string if no image is provided", () => {
    const character = {
      id: 0,
    };

    render(<CharacterCard character={character} isSelectedScreen />);

    const characterCard = screen
      .getByRole("@dino-charactercard")
      .getElementsByTagName("img");

    expect(characterCard[0]).toHaveAttribute("src", "");
  });
});
