import { render } from "../../../test/library";
import { RoomStart } from "./room-start";

describe.only("Room Start", () => {
  it("should render room Start", () => {
    const wrapper = render(<RoomStart />);

    expect(wrapper).toBeDefined();
  });
});
