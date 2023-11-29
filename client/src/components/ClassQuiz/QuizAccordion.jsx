import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';
import DeleteAlertModal from '../MyModal/DeleteAlertModal';
import EditQuizModal from '../MyModal/EditQuizModal';

export default function QuizAccordion({ isTeacher, quiz, editQuiz, onDelete}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);

  return (
    <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
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
                  <Button variant="outlined" size='large' onClick={()=>{window.open(`http://localhost:5173/mypage/quiz/${quiz.id}`, '_blank');}}>📝 퀴즈 수정하기</Button>
                {/* </Link> */}
                <Button variant="outlined" sx={{ width: '10%' }} onClick={()=>{setAlertOpen(true)}}>삭제</Button>
                <Button variant="outlined" sx={{ width: '10%' }} onClick={()=>{setModalOpen(true)}}>진짜 퀴즈 수정</Button>
                { !quiz.depoly &&(
                  <Button variant="outlined" onClick={() => { editQuiz(quiz.id, {depoly: true});}} sx={{ width: '10%' }}>배포</Button>
                )}

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
        {
          isAlertOpen && (
            <DeleteAlertModal 
              onClose={()=>{setAlertOpen(false)}}
              deleteData={quiz}
              onClickDelete = {onDelete}
            />
          )
        }
        {
          isModalOpen &&(
            <EditQuizModal 
              open = {isModalOpen}
              handleClose = {()=>{setModalOpen(false)}}
              quiz = {quiz}
              editQuiz= {editQuiz}
              />
          )
        }
    </>
  );
}
