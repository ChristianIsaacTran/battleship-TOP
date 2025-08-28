import gameboard from "./gameboard.js";
import ship from "./ship.js";

export default function player() {
    let playerName;
    let playerBoard;
    let computerStatus;
    let playerLose = false;

    // letter-coordinate reference
    const letterMap = new Map();
    letterMap.set(1, "A");
    letterMap.set(2, "B");
    letterMap.set(3, "C");
    letterMap.set(4, "D");
    letterMap.set(5, "E");
    letterMap.set(6, "F");
    letterMap.set(7, "G");
    letterMap.set(8, "H");
    letterMap.set(9, "I");
    letterMap.set(10, "J");

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

    // getRandomDirection() takes in a random number as the parameter and returns a string direction based on that random number.
    function getRandomDirection(randomNum) {
        // randomNum is possibly (1-4) to represent the 4 possible directions a ship could be facing
        if (randomNum === 1) {
            return "left";
        } else if (randomNum === 2) {
            return "right";
        } else if (randomNum === 3) {
            return "up";
        } else if (randomNum === 4) {
            return "down";
        }
    }

    /*
    makeBoard() function places all ships onto the gameboard, either with player input for location or random locations if the 
    player is a computer.
    paramerters involve the position of each ship, followed by the orientation they are facing to input into the placeShip() function in gameboard().
    */
    function makeBoard(
        carrierPos,
        carrierFace,
        battleshipPos,
        battleshipFace,
        cruiserPos,
        cruiserFace,
        submarinePos,
        submarineFace,
        destroyerPos,
        destroyerFace,
    ) {
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
        }
        // computer random locations for ship placement
        else {
            /* 
            for the 5 ships in battleship, generate random coordinates (1-10 inclusive) and direction. 
            in a loop. If the placement is invalid, then generate new coordinates and try to place again.
            */

            // carrier placement
            while (true) {
                // get random X coordinate (number) and make Y coordinate a letter (uppercase string). Pass coordinate argument as: ["string", number]
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = letterMap.get(
                    Math.floor(Math.random() * 10) + 1,
                );
                const randomFaceNum = Math.floor(Math.random() * 4) + 1;

                // get a random direction
                const randomFacing = getRandomDirection(randomFaceNum);

                // if ship placement was correct and valid, then break out of the loop. Otherwise, keep looping until successful valid placement
                if (
                    playerBoard.placeShip(
                        carrier,
                        [randomY, randomX],
                        randomFacing,
                    )
                ) {
                    break;
                }
            }

            // battleship placement
            while (true) {
                // get random X coordinate (number) and make Y coordinate a letter (uppercase string). Pass coordinate argument as: ["string", number]
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = letterMap.get(
                    Math.floor(Math.random() * 10) + 1,
                );
                const randomFaceNum = Math.floor(Math.random() * 4) + 1;

                // get a random direction
                const randomFacing = getRandomDirection(randomFaceNum);

                // if ship placement was correct and valid, then break out of the loop. Otherwise, keep looping until successful valid placement
                if (
                    playerBoard.placeShip(
                        battleship,
                        [randomY, randomX],
                        randomFacing,
                    )
                ) {
                    break;
                }
            }

            // cruiser placement
            while (true) {
                // get random X coordinate (number) and make Y coordinate a letter (uppercase string). Pass coordinate argument as: ["string", number]
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = letterMap.get(
                    Math.floor(Math.random() * 10) + 1,
                );
                const randomFaceNum = Math.floor(Math.random() * 4) + 1;

                // get a random direction
                const randomFacing = getRandomDirection(randomFaceNum);

                // if ship placement was correct and valid, then break out of the loop. Otherwise, keep looping until successful valid placement
                if (
                    playerBoard.placeShip(
                        cruiser,
                        [randomY, randomX],
                        randomFacing,
                    )
                ) {
                    break;
                }
            }

            // submarine placement
            while (true) {
                // get random X coordinate (number) and make Y coordinate a letter (uppercase string). Pass coordinate argument as: ["string", number]
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = letterMap.get(
                    Math.floor(Math.random() * 10) + 1,
                );
                const randomFaceNum = Math.floor(Math.random() * 4) + 1;

                // get a random direction
                const randomFacing = getRandomDirection(randomFaceNum);

                // if ship placement was correct and valid, then break out of the loop. Otherwise, keep looping until successful valid placement
                if (
                    playerBoard.placeShip(
                        submarine,
                        [randomY, randomX],
                        randomFacing,
                    )
                ) {
                    break;
                }
            }

            // destroyer placement
            while (true) {
                // get random X coordinate (number) and make Y coordinate a letter (uppercase string). Pass coordinate argument as: ["string", number]
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = letterMap.get(
                    Math.floor(Math.random() * 10) + 1,
                );
                const randomFaceNum = Math.floor(Math.random() * 4) + 1;

                // get a random direction
                const randomFacing = getRandomDirection(randomFaceNum);

                // if ship placement was correct and valid, then break out of the loop. Otherwise, keep looping until successful valid placement
                if (
                    playerBoard.placeShip(
                        destroyer,
                        [randomY, randomX],
                        randomFacing,
                    )
                ) {
                    break;
                }
            }
        }
    }

    // utility function to send an attack, returns the coordinates as an array to pass to a gameboard's receiveAttack() function
    function sendAttack(yPos, xPos) {
        return [yPos, xPos];
    }

    /*
    playerReceiveAttack() uses the gameboard's receiveAttack function to record any incoming attacks on this player's board
    */
    function playerReceiveAttack(coordinates) {
        playerBoard.receiveAttack(coordinates);

        // update playerLose if all ships were sunk on this playerboard
        playerLose = playerBoard.checkAllSunk();
    }

    // utility function to change playerLose boolean value
    function setPlayerLose(boolean) {
        playerLose = boolean;
    }

    // returns a boolean and a console.log() message to declare if this player lost.
    function checkPlayerLostGame() {
        if(playerLose) {
            console.log(`All ships have been sunk. ${playerName} loses`);
            return true;
        }

        return false;
    }

    return {
        getName,
        getGameBoard,
        initPlayer,
        getComputerStatus,
        makeBoard,
        getRandomDirection,
        sendAttack,
        playerReceiveAttack,
        checkPlayerLostGame,
        setPlayerLose
    };
}
