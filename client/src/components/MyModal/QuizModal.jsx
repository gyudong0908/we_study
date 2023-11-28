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

function CreateQuizModal({open, handleClose}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');

  function createQuiz() {
    if (title !== '' && dueDateTime !== '') {
      const data = {
        title: title,
        description: description,
        dueDateTime: dueDateTime.toISOString(),
      }

    //   axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/class`, data, { withCredentials: true }).then((response) => {
    //     dispatch(setClassCards([response.data]));
    //   }).catch(err => {
    //     console.log(err);
    //   })

     // 새 창 열기
     const newWindow = window.open('http://localhost:5173/mypage/quiz', '_blank');
     if (newWindow) {
       // 새 창이 정상적으로 열렸을 때 처리
       // 모달 닫기
       handleClose();
     } else {
       // 새 창이 차단되거나 열리지 않았을 때 처리
       console.error('새 창 열기 실패');
     }

    }
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{textAlign:'center',}}>
            퀴즈 만들기
          </Typography>
          <Stack id="modal-modal-description">
            <TextField
              id="inputWorkTitle"
              label='퀴즈 제목을 입력하세요.'
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 3 }}
              required
              onChange={(e) => { setTitle(e.target.value); }}
              value={title}
            />
            <TextField
              id="inputWorkDescription"
              label='퀴즈 관련 설명을 입력하세요.'
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mt: 2 }}
              required
              onChange={(e) => { setDescription(e.target.value); }}
              value={description}
            />
          </Stack>
          <Stack sx={{ mt: 2 }}>
              <Picker dueDateTime={dueDateTime} setDueDateTime={setDueDateTime} />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 3 }}>
            <Button variant="outlined" type="reset" onClick={handleClose}>취소</Button>
            <Button variant="outlined" onClick={() => { createQuiz();}}>생성</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

function Picker({ dueDateTime, setDueDateTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack components='DateTimePicker'>
        <DateTimePicker onChange={(value) => { setDueDateTime(value) }} value={dueDateTime} />
      </Stack>
    </LocalizationProvider>
  );
}

export default CreateQuizModal;
