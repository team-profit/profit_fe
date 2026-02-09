import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

interface ISubTitleFieldType {
  title: string;
}

export const SubTitleField = ({ title }: ISubTitleFieldType) => {
  return (
    <Flex isColumn gap={8} width="100%">
      <Text fontSize={16} fontWeight={600} color={colors.gray[900]}>
        {title}
      </Text>
      <Line />
    </Flex>
  );
};

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[100]};
`;
