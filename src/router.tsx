import { createBrowserRouter } from 'react-router-dom';
import {
  AddPostPage,
  EditPostPage,
  HomePage,
  LoginPage,
  MainPage,
  PostDetailPage,
} from './pages';
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
          {
            path: 'detail/:id',
            element: <PostDetailPage />,
          },
          {
            path: 'add/post',
            element: <AddPostPage />,
          },
          {
            path: 'edit/post/:id',
            element: <EditPostPage />,
          },
        ],
      },
    ],
  },
]);
