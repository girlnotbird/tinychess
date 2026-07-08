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

type DrawablePiece = {
    paths: Array<Path2D>;
    transform: Array<number>;
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

    setTestBoardPosition(): void {
        this.set(1, 1, PieceID.BLACK_QUEEN);
        this.set(1, 2, PieceID.BLACK_QUEEN);
        this.set(1, 3, PieceID.BLACK_QUEEN);
        this.set(1, 4, PieceID.BLACK_QUEEN);
        this.set(1, 5, PieceID.BLACK_QUEEN);
        this.set(1, 6, PieceID.BLACK_QUEEN);
        this.set(1, 7, PieceID.BLACK_QUEEN);
        this.set(1, 8, PieceID.BLACK_QUEEN);

        this.set(2, 1, PieceID.BLACK_QUEEN);
        this.set(2, 2, PieceID.BLACK_QUEEN);
        this.set(2, 3, PieceID.BLACK_QUEEN);
        this.set(2, 4, PieceID.BLACK_QUEEN);
        this.set(2, 5, PieceID.BLACK_QUEEN);
        this.set(2, 6, PieceID.BLACK_QUEEN);
        this.set(2, 7, PieceID.BLACK_QUEEN);
        this.set(2, 8, PieceID.BLACK_QUEEN);

        this.set(3, 1, PieceID.BLACK_QUEEN);
        this.set(3, 2, PieceID.BLACK_QUEEN);
        this.set(3, 3, PieceID.BLACK_QUEEN);
        this.set(3, 4, PieceID.BLACK_QUEEN);
        this.set(3, 5, PieceID.BLACK_QUEEN);
        this.set(3, 6, PieceID.BLACK_QUEEN);
        this.set(3, 7, PieceID.BLACK_QUEEN);
        this.set(3, 8, PieceID.BLACK_QUEEN);

        this.set(4, 1, PieceID.BLACK_QUEEN);
        this.set(4, 2, PieceID.BLACK_QUEEN);
        this.set(4, 3, PieceID.BLACK_QUEEN);
        this.set(4, 4, PieceID.BLACK_QUEEN);
        this.set(4, 5, PieceID.BLACK_QUEEN);
        this.set(4, 6, PieceID.BLACK_QUEEN);
        this.set(4, 7, PieceID.BLACK_QUEEN);
        this.set(4, 8, PieceID.BLACK_QUEEN);

        this.set(5, 1, PieceID.BLACK_QUEEN);
        this.set(5, 2, PieceID.BLACK_QUEEN);
        this.set(5, 3, PieceID.BLACK_QUEEN);
        this.set(5, 4, PieceID.BLACK_QUEEN);
        this.set(5, 5, PieceID.BLACK_QUEEN);
        this.set(5, 6, PieceID.BLACK_QUEEN);
        this.set(5, 7, PieceID.BLACK_QUEEN);
        this.set(5, 8, PieceID.BLACK_QUEEN);

        this.set(6, 1, PieceID.BLACK_QUEEN);
        this.set(6, 2, PieceID.BLACK_QUEEN);
        this.set(6, 3, PieceID.BLACK_QUEEN);
        this.set(6, 4, PieceID.BLACK_QUEEN);
        this.set(6, 5, PieceID.BLACK_QUEEN);
        this.set(6, 6, PieceID.BLACK_QUEEN);
        this.set(6, 7, PieceID.BLACK_QUEEN);
        this.set(6, 8, PieceID.BLACK_QUEEN);

        this.set(7, 1, PieceID.BLACK_QUEEN);
        this.set(7, 2, PieceID.BLACK_QUEEN);
        this.set(7, 3, PieceID.BLACK_QUEEN);
        this.set(7, 4, PieceID.BLACK_QUEEN);
        this.set(7, 5, PieceID.BLACK_QUEEN);
        this.set(7, 6, PieceID.BLACK_QUEEN);
        this.set(7, 7, PieceID.BLACK_QUEEN);
        this.set(7, 8, PieceID.BLACK_QUEEN);

        this.set(8, 1, PieceID.BLACK_QUEEN);
        this.set(8, 2, PieceID.BLACK_QUEEN);
        this.set(8, 3, PieceID.BLACK_QUEEN);
        this.set(8, 4, PieceID.BLACK_QUEEN);
        this.set(8, 5, PieceID.BLACK_QUEEN);
        this.set(8, 6, PieceID.BLACK_QUEEN);
        this.set(8, 7, PieceID.BLACK_QUEEN);
        this.set(8, 8, PieceID.BLACK_QUEEN);
    }
}

export class Board implements DomComponent {
    whiteColor: string;
    blackColor: string;
    canvas: HTMLCanvasElement;
    state: BoardState;
    cachedSVGs: Map<PieceID, SVGElement>;
    cachedDrawables: Map<PieceID, DrawablePiece>;

    constructor() {
        this.whiteColor = "#f5f5f5"
        this.blackColor = "#808020"
        this.canvas = document.createElement("canvas");
        this.state = new BoardState();
        this.cachedSVGs = new Map<PieceID, SVGElement>();
        this.cachedDrawables = new Map<PieceID, DrawablePiece>();
    }

    initialize(): void {
        this.resizeCanvas(320, 320);
        this.state.setInitialBoardPosition();
        // this.state.setTestBoardPosition();
        this.initSVGs();
        this.initDrawables();
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

    initDrawables(): void {
        this.cachedDrawables.set(PieceID.BLACK_KING, this.getDrawableForPiece(PieceID.BLACK_KING)!);
        this.cachedDrawables.set(PieceID.BLACK_QUEEN, this.getDrawableForPiece(PieceID.BLACK_QUEEN)!);
        this.cachedDrawables.set(PieceID.BLACK_ROOK, this.getDrawableForPiece(PieceID.BLACK_ROOK)!);
        this.cachedDrawables.set(PieceID.BLACK_KNIGHT, this.getDrawableForPiece(PieceID.BLACK_KNIGHT)!);
        this.cachedDrawables.set(PieceID.BLACK_BISHOP, this.getDrawableForPiece(PieceID.BLACK_BISHOP)!);
        this.cachedDrawables.set(PieceID.BLACK_PAWN, this.getDrawableForPiece(PieceID.BLACK_PAWN)!);
        this.cachedDrawables.set(PieceID.WHITE_KING, this.getDrawableForPiece(PieceID.WHITE_KING)!);
        this.cachedDrawables.set(PieceID.WHITE_QUEEN, this.getDrawableForPiece(PieceID.WHITE_QUEEN)!);
        this.cachedDrawables.set(PieceID.WHITE_ROOK, this.getDrawableForPiece(PieceID.WHITE_ROOK)!);
        this.cachedDrawables.set(PieceID.WHITE_KNIGHT, this.getDrawableForPiece(PieceID.WHITE_KNIGHT)!);
        this.cachedDrawables.set(PieceID.WHITE_BISHOP, this.getDrawableForPiece(PieceID.WHITE_BISHOP)!);
        this.cachedDrawables.set(PieceID.WHITE_PAWN, this.getDrawableForPiece(PieceID.WHITE_PAWN)!);
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
        for (let y: number = 0, row = 1; row <= 8; y += (this.canvas.width / 8.0), row += 1) {
            for (let x: number = 0, col = 1; col <= 8; x += (this.canvas.height / 8.0), col += 1) {
                ctx.fillStyle =
                    (row % 2) == 0
                        ? (
                            (col % 2) == 0
                                ? (this.whiteColor)
                                : (this.blackColor)
                        )
                        : (
                            (col % 2) == 0
                                ? (this.blackColor)
                                : (this.whiteColor)
                        );
                ctx.fillRect(x, y, squareW, squareH);
                const piece = this.state.at(row, col);
                const drawable = this.cachedDrawables.get(piece);
                if (drawable) {
                    ctx.fillStyle = "#000000";
                    for (let path of drawable.paths) {
                        ctx.save();
                        ctx.translate(x, y);
                        ctx.scale(1/32, 1/32);
                        ctx.transform(
                            drawable.transform[0],
                            drawable.transform[1],
                            drawable.transform[2],
                            drawable.transform[3],
                            drawable.transform[4],
                            drawable.transform[5]
                        );
                        ctx.fill(path);
                        ctx.restore();
                    }
                }
            }
        }
    };

    getDrawableForPiece(piece: PieceID): DrawablePiece | null {
        const svg = this.cachedSVGs.get(piece);
        if (svg === undefined) { return null; }

        const drawable: DrawablePiece = {
            paths: new Array<Path2D>(),
            transform: new Array<number>()
        };
        for (const child of svg.children) {
            if (child.tagName === "g") {
                let transformString = child.getAttribute("transform")!;
                transformString = transformString.substring(7, transformString.length - 1);
                let split = transformString.split(",");
                drawable.transform = split.map((value: string)=>{
                    return parseFloat(value);
                });

                for(const path of child.children) {
                    drawable.paths.push(new Path2D(path.getAttribute("d")!));
                }
                break;
            }
            else if (child.tagName === "path") {
                drawable.paths.push(new Path2D(child.getAttribute("d")!))
                drawable.transform = new Array<number>(1, 0, 0, 1, 0, 0);
                break;
            }
        }
        return drawable;
    }

    elem(): HTMLElement {
        return this.canvas;
    }
}