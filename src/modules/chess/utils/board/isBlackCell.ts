export function isBlackCell(row: number, col: number): boolean {
    return (row + col) % 2 !== 0;
}