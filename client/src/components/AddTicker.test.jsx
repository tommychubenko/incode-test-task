import { AddTicker } from "./AddTicker";
import { render, screen } from "@testing-library/react";

test("Add ticker is showing", () => {
  render(<AddTicker />);

  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();
});
