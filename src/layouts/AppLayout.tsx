import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

export const AppLayout = () => {
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
