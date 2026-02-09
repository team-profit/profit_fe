import { useState } from 'react';
import { LOGO } from '../assets';
import { Inputs, LargeButton } from '../components';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

export const LoginPage = () => {
  const [datas, setDatas] = useState<{ id: string; password: string }>({
    id: '',
    password: '',
  });

  const onChange = (key: 'id' | 'password', value: string) => {
    setDatas((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <Flex alignItems="center" paddingTop="78px" isColumn gap={200} width="100%">
      <Flex isColumn gap={98} width="100%">
        <Flex isColumn gap={20} width="100%">
          <Flex gap={8} alignItems="end" width="100%">
            <LOGO width={103} height={27} />
            <Text fontSize={24} fontWeight={700}>
              로그인
            </Text>
          </Flex>
          <Text fontSize={20} fontWeight={400} color={colors.gray[800]}>
            똑똑한 수익 관리를 시작하세요
          </Text>
        </Flex>
        <Flex isColumn gap={32} width="100%">
          <Inputs
            onChange={(value) => onChange('id', value)}
            placeholder="아이디를 입력하세요"
            label="아이디"
            value={datas.id}
          />
          <Inputs
            onChange={(value) => onChange('password', value)}
            value={datas.password}
            placeholder="비밀번호를 입력하세요"
            label="비밀번호"
          />
        </Flex>
      </Flex>
      <BtnWrapper>
        <LargeButton width="100%">로그인</LargeButton>
      </BtnWrapper>
    </Flex>
  );
};

const BtnWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  position: fixed;
  bottom: 95px;
  left: 0;
  padding: 0px 28px;
`;
