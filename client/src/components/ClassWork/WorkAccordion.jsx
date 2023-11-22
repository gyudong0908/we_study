import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary, Stack, Button } from '@mui/material';
import EditWorkModal from '../MyModal/EditWorkModal';
import DeleteAlertModal from '../MyModal/DeleteAlertModal';
import axios from 'axios';

export default function WorkAccordion({ isTeacher, assignments, topicId, works, setWorks }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState('');
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  useEffect(() => {
    // filteredAssignments 배열 내의 모든 객체의 topicId를 출력
    console.log('assignments:', assignments);
  }, [assignments]);

  function onClickDelete(target) {
    axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/work?workId=${target.id}`, { withCredentials: true }).then(() => {
      const newWorks = works.map(curriculum => { return { ...curriculum, Works: curriculum.Works.filter(work => work.id !== target.id) } });
      setWorks(newWorks);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <>
      {assignments && assignments.map((assignment, index) => (
        <Accordion key={index} >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`work-header-${index}`}
            sx={{ margin: '5px' }}
          >
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid item xs={10}>
                <Typography variant='h6' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{assignment.title}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ paddingRight: '5px' }}>
                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dayjs(assignment.createdAt).format('YYYY년MM월DD일 hh:mm A')}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', margin: '5px' }}>
            <Stack sx={{ mr: 2, ml: 2, mb: 4 }}>
              <Typography variant='subtitile1' sx={{ fontWeight: 'bold' }}>🔔 과제 마감 기한 : {dayjs(assignment.dueDateTime).format('YYYY년 MM월 DD일 hh:mm A')}</Typography>
            </Stack>
            <Stack sx={{ mt: 2, mr: 2, ml: 2, mb: 6 }}>
              <Typography variant='body1' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{assignment.description}</Typography>
            </Stack>

            {isTeacher && (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '15px' }}>
                <Link to={{
                  pathname: `/mypage/classes/${assignment.id}/worksforteacher`,
                }}>
                  <Button variant="outlined" size='large'>📑 제출된 과제 확인하기</Button>
                </Link>
                <Button variant="outlined" sx={{ width: '10%' }}>삭제</Button>
                <Button variant="outlined" onClick={() => { setModalOpen(true); setTarget(assignment); }} sx={{ width: '10%' }}>수정</Button>

              </Stack>
            )}
            {!isTeacher && (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '15px' }}>
                <Link to={`/mypage/classes/${assignment.id}/worksforstudent`}>
                  <Button variant="outlined" size='large'>📑 과제 제출하기</Button>
                </Link>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      {
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
      }
    </>
  );
}
