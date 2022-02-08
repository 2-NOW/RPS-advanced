import React, { useEffect } from 'react';
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

// Commit
// isHost true이고 commit stage면
// waiting component에 player waiting 메세지

export default function Reveal({ user, game, setUser, setGame }) {
  const { stage, result, isHost, isLoading } = user;
  // reveal 화면 전에 loading
  const onFinish = (values) => {
    console.log('Success:', values);

    // 같은 reveal 함수 호출
    // 각각의 주소에 맞는 트랜잭션 호출
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  useEffect(() => {
    // listener 추가
    // 이겼는지 졌는지 확인
    // who is win event 추가해서 이긴 사람 확인
    // isHost로 originator 판별 가능.
    // game status complete
    return () => {
      // listener 삭제
    };
  }, []);

  return (
    <Container>
      <p>
        이전에 입력한 가위바위보와 비밀번호를 <Red>다시 한 번</Red>{' '}
        입력해주세요.
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

          <Form.Item label="배팅금액" name="bet-amount">
            <Input defaultValue={game.betAmount} disabled />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
            <Button type="primary" shape="round" htmlType="submit">
              확인하기
            </Button>
          </Form.Item>
        </Form>
      </SubmitForm>
    </Container>
  );
}
