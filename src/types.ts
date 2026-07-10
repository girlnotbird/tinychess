export type DomComponent = {
    elem(): HTMLElement;
};

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

export function isWhite(piece: PieceID): boolean {
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

export function isBlack(piece: PieceID): boolean {
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

export function getPieceName(piece: PieceID) {
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

export type PieceImage = {
    elem: HTMLImageElement;
}

export type PiecePosition = {
    piece: PieceID;
    rank: number;
    file: number;
};