import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { GlobalStyle } from './design-token';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false}
        newestOnTop={false}
        theme="colored"
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <GlobalStyle />
    </div>
  );
};
