/* eslint-disable no-undef */
import { describe, test, jest, expect } from "@jest/globals";
import gameboard from "./gameboard.js";
import ship from "./ship.js";
/*
    coordinates are going to be given in battleship [letter, number] format, with letter and number being strings
    ex: [B, 8]
*/
describe("gameboard factory tests", () => {
    let testGameboard;
    
    beforeEach(() => {
        testGameboard = gameboard();
    });

    test("placeShip() test. returns false if the coordinates given are out of bounds", () => {
        const testShip = ship(3);
        expect(testGameboard.placeShip(testShip, ["B","11"], "right")).toBe(false);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going right, should return false (it fits)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(testShip.getLength(), 1, 1, "right");
        expect(result).toEqual(false);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going left, should return true (goes out of bounds)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(testShip.getLength(), 1, 1, "left");
        expect(result).toEqual(true);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going up, should return true (goes out of bounds)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(testShip.getLength(), 1, 1, "up");
        expect(result).toEqual(true);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going down, should return false (it fits)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(testShip.getLength(), 1, 1, "down");
        expect(result).toEqual(false);
    });

    test("placeShip() test. place a carrier (5 spaces) within the board at position (1,1) going right", () => {
        const testShip = ship(5);

        expect(testGameboard.placeShip(testShip, ["A","1"], "right")).toBe(true);

        console.log([...testGameboard.getBoard().entries()]);

        const keyIterator = testGameboard.getBoard().keys();
        
        expect(keyIterator.next().value).toBe("1,1");
        expect(keyIterator.next().value).toBe("2,1");
        expect(keyIterator.next().value).toBe("3,1");
        expect(keyIterator.next().value).toBe("4,1");
        expect(keyIterator.next().value).toBe("5,1");
    });

    // test("placeShip() test. place a battleship (4 spaces) within the board", () => {
    //     expect(testGameboard.placeShip()).toBe(true);
    // });

    // test("placeShip() test. place a cruiser (3 spaces) within the board", () => {
    //     expect(testGameboard.placeShip()).toBe(true);
    // });

    // test("placeShip() test. place a submarine (3 spaces) within the board", () => {
    //     expect(testGameboard.placeShip()).toBe(true);
    // });

    // test("placeShip() test. place a destroyer (2 spaces) within the board", () => {
    //     expect(testGameboard.placeShip()).toBe(true);
    // });
});
