import NoticeAccordion from './NoticeAccordion';
import InputNotice from '../Input/InputNotice';
import axios from 'axios';
import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassNotice({ isTeacher }) {
  const [notices, setNotices] = useState([]);
  const { classId } = useParams();

  function getNotices() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/notices?classId=${classId}`, { withCredentials: true }).then(data => {
      setNotices(data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  console.log(notices)
  useEffect(() => {
    getNotices();
  }, [])

  return (
    <>
      {
        isTeacher && (
          <InputNotice isTeacher={isTeacher} notices={notices} setNotices={setNotices} ></InputNotice>
        )
      }
      <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
        <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>
          공지사항
        </Typography>
      </Stack>
      <NoticeAccordion isTeacher={isTeacher} notices={notices} setNotices={setNotices} />
    </>
  );
}
