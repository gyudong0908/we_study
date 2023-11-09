import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Store from './reducer/store.js';
import {Provider} from 'react-redux'
import './index.css';

import '@fontsource/lobster/400.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Layout from './components/Layout';
import ClassPage, { classPageLoader } from './pages/ClassPage.jsx';
import MyPage from './pages/MyPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: 'classes/:classId',
        element: <ClassPage />,
        loader: classPageLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
