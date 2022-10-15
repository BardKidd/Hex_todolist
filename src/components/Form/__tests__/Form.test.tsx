import { getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../header";

test("[Form Header Component][Header render]", async () => {
  const children = "最實用的線上代辦事項服務";
  render(<Header>{children}</Header>);

  const header = screen.getByRole("heading", {
    name: /最實用的線上代辦事項服務/i,
  });

  await expect(header).toBeInTheDocument();
});
