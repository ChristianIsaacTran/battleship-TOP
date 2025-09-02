import gamecontroller from "./gamecontroller.js";

export default function interfacecontroller() {

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


    }

    // renders the current boards for both players
    function renderCurrentBoard() {}

    return { renderCurrentBoard, renderGamemodeSelection };
}
