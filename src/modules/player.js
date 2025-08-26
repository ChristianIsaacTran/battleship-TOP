import gameboard from "./gameboard.js";

export default function player() {
    let playerName;
    let playerBoard;
    let computerStatus;

    // utility function to get the player's name
    function getName() {
        return playerName;
    }

    // utility function to get the player's gameboard
    function getGameBoard() {
        return playerBoard;
    }

    // utility function to get if this player is a computer or not
    function getComputerStatus() {
        return computerStatus;
    }

    /*
    initializes the properties for player depending on if they're a computer or not.
    */
    function initPlayer(name, isComputer = false) {
        // sets player name to the input name given if isComputer is false. Otherwise, set name to "Computer Player"
        if (isComputer === false) {
            playerName = name;
        } else {
            playerName = "Computer Player";
            computerStatus = isComputer;
        }

        // give the player a gameboard
        playerBoard = gameboard();
    }

    /*
    makeBoard() function places all ships onto the gameboard, either with player input for location or random locations if the 
    player is a computer.
    */
    function makeBoard() {}

    return { getName, getGameBoard, initPlayer, getComputerStatus, makeBoard };
}
