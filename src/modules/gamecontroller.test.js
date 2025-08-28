/* eslint-disable no-undef */
import { describe, test, jest, expect } from "@jest/globals";
import gameboard from "./gameboard.js";
import player from "./player.js";
import gamecontroller from "./gamecontroller.js";
import ship from "./ship.js";
import { RuleTester } from "eslint";

/*
    game controller runs the game round by round. These tests should 
    test the game rounds and win conditions.
*/
describe("Game controller tests", () => {
    let testGameController;

    beforeEach(() => {
        testGameController = gamecontroller();
    });

    test("makePlayer1() function. Should make player1 with input name, and should be able to place ships", () => {
        testGameController.makePlayer1(
            "player 1",
            ["B", "3"],
            "down",
            ["D", "2"],
            "down",
            ["C", "6"],
            "right",
            ["G", "9"],
            "down",
            ["I", "5"],
            "right",
        );

        const player1 = testGameController.getPlayer1();
        const player1GameBoard = player1.getGameBoard();
        const board = player1GameBoard.getBoard();

        let boardSpacesCounter = 0;

        board.forEach(() => {
            boardSpacesCounter += 1;
        });

        expect(player1.getName()).toBe("player 1");
        expect(player1.getComputerStatus()).toBe(false);

        // there should a total of 17 spaces occupied by all ships on the gameboard
        expect(boardSpacesCounter).toBe(17);
    });

    test("makePlayer2() function. If the isComputer is true, then the player should be made into a computer with random ship positions", () => {
        testGameController.makePlayer2("", true);

        const player2 = testGameController.getPlayer2();
        const player2GameBoard = player2.getGameBoard();
        const board = player2GameBoard.getBoard();

        let boardSpacesCounter = 0;

        board.forEach(() => {
            boardSpacesCounter += 1;
        });

        expect(player2.getName()).toBe("Computer Player");
        expect(player2.getComputerStatus()).toBe(true);

        expect(boardSpacesCounter).toBe(17);
    });

    test("makePlayer2() function. Should make player2 with input name, and should be able to place ships", () => {
        testGameController.makePlayer2(
            "player 2",
            false,
            ["B", "3"],
            "down",
            ["D", "2"],
            "down",
            ["C", "6"],
            "right",
            ["G", "9"],
            "down",
            ["I", "5"],
            "right",
        );

        const player2 = testGameController.getPlayer2();
        const player2GameBoard = player2.getGameBoard();
        const board = player2GameBoard.getBoard();

        let boardSpacesCounter = 0;

        board.forEach(() => {
            boardSpacesCounter += 1;
        });

        expect(player2.getName()).toBe("player 2");
        expect(player2.getComputerStatus()).toBe(false);

        // there should a total of 17 spaces occupied by all ships on the gameboard
        expect(boardSpacesCounter).toBe(17);
    });

    // test("playRound()");
});
