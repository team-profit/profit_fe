import { colors, Flex, Text } from '../design-token';
import { PostContent } from '../components';
import { useNavigate } from 'react-router-dom';
import { useTodayListGet } from '../apis';

export const HomePage = () => {
  const navigate = useNavigate();

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const { data, isLoading } = useTodayListGet();

  if (isLoading) return <div>로딩중...</div>;

  const todayList = data?.todayList ?? [];

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <Flex isColumn gap={20} paddingTop="26px" width="100%">
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text isSpan fontSize={16} fontWeight={400}>
          총{' '}
          <Text isSpan fontSize={16} fontWeight={600} color={colors.blue[800]}>
            {todayList.length}건
          </Text>
        </Text>

        <Text isSpan fontSize={20} fontWeight={600} color={colors.gray[900]}>
          {month}
          <Text isSpan fontSize={16} fontWeight={400}>
            월
          </Text>
          {date}
          <Text isSpan fontSize={16} fontWeight={400}>
            일
          </Text>
        </Text>
      </Flex>

      <Flex width="100%" isColumn gap={12}>
        {todayList.map((item) => (
          <PostContent
            key={item.deliveryId}
            onClick={() => navigate(`/main/detail/${item.deliveryId}`)}
            place={item.place}
            time={item.time}
          />
        ))}
      </Flex>
    </Flex>
  );
};
