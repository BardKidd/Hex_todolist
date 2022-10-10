import { Logo } from "../DecorateBox";
import { render, screen } from "@testing-library/react";

test("Render DecorateBox", async () => {
  const { container } = render(<Logo />);
  screen.debug(container);
  // screen.getByRole('img', {
  //   name: /裝飾標題相片/i
  // })

  // expect(container).toMatchInlineSnapshot();
});
