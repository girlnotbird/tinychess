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

import {PromotionModal} from "@/PromotionModal/PromotionModal.js"
import {
    type DomComponent,
    type PieceImage,
    type PiecePosition,
    PieceID,
    isWhite,
    isBlack,
    getPieceName,
} from "@/types.js";


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
    root: HTMLDivElement;
    canvas: HTMLCanvasElement;
    promotionModal: PromotionModal;
    state: BoardState;
    cachedSVGs: Map<PieceID, SVGElement>;
    cachedImages: Map<PieceID, PieceImage>;
    imageLoadedFlags: Map<PieceID, boolean>;
    pieceIsHeld: boolean;
    pieceInHand: PiecePosition;
    whitesTurn: boolean;
    promotionPending: boolean;
    pieceToPromote: PiecePosition;
    whiteKingCanCastle: boolean;
    blackKingCanCastle: boolean;
    rookA1CanCastle: boolean;
    rookH1CanCastle: boolean;
    rookA8CanCastle: boolean;
    rookH8CanCastle: boolean;
    enPassantAvailable: boolean;
    enPassantTakeableSquare: PiecePosition;
    gameHasInsufficientMaterial: boolean;

    constructor() {
        this.whiteColor = "#f5f5f5"
        this.blackColor = "#808020"
        this.root = document.createElement("div");
        this.canvas = this.root.appendChild(document.createElement("canvas"));
        this.state = new BoardState();
        this.cachedSVGs = new Map<PieceID, SVGElement>();
        this.cachedImages = new Map<PieceID, PieceImage>();
        this.promotionModal = new PromotionModal(this.cachedImages, this.canvas.width / 8);
        this.root.appendChild(this.promotionModal.elem());
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
        this.whiteKingCanCastle = true;
        this.blackKingCanCastle = true;
        this.rookA1CanCastle = true;
        this.rookA8CanCastle = true;
        this.rookH1CanCastle = true;
        this.rookH8CanCastle = true;
        this.enPassantAvailable = false;
        this.enPassantTakeableSquare = {piece: PieceID.EMPTY, rank: 0, file: 0};
        this.gameHasInsufficientMaterial = false;
    }

    initialize(): void {
        this.resizeCanvas(320, 320);
        this.state.setInitialBoardPosition();
        this.initSVGs();
        this.initImages();
        // this.root.addEventListener("mousedown", this.MovePiecesFreelyWithMouse.bind(this));
        // this.root.addEventListener("mouseup", this.MovePiecesFreelyWithMouse.bind(this));
        this.root.addEventListener("mousedown", this.MovePieceIfValid.bind(this));
        this.root.addEventListener("mouseup", this.MovePieceIfValid.bind(this));
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
        return this.root;
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
        if (pos.piece !== PieceID.EMPTY) {
            this.flagForInsufficientMaterialIfApplicable();
        }
        this.placePiecesForCastleIfApplicable(pos);
        this.updateCastleFlagsIfApplicable(pos);
        this.flagPieceForPromotionIfApplicable(pos);
        this.removeEnPassantCapturedPieceIfApplicable(pos);
        this.flagForEnPassantIfApplicable(pos);
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


    placePiecesForCastleIfApplicable(dest: PiecePosition): void {
        const whiteQueensideCastle = this.pieceInHand.piece === PieceID.WHITE_KING && this.whiteKingCanCastle && dest.rank === 1 && dest.file === 3 && this.rookA1CanCastle;
        const whiteKingsideCastle = this.pieceInHand.piece === PieceID.WHITE_KING && this.whiteKingCanCastle && dest.rank === 1 && dest.file === 7 && this.rookH1CanCastle;
        const blackQueensideCastle = this.pieceInHand.piece === PieceID.BLACK_KING && this.blackKingCanCastle && dest.rank === 8 && dest.file === 3 && this.rookA8CanCastle;
        const blackKingsideCastle = this.pieceInHand.piece === PieceID.BLACK_KING && this.blackKingCanCastle && dest.rank === 8 && dest.file === 7 && this.rookH8CanCastle;
        if (whiteQueensideCastle) {
            this.state.set(1, 1, PieceID.EMPTY);
            this.state.set(1, 4, PieceID.WHITE_ROOK);
            this.whiteKingCanCastle = false;
            this.rookA1CanCastle = false;
            this.rookH1CanCastle = false;
        } else if (whiteKingsideCastle) {
            this.state.set(1, 8, PieceID.EMPTY);
            this.state.set(1, 6, PieceID.WHITE_ROOK);
            this.whiteKingCanCastle = false;
            this.rookA1CanCastle = false;
            this.rookH1CanCastle = false;
        } else if (blackQueensideCastle) {
            this.state.set(8, 1, PieceID.EMPTY);
            this.state.set(8, 4, PieceID.BLACK_ROOK);
            this.blackKingCanCastle = false;
            this.rookA8CanCastle = false;
            this.rookH8CanCastle = false;
        } else if (blackKingsideCastle) {
            this.state.set(8, 8, PieceID.EMPTY);
            this.state.set(8, 6, PieceID.BLACK_ROOK);
            this.blackKingCanCastle = false;
            this.rookA8CanCastle = false;
            this.rookH8CanCastle = false;
        }
    }

    flagPieceForPromotionIfApplicable(dest: PiecePosition): void {
        if (this.pieceInHand.piece === PieceID.WHITE_PAWN && dest.rank === 8) {
            // console.log(dest);
            this.promotionPending = true;
            this.pieceToPromote = {piece: PieceID.WHITE_PAWN, rank: dest.rank, file: dest.file};
        } else if (this.pieceInHand.piece === PieceID.BLACK_PAWN && dest.rank === 1) {
            // console.log(dest);
            this.promotionPending = true;
            this.pieceToPromote = {piece: PieceID.BLACK_PAWN, rank: dest.rank, file: dest.file};
        }
    }

    updateCastleFlagsIfApplicable(dest: PiecePosition): void {
        const rookA1MovingOffStart = this.pieceInHand.rank === 1 && this.pieceInHand.file === 1 && this.pieceInHand.piece === PieceID.WHITE_ROOK;
        const rookA1Taken = dest.piece === PieceID.WHITE_ROOK && dest.rank === 1 && dest.file === 1;
        if (this.rookA1CanCastle && (rookA1MovingOffStart || rookA1Taken)) {
            this.rookA1CanCastle = false;
            return;
        }

        const rookH1MovingOffStart = this.pieceInHand.rank === 1 && this.pieceInHand.file === 8 && this.pieceInHand.piece === PieceID.WHITE_ROOK;
        const rookH1Taken = dest.piece === PieceID.WHITE_ROOK && dest.rank === 1 && dest.file === 8;
        if (this.rookH1CanCastle && (rookH1MovingOffStart || rookH1Taken)) {
            this.rookH1CanCastle = false;
            return;
        }

        const rookA8MovingOffStart = this.pieceInHand.rank === 8 && this.pieceInHand.file === 1 && this.pieceInHand.piece === PieceID.BLACK_ROOK;
        const rookA8Taken = dest.piece === PieceID.BLACK_ROOK && dest.rank === 8 && dest.file === 1;
        if (this.rookA8CanCastle && (rookA8MovingOffStart || rookA8Taken)) {
            this.rookA8CanCastle = false;
            return;
        }

        const rookH8MovingOffStart = this.pieceInHand.rank === 8 && this.pieceInHand.file === 8 && this.pieceInHand.piece === PieceID.BLACK_ROOK;
        const rookH8Taken = dest.piece === PieceID.BLACK_ROOK && dest.rank === 8 && dest.file === 8;
        if (this.rookH8CanCastle && (rookH8MovingOffStart || rookH8Taken)) {
            this.rookH8CanCastle = false;
            return;
        }

        const whiteKingMovingOffStart = this.pieceInHand.rank === 1 && this.pieceInHand.file === 5 && this.pieceInHand.piece === PieceID.WHITE_KING;
        if (this.whiteKingCanCastle && whiteKingMovingOffStart) {
            this.whiteKingCanCastle = false;
            return;
        }

        const blackKingMovingOffStart = this.pieceInHand.rank === 8 && this.pieceInHand.file === 5 && this.pieceInHand.piece === PieceID.BLACK_KING;
        if (this.blackKingCanCastle && blackKingMovingOffStart) {
            this.blackKingCanCastle = false;
            return;
        }
    }

    removeEnPassantCapturedPieceIfApplicable(dest: PiecePosition): void {
        if (this.enPassantAvailable && this.pieceInHand.piece === PieceID.WHITE_PAWN && dest.rank === this.enPassantTakeableSquare.rank && dest.file === this.enPassantTakeableSquare.file) {
            this.state.set(5, dest.file, PieceID.EMPTY);
            return;
        }
        if (this.enPassantAvailable && this.pieceInHand.piece === PieceID.BLACK_PAWN && dest.rank === this.enPassantTakeableSquare.rank && dest.file === this.enPassantTakeableSquare.file) {
            this.state.set(4, dest.file, PieceID.EMPTY);
        }
    }

    flagForEnPassantIfApplicable(dest: PiecePosition): void {
        // Unset old en-passantable square
        if (this.enPassantAvailable) {
            this.enPassantAvailable = false;
            this.enPassantTakeableSquare = {piece: PieceID.EMPTY, rank: 0, file: 0};
        }

        // Set new en-passantable square
        if (this.pieceInHand.piece === PieceID.WHITE_PAWN && Math.abs(dest.rank - this.pieceInHand.rank) === 2) {
            this.enPassantAvailable = true;
            this.enPassantTakeableSquare = {piece: this.state.at(3, dest.file), rank: 3, file: dest.file};
        }
        if (this.pieceInHand.piece === PieceID.BLACK_PAWN && Math.abs(dest.rank - this.pieceInHand.rank) === 2) {
            this.enPassantAvailable = true;
            this.enPassantTakeableSquare = {piece: this.state.at(6, dest.file), rank: 6, file: dest.file};
        }
    }

    flagForInsufficientMaterialIfApplicable(): void {
        if (this.insufficientMaterial()) {
            this.gameHasInsufficientMaterial = true;
        }
    }


    MovePieceIfValid(ev: MouseEvent): void {
        if (ev.button !== 0) {
            return;
        }
        if (this.promotionPending) {
            return;
        }
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
            if (this.pieceInHand.rank === pos.rank && this.pieceInHand.file === pos.file) {
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
                this.endTurnOrPromote();
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
        if (!this.grabIsValid(from)) {
            return false;
        }
        switch (from.piece) {
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
            default: {
            }
        }
        return false;
    }

    castleMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        // console.log("Checking for valid castle...");
        const whiteKingCastlesFromInitialPosition = from.piece === PieceID.WHITE_KING && from.rank === 1 && from.file === 5 && this.whiteKingCanCastle;
        if (whiteKingCastlesFromInitialPosition) {
            // console.log("Checking for valid castle for white king...");
            const castleToC1: boolean = (to.rank === 1 && to.file === 3);
            if (castleToC1) {
                // console.log("Checking for valid queenside castle for white king...");
                const rookA1: PiecePosition = {piece: this.state.at(1, 1), rank: 1, file: 1};
                const rookA1CastlesFromInitialPosition = rookA1.piece === PieceID.WHITE_ROOK && this.rookA1CanCastle;
                const B1IsClear = this.state.at(1, 2) === PieceID.EMPTY;
                const C1IsClear = this.state.at(1, 3) === PieceID.EMPTY;
                const D1IsClear = this.state.at(1, 4) === PieceID.EMPTY;
                const notInCheck: boolean = !this.moveWouldSelfCheck(from, from);
                const notThroughCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(1, 4),
                    rank: 1,
                    file: 4
                })
                const notIntoCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(1, 3),
                    rank: 1,
                    file: 3
                });
                const valid = rookA1CastlesFromInitialPosition && B1IsClear && C1IsClear && D1IsClear && notInCheck && notThroughCheck && notIntoCheck;
                // console.log(rookA1CastlesFromInitialPosition, B1IsClear, C1IsClear, D1IsClear, notInCheck, notThroughCheck, notIntoCheck);
                return valid;
            }
            const castleToG1: boolean = (to.rank === 1 && to.file === 7);
            if (castleToG1) {
                // console.log("Checking for valid kingside castle for white king...");
                const rookH1: PiecePosition = {piece: this.state.at(1, 8), rank: 1, file: 8};
                const rookH1CastlesFromInitialPosition = rookH1.piece === PieceID.WHITE_ROOK && this.rookH1CanCastle;
                const F1IsClear = this.state.at(1, 6) === PieceID.EMPTY;
                const G1IsClear = this.state.at(1, 7) === PieceID.EMPTY;
                const notInCheck: boolean = !this.moveWouldSelfCheck(from, from);
                const notThroughCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(1, 6),
                    rank: 1,
                    file: 6
                });
                const notIntoCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(1, 7),
                    rank: 1,
                    file: 7
                });
                const valid = rookH1CastlesFromInitialPosition && F1IsClear && G1IsClear && notInCheck && notThroughCheck && notIntoCheck;
                // console.log(rookH1CastlesFromInitialPosition, F1IsClear, G1IsClear, notInCheck, notThroughCheck, notIntoCheck, valid);
                return valid;
            }
            return false;
        }

        const blackKingCastlesFromInitialPosition = from.piece === PieceID.BLACK_KING && from.rank === 8 && from.file === 5 && this.blackKingCanCastle;
        if (blackKingCastlesFromInitialPosition) {
            // console.log("Checking for valid castle for black king...");
            const castleToC8: boolean = (to.rank === 8 && to.file === 3);
            if (castleToC8) {
                // console.log("Checking for valid queenside castle for black king...");
                const rookA8: PiecePosition = {piece: this.state.at(8, 1), rank: 8, file: 1};
                const rookA8CastlesFromInitialPosition = rookA8.piece === PieceID.BLACK_ROOK && this.rookA8CanCastle;
                const B8IsClear = this.state.at(8, 2) === PieceID.EMPTY;
                const C8IsClear = this.state.at(8, 3) === PieceID.EMPTY;
                const D8IsClear = this.state.at(8, 4) === PieceID.EMPTY;
                const notInCheck: boolean = !this.moveWouldSelfCheck(from, from);
                const notThroughCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(8, 4),
                    rank: 8,
                    file: 4
                })
                const notIntoCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(8, 3),
                    rank: 8,
                    file: 3
                });
                const valid = rookA8CastlesFromInitialPosition && B8IsClear && C8IsClear && D8IsClear && notInCheck && notThroughCheck && notIntoCheck;
                // console.log(rookA8CastlesFromInitialPosition, B8IsClear, C8IsClear, D8IsClear, notInCheck, notThroughCheck, notIntoCheck);
                return valid;
            }
            const castleToG8: boolean = (to.rank === 8 && to.file === 7);
            if (castleToG8) {
                // console.log("Checking for valid kingside castle for black king...");
                const rookH8: PiecePosition = {piece: this.state.at(8, 8), rank: 8, file: 8};
                const rookH8CastlesFromInitialPosition = rookH8.piece === PieceID.BLACK_ROOK && this.rookH8CanCastle;
                const F8IsClear = this.state.at(8, 6) === PieceID.EMPTY;
                const G8IsClear = this.state.at(8, 7) === PieceID.EMPTY;
                const notInCheck: boolean = !this.moveWouldSelfCheck(from, from);
                const notThroughCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(8, 6),
                    rank: 8,
                    file: 6
                });
                const notIntoCheck: boolean = !this.moveWouldSelfCheck(from, {
                    piece: this.state.at(8, 7),
                    rank: 8,
                    file: 7
                });
                const valid = rookH8CastlesFromInitialPosition && F8IsClear && G8IsClear && notInCheck && notThroughCheck && notIntoCheck;
                // console.log(rookH8CastlesFromInitialPosition, F8IsClear, G8IsClear, notInCheck, notThroughCheck, notIntoCheck);
                return valid;
            }
            return false;
        }

        return false;
    }

    kingMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const validRank = deltaRank <= 1;
        const validFile = deltaFile <= 1;
        if (!validRank || !validFile) {
            return this.castleMoveIsValid(from, to);
        }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) {
            return false;
        }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) {
            return false;
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) {
            return false;
        }

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
        if (!isHorizontal && !isVertical && !isDiagonal) {
            return false;
        }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        // console.log("did move: ", didMove);
        if (!didMove) {
            return false;
        }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        // console.log("no self take: ", noSelfTake);
        if (!noSelfTake) {
            return false;
        }

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
        if (selfCheck) {
            return false;
        }

        return true;
    }

    rookMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const isHorizontal = deltaRank == 0;
        const isVertical = deltaFile == 0;
        if (!isHorizontal && !isVertical) {
            return false;
        }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) {
            return false;
        }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) {
            return false;
        }

        // does not cross another piece
        if (isVertical) {
            let rank = from.rank;
            rank = rank < to.rank ? rank + 1 : rank - 1;
            while (rank != to.rank) {
                if (this.state.at(rank, from.file) !== PieceID.EMPTY) {
                    return false;
                }
                rank = rank < to.rank ? rank + 1 : rank - 1;
            }
        } else if (isHorizontal) {
            let file = from.file;
            file = file < to.file ? file + 1 : file - 1;
            while (file != to.file) {
                if (this.state.at(from.rank, file) !== PieceID.EMPTY) {
                    return false;
                }
                file = file < to.file ? file + 1 : file - 1;
            }
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) {
            return false;
        }

        return true;
    }

    knightMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const validDistance = deltaRank + deltaFile === 3;
        const validRank = deltaRank > 0;
        const validFile = deltaFile > 0;
        if (!validDistance || !validRank || !validFile) {
            return false;
        }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) {
            return false;
        }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) {
            return false;
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) {
            return false;
        }

        return true;
    }

    bishopMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        const deltaRank = Math.abs(to.rank - from.rank);
        const deltaFile = Math.abs(to.file - from.file);
        const isDiagonal = deltaRank == deltaFile;
        if (!isDiagonal) {
            return false;
        }

        const didMove = deltaRank == 0 ? (deltaFile != 0) : true;
        if (!didMove) {
            return false;
        }

        const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
        if (!noSelfTake) {
            return false;
        }

        let rank = from.rank;
        let file = from.file;
        rank = rank < to.rank ? rank + 1 : rank - 1;
        file = file < to.file ? file + 1 : file - 1;
        while (rank != to.rank && file != to.file) {
            if (this.state.at(rank, file) !== PieceID.EMPTY) {
                return false;
            }
            rank = rank < to.rank ? rank + 1 : rank - 1;
            file = file < to.file ? file + 1 : file - 1;
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) {
            return false;
        }

        return true;
    }

    pawnMoveIsValid(from: PiecePosition, to: PiecePosition): boolean {
        let validMove = false;

        const didMove = to.rank - from.rank == 0 ? (to.file - from.file != 0) : true;
        if (!didMove) {
            return false;
        }

        const enPassant = this.enPassantAvailable && to.rank === this.enPassantTakeableSquare.rank && to.file === this.enPassantTakeableSquare.file;

        const takes = to.piece !== PieceID.EMPTY || enPassant;
        if (takes) {
            const advanceExactlyOneSquare = to.rank - from.rank === (isWhite(from.piece) ? 1 : -1);
            const moveExactlyOneFile = Math.abs(to.file - from.file) === 1;
            const noSelfTake = isWhite(from.piece) ? isWhite(from.piece) !== isWhite(to.piece) : isBlack(from.piece) !== isBlack(to.piece);
            validMove = advanceExactlyOneSquare && moveExactlyOneFile && noSelfTake;
        } else {
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
        if (!validMove) {
            return false;
        }

        const selfCheck = this.moveWouldSelfCheck(from, to);
        if (selfCheck) {
            return false;
        }

        return true;
    }


    amInCheck(white: boolean): boolean {
        const pos: PiecePosition = {piece: PieceID.EMPTY, rank: 0, file: 0};
        for (let rank = 1; rank <= 8; rank++) {
            for (let file = 1; file <= 8; file++) {
                if (white && (this.state.at(rank, file) === PieceID.WHITE_KING)) {
                    pos.piece = PieceID.WHITE_KING;
                    pos.rank = rank;
                    pos.file = file;
                    break;
                }
                if (!white && (this.state.at(rank, file) === PieceID.BLACK_KING)) {
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
                switch (src.piece) {
                    // King can never take another king in a valid board state
                    // case PieceID.WHITE_KING:
                    // case PieceID.BLACK_KING: {
                    //     if(this.kingMoveIsValid(src, pos)) { return true; }
                    //     break;
                    // }
                    case PieceID.WHITE_QUEEN:
                    case PieceID.BLACK_QUEEN: {
                        if (this.queenMoveIsValid(src, pos)) {
                            return true;
                        }
                        break;
                    }
                    case PieceID.WHITE_ROOK:
                    case PieceID.BLACK_ROOK: {
                        if (this.rookMoveIsValid(src, pos)) {
                            return true;
                        }
                        break;
                    }
                    case PieceID.WHITE_KNIGHT:
                    case PieceID.BLACK_KNIGHT: {
                        if (this.knightMoveIsValid(src, pos)) {
                            return true;
                        }
                        break;
                    }
                    case PieceID.WHITE_BISHOP:
                    case PieceID.BLACK_BISHOP: {
                        if (this.bishopMoveIsValid(src, pos)) {
                            return true;
                        }
                        break;
                    }
                    case PieceID.WHITE_PAWN:
                    case PieceID.BLACK_PAWN: {
                        if (this.pawnMoveIsValid(src, pos)) {
                            return true;
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        }
        return false;
    }

    noValidMoves(white: boolean): boolean {
        for (let rank = 1; rank <= 8; ++rank) {
            for (let file = 1; file <= 8; ++file) {
                const sq = {piece: this.state.at(rank, file), rank: rank, file: file};
                if (sq.piece === PieceID.EMPTY) {
                    continue;
                }
                if (
                    white === isWhite(sq.piece) &&
                    this.getLegalMoves(sq).length !== 0
                ) {
                    return false;
                }
            }
        }
        return true;
    }

    amInCheckmate(): boolean {
        return this.amInCheck(this.whitesTurn) && this.noValidMoves(this.whitesTurn);
    }

    amInStalemate(): boolean {
        return this.noValidMoves(this.whitesTurn) && !this.amInCheck(this.whitesTurn);
    }

    insufficientMaterial(): boolean {
        const countPieces: Map<PieceID, number> = new Map<PieceID, number>;

        countPieces.set(PieceID.WHITE_KING, 0);
        countPieces.set(PieceID.WHITE_QUEEN, 0);
        countPieces.set(PieceID.WHITE_ROOK, 0);
        countPieces.set(PieceID.WHITE_KNIGHT, 0);
        countPieces.set(PieceID.WHITE_BISHOP, 0);
        countPieces.set(PieceID.WHITE_PAWN, 0);

        countPieces.set(PieceID.BLACK_KING, 0);
        countPieces.set(PieceID.BLACK_QUEEN, 0);
        countPieces.set(PieceID.BLACK_ROOK, 0);
        countPieces.set(PieceID.BLACK_KNIGHT, 0);
        countPieces.set(PieceID.BLACK_BISHOP, 0);
        countPieces.set(PieceID.BLACK_PAWN, 0);

        for (let rank = 1; rank <= 8; rank += 1) {
            for (let file = 1; file <= 8; file += 1) {
                const piece: PieceID = this.state.at(rank, file);
                if (piece === PieceID.EMPTY) {
                    continue;
                }
                const oldCount = countPieces.get(piece)!;
                countPieces.set(piece, oldCount + 1);
            }
        }

        return this.insufficientMaterialColor(true, countPieces)
            && this.insufficientMaterialColor(false, countPieces);
    }

    insufficientMaterialColor(white: boolean, countPieces: Map<PieceID, number>): boolean {
        const num = function (pc: PieceID) {
            return countPieces.get(pc)!;
        }

        if (white) {
            // king + any pawn/rook/queen is sufficient
            if (
                num(PieceID.WHITE_PAWN)! !== 0
                || num(PieceID.WHITE_QUEEN)! !== 0
                || num(PieceID.WHITE_ROOK)! !== 0
            ) {
                return false;
            }

            // king + a knight and a bishop is sufficient
            if (
                num(PieceID.WHITE_BISHOP)! >= 1 && num(PieceID.WHITE_KNIGHT)! >= 1
            ) {
                return false;
            }

            // king + 2 knights is sufficient
            if (
                num(PieceID.WHITE_KNIGHT)! >= 2
            ) {
                return false;
            }

            // king + knight against rook, bishop, knight, or pawn is sufficient (smothered)
            if (
                num(PieceID.WHITE_KNIGHT) === 1 && num(PieceID.WHITE_BISHOP) === 0
                && (
                    num(PieceID.BLACK_ROOK) >= 1
                    || num(PieceID.BLACK_BISHOP) >= 1
                    || num(PieceID.BLACK_KNIGHT) >= 1
                    || num(PieceID.BLACK_PAWN) >= 1
                )
            ) {
                return false;
            }

            // king + bishop against knight or pawn is sufficient (smothered)
            if (
                num(PieceID.WHITE_BISHOP) === 1 && num(PieceID.WHITE_KNIGHT) === 0
                && (
                    num(PieceID.BLACK_KNIGHT) >= 1
                    || num(PieceID.BLACK_PAWN) >= 1
                )
            ) {
                return false;
            }

            // NOTE: king + bishops is not sufficient bc I am being lazy and don't want
            //       to implement checking whether or not they are opposite colors
        } else {
            // king + any pawn/rook/queen is sufficient
            if (
                num(PieceID.BLACK_PAWN)! !== 0
                || num(PieceID.BLACK_QUEEN)! !== 0
                || num(PieceID.BLACK_ROOK)! !== 0
            ) {
                return false;
            }

            // king + a knight and a bishop is sufficient
            if (
                num(PieceID.BLACK_BISHOP)! >= 1 && num(PieceID.BLACK_KNIGHT)! >= 1
            ) {
                return false;
            }

            // king + 2 knights is sufficient
            if (
                num(PieceID.BLACK_KNIGHT)! >= 2
            ) {
                return false;
            }

            // king + knight against rook, bishop, knight, or pawn is sufficient (smothered)
            if (
                num(PieceID.BLACK_KNIGHT) === 1 && num(PieceID.BLACK_BISHOP) === 0
                && (
                    num(PieceID.WHITE_ROOK) >= 1
                    || num(PieceID.WHITE_BISHOP) >= 1
                    || num(PieceID.WHITE_KNIGHT) >= 1
                    || num(PieceID.WHITE_PAWN) >= 1
                )
            ) {
                return false;
            }

            // king + bishop against knight or pawn is sufficient (smothered)
            if (
                num(PieceID.BLACK_BISHOP) === 1 && num(PieceID.BLACK_KNIGHT) === 0
                && (
                    num(PieceID.WHITE_KNIGHT) >= 1
                    || num(PieceID.WHITE_PAWN) >= 1
                )
            ) {
                return false;
            }

            // NOTE: king + bishops is not sufficient bc I am being lazy and don't want
            //       to implement checking whether or not they are opposite colors
        }

        return true;
    }

    moveWouldSelfCheck(from: PiecePosition, to: PiecePosition): boolean {
        let result = false;
        this.state.set(from.rank, from.file, PieceID.EMPTY);
        this.state.set(to.rank, to.file, from.piece);
        for (let rank = 1; rank <= 8; ++rank) {
            for (let file = 1; file <= 8; ++file) {
                const testPiece = this.state.at(rank, file);
                if (
                    (isWhite(from.piece) && isBlack(testPiece))
                    || (isBlack(from.piece) && isWhite(testPiece))
                ) {
                    if (this.pieceDoesCheck({piece: testPiece, rank: rank, file: file} satisfies PiecePosition)) {
                        // console.log({piece: testPiece, rank: rank, file: file});
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
                if (isWhite(pos.piece) && (this.state.at(rank, file) == PieceID.BLACK_KING)) {
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
            if (found) {
                break;
            }
        }

        switch (pos.piece) {
            case PieceID.WHITE_KING:
            case PieceID.BLACK_KING: {
                return this.kingDoesCheck(pos, oppKing);
            }
            case PieceID.WHITE_QUEEN:
            case PieceID.BLACK_QUEEN: {
                return this.queenDoesCheck(pos, oppKing);
            }
            case PieceID.WHITE_ROOK:
            case PieceID.BLACK_ROOK: {
                return this.rookDoesCheck(pos, oppKing);
            }
            case PieceID.WHITE_KNIGHT:
            case PieceID.BLACK_KNIGHT: {
                return this.knightDoesCheck(pos, oppKing);
            }
            case PieceID.WHITE_BISHOP:
            case PieceID.BLACK_BISHOP: {
                return this.bishopDoesCheck(pos, oppKing);
            }
            case PieceID.WHITE_PAWN:
            case PieceID.BLACK_PAWN: {
                return this.pawnDoesCheck(pos, oppKing);
            }
            default: {
                break;
            }
        }
        return false;
    }

    kingDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const deltaRank = Math.abs(toCheck.rank - pos.rank);
        const deltaFile = Math.abs(toCheck.file - pos.file);
        const validRank = deltaRank <= 1;
        const validFile = deltaFile <= 1;
        return validRank && validFile;
    }

    queenDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const deltaRank = Math.abs(toCheck.rank - pos.rank);
        const deltaFile = Math.abs(toCheck.file - pos.file);
        const isHorizontal = deltaRank === 0;
        const isVertical = deltaFile === 0;
        const isDiagonal = deltaRank === deltaFile;

        if (!isHorizontal && !isVertical && !isDiagonal) {
            return false;
        }

        // does not cross another piece
        if (isVertical) {
            let rank = pos.rank;
            rank = (rank < toCheck.rank ? rank + 1 : rank - 1);
            while (rank !== toCheck.rank) {
                if (this.state.at(rank, pos.file) !== PieceID.EMPTY) {
                    return false;
                }
                rank = (rank < toCheck.rank ? rank + 1 : rank - 1);
            }
        } else if (isHorizontal) {
            let file = pos.file;
            file = (file < toCheck.file ? file + 1 : file - 1);
            while (file !== toCheck.file) {
                if (this.state.at(pos.rank, file) !== PieceID.EMPTY) {
                    return false;
                }
                file = (file < toCheck.file ? file + 1 : file - 1);
            }
        } else if (isDiagonal) {
            let rank = pos.rank;
            let file = pos.file;
            rank = rank < toCheck.rank ? rank + 1 : rank - 1;
            file = file < toCheck.file ? file + 1 : file - 1;
            while (rank !== toCheck.rank && file !== toCheck.file) {
                if (this.state.at(rank, file) !== PieceID.EMPTY) {
                    return false;
                }
                rank = rank < toCheck.rank ? rank + 1 : rank - 1;
                file = file < toCheck.file ? file + 1 : file - 1;
            }
        }

        return true;
    }

    rookDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const deltaRank = Math.abs(pos.rank - toCheck.rank);
        const deltaFile = Math.abs(pos.file - toCheck.file);
        const isHorizontal = deltaRank == 0;
        const isVertical = deltaFile == 0;
        if (!isHorizontal && !isVertical) {
            return false;
        }

        // does not cross another piece
        if (isVertical) {
            let rank = toCheck.rank;
            rank = rank < pos.rank ? rank + 1 : rank - 1;
            while (rank != pos.rank) {
                if (this.state.at(rank, toCheck.file) !== PieceID.EMPTY) {
                    return false;
                }
                rank = rank < pos.rank ? rank + 1 : rank - 1;
            }
        } else if (isHorizontal) {
            let file = toCheck.file;
            file = file < pos.file ? file + 1 : file - 1;
            while (file != pos.file) {
                if (this.state.at(toCheck.rank, file) !== PieceID.EMPTY) {
                    return false;
                }
                file = file < pos.file ? file + 1 : file - 1;
            }
        }

        return true;
    }

    knightDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const deltaRank = Math.abs(pos.rank - toCheck.rank);
        const deltaFile = Math.abs(pos.file - toCheck.file);
        const validDistance = deltaRank + deltaFile === 3;
        const validRank = deltaRank > 0;
        const validFile = deltaFile > 0;
        return !(!validDistance || !validRank || !validFile);
    }

    bishopDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const deltaRank = Math.abs(toCheck.rank - pos.rank);
        const deltaFile = Math.abs(toCheck.file - pos.file);
        const isDiagonal = deltaRank == deltaFile;
        if (!isDiagonal) {
            return false;
        }

        let rank = pos.rank;
        let file = pos.file;
        rank = rank < toCheck.rank ? rank + 1 : rank - 1;
        file = file < toCheck.file ? file + 1 : file - 1;
        while (rank != toCheck.rank && file != toCheck.file) {
            if (this.state.at(rank, file) !== PieceID.EMPTY) {
                return false;
            }
            rank = rank < toCheck.rank ? rank + 1 : rank - 1;
            file = file < toCheck.file ? file + 1 : file - 1;
        }

        return true;
    }

    pawnDoesCheck(pos: PiecePosition, toCheck: PiecePosition): boolean {
        const advanceExactlyOneSquare = toCheck.rank - pos.rank === (isWhite(pos.piece) ? 1 : -1);
        const moveExactlyOneFile = Math.abs(toCheck.file - pos.file) === 1;
        return advanceExactlyOneSquare && moveExactlyOneFile;
    }


    getLegalMoves(pos: PiecePosition): Array<PiecePosition> {
        switch (pos.piece) {
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
            default: {
            }
        }
        return new Array<PiecePosition>();
    }

    getLegalKingMoves(pos: PiecePosition): Array<PiecePosition> {
        const legalMoves = new Array<PiecePosition>();
        for (let rank = pos.rank - 1; rank <= pos.rank + 1; rank += 1) {
            for (let file = pos.file - 1; file <= pos.file + 1; file += 1) {
                if (rank < 1 || file < 1 || rank > 8 || file > 8) {
                    continue;
                }
                const dest = {piece: this.state.at(rank, file), rank: rank, file: file} satisfies PiecePosition;
                if (this.kingMoveIsValid(pos, dest)) {
                    legalMoves.push(dest);
                }
            }
        }
        if (isWhite(pos.piece) && this.whiteKingCanCastle && this.kingMoveIsValid(pos, {
            piece: this.state.at(1, 3),
            rank: 1,
            file: 3
        })) {
            legalMoves.push({piece: this.state.at(1, 3), rank: 1, file: 3})
        }
        if (isWhite(pos.piece) && this.whiteKingCanCastle && this.kingMoveIsValid(pos, {
            piece: this.state.at(1, 7),
            rank: 1,
            file: 7
        })) {
            legalMoves.push({piece: this.state.at(1, 7), rank: 1, file: 7})
        }
        if (isBlack(pos.piece) && this.blackKingCanCastle && this.kingMoveIsValid(pos, {
            piece: this.state.at(8, 3),
            rank: 8,
            file: 3
        })) {
            legalMoves.push({piece: this.state.at(8, 3), rank: 8, file: 3});
        }
        if (isBlack(pos.piece) && this.blackKingCanCastle && this.kingMoveIsValid(pos, {
            piece: this.state.at(8, 7),
            rank: 8,
            file: 7
        })) {
            legalMoves.push({piece: this.state.at(8, 7), rank: 8, file: 7});
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
                    if (this.queenMoveIsValid(pos, dest)) {
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
        const deltaFiles: number[] = [-2, -1, 1, 2];
        const deltaRanks: number[][] = [[-1, 1], [-2, 2], [-2, 2], [-1, 1]];
        let idx = 0;
        for (let dx of deltaFiles) {
            for (let dy of deltaRanks[idx]) {
                const newFile = pos.file + dx;
                const newRank = pos.rank + dy;
                if (newFile < 1 || newFile > 8 || newRank < 1 || newRank > 8) {
                    continue;
                }
                const dest = {piece: this.state.at(newRank, newFile), rank: newRank, file: newFile};
                if (this.knightMoveIsValid(pos, dest)) {
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


    endTurnOrPromote() {
        if (this.promotionPending) {
            this.createPromotionModal();
        } else {
            this.endTurn();
        }
    }

    endTurn() {
        this.whitesTurn = !this.whitesTurn;
        if (this.gameHasInsufficientMaterial) {
            // TODO: implement some kind of effect
            this.canvas.classList.add("insufficient-material");
            console.log("DRAW");
        }
        if (this.amInCheckmate()) {
            // TODO: implement some kind of effect
            this.canvas.classList.add(this.whitesTurn ? "black-wins" : "white-wins");
            console.log("CHECKMATE");
        }
        if (this.amInStalemate()) {
            // TODO: implement some kind of effect
            this.canvas.classList.add("stalemate");
            console.log("STALEMATE");
        }
    }

    endPromotion() {
        this.promotionPending = false;
        this.state.set(this.pieceToPromote.rank, this.pieceToPromote.file, this.pieceToPromote.piece);
        this.pieceToPromote.piece = PieceID.EMPTY;
        this.pieceToPromote.rank = 0;
        this.pieceToPromote.file = 0;
        this.drawBoardState();
        this.endTurn();
    }

    createPromotionModal() {
        this.promotionModal.prepareModal(
            this.pieceToPromote,
            this.endPromotion.bind(this)
        );
    }

}