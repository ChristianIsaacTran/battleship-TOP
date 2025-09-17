import player from "./player.js";

export default function gamecontroller() {
    let player1;
    let player2;
    let currentTurn;

    // makes player 1 with the player1Name parameter, and place ships. Player 1 cannot be a computer
    function makePlayer1(
        player1Name,
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
        player1 = player();

        player1.initPlayer(player1Name);

        player1.makeBoard(
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
        );

        // start the game with player 1 as the first turn
        currentTurn = player1;
    }

    // makes player 2 with the player2Name parameter, or if the player 2 is a computer, make a computer player. Player 2 can be a real person or a comuter.
    function makePlayer2(
        player2Name,
        isComputer = false,
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
        player2 = player();

        // if a real person, make a player object with player2Name. Otherwise, make a computer player
        if (isComputer === false) {
            player2.initPlayer(player2Name);
            player2.makeBoard(
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
            );
        } else {
            player2.initPlayer("", true);
            player2.makeBoard();
        }
    }

    // utility funciton. returns the player1 object
    function getPlayer1() {
        return player1;
    }

    // utility function. returns the player2 object
    function getPlayer2() {
        return player2;
    }

    // utility function. returns currentTurn variable
    function getCurrentTurn() {
        return currentTurn;
    }

    /*
     playRound() function. plays a full round, getting input from the current turn's player and making an attack on player 2
     given attack coordinates, send the attack to the opposing player depending on whoever the current turn is, then check for a 
     win condition on the opposing player. If no win, then swap turns. Also check if player 2 is a computer or not.
     Will return true if a win is detected, false if no win
    */
    function playRound(attackCoorY, attackCoorX) {
        // current turn player1 =  Attack player 2 with given coordinates then check if all player 2's ships have been sunk. if not, swap to player 2
        if (currentTurn === player1) {
            // convert coordinates into attack array coordinates
            const player1Attack = player1.sendAttack(attackCoorY, attackCoorX);

            // check if the attack is a repeat attack
            if(player2.getGameBoard().checkRepeatAttack(player1Attack)) {
                alert("cannot attack coordinate that has already been attacked");
                return false;
            }

            // send player 1 attack to player 2 board
            player2.playerReceiveAttack(player1Attack);

            // check if player 2 lost the game after attack
            if (player2.checkPlayerLostGame()) {
                alert(
                    "All ships from player 2 have been sunk. Player 1 wins!",
                );
                return true;
            }

            // if the win condition is not true, then swap turns
            swapCurrentTurn();
        }
        // if the currentTurn is player 2 and they ARE a computer player, then randomly generate an attack and send to player 1, check for win, then swap turns
        else if (
            currentTurn === player2 &&
            player2.getComputerStatus() === true
        ) {
            // get random attack from player 2's send attack function
            const player2Attack = player2.sendAttack();

            // send player 2 Computer attack to player 1 board
            player1.playerReceiveAttack(player2Attack);

            // check win condition. If player 1 ships have been sunk after attack, declare winner
            if (player1.checkPlayerLostGame()) {
                alert(
                    "All ships from player 1 have been sunk. Player 2 (COMPUTER) wins!",
                );
                return true;
            }

            swapCurrentTurn();
        }
        // if the currentTurn is player 2 and they are a REAL player, then send coordinates to player 1, check for win, then swap turns if win is not met
        else if (
            currentTurn === player2 &&
            player2.getComputerStatus() === false
        ) {
            // convert coordinates into attack array coordinates
            const player2Attack = player2.sendAttack(attackCoorY, attackCoorX);

            // check if the attack is a repeat attack
            if(player1.getGameBoard().checkRepeatAttack(player2Attack)) {
                alert("cannot attack coordinate that has already been attacked");
                return false;
            }

            // send player 2 attack to player 1 board
            player1.playerReceiveAttack(player2Attack);

            // check if player 1 lost the game after attack
            if (player1.checkPlayerLostGame()) {
                console.log(
                    "All ships from player 1 have been sunk. Player 2 wins!",
                );
                return true;
            }

            // if the win condition is not true, then swap turns
            swapCurrentTurn();
        }

        // if no win condition, return false
        return false;
    }

    // utility function, used to manipulate the currentTurn value for testing
    function swapCurrentTurn() {
        if (currentTurn === player1) {
            currentTurn = player2;
        } else {
            currentTurn = player1;
        }
    }

    return {
        makePlayer1,
        getPlayer1,
        makePlayer2,
        getPlayer2,
        getCurrentTurn,
        playRound,
        swapCurrentTurn,
    };
}
