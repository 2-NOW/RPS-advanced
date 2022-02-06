//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract RPS {
    constructor() payable {}

    /*
    event GameCreated(address originator, uint256 originator_bet);
    event GameJoined(address originator, address taker, uint256 originator_bet, uint256 taker_bet);
    event OriginatorWin(address originator, address taker, uint256 betAmount);
    event TakerWin(address originator, address taker, uint256 betAmount);
   */

    enum Hand {
        rock,
        paper,
        scissors
    }

    enum PlayerStatus {
        STATUS_WIN,
        STATUS_LOSE,
        STATUS_TIE,
        STATUS_PENDING
    }
    
    // Add stage
    enum Stage {
        FirstCommit,
        SecondCommit,
        FirstReveal,
        SecondReveal,
        Distribute
    }

    enum GameStatus {
        STATUS_NOT_STARTED,
        STATUS_STARTED,
        STATUS_COMPLETE,
        STATUS_ERROR
    }

    // player structure
    struct Player {
        Hand hand;
        address payable addr;
        PlayerStatus playerStatus;
        uint256 playerBetAmount;
    }

    struct Game {
        uint256 betAmount;
        GameStatus gameStatus;
        Player originator;
        Player taker;
    }

    mapping(uint256 => Game) rooms;
    uint256 roomLen = 0;

    modifier isValidHand(Hand _hand) {
        require(
            (_hand == Hand.rock) ||
                (_hand == Hand.paper) ||
                (_hand == Hand.scissors)
        );
        _;
    }

    modifier isPlayer(uint256 roomNum, address sender) {
        require(
            sender == rooms[roomNum].originator.addr ||
                sender == rooms[roomNum].taker.addr
        );
        _;
    }

    function createRoom(Hand _hand)
        public
        payable
        isValidHand(_hand)
        returns (uint256 roomNum)
    {
        rooms[roomLen] = Game({
            betAmount: msg.value,
            gameStatus: GameStatus.STATUS_NOT_STARTED,
            originator: Player({
                hand: _hand,
                addr: payable(msg.sender),
                playerStatus: PlayerStatus.STATUS_PENDING,
                playerBetAmount: msg.value
            }),
            taker: Player({ // will change
                hand: Hand.rock,
                addr: payable(msg.sender),
                playerStatus: PlayerStatus.STATUS_PENDING,
                playerBetAmount: 0
            })
        });
        roomNum = roomLen;
        roomLen = roomLen + 1;

        // Emit gameCreated(msg.sender, msg.value);
    }

    function joinRoom(uint256 roomNum, Hand _hand)
        public
        payable
        isValidHand(_hand)
    {
        // Emit gameJoined(game.originator.addr, msg.sender, game.betAmount, msg.value);

        rooms[roomNum].taker = Player({
            hand: _hand,
            addr: payable(msg.sender),
            playerStatus: PlayerStatus.STATUS_PENDING,
            playerBetAmount: msg.value
        });
        rooms[roomNum].betAmount = rooms[roomNum].betAmount + msg.value;
          compareHands(roomNum);
    }

      function payout(uint256 roomNum)
        public
        payable
        isPlayer(roomNum, msg.sender)
    {
        if (
            rooms[roomNum].originator.playerStatus == PlayerStatus.STATUS_TIE &&
            rooms[roomNum].taker.playerStatus == PlayerStatus.STATUS_TIE
        ) {
            rooms[roomNum].originator.addr.transfer(
                rooms[roomNum].originator.playerBetAmount
            );
            rooms[roomNum].taker.addr.transfer(
                rooms[roomNum].taker.playerBetAmount
            );
        } else {
            if (
                rooms[roomNum].originator.playerStatus ==
                PlayerStatus.STATUS_WIN
            ) {
                rooms[roomNum].originator.addr.transfer(
                    rooms[roomNum].betAmount
                );
            } else if (
                rooms[roomNum].taker.playerStatus == PlayerStatus.STATUS_WIN
            ) {
                rooms[roomNum].taker.addr.transfer(rooms[roomNum].betAmount);
            } else {
                rooms[roomNum].originator.addr.transfer(
                    rooms[roomNum].originator.playerBetAmount
                );
                rooms[roomNum].taker.addr.transfer(
                    rooms[roomNum].taker.playerBetAmount
                );
            }
        }
        rooms[roomNum].gameStatus = GameStatus.STATUS_COMPLETE;
    }

    function compareHands(uint256 roomNum) private {
        uint8 originator = uint8(rooms[roomNum].originator.hand);
        uint8 taker = uint8(rooms[roomNum].taker.hand);

        rooms[roomNum].gameStatus = GameStatus.STATUS_STARTED;

        if (taker == originator) {
            //draw
            rooms[roomNum].originator.playerStatus = PlayerStatus.STATUS_TIE;
            rooms[roomNum].taker.playerStatus = PlayerStatus.STATUS_TIE;
        } else if ((taker + 1) % 3 == originator) {
            // originator wins
            rooms[roomNum].originator.playerStatus = PlayerStatus.STATUS_WIN;
            rooms[roomNum].taker.playerStatus = PlayerStatus.STATUS_LOSE;
        } else if ((originator + 1) % 3 == taker) {
            rooms[roomNum].originator.playerStatus = PlayerStatus.STATUS_LOSE;
            rooms[roomNum].taker.playerStatus = PlayerStatus.STATUS_WIN;
        } else {
            rooms[roomNum].gameStatus = GameStatus.STATUS_ERROR;
        }
    }
}
