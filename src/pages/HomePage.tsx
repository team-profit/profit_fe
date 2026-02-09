import { useState } from 'react';
import { colors, Flex, Text } from '../design-token';
import { PostContent } from '../components';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const [datas, _] = useState<
    {
      id: number;
      place: string;
      time: { startTime: string; endTime: string };
    }[]
  >([
    {
      id: 1,
      place: '경주시장',
      time: { startTime: '10:00', endTime: '12:00' },
    },
  ]);

  const navigate = useNavigate();

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <Flex isColumn gap={20} paddingTop="26px" width="100%">
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text isSpan fontSize={16} fontWeight={400}>
          총{' '}
          <Text isSpan fontSize={16} fontWeight={600} color={colors.blue[800]}>
            {datas.length}건
          </Text>
        </Text>
        <Text isSpan fontSize={20} fontWeight={600} color={colors.gray[900]}>
          {month}
          <Text isSpan fontSize={16} fontWeight={400} color={colors.gray[900]}>
            월
          </Text>
          {date}
          <Text isSpan fontSize={16} fontWeight={400} color={colors.gray[900]}>
            일
          </Text>
        </Text>
      </Flex>
      <Flex width="100%" isColumn gap={12}>
        {datas.map((data) => (
          <PostContent
            onClick={() => navigate(`/main/detail/${data.id}`)}
            place={data.place}
            key={data.id}
            time={data.time}
          />
        ))}
      </Flex>
    </Flex>
  );
};
