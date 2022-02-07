import React from 'react';
import { Spin, Space } from 'antd';

export default function Loading() {
  return (
    <>
      <h3>참가자를 기다리는 중입니다.</h3>
      <br />
      <br />
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </>
  );
}
