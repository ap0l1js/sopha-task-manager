import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MarketingPage from "../page";

test("MarketingPage", () => {
  render(<MarketingPage />);
  expect(screen.getByText("Entrar")).toBeDefined();
});
