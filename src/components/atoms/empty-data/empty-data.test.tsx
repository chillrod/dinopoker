import { render, screen } from "../../../test/library";
import { EmptyData } from "./empty-data";

describe("EmptyData", () => {
  it("should display a empty data based on the the data", () => {
    render(<EmptyData data="DinoPoker" />);

    expect(screen.getByText("🤔")).toBeInTheDocument();

    // expect(screen.getByText("Are you sure you want to ACTION")).toBeInTheDocument();
  });
});
