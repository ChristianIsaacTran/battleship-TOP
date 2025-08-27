/* eslint-disable no-undef */
import { describe, test, jest, expect } from "@jest/globals";
import gameboard from "./gameboard.js";
import player from "./player.js";
import ship from "./ship.js";
import { RuleTester } from "eslint";

/*
players get their own gameboards in the game of battleship. 
Each player has a name. 
Each player can place ships on their boards.
A player can be either a real person or a computer player. 
*/
describe("player factory tests", () => {
    let testPlayer;

    beforeEach(() => {
        testPlayer = player();
    });

    test("initPlayer() function. Initializes the player object's properties", () => {
        testPlayer.initPlayer("Michael");
        expect(testPlayer.getName()).toBe("Michael");
        expect(testPlayer.getGameBoard()).toBeDefined();
    });

    test("makeBoard() function. places ships that the player gives with placeShip() from gameboard", () => {
        testPlayer.initPlayer("Player 1");

        testPlayer.makeBoard(["B","3"], "down", ["D","2"], "down", ["C","6"], "right", ["G","9"], "down", ["I","5"], "right");

        const gameBoard = testPlayer.getGameBoard();

        const resultBoard = gameBoard.getBoard();


        let resultIterator = 0;

        resultBoard.forEach(() => {
            resultIterator += 1;
        });

        expect(resultBoard).toBeDefined();

        // with all ship lengths added together, it equals 17. There should be 17 entries that represent ships on the board in the gameboard() object.
        expect(resultIterator).toBe(17);
    });

    test("makeBoard() function. places ships randomly if the player is a computer with placeShip()", () => {
        testPlayer.initPlayer("", true);
        
        testPlayer.makeBoard(); 

        const gameBoard = testPlayer.getGameBoard();

        const resultBoard = gameBoard.getBoard();

        let resultIterator = 0;

        resultBoard.forEach(() => {
            resultIterator += 1;
        });

        expect(resultBoard).toBeDefined();
        expect(resultIterator).toBe(5);
    });
});
