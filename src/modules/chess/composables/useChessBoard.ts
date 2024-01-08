import {computed, ref} from 'vue';
import {BLACK, BOARD_SIZE, knightMoves, pieces, piecesTranslations, WHITE} from "@/modules/chess/constants";
import { translatePieceName } from "@/modules/chess/utils/pieces/translatePieceName";
import type {ChessBoard, Move, Piece, SelectedPiece} from "@/modules/chess/types";
import {isBlackCell, isValidCoordinate} from "@/modules/chess/utils/board";

export default function useChessBoard() {
    const gameStatus = ref('active');
    const currentPlayer = ref(WHITE);

    const chessBoard = ref<ChessBoard>(initializeChessBoard());
    const selectedPiece = ref<SelectedPiece | null>(null);
    const possibleMoves = ref<Move[]>([]);
    const capturedPiecesWhite = ref<Piece[]>([]);
    const capturedPiecesBlack = ref<Piece[]>([]);

    function isHighlightedCell(row: number, col: number): boolean {
        return possibleMoves.value.some(move => move.row === row && move.col === col);
    }

    const canMove = computed(() => {
        return selectedPiece.value?.piece.color === currentPlayer.value;
    });

    const opponentPlayer = computed(() => currentPlayer.value === WHITE ? BLACK : WHITE);

    function initializeChessBoard(): ChessBoard {
        const board: ChessBoard = Array.from({ length: BOARD_SIZE }, () =>
            Array.from({ length: BOARD_SIZE }, () => ({ piece: null }))
        );

        [WHITE, BLACK].forEach((color, colorIndex) => {
            const rowIndices = colorIndex === 0 ? [BOARD_SIZE - 1, BOARD_SIZE - 2] : [0, 1];
            const backRow = pieces.rook + pieces.knight + pieces.bishop + pieces.queen + pieces.king + pieces.bishop + pieces.knight + pieces.rook;

            rowIndices.forEach(rowIndex => {
                for (let i = 0; i < BOARD_SIZE; i++) {
                    if (rowIndex === 1 || rowIndex === BOARD_SIZE - 2) {
                        board[rowIndex][i].piece = { symbol: pieces.pawn, color, translatedName: piecesTranslations[pieces.pawn] };
                    } else if (rowIndex === 0 || rowIndex === BOARD_SIZE - 1) {
                        const symbol = backRow[i];
                        const translatedName = translatePieceName(symbol);
                        board[rowIndex][i].piece = { symbol, color, translatedName };
                    }
                }
            });
        });

        return board;
    }

    function handleCellClick(row: number, col: number): void {
        if (selectedPiece.value && possibleMoves.value.some(move => move.row === row && move.col === col) && canMove.value) {
            movePiece(row, col);
        } else {
            if (selectedPiece.value && selectedPiece.value.row === row && selectedPiece.value.col === col) {
                resetSelection();
            } else {
                selectPiece(row, col);
            }
        }
    }

    function movePiece(newRow: number, newCol: number): void {
        if (isValidMove(newRow, newCol)) {
            const capturedPiece = chessBoard.value[newRow][newCol].piece;

            if (capturedPiece) {
                capturePiece(capturedPiece);
            }

            chessBoard.value[newRow][newCol].piece = selectedPiece.value!.piece;

            checkGameStatus();

            chessBoard.value[selectedPiece.value!.row][selectedPiece.value!.col].piece = null;

            currentPlayer.value = currentPlayer.value === WHITE ? BLACK : WHITE;

            resetSelection();
        }
    }

    function checkGameStatus(): void {
        if (isCheckmate(currentPlayer.value)) {
            gameStatus.value = 'checkmate';
        } else if (isStalemate(currentPlayer.value)) {
            gameStatus.value = 'stalemate';
        } else if (isCheck(currentPlayer.value)) {
            gameStatus.value = 'check';
        } else {
            gameStatus.value = 'active';
        }
    }

    function capturePiece(piece: Piece): void {
        const capturedPieces = piece.color === WHITE ? capturedPiecesWhite : capturedPiecesBlack;
        capturedPieces.value.push(piece);
    }

    function resetSelection(): void {
        selectedPiece.value = null;
        possibleMoves.value = [];
    }

    function selectPiece(row: number, col: number): void {
        const piece = getPiece(row, col);

        if (!piece) {
            resetSelection();
            return;
        }

        selectedPiece.value = { row, col, piece };
        calculatePossibleMoves();
    }

    function calculatePossibleMoves(): void {
        if (!selectedPiece.value) return;

        const pieceType = selectedPiece.value.piece.symbol.toLowerCase();
        const { row, col } = selectedPiece.value;

        switch (pieceType) {
            case 'k':
                possibleMoves.value = calculateKingMoves(row, col, chessBoard.value);
                break;
            case 'q':
                possibleMoves.value = calculateQueenMoves(row, col, chessBoard.value)
                break;
            case 'r':
                possibleMoves.value = calculateRookMoves(row, col, chessBoard.value);
                break;
            case 'n':
                possibleMoves.value = calculateKnightMoves(row, col, chessBoard.value);
                break;
            case 'b':
                possibleMoves.value = calculateBishopMoves(row, col, chessBoard.value);
                break;
            case 'p':
                possibleMoves.value = calculatePawnMoves(row, col, selectedPiece.value.piece.color, chessBoard.value);
                break;
        }
    }

    function isValidMove(row: number, col: number): boolean {
        return possibleMoves.value.some(move => move.row === row && move.col === col);
    }

    function isOpponentPiece(row: number, col: number, color: string): boolean {
        const targetPiece = chessBoard.value[row][col]?.piece;
        return targetPiece !== null && color !== targetPiece.color;
    }

    function getPiece(row: number, col: number): Piece | null {
        return chessBoard.value[row][col]?.piece || null;
    }

    function calculatePossibleMovesForPiece(row: number, col: number): Move[] {
        const piece = getPiece(row, col);

        if (!piece) {
            return [];
        }

        const pieceType = piece.symbol.toLowerCase();

        switch (pieceType) {
            case 'k':
                return calculateKingMoves(row, col, chessBoard.value);
            case 'q':
                return calculateQueenMoves(row, col, chessBoard.value);
            case 'r':
                return calculateRookMoves(row, col, chessBoard.value);
            case 'n':
                return calculateKnightMoves(row, col, chessBoard.value);
            case 'b':
                return calculateBishopMoves(row, col, chessBoard.value);
            case 'p':
                return calculatePawnMoves(row, col, piece.color, chessBoard.value);
            default:
                return [];
        }
    }

    function isStalemate(color: string): boolean {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const piece = chessBoard.value[row][col]?.piece;

                if (piece && piece.color === color) {
                    const moves = calculatePossibleMovesForPiece(row, col);
                    if (moves.length > 0) {
                        return false;  // Если у фигуры есть ходы, игра не в тупике
                    }
                }
            }
        }

        return true;  // Если у всех фигур нет ходов, игра в тупике (stalemate)
    }

    function isCheck(color: string): boolean {
        const kingPosition = findKingPosition(color);

        if (!kingPosition) {
            return false;
        }

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const piece = chessBoard.value[row][col]?.piece;

                if (piece && piece.color !== color) {
                    const moves = calculatePossibleMovesForPiece(row, col);

                    if (moves.some(move => move.row === kingPosition.row && move.col === kingPosition.col)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function isCheckmate(color: string): boolean {
        return isCheck(color) && isStalemate(color);
    }

    function findKingPosition(color: string): { row: number; col: number } | null {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const piece = chessBoard.value[row][col]?.piece;

                if (piece && piece.symbol.toLowerCase() === 'k' && piece.color === color) {
                    return { row, col };
                }
            }
        }

        return null;
    }

    function calculateKnightMoves(row: number, col: number, chessBoard: ChessBoard): Move[] {
        const moves: Move[] = [];
        const knightMoves: Move[] = [
            { row: -2, col: -1 }, { row: -2, col: 1 },
            { row: -1, col: -2 }, { row: -1, col: 2 },
            { row: 1, col: -2 }, { row: 1, col: 2 },
            { row: 2, col: -1 }, { row: 2, col: 1 },
        ];

        knightMoves.forEach(move => {
            const newRow = row + move.row;
            const newCol = col + move.col;
            if (isValidCoordinate(newRow, newCol) && (!chessBoard[newRow][newCol]?.piece || isOpponentPiece(newRow, newCol, selectedPiece.value!.piece.color))) {
                moves.push({ row: newRow, col: newCol });
            }
        });

        return moves;
    }

    function calculatePawnMoves(row: number, col: number, color: string, chessBoard: ChessBoard): Move[] {
        const moves: Move[] = [];
        const direction = color === WHITE ? -1 : 1;

        // Ход вперёд
        const newRow1 = row + direction;
        if (isValidCoordinate(newRow1, col) && !chessBoard[newRow1][col]?.piece) {
            moves.push({ row: newRow1, col });
        }

        // Ход на две клетки вперёд (только из начальной позиции)
        const newRow2 = row + 2 * direction;
        if ((color === WHITE && row === BOARD_SIZE - 2) || (color === BLACK && row === 1)) {
            if (isValidCoordinate(newRow2, col) && !chessBoard[newRow2][col]?.piece && !chessBoard[newRow1][col]?.piece) {
                moves.push({ row: newRow2, col });
            }
        }

        // Взятие налево и направо
        const attackCols = [col - 1, col + 1];
        attackCols.forEach(attackCol => {
            const newAttackRow = row + direction;
            if (isValidCoordinate(newAttackRow, attackCol) && isOpponentPiece(newAttackRow, attackCol, color)) {
                moves.push({ row: newAttackRow, col: attackCol });
            }
        });

        return moves;
    }

    function calculateKingMoves(row: number, col: number, chessBoard: ChessBoard): Move[] {
        const moves: Move[] = [];
        const directions = [-1, 0, 1];

        directions.forEach(rowDelta => {
            directions.forEach(colDelta => {
                const newRow = row + rowDelta;
                const newCol = col + colDelta;

                if (isValidCoordinate(newRow, newCol) && (rowDelta !== 0 || colDelta !== 0)) {
                    const targetPiece = chessBoard[newRow][newCol]?.piece;

                    if (!targetPiece || (targetPiece && targetPiece?.color === opponentPlayer.value)) {
                        moves.push({ row: newRow, col: newCol });
                    }
                }
            });
        });

        return moves;
    }

    function calculateQueenMoves(row: number, col: number, chessBoard: ChessBoard): Move[] {
        const rookMoves = calculateRookMoves(row, col, chessBoard);
        const bishopMoves = calculateBishopMoves(row, col, chessBoard);
        return [...rookMoves, ...bishopMoves];
    }

    function calculateRookMoves(row: number, col: number, chessBoard: ChessBoard): Move[] {
        const moves: Move[] = [];

        // Движение вверх
        for (let i = row - 1; i >= 0; i--) {
            if (!addMoveIfValid(i, col, chessBoard, moves)) break;
        }

        // Движение вниз
        for (let i = row + 1; i < BOARD_SIZE; i++) {
            if (!addMoveIfValid(i, col, chessBoard, moves)) break;
        }

        // Движение влево
        for (let j = col - 1; j >= 0; j--) {
            if (!addMoveIfValid(row, j, chessBoard, moves)) break;
        }

        // Движение вправо
        for (let j = col + 1; j < BOARD_SIZE; j++) {
            if (!addMoveIfValid(row, j, chessBoard, moves)) break;
        }

        return moves;
    }

    function calculateBishopMoves(row: number, col: number, chessBoard: ChessBoard): Move[] {
        const moves: Move[] = [];

        // Движение вверх-влево
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (!addMoveIfValid(i, j, chessBoard, moves)) break;
        }

        // Движение вверх-вправо
        for (let i = row - 1, j = col + 1; i >= 0 && j < BOARD_SIZE; i--, j++) {
            if (!addMoveIfValid(i, j, chessBoard, moves)) break;
        }

        // Движение вниз-влево
        for (let i = row + 1, j = col - 1; i < BOARD_SIZE && j >= 0; i++, j--) {
            if (!addMoveIfValid(i, j, chessBoard, moves)) break;
        }

        // Движение вниз-вправо
        for (let i = row + 1, j = col + 1; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
            if (!addMoveIfValid(i, j, chessBoard, moves)) break;
        }

        return moves;
    }

    function addMoveIfValid(row: number, col: number, chessBoard: ChessBoard, moves: Move[]): boolean {
        if (isValidCoordinate(row, col)) {
            const targetPiece = chessBoard[row][col]?.piece;
            if (!targetPiece) {
                moves.push({ row, col });
                return true;  // Продолжаем движение
            } else if (isOpponentPiece(row, col, selectedPiece.value?.piece.color)) {
                moves.push({ row, col });
            }
        }
        return false;  // Прекращаем движение
    }


    return {
        chessBoard,
        selectedPiece,
        possibleMoves,
        isBlackCell,
        isHighlightedCell,
        handleCellClick,
        capturedPiecesWhite,
        capturedPiecesBlack,
        gameStatus,
        currentPlayer,
    };
}