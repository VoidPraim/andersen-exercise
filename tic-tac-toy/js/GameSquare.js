const SQUARE_CLASS = 'game_square';
const PLAYER1_SQUARE_CLASS = 'red_square';
const PLAYER2_SQUARE_CLASS = 'green_square';
const PLAYER1_COLOUR = 'red';
const PLAYER2_COLOUR = 'green';
const DEFAULT_COLOR = 'white';

class GameSquare {
  constructor() {
    this.isActive = false;
    this.playerColor = DEFAULT_COLOR;
    this.onClick = undefined;
  }

  resetActive() {
    if (this.playerColor === PLAYER1_COLOUR) {
      this.square.classList.remove(PLAYER1_SQUARE_CLASS);
    }

    if (this.playerColor === PLAYER2_COLOUR) {
      this.square.classList.remove(PLAYER2_SQUARE_CLASS);
    }

    this.playerColor = DEFAULT_COLOR;
    this.isActive = false;
  }

  createSquare() {

    this.square = document.createElement('div');
    this.square.classList.add(SQUARE_CLASS);

    this.square.addEventListener('click', this.onClick)
    return this.square;
  }

  setColor(color) {
    if (color === PLAYER1_COLOUR) {
      this.square.classList.add(PLAYER1_SQUARE_CLASS);
    }

    if (color === PLAYER2_COLOUR) {
      this.square.classList.add(PLAYER2_SQUARE_CLASS);
    }

    this.playerColor = color;
    this.isActive = true;
  }
}
