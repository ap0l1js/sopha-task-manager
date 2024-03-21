import { fireEvent, render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { Navbar } from "../navbar";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Navbar", () => {
  it("must render the login and register buttons correctly", () => {
    const wrapper = render(<Navbar />);

    const loginButton = wrapper.getByText("Entrar");
    const registerButton = wrapper.getByText("Criar conta");

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("must navigate to /sign-in and /sign-up", () => {
    mockRouter.push("/");

    const wrapper = render(<Navbar />, {
      wrapper: MemoryRouterProvider,
    });

    const loginButton = wrapper.getByText("Entrar");
    const registerButton = wrapper.getByText("Criar conta");

    fireEvent.click(loginButton);

    expect(mockRouter.asPath).toEqual("/sign-in");

    fireEvent.click(registerButton);

    expect(mockRouter).toMatchObject({
      asPath: "/sign-up",
    });
  });
});
