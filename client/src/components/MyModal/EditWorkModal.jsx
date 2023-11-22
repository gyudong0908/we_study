import React from 'react';
import { Stack, Typography, Modal, Button, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

function EditWorkModal({ onClose, target, works, setWorks }) {
    const [editTitle, setEditTitle] = useState(target.title);
    const [editDescription, setEditDescription] = useState(target.description);
    const [editDueDateTime, setEditDueDateTime] = useState();
    console.log(target);
    
    const UpdateWork =()=>{
        const updateData = {
            title: editTitle,
            description: editDescription,
            dueDateTime: editDueDateTime.toISOString(), 
            updatedAt: new Date()
        }
      

        axios.put(`http://localhost:8081/work?workId=${target.id}`, updateData, { withCredentials: true }).then(() => {
        setWorks(works.map(curriculum => {
          return (
            { ...curriculum, Works: curriculum.Works.map(work => (work.id == target.id ? updateData : work)) }
          )}))
        })        
        .catch(err => {
            console.log(err);
        })
      }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'}>
            과제 수정
          </Typography>
            <Stack id="modal-modal-description">
              <Stack sx={{flexDirection:'row', mb:2, mt:3}}>
                <Stack sx={{mr:2, minWidth:140}}>
                  <Typography variant='h4'>{target.curriculumId}</Typography>
                </Stack>
                <Picker editDueDateTime={editDueDateTime} setEditDueDateTime={setEditDueDateTime}/>
              </Stack>
              <TextField
                id="inputWorkTitle"
                label='제목을 입력하세요.'
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt:3 }}
                required
                onChange={(e) => { setEditTitle(e.target.value); }}
                value={editTitle}
              />
              <TextField
                id="inputWorkDescription"
                label='세부 내용을 입력하세요.'
                variant="outlined"
                fullWidth
                multiline
                rows={8}
                sx={{ mt: 3 }}
                required
                onChange={(e) => { setEditDescription(e.target.value); }}
                value={editDescription}
              />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
              <Button variant="outlined" type="reset" onClick={onClose}>취소</Button>
              <Button variant="outlined" onClick={()=>{UpdateWork(); onClose();}}>저장</Button>
            </Stack>
          </Stack>
        </Modal>
    </div>
  );
}

function Picker({editDueDateTime, setEditDueDateTime}){
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack components='DateTimePicker'>
        <DateTimePicker onChange={(value)=>{setEditDueDateTime(value)}} value={editDueDateTime}/>
      </Stack>
    </LocalizationProvider>
  );
}

export default EditWorkModal;
