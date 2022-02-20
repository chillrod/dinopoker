import { render } from "../../../test/library";
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
    const wrapper = render(
      <div>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );

    const element = wrapper;

    const card = element.getAllByRole("@dino-charactercard");

    const img = card[0].getElementsByTagName("img")[0];

    expect(img).toHaveAttribute("src", YellowDino);
  });
});
