import { render, screen } from "../../../test/library";
import { ChatMessage } from "./chat-message";

describe("Chat Message", () => {
  it.only("should render a chat message with character, message and name", () => {
    render(<ChatMessage character={1} name="Rod" message="Hello" />);

    const chatMessage = screen.getByRole("@dino-chatmessage");

    const chatMessageImage = screen
      .getByRole("@dino-chatmessage")
      .getElementsByTagName("img")[0];

    expect(chatMessage.innerHTML).toContain("Rod says");

    expect(chatMessage.innerHTML).toContain("Hello");

    expect(chatMessageImage).toHaveAttribute("src", "/src/assets/blue.gif");
  });
});
