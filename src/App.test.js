import { render, screen } from "@testing-library/react";
import {jest} from '@jest/globals';
import App from "./App";
import data from "./data.json";

describe("Star Wars App", () => {
  beforeAll(() => jest.spyOn(window, fetch));
  
  it('"Should show a lis of characters from the API', async () => {
    Window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => data,
    });
    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("https://swapi.dev/api/people/");

    for (let character of data.results) {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    }
  });
  it('should show a error message when has a network error',async ()=>{
    window.fetch.mockResolvedValueOnce(new Error("Network Error"))
    render(<App/>);
    expect(await screen.findByText('Network Error')).toBeInTheDocument(); 
  })
});
