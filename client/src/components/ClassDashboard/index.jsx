import { Stack, Typography } from '@mui/material';
import BasicAccordion from './DashboardAccordion';

export default function ClassDashboard({ curriculums }) {
  return (
    <Stack>
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
