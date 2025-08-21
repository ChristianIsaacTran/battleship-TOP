/*
 gameboard factory generates a gameboard object that 
 contains the game logic. 
 - should be able to place ship at coordinates on the game board
 - should have receiveAttack() function that calculates if 
 the given position was a hit or miss. if a hit, use the 
 hit() function on that ship object at that position. 
 - should keep track of missed attacks .
 - should keep track of win condition, if all ships have been sunk. 
 - board is a standard (10x10) battleship board 
 - going to use Map() data structure to store positions
 - going to be non-zero starting position
 - use battleship coordinates (letters and numbers)
 */
import ship from "./ship.js";

export default function gameboard() {
    // game board itself
    const board = new Map();

    // letter-coordinate reference
    const letterMap = new Map();
    letterMap.set("A", 1);
    letterMap.set("B", 2);
    letterMap.set("C", 3);
    letterMap.set("D", 4);
    letterMap.set("E", 5);
    letterMap.set("F", 6);
    letterMap.set("G", 7);
    letterMap.set("H", 8);
    letterMap.set("I", 9);
    letterMap.set("J", 10);

    // ship pieces
    const carrier = ship(5);
    const battleship = ship(4);
    const cruiser = ship(3);
    const submarine = ship(3);
    const destroyer = ship(2);

    // takes in a letter string and returns the number position
    function convertLetterToCoor(letter) {
        return letterMap.get(letter);
    }

    // checks if the ship's facing direction makes the ship placement go out of bounds. If it does, return true. If it stay in bounds, return false.
    function checkDirectionInBounds(shipLength, xPos, yPos, facingDirection) {
        let xTemp = xPos;
        let yTemp = yPos;


        for (let i = 0; i < shipLength; i += 1) {
            if (facingDirection === "right") {
                xTemp += 1;
                if (xTemp > 10 || xTemp < 1) {
                    return true;
                }
            } else if (facingDirection === "left") {
                xTemp -= 1;
                if (xTemp > 10 || xTemp < 1) {
                    return true;
                }
            } else if (facingDirection === "up") {
                yTemp -= 1;
                if (yTemp > 10 || yTemp < 1) {
                    return true;
                }
            } else if (facingDirection === "down") {
                yTemp += 1;
                if (yTemp > 10 || yTemp < 1) {
                    return true;
                }
            }
        }

        return false;
    }

    // takes in a ship and coordinates to place the ship and stores them into the board Map(). returns boolean depending on successful placement.
    function placeShip(shipObj, coordinates, orientation) {
        /*
        note: positions I am passing to this function are givin in reverse pair order, like this: 
        [position y (a letter), position x (a number)]
        because in battleship, you usually call the letter then the number. 
        */
        let xPos = Number(coordinates[1]);
        let yPos = convertLetterToCoor(coordinates[0]);
        const facingDirection = orientation;
        const shipLength = shipObj.getLength();

        // check if starting coordinates are out of bounds of the 10x10 board, return false if it is out of bounds
        if (xPos > 10 || xPos < 1 || yPos > 10 || yPos < 1) {
            return false;
        }

        // check if the length of the ship makes the positions go out of bounds. if it does, return false
        if (checkDirectionInBounds(shipLength, xPos, yPos, facingDirection)) {
            return false;
        }

        // check if the length of the ship clashes with another placed ship. if it does, return false
        if (checkForShipClash(shipLength, xPos, yPos, facingDirection)) {
            return false;
        }

        // save the starting position and add it to the board Map()
        let combinedPositionString = `${xPos},${yPos}`;
        board.set(combinedPositionString, shipObj);

        /* 
        for the length of the ship, set the coordinates in the direction it is facing to equal the current ship object and add it to the board Map()
        note: ending at shipLength - 1 because we already saved the given position, so skip 1 iteration
        */
        for (let i = 0; i < shipLength - 1; i += 1) {
            if (facingDirection === "right") {
                xPos += 1;
                combinedPositionString = `${xPos},${yPos}`;
                board.set(combinedPositionString, shipObj);
            }
            if (facingDirection === "left") {
                xPos -= 1;
                combinedPositionString = `${xPos},${yPos}`;
                board.set(combinedPositionString, shipObj);
            }
            if (facingDirection === "up") {
                yPos -= 1;
                combinedPositionString = `${xPos},${yPos}`;
                board.set(combinedPositionString, shipObj);
            }
            if (facingDirection === "down") {
                yPos += 1;
                combinedPositionString = `${xPos},${yPos}`;
                board.set(combinedPositionString, shipObj);
            }
        }

        return true;
    }

    // setup the board by using placeShip() function to place the 5 ships
    function initializeBoard() {}

    function getBoard() {
        return board;
    }

    return { initializeBoard, placeShip, getBoard, checkDirectionInBounds };
}
