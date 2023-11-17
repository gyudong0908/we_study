import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Button }  from '@mui/material';


export default function DashboardAccordion({ isTeacher, curriculums }) {
  return (
    <div>
      {curriculums.map((curriculum, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {index + 1}. {curriculum.title}
          </AccordionSummary>
          <AccordionDetails>
          {curriculum.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
            🔹 {line}
            <br />
            </React.Fragment>
          ))}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined">수정</Button>
              </Stack>
            )}
          </AccordionDetails>
          
        </Accordion>
      ))}
    </div>
  );
}
