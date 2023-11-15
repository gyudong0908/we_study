import { Stack, Typography } from '@mui/material';
import GradeTable from './GradeTable';

export default function ClassGrade({ isTeacher }) {
    return (
      <Stack isTeacher={isTeacher}>
        <Typography variant="h4" component="span" sx={{mb:2, fontWeight: 'bold', color:'#0091ea'}}>
          학생 성적 관리
        </Typography>
        <GradeTable />
      </Stack>
    );
  }