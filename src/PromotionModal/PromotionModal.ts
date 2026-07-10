import "./PromotionModal.css"

import BlackQueenStr from "@/assets/BlackQueen.svg?raw"
import BlackRookStr from "@/assets/BlackRook.svg?raw"
import BlackKnightStr from "@/assets/BlackKnight.svg?raw"
import BlackBishopStr from "@/assets/BlackBishop.svg?raw"
import WhiteQueenStr from "@/assets/WhiteQueen.svg?raw"
import WhiteRookStr from "@/assets/WhiteRook.svg?raw"
import WhiteKnightStr from "@/assets/WhiteKnight.svg?raw"
import WhiteBishopStr from "@/assets/WhiteBishop.svg?raw"

import {
    type DomComponent,
    type PieceImage,
    type PiecePosition,
    PieceID,
    isWhite,
    isBlack,
    getPieceName,
} from "@/types.js";

export class PromotionModal implements DomComponent {
    root:   HTMLDivElement;
    queen:  HTMLButtonElement;
    rook:   HTMLButtonElement;
    knight: HTMLButtonElement;
    bishop: HTMLButtonElement;
    buttonWidth: number;
    // non-owning reference
    cachedImagesRef: Map<PieceID, PieceImage>;
    pieceToPromote: PiecePosition | null;
    onPromotionDone: (()=>void) | null;

    queenListener: ()=> void;
    rookListener: ()=> void;
    knightListener: ()=> void;
    bishopListener: ()=> void;


    constructor(
        imageCache: Map<PieceID, PieceImage>,
        buttonWidth: number,
    ) {
        this.root   = document.createElement("div");
        this.root.id = "promotionModal";
        this.root.style.display = "none";
        this.queen  = this.root.appendChild(document.createElement("button"));
        this.rook   = this.root.appendChild(document.createElement("button"));
        this.knight = this.root.appendChild(document.createElement("button"));
        this.bishop = this.root.appendChild(document.createElement("button"));
        this.cachedImagesRef = imageCache;
        this.pieceToPromote = null;
        this.buttonWidth = buttonWidth;
        this.onPromotionDone = null;
        this.queenListener = ():void=>{};
        this.rookListener = ():void=>{};
        this.knightListener = ():void=>{};
        this.bishopListener = ():void=>{};
    }

    prepareModal(
        pieceToPromote: PiecePosition,
        onPromotionDone: ()=>void
    ): void {
        this.root.style.display = "block";
        this.pieceToPromote = pieceToPromote;
        this.onPromotionDone = onPromotionDone;

        const newQueen = document.createElement("button");
        const newRook = document.createElement("button");
        const newKnight = document.createElement("button");
        const newBishop = document.createElement("button");
        this.root.replaceChild(newQueen, this.queen);
        this.root.replaceChild(newRook, this.rook);
        this.root.replaceChild(newKnight, this.knight);
        this.root.replaceChild(newBishop, this.bishop);
        this.queen = newQueen;
        this.rook = newRook;
        this.knight = newKnight;
        this.bishop = newBishop;

        this.queen.setAttribute("style", "height:"+this.buttonWidth.toString()+"px;width:"+this.buttonWidth.toString()+"px");
        this.rook.setAttribute("style", "height:"+this.buttonWidth.toString()+"px;width:"+this.buttonWidth.toString()+"px");
        this.knight.setAttribute("style", "height:"+this.buttonWidth.toString()+"px;width:"+this.buttonWidth.toString()+"px");
        this.bishop.setAttribute("style", "height:"+this.buttonWidth.toString()+"px;width:"+this.buttonWidth.toString()+"px");

        if (isWhite(this.pieceToPromote.piece)) {
            const qi = this.queen.appendChild(this.cachedImagesRef.get(PieceID.WHITE_QUEEN)!.elem);
            qi.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const ri = this.rook.appendChild(this.cachedImagesRef.get(PieceID.WHITE_ROOK)!.elem);
            ri.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const ki = this.knight.appendChild(this.cachedImagesRef.get(PieceID.WHITE_KNIGHT)!.elem);
            ki.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const bi = this.bishop.appendChild(this.cachedImagesRef.get(PieceID.WHITE_BISHOP)!.elem);
            bi.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");

            this.queen.removeEventListener("click", this.queenListener);
            this.queenListener = ()=>{
                this.pieceToPromote!.piece = PieceID.WHITE_QUEEN;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.queen.addEventListener("click", this.queenListener);

            this.rook.removeEventListener("click", this.rookListener);
            this.rookListener = ()=>{
                this.pieceToPromote!.piece = PieceID.WHITE_ROOK;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.rook.addEventListener("click", this.rookListener);

            this.knight.removeEventListener("click", this.knightListener);
            this.knightListener = ()=>{
                this.pieceToPromote!.piece = PieceID.WHITE_KNIGHT;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.knight.addEventListener("click", this.knightListener);

            this.bishop.removeEventListener("click", this.bishopListener);
            this.bishopListener = ()=>{
                this.pieceToPromote!.piece = PieceID.WHITE_BISHOP;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.bishop.addEventListener("click", this.bishopListener);
        }

        else if (isBlack(this.pieceToPromote.piece)) {
            const qi = this.queen.appendChild(this.cachedImagesRef.get(PieceID.BLACK_QUEEN)!.elem);
            qi.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const ri = this.rook.appendChild(this.cachedImagesRef.get(PieceID.BLACK_ROOK)!.elem);
            ri.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const ki = this.knight.appendChild(this.cachedImagesRef.get(PieceID.BLACK_KNIGHT)!.elem);
            ki.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");
            const bi = this.bishop.appendChild(this.cachedImagesRef.get(PieceID.BLACK_BISHOP)!.elem);
            bi.setAttribute("style", "height:"+(this.buttonWidth - 8).toString()+"px;width:"+(this.buttonWidth - 8).toString()+"px");

            this.queen.removeEventListener("click", this.queenListener);
            this.queenListener = ()=>{
                this.pieceToPromote!.piece = PieceID.BLACK_QUEEN;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.queen.addEventListener("click", this.queenListener);

            this.rook.removeEventListener("click", this.rookListener);
            this.rookListener = ()=>{
                this.pieceToPromote!.piece = PieceID.BLACK_ROOK;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.rook.addEventListener("click", this.rookListener);

            this.knight.removeEventListener("click", this.knightListener);
            this.knightListener = ()=>{
                this.pieceToPromote!.piece = PieceID.BLACK_KNIGHT;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.knight.addEventListener("click", this.knightListener);

            this.bishop.removeEventListener("click", this.bishopListener);
            this.bishopListener = ()=>{
                this.pieceToPromote!.piece = PieceID.BLACK_BISHOP;
                this.onPromotionDone!();
                this.hideModal();
            };
            this.bishop.addEventListener("click", this.bishopListener);
        }
    }

    hideModal() {
        this.root.style.display = "none";
    }

    elem() { return this.root; }
}