import { fn } from "vitest";
import { fireEvent, render, screen } from "../../../test/library";
import { RoomStart } from "./room-start";

describe("Room Start", () => {
  it("should render room Start", () => {
    render(<RoomStart onCreateRoom={() => null} />);

    expect(screen.getByRole("@dino-roomstart")).toBeDefined();
  });

  it("should create a new room", () => {
    const handleCreate = (x: any) => x;

    const func = fn(handleCreate);

    render(<RoomStart onCreateRoom={func} />);

    const btn = screen.getByRole("@dino-button");

    fireEvent.click(btn);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveReturnedWith("CREATE_ROOM");
  });

  // it.skip("should join a existing room", () => {
  //   const handleJoinRoom = (x: any) => x;

  //   const func = fn(handleJoinRoom);

  //   const screen = render(
  //     <RoomStart onCreateRoom={() => null} onJoinRoom={func} />
  //   );

  //   const input = wrapper.getByRole("@dino-input");

  //   userEvent.type(input, "123");

  //   fireEvent.click(btn);

  //   expect(func).toHaveBeenCalledTimes(1);
  //   expect(func).toHaveReturnedWith("CREATE_ROOM");
  // });
});
