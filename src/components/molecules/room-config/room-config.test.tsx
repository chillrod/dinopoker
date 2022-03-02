import { fn } from "vitest";
import { fireEvent, render, screen, userEvent } from "../../../test/library";
import { RoomConfig } from "./room-config";

describe("Room config", () => {
  it("should render room config", () => {
    render(<RoomConfig />);

    expect(screen.getByRole("@dino-roomconfig")).toBeInTheDocument();
  });

  it("should push the selected config action", () => {
    // need to test this better. need to check if i can test mitt events
    render(<RoomConfig />);

    const select = screen.getByRole("@dino-select");
    const option = screen.getAllByRole("@dino-selectoption")[1];
    const option2 = screen.getAllByRole("@dino-selectoption")[0];

    userEvent.selectOptions(select, [option]);

    expect(select).toHaveValue("1");

    userEvent.selectOptions(select, [option2]);

    expect(select).toHaveValue("0");
  });
});
