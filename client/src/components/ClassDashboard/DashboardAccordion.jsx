import { React, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Button }  from '@mui/material';
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
          >
            {index + 1}. {curriculum.title}
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line', marginLeft:'10px' }}>
          {curriculum.content}
            {isTeacher&& (
              <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
                <Button variant="outlined" onClick={() => { setDeleteNotice(curriculum); setAlertOpen(true)}}>삭제</Button>
                <Button variant="outlined" onClick={()=>{setModalOpen(true); setTarget(curriculum);}}>수정</Button>
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
