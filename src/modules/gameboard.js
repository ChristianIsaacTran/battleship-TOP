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

export default function gameboard() {
    // game board itself, stores coordinates and ship objects at coordinates
    const board = new Map();

    // a history of incoming attacks on this board. Stores the coordinates and the hit or miss status
    const attackHistory = new Map();

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
    const gamePieces = new Map();

    // takes in a letter string and returns the number position
    function convertLetterToCoor(letter) {
        return letterMap.get(letter);
    }

    // returns the board Map()
    function getBoard() {
        return board;
    }

    // checks if the ship's facing direction makes the ship placement go out of bounds. If it does, return true. If it stay in bounds, return false.
    function checkDirectionInBounds(shipLength, xPos, yPos, facingDirection) {
        let xTemp = xPos;
        let yTemp = yPos;

        for (let i = 1; i < shipLength; i += 1) {
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

    // utility function, adds given shipObj to the gamePieces Map() based on it's length.
    function addGamePiece(shipObj) {
        const shipLength = shipObj.getLength();

        if (shipLength === 5) {
            gamePieces.set("carrier", shipObj);
        } else if (shipLength === 4) {
            gamePieces.set("battleship", shipObj);
        } else if (shipLength === 3 && !gamePieces.has("cruiser")) {
            gamePieces.set("cruiser", shipObj);
        } else if (shipLength === 3 && !gamePieces.has("submarine")) {
            gamePieces.set("submarine", shipObj);
        } else if (shipLength === 2) {
            gamePieces.set("destroyer", shipObj);
        }

        return gamePieces;
    }

    // takes the ship direction, length, x and y coordinates and calculates the future positions, checks the board Map() for ships already using coorindates and returns true if overlapping ships, or false if not overlapping
    function checkForShipClash(shipLength, xPos, yPos, facingDirection) {
        let xTemp = xPos;
        let yTemp = yPos;
        let combinedPositionString = `${xTemp},${yTemp}`;

        // initial check for starting position. Check coordinate key for existence in board Map()
        if (board.has(combinedPositionString)) {
            return true;
        }

        for (let i = 1; i < shipLength; i += 1) {
            if (facingDirection === "right") {
                xTemp += 1;
                combinedPositionString = `${xTemp},${yTemp}`;
                if (board.has(combinedPositionString)) {
                    return true;
                }
            } else if (facingDirection === "left") {
                xTemp -= 1;
                combinedPositionString = `${xTemp},${yTemp}`;
                if (board.has(combinedPositionString)) {
                    return true;
                }
            } else if (facingDirection === "up") {
                yTemp -= 1;
                combinedPositionString = `${xTemp},${yTemp}`;
                if (board.has(combinedPositionString)) {
                    return true;
                }
            } else if (facingDirection === "down") {
                yTemp += 1;
                combinedPositionString = `${xTemp},${yTemp}`;
                if (board.has(combinedPositionString)) {
                    return true;
                }
            }
        }

        return false;
    }

    // takes in a ship and coordinates to place the ship and stores them into the board Map(). returns boolean depending on successful ship placement.
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

        // add this ship to the gamePieces Map()
        addGamePiece(shipObj);

        // save the starting position and add it to the board Map()
        let combinedPositionString = `${xPos},${yPos}`;
        board.set(combinedPositionString, shipObj);

        /* 
        for the length of the ship, set the coordinates in the direction it is facing to equal the current ship object and add it to the board Map()
        note: ending at i = 1 because we already saved the given position, so skip 1 iteration
        */
        for (let i = 1; i < shipLength; i += 1) {
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

    /*
    receiveAttack() takes in a coordinate indicating an incoming attack and returns true if the attack is a hit, or false if the attack is a miss.
    for every attack given, the coordinates and the attack itself will be stored in a Map() called attackHistory. This is to keep 
    track of the attacks and coordinates, and will map each coordinate to a ship that was successfully attacked or a string that indicates a 
    "miss".
    */
    function receiveAttack(coordinates) {
        const xPos = Number(coordinates[1]);
        const yPos = convertLetterToCoor(coordinates[0]);
        const combinedPositionString = `${xPos},${yPos}`;

        // initial check to prevent attacking the same coordinates more than once
        if (attackHistory.has(combinedPositionString)) {
            return false;
        }

        // check if the attack coordinate is within bounds
        if (xPos > 10 || xPos < 1 || yPos > 10 || yPos < 1) {
            return false;
        }

        /*
        if a ship exists at that coordinate then it is a hit. Return true, call hit() on ship, store the coordinate and ship reference in attackHistory Map().
        also if the ship hit was successful, check if the ship sunk with isSunk() method.
        */
        if (board.has(combinedPositionString)) {
            const shipThatWasHit = board.get(combinedPositionString);
            shipThatWasHit.hit();
            shipThatWasHit.isSunk();
            attackHistory.set(combinedPositionString, shipThatWasHit);
            return true;
        }

        // if it isn't a hit, store the coordinate and the string "miss" in the attackHistory Map() and return false
        attackHistory.set(combinedPositionString, "miss");

        return false;
    }

    // utility get function. Returns attackHistory Map()
    function getAttackHistory() {
        return attackHistory;
    }

    /*
        checkAllSunk() checks a Map() that contains the pieces for this gameboard and checks if all of them have been sunk with their isSunk() status. 
        Returns true if all ships on the board have been sunk, returns false if there are still ships remaining.
    */
    function checkAllSunk() {
        
        // iterate over the values in the Map(). if any of the ship statuses are false, then return false since there is at least 1 ship not sunk. Otherwise return true
        for(const shipObj of gamePieces.values()) {
            if(shipObj.isSunk() === false) {
                return false;
            }
        }

        return true;
    }

    return {
        placeShip,
        getBoard,
        checkDirectionInBounds,
        checkForShipClash,
        receiveAttack,
        getAttackHistory,
        checkAllSunk,
        addGamePiece,
    };
}
