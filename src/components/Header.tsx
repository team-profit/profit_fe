import styled from '@emotion/styled';
import { LOGO, ALARM } from '../assets';
import { colors, Flex } from '../design-token';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        paddingLeft="20px"
        paddingRight="20px"
        height="60px"
        width="100vw"
      >
        <Btn onClick={() => navigate('/main/home')}>
          <LOGO width={83} height={22} />
        </Btn>
        <Btn onClick={() => navigate('/main/notification')}>
          <ALARM />
        </Btn>
      </Flex>
    </HeaderWrapper>
  );
};

const Btn = styled.button`
  cursor: pointer;
  background-color: transparent;
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.gray[0]};
`;
