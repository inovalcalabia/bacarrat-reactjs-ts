import GameLogic from "./gameLogic.test";
import { expect } from "chai";

const gameLogic = new GameLogic();

let lockTime: number = 5;
describe("check if game is locked when time is " + lockTime, () => {
  it(
    "should return " +
      gameLogic.checkTime(lockTime) +
      " when time is less than " +
      lockTime,
    () => {
      const result = gameLogic.checkTime(lockTime);
      expect(result).to.equal(true);
    }
  );
});
let unlocktime: number = 6;
describe("check if game is not locked when time is " + unlocktime, () => {
  it(
    "should return " +
      gameLogic.checkTime(unlocktime) +
      " when time is greater than 5",
    () => {
      const result = gameLogic.checkTime(unlocktime);
      expect(result).to.equal(false);
    }
  );
});
// value cards from 1 - 13
let playerCards: Array<number> = [2, 2, 3];
let bankerCards: Array<number> = [1, 2, 3];
describe(
  "check if the player winner [ player cards [" +
    playerCards +
    "] vs banker cards [" +
    bankerCards +
    "] ]",
  () => {
    it("should return 1", () => {
      const result = gameLogic.checkWinner(playerCards, bankerCards);
      expect(result).to.equal(1);
    });
  }
);

let playerCardsTest2: Array<number> = [1, 2, 3];
let bankerCardsTest2: Array<number> = [2, 2, 3];
describe(
  "check if the banker winner [ player cards [" +
    playerCardsTest2 +
    "] vs banker cards [" +
    bankerCardsTest2 +
    "] ]",
  () => {
    it("should return 2", () => {
      const result = gameLogic.checkWinner(playerCardsTest2, bankerCardsTest2);
      expect(result).to.equal(2);
    });
  }
);

let playerCardsTest3: Array<number> = [1, 2, 3];
let bankerCardsTest3: Array<number> = [1, 2, 3];
describe(
  "check if tie [ player cards [" +
    playerCardsTest3 +
    "] vs banker cards [" +
    bankerCardsTest3 +
    "] ]",
  () => {
    it("should return 0", () => {
      const result = gameLogic.checkWinner(playerCardsTest3, bankerCardsTest3);
      expect(result).to.equal(0);
    });
  }
);

let cardValue: number = 3;
describe(
  "check if card value [" + cardValue + "] is valid",
  () => {
    it("should return true", () => {
      const result = gameLogic.checkCard(cardValue);
      expect(result).to.equal(true);
    });
  }
);

let playerCardValue: number = 3;
describe(
  "check if player will get a additional card [" + playerCardValue + "]",
  () => {
    it("should return true", () => {
      const result = gameLogic.checkPlayerAddCard(playerCardValue);
      expect(result).to.equal(true);
    });
  }
);

let playerCardValueTest2: number = 3;
let bankerCardValue: number = 4;
describe(
  "check if banker will get a additional card  when player 3rd card value is [" + playerCardValueTest2 + "] and banker 2nd card value is [" + bankerCardValue + "]",
  () => {
    it("should return true", () => {
      const result = gameLogic.checkBankerAddCard(bankerCardValue, playerCardValueTest2);
      expect(result).to.equal(true);
    });
  }
);