import QuizModal from '../MyModal/QuizModal';
import QuizAccordion from './QuizAccordion';
import { Typography, Stack, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ClassQuiz({ isTeacher }) {
  const [quizzes, setQuizzes] = useState([]);
  const dummyData = [
    {
      id: 1,
      title: 'Quiz 1',
      createdAt: '2023-01-01T12:00:00Z',
      dueDateTime: '2023-01-10T23:59:59Z',
      description: 'This is the description for Quiz 1',
    },
    {
      id: 2,
      title: 'Quiz 2',
      createdAt: '2023-02-01T12:00:00Z',
      dueDateTime: '2023-02-10T23:59:59Z',
      description: 'This is the description for Quiz 2',
    },
  ];

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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {
        isTeacher && (
          <Stack sx={{justifyContent:'center', alignItems:'center', mt:2, mb:5}}>
            <Button size="medium" variant="outlined" onClick={handleOpenModal}
              sx={{padding:'20px', maxWidth:'20rem', borderRadius:'20px', cursor:'pointer'}}>
              <Typography variant='h5'>✍️ 퀴즈 만들기</Typography>
            </Button>
          </Stack>
        )
      }
      {
        isModalOpen && <QuizModal open={isModalOpen} handleClose={handleCloseModal} />
      }
        <Stack sx={{ mb: 5 }}>
          <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
            <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea', wordBreak: 'keep-all', wordWrap: 'break-word' }}>
              퀴즈 목록
            </Typography>
          </Stack>
          {
            dummyData.map((quiz, index)=>(
              <QuizAccordion key={quiz.id} isTeacher={isTeacher} quizzes={dummyData} setQuizzes={() => {}} />
            ))
          }
        </Stack>
    </>
  );
}
