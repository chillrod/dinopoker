import { fn } from "vitest";
import { fireEvent, render, screen } from "../../../test/library";
import { RoomConfig } from "./room-config";

describe.only("Room config", () => {
  it("should render room config", () => {
    render(<RoomConfig selectedConfig={() => null} />);

    expect(screen.getByRole("@dino-roomconfig")).toBeInTheDocument();
  });

  it("should push the selected config action", () => {
    const handleChange = (x: any) => x;

    const func = fn(handleChange);

    render(<RoomConfig selectedConfig={(e) => func(e)} />);

    const select = screen.getByRole("@dino-select");

    fireEvent.change(select, { target: { value: "fibonacci" } });

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturned();
  });
});
