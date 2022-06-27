import { render, screen } from "../../../test/library";
import { fn } from "vitest";
import { IconButton } from "./icon-button";
import { ChevronLeft } from "react-feather";

describe("Icon Button Component", () => {
  it("should render button component", () => {
    render(<IconButton ariaLabel="hey" />);

    expect(screen.getByRole("@dino-iconbutton")).toBeInTheDocument();
  });

  it("should prevent click if loading", async () => {
    const fn2 = fn(() => "hello");

    const action = {
      icon: <ChevronLeft />,
      type: "confirm",
      fn: fn2,
    };

    render(
      <IconButton
        onClick={() => fn2()}
        ariaLabel={action.type}
        icon={action.icon}
        loading={true}
      />
    );

    const button = screen.getByRole("@dino-iconbutton");

    button.click();

    expect(button).toHaveAttribute("aria-label", action.type);

    expect(fn2).toHaveBeenCalledTimes(0);
  });
});
