import gamecontroller from "./gamecontroller.js";

export default function interfacecontroller() {
    // scoped game controller 
    const gameControl = gamecontroller();

    // renders gamemode selection when upon webpage load
    function renderGamemodeSelection() {
        // create HTML elements
        const body = document.querySelector("body");
        const dialog = document.createElement("dialog");
        const para = document.createElement("p");
        const buttDiv = document.createElement("div");
        const pvpButton = document.createElement("button");
        const pvcButton = document.createElement("button");

        // add attributes
        dialog.setAttribute("class","gamemode-selection");
        para.textContent = "Choose Gamemode";
        buttDiv.setAttribute("class","gamemode-button-container");
        pvpButton.setAttribute("class","player-vs-player-button");
        pvpButton.textContent = "Player vs Player";
        pvcButton.setAttribute("class","player-vs-computer");
        pvcButton.textContent = "Player vs Computer";

        // appendChild
        buttDiv.appendChild(pvpButton);
        buttDiv.appendChild(pvcButton);
        dialog.appendChild(para);
        dialog.appendChild(buttDiv);
        body.appendChild(dialog);

        window.addEventListener("load", () => {
            dialog.showModal();
        });

        /*
        pressing a gamemode option opens a modal that allows the user to place ships 
        in specific coordinate locations. Depeding on player vs player or player vs computer, 
        there will be different modal selection menus. 
        I think the sequence should be: 
        if pvp, 
            1. show player 1 ship placements menu 
            2. then show player 2 ship placements menu 
            3. render sides
        if pvc, 
            1. show player 1 ship placements menu 
            2. render sides
        */
        pvpButton.addEventListener("click", () => {
            
        });

        pvcButton.addEventListener("click", () => {

        });



    }

    // renders the player 1 ship placement menu 
    function player1ShipPlacementModal() {
        
    }

    // renders the current boards for both players
    function renderCurrentBoard() {}

    return { renderCurrentBoard, renderGamemodeSelection };
}
