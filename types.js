export var PieceID;
(function (PieceID) {
    PieceID[PieceID["EMPTY"] = 0] = "EMPTY";
    PieceID[PieceID["BLACK_KING"] = 1] = "BLACK_KING";
    PieceID[PieceID["BLACK_QUEEN"] = 2] = "BLACK_QUEEN";
    PieceID[PieceID["BLACK_ROOK"] = 3] = "BLACK_ROOK";
    PieceID[PieceID["BLACK_KNIGHT"] = 4] = "BLACK_KNIGHT";
    PieceID[PieceID["BLACK_BISHOP"] = 5] = "BLACK_BISHOP";
    PieceID[PieceID["BLACK_PAWN"] = 6] = "BLACK_PAWN";
    PieceID[PieceID["WHITE_KING"] = 7] = "WHITE_KING";
    PieceID[PieceID["WHITE_QUEEN"] = 8] = "WHITE_QUEEN";
    PieceID[PieceID["WHITE_ROOK"] = 9] = "WHITE_ROOK";
    PieceID[PieceID["WHITE_KNIGHT"] = 10] = "WHITE_KNIGHT";
    PieceID[PieceID["WHITE_BISHOP"] = 11] = "WHITE_BISHOP";
    PieceID[PieceID["WHITE_PAWN"] = 12] = "WHITE_PAWN";
})(PieceID || (PieceID = {}));
export function isWhite(piece) {
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
export function isBlack(piece) {
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
export function getPieceName(piece) {
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
