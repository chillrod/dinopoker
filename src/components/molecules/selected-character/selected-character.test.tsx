import { render, screen, userEvent } from "../../../test/library";
import { CharacterWrapper } from "../character-wrapper/character-wrapper";
import { SelectedCharacter } from "./selected-character";

import BlueDino from "../../../assets/blue.gif";
import YellowDino from "../../../assets/yellow.gif";
import { RoomStart } from "../room-start/room-start";

describe("Selected Character", () => {
  it("should render room config", () => {
    render(<SelectedCharacter />);

    expect(screen.getByRole("@dino-selectchar")).toBeDefined();
  });

  it("should show the selected character", () => {
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

    render(
      <div>
        <CharacterWrapper characters={characters} />
        <SelectedCharacter />
      </div>
    );

    const blueDino = screen.getAllByRole("@dino-charactercard")[1];

    blueDino.click();

    const selectedCharacter = screen.getByRole("@dino-selectchar");

    const children = selectedCharacter.getElementsByTagName("img")[0];

    expect(children).toHaveAttribute("src", "/src/assets/blue.gif");
  });

  it("should emit the character name and enable room start button", () => {
    render(
      <div>
        <SelectedCharacter />
        <RoomStart />
      </div>
    );

    const input = screen.getAllByRole("@dino-input")[0];

    userEvent.type(input, "test");

    const createRoom = screen.getByRole("@dino-button");

    expect(createRoom).toBeEnabled();
  });
});
