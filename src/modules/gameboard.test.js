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
        expect(testGameboard.placeShip(testShip, ["B", "11"], "right")).toBe(
            false,
        );
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going right, should return false (it fits)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(
            testShip.getLength(),
            1,
            1,
            "right",
        );
        expect(result).toEqual(false);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going left, should return true (goes out of bounds)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(
            testShip.getLength(),
            1,
            1,
            "left",
        );
        expect(result).toEqual(true);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going up, should return true (goes out of bounds)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(
            testShip.getLength(),
            1,
            1,
            "up",
        );
        expect(result).toEqual(true);
    });

    test("checkDirectionInBounds(). ship at (1,1) length 5 going down, should return false (it fits)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(
            testShip.getLength(),
            1,
            1,
            "down",
        );
        expect(result).toEqual(false);
    });

    test("checkDirectionInBounds(). ship at (4,5) length 5 going left, should return true (goes out of bounds by 1 to the left)", () => {
        const testShip = ship(5);
        const result = testGameboard.checkDirectionInBounds(
            testShip.getLength(),
            4,
            5,
            "left",
        );
        expect(result).toEqual(true);
    });

    test("checkForShipClash(). ship at (1, 1) length 5 going to the right, but encounters another ship and return true", () => {
        const testShip = ship(5);

        // fill the board with an entry at (3, 1) to block the new ship
        testGameboard.getBoard().set("3,1", ship(3));

        const result = testGameboard.checkForShipClash(
            testShip.getLength(),
            1,
            1,
            "right",
        );
        expect(result).toBe(true);
    });

    test("checkForShipClash(). ship at (1, 1) length 5 going to the right, no ship block, should return false", () => {
        const testShip = ship(5);
        const result = testGameboard.checkForShipClash(
            testShip.getLength(),
            1,
            1,
            "right",
        );
        expect(result).toBe(false);
    });

    test("placeShip() test. place a carrier (5 spaces) within the board at position (1,1) going right", () => {
        const testShip = ship(5);

        expect(testGameboard.placeShip(testShip, ["A", "1"], "right")).toBe(
            true,
        );

        const keyIterator = testGameboard.getBoard().keys();

        expect(keyIterator.next().value).toBe("1,1");
        expect(keyIterator.next().value).toBe("2,1");
        expect(keyIterator.next().value).toBe("3,1");
        expect(keyIterator.next().value).toBe("4,1");
        expect(keyIterator.next().value).toBe("5,1");
    });

    test("placeShip() test. place a carrier (5 spaces) within the board at position (1,1) going down", () => {
        const testShip = ship(5);

        expect(testGameboard.placeShip(testShip, ["A", "1"], "down")).toBe(
            true,
        );

        const keyIterator = testGameboard.getBoard().keys();

        expect(keyIterator.next().value).toBe("1,1");
        expect(keyIterator.next().value).toBe("1,2");
        expect(keyIterator.next().value).toBe("1,3");
        expect(keyIterator.next().value).toBe("1,4");
        expect(keyIterator.next().value).toBe("1,5");
    });

    test("placeShip() test. place a carrier (5 spaces) within the board at position (5,5) going left", () => {
        const testShip = ship(5);

        expect(testGameboard.placeShip(testShip, ["E", "5"], "left")).toBe(
            true,
        );

        const keyIterator = testGameboard.getBoard().keys();

        expect(keyIterator.next().value).toBe("5,5");
        expect(keyIterator.next().value).toBe("4,5");
        expect(keyIterator.next().value).toBe("3,5");
        expect(keyIterator.next().value).toBe("2,5");
        expect(keyIterator.next().value).toBe("1,5");
    });

    test("placeShip() test. place a carrier (5 spaces) within the board at position (5,5) going up", () => {
        const testShip = ship(5);

        expect(testGameboard.placeShip(testShip, ["E", "5"], "up")).toBe(true);

        const keyIterator = testGameboard.getBoard().keys();

        expect(keyIterator.next().value).toBe("5,5");
        expect(keyIterator.next().value).toBe("5,4");
        expect(keyIterator.next().value).toBe("5,3");
        expect(keyIterator.next().value).toBe("5,2");
        expect(keyIterator.next().value).toBe("5,1");
    });

    test("placeShip() test. place 2 ships, no clash, one carrier (5 spaces) at (1,1) going right, and one battleship (4 spaces) at (10, 1) going down, should return true", () => {
        const testShipCarrier = ship(5);
        const testShipBattleShip = ship(4);

        expect(
            testGameboard.placeShip(testShipCarrier, ["A", "1"], "right"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipBattleShip, ["A", "10"], "down"),
        ).toBe(true);

        const keyIterator = testGameboard.getBoard().keys();

        // carrier 5 to the right from (1,1)
        expect(keyIterator.next().value).toBe("1,1");
        expect(keyIterator.next().value).toBe("2,1");
        expect(keyIterator.next().value).toBe("3,1");
        expect(keyIterator.next().value).toBe("4,1");
        expect(keyIterator.next().value).toBe("5,1");

        // battleship 4 down from (10, 1)
        expect(keyIterator.next().value).toBe("10,1");
        expect(keyIterator.next().value).toBe("10,2");
        expect(keyIterator.next().value).toBe("10,3");
        expect(keyIterator.next().value).toBe("10,4");
    });

    test("placeShip() test. place 2 ships, WITH CLASH, one carrier (5 spaces) at (4,4) going right, and one battlesihp (4 spaces) at (6,2) going down. Should intersect at (6,4) and return false", () => {
        const testShipCarrier = ship(5);
        const testShipBattleShip = ship(4);

        expect(
            testGameboard.placeShip(testShipCarrier, ["D", "4"], "right"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipBattleShip, ["B", "6"], "down"),
        ).toBe(false);

        const keyIterator = testGameboard.getBoard().keys();

        // carrier 5 to the right from (4,4)
        expect(keyIterator.next().value).toBe("4,4");
        expect(keyIterator.next().value).toBe("5,4");
        expect(keyIterator.next().value).toBe("6,4");
        expect(keyIterator.next().value).toBe("7,4");
        expect(keyIterator.next().value).toBe("8,4");

        // make sure that battleship was NOT added because it clashed with an existing ship
        expect(keyIterator.next().value).toBe(undefined);
    });

    test("placeShip() test. place all ships in valid positions on the board. 5 ships in total, carrier (5 spaces), battleship (4 spaces), cruiser (3 spaces), submarine (3 spaces), destroyer (2 spaces)", () => {
        const testShipCarrier = ship(5);
        const testShipBattleShip = ship(4);
        const testShipCruiser = ship(3);
        const testShipSubmarine = ship(3);
        const testShipDestroyer = ship(2);

        /*
        going off of this model:
         C = carrier
         B = battleship
         R = cruiser
         S = submarine
         D = destroyer

          1 2 3 4 5 6 7 8 9 10 
        1 - - - - - - - - - -  A
        2 - - C - - - - - - -  B
        3 - - C - - R R R - -  C
        4 - B C - - - - - - -  D
        5 - B C - - - - - - -  E
        6 - B C - - - - - - -  F
        7 - B - - - - - - S -  G
        8 - - - - - - - - S -  H
        9 - - - - D D - - S -  I
       10 - - - - - - - - - -  J
        */

        expect(
            testGameboard.placeShip(testShipCarrier, ["B", "3"], "down"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipBattleShip, ["D", "2"], "down"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipCruiser, ["C", "6"], "right"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipSubmarine, ["G", "9"], "down"),
        ).toBe(true);
        expect(
            testGameboard.placeShip(testShipDestroyer, ["I", "5"], "right"),
        ).toBe(true);

        const tempBoard = testGameboard.getBoard();

        // check carrier positions
        expect(tempBoard.has("3,2")).toBe(true);
        expect(tempBoard.has("3,3")).toBe(true);
        expect(tempBoard.has("3,4")).toBe(true);
        expect(tempBoard.has("3,5")).toBe(true);
        expect(tempBoard.has("3,6")).toBe(true);
        expect(tempBoard.get("3,2")).toBe(testShipCarrier);
        expect(tempBoard.get("3,3")).toBe(testShipCarrier);
        expect(tempBoard.get("3,4")).toBe(testShipCarrier);
        expect(tempBoard.get("3,5")).toBe(testShipCarrier);
        expect(tempBoard.get("3,6")).toBe(testShipCarrier);

        // check battleship positions
        expect(tempBoard.has("2,4")).toBe(true);
        expect(tempBoard.has("2,5")).toBe(true);
        expect(tempBoard.has("2,6")).toBe(true);
        expect(tempBoard.has("2,7")).toBe(true);
        expect(tempBoard.get("2,4")).toBe(testShipBattleShip);
        expect(tempBoard.get("2,5")).toBe(testShipBattleShip);
        expect(tempBoard.get("2,6")).toBe(testShipBattleShip);
        expect(tempBoard.get("2,7")).toBe(testShipBattleShip);

        // check cruiser positions
        expect(tempBoard.has("6,3")).toBe(true);
        expect(tempBoard.has("7,3")).toBe(true);
        expect(tempBoard.has("8,3")).toBe(true);
        expect(tempBoard.get("6,3")).toBe(testShipCruiser);
        expect(tempBoard.get("7,3")).toBe(testShipCruiser);
        expect(tempBoard.get("8,3")).toBe(testShipCruiser);

        // check submarine positions
        expect(tempBoard.has("9,7")).toBe(true);
        expect(tempBoard.has("9,8")).toBe(true);
        expect(tempBoard.has("9,9")).toBe(true);
        expect(tempBoard.get("9,7")).toBe(testShipSubmarine);
        expect(tempBoard.get("9,8")).toBe(testShipSubmarine);
        expect(tempBoard.get("9,9")).toBe(testShipSubmarine);

        // check destroyer positions
        expect(tempBoard.has("5,9")).toBe(true);
        expect(tempBoard.has("6,9")).toBe(true);
        expect(tempBoard.get("5,9")).toBe(testShipDestroyer);
        expect(tempBoard.get("6,9")).toBe(testShipDestroyer);
    });
});
