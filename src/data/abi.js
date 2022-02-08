export const abi = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'roomNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'betAmount',
        type: 'uint256',
      },
    ],
    name: 'CreatedRoom',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_commitment',
        type: 'bytes32',
      },
    ],
    name: 'createRoom',
    outputs: [
      {
        internalType: 'uint256',
        name: 'roomNum',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'betAmount',
        type: 'uint256',
      },
    ],
    name: 'DrawGame',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum RPS.GameStatus',
        name: 'gameEnd',
        type: 'uint8',
      },
    ],
    name: 'GameEnd',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum RPS.GameStatus',
        name: 'gameStarted',
        type: 'uint8',
      },
    ],
    name: 'GameStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'roomNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum RPS.Stage',
        name: 'stage',
        type: 'uint8',
      },
    ],
    name: 'JoinedRoom',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomNum',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_commitment',
        type: 'bytes32',
      },
    ],
    name: 'joinRoom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'originator',
        type: 'address',
      },
    ],
    name: 'OriginatorWin',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomNum',
        type: 'uint256',
      },
    ],
    name: 'payout',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomNum',
        type: 'uint256',
      },
      {
        internalType: 'enum RPS.Hand',
        name: '_hand',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'password',
        type: 'bytes32',
      },
    ],
    name: 'reveal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'taker',
        type: 'address',
      },
    ],
    name: 'TakerWin',
    type: 'event',
  },
];
