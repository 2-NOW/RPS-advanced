import React, { useEffect } from 'react';
import { Button, List, Avatar, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'antd/dist/antd.css';

const Container = styled.div`
  margin-top: 50px;
  width: 500px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ListTitleStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function MainList({ games, user, setUser }) {
  // 방 생성하기
  // gameStatus commit
  // ishost true
  const onCreateHandler = () => {
    setUser({ ...user, stage: 'commit', isHost: true });
  };

  const onJoinHandler = () => {
    setUser({ ...user, stage: 'commit' });
  };

  useEffect(() => {
    // room length 구독하는 함수 실행
  }, []);

  // gameStatus commit 으로
  // isHost false
  return (
    <Container>
      <Header>
        <div>
          <h1>가위바위보 게임</h1>
        </div>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={onCreateHandler}
        >
          방만들기
        </Button>
      </Header>
      <Divider orientation="left" orientationMargin="0">
        게임목록
      </Divider>
      <List
        itemLayout="horizontal"
        dataSource={games}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar size={60} icon={<UserOutlined />} />}
              title={
                <ListTitleStyle>
                  <h3>{item.roomNumber + '번방'}</h3>
                  {item.gameStatus === 'NOT_STARTED' ? (
                    <Button shape="round" onClick={onJoinHandler}>
                      참가하기
                    </Button>
                  ) : (
                    <Button shape="round" disabled>
                      {item.gameStatus === 'STARTED' ? '게임중' : '게임종료'}
                    </Button>
                  )}
                </ListTitleStyle>
              }
              description={'bet amount: ' + item.betAmount}
            />
          </List.Item>
        )}
      />
    </Container>
  );
}
