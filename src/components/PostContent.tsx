import styled from '@emotion/styled';
import { colors, Flex, Text } from '../design-token';
import { ERROR, SUCCESS } from '../assets';
import { formatDateTimeDisplay } from '../hooks';

interface PostContentType {
  place: string;
  time: { startTime: string; endTime: string | null };
  onClick?: () => void;
}

export const PostContent = ({ onClick, place, time }: PostContentType) => {
  const formattedStart = formatDateTimeDisplay(time.startTime);
  const formattedEnd = time.endTime
    ? formatDateTimeDisplay(time.endTime)
    : '진행중';

  return (
    <PostWrapper onClick={onClick}>
      <Flex isColumn gap={4}>
        <Text fontSize={16} fontWeight={600} color={colors.gray[1000]}>
          {place}
        </Text>
        <Text fontSize={12} fontWeight={400} color={colors.gray[600]}>
          {formattedStart} ~ {formattedEnd}
        </Text>
      </Flex>

      {formattedEnd === "진행중" ? <ERROR /> : <SUCCESS />}
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 20px 18px;
  border-radius: 12px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;
