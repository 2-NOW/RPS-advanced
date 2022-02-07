export const initialUser = {
  // commit, reveal, distribution
  stage: null,
  // win, lose, draw, null
  result: null,
  isHost: false,
  isLoading: false,
};

export const initialGame = {
  roomNumber: 0,
  // commit, reveal, distribution
  stage: null,
  betAmount: 0,
  // NOT_STARTED, STARTED, COMPLETE,
  gameStatus: 'NOT_STARTED',
};

export const initialGames = [
  {
    roomNumber: 0,
    stage: null,
    betAmount: 0,
    gameStatus: 'NOT_STARTED',
  },
  { gameStatus: 'STARTED' },
];
