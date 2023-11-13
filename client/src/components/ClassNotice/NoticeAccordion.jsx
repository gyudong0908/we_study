import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import InputNotice from '../Input/InputNotice.jsx';

export default function NoticeAccordion({ isTeacher, notices }) {
  return (
    <>
    <InputNotice isTeacher={isTeacher}></InputNotice>
      {notices.map((notice, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {notice.title}
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {notice.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
