import Stack from '@mui/material/Stack';
import React from 'react';
import { Outlet } from 'react-router-dom';
import ControlledOpenSpeedDial from './ControlledOpenSpeedDial.jsx';
import MyHeader from './MyHeader.jsx';
import MySideNav from './MySideNav.jsx';


export default function Layout() {
  return (
    <Stack>
      <MyHeader />
      <MySideNav />
      <Outlet />
      <ControlledOpenSpeedDial />
    </Stack>
  );
}
