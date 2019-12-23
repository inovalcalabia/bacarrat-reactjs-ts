class GameLogic {
  constructor() {}
  greet() {
    return "Hello World!";
  }
  checkTime(_time: number) {
    let isLock: boolean = false;
    if (_time < 6) {
      isLock = true;
    } else {
      isLock = false;
    }
    return isLock;
  }
  checkWinner(
    _playerCardsValue: Array<number>,
    _bankerCardsValue: Array<number>
  ) {
    let playerTotalValue = this.getTotal(_playerCardsValue);
    let bankerTotalValue = this.getTotal(_bankerCardsValue);
    let winner = 0;
    if (playerTotalValue > bankerTotalValue) {
      winner = 1;
    } else if (bankerTotalValue > playerTotalValue) {
      winner = 2;
    }
    return winner;
  }
  getTotal(_arr: Array<number>) {
    let total: number = 0;
    for (let i = 0; i < _arr.length; i += 1) {
      let val = _arr[i];
      if (val < 10) {
        total += val;
      }
    }
    return total % 10;
  }

  checkCard(_cardValue: number) {
    if (_cardValue <= 52) {
      return true;
    } else {
      return false;
    }
  }
  checkPlayerAddCard(_playerTotalValue: number) {
    if (_playerTotalValue <= 5) {
      return true;
    }
    return false;
  }
  checkBankerAddCard(_bankerTotalValue: number, _player3rdCard: number) {
    if (_bankerTotalValue <= 2) {
      return true;
    }
    let playerLastCardValue: number = _player3rdCard;
    if (
      _bankerTotalValue === 3 &&
      ((playerLastCardValue >= 0 && playerLastCardValue <= 7) ||
        playerLastCardValue === 9)
    ) {
      return true;
    } else if (
      _bankerTotalValue === 4 &&
      playerLastCardValue >= 2 &&
      playerLastCardValue <= 7
    ) {
      return true;
    } else if (
      _bankerTotalValue === 5 &&
      playerLastCardValue >= 4 &&
      playerLastCardValue <= 7
    ) {
      return true;
    } else if (
      _bankerTotalValue === 6 &&
      playerLastCardValue >= 6 &&
      playerLastCardValue <= 7
    ) {
      return true;
    }

    return false;
  }
}
export default GameLogic;
