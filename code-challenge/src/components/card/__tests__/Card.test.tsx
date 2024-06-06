import { render, screen } from "@testing-library/react";
import Card from "../index";

describe("Card component", () => {
  it("renders children", () => {
    const ChildComponent = () => <div data-testid="child">Child component</div>;

    render(
      <Card>
        <ChildComponent />
      </Card>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies correct styles", () => {
    const childText = "Child component";
    const ChildComponent = () => <div>{childText}</div>;

    render(
      <Card>
        <ChildComponent />
      </Card>
    );

    const cardElement = screen.getByTestId("card");
    expect(cardElement).toHaveStyle(`
      min-width: 300px;
      width: fit-content;
      max-width: 90%;
      border-radius: 7px;
      background-color: #444444;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    `);
  });
});
