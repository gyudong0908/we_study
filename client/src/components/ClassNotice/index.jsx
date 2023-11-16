import NoticeAccordion from './NoticeAccordion';
import InputNotice from '../Input/InputNotice';
import { Typography, Stack } from '@mui/material';

export default function ClassNotice({ isTeacher }) {
  const notices = [{title:'공지사항 제목', content:'공지사항 내용'}]
  return (
    <>
      <InputNotice isTeacher={isTeacher}></InputNotice>
        <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
          <Typography variant="h4" component="span" sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}}>
            공지사항
          </Typography>
        </Stack>
      <NoticeAccordion isTeacher={isTeacher} notices={notices} />
    </>
  );
}
