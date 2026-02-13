import styled from '@emotion/styled';
import { colors, Flex, Text } from '../design-token';
import { SmallButton } from './Button';
import React, { useRef } from 'react';

interface IModalType {
  title: string;
  subTitle: string;
  btnTitle?: string;
  onClick?: () => void;
  isError?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

export const Modal = ({
  title,
  subTitle,
  btnTitle = '삭제하기',
  onClick,
  isError,
  setIsOpen,
  isOpen,
}: IModalType) => {
  const backRef = useRef<HTMLDivElement | null>(null);

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <Background onClick={handleBackClick} ref={backRef}>
        <ModalWrapper>
          <Flex isColumn gap={4}>
            <Text fontSize={16} fontWeight={600}>
              {title}
            </Text>
            <Text fontSize={12} fontWeight={400} color={colors.gray[400]}>
              {subTitle}
            </Text>
          </Flex>
          <Flex width="100%" gap={8} justifyContent="end" alignItems="center">
            <SmallButton
              onClick={onClick}
              backgroundColor={isError ? colors.red[400] : colors.blue[500]}
              color={colors.gray[0]}
            >
              {btnTitle}
            </SmallButton>
            <SmallButton
              backgroundColor={colors.gray[50]}
              color={colors.gray[700]}
              borderColor={colors.gray[100]}
              onClick={() => setIsOpen(false)}
            >
              이전으로
            </SmallButton>
          </Flex>
        </ModalWrapper>
      </Background>
    )
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  max-width: 278px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${colors.gray[0]};
  border: 1px solid ${colors.gray[50]};
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(94, 94, 94, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
