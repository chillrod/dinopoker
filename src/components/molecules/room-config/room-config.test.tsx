import { fn } from "vitest";
import { fireEvent, render } from "../../../test/library";
import { RoomConfig } from "./room-config";

describe("Room config", () => {
  it("should render room config", () => {
    const wrapper = render(<RoomConfig selectedConfig={() => null} />);

    expect(wrapper).toBeDefined();
  });

  it("should push the selected config action", () => {
    const handleChange = (x: any) => x;

    const func = fn(handleChange);

    const wrapper = render(<RoomConfig selectedConfig={(e) => func(e)} />);

    const select = wrapper.getByRole("@dino-select");

    fireEvent.change(select, { target: { value: "fibonacci" } });

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturned();
  });
});
