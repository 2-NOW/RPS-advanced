import React from 'react';
import Commit from './Commit';
import Reveal from './Reveal';

// commit reveal 분기처리

// Commit
// isHost true이고 commit stage면
// waiting component에 player waiting 메세지

// Reveal
// game status reveal
// 값 받아오면 status distribution으로
// waiting component에 waiting distribution 메세지

// Commit : 방만들기
// Reveal : 참가하기

export default function Game({
  user,
  game,
  games,
  setUser,
  setGame,
  setGames,
}) {
  return game.stage === 'reveal' ? (
    <Reveal user={user} game={game} setUser={setUser} setGame={setGame} />
  ) : (
    <Commit
      user={user}
      game={game}
      games={games}
      setUser={setUser}
      setGame={setGame}
      setGames={setGames}
    />
  );
}
