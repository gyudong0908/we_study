import BasicAccordion from './DashboardAccordion';
import { Stack, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import InputCurriculum from '../Input/InputCurriculum.jsx';
export default function ClassDashboard({ curriculums, isTeacher }) {
  return (
    <Stack>
      <InputCurriculum isTeacher={isTeacher}></InputCurriculum>
      <Typography variant="h5" component="span" mb={2}>
        학습 진행 상황
      </Typography>
      <Typography variant="h5" component="span" mb={2}>
        커리큘럼
      </Typography>
      <BasicAccordion curriculums={curriculums} />
    </Stack>
  );
}
