import { render } from "../../../test/library";
import { fn } from "vitest";
import { IconButton } from "./icon-button";
import { ChevronLeftIcon } from "@chakra-ui/icons";

describe.only("Icon Button Component", () => {
  it("should render button component", () => {
    const wrapper = render(<IconButton ariaLabel="hey" />);
    expect(wrapper).toBeDefined();
  });

  it("should prevent click if loading", async () => {
    const fn2 = fn(() => "hello");

    const action = {
      icon: <ChevronLeftIcon />,
      type: "confirm",
      fn: fn2,
    };

    const wrapper = render(
      <IconButton
        onClick={() => fn2()}
        ariaLabel={action.type}
        icon={action.icon}
        loading={true}
      />
    );

    const button = wrapper.getByRole("@dino-iconbutton");

    button.click();

    expect(button).toHaveAttribute("aria-label", action.type);

    expect(fn2).toHaveBeenCalledTimes(0);
  });
});
