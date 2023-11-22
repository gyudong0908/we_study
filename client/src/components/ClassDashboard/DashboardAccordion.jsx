import { React, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Button, Typography }  from '@mui/material';
import EditCurriculumModal from '../MyModal/EditCurriculumModal';
import DeleteAlertModal from '../MyModal/DeleteAlertModal';
import axios from 'axios';

export default function DashboardAccordion({ isTeacher, curriculums, setCurriculums }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState('');
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState({});

  function onClickDelete(target) {
    axios.delete(`http://localhost:8081/curriculum?curriculumId=${target.id}`, { withCredentials: true }).then(() => {
      const newCurriculums = curriculums.filter(curriculum => curriculum.id !== target.id);
      setCurriculums(newCurriculums);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      {curriculums.map((curriculum, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{margin:'5px'}}
          >
            <Stack sx={{wordBreak:'keep-all', wordWrap:'break-word'}}>
              <Typography variant='h6'>{index + 1}. {curriculum.title}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', mr:'5px', ml:'5px', mb:'5px'}}>
            <Stack sx={{mr:2, ml:2, mb:6}}>
              <Typography variant='body1'> {curriculum.content}</Typography>
            </Stack>
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined" onClick={() => { setDeleteNotice(curriculum); setAlertOpen(true)}} sx={{width:'10%'}}>삭제</Button>
                <Button variant="outlined" onClick={()=>{setModalOpen(true); setTarget(curriculum);}} sx={{width:'10%'}}>수정</Button>
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      {
        isAlertOpen &&(
          <DeleteAlertModal deleteNotice={deleteNotice} onClose={()=>setAlertOpen(false)} onClickDelete={onClickDelete} />
        )
      }
      {
        isModalOpen && (
          <EditCurriculumModal
            target={target}
            curriculums={curriculums}
            setCurriculums={setCurriculums}
            onClose={()=>{setModalOpen(false)}} />
        )
      }
    </div>
  );
}
