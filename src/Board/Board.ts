import "./Board.css"
import BlackKingStr from "@/assets/BlackKing.svg?raw"
import BlackQueenStr from "@/assets/BlackQueen.svg?raw"
import BlackRookStr from "@/assets/BlackRook.svg?raw"
import BlackKnightStr from "@/assets/BlackKnight.svg?raw"
import BlackBishopStr from "@/assets/BlackBishop.svg?raw"
import BlackPawnStr from "@/assets/BlackPawn.svg?raw"
import WhiteKingStr from "@/assets/WhiteKing.svg?raw"
import WhiteQueenStr from "@/assets/WhiteQueen.svg?raw"
import WhiteRookStr from "@/assets/WhiteRook.svg?raw"
import WhiteKnightStr from "@/assets/WhiteKnight.svg?raw"
import WhiteBishopStr from "@/assets/WhiteBishop.svg?raw"
import WhitePawnStr from "@/assets/WhitePawn.svg?raw"

import "@/types.d.ts"

export enum PieceID {
    EMPTY,

    BLACK_KING,
    BLACK_QUEEN,
    BLACK_ROOK,
    BLACK_KNIGHT,
    BLACK_BISHOP,
    BLACK_PAWN,

    WHITE_KING,
    WHITE_QUEEN,
    WHITE_ROOK,
    WHITE_KNIGHT,
    WHITE_BISHOP,
    WHITE_PAWN
}

function isWhite(piece: PieceID): boolean {
    switch (piece) {
        case PieceID.WHITE_KING: return true;
        case PieceID.WHITE_QUEEN: return true;
        case PieceID.WHITE_ROOK: return true;
        case PieceID.WHITE_KNIGHT: return true;
        case PieceID.WHITE_BISHOP: return true;
        case PieceID.WHITE_PAWN: return true;
        default: return false;
    }
}

function isBlack(piece: PieceID): boolean {
    switch (piece) {
        case PieceID.BLACK_KING: return true;
        case PieceID.BLACK_QUEEN: return true;
        case PieceID.BLACK_ROOK: return true;
        case PieceID.BLACK_KNIGHT: return true;
        case PieceID.BLACK_BISHOP: return true;
        case PieceID.BLACK_PAWN: return true;
        default: return false;
    }
}

function getPieceName(piece: PieceID) {
    switch (piece) {
        case PieceID.BLACK_KING:
            return "BLACK KING";
        case PieceID.BLACK_QUEEN:
            return "BLACK QUEEN";
        case PieceID.BLACK_ROOK:
            return "BLACK ROOK";
        case PieceID.BLACK_KNIGHT:
            return "BLACK KNIGHT";
        case PieceID.BLACK_BISHOP:
            return "BLACK BISHOP";
        case PieceID.BLACK_PAWN:
            return "BLACK PAWN";
        case PieceID.WHITE_KING:
            return "WHITE KING";
        case PieceID.WHITE_QUEEN:
            return "WHITE QUEEN";
        case PieceID.WHITE_ROOK:
            return "WHITE ROOK";
        case PieceID.WHITE_KNIGHT:
            return "WHITE KNIGHT";
        case PieceID.WHITE_BISHOP:
            return "WHITE BISHOP";
        case PieceID.WHITE_PAWN:
            return "WHITE PAWN";
        case PieceID.EMPTY:
            return "NO PIECE";
    }
}

type PieceImage = {
    elem: HTMLImageElement;
}

type PiecePosition = {
    piece: PieceID;
    rank: number;
    file: number;
};

class BoardState {
    squares: Array<PieceID>;

    constructor() {
        this.squares = new Array<PieceID>();
        this.squares.fill(PieceID.EMPTY, 0, 63);
    }

    at(row: number, col: number): PieceID {
        return this.squares[(row - 1) * 8 + (col - 1)];
    }

    set(row: number, col: number, piece: PieceID) {
        this.squares[(row - 1) * 8 + (col - 1)] = piece;
    }

    setInitialBoardPosition(): void {
        this.set(1, 1, PieceID.WHITE_ROOK);
        this.set(1, 2, PieceID.WHITE_KNIGHT);
        this.set(1, 3, PieceID.WHITE_BISHOP);
        this.set(1, 4, PieceID.WHITE_QUEEN);
        this.set(1, 5, PieceID.WHITE_KING);
        this.set(1, 6, PieceID.WHITE_BISHOP);
        this.set(1, 7, PieceID.WHITE_KNIGHT);
        this.set(1, 8, PieceID.WHITE_ROOK);

        this.set(2, 1, PieceID.WHITE_PAWN);
        this.set(2, 2, PieceID.WHITE_PAWN);
        this.set(2, 3, PieceID.WHITE_PAWN);
        this.set(2, 4, PieceID.WHITE_PAWN);
        this.set(2, 5, PieceID.WHITE_PAWN);
        this.set(2, 6, PieceID.WHITE_PAWN);
        this.set(2, 7, PieceID.WHITE_PAWN);
        this.set(2, 8, PieceID.WHITE_PAWN);

        this.set(3, 1, PieceID.EMPTY);
        this.set(3, 2, PieceID.EMPTY);
        this.set(3, 3, PieceID.EMPTY);
        this.set(3, 4, PieceID.EMPTY);
        this.set(3, 5, PieceID.EMPTY);
        this.set(3, 6, PieceID.EMPTY);
        this.set(3, 7, PieceID.EMPTY);
        this.set(3, 8, PieceID.EMPTY);

        this.set(4, 1, PieceID.EMPTY);
        this.set(4, 2, PieceID.EMPTY);
        this.set(4, 3, PieceID.EMPTY);
        this.set(4, 4, PieceID.EMPTY);
        this.set(4, 5, PieceID.EMPTY);
        this.set(4, 6, PieceID.EMPTY);
        this.set(4, 7, PieceID.EMPTY);
        this.set(4, 8, PieceID.EMPTY);

        this.set(5, 1, PieceID.EMPTY);
        this.set(5, 2, PieceID.EMPTY);
        this.set(5, 3, PieceID.EMPTY);
        this.set(5, 4, PieceID.EMPTY);
        this.set(5, 5, PieceID.EMPTY);
        this.set(5, 6, PieceID.EMPTY);
        this.set(5, 7, PieceID.EMPTY);
        this.set(5, 8, PieceID.EMPTY);

        this.set(6, 1, PieceID.EMPTY);
        this.set(6, 2, PieceID.EMPTY);
        this.set(6, 3, PieceID.EMPTY);
        this.set(6, 4, PieceID.EMPTY);
        this.set(6, 5, PieceID.EMPTY);
        this.set(6, 6, PieceID.EMPTY);
        this.set(6, 7, PieceID.EMPTY);
        this.set(6, 8, PieceID.EMPTY);

        this.set(7, 1, PieceID.BLACK_PAWN);
        this.set(7, 2, PieceID.BLACK_PAWN);
        this.set(7, 3, PieceID.BLACK_PAWN);
        this.set(7, 4, PieceID.BLACK_PAWN);
        this.set(7, 5, PieceID.BLACK_PAWN);
        this.set(7, 6, PieceID.BLACK_PAWN);
        this.set(7, 7, PieceID.BLACK_PAWN);
        this.set(7, 8, PieceID.BLACK_PAWN);

        this.set(8, 1, PieceID.BLACK_ROOK);
        this.set(8, 2, PieceID.BLACK_KNIGHT);
        this.set(8, 3, PieceID.BLACK_BISHOP);
        this.set(8, 4, PieceID.BLACK_QUEEN);
        this.set(8, 5, PieceID.BLACK_KING);
        this.set(8, 6, PieceID.BLACK_BISHOP);
        this.set(8, 7, PieceID.BLACK_KNIGHT);
        this.set(8, 8, PieceID.BLACK_ROOK);
    }
}

export class Board implements DomComponent {
    whiteColor: string;
    blackColor: string;
    canvas: HTMLCanvasElement;
    state: BoardState;
    cachedSVGs: Map<PieceID, SVGElement>;
    cachedImages: Map<PieceID, PieceImage>;
    imageLoadedFlags: Map<PieceID, boolean>;
    pieceIsHeld: boolean;
    pieceInHand: PiecePosition;
    whitesTurn: boolean;
    promotionPending: boolean;
    pieceToPromote: PiecePosition;

    constructor() {
        this.whiteColor = "#f5f5f5"
        this.blackColor = "#808020"
        this.canvas = document.createElement("canvas");
        this.state = new BoardState();
        this.cachedSVGs = new Map<PieceID, SVGElement>();
        this.cachedImages = new Map<PieceID, PieceImage>();
        this.imageLoadedFlags = new Map<PieceID, boolean>();
        this.pieceIsHeld = false;
        this.pieceInHand = {
            piece: PieceID.EMPTY,
            rank: 0,
            file: 0,
        };
        this.whitesTurn = true;
        this.promotionPending = false;
        this.pieceToPromote = {
            piece: PieceID.EMPTY,
            rank: 0,
            file: 0,
        };
    }

    initialize(): void {
        this.resizeCanvas(320, 320);
        this.state.setInitialBoardPosition();
        this.initSVGs();
        this.initImages();
        // this.elem().addEventListener("mousedown", this.MovePiecesFreelyWithMouse.bind(this));
        // this.elem().addEventListener("mouseup", this.MovePiecesFreelyWithMouse.bind(this));
        this.elem().addEventListener("mousedown", this.MovePieceIfValid.bind(this));
        this.elem().addEventListener("mouseup", this.MovePieceIfValid.bind(this));
    }

    initSVGs(): void {
        let BlackKingSVG = document.createElement("svg") as unknown as SVGElement;
        BlackKingSVG.innerHTML = BlackKingStr;
        BlackKingSVG = BlackKingSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_KING, BlackKingSVG);

        let BlackQueenSVG = document.createElement("svg") as unknown as SVGElement;
        BlackQueenSVG.innerHTML = BlackQueenStr;
        BlackQueenSVG = BlackQueenSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_QUEEN, BlackQueenSVG);

        let BlackRookSVG = document.createElement("svg") as unknown as SVGElement;
        BlackRookSVG.innerHTML = BlackRookStr;
        BlackRookSVG = BlackRookSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_ROOK, BlackRookSVG);

        let BlackKnightSVG = document.createElement("svg") as unknown as SVGElement;
        BlackKnightSVG.innerHTML = BlackKnightStr;
        BlackKnightSVG = BlackKnightSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_KNIGHT, BlackKnightSVG);

        let BlackBishopSVG = document.createElement("svg") as unknown as SVGElement;
        BlackBishopSVG.innerHTML = BlackBishopStr;
        BlackBishopSVG = BlackBishopSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_BISHOP, BlackBishopSVG);

        let BlackPawnSVG = document.createElement("svg") as unknown as SVGElement;
        BlackPawnSVG.innerHTML = BlackPawnStr;
        BlackPawnSVG = BlackPawnSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.BLACK_PAWN, BlackPawnSVG);

        let WhiteKingSVG = document.createElement("svg") as unknown as SVGElement;
        WhiteKingSVG.innerHTML = WhiteKingStr;
        WhiteKingSVG = WhiteKingSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_KING, WhiteKingSVG);

        let WhiteQueenSVG = document.createElement("svg") as unknown as SVGElement;
        WhiteQueenSVG.innerHTML = WhiteQueenStr;
        WhiteQueenSVG = WhiteQueenSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_QUEEN, WhiteQueenSVG);

        let WhiteRookSVG = document.createElement("svg") as unknown as SVGElement;
        WhiteRookSVG.innerHTML = WhiteRookStr;
        WhiteRookSVG = WhiteRookSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_ROOK, WhiteRookSVG);

        let WhiteKnightSVG = document.createElement("svg") as unknown as SVGElement;
        WhiteKnightSVG.innerHTML = WhiteKnightStr;
        WhiteKnightSVG = WhiteKnightSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_KNIGHT, WhiteKnightSVG);

        let WhiteBishopSVG = document.createElement("svg") as unknown as SVGElement;
        WhiteBishopSVG.innerHTML = WhiteBishopStr;
        WhiteBishopSVG = WhiteBishopSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_BISHOP, WhiteBishopSVG);

        let WhitePawnSVG = document.createElement("svg") as unknown as SVGElement;
        WhitePawnSVG.innerHTML = WhitePawnStr;
        WhitePawnSVG = WhitePawnSVG.children.item(0) as SVGElement;
        this.cachedSVGs.set(PieceID.WHITE_PAWN, WhitePawnSVG);
    }

    initImages(): void {
        this.imageLoadedFlags.set(PieceID.BLACK_KING, false);
        this.imageLoadedFlags.set(PieceID.BLACK_QUEEN, false);
        this.imageLoadedFlags.set(PieceID.BLACK_ROOK, false);
        this.imageLoadedFlags.set(PieceID.BLACK_KNIGHT, false);
        this.imageLoadedFlags.set(PieceID.BLACK_BISHOP, false);
        this.imageLoadedFlags.set(PieceID.BLACK_PAWN, false);
        this.imageLoadedFlags.set(PieceID.WHITE_KING, false);
        this.imageLoadedFlags.set(PieceID.WHITE_QUEEN, false);
        this.imageLoadedFlags.set(PieceID.WHITE_ROOK, false);
        this.imageLoadedFlags.set(PieceID.WHITE_KNIGHT, false);
        this.imageLoadedFlags.set(PieceID.WHITE_BISHOP, false);
        this.imageLoadedFlags.set(PieceID.WHITE_PAWN, false);

        this.cachedImages.set(PieceID.BLACK_KING, this.createImage(PieceID.BLACK_KING)!);
        this.cachedImages.set(PieceID.BLACK_QUEEN, this.createImage(PieceID.BLACK_QUEEN)!);
        this.cachedImages.set(PieceID.BLACK_ROOK, this.createImage(PieceID.BLACK_ROOK)!);
        this.cachedImages.set(PieceID.BLACK_KNIGHT, this.createImage(PieceID.BLACK_KNIGHT)!);
        this.cachedImages.set(PieceID.BLACK_BISHOP, this.createImage(PieceID.BLACK_BISHOP)!);
        this.cachedImages.set(PieceID.BLACK_PAWN, this.createImage(PieceID.BLACK_PAWN)!);
        this.cachedImages.set(PieceID.WHITE_KING, this.createImage(PieceID.WHITE_KING)!);
        this.cachedImages.set(PieceID.WHITE_QUEEN, this.createImage(PieceID.WHITE_QUEEN)!);
        this.cachedImages.set(PieceID.WHITE_ROOK, this.createImage(PieceID.WHITE_ROOK)!);
        this.cachedImages.set(PieceID.WHITE_KNIGHT, this.createImage(PieceID.WHITE_KNIGHT)!);
        this.cachedImages.set(PieceID.WHITE_BISHOP, this.createImage(PieceID.WHITE_BISHOP)!);
        this.cachedImages.set(PieceID.WHITE_PAWN, this.createImage(PieceID.WHITE_PAWN)!);
    }

    resizeCanvas(width: number, height: number): void {
        this.canvas.setAttribute("width", width.toString());
        this.canvas.setAttribute("height", height.toString());
    }

    drawBoardState(): void {
        const ctx = this.canvas.getContext("2d")!;
        ctx.reset();
        const squareW = (this.canvas.width / 8.0);
        const squareH = (this.canvas.height / 8.0);

        // Chess ranks increase from bottom, but y coordinate increases from top
        for (
            let y: number = this.canvas.height - squareH, row = 1;
            row <= 8;
            y -= (this.canvas.width / 8.0), row += 1
        ) {
            for (
                let x: number = 0, col = 1;
                col <= 8;
                x += (this.canvas.height / 8.0), col += 1
            ) {
                // draw board square
                ctx.fillStyle =
                    (row % 2) == 0
                        ? (
                            (col % 2) == 0
                                ? (this.blackColor)
                                : (this.whiteColor)
                        )
                        : (
                            (col % 2) == 0
                                ? (this.whiteColor)
                                : (this.blackColor)
                        );
                ctx.fillRect(x, y, squareW, squareH);

                // overdraw piece
                const piece = this.state.at(row, col);
                const image = this.cachedImages.get(piece);
                if (image) {
                    const margin = 3;
                    if (this.imageLoadedFlags.get(piece) === false) {
                        ctx.fillStyle = "#000000";
                        ctx.fillRect(
                            x + margin,
                            y + margin,
                            squareW - (margin * 2),
                            squareH - (margin * 2)
                        );
                    } else {
                        ctx.fillStyle = "#000000";
                        ctx.drawImage(
                            image.elem,
                            x + margin,
                            y + margin,
                            squareW - (margin * 2),
                            squareH - (margin * 2)
                        );
                    }
                }
            }
        }
    };

    createImage(piece: PieceID): PieceImage | null {
        const svg = this.cachedSVGs.get(piece);
        if (svg === undefined) {
            return null;
        }

        const drawable: PieceImage = {
            elem: document.createElement("img")
        };

        // Handle race condition & redraw on load
        drawable.elem.onload = (_ev: Event): void => {
            this.imageLoadedFlags.set(piece, true);
            this.drawBoardState();
        };

        const xml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(xml);
        const b64Start = "data:image/svg+xml;base64,";
        drawable.elem.src = b64Start + svg64;

        return drawable;
    }

    elem(): HTMLElement {
        return this.canvas;
    }

    getPiecePosition(ev: MouseEvent): PiecePosition {
        const boardX = ev.offsetX;
        const boardY = this.canvas.height - ev.offsetY;
        const rank = Math.ceil(boardY / this.canvas.height * 8);
        const file = Math.ceil(boardX / this.canvas.width * 8);
        const piece = this.state.at(rank, file);
        return {
            piece: piece,
            rank: rank,
            file: file
        } satisfies PiecePosition;
    }

    grabPiece(pos: PiecePosition): void {
        this.pieceIsHeld = true;
        this.pieceInHand = pos;
        // console.log("Grabbed ", getPieceName(pos.piece), "\n from rank ", pos.rank, ", file ", pos.file);
    }

    placePiece(pos: PiecePosition): void {
        // console.log(" Placed ", getPieceName(this.pieceInHand.piece), "\n from rank ", this.pieceInHand.rank, ", file ", this.pieceInHand.file, "\n   at rank ", pos.rank, ", file ", pos.file);
        this.state.set(this.pieceInHand.rank, this.pieceInHand.file, PieceID.EMPTY);
        this.state.set(pos.rank, pos.file, this.pieceInHand.piece);
        this.pieceIsHeld = false;
        this.pieceInHand = {
            piece: PieceID.EMPTY,
            rank: 0,
            file: 0
        };
        this.drawBoardState();
    }

    unhandPiece(): void {
        // console.log("Dropped ", getPieceName(this.pieceInHand.piece), "\n from rank ", this.pieceInHand.rank, ", file ", this.pieceInHand.file);
        this.pieceIsHeld = false;
        this.pieceInHand = {
            piece: PieceID.EMPTY,
            rank: 0,
            file: 0
        };
    }

    // MovePiecesFreelyWithMouse(ev: MouseEvent): void {
    //     if (ev.button !== 0) { return; }
    //     if (ev.type === "mousedown") {
    //         const pos = this.getPiecePosition(ev);
    //
    //         if (pos.piece === PieceID.EMPTY) {
    //             return;
    //         }
    //
    //         this.grabPiece(pos);
    //     }
    //     if (ev.type === "mouseup") {
    //         const pos = this.getPiecePosition(ev);
    //
    //         if (this.pieceIsHeld) {
    //             this.placePiece(pos);
    //         }
    //     }
    // }

    MovePieceIfValid(ev: MouseEvent): void {
        if (ev.button !== 0) { return; }
        const pos = this.getPiecePosition(ev);
        if (ev.type === "mousedown") {
            const valid = this.grabIsValid(pos);
            // console.log("GRAB VALID: ", valid);
            if (valid) {
                this.grabPiece(pos);
            }
        }
        if (ev.type === "mouseup") {
            // Testing legal piece determination
            if(this.pieceInHand.rank === pos.rank && this.pieceInHand.file === pos.file) {
                const lm = this.getLegalMoves(this.pieceInHand);
                console.log(
                    "Legal moves for ", getPieceName(this.pieceInHand.piece),
                    " at (", pos.rank, ", ", pos.file, "): ", lm.length, "\n",
                    lm
                );

                this.unhandPiece();
                return;
            }

            const valid = this.moveIsValid(this.pieceInHand, pos)
            // console.log("DROP VALID: ", valid);
            if (valid) {
                this.placePiece(pos);
                this.endTurn();
            } else {
                this.unhandPiece();
            }
        }
    }

    grabIsValid(from: PiecePosition): boolean {
        if (from.piece === PieceID.EMPTY) {
            return false;
        }
        return isWhite(from.piece) === this.whitesTurn;
    }

    moveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        if (!this.grabIsValid(from)) { return false; }
        switch(from.piece) {
            case PieceID.WHITE_KING:
            case PieceID.BLACK_KING: {
                return this.kingMoveIsValid(from, to);
            }
            case PieceID.WHITE_QUEEN:
            case PieceID.BLACK_QUEEN: {
                return this.queenMoveIsValid(from, to);
            }
            case PieceID.WHITE_ROOK:
            case PieceID.BLACK_ROOK: {
                return this.rookMoveIsValid(from, to);
            }
            case PieceID.WHITE_KNIGHT:
            case PieceID.BLACK_KNIGHT: {
                return this.knightMoveIsValid(from, to);
            }
            case PieceID.WHITE_BISHOP:
            case PieceID.BLACK_BISHOP: {
                return this.bishopMoveIsValid(from, to);
            }
            case PieceID.WHITE_PAWN:
            case PieceID.BLACK_PAWN: {
                return this.pawnMoveIsValid(from, to);
            }
            default: {}
        }
        return false;
    }

    kingMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const validRank = deltaRank <= 1;
        const validFile = deltaFile <= 1;
        if (!validRank || !validFile) { return false; }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) { return false; }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) { return false; }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    queenMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const isHorizontal = deltaRank == 0;
        const isVertical = deltaFile == 0;
        const isDiagonal = deltaRank == deltaFile;

        // console.log("is horizontal: ", isHorizontal);
        // console.log("is vertical: ", isVertical);
        // console.log("is diagonal: ", isDiagonal);
        if (!isHorizontal && !isVertical && !isDiagonal) { return false; }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        // console.log("did move: ", didMove);
        if (!didMove) { return false; }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        // console.log("no self take: ", noSelfTake);
        if (!noSelfTake) { return false; }

        // does not cross another piece
        if (isVertical) {
            let rank = from.rank;
            rank = (rank < to.rank ? rank + 1 : rank - 1);
            while (rank != to.rank) {
                if (this.state.at(rank, from.file) !== PieceID.EMPTY) {
                    // console.log("intervening piece at ", rank, from.file);
                    return false;
                }
                rank = (rank < to.rank ? rank + 1 : rank - 1);
            }
        } else if (isHorizontal) {
            let file = from.file;
            file = (file < to.file ? file + 1 : file - 1);
            while (file != to.file) {
                if (this.state.at(from.rank, file) !== PieceID.EMPTY) {
                    // console.log("intervening piece at ", from.rank, file);
                    return false;
                }
                file = (file < to.file ? file + 1 : file - 1);
            }
        } else if (isDiagonal) {
            let rank = from.rank;
            let file = from.file;
            rank = rank < to.rank ? rank + 1 : rank - 1;
            file = file < to.file ? file + 1 : file - 1;
            while (rank != to.rank && file != to.file) {
                if (this.state.at(rank, file) !== PieceID.EMPTY) {
                    // console.log("intervening piece at ", rank, file);
                    return false;
                }
                rank = rank < to.rank ? rank + 1 : rank - 1;
                file = file < to.file ? file + 1 : file - 1;
            }
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    rookMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const isHorizontal = deltaRank == 0;
        const isVertical = deltaFile == 0;
        if (!isHorizontal && !isVertical) { return false; }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) { return false; }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) { return false; }

        // does not cross another piece
        if (isVertical) {
            let rank = from.rank;
            rank = rank < to.rank ? rank + 1 : rank - 1;
            while (rank != to.rank) {
                if (this.state.at(rank, from.file) !== PieceID.EMPTY) { return false; }
                rank = rank < to.rank ? rank + 1 : rank - 1;
            }
        } else if (isHorizontal) {
            let file = from.file;
            file = file < to.file ? file + 1 : file - 1;
            while (file != to.file) {
                if (this.state.at(from.rank, file) !== PieceID.EMPTY) { return false; }
                file = file < to.file ? file + 1 : file - 1;
            }
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    knightMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const validDistance = deltaRank + deltaFile === 3;
        const validRank = deltaRank > 0;
        const validFile = deltaFile > 0;
        if (!validDistance || !validRank || !validFile) { return false; }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) { return false; }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) { return false; }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    bishopMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const isDiagonal = deltaRank == deltaFile;
        if (!isDiagonal) { return false; }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) { return false; }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) { return false; }

        let rank = from.rank;
        let file = from.file;
        rank = rank < to.rank ? rank + 1 : rank - 1;
        file = file < to.file ? file + 1 : file - 1;
        while (rank != to.rank && file != to.file) {
            if (this.state.at(rank, file) !== PieceID.EMPTY) { return false; }
            rank = rank < to.rank ? rank + 1 : rank - 1;
            file = file < to.file ? file + 1 : file - 1;
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    pawnMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        let validMove = false;

        const didMove = to.rank - from.rank == 0 ? (to.file - from.file != 0) : true;
        if (!didMove) { return false; }

        const takes = to.piece !== PieceID.EMPTY;
        if (takes) {
            const advanceExactlyOneSquare = to.rank - from.rank === (isWhite(from.piece) ? 1 : -1);
            const moveExactlyOneFile = Math.abs(to.file - from.file) === 1;
            const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
            validMove = advanceExactlyOneSquare && moveExactlyOneFile && noSelfTake;
        }
        else {
            const isVertical = to.file === from.file;
            const advanceExactlyOneSquare = to.rank - from.rank === (isWhite(from.piece) ? 1 : -1);
            const advanceExactlyTwoSquares = to.rank - from.rank === (isWhite(from.piece) ? 2 : -2);

            if (advanceExactlyTwoSquares) {
                const startedOnInitialRank = from.rank === (isWhite(from.piece) ? 2 : 7);
                const noInterveningPiece = this.state.at(isWhite(from.piece) ? from.rank + 1 : from.rank - 1, from.file) === PieceID.EMPTY;
                validMove = isVertical && startedOnInitialRank && noInterveningPiece;
            } else if (advanceExactlyOneSquare) {
                validMove = isVertical;
            }
        }
        if (!validMove) { return false; }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) { return false; }

        return true;
    }

    amInCheck(): boolean {
        const pos : PiecePosition = {piece: PieceID.EMPTY, rank: 0, file: 0};
        for (let rank = 1; rank <= 8; rank++) {
            for (let file = 1; file <= 8; file++) {
                if (this.whitesTurn && (this.state.at(rank, file) === PieceID.WHITE_KING)) {
                    pos.piece = PieceID.WHITE_KING;
                    pos.rank = rank;
                    pos.file = file;
                    break;
                }
                if (!this.whitesTurn && (this.state.at(rank, file) === PieceID.BLACK_KING)) {
                    pos.piece = PieceID.BLACK_KING;
                    pos.rank = rank;
                    pos.file = file;
                    break;
                }
            }
            if (pos.piece !== PieceID.EMPTY) {
                break;
            }
        }

        for (let rank = 1; rank <= 8; rank++) {
            for (let file = 1; file <= 8; file++) {
                const src = {piece: this.state.at(rank, file), rank: rank, file: file};
                switch(src.piece) {
                    case PieceID.WHITE_KING:
                    case PieceID.BLACK_KING: {
                        if(this.kingMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    case PieceID.WHITE_QUEEN:
                    case PieceID.BLACK_QUEEN: {
                        if(this.queenMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    case PieceID.WHITE_ROOK:
                    case PieceID.BLACK_ROOK: {
                        if(this.rookMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    case PieceID.WHITE_KNIGHT:
                    case PieceID.BLACK_KNIGHT: {
                        if(this.knightMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    case PieceID.WHITE_BISHOP:
                    case PieceID.BLACK_BISHOP: {
                        if(this.bishopMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    case PieceID.WHITE_PAWN:
                    case PieceID.BLACK_PAWN: {
                        if(this.pawnMoveIsValid(src, pos)) { return true; }
                        break;
                    }
                    default: {}
                }
            }
        }
        return false;
    }

    noValidMoves(): boolean {
        for (let rank = 1; rank <= 8; ++rank) {
            for (let file = 1; file <= 8; ++file) {
                const sq = {piece: this.state.at(rank, file), rank: rank, file: file};
                if (sq.piece === PieceID.EMPTY) { continue; }
                if (
                    this.whitesTurn === isWhite(sq.piece) &&
                    this.getLegalMoves(sq).length !== 0
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    amInCheckmate(): boolean {
        return this.amInCheck() && this.noValidMoves();
    }

    moveWouldSelfCheck(from: PiecePosition, to: PiecePosition): boolean {
        let result = false;
        this.state.set(to.rank, to.file, from.piece);
        this.state.set(from.rank, from.file, PieceID.EMPTY);
        for (let rank = 1; rank <= 8; ++rank) {
            for (let file = 1; file <= 8; ++file) {
                const testPiece = this.state.at(rank, file);
                if (
                    (isWhite(from.piece) && isBlack(testPiece))
                    || (isBlack(from.piece) && isWhite(testPiece))
                ) {
                    if (this.pieceDoesCheck({piece: testPiece, rank: rank, file: file} satisfies PiecePosition)) {
                        result = true;
                        break;
                    }
                }
            }
            if (result) {
                break;
            }
        }
        this.state.set(from.rank, from.file, from.piece);
        this.state.set(to.rank, to.file, to.piece);
        return result;
    }

    pieceDoesCheck(pos: PiecePosition): boolean {
        const oppKing: PiecePosition = {
            piece: PieceID.EMPTY,
            rank: 0,
            file: 0
        };
        let found: boolean = false;
        for (let rank = 1; rank <= 8; ++rank) {
            for (let file = 1; file <= 8; ++file) {
                if (isWhite(pos.piece) && (this.state.at(rank, file) == PieceID.BLACK_KING))
                {
                    oppKing.piece = PieceID.BLACK_KING;
                    oppKing.rank = rank;
                    oppKing.file = file;
                    found = true;
                    break;
                }
                if (isBlack(pos.piece) && (this.state.at(rank, file) == PieceID.WHITE_KING)) {
                    oppKing.piece = PieceID.WHITE_KING;
                    oppKing.rank = rank;
                    oppKing.file = file;
                    found = true;
                    break;
                }
            }
            if (found) { break; }
        }

        switch(pos.piece) {
            case PieceID.WHITE_KING:
            case PieceID.BLACK_KING: {
                return this.kingMoveIsValid(pos, oppKing);
            }
            case PieceID.WHITE_QUEEN:
            case PieceID.BLACK_QUEEN: {
                return this.queenMoveIsValid(pos, oppKing);
            }
            case PieceID.WHITE_ROOK:
            case PieceID.BLACK_ROOK: {
                return this.rookMoveIsValid(pos, oppKing);
            }
            case PieceID.WHITE_KNIGHT:
            case PieceID.BLACK_KNIGHT: {
                return this.knightMoveIsValid(pos, oppKing);
            }
            case PieceID.WHITE_BISHOP:
            case PieceID.BLACK_BISHOP: {
                return this.bishopMoveIsValid(pos, oppKing);
            }
            case PieceID.WHITE_PAWN:
            case PieceID.BLACK_PAWN: {
                return this.pawnMoveIsValid(pos, oppKing);
            }
            default: {}
        }
        return false;
    }

    getLegalMoves(pos: PiecePosition): Array<PiecePosition> {
        switch(pos.piece) {
            case PieceID.WHITE_KING:
            case PieceID.BLACK_KING: {
                return this.getLegalKingMoves(pos);
            }
            case PieceID.WHITE_QUEEN:
            case PieceID.BLACK_QUEEN: {
                return this.getLegalQueenMoves(pos);
            }
            case PieceID.WHITE_ROOK:
            case PieceID.BLACK_ROOK: {
                return this.getLegalRookMoves(pos);
            }
            case PieceID.WHITE_KNIGHT:
            case PieceID.BLACK_KNIGHT: {
                return this.getLegalKnightMoves(pos);
            }
            case PieceID.WHITE_BISHOP:
            case PieceID.BLACK_BISHOP: {
                return this.getLegalBishopMoves(pos);
            }
            case PieceID.WHITE_PAWN:
            case PieceID.BLACK_PAWN: {
                return this.getLegalPawnMoves(pos);
            }
            default: {}
        }
        return new Array<PiecePosition>();
    }

    getLegalKingMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let rank = pos.rank - 1; rank <= pos.rank + 1; rank += 1) {
            for (let file = pos.file - 1; file <= pos.file; file += 1) {
                if (rank < 1 || file < 1 || rank > 8 || file > 8) { continue; }
                const dest = {piece: this.state.at(rank, file), rank: rank, file: file} satisfies PiecePosition;
                if (this.kingMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }
        }
        return legalMoves;
    }

    getLegalQueenMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let rank = 1; rank <= 8; rank += 1) {
            for (let file = 1; file <= 8; file += 1) {
                if (
                    Math.abs(file - pos.file) === Math.abs(rank - pos.rank)
                    || file === pos.file
                    || rank === pos.rank
                ) {
                    const dest = {piece: this.state.at(rank, file), rank: rank, file: file} satisfies PiecePosition;
                    if (this.queenMoveIsValid(pos,dest)) {
                        legalMoves.push(dest);
                    }
                }
            }
        }
        return legalMoves;
    }

    getLegalRookMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let rank = 1; rank <= 8; rank += 1) {
            const dest = {piece: this.state.at(rank, pos.file), rank: rank, file: pos.file};
            if (this.rookMoveIsValid(pos, dest)) {
                legalMoves.push(dest);
            }
        }
        for (let file = 1; file <= 8; file += 1) {
            const dest = {piece: this.state.at(pos.rank, file), rank: pos.rank, file: file};
            if (this.rookMoveIsValid(pos, dest)) {
                legalMoves.push(dest);
            }
        }
        return legalMoves;
    }

    getLegalKnightMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        const deltaXs: number[] = [-2, -1, 1, 2];
        const deltaYs: number[][] = [[-1, 1], [-2, 2], [-2, 2], [-1, 1]];
        let idx = 0;
        for (let dx of deltaXs) {
            for (let dy of deltaYs[idx]) {
                const newX = pos.file + dx;
                const newY = pos.rank + dy;
                if (newX < 1 || newX > 8 || newY < 1 || newY > 8) { continue; }
                const dest = {piece: this.state.at(newY, newX), rank: newY, file: newX};
                if (this.knightMoveIsValid(pos,dest)) {
                    legalMoves.push(dest);
                }
            }
            idx++;
        }
        return legalMoves;
    }

    getLegalBishopMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let i = 1; i <= 7; i++) {
            let newRank = pos.rank + i;
            let newFile = pos.file + i;
            if (!(newRank < 1 || newRank > 8 || newFile < 1 || newFile > 8)) {
                const dest = {piece: this.state.at(newRank, newFile), rank: newRank, file: newFile};
                if (this.bishopMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }

            newRank = pos.rank + i;
            newFile = pos.file - i;
            if (!(newRank < 1 || newRank > 8 || newFile < 1 || newFile > 8)) {
                const dest = {piece: this.state.at(newRank, newFile), rank: newRank, file: newFile};
                if (this.bishopMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }

            newRank = pos.rank - i;
            newFile = pos.file - i;
            if (!(newRank < 1 || newRank > 8 || newFile < 1 || newFile > 8)) {
                const dest = {piece: this.state.at(newRank, newFile), rank: newRank, file: newFile};
                if (this.bishopMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }

            newRank = pos.rank - i;
            newFile = pos.file + i;
            if (!(newRank < 1 || newRank > 8 || newFile < 1 || newFile > 8)) {
                const dest = {piece: this.state.at(newRank, newFile), rank: newRank, file: newFile};
                if (this.bishopMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }


        }
        return legalMoves;
    }

    getLegalPawnMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let file = pos.file - 1; file <= pos.file + 1; file += 1) {
            let rank = isWhite(pos.piece) ? pos.rank + 1 : pos.rank - 1;
            if (rank >= 1 && rank <= 8 && file >= 1 && file <= 8) {
                const dest = {piece: this.state.at(rank, file), rank: rank, file: file};
                if (this.pawnMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }
            rank = isWhite(pos.piece) ? pos.rank + 2 : pos.rank - 2;
            if (rank >= 1 && rank <= 8 && file >= 1 && file <= 8) {
                const dest = {piece: this.state.at(rank, file), rank: rank, file: file};
                if (this.pawnMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }
        }
        return legalMoves;
    }

    endTurn() {
        if (this.promotionPending) {
            this.promote();
            this.promotionPending = false;
            this.pieceToPromote = {
                piece: PieceID.EMPTY,
                rank: 0,
                file: 0
            }
        }

        this.whitesTurn = !this.whitesTurn;

        if (this.amInCheckmate()) {
            // TODO: implement some kind of effect
            console.log("CHECKMATE");
        }
    }

    promote() {
        // TODO: implement promotion modal
    }
}