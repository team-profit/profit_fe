import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      navigate('/main/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

const Main = styled.main`
  width: 100%;
  padding: 0 28px 28px 28px;
`;
