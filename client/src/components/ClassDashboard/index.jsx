import BasicAccordion from './DashboardAccordion';
import StudyProgress from './StudyProgress';
import { Stack, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button } from '@mui/material';
import InputCurriculum from '../Input/InputCurriculum.jsx';
import PrivateProgress from './PrivateProgress.jsx';
export default function ClassDashboard({ curriculums, isTeacher }) {
  return (
    <Stack>
      <InputCurriculum isTeacher={isTeacher} marginBottom={20}></InputCurriculum>
      <PrivateProgress />
      <StudyProgress />
      <Typography variant="h4" component="span" sx={{mb:2, fontWeight: 'bold', color:'#0091ea'}}>
        커리큘럼
      </Typography>
      <BasicAccordion isTeacher={isTeacher} curriculums={curriculums} />
    </Stack>
  );
}
