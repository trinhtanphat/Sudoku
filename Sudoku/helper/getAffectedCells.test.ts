import { getAffectedCells } from "./getAffectedCells";
it("can get affected cells from a coordinate", () => {
  const received = getAffectedCells(0, 0);
  const expected = [
    { posX: 0, posY: 0 },
    { posX: 1, posY: 0 },
    { posX: 2, posY: 0 },
    { posX: 0, posY: 1 },
    { posX: 1, posY: 1 },
    { posX: 2, posY: 1 },
    { posX: 0, posY: 2 },
    { posX: 1, posY: 2 },
    { posX: 2, posY: 2 },
    { posX: 0, posY: 0 },
    { posX: 0, posY: 0 },
    { posX: 0, posY: 1 },
    { posX: 1, posY: 0 },
    { posX: 0, posY: 2 },
    { posX: 2, posY: 0 },
    { posX: 0, posY: 3 },
    { posX: 3, posY: 0 },
    { posX: 0, posY: 4 },
    { posX: 4, posY: 0 },
    { posX: 0, posY: 5 },
    { posX: 5, posY: 0 },
    { posX: 0, posY: 6 },
    { posX: 6, posY: 0 },
    { posX: 0, posY: 7 },
    { posX: 7, posY: 0 },
    { posX: 0, posY: 8 },
    { posX: 8, posY: 0 },
  ];
  expect(received).toEqual(expected);
  expect(received.length).toBe(27);
});
