import axios from 'axios';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';

export default function WorkAccordion({ isTeacher, works, setWorks, assignments}) {
  console.log('isTeacher:', isTeacher);
  return (
    <>
      {assignments.map((assignment, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="work-header"
          >
            <Grid container spacing={0} sx={{ alignItems:'center'}}>
              <Grid item xs={6}>
                <Typography variant='h6'>{assignment.title}</Typography>
              </Grid>
              <Grid item xs={6} sx={{paddingRight:'5px'}}>
                <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>2023년 11월 16일</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {assignment.content}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Link to="/mypage/classes/:classId/worksforteacher">
                  <Button variant="outlined" >📎 제출된 과제 확인하기</Button>
                </Link>
                <Button variant="outlined">삭제</Button>
                <Button variant="outlined">수정</Button>
              </Stack>
            )}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Link to="/mypage/classes/:classId/worksforstudent">
                  <Button variant="outlined">📎 과제 제출하기</Button>
                </Link>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
