import player from "./player.js";

export default function gamecontroller() {
    let player1;
    let player2;

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

    return { makePlayer1, getPlayer1, makePlayer2, getPlayer2 };
}
