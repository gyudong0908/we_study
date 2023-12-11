import React from 'react';
import { Stack, Typography, Modal, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setClassCards } from '../../reducer/classCardsSlice';
import axios from 'axios';

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

function CreateClassModal({ open, handleClose }) {
  const [title, setTitle] = useState('');
  const [teacher, setTeacher] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  function createClass() {
    if (title !== '' && teacher !== '') {
      const data = {
        title: title,
        section: teacher,
        description: description,
      }

      axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/class`, data, { withCredentials: true }).then((response) => {
        dispatch(setClassCards([response.data]));
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'}>
            클래스 만들기
          </Typography>
          <Stack id="modal-modal-description">
            <TextField
              id="className"
              label="클래스 이름 (필수)"
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 3 }}
              required
              onChange={(e) => { setTitle(e.target.value); }}
              value={title}
            />
            <TextField
              id="teacherName"
              label="교사 이름 (필수)"
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 2 }}
              required
              onChange={(e) => { setTeacher(e.target.value); }}
              value={teacher}
            />
            <TextField
              id="classDesc"
              label="클래스 소개 (선택)"
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 2 }}
              onChange={(e) => { setDescription(e.target.value); }}
              value={description}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 5 }}>
            <Button variant="outlined" type="reset" sx={{width:'20%'}} onClick={handleClose}>취소</Button>
            <Button variant="outlined" sx={{width:'20%'}} onClick={() => { createClass(); handleClose(); }}>생성</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default CreateClassModal;
