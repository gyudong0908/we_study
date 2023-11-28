
import QuizAccordion from './QuizAccordion';
import { Typography, Stack, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ClassQuiz({ isTeacher }) {
  const [quizzes, setQuizzes] = useState([]);
  // const { classId } = useParams();

  // function getQuizzes() {
  //   axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/curriculums/work?classId=${classId}`, { withCredentials: true }).then(data => {
  //     setQuizzes(data.data);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }
  // console.log(works);

  // useEffect(() => {
  //   getQuizzes();
  // }, [classId])
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {
        isTeacher && (
          <Stack sx={{justifyContent:'center', alignItems:'center', mb:5}}>
            <Button size="medium" variant="outlined" sx={{padding:'20px', maxWidth:'20rem', borderRadius:'18px', cursor:'pointer'}}>
              <Typography variant='h5'>📝 퀴즈 만들기</Typography>
            </Button>
          </Stack>
          // {
          //   isModalOpen && <CreateQuizModal open={handleOpenModal} handleClose={handleCloseModal} />
          // }
        )
      }
        <Stack sx={{ mb: 5 }}>
          <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
            <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea', wordBreak: 'keep-all', wordWrap: 'break-word' }}>
              퀴즈 목록
            </Typography>
          </Stack>
          {/* <WorkAccordion isTeacher={isTeacher} works={works} setWorks={setWorks} assignments={topic.Works} topicId={topic.id} /> */}
        </Stack>
    </>
  );
}
