import "./style.css"
import { Board } from "@/Board/Board.js"

const App: HTMLElement = document.querySelector("#app")!;

const myBoard: Board = new Board();
myBoard.initialize();

App.appendChild(myBoard.elem());