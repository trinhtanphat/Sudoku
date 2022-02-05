import { isCoordinatesEqual } from "./isCoordinatesEqual";
it("Can check if 2 coordinates are equal", () => {
  const equalCoor = isCoordinatesEqual(
    { posX: 1, posY: 1 },
    { posX: 1, posY: 1 }
  );
  const unEqualCoor = isCoordinatesEqual(
    { posX: 1, posY: 1 },
    { posX: 0, posY: 1 }
  );
  expect(equalCoor).toBe(true);
  expect(unEqualCoor).toBe(false);
});
