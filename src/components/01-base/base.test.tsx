import { render } from "../../test/library";
import { Base } from "./base";

describe.skip("Base", () => {
  it.skip("should render base", () => {
    const wrapper = render(<Base />);
    expect(wrapper.baseElement).toContainHTML("base");
  });
});
