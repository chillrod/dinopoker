import { render, hooks } from "../../test/library";
import { fn } from "vitest";
import { Button } from "./button";
import { callAction } from "./hooks";

describe("Button Component", () => {
  it.skip("should render button component", () => {
    const wrapper = render(<Button />);
    expect(wrapper).toBeDefined();
  });

  it.skip("should render button component with text", () => {
    const wrapper = render(<Button>hey</Button>);

    expect(wrapper.getByText("hey")).toBeDefined();
  });

  it.skip("should emit a action when clicked", () => {
    const payload = () => "actionMade";

    const fn2 = fn(payload);

    const action = {
      type: "confirm",
      fn: fn2,
    };

    const wrapper = render(<Button action={action}>test</Button>);

    wrapper.getByRole("@dino-button").click();

    expect(fn2).toHaveBeenCalledTimes(1);

    expect(fn2).toHaveReturnedWith("actionMade");
  });

  it("should prevent click if loading", async () => {
    const payload = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve("actionMade"), 1000);
      });
    };

    const fn2 = fn(payload);

    const action = {
      type: "confirm",
      fn: fn2,
    };

    const wrapper = render(
      <Button action={action} loading={true}>
        test
      </Button>
    );

    const button = wrapper.getByRole("@dino-button");

    button.click();

    expect(fn2).toHaveBeenCalledTimes(0);
  });
});
