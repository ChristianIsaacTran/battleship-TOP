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
        dialog.setAttribute("class", "gamemode-selection");
        para.textContent = "Choose Gamemode";
        buttDiv.setAttribute("class", "gamemode-button-container");
        pvpButton.setAttribute("class", "player-vs-player-button");
        pvpButton.textContent = "Player vs Player";
        pvcButton.setAttribute("class", "player-vs-computer");
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
            // close the gamemode modal first
            dialog.close();

            // get player 1 option modal and show it, then show player 2 modal after submitting player 1 options
            const player1Options = document.querySelector(
                ".pvp-player1-options",
            );
            player1Options.showModal();
        });

        pvcButton.addEventListener("click", () => {});
    }

    // renders the player 1 ship placement menu
    function renderPlayer1Options() {
        // generate html items
        const dialog = document.createElement("dialog");
        dialog.setAttribute("class", "pvp-player1-options");
        const form = document.createElement("form");
        form.setAttribute("class", "player1-form");
        const optionHeader = document.createElement("h1");
        optionHeader.textContent = "Player 1 Options:";
        const shipPlacementHeader = document.createElement("h1");
        shipPlacementHeader.textContent = "Ship placements:";
        const nameGroup = document.createElement("div");
        nameGroup.setAttribute("class", "name-group");
        const p1NameLabel = document.createElement("label");
        p1NameLabel.setAttribute("for", "p1-name");
        p1NameLabel.textContent = "Player 1 name:";
        const p1NameInput = document.createElement("input");
        p1NameInput.setAttribute("type", "text");
        p1NameInput.setAttribute("id", "p1-name");
        p1NameInput.setAttribute("maxlength", "20");
        p1NameInput.setAttribute("placeholder", "player 1 name goes here...");

        // construct form
        form.appendChild(optionHeader);
        nameGroup.appendChild(p1NameLabel);
        nameGroup.appendChild(p1NameInput);
        form.appendChild(nameGroup);
        form.appendChild(shipPlacementHeader);

        for (let i = 0; i < 5; i += 1) {
            const shipGroup = document.createElement("div");
            shipGroup.setAttribute("class", "ship-group");
            const inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "input-group");
            const shipLabel = document.createElement("label");
            const shipInput = document.createElement("input");
            shipInput.setAttribute("type", "text");
            shipInput.setAttribute("placeholder", "placement position ex: B,1");

            // for each loop, change the appropriate ship label and id value for the ship inputs
            if (i === 0) {
                shipLabel.textContent = "Carrier (5 spaces)";
                shipInput.setAttribute("id", "carrier-p1");
            } else if (i === 1) {
                shipLabel.textContent = "Battleship (4 spaces)";
                shipInput.setAttribute("id", "battleship-p1");
            } else if (i === 2) {
                shipLabel.textContent = "Cruiser (3 spaces)";
                shipInput.setAttribute("id", "cruiser-p1");
            } else if (i === 3) {
                shipLabel.textContent = "Submarine (3 spaces)";
                shipInput.setAttribute("id", "submarine-p1");
            } else if (i === 4) {
                shipLabel.textContent = "Destroyer (2 spaces)";
                shipInput.setAttribute("id", "destroyer-p1");
            }

            // select dropdown menu for directions
            const select = document.createElement("select");
            select.setAttribute("id", "directions");
            const left = document.createElement("option");
            left.setAttribute("value", "left");
            left.textContent = "left";
            const right = document.createElement("option");
            right.setAttribute("value", "right");
            right.textContent = "right";
            const up = document.createElement("option");
            up.setAttribute("value", "up");
            up.textContent = "up";
            const down = document.createElement("option");
            down.setAttribute("value", "down");
            down.textContent = "down";
            select.appendChild(left);
            select.appendChild(right);
            select.appendChild(up);
            select.appendChild(down);

            // put all html elements together for ship-group
            inputGroup.appendChild(shipInput);
            inputGroup.appendChild(select);
            shipGroup.appendChild(shipLabel);
            shipGroup.appendChild(inputGroup);

            // append to form
            form.appendChild(shipGroup);
        }

        // add a button to the end of the form
        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "form-submit");
        submitButton.textContent = "Submit";
        form.appendChild(submitButton);

        // add form to dialog, then add dialog to HTML body
        dialog.appendChild(form);
        const body = document.querySelector("body");
        body.appendChild(dialog);
    }

    // renders the player 2 ship placement menu
    function renderPlayer2Options() {
        // generate html items
        const dialog = document.createElement("dialog");
        dialog.setAttribute("class", "pvp-player2-options");
        const form = document.createElement("form");
        form.setAttribute("class", "player2-form");
        const optionHeader = document.createElement("h1");
        optionHeader.textContent = "Player 2 Options:";
        const shipPlacementHeader = document.createElement("h1");
        shipPlacementHeader.textContent = "Ship placements:";
        const nameGroup = document.createElement("div");
        nameGroup.setAttribute("class", "name-group");
        const p1NameLabel = document.createElement("label");
        p1NameLabel.setAttribute("for", "p2-name");
        p1NameLabel.textContent = "Player 2 name:";
        const p1NameInput = document.createElement("input");
        p1NameInput.setAttribute("type", "text");
        p1NameInput.setAttribute("id", "p2-name");
        p1NameInput.setAttribute("maxlength", "20");
        p1NameInput.setAttribute("placeholder", "player 2 name goes here...");

        // construct form
        form.appendChild(optionHeader);
        nameGroup.appendChild(p1NameLabel);
        nameGroup.appendChild(p1NameInput);
        form.appendChild(nameGroup);
        form.appendChild(shipPlacementHeader);

        for (let i = 0; i < 5; i += 1) {
            const shipGroup = document.createElement("div");
            shipGroup.setAttribute("class", "ship-group");
            const inputGroup = document.createElement("div");
            inputGroup.setAttribute("class", "input-group");
            const shipLabel = document.createElement("label");
            const shipInput = document.createElement("input");
            shipInput.setAttribute("type", "text");
            shipInput.setAttribute("placeholder", "placement position ex: B,1");

            // for each loop, change the appropriate ship label and id value for the ship inputs
            if (i === 0) {
                shipLabel.textContent = "Carrier (5 spaces)";
                shipInput.setAttribute("id", "carrier-p2");
            } else if (i === 1) {
                shipLabel.textContent = "Battleship (4 spaces)";
                shipInput.setAttribute("id", "battleship-p2");
            } else if (i === 2) {
                shipLabel.textContent = "Cruiser (3 spaces)";
                shipInput.setAttribute("id", "cruiser-p2");
            } else if (i === 3) {
                shipLabel.textContent = "Submarine (3 spaces)";
                shipInput.setAttribute("id", "submarine-p2");
            } else if (i === 4) {
                shipLabel.textContent = "Destroyer (2 spaces)";
                shipInput.setAttribute("id", "destroyer-p2");
            }

            // select dropdown menu for directions
            const select = document.createElement("select");
            select.setAttribute("id", "directions");
            const left = document.createElement("option");
            left.setAttribute("value", "left");
            left.textContent = "left";
            const right = document.createElement("option");
            right.setAttribute("value", "right");
            right.textContent = "right";
            const up = document.createElement("option");
            up.setAttribute("value", "up");
            up.textContent = "up";
            const down = document.createElement("option");
            down.setAttribute("value", "down");
            down.textContent = "down";
            select.appendChild(left);
            select.appendChild(right);
            select.appendChild(up);
            select.appendChild(down);

            // put all html elements together for ship-group
            inputGroup.appendChild(shipInput);
            inputGroup.appendChild(select);
            shipGroup.appendChild(shipLabel);
            shipGroup.appendChild(inputGroup);

            // append to form
            form.appendChild(shipGroup);
        }

        // add a button to the end of the form
        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "form-submit");
        submitButton.textContent = "Submit";
        form.appendChild(submitButton);

        // add form to dialog, then add dialog to HTML body
        dialog.appendChild(form);
        const body = document.querySelector("body");
        body.appendChild(dialog);
    }

    // renders the current boards for both players
    function renderCurrentBoard() {}

    return {
        renderCurrentBoard,
        renderGamemodeSelection,
        renderPlayer1Options,
        renderPlayer2Options,
    };
}
