import { createBrowserRouter } from 'react-router-dom';
import { LoginPage, MainPage } from './pages';
import { AppLayout } from './layouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
