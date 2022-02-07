import React, { useState } from 'react';
import styled from 'styled-components';
import MainList from './MainList';
import Game from './Game';
import { initialUser, initialGames, initialGame } from '../data/data';
import {} from '../data/data';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Main() {
  const [user, setUser] = useState(initialUser);
  const [game, setGame] = useState(initialGame);
  const [games, setGames] = useState(initialGames);

  // result 모달 혹은 component 여기서 처리
  // List 컴포넌트에 열려있는 방만 조회
  return (
    <Container>
      {user.stage ? (
        <Game
          user={user}
          game={game}
          games={games}
          setUser={setUser}
          setGame={setGame}
          setGames={setGames}
        />
      ) : (
        <MainList games={games} user={user} setUser={setUser} />
      )}
    </Container>
  );
}
