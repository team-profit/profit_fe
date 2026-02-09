import { createBrowserRouter } from 'react-router-dom';
import { HomePage, LoginPage, MainPage } from './pages';
import { AppLayout, PrivateLayout } from './layouts';

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
      {
        path: 'main',
        element: <PrivateLayout />,
        children: [
          {
            path: 'home',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);
