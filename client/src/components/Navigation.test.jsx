import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

test("Navigation is showing", () => {
  render(<Navigation />);

  const input = screen.getByTestId("navigation");
  expect(input).toBeInTheDocument();
});
