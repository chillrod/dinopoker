import { render } from "../../../test/library";
import { fn } from "vitest";
import { Button } from "./button";

describe("Button Component", () => {
  it("should render button component", () => {
    const wrapper = render(<Button />);
    expect(wrapper).toBeDefined();
  });

  it("should render button component with text", () => {
    const wrapper = render(<Button>hey</Button>);

    expect(wrapper.getByText("hey")).toBeDefined();
  });

  it.only("should prevent click if loading", async () => {
    const func = fn(() => "hello");

    const wrapper = render(
      <Button onClick={() => func} loading={true}>
        test
      </Button>
    );

    const button = wrapper.getByRole("@dino-button");

    button.click();

    expect(func).toHaveBeenCalledTimes(0);
  });
});
