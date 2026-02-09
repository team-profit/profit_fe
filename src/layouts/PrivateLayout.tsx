import { Outlet } from 'react-router-dom';
import { TabBar, Header } from '../components';
import styled from '@emotion/styled';

export const PrivateLayout = () => {
  return (
    <div>
      <Header />
      <SubMain>
        <Outlet />
      </SubMain>
      <TabBar />
    </div>
  );
};

const SubMain = styled.article`
  margin: 60px 0;
  width: 100%;
`;
