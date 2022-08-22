import { render, screen } from "@testing-library/react";
import App from "./App";
import data from "./data.json";

describe("Star Wars App", () => {
  it("Should show a list of characters including Luke Skywalker", () => {
    render(<App />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });
});

describe("Should show a lis of characters from a JSON file", () => {
  it("Should show a list of characters including Luke Skywalker", () => {
    render(<App />);
    for (let character of data.results) {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    }
  });
});