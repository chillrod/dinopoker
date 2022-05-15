import { fn } from "vitest";
import { render, screen } from "../../../test/library";
import { CardPoints } from "./card-points";

describe("Card points", () => {
  it("render the card point", () => {
    render(<CardPoints selected={false} point={5} />);

    const card = screen.getByRole("@dino-cardpoint");

    expect(card).toContainHTML("5");
  });

  it("return the current number selected", () => {
    const getNumber = (x: any) => x;

    const func = fn(getNumber);

    render(<CardPoints selected={false} point={5} onClick={func} />);

    const card = screen.getByRole("@dino-cardpoint");

    card.click();

    expect(func).toHaveBeenCalledTimes(1);

    expect(func).toHaveReturnedWith(5);
  });
});
