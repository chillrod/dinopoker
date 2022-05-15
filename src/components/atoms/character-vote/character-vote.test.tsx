import { render, screen } from "../../../test/library";
import { IPlayerData } from "../../organisms/dto/playerdata";
import { CharacterVote } from "./character-vote";

describe.only("Character Vote", () => {
  const character: IPlayerData = {
    character: 1,
    name: "Rod",
    vote: null,
    voteStatus: "THINKING",
    id: "1",
  };

  it("should render a character with thinking vote status", () => {
    render(
      <CharacterVote
        character={character.character}
        id={character.id}
        name="Rod"
        vote={character.vote}
        voteStatus={character.voteStatus}
      />
    );

    const characterVote = screen.getByRole("@dino-charactevote");

    // expect(characterVote.innerHTML).toContain("Not voted yet");
  });

  it("should change the color of the card based on votestatus", () => {
    render(
      <>
        <CharacterVote
          character={character.character}
          id={character.id}
          name="Rod"
          vote={character.vote}
          voteStatus="THINKING"
        />

        <CharacterVote
          character={character.character}
          id={character.id}
          name="Rod"
          vote={character.vote}
          voteStatus="SECRET"
        />

        <CharacterVote
          character={character.character}
          id={character.id}
          name="Rod"
          vote={character.vote}
          voteStatus="REVELEAD"
        />
      </>
    );

    const characterVote = screen.getAllByRole("@dino-charactevote");

    expect(characterVote[0]).toHaveAttribute("title", "dino.base2");

    expect(characterVote[1]).toHaveAttribute("title", "dino.primary");

    expect(characterVote[2]).toHaveAttribute("title", "dino.base2");
  });
});
