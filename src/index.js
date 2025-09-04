import "./style.css";
import interfacecontroller from "./modules/interfacecontroller.js";

const userInterface = interfacecontroller();

// shows game mode selection on window load
// userInterface.renderGamemodeSelection();
userInterface.renderPlayer1Options();
userInterface.renderPlayer2Options();