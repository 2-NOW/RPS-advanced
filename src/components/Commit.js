import React, { useEffect } from 'react';
import Loading from './Loading';
import { Form, Input, Button, Radio } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitForm = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Red = styled.span`
  color: red;
`;

// Reveal
// game status reveal
// 값 받아오면 status distribution으로
// waiting component에 waiting distribution 메세지

export default function Commit({
  user,
  game,
  games,
  setUser,
  setGame,
  setGames,
}) {
  const { stage, result, isHost, isLoading } = user;

  const onFinish = (values) => {
    console.log('Success:', values);
    // setGame({ ...game });
    setGame([...games, {}]);
    setUser({ ...user, isLoading: true });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // web3랑 통신해서 참가자 나타나고, stage가 first reveal 로 바뀌면
  // isLoading은 false로
  // 그리고 setGame stage를 reveal로 바꾸기

  useEffect(() => {
    // room number랑 stage 컨트랙트에서 view 하는 함수 호출
    if (isLoading) {
    }
    // join room 구독하는 함수 실행
    // joinroom 실행되면 isLoading false로 바꾸고, game stage를 reveal로 바꾸기
    return () => {
      // listener 삭제
    };
  }, [isLoading]);

  return isHost && isLoading ? (
    <Loading />
  ) : (
    <Container>
      <p>
        비밀번호는 확인 시 사용됩니다. <Red>잊지마세요 !</Red>
      </p>
      <SubmitForm>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="RPS"
            label="가위바위보"
            rules={[
              {
                required: true,
                message: '가위/바위/보 중 하나를 선택해주세요',
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="scissors">가위</Radio.Button>
              <Radio.Button value="rock">바위</Radio.Button>
              <Radio.Button value="paper">보</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {isHost ? (
            <Form.Item
              label="배팅금액"
              name="bet-amount"
              rules={[{ required: true, message: '배팅 금액을 적어주세요' }]}
            >
              <Input placeholder="Bet amount" />
            </Form.Item>
          ) : (
            <Form.Item
              label="배팅금액"
              name="bet-amount"
              // rules={[{ required: true, message: '배팅 금액을 적어주세요' }]}
            >
              <Input
                placeholder="Bet amount"
                defaultValue={game.betAmmount}
                disabled
              />
            </Form.Item>
          )}
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
            <Button type="primary" shape="round" htmlType="submit">
              게임시작
            </Button>
          </Form.Item>
        </Form>
      </SubmitForm>
    </Container>
  );
}
