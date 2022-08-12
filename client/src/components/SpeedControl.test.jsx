import { SpeedControl } from "./SpeedControl";
import { render, screen } from "@testing-library/react";

test("Speed control is showing", () => {
  render(<SpeedControl />);

  const input = screen.getByTestId("speed-control");

  expect(input).toBeInTheDocument();
});
