import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button, Typography } from '@mui/material';

export default function NoticeAccordion({ isTeacher, notices }) {
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
                <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>2023년 11월 16일</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {notice.content}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined">삭제</Button>
                <Button variant="outlined">수정</Button>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
