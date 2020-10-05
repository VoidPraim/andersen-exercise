
class Game {
  constructor() {
    this.setFirstPlayer();
    this.squares = [];
  }

  setFirstPlayer() {
    const randomNumber = Math.random();

    this.currentPlayer = randomNumber > 0.5 ? PLAYER1 : PLAYER2;
  }

  createGame() {
    this.gameWrap = document.createElement('div');
    this.gameWrap.classList.add('wrap');

    this.headerBlock = this.createHeader();
    this.mainBlock = this.createMain();
    this.footerBlock = this.createFooter();

    return this.gameWrap;
  }

  createHeader() {
    this.headerBlock = document.createElement('div');
    this.headerBlock.classList.add('players_step')

    const playersBlock = document.createElement('div');
    playersBlock.classList.add('players')

    this.redPlayerBlock = document.createElement('div');
    this.redPlayerBlock.classList.add('player');
    this.redPlayerBlock.classList.add('red_player');

    this.greenPlayerBlock = document.createElement('div');
    this.greenPlayerBlock.classList.add('player');
    this.greenPlayerBlock.classList.add('green_player');

    playersBlock.append(this.redPlayerBlock);
    playersBlock.append(this.greenPlayerBlock);

    this.currentPlayerBlock = document.createElement('div');
    this.currentPlayerBlock.classList.add('current_player')
    this.currentPlayerBlock.innerText = `Ходит ${this.currentPlayer.name}`;

    this.headerBlock.append(playersBlock);
    this.headerBlock.append(this.currentPlayerBlock);

    this.setCurrentStep();

    this.gameWrap.append(this.headerBlock);
  }

  createMain() {
    this.mainBlock = document.createElement('div');
    this.mainBlock.classList.add('game_area');

    const gameBlock = document.createElement('div');
    gameBlock.classList.add('game_block');

    const gameArea = document.createElement('div');
    gameArea.classList.add('game_active_area');

    for (let i = 0; i < 9; i++) {
      const square = new GameSquare();
      square.onClick = function () {
        if (!square.isActive) {
          square.setColor(this.currentPlayer.value);
          this.changeCurrentPlayer();
        }
      }.bind(this);
      gameArea.append(square.createSquare());
      this.squares.push(square);
    }

    gameBlock.append(gameArea);

    this.mainBlock.append(gameBlock);

    this.gameWrap.append(this.mainBlock);
  }

  createFooter() {
    this.footerBlock = document.createElement('div');
    this.footerBlock.classList.add('reset_game');

    const resetButton = document.createElement('div');
    resetButton.classList.add('reset_button');

    const resetText = document.createElement('span');
    resetText.classList.add('reset_text');
    resetText.innerText = RESET_TEXT;

    resetButton.append(resetText);

    resetButton.addEventListener('click', this.clearSquares.bind(this))
    this.footerBlock.append(resetButton);
    this.gameWrap.append(this.footerBlock);
  }

  changeCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === PLAYER1
      ? this.currentPlayer = PLAYER2 : this.currentPlayer = PLAYER1;

    this.setCurrentStep();
  }

  clearSquares() {
    this.squares.forEach((square) => {
      square.resetActive();
    })
  }

  setCurrentStep() {
    if (this.currentPlayer === PLAYER1) {
      this.redPlayerBlock.classList.add('red_player_active');
      this.greenPlayerBlock.classList.remove('green_player_active');
    }

    if (this.currentPlayer === PLAYER2) {
      this.greenPlayerBlock.classList.add('green_player_active');
      this.redPlayerBlock.classList.remove('red_player_active');
    }

    this.currentPlayerBlock.innerText = `Ходит ${this.currentPlayer.name}`;
  }
}
