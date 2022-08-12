import { render, screen } from "@testing-library/react";
import { AppBar } from "./AppBar";

test("AppBar is showing", () => {
  render(<AppBar />);

  const input = screen.getByTestId("AppBar");
  expect(input).toBeInTheDocument();
});
