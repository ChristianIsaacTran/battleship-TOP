/* eslint-disable no-undef */
import { describe, test, jest, expect } from "@jest/globals";
import ship from "./ship.js";

describe("Ship factory tests", () => {
    const testShip = ship(5);

    test("hit() test. Increase hit from 0 to 1", () => {
        testShip.hit();
        expect(testShip.getHits()).toBe(1);
    });

    test("hit() test. Increase hit from 1 to 3", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.getHits()).toBe(3);
    });

    test("isSunk() test. returns that the ship is not sunk, false", () => {
        expect(testShip.isSunk()).toBe(false);
    });

    test("isSunk() test. returns that the ship has been sunk when its been hit 5 times, true", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });
});
