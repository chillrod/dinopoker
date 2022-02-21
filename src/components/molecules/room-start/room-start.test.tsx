import { fn } from "vitest";
import { fireEvent, render, userEvent } from "../../../test/library";
import { RoomStart } from "./room-start";

describe("Room Start", () => {
  it("should render room Start", () => {
    const wrapper = render(<RoomStart onCreateRoom={() => null} />);

    expect(wrapper).toBeDefined();
  });

  it("should create a new room", () => {
    const handleCreate = (x: any) => x;

    const func = fn(handleCreate);

    const wrapper = render(<RoomStart onCreateRoom={func} />);

    const btn = wrapper.getByRole("@dino-button");

    fireEvent.click(btn);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveReturnedWith("CREATE_ROOM");
  });

  // it.skip("should join a existing room", () => {
  //   const handleJoinRoom = (x: any) => x;

  //   const func = fn(handleJoinRoom);

  //   const wrapper = render(
  //     <RoomStart onCreateRoom={() => null} onJoinRoom={func} />
  //   );

  //   const input = wrapper.getByRole("@dino-input");

  //   userEvent.type(input, "123");

  //   fireEvent.click(btn);

  //   expect(func).toHaveBeenCalledTimes(1);
  //   expect(func).toHaveReturnedWith("CREATE_ROOM");
  // });
});
