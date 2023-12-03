import QuizModal from '../MyModal/QuizModal';
import QuizAccordion from './QuizAccordion';
import { Typography, Stack, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export default function ClassQuiz({ isTeacher }) {
  const [quizzes, setQuizzes] = useState([]);
  const { classId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitQuizzes, setSubmitQuizzes] = useState([]);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function createQuiz(target) {
    axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?classId=${classId}`, target, { withCredentials: true }).then((response) => {
      setQuizzes([...quizzes, response.data]);
      // 새 창 열기
      const newWindow = window.open(`http://localhost:5173/mypage/quiz/${response.data.id}`, '_blank');
      if (newWindow) {
        // 새 창이 정상적으로 열렸을 때 처리
        // 모달 닫기
        handleCloseModal();
      } else {
        // 새 창이 차단되거나 열리지 않았을 때 처리
        console.error('새 창 열기 실패');
      }
    }).catch(err => {
      console.log(err);
    })
  }

  function getQuizzes() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quizs?classId=${classId}`, { withCredentials: true }).then(response => {
      setQuizzes(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  function editQuiz(quizId, target) {
    axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?quizId=${quizId}`, target, { withCredentials: true }).then(() => {
      const newQuizzes = quizzes.map(quiz => (quiz.id === quizId ? { ...quiz, ...target } : quiz));
      setQuizzes(newQuizzes);
    }).catch(err => {
      console.log(err);
    })
  }

  function onDelete(target) {
    axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?quizId=${target.id}`, { withCredentials: true }).then(() => {
      setQuizzes(quizzes.filter(quiz => quiz.id !== target.id));
    }).catch(err => {
      console.log(err);
    })
  }
  function getMySubmitQuiz() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quizzes/user/submit?classId=${classId}`, { withCredentials: true }).then((response) => {
      setSubmitQuizzes(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getQuizzes();
    if (!isTeacher) {
      getMySubmitQuiz();
    }
  }, [])
  return (
    <>
      {
        isTeacher && (
          <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center', mt: 2, mb: 5 }} spacing={2}>
            <Button size="medium" variant="outlined" onClick={handleOpenModal}
              sx={{ padding: '20px', maxWidth: '20rem', borderRadius: '15px', cursor: 'pointer' }}>
              <Typography variant='h5'>✍️ 퀴즈 만들기</Typography>
            </Button>
            <Button size="medium" variant="outlined" onClick={() => { navigate(`../quiz/results/${classId}`) }}
              sx={{ padding: '20px', maxWidth: '20rem', borderRadius: '15px', cursor: 'pointer' }}>
              <Typography variant='h5'>✍️ 퀴즈 목록보기</Typography>
            </Button>
          </Stack>
        )
      }
      {
        isModalOpen && <QuizModal open={isModalOpen} handleClose={handleCloseModal} createQuiz={createQuiz} />
      }
      <Stack sx={{ mb: 5 }}>
        <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
          <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea', wordBreak: 'keep-all', wordWrap: 'break-word' }}>
            퀴즈 목록
          </Typography>
        </Stack>
        {
          quizzes.map((quiz, index) => (
            <QuizAccordion key={quiz.id} isTeacher={isTeacher} quiz={quiz} editQuiz={editQuiz} onDelete={onDelete} submitQuizzes={submitQuizzes} />
          ))
        }
      </Stack>
    </>
  );
}
