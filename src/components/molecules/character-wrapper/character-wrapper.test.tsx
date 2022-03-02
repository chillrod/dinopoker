import { render, screen } from "../../../test/library";
import { CharacterWrapper } from "./character-wrapper";

import YellowDino from "../../../assets/yellow.gif";
import BlueDino from "../../../assets/blue.gif";

describe("Character Wrapper", () => {
  const characters = [
    {
      id: 0,
      src: YellowDino,
    },
    {
      id: 1,
      src: BlueDino,
    },
    {
      id: 2,
      src: BlueDino,
    },
  ];

  const borderStyle = {
    border: "4px",
    borderStyle: "dotted",
    borderColor: "dino.primary",
  };

  it("should render multiple cards and paint the border on the selected", async () => {
    render(<CharacterWrapper characters={characters} />);

    const cards = screen.getAllByRole("@dino-charactercard");

    const secondCard = cards[1];

    const thirdCard = cards[2];

    secondCard.click();

    expect(secondCard).toHaveStyle(borderStyle);

    thirdCard.click();

    expect(secondCard).not.toHaveStyle(borderStyle);
  });

  it("should change character if clicked on arrow next", async () => {
    render(<CharacterWrapper characters={characters} />);

    const cards = screen.getAllByRole("@dino-charactercard");
    const secondCard = cards[1];

    const arrowNext = screen.getAllByRole("@dino-iconbutton")[1];

    arrowNext.click();

    expect(secondCard).toHaveStyle({
      border: "4px",
      borderStyle: "dotted",
      borderColor: "dino.primary",
    });
  });

  it("should reset character position if clicked on arrow next on last item", async () => {
    render(<CharacterWrapper characters={characters} />);

    const cards = screen.getAllByRole("@dino-charactercard");
    const firstCard = cards[0];

    const arrowNext = screen.getAllByRole("@dino-iconbutton")[1];

    arrowNext.click();
    arrowNext.click();
    arrowNext.click();

    expect(firstCard).toHaveStyle(borderStyle);
  });

  it("should select prev character if arrow back", async () => {
    render(<CharacterWrapper characters={characters} />);

    const cards = screen.getAllByRole("@dino-charactercard");

    const lastCard = cards[cards.length - 1];

    const arrowBack = screen.getAllByRole("@dino-iconbutton")[0];

    arrowBack.click();

    expect(lastCard).toHaveStyle(borderStyle);
  });
});
