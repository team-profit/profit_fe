import { PLACE } from '../assets';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

interface IMapContent {
  address: string;
  detailAddress: string;
  postalAddress: string;
  label?: string;
}

export const MapContent = ({
  address,
  detailAddress,
  postalAddress,
  label,
}: IMapContent) => {
  return (
    <Flex isColumn gap={8} width="100%">
      <Text fontSize={12} fontWeight={400}>
        {label}
      </Text>
      <ContentWrapper>
        <Flex gap={8} alignItems="center">
          <PLACE />
          <Text fontSize={12} fontWeight={600} color={colors.gray[900]}>
            {address} ({postalAddress})
          </Text>
        </Flex>
        <Text fontSize={10} fontWeight={400} color={colors.gray[800]}>
          {detailAddress}
        </Text>
      </ContentWrapper>
    </Flex>
  );
};

const ContentWrapper = styled.div`
  width: 100%;
  padding: 12px 8px;
  border-radius: 16px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[0]};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
