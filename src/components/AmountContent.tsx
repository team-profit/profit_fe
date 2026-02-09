import styled from '@emotion/styled';
import { colors, Flex, Text } from '../design-token';

interface IAmountContentType extends ContentType {
  subContent?: { title: string; amount: number }[];
}

interface ContentType {
  title: string;
  amount?: number;
  content?: string;
  isString?: boolean;
}

export const AmountContent = ({
  title,
  amount,
  subContent,
  isString = false,
  content,
}: IAmountContentType) => {
  return (
    <AmountWrapper>
      <Flex isColumn gap={8}>
        <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
          {title}
        </Text>
        <Text fontSize={20} fontWeight={600} color={colors.gray[1000]}>
          {isString ? content : `${amount}원`}
        </Text>
      </Flex>
      {subContent && (
        <Flex isColumn gap={8}>
          {subContent.map((data) => (
            <Content title={data.title} amount={data.amount} />
          ))}
        </Flex>
      )}
    </AmountWrapper>
  );
};

const Content = ({ amount, title }: ContentType) => {
  return (
    <ContentWrapper>
      <Text fontSize={10} fontWeight={600} color={colors.gray[800]}>
        {title}
      </Text>
      <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
        {amount}원
      </Text>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
`;

const AmountWrapper = styled.div`
  width: 100%;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;
