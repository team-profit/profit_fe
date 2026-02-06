import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GlobalStyle } from './design-token';
import { LargeButton, SmallButton } from './components/Button';
import { PostContent } from './components/PostContent';
import { TabBar } from './components/TabBar';
import { CalendarContent } from './components/CalendarContent';
import { MapContent } from './components/MapContent';

export const App = () => {
  const a = {
    startTime: 'dddd',
    endTime: 'ddd',
  };
  return (
    <div>
      <RouterProvider router={router} />
      <LargeButton>dssd</LargeButton>
      <SmallButton>ddd</SmallButton>
      <GlobalStyle />
      <PostContent place={'sssd'} time={a} />
      <CalendarContent />
      <MapContent
        address="대전시장"
        detailAddress="대전광역시 소재구 소재용"
        postalAddress={234}
      />
    </div>
  );
};
