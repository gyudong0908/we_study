import React from 'react';
import { Stack, Typography, Modal, Button, TextField } from '@mui/material';
import { useState } from 'react';
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

function EditQuizModal({open, handleClose, quiz, editQuiz}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState();
  const [startDateTime, setStartDateTime] = useState();
  function onEdit() {
    if (title !== '' && dueDateTime !== '') {
      const data = {
        title: title,
        description: description,
        dueDateTime: dueDateTime.toISOString(),
        startDateTime: startDateTime.toISOString(),
      }
      editQuiz(quiz.id, data);

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
              defaultValue={quiz.title}
            //   value={title}
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
              defaultValue={quiz.description}
            //   value={description}
            />
          </Stack>
          <Stack sx={{ mt: 2, alignItems:'center' }}>
              <Picker dueDateTime={dueDateTime} setDueDateTime={setDueDateTime} startDateTime={startDateTime} setStartDateTime={setStartDateTime}/>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 5 }}>
            <Button variant="outlined" type="reset" sx={{width:'20%'}} onClick={handleClose}>취소</Button>
            <Button variant="outlined" sx={{width:'20%'}} onClick={() => { onEdit(); handleClose();}}>변경</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

function Picker({ startDateTime, dueDateTime, setStartDateTime, setDueDateTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2}>
        <DateTimePicker
          label="Start Time"
          value={startDateTime}
          onChange={(value) => setStartDateTime(value)}
        />
        <DateTimePicker
          label="End Time"
          value={dueDateTime}
          onChange={(value) => setDueDateTime(value)}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default EditQuizModal;
