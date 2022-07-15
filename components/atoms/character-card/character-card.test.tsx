import { render, screen } from "../../../test/library";
import { CharacterCard } from "./character-card";

import { CharacterList } from "../../../config/characters";

describe("Character card", () => {
  it("should render multiple cards and get the src of the first", async () => {
    render(
      <div>
        {CharacterList.map((character) => (
          <CharacterCard key={character.id} characterId={character.id} />
        ))}
      </div>
    );

    const element = screen;

    const card = element.getAllByRole("@dino-charactercard");

    const img = card[0].getElementsByTagName("img")[0];

    expect(img).toHaveAttribute("src", "/src/assets/yellow.gif");
  });

  it("should display a yellow dino if no characterId is provided", () => {
    render(<CharacterCard />);

    const characterCard = screen
      .getByRole("@dino-charactercard")
      .getElementsByTagName("img");

    expect(characterCard[0]).toHaveAttribute("src", "/src/assets/yellow.gif");
  });
});
