import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import MainList from './MainList';
import Game from './Game';
import { initialUser, initialGames, initialGame } from '../data/data';
import { abi } from '../data/abi';
import Web3 from 'web3';

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
  const [isAlert, setIsAlert] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contractAbi, setContractAbi] = useState([...abi]);
  const [contract, setContract] = useState({});

  const ethEnabled = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setUser({ ...user, address: accounts[0] });
      const newWeb3 = new Web3(window.ethereum);
      setWeb3(newWeb3);
    } catch {
      setIsAlert(true);
    }
  };

  useEffect(() => {
    if (window.ethereum) ethEnabled();
    else setIsAlert(true);
  }, []);

  useEffect(() => {
    if (web3) {
      const rpsContract = new web3.eth.Contract(
        contractAbi,
        '0xEB0cf0EcE4aDA7eb5Bb5ef7D34f6F6449f249cAa'
      );
      setContract(rpsContract);
    }
  }, [web3]);
  // mainList에 구독으로 줘야됨
  // result 모달 혹은 component 여기서 처리
  // List 컴포넌트에 열려있는 방만 조회
  return (
    <>
      {isAlert && (
        <Alert
          message="Metamask 연결이 필요합니다."
          type="error"
          afterClose={() => {
            setIsAlert(false);
            ethEnabled();
          }}
          closeText="click to connect Metamask"
          showIcon
          closable
        />
      )}
      <Container>
        {user.stage ? (
          <Game
            web3={web3}
            contract={contract}
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
    </>
  );
}
