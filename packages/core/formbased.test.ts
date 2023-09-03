import { Formbased } from "./formbased";

test("initialize formbased without api key", () => {
  expect(() => {
    new Formbased();
  }).toThrow();
});
