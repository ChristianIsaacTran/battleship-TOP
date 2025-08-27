import gameboard from "./gameboard.js";
import ship from "./ship.js";

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
            computerStatus = isComputer;
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
    paramerters invole the position of each ship, followed by the orientation they are facing to input into the placeShip() function in gameboard().
    */
    function makeBoard(carrierPos, carrierFace, battleshipPos, battleshipFace, cruiserPos, cruiserFace, submarinePos, submarineFace, destroyerPos, destroyerFace) {

        // 5 main ships from the game
        const carrier = ship(5);
        const battleship = ship(4);
        const cruiser = ship(3);
        const submarine = ship(3);
        const destroyer = ship(2);

      

        // player input for ship placement
        if (computerStatus === false) {
            // ship positions are given in an array of strings, a letter and number indicating the coordinates ex: ["A","1"]
            playerBoard.placeShip(carrier, carrierPos, carrierFace);
            playerBoard.placeShip(battleship, battleshipPos, battleshipFace);
            playerBoard.placeShip(cruiser, cruiserPos, cruiserFace);
            playerBoard.placeShip(submarine, submarinePos, submarineFace);
            playerBoard.placeShip(destroyer, destroyerPos, destroyerFace);
            console.log([...playerBoard.getBoard().entries()]);
        } 
        // computer random locations for ship placement
        else {
        }
    }

    return { getName, getGameBoard, initPlayer, getComputerStatus, makeBoard };
}
