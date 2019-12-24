/*
    // 1. get 2 set of cards for player and banker
    // 2. add the value of the 2 cards {0 is the lowest, 9 is the highest}
    // 3. third card rule
    // player
    // 0 - 5 must draw
    // 6 or 7 must stand
    // 8 or 9 natural, must stand
    // banker
    // 0 - 2 must draw
    // 3 - draw card if player have (1, 2, 3 ,4 ,5 ,6, 7, 9, 0) not 8
    // 4 - draw card if player have (2, 3, 4, 5, 6, 7)
    // 5 - draw card if player have (4, 5, 6, 7)
    // 6 - draw card if player have (6, 7)
    // 7 - must stand
    // 8 - 9 - natural, must stand
*/
export function getPoker(poker: string) {
    let p: any = {"frames":{"1":{"frame":{"x":277,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"2":{"frame":{"x":554,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"3":{"frame":{"x":554,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"4":{"frame":{"x":831,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"5":{"frame":{"x":831,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"6":{"frame":{"x":0,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"7":{"frame":{"x":277,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"8":{"frame":{"x":554,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"9":{"frame":{"x":831,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"10":{"frame":{"x":1108,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"11":{"frame":{"x":277,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"12":{"frame":{"x":554,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"13":{"frame":{"x":831,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"14":{"frame":{"x":277,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"15":{"frame":{"x":1108,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"16":{"frame":{"x":1108,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"17":{"frame":{"x":0,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"18":{"frame":{"x":277,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"19":{"frame":{"x":554,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"20":{"frame":{"x":831,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"21":{"frame":{"x":1108,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"22":{"frame":{"x":1385,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"23":{"frame":{"x":1385,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"24":{"frame":{"x":1108,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"25":{"frame":{"x":1385,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"26":{"frame":{"x":1662,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"27":{"frame":{"x":1662,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"28":{"frame":{"x":1385,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"29":{"frame":{"x":1385,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"30":{"frame":{"x":1662,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"31":{"frame":{"x":1662,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"32":{"frame":{"x":0,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"33":{"frame":{"x":1662,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"34":{"frame":{"x":0,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"35":{"frame":{"x":277,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"36":{"frame":{"x":554,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"37":{"frame":{"x":1939,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"38":{"frame":{"x":2216,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"39":{"frame":{"x":2216,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"40":{"frame":{"x":0,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"41":{"frame":{"x":831,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"42":{"frame":{"x":1108,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"43":{"frame":{"x":1385,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"44":{"frame":{"x":1662,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"45":{"frame":{"x":1939,"y":0,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"46":{"frame":{"x":1939,"y":392,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"47":{"frame":{"x":1939,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"48":{"frame":{"x":1939,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"49":{"frame":{"x":1939,"y":1568,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"50":{"frame":{"x":2216,"y":784,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"51":{"frame":{"x":2216,"y":1176,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}},"52":{"frame":{"x":0,"y":1960,"w":276,"h":391},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":276,"h":391},"sourceSize":{"w":276,"h":391}}},"meta":{"app":"https://www.leshylabs.com/apps/sstool/","version":"Leshy SpriteSheet Tool v0.8.4","image":"spritesheet.png","size":{"w":2492,"h":2351},"scale":1}}
    return p.frames[poker];
}
export function getCardValue(_value: number) {
    let cardValue = 1;
    if (_value >= 1 && _value <= 13) {
      cardValue = _value;
    } else if (_value >= 14 && _value <= 26) {
      cardValue = Math.abs(_value - 13);
    } else if (_value >= 27 && _value <= 39) {
      cardValue = Math.abs(_value - 26);
    } else {
      cardValue = Math.abs(_value - 39);
    }
    return {value: cardValue };
  }
  export function initCardList() {
    // spade heart diamond club
    let cardList = [];
    for (let i: number = 1; i <= 52; i += 1) {
        cardList.push(i);
    }
    return cardList;
  }
  export function checkPlayerAddCard(_playerTotalValue: number) {
    if (_playerTotalValue <= 5) {
      return true;
    }
    return false;
  }
  export function checkBankerAddCard(
    _bankerTotalValue: number,
    _playerCardList: Array<number>
  ) {
    if (_bankerTotalValue <= 2) {
      return true;
    }
    if (_playerCardList.length === 3) {
      let playerLastCardValue: number = getCardValue(_playerCardList[2])
        .value;
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
    }
    return false;
  }
  export function getTotal(arr: Array<number>) {
    let total: number = 0;
    for (let i = 0; i < arr.length; i += 1) {
      let val = getCardValue(arr[i]).value;
      if (val < 10) {
        total += val;
      }
    }
    return total % 10;
  }
  export function getCard(to: Array<number>, from: Array<number>) {
    to.push(from.splice(0, 1)[0]);
  }
  export function shuffleDeck(_deck: Array<number>) {
      let deck:Array<number>;
      deck = Object.assign(
      [],
      _deck.sort(() => Math.random() - 0.5)
    );
    return deck;
  }