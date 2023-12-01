import { Stack, Typography } from '@mui/material';
import WorkGradeTable from './WorkGradeTable';
import QuizGradeTable from './QuizGradeTable';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ClassGrade({ isTeacher }) {
  const { classId } = useParams();
  const [curriculums, setCurriculums] = useState([]);
  function getSubmitData() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class/submits?classId=${classId}`, { withCredentials: true }).then(data => {
      console.log(data.data.Curriculums)
      setCurriculums(data.data.Curriculums);
    })
  }
  function getQuizGradeData() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/student/quiz/grade?classId=${classId}`, { withCredentials: true }).then(data => {
      console.log(data.data)
    })
  }

  useEffect(() => {
    getSubmitData();
    getQuizGradeData();
  }, [])
  return (
    <Stack isTeacher={isTeacher}>
      <Stack sx={{ borderBottom: '1.5px solid black', mb: 3,}}>
        <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>
          학생 성적 관리
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <WorkGradeTable curriculums={curriculums} setCurriculums={setCurriculums} />
        <QuizGradeTable curriculums={curriculums} setCurriculums={setCurriculums} />
      </Stack>
    </Stack>
  );
}