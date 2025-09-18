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

    // generates a mini grid to display in the options menu to guide with making ship placement choices
    function generateMiniGrid(attachHTMLElement, addonClassTag = "") {
        const boardContainer = document.createElement("div");
        const numberAxis = document.createElement("div");
        const letterAxis = document.createElement("div");
        const gridContainer = document.createElement("div");

        if (addonClassTag === "") {
            boardContainer.setAttribute("class", "board-container");
            numberAxis.setAttribute("class", "number-axis");
            letterAxis.setAttribute("class", "letter-axis");
            gridContainer.setAttribute("class", "grid-container");
        } else {
            boardContainer.setAttribute(
                "class",
                `board-container ${addonClassTag}`,
            );
            numberAxis.setAttribute("class", `number-axis ${addonClassTag}`);
            letterAxis.setAttribute("class", `letter-axis ${addonClassTag}`);
            gridContainer.setAttribute(
                "class",
                `grid-container ${addonClassTag}`,
            );
        }

        //loop to fill numberAxis
        for (let i = 1; i <= 10; i += 1) {
            const numberDiv = document.createElement("div");
            numberDiv.textContent = i;
            numberAxis.appendChild(numberDiv);
        }

        // add letter divs to letterAxis
        const ADiv = document.createElement("div");
        ADiv.textContent = "A";
        const BDiv = document.createElement("div");
        BDiv.textContent = "B";
        const CDiv = document.createElement("div");
        CDiv.textContent = "C";
        const DDiv = document.createElement("div");
        DDiv.textContent = "D";
        const EDiv = document.createElement("div");
        EDiv.textContent = "E";
        const FDiv = document.createElement("div");
        FDiv.textContent = "F";
        const GDiv = document.createElement("div");
        GDiv.textContent = "G";
        const HDiv = document.createElement("div");
        HDiv.textContent = "H";
        const IDiv = document.createElement("div");
        IDiv.textContent = "I";
        const JDiv = document.createElement("div");
        JDiv.textContent = "J";

        letterAxis.appendChild(ADiv);
        letterAxis.appendChild(BDiv);
        letterAxis.appendChild(CDiv);
        letterAxis.appendChild(DDiv);
        letterAxis.appendChild(EDiv);
        letterAxis.appendChild(FDiv);
        letterAxis.appendChild(GDiv);
        letterAxis.appendChild(HDiv);
        letterAxis.appendChild(IDiv);
        letterAxis.appendChild(JDiv);

        // loop to fill grid container
        let counter = 1;
        for (let j = 1; j <= 100; j += 1) {
            const gridCell = document.createElement("div");
            gridCell.textContent = counter;
            gridContainer.appendChild(gridCell);
            counter += 1;

            if (j % 10 === 0) {
                counter = 1;
            }
        }

        boardContainer.appendChild(numberAxis);
        boardContainer.appendChild(letterAxis);
        boardContainer.appendChild(gridContainer);

        attachHTMLElement.appendChild(boardContainer);
    }

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
                    const letterThenNumber = /^[A-J],(10|[1-9])$/;

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
        generateMiniGrid(dialog, "option");
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

                    renderFrontPage();
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
                    const letterThenNumber = /^[A-J],(10|[1-9])$/;

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
        generateMiniGrid(dialog, "option");
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
                renderFrontPage();
            } else {
                alert("overlapping/invalid ship positions");
            }
        });
    }

    // renders the header with the battleship title at the top of the webpage
    function renderHeader(attachHTMLElement) {
        //  battleship title at the top of the webpage
        const header = document.createElement("header");
        const battleshipTitle = document.createElement("h1");
        battleshipTitle.setAttribute("class", "game-title");
        battleshipTitle.textContent = "Battleship";

        header.appendChild(battleshipTitle);
        attachHTMLElement.appendChild(header);
    }

    // renders the sign that re-renders whenever the turn changes
    function renderTurnOrder(attachHTMLElement) {
        // get the current turn player name
        const turnStatus = gameControl.getCurrentTurn();
        const currentTurnName = turnStatus.getName();

        // create the current turn label
        const h1 = document.createElement("h1");
        h1.setAttribute("class", "current-turn");
        h1.textContent = `Current turn: ${currentTurnName}`;

        attachHTMLElement.appendChild(h1);
    }

    // gets the ship type when passed a shipObj and based on the shipLength
    function getShipType(shipObj) {
        const shipLength = shipObj.getLength();

        if (shipLength === 5) {
            return "carrier";
        } else if (shipLength === 4) {
            return "battleship";
        } else if (shipLength === 3) {
            return "cruiser";
        } else if (shipLength === 2) {
            return "destroyer";
        }
    }

    // populates the grid with cell HTML attributes to color code ship spaces
    function populateGrid(player1 = false, player2 = false) {
        if (player1 === true && player2 === false) {
            const player1Board = gameControl
                .getPlayer1()
                .getGameBoard()
                .getBoard();
            let cruiserCounter = 0;
            player1Board.forEach((shipObj, coordinate) => {
                let shipType = getShipType(shipObj);
                const shipCoordinate = coordinate.split(",");
                const shipX = shipCoordinate[0];
                const shipY = shipCoordinate[1];

                const htmlGridCell = document.querySelector(
                    `.grid-container.player1 > .coord-${shipX}-${shipY}`,
                );

                if (shipType === "cruiser" && cruiserCounter === 3) {
                    shipType = "submarine";
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} submarine`,
                    );
                } else if (shipType === "cruiser" && cruiserCounter !== 3) {
                    cruiserCounter += 1;
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} cruiser`,
                    );
                }

                if (shipType === "carrier") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} carrier`,
                    );
                } else if (shipType === "battleship") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} battleship`,
                    );
                } else if (shipType === "destroyer") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} destroyer`,
                    );
                }
            });
        } else if (player2 === true && player1 === false) {
            const player2Board = gameControl
                .getPlayer2()
                .getGameBoard()
                .getBoard();
            let cruiserCounter = 0;
            player2Board.forEach((shipObj, coordinate) => {
                let shipType = getShipType(shipObj);
                const shipCoordinate = coordinate.split(",");
                const shipX = shipCoordinate[0];
                const shipY = shipCoordinate[1];

                const htmlGridCell = document.querySelector(
                    `.grid-container.player2 > .coord-${shipX}-${shipY}`,
                );

                if (shipType === "cruiser" && cruiserCounter === 3) {
                    shipType = "submarine";
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} submarine`,
                    );
                } else if (shipType === "cruiser" && cruiserCounter !== 3) {
                    cruiserCounter += 1;
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} cruiser`,
                    );
                }

                if (shipType === "carrier") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} carrier`,
                    );
                } else if (shipType === "battleship") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} battleship`,
                    );
                } else if (shipType === "destroyer") {
                    htmlGridCell.setAttribute(
                        "class",
                        `coord-${shipX}-${shipY} destroyer`,
                    );
                }
            });
        }
    }

    // generate a grid based on player object given with coodinate HTML attribute
    function generateGrid(attachHTMLElement, player1 = false, player2 = false) {
        if (player1 === true && player2 === false) {
            const boardContainer = document.createElement("div");
            boardContainer.setAttribute("class", "board-container player1");
            const numberAxis = document.createElement("div");
            numberAxis.setAttribute("class", "number-axis player1");
            const letterAxis = document.createElement("div");
            letterAxis.setAttribute("class", "letter-axis player1");
            const gridContainer = document.createElement("div");
            gridContainer.setAttribute("class", "grid-container player1");

            // fill number and letter axis
            for (let j = 1; j <= 10; j += 1) {
                const numberDiv = document.createElement("div");
                numberDiv.textContent = j;
                numberAxis.appendChild(numberDiv);
            }

            // add letter divs to letterAxis
            const ADiv = document.createElement("div");
            ADiv.textContent = "A";
            const BDiv = document.createElement("div");
            BDiv.textContent = "B";
            const CDiv = document.createElement("div");
            CDiv.textContent = "C";
            const DDiv = document.createElement("div");
            DDiv.textContent = "D";
            const EDiv = document.createElement("div");
            EDiv.textContent = "E";
            const FDiv = document.createElement("div");
            FDiv.textContent = "F";
            const GDiv = document.createElement("div");
            GDiv.textContent = "G";
            const HDiv = document.createElement("div");
            HDiv.textContent = "H";
            const IDiv = document.createElement("div");
            IDiv.textContent = "I";
            const JDiv = document.createElement("div");
            JDiv.textContent = "J";

            letterAxis.appendChild(ADiv);
            letterAxis.appendChild(BDiv);
            letterAxis.appendChild(CDiv);
            letterAxis.appendChild(DDiv);
            letterAxis.appendChild(EDiv);
            letterAxis.appendChild(FDiv);
            letterAxis.appendChild(GDiv);
            letterAxis.appendChild(HDiv);
            letterAxis.appendChild(IDiv);
            letterAxis.appendChild(JDiv);

            // fill player 1 grid with grid cells
            let rowCounter = 1;
            let colCounter = 1;
            for (let i = 1; i <= 100; i += 1) {
                const gridCell = document.createElement("div");
                gridCell.setAttribute(
                    "class",
                    `coord-${colCounter}-${rowCounter}`,
                );
                colCounter += 1;
                if (i % 10 === 0) {
                    rowCounter += 1;
                    colCounter = 1;
                }
                gridContainer.appendChild(gridCell);
            }

            boardContainer.appendChild(numberAxis);
            boardContainer.appendChild(letterAxis);
            boardContainer.appendChild(gridContainer);
            attachHTMLElement.appendChild(boardContainer);
        } else if (player2 === true && player1 === false) {
            const boardContainer = document.createElement("div");
            boardContainer.setAttribute("class", "board-container player2");
            const numberAxis = document.createElement("div");
            numberAxis.setAttribute("class", "number-axis player2");
            const letterAxis = document.createElement("div");
            letterAxis.setAttribute("class", "letter-axis player2");
            const gridContainer = document.createElement("div");
            gridContainer.setAttribute("class", "grid-container player2");

            // fill number and letter axis
            for (let j = 1; j <= 10; j += 1) {
                const numberDiv = document.createElement("div");
                numberDiv.textContent = j;
                numberAxis.appendChild(numberDiv);
            }

            // add letter divs to letterAxis
            const ADiv = document.createElement("div");
            ADiv.textContent = "A";
            const BDiv = document.createElement("div");
            BDiv.textContent = "B";
            const CDiv = document.createElement("div");
            CDiv.textContent = "C";
            const DDiv = document.createElement("div");
            DDiv.textContent = "D";
            const EDiv = document.createElement("div");
            EDiv.textContent = "E";
            const FDiv = document.createElement("div");
            FDiv.textContent = "F";
            const GDiv = document.createElement("div");
            GDiv.textContent = "G";
            const HDiv = document.createElement("div");
            HDiv.textContent = "H";
            const IDiv = document.createElement("div");
            IDiv.textContent = "I";
            const JDiv = document.createElement("div");
            JDiv.textContent = "J";

            letterAxis.appendChild(ADiv);
            letterAxis.appendChild(BDiv);
            letterAxis.appendChild(CDiv);
            letterAxis.appendChild(DDiv);
            letterAxis.appendChild(EDiv);
            letterAxis.appendChild(FDiv);
            letterAxis.appendChild(GDiv);
            letterAxis.appendChild(HDiv);
            letterAxis.appendChild(IDiv);
            letterAxis.appendChild(JDiv);

            // fill player 2 grid with grid cells
            let rowCounter = 1;
            let colCounter = 1;
            for (let i = 1; i <= 100; i += 1) {
                const gridCell = document.createElement("div");
                gridCell.setAttribute(
                    "class",
                    `coord-${colCounter}-${rowCounter}`,
                );
                colCounter += 1;
                if (i % 10 === 0) {
                    rowCounter += 1;
                    colCounter = 1;
                }
                gridContainer.appendChild(gridCell);
            }

            boardContainer.appendChild(numberAxis);
            boardContainer.appendChild(letterAxis);
            boardContainer.appendChild(gridContainer);
            attachHTMLElement.appendChild(boardContainer);
        }
    }

    // generates the main grids for both player 1 and player 2 in their current state
    function renderContent(attachHTMLElement) {
        // main content container that holds player 1 content and player 2 content
        const contentContainer = document.createElement("div");
        contentContainer.setAttribute("class", "content-container");

        // render player 1 current board and attack history
        const player1Content = document.createElement("div");
        player1Content.setAttribute("class", "player1-content");
        const player1Header = document.createElement("h2");
        player1Header.setAttribute("class", "player1-header");
        const player1Name = gameControl.getPlayer1().getName();
        player1Header.textContent = player1Name;
        player1Content.appendChild(player1Header);

        // create player 1 board
        generateGrid(player1Content, true, false);
        contentContainer.appendChild(player1Content);

        // render player 2 current board and attack history
        const player2Content = document.createElement("div");
        player2Content.setAttribute("class", "player2-content");
        const player2Header = document.createElement("h2");
        player2Header.setAttribute("class", "player2-header");
        const player2Name = gameControl.getPlayer2().getName();
        player2Header.textContent = player2Name;
        player2Content.appendChild(player2Header);

        // create player 2 board
        generateGrid(player2Content, false, true);
        contentContainer.appendChild(player2Content);

        // attach content container to body
        attachHTMLElement.appendChild(contentContainer);

        // populate both player1 and player2 boards
        populateGrid(true, false);
        populateGrid(false, true);
    }

    // adds a hidden tag depending on whose turn it currently is
    function renderHidden() {
        const currentTurnName = gameControl.getCurrentTurn().getName();
        const player1Name = gameControl.getPlayer1().getName();
        const player2Name = gameControl.getPlayer2().getName();
        const player2CompStatus = gameControl.getPlayer2().getComputerStatus();

        // if player 1 turn, then hide player 2 (if player 2 is NOT a computer)
        if (currentTurnName === player1Name && player2CompStatus === false) {
            // check if player 1 censor bar exists and remove it
            const p1Censor = document.querySelector(".censor");

            if (p1Censor !== null && p1Censor !== undefined) {
                p1Censor.remove();
            }

            const censor = document.createElement("div");
            censor.setAttribute("class", "censor");

            const boardContainerP2 = document.querySelector(
                ".board-container.player2",
            );

            boardContainerP2.appendChild(censor);

            let rowCounter = 1;
            let colCounter = 1;
            for (let i = 1; i <= 100; i += 1) {
                const gridCell = document.createElement("div");
                gridCell.setAttribute(
                    "class",
                    `coord-${colCounter}-${rowCounter}`,
                );
                colCounter += 1;
                if (i % 10 === 0) {
                    rowCounter += 1;
                    colCounter = 1;
                }
                censor.appendChild(gridCell);
            }

            const gridCellList = document.querySelectorAll(".censor > div");
            const player2AttackHistory = gameControl
                .getPlayer2()
                .getGameBoard()
                .getAttackHistory();
            gridCellList.forEach((gridCell) => {
                // where the strArr contains: ["coord", col, row]
                const strArr = gridCell.getAttribute("class").split("-");
                const xTemp = strArr[1];
                const yTemp = strArr[2];
                const combinedPositionString = `${xTemp},${yTemp}`;

                if (player2AttackHistory.has(combinedPositionString)) {
                    if (
                        player2AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} miss`,
                        );
                        gridCell.textContent = "X";
                    } else {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} hit`,
                        );
                        gridCell.textContent = "X";
                    }
                }
            });
        } else if (
            (currentTurnName === "Computer Player" ||
                currentTurnName === player1Name) &&
            player2CompStatus === true
        ) {
            //  if computer player's turn, make all of the grid cells grey and don't reveal board
            const compCensor = document.createElement("div");
            compCensor.setAttribute("class", "censor");

            const boardContainerP2 = document.querySelector(
                ".board-container.player2",
            );

            boardContainerP2.appendChild(compCensor);

            let rowCounter = 1;
            let colCounter = 1;
            for (let i = 1; i <= 100; i += 1) {
                const gridCell = document.createElement("div");
                gridCell.setAttribute(
                    "class",
                    `coord-${colCounter}-${rowCounter}`,
                );
                colCounter += 1;
                if (i % 10 === 0) {
                    rowCounter += 1;
                    colCounter = 1;
                }
                compCensor.appendChild(gridCell);
            }

            const gridCellList = document.querySelectorAll(".censor > div");

            const player2AttackHistory = gameControl
                .getPlayer2()
                .getGameBoard()
                .getAttackHistory();
            gridCellList.forEach((gridCell) => {
                // where the strArr contains: ["coord", col, row]
                const strArr = gridCell.getAttribute("class").split("-");
                const xTemp = strArr[1];
                const yTemp = strArr[2];
                const combinedPositionString = `${xTemp},${yTemp}`;

                if (player2AttackHistory.has(combinedPositionString)) {
                    if (
                        player2AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} miss`,
                        );
                        gridCell.textContent = "X";
                    } else {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} hit`,
                        );
                        gridCell.textContent = "X";
                    }
                }
            });

            const player1AttackHistory = gameControl
                .getPlayer1()
                .getGameBoard()
                .getAttackHistory();

            const gridCellListP1 = document.querySelectorAll(
                ".grid-container.player1 > div",
            );
            gridCellListP1.forEach((gridCell) => {
                // where the strArr contains: ["coord", col, row]
                const strArr = gridCell.getAttribute("class").split(" ");
                const coordinateArr = strArr[0].split("-");
                const xTemp = coordinateArr[1];
                const yTemp = coordinateArr[2];
                const combinedPositionString = `${xTemp},${yTemp}`;

                if (player1AttackHistory.has(combinedPositionString)) {
                    if (
                        player1AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} miss`,
                        );
                        gridCell.textContent = "X";
                    } else {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} hit`,
                        );
                        gridCell.textContent = "X";
                    }
                }
            });
        } else if (currentTurnName === player2Name) {
            // if player 2 turn, the hide player 1

            // check if player 1 censor bar exists and remove it
            const p2Censor = document.querySelector(".censor");

            if (p2Censor !== null && p2Censor !== undefined) {
                p2Censor.remove();
            }

            const censor = document.createElement("div");
            censor.setAttribute("class", "censor");

            const boardContainerP1 = document.querySelector(
                ".board-container.player1",
            );
            boardContainerP1.appendChild(censor);

            let rowCounter = 1;
            let colCounter = 1;
            for (let i = 1; i <= 100; i += 1) {
                const gridCell = document.createElement("div");
                gridCell.setAttribute(
                    "class",
                    `coord-${colCounter}-${rowCounter}`,
                );
                colCounter += 1;
                if (i % 10 === 0) {
                    rowCounter += 1;
                    colCounter = 1;
                }
                censor.appendChild(gridCell);
            }

            const gridCellList = document.querySelectorAll(".censor > div");
            const player1AttackHistory = gameControl
                .getPlayer1()
                .getGameBoard()
                .getAttackHistory();
            gridCellList.forEach((gridCell) => {
                // where the strArr contains: ["coord", col, row]
                const strArr = gridCell.getAttribute("class").split("-");
                const xTemp = strArr[1];
                const yTemp = strArr[2];
                const combinedPositionString = `${xTemp},${yTemp}`;

                if (player1AttackHistory.has(combinedPositionString)) {
                    if (
                        player1AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} miss`,
                        );
                        gridCell.textContent = "X";
                    } else {
                        gridCell.setAttribute(
                            "class",
                            `${gridCell.getAttribute("class")} hit`,
                        );
                        gridCell.textContent = "X";
                    }
                }
            });
        }
    }

    // renders the footer of the webpage
    function renderFooter(attachHTMLElement) {
        const footer = document.createElement("footer");
        const attackHistoryBox = document.createElement("ul");
        attackHistoryBox.setAttribute("class", "attack-history");
        const firstLi = document.createElement("li");
        firstLi.textContent = "> Please enter attack coordinates in input box";
        attackHistoryBox.appendChild(firstLi);
        const attackInputContainer = document.createElement("div");
        attackInputContainer.setAttribute("class", "attack-container");
        const attackForm = document.createElement("form");
        attackForm.setAttribute("class", "attack-form");
        const attackInput = document.createElement("input");
        attackInput.setAttribute("type", "text");
        attackInput.setAttribute("class", "attack-input");
        attackInput.setAttribute("placeholder", "letter, number. ex: A,10");
        attackInput.setAttribute("required", "");
        attackInput.setAttribute("maxlength", "4");
        attackInput.setAttribute("name", "attack-coord");
        const attackButton = document.createElement("button");
        attackButton.setAttribute("type", "submit");
        attackButton.setAttribute("class", "attack-button");
        attackButton.textContent = "Attack!";

        // add form validity checks for attack input box
        attackInput.addEventListener("input", () => {
            // force inputs to be in uppercase
            attackInput.value = attackInput.value.toUpperCase();

            // test for empty input field
            const onlyWhiteSpace = /^\s*$/;
            if (onlyWhiteSpace.test(attackInput.value)) {
                attackInput.setCustomValidity(
                    "Cannot leave attack coordinate blank",
                );
            } else {
                attackInput.setCustomValidity("");

                // test for incorrect location format as long as there is something in the input field
                const letterThenNumber = /^[A-J],(10|[1-9])$/;

                if (letterThenNumber.test(attackInput.value)) {
                    attackInput.setCustomValidity("");
                } else {
                    attackInput.setCustomValidity(
                        "Must be in format: [letter,number] from A-J and 1-10. Ex: B,3",
                    );
                }
            }

            attackInput.reportValidity();
        });

        // upon successful submission event of the form, send attack through gameControl and re-render/update everything
        attackForm.addEventListener("submit", (e) => {
            // prevent the page from refreshing and clear textbox
            e.preventDefault();

            // get attack Y position and attack X position from the value of the input
            const formData = new FormData(attackForm);
            const attackArr = formData.get("attack-coord").split(",");
            let attackY = attackArr[0];
            let attackX = attackArr[1];

            // send coordinates to gameControl
            const gameStatus = gameControl.playRound(attackY, attackX);

            // win is detected, open reset modal that refreshes the webpage
            if (gameStatus === true) {
                // reset modal
                const resetModal = document.createElement("dialog");
                const resetButton = document.createElement("button");
                resetModal.setAttribute("class", "reset-modal");
                resetButton.setAttribute("class", "reset-button");
                resetButton.textContent = "Reset Game";
                resetModal.appendChild(resetButton);
                attachHTMLElement.appendChild(resetModal);
                resetModal.showModal();

                resetButton.addEventListener("click", () => {
                    location.reload();
                });
            }

            // reset form for next attack
            attackForm.reset();

            // if computer player then replace attackY and attackX
            if (
                gameControl.getCompAttack() !== undefined &&
                gameControl.getCompAttack() !== null
            ) {
                const computerAttack = gameControl.getCompAttack();
                attackY = computerAttack[0];
                attackX = computerAttack[1];
            }

            // only re-render page if the input attack was valid
            if (gameStatus !== "error") {
                // re-render currentTurn to reflect new player turn
                const prevCurrentTurn = document.querySelector(".current-turn");
                prevCurrentTurn.remove();
                const header = document.querySelector("header");
                renderTurnOrder(header);

                // add onto the attack history dialog box
                const currentTurnName = gameControl.getCurrentTurn().getName();
                const player1Name = gameControl.getPlayer1().getName();
                const player2Name = gameControl.getPlayer2().getName();
                const yTemp = gameControl
                    .getPlayer1()
                    .getGameBoard()
                    .convertLetterToCoor(attackY);
                const combinedPositionString = `${attackX},${yTemp}`;
                const newLi = document.createElement("li");

                // get previous attack history and update it upon turn change
                if (currentTurnName === player2Name) {
                    // after player 1 turn, then update history with player 2 attack history board
                    const player2AttackHistory = gameControl
                        .getPlayer2()
                        .getGameBoard()
                        .getAttackHistory();

                    // generate hit or miss result
                    let attackResult;
                    if (
                        player2AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        attackResult = "miss";
                    } else {
                        attackResult = "hit!";
                    }

                    // add attack result to the attack history box
                    newLi.textContent = `> ${player1Name} attacks ${player2Name} at [${attackY},${attackX}] and it's a ${attackResult}`;
                    attackHistoryBox.prepend(newLi);

                    // create another text message if ship has been sunk
                    if (attackResult === "hit!" && gameStatus === false) {
                        const attackedShip = player2AttackHistory.get(
                            combinedPositionString,
                        );
                        const sunkStatus = attackedShip.isSunk();

                        if (sunkStatus === true) {
                            const sunkMessage = document.createElement("li");
                            let foundSunkShip;
                            // search within gridList for the attacked ship coordinates and detect what ship it is
                            const gridCellList = document.querySelectorAll(".grid-container.player2 > div");
                            gridCellList.forEach((gridCell) => {
                                const strArr = gridCell
                                    .getAttribute("class")
                                    .split(" ");
                                const coordinateArr = strArr[0].split("-");
                                const coordinateX = coordinateArr[1];
                                const coordinateY = coordinateArr[2];
                                let numberY = gameControl.getPlayer1().getGameBoard().convertLetterToCoor(attackY);
                                numberY = numberY.toString();

                                // if the coordinate has been found, then extract the ship from it and add it to the message string
                                if (
                                    coordinateX === attackX &&
                                    coordinateY === numberY
                                ) {
                                    foundSunkShip = strArr[1];
                                }
                            });

                            sunkMessage.textContent = `> ${player1Name} has sunk a ${foundSunkShip}!`;
                            attackHistoryBox.prepend(sunkMessage);
                        }
                    }
                } else if (currentTurnName === player1Name) {
                    // after player 2 turn, then update history with player 2 attack history
                    const player1AttackHistory = gameControl
                        .getPlayer1()
                        .getGameBoard()
                        .getAttackHistory();

                    // generate hit or miss result
                    let attackResult;
                    if (
                        player1AttackHistory.get(combinedPositionString) ===
                        "miss"
                    ) {
                        attackResult = "miss";
                    } else {
                        attackResult = "hit!";
                    }

                    // add attack result to the attack history box
                    newLi.textContent = `> ${player2Name} attacks ${player1Name} at [${attackY},${attackX}] and it's a ${attackResult}`;
                    attackHistoryBox.prepend(newLi);

                    // create another text message if ship has been sunk
                    if (attackResult === "hit!" && gameStatus === false) {
                        const attackedShip = player1AttackHistory.get(
                            combinedPositionString,
                        );
                        const sunkStatus = attackedShip.isSunk();

                        if (sunkStatus === true) {
                            const sunkMessage = document.createElement("li");
                            let foundSunkShip;
                            // search within gridList for the attacked ship coordinates and detect what ship it is
                            const gridCellList = document.querySelectorAll(".grid-container.player1 > div");
                            gridCellList.forEach((gridCell) => {
                                const strArr = gridCell
                                    .getAttribute("class")
                                    .split(" ");
                                const coordinateArr = strArr[0].split("-");
                                const coordinateX = coordinateArr[1];
                                const coordinateY = coordinateArr[2];
                                let numberY = gameControl.getPlayer1().getGameBoard().convertLetterToCoor(attackY);
                                numberY = numberY.toString();

                                // if the coordinate has been found, then extract the ship from it and add it to the message string
                                if (
                                    coordinateX === attackX &&
                                    coordinateY === numberY
                                ) {
                                    foundSunkShip = strArr[1];
                                }
                            });

                            sunkMessage.textContent = `> ${player2Name} has sunk a ${foundSunkShip}!`;
                            attackHistoryBox.prepend(sunkMessage);
                        }
                    }
                }

                // re-render the hidden censor between boards
                renderHidden();
            }

            // reset compAttack if it has a value
            gameControl.setCompAttack(undefined);

            // if the next turn is a computer, trigger this event again to render computer attack
            if (gameControl.getCurrentTurn().getComputerStatus() === true) {
                attackForm.dispatchEvent(new Event("submit"));
            }
        });

        attackForm.appendChild(attackInput);
        attackForm.appendChild(attackButton);
        attackInputContainer.appendChild(attackForm);
        footer.appendChild(attackHistoryBox);
        footer.appendChild(attackInputContainer);

        attachHTMLElement.appendChild(footer);
    }

    // renders the entire front page
    function renderFrontPage() {
        const body = document.querySelector("body");

        // render the header of the webpage, battleship title and turn order
        renderHeader(body);
        const header = document.querySelector("header");
        renderTurnOrder(header);

        // render the content container, which holds player 1 and player 2 boards
        renderContent(body);

        // render the hidden attribute depending on whose turn it is, hide the other board
        // note: make it so that when the board is hidden, show the previous attacks/successful attacks
        renderHidden();

        // render footer of the webpage, attack history textbox and attack + submission button
        renderFooter(body);
    }

    return {
        renderFrontPage,
        renderGamemodeSelection,
    };
}
