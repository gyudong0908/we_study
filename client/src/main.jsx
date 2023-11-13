import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Store from './reducer/store.js';
import { Provider } from 'react-redux'
import './index.css';

import '@fontsource/lobster/400.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LandingPage from './pages/LandingPage.jsx';
import Layout from './components/Layout';
import ClassPage, { classPageLoader } from './pages/ClassPage.jsx';
import MyPage from './pages/MyPage.jsx';
import SettingPage from './pages/SettingPage.jsx';
import RankPage from './pages/RankPage.jsx';
import { initializeUserData } from './reducer/userdata.js';


import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/mypage',
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
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'rank',
        element: <RankPage />,
      },
    ],
  },
]);
Store.dispatch(initializeUserData());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
