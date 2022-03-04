import { fn } from "vitest";
import { render, screen, userEvent } from "../../../test/library";
import { SelectedCharacter } from "../selected-character/selected-character";
import { RoomStart } from "./room-start";

describe("Room Start", () => {
  it("should render room Start", () => {
    render(<RoomStart />);

    expect(screen.getByRole("@dino-roomstart")).toBeInTheDocument();
  });

  it.todo("should create a new room", () => {});

  it.only("should return the event to join a specific room", () => {
    const returnRoom = (x: string) => x;

    const func = fn(returnRoom);

    render(<RoomStart joinRoom={func} />);

    userEvent.type(screen.getByRole("@dino-input"), "test");

    userEvent.click(screen.getByRole("@dino-iconbutton"));

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturnedWith("test");
  });

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
