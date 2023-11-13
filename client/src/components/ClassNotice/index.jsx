import NoticeAccordion from './NoticeAccordion';
import InputNotice from '../Input/InputNotice';
import {Typography, Stack} from '@mui/material';

export default function ClassNotice({ isTeacher, notices }) {
  return (
    <>
      <InputNotice isTeacher={isTeacher}></InputNotice>
      <Typography variant="h4" component="span" sx={{mb:'2', fontWeight: 'bold', marginBottom:'15px', color:'#0091ea'}}>
        공지사항
      </Typography>
      <NoticeAccordion notices={notices} />
    </>
  );
}
