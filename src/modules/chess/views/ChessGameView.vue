<template>
  <v-row class="h-100">
    <v-col>
      <v-card>
        <ChessGameStatus
            :current-player="currentPlayer"
            :game-status="gameStatus" />

        <v-card-text>
          <v-card class="chess-board">
            <v-card-text>
              <ChessGameCaptureInfo class="mb-3" :capture-pieces="capturedPiecesWhite" />

              <div v-for="(row, rowIndex) in chessBoard" :key="rowIndex" class="chess-row">
                <div
                    v-for="(cell, colIndex) in row"
                    :key="colIndex"
                    class="chess-cell"
                    :class="{ 'black-cell': isBlackCell(rowIndex, colIndex), 'highlighted-cell': isHighlightedCell(rowIndex, colIndex) }"
                    @click="handleCellClick(rowIndex, colIndex)"
                >
                  <ChessGamePiece
                      v-if="cell.piece"
                      :symbol="cell.piece.symbol"
                      :color="cell.piece.color" />
                </div>
              </div>

              <ChessGameCaptureInfo class="mt-3" :capture-pieces="capturedPiecesBlack" />
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import useChessBoard from '../composables/useChessBoard.ts';
import ChessGameStatus from "@/modules/chess/components/ChessGameStatus.vue";
import ChessGameCaptureInfo from "@/modules/chess/components/ChessGameCaptureInfo.vue";
import ChessGamePiece from "@/modules/chess/components/ChessGamePiece.vue";

const {
  chessBoard,
  isBlackCell,
  isHighlightedCell,
  handleCellClick,
  capturedPiecesWhite,
  capturedPiecesBlack,
  gameStatus,
  currentPlayer,
} = useChessBoard();

</script>

<style scoped>
.chess-board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* Добавлено свойство для растягивания по ширине */
}

.chess-row {
  display: flex;
}

.chess-cell {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.black-cell {
  background-color: #b58863;
}

.highlighted-cell {
  background-color: #a7c080;
}
</style>