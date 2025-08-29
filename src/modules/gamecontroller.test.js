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

    test("Make two players, then proceed to play a full round. Player 1 should make an attack on player 2", () => {
        
        // players are going to have identical boards with same ship placements
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

        // play 1 round and attack player 2's space at coordinate ["B","3"]
        testGameController.playRound("B","3");

        const player2 = testGameController.getPlayer2();

        const player2GameBoard = player2.getGameBoard();

        const player2AttackHistory = player2GameBoard.getAttackHistory();

        expect(player2AttackHistory.has("3,2")).toBe(true);
    });

    test("make two players, then play a full round with player 2 being the computer. Have the computer send a randomized attack to player 1", () => {
        // player 1 is real while player 2 is a computer player
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

        testGameController.makePlayer2("", true);

        // set the current turn to player 2 to test random computer attack
        testGameController.swapCurrentTurn();

        testGameController.playRound();

        const player1 = testGameController.getPlayer1();
        const player1GameBoard = player1.getGameBoard();
        const player1AttackHistory = player1GameBoard.getAttackHistory();

        let attackCounter = 0;

        player1AttackHistory.forEach(() => {
            attackCounter += 1;
        });

        // expect at least that one attack we send from that one round in the attack history of player 1
        expect(attackCounter).toBe(1);

    });

    test("make two players, both real players, then have player 2 send an attack on player 1", () => {
         // players are going to have identical boards with same ship placements
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

        // swap current turn to be player 2 turn
        testGameController.swapCurrentTurn();

        // player 2 is going to send an attack on player 1's carrier at ["B","3"]
        testGameController.playRound("B","3");
        
        // check player 1's gameboard for an attack on position B,3
        const player1 = testGameController.getPlayer1();
        const player1GameBoard = player1.getGameBoard();
        const player1AttackHistory = player1GameBoard.getAttackHistory();

        console.log(player1AttackHistory);

        expect(player1AttackHistory.has("3,2")).toBe(true);
    });
});
