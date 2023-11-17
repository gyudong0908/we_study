import NoticeAccordion from './NoticeAccordion';
import InputNotice from '../Input/InputNotice';
import axios from 'axios';
import { Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassNotice({ isTeacher }) {
  const [notices, setNotices] = useState([]);
  const {classId} = useParams();

  function getNotices(){
    axios.get(`http://localhost:8081/notices?classId=${classId}`,{ withCredentials: true }).then(data=>{
      setNotices(data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getNotices();
  },[])

  return (
    <>
      <InputNotice isTeacher={isTeacher} notices={notices} setNotices={setNotices} ></InputNotice>
        <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
          <Typography variant="h4" component="span" sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}}>
            공지사항
          </Typography>
        </Stack>
      <NoticeAccordion isTeacher={isTeacher} notices={notices} setNotices={setNotices} />
    </>
  );
}
