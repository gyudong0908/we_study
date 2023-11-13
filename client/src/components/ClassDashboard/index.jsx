import BasicAccordion from './DashboardAccordion';
import StudyProgress from './StudyProgress';
import { Stack, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import InputCurriculum from '../Input/InputCurriculum.jsx';
export default function ClassDashboard({ curriculums, isTeacher }) {
  return (
    <Stack>
      <InputCurriculum isTeacher={isTeacher} marginBottom={20}></InputCurriculum>
      <StudyProgress />
      <Typography variant="h4" component="span" sx={{mb:'2', fontWeight: 'bold', marginBottom:'15px', color:'#0091ea'}}>
        커리큘럼
      </Typography>
      <BasicAccordion curriculums={curriculums} />
    </Stack>
  );
}
