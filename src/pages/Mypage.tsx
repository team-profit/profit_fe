import { useState } from 'react';
import { colors, Flex, Text } from '../design-token';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Mypage = () => {
  const [datas] = useState<{
    name: string;
    email: string;
  }>({
    name: import.meta.env.VITE_NAME,
    email: import.meta.env.VITE_EMAIL,
  });

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });

    navigate('/');
  };
  return (
    <Flex
      height="80vh"
      isColumn
      justifyContent="space-between"
      paddingTop="18px"
    >
      <Flex isColumn gap={12} width="100%">
        <Flex isColumn gap={4} width="100%">
          <Text fontSize={20} fontWeight={600}>
            {datas.name} 기사님
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            {datas.email}
          </Text>
        </Flex>
      </Flex>

      <Flex gap={16} width="100%" justifyContent="center" alignItems="center">
        <Text
          isCursor
          fontSize={16}
          fontWeight={400}
          color={colors.gray[600]}
          onClick={handleLogoutClick}
        >
          로그아웃
        </Text>

        <Text isCursor fontSize={16} fontWeight={400} color={colors.gray[600]}>
          회원탈퇴
        </Text>
      </Flex>
    </Flex>
  );
};
