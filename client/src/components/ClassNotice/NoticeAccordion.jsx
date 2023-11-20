import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function NoticeAccordion({ isTeacher, notices, setNotices }) {
  function onClickDelete(target){
    axios.delete(`http://localhost:8081/notice?noticeId=${target.id}`,{ withCredentials: true }).then(()=>{
      const newNotices = notices.filter(notice=>notice.id !==  target.id);
      setNotices(newNotices);  
    }).catch(err=>{
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
          >
            <Grid container spacing={0} sx={{ alignItems:'center'}}>
              <Grid item xs={6}>
                <Typography variant='h6'>{notice.title}</Typography>
              </Grid>
              <Grid item xs={6} sx={{paddingRight:'5px'}}>
                <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>{notice.createdAt}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {notice.content}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined" onClick={()=>{onClickDelete(notice)}}>삭제</Button>
                <Button variant="outlined">수정</Button>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
