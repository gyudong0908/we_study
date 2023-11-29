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
import ClassPage from './pages/ClassPage.jsx';
import MyPage from './pages/MyPage.jsx';
import SettingPage from './pages/SettingPage.jsx';
import RankPage from './pages/RankPage.jsx';
import CalenderPage from './pages/CalenderPage.jsx';
import WorksForTeacher from './pages/Works/WorksForTeacher.jsx';
import WorksForStudent from './pages/Works/WorksForStudent.jsx';
import WorkDetailForStudent from './pages/Works/WorkDetailForStudent.jsx';
import WorkDetailForTeacher from './pages/Works/WorkDetailForTeacher.jsx';
import QuizPage from './pages/Quizzes/QuizPage.jsx';

import { initializeUserData } from './reducer/userdata.js';

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
      },
      {
        path: 'classes/:workId/worksforteacher',
        element: <WorksForTeacher />,
      },
      {
        path: 'classes/:workId/worksforstudent',
        element: <WorksForStudent />,
      },
      {
        path: 'classes/:submitId/workdetail/student',
        element: <WorkDetailForStudent />,
      },
      {
        path: 'classes/:submitId/workdetail/teacher',
        element: <WorkDetailForTeacher />,
      },
      {
        path: 'setting',
        element: <SettingPage />,
      },
      {
        path: 'rank',
        element: <RankPage />,
      },
      {
        path: 'calender',
        element: <CalenderPage />,
      },
      {
        path: 'quiz/:quizId',
        element: <QuizPage />,
      },
    ],
  },
]);


Store.dispatch(initializeUserData());

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
);
