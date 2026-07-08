import { Board } from "@/Board/Board.js"

const App: HTMLElement = document.querySelector("#app")!;
App.innerHTML = "Hello, World!";

const myBoard: Board = new Board();
myBoard.initialize();

App.appendChild(myBoard.elem());
myBoard.drawBoardState();

let state: boolean = false;
App.addEventListener("click", (ev)=>{
    if (state) {
        myBoard.state.setTestBoardPosition();
        myBoard.drawBoardState();
        state = false;
        return;
    }
    myBoard.state.setInitialBoardPosition();
    myBoard.drawBoardState();
    state = true;
    return;
});