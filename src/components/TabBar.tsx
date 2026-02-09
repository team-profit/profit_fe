import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from '../design-token';
import { ADDPOST } from '../assets/ADDPOST';
import { HOME } from '../assets/HOME';
import { CALENDAR } from '../assets/CALENDAR';
import { MYPAGE } from '../assets/MYPAGE';
import { useLocation, useNavigate } from 'react-router-dom';

const navContent = [
  { Icon: ADDPOST, path: '/main/add/post' },
  { Icon: HOME, path: '/main/home' },
  { Icon: CALENDAR, path: '/main/calendar' },
  { Icon: MYPAGE, path: '/main/mypage' },
];

export const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavWrapper>
      {navContent.map(({ Icon, path }) => {
        const isActive = location.pathname === path;
        return (
          <Nav key={path} onClick={() => navigate(path)} isActive={isActive}>
            <IconWrapper isActive={isActive}>
              <Icon isNav={isActive} />
            </IconWrapper>
            {isActive && <ActiveIndicator />}
          </Nav>
        );
      })}
    </NavWrapper>
  );
};

const bounceIn = keyframes`
  0% {
    transform: scale(0.8) translateY(0);
  }
  50% {
    transform: scale(1.1) translateY(-4px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const Nav = styled.button<{ isActive: boolean }>`
  position: relative;
  background-color: transparent;
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  padding: 0;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.9);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) =>
      props.isActive ? colors.gray[100] : 'transparent'};
    transition: background-color 0.3s ease;
  }

  &:hover::before {
    background-color: ${colors.gray[50]};
  }

  &:active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${colors.gray[200]};
    animation: ${ripple} 0.6s ease-out;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.isActive ? bounceIn : 'none')} 0.5s
    cubic-bezier(0.2, 0.56, 0.2, 0.1);

  svg {
    transition: all 0.3s ease;
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -6px;
  width: 24px;
  height: 3px;
  background-color: ${colors.gray[900]};
  border-radius: 2px 2px 0 0;
  animation: ${slideUp} 0.3s ease-out;
`;

const NavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  z-index: 100;
`;
