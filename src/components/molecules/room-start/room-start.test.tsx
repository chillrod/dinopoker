import { render, screen, userEvent } from "../../../test/library";
import { SelectedCharacter } from "../selected-character/selected-character";
import { RoomStart } from "./room-start";

describe("Room Start", () => {
  it("should render room Start", () => {
    render(<RoomStart />);

    expect(screen.getByRole("@dino-roomstart")).toBeInTheDocument();
  });

  it.todo("should create a new room", () => {});

  it.todo("should join a existing room", () => {});

  it.todo(
    "should create a room with default character and point system if no selected",
    () => {}
  );

  it("should enable create room only if name is provided", () => {
    render(
      <div>
        <SelectedCharacter />
        <RoomStart />
      </div>
    );

    const characterName = screen
      .getByRole("@dino-selectchar")
      .getElementsByTagName("input")[0];

    userEvent.type(characterName, "Dino");

    const roomStart = screen
      .getByRole("@dino-roomstart")
      .getElementsByTagName("button")[1];

    expect(roomStart).toBeEnabled();

    userEvent.clear(characterName);

    expect(roomStart).toBeDisabled();
  });
});
