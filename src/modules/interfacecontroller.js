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

            // render player 1 and player 2 options menu
            renderPlayer1Options();
            renderPlayer2Options();

            // get player 1 option modal and show it
            const player1Options = document.querySelector(
                ".pvp-player1-options",
            );
            player1Options.showModal();
        });

        pvcButton.addEventListener("click", () => {
            // close gamemode modal first
            dialog.close();

            // render player 1 options menu only, pass true to signal player vs computer
            renderPlayer1Options(true);

            // get player 1 option modal, then create a computer player 2
            const player1Options = document.querySelector(
                ".pvp-player1-options",
            );
            player1Options.showModal();
        });
    }

    // checks if the board has valid ship placements, and returns true if valid, or false if any invalid ship positions given
    function checkValidPositions(player1Option = false, player2Option = false) {
        // plan is to check if the board is filled with 17 spaces for the ship board since all ships should take up 17 spaces in total
        if (player1Option === true && player2Option === false) {
            const player1Board = gameControl
                .getPlayer1()
                .getGameBoard()
                .getBoard();
            let player1ShipSpaceCounter = 0;

            player1Board.forEach(() => {
                player1ShipSpaceCounter += 1;
            });

            if (player1ShipSpaceCounter === 17) {
                return true;
            }

            return false;
        } else if (player2Option === true && player1Option === false) {
            const player2Board = gameControl
                .getPlayer2()
                .getGameBoard()
                .getBoard();
            let player2ShipSpaceCounter = 0;

            player2Board.forEach(() => {
                player2ShipSpaceCounter += 1;
            });

            if (player2ShipSpaceCounter === 17) {
                return true;
            }

            return false;
        }
    }

    // generates a grid with html 

    // renders the player 1 ship placement menu
    function renderPlayer1Options(playerVsComputer = false) {
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
        p1NameInput.setAttribute("name", "player1Name");
        p1NameInput.setAttribute("placeholder", "player 1 name goes here...");
        p1NameInput.setAttribute("required", "");

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
            shipInput.setAttribute("required", "");
            shipInput.setAttribute("maxlength", "4");
            const select = document.createElement("select");

            // set form validation for coordinate format [letter,number]
            shipInput.addEventListener("input", () => {
                // force inputs to be in uppercase
                shipInput.value = shipInput.value.toUpperCase();

                // test for empty input field
                const onlyWhiteSpace = /^\s*$/;
                if (onlyWhiteSpace.test(shipInput.value)) {
                    shipInput.setCustomValidity(
                        "Cannot leave starting ship location blank",
                    );
                } else {
                    shipInput.setCustomValidity("");

                    // test for incorrect location format as long as there is something in the input field
                    const letterThenNumber = /^[A-J],(10|[1-9])+$/;

                    if (letterThenNumber.test(shipInput.value)) {
                        shipInput.setCustomValidity("");
                    } else {
                        shipInput.setCustomValidity(
                            "Must be in format: [letter,number] from A-J and 1-10. Ex: B,3",
                        );
                    }
                }

                shipInput.reportValidity();
            });

            // for each loop, change the appropriate ship label and id value for the ship inputs
            if (i === 0) {
                shipLabel.textContent = "Carrier (5 spaces)";
                shipInput.setAttribute("id", "carrier-p1");
                shipInput.setAttribute("name", "carrier-p1-input");
                select.setAttribute("name", "carrier-p1-dir");
            } else if (i === 1) {
                shipLabel.textContent = "Battleship (4 spaces)";
                shipInput.setAttribute("id", "battleship-p1");
                shipInput.setAttribute("name", "battleship-p1-input");
                select.setAttribute("name", "battleship-p1-dir");
            } else if (i === 2) {
                shipLabel.textContent = "Cruiser (3 spaces)";
                shipInput.setAttribute("id", "cruiser-p1");
                shipInput.setAttribute("name", "cruiser-p1-input");
                select.setAttribute("name", "cruiser-p1-dir");
            } else if (i === 3) {
                shipLabel.textContent = "Submarine (3 spaces)";
                shipInput.setAttribute("id", "submarine-p1");
                shipInput.setAttribute("name", "submarine-p1-input");
                select.setAttribute("name", "submarine-p1-dir");
            } else if (i === 4) {
                shipLabel.textContent = "Destroyer (2 spaces)";
                shipInput.setAttribute("id", "destroyer-p1");
                shipInput.setAttribute("name", "destroyer-p1-input");
                select.setAttribute("name", "destroyer-p1-dir");
            }

            // select dropdown menu for directions
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

        // form submit will transition into player 2 options if playerVsComputer = false, or just get player 1 inputs if playerVsComputer = true
        if (playerVsComputer === false) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                // get player 1 form inputs and make player 1. Convert string coordinates to array form: ["B","3"]
                const formData = new FormData(form);
                const player1NameData = formData.get("player1Name");
                const rawCarrierPos = formData.get("carrier-p1-input");
                const carrierPos = rawCarrierPos.split(",");
                const carrierFace = formData.get("carrier-p1-dir");
                const rawBattleshipPos = formData.get("battleship-p1-input");
                const battleshipPos = rawBattleshipPos.split(",");
                const battleshipFace = formData.get("battleship-p1-dir");
                const rawCruiserPos = formData.get("cruiser-p1-input");
                const cruiserPos = rawCruiserPos.split(",");
                const cruiserFace = formData.get("cruiser-p1-dir");
                const rawSubmarinePos = formData.get("submarine-p1-input");
                const submarinePos = rawSubmarinePos.split(",");
                const submarineFace = formData.get("submarine-p1-dir");
                const rawDestroyerPos = formData.get("destroyer-p1-input");
                const destroyerPos = rawDestroyerPos.split(",");
                const destroyerFace = formData.get("destroyer-p1-dir");

                gameControl.makePlayer1(
                    player1NameData,
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

                // submit check to see if the ship placements were valid
                if (checkValidPositions(true, false)) {
                    // get and show player 2 modal after player 1
                    dialog.close();
                    const player2Options = document.querySelector(
                        ".pvp-player2-options",
                    );
                    player2Options.showModal();
                } else {
                    alert("overlapping/invalid ship positions");
                }
            });
        } else if (playerVsComputer === true) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                // get player 1 form inputs and make player 1
                const formData = new FormData(form);
                const player1NameData = formData.get("player1Name");
                const rawCarrierPos = formData.get("carrier-p1-input");
                const carrierPos = rawCarrierPos.split(",");
                const carrierFace = formData.get("carrier-p1-dir");
                const rawBattleshipPos = formData.get("battleship-p1-input");
                const battleshipPos = rawBattleshipPos.split(",");
                const battleshipFace = formData.get("battleship-p1-dir");
                const rawCruiserPos = formData.get("cruiser-p1-input");
                const cruiserPos = rawCruiserPos.split(",");
                const cruiserFace = formData.get("cruiser-p1-dir");
                const rawSubmarinePos = formData.get("submarine-p1-input");
                const submarinePos = rawSubmarinePos.split(",");
                const submarineFace = formData.get("submarine-p1-dir");
                const rawDestroyerPos = formData.get("destroyer-p1-input");
                const destroyerPos = rawDestroyerPos.split(",");
                const destroyerFace = formData.get("destroyer-p1-dir");

                gameControl.makePlayer1(
                    player1NameData,
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

                // submit check to see if the ship placements were valid
                if (checkValidPositions(true, false)) {
                    // get and show player 2 modal after player 1
                    dialog.close();

                    // since its player vs computer, after creating player 1, make a computer player 2
                    gameControl.makePlayer2("", true);
                    
                } else {
                    alert("overlapping/invalid ship positions");
                }
            });
        }
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
        const p2NameLabel = document.createElement("label");
        p2NameLabel.setAttribute("for", "p2-name");
        p2NameLabel.textContent = "Player 2 name:";
        const p2NameInput = document.createElement("input");
        p2NameInput.setAttribute("type", "text");
        p2NameInput.setAttribute("id", "p2-name");
        p2NameInput.setAttribute("maxlength", "20");
        p2NameInput.setAttribute("name", "player2Name");
        p2NameInput.setAttribute("placeholder", "player 2 name goes here...");
        p2NameInput.setAttribute("required", "");

        // construct form
        form.appendChild(optionHeader);
        nameGroup.appendChild(p2NameLabel);
        nameGroup.appendChild(p2NameInput);
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
            shipInput.setAttribute("required", "");
            shipInput.setAttribute("maxlength", "4");
            const select = document.createElement("select");

            // set form validation for coordinate format [letter,number]
            shipInput.addEventListener("input", () => {
                // force inputs to be in uppercase
                shipInput.value = shipInput.value.toUpperCase();

                // test for empty input field
                const onlyWhiteSpace = /^\s*$/;
                if (onlyWhiteSpace.test(shipInput.value)) {
                    shipInput.setCustomValidity(
                        "Cannot leave starting ship location blank",
                    );
                } else {
                    shipInput.setCustomValidity("");

                    // test for incorrect location format as long as there is something in the input field
                    const letterThenNumber = /^[A-J],(10|[1-9])+$/;

                    if (letterThenNumber.test(shipInput.value)) {
                        shipInput.setCustomValidity("");
                    } else {
                        shipInput.setCustomValidity(
                            "Must be in format: [letter,number] from A-J and 1-10. Ex: B,3",
                        );
                    }
                }

                shipInput.reportValidity();
            });

            // for each loop, change the appropriate ship label and id value for the ship inputs
            if (i === 0) {
                shipLabel.textContent = "Carrier (5 spaces)";
                shipInput.setAttribute("id", "carrier-p2");
                shipInput.setAttribute("name", "carrier-p2-input");
                select.setAttribute("name", "carrier-p2-dir");
            } else if (i === 1) {
                shipLabel.textContent = "Battleship (4 spaces)";
                shipInput.setAttribute("id", "battleship-p2");
                shipInput.setAttribute("name", "battleship-p2-input");
                select.setAttribute("name", "battleship-p2-dir");
            } else if (i === 2) {
                shipLabel.textContent = "Cruiser (3 spaces)";
                shipInput.setAttribute("id", "cruiser-p2");
                shipInput.setAttribute("name", "cruiser-p2-input");
                select.setAttribute("name", "cruiser-p2-dir");
            } else if (i === 3) {
                shipLabel.textContent = "Submarine (3 spaces)";
                shipInput.setAttribute("id", "submarine-p2");
                shipInput.setAttribute("name", "submarine-p2-input");
                select.setAttribute("name", "submarine-p2-dir");
            } else if (i === 4) {
                shipLabel.textContent = "Destroyer (2 spaces)";
                shipInput.setAttribute("id", "destroyer-p2");
                shipInput.setAttribute("name", "destroyer-p2-input");
                select.setAttribute("name", "destroyer-p2-dir");
            }

            // select dropdown menu for directions
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

        // form submit event for player 2
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // get player 2 form inputs and make player 2
            const formData = new FormData(form);
            const player2NameData = formData.get("player2Name");
            const rawCarrierPos = formData.get("carrier-p2-input");
            const carrierPos = rawCarrierPos.split(",");
            const carrierFace = formData.get("carrier-p2-dir");
            const rawBattleshipPos = formData.get("battleship-p2-input");
            const battleshipPos = rawBattleshipPos.split(",");
            const battleshipFace = formData.get("battleship-p2-dir");
            const rawCruiserPos = formData.get("cruiser-p2-input");
            const cruiserPos = rawCruiserPos.split(",");
            const cruiserFace = formData.get("cruiser-p2-dir");
            const rawSubmarinePos = formData.get("submarine-p2-input");
            const submarinePos = rawSubmarinePos.split(",");
            const submarineFace = formData.get("submarine-p2-dir");
            const rawDestroyerPos = formData.get("destroyer-p2-input");
            const destroyerPos = rawDestroyerPos.split(",");
            const destroyerFace = formData.get("destroyer-p2-dir");

            // pass false for the isComputer boolean value in makePlayer2()
            gameControl.makePlayer2(
                player2NameData,
                false,
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

            if (checkValidPositions(false, true)) {
                dialog.close();
            } else {
                alert("overlapping/invalid ship positions");
            }
        });
    }

    // renders the current boards for both players
    function renderCurrentBoard() {}

    return {
        renderCurrentBoard,
        renderGamemodeSelection,
    };
}
