import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';

export default function NoticeAccordion({ isTeacher, notices }) {
  return (
    <>
      {notices.map((notice, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {notice.title}
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {notice.content}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined">수정</Button>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
