import { render, screen } from "../../../../test/library";

import { Player } from "./player";

describe("Player", () => {
  it("should render the first dino Player (yellow)", () => {
    render(<Player />);

    const dinoImage = screen.getByRole("@dino-image");

    expect(screen.getByText("Select your Player")).toBeInTheDocument();

    expect(dinoImage).toHaveAttribute(
      "src",
      "/src/view/home/components/player/assets/yellow.gif"
    );
  });

  it("should change from yellow dino to green dino if clicks in next", () => {
    render(<Player />);

    const dinoImage = screen.getByRole("@dino-image");

    const advanceBtn = screen.getByRole("@dino-buttonnext");

    advanceBtn.click();

    expect(dinoImage).toHaveAttribute(
      "src",
      "/src/view/home/components/player/assets/green.gif"
    );
  });

  it("should change from yellow dino to blue dino if clicks in back", () => {
    render(<Player />);

    const dinoImage = screen.getByRole("@dino-image");

    const backBtn = screen.getByRole("@dino-buttonback");

    backBtn.click();

    expect(dinoImage).toHaveAttribute(
      "src",
      "/src/view/home/components/player/assets/blue.gif"
    );
  });
});
