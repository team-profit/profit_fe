import styled from '@emotion/styled';
import { colors } from '../design-token';

interface IButtonType {
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
  width?: string;
  children: React.ReactNode;
  borderColor?: string;
}

export const LargeButton = ({
  onClick,
  backgroundColor = colors.blue[400],
  color = colors.gray[0],
  width,
  children,
  borderColor = 'transparent',
}: IButtonType) => {
  return (
    <LargeButtonWrapper
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      borderColor={borderColor}
    >
      {children}
    </LargeButtonWrapper>
  );
};

export const SmallButton = ({
  onClick,
  backgroundColor = colors.blue[400],
  color = colors.gray[0],
  width,
  children,
  borderColor = 'transparent',
}: IButtonType) => {
  return (
    <SmallButtonWrapper
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      width={width}
      borderColor={borderColor}
    >
      {children}
    </SmallButtonWrapper>
  );
};

const LargeButtonWrapper = styled.button<Omit<IButtonType, 'onClick'>>`
  width: ${({ width }) => width};
  padding: 14px 40px;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid ${({ borderColor }) => borderColor};
`;

const SmallButtonWrapper = styled.button<Omit<IButtonType, 'onClick'>>`
  width: ${({ width }) => width};
  padding: 4px 12px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 10px;
  font-weight: 400;
  border: 1px solid ${({ borderColor }) => borderColor};
`;
