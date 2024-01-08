import {piecesTranslations} from "@/modules/chess/constants";

export function translatePieceName(symbol: string): string {
    return piecesTranslations[symbol] || '';
}