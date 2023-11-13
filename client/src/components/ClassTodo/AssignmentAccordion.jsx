import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

export default function AssignmentAccordion({ assignments }) {
  return (
    <>
      {assignments.map((assignment, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {assignment.title}
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            {assignment.content}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
