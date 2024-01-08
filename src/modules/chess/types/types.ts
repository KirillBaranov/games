export interface Piece {
    symbol: string;
    color: string;
    translatedName: string;
}

export interface Cell {
    piece: Piece | null;
}

export interface ChessBoard {
    [key: number]: Cell[];
}

export interface SelectedPiece {
    row: number;
    col: number;
    piece: Piece;
}

export interface Move {
    row: number;
    col: number;
}