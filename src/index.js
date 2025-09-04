import "./style.css";
import interfacecontroller from "./modules/interfacecontroller.js";

const userInterface = interfacecontroller();

// render player option modals 
userInterface.renderPlayer1Options();
userInterface.renderPlayer2Options();

// shows game mode selection on window load
userInterface.renderGamemodeSelection();
