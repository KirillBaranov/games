import {BOARD_SIZE} from "@/modules/chess/constants";

export function isValidCoordinate(row: number, col: number): boolean {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}