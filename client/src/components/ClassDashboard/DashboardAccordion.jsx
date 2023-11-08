import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';

export default function DashboardAccordion({ curriculums }) {
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
          <AccordionDetails>{curriculum.content}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
