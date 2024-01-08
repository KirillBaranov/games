export enum pieces {
    king = 'K',
    queen = 'Q',
    rook = 'R',
    knight = 'N',
    bishop = 'B',
    pawn = 'P',
}

export const piecesTranslations: Record<string, string> = {
    [pieces.king]: 'Король',
    [pieces.queen]: 'Ферзь',
    [pieces.rook]: 'Ладья',
    [pieces.knight]: 'Конь',
    [pieces.bishop]: 'Слон',
    [pieces.pawn]: 'Пешка',
};