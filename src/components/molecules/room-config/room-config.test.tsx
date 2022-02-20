import { render } from "../../../test/library";
import { RoomConfig } from "./room-config";

describe.only("Room config", () => {
  it("should render room config", () => {
    const wrapper = render(<RoomConfig selectedConfig={() => null} />);

    expect(wrapper).toBeDefined();
  });

  it.todo("should push the selected config action");
});
