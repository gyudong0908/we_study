import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import EditNoticeModal from '../MyModal/EditNoticeModal';
import DeleteAlertModal from '../MyModal/DeleteAlertModal';


export default function NoticeAccordion({ isTeacher, notices, setNotices }) {
  const [deleteNotice, setDeleteNotice] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState('');
  const [isAlertOpen, setAlertOpen] = useState(false);

  function onClickDelete(target) {
    axios.delete(`http://localhost:8081/notice?noticeId=${target.id}`, { withCredentials: true }).then(() => {
      const newNotices = notices.filter(notice => notice.id !== target.id);
      setNotices(newNotices);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      {notices.map((notice, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="notice-header"
            sx={{margin:'5px'}}
          >
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid item xs={10}>
                <Typography variant='h6' sx={{wordBreak:'keep-all', wordWrap:'break-word'}}>{notice.title}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ paddingRight: '5px' }}>
                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dayjs(notice.updatedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', margin:'5px'}}>
            <Stack sx={{mr:2, ml:2, mb:6}}>
              <Typography sx={{ wordBreak:'keep-all', wordWrap:'break-word', }}>{notice.content}</Typography>
            </Stack>
              {isTeacher && (
                <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '15px' }}>
                  <Button variant="outlined" onClick={() => { setDeleteNotice(notice); setAlertOpen(true)}}>삭제</Button>
                  <Button variant="outlined" onClick={()=> {setModalOpen(true); setTarget(notice);}}>수정</Button>
                </Stack>
              )}
           
          </AccordionDetails>
        </Accordion>
      ))}
      {
        isAlertOpen &&(
          <DeleteAlertModal deleteNotice={deleteNotice} onClose={()=>setAlertOpen(false)} onClickDelete={onClickDelete} />
      )
      }
      
      {
        isModalOpen && (
          <EditNoticeModal target={target} notices={notices} setNotices={setNotices} onClose={()=>setModalOpen(false)} />
        )
      }
    </>
  );
}
