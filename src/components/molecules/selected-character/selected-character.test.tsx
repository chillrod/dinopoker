import { render } from "../../../test/library";
import { SelectedCharacter } from "./selected-character";

describe("Selected Character", () => {
  it("should render room config", () => {
    const character = { id: 1, src: "/src/assets/blue.gif" };

    const wrapper = render(<SelectedCharacter character={character} />);

    expect(wrapper).toBeDefined();
  });

  it("should show the selected character", () => {
    const character = { id: 1, src: "/src/assets/blue.gif" };

    const wrapper = render(<SelectedCharacter character={character} />);

    const find = wrapper.getByRole("@dino-characterimg");

    expect(find).toHaveAttribute("src", "/src/assets/blue.gif");
  });

  it("should show the empty character if no src provided", () => {
    const wrapper = render(<SelectedCharacter />);

    const find = wrapper.getByRole("@dino-nocharacter");

    expect(find).toBeInTheDocument();
  });
});
