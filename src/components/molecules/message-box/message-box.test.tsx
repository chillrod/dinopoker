import { fn } from "vitest";
import { render, screen } from "../../../test/library";
import { MessageBox } from "./message-box";

describe("Message Box", () => {
  it("should render the message box with a default message", () => {
    render(
      <>
        <MessageBox open={true} />
      </>
    );

    const dialog = screen.getByRole("@dino-dialogcontent");

    // expect(dialog).toHaveTextContent("Are you sure you want to ACTION");
  });

  // it("should return the action with onConfirm", () => {
  //   const returnMessage = (message: string) => message;

  //   const func = fn(returnMessage);
  //   render(
  //     <>
  //       <MessageBox open={true} onConfirm={() => func("hello")} />
  //     </>
  //   );

  //   const confirmBtn = screen.getByRole("@dino-button");

  //   confirmBtn.click();

  //   expect(func).toHaveBeenCalledTimes(1);
  //   expect(func).toHaveReturnedWith("hello");
  // });
});
