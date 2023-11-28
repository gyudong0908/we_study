import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';
// import EditWorkModal from '../MyModal/EditWorkModal';
import DeleteAlertModal from '../MyModal/DeleteAlertModal';
import axios from 'axios';

export default function QuizAccordion({ isTeacher, quizzes, setQuizzes }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState('');
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  // console.log('topicId: ',topicId);

  // useEffect(() => {

  //   console.log('assignments:', assignments);
  // }, [assignments]);

  // function onClickDelete(target) {
  //   axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/work?workId=${target.id}`, { withCredentials: true }).then(() => {
  //     const newWorks = works.map(curriculum => { return { ...curriculum, Works: curriculum.Works.filter(work => work.id !== target.id) } });
  //     setWorks(newWorks);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  return (
    <>
      {quizzes && quizzes.map((quiz, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`work-header-${index}`}
            sx={{ margin: '5px' }}
          >
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid item xs={9}>
                <Typography variant='h6' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{quiz.title}</Typography>
              </Grid>
              <Grid item xs={3} sx={{ paddingRight: '5px' }}>
                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'flex-end', whiteSpace: 'pre'  }}>{dayjs(quiz.createdAt).format('YYYY-MM-DD hh:mm A')}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', margin: '5px' }}>
            <Stack sx={{ mr: 2, ml: 2, mb: 4 }}>
              <Typography variant='subtitile1' sx={{ fontWeight: 'bold' }}>🔔 퀴즈 마감 기한 : {dayjs(quiz.dueDateTime).format('YYYY년 MM월 DD일 hh:mm A')}</Typography>
            </Stack>
            <Stack sx={{ mt: 2, mr: 2, ml: 2, mb: 6 }}>
              <Typography variant='body1' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{quiz.description}</Typography>
            </Stack>

            {isTeacher && (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '15px' }}>
                {/* <Link to={{
                  pathname: `/mypage/classes/${assignment.id}/worksforteacher`,
                }}> */}
                  <Button variant="outlined" size='large'>📝 퀴즈 수정하기</Button>
                {/* </Link> */}
                <Button variant="outlined" sx={{ width: '10%' }} onClick={()=>{setDeleteData(quizzes); setAlertOpen(true)}}>삭제</Button>
                <Button variant="outlined" onClick={() => { setModalOpen(true); setTarget(quiz); }} sx={{ width: '10%' }}>배포</Button>

              </Stack>
            )}
            {!isTeacher && (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '15px' }}>
                {/* <Link to={`/mypage/classes/${assignment.id}/worksforstudent`}> */}
                  <Button variant="outlined" size='large'>📝 퀴즈 응시하기</Button>
                {/* </Link> */}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
       ))}
      {/* {
        isModalOpen && (
          <EditWorkModal
            target={target}
            works={works}
            setWorks={setWorks}
            onClose={() => { setModalOpen(false) }} />
        )
      }
      {
        isAlertOpen && (
          <DeleteAlertModal
            onClose={() => { setAlertOpen(false) }}
            deleteData={deleteData}
            onClickDelete={onClickDelete}
          />
        )
      } */}
    </>
  );
}
