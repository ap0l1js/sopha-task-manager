import { render } from "@testing-library/react";
import { Info } from "../info";

jest.mock("@clerk/nextjs", () => ({
  useOrganization: jest.fn(() => ({
    organization: { name: "Test Organization", imageUrl: "/image.png" },
    isLoaded: true,
  })),
}));

describe("Info", () => {
  it("must render organization info correctly", () => {
    const { getByText, getByAltText } = render(<Info />);

    expect(getByText("Test Organization")).toBeInTheDocument();

    expect(getByAltText("Organization")).toBeInTheDocument();
  });
});
