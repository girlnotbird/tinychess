import "./style.css";
import { Board } from "@/Board/Board.js";
const App = document.querySelector("#app");
const myBoard = new Board();
myBoard.initialize();
App.appendChild(myBoard.elem());
