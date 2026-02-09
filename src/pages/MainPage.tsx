import { LOGO } from '../assets';
// import { CHATICON } from '../assets';
import { LargeButton } from '../components';
import { Flex } from '../design-token';
import styled from '@emotion/styled';

export const MainPage = () => {
  return (
    <Flex justifyContent="center" isColumn alignItems="center" height="100vh">
      <LOGO />
      {/* <BtnWrapper>
        <LargeButton
          width="100%"
          color={colors.brown[100]}
          backgroundColor={colors.yellow[200]}
        >
          <CHATICON />
          카카오로 로그인하기
        </LargeButton>
      </BtnWrapper> */}
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
  padding: 0 28px;
`;
