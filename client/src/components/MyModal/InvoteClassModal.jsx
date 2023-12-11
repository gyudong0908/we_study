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

function InvoteClassModal({ open, handleClose }) {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  function joinClass() {
    if (code !== '') {
      axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/class/join?code=${code}`, null, { withCredentials: true }).then((response) => {
        dispatch(setClassCards([response.data]));
      }).catch(err => {
        alert('오류발생', err);
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
            초대코드
          </Typography>
          <Stack id="modal-modal-description">
            <TextField
              id="classDesc"
              label="초대코드 입력"
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 2 }}
              onChange={(e) => { setCode(e.target.value); }}
              value={code}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 5 }}>
            <Button variant="outlined" type="reset" sx={{width:'20%'}} onClick={handleClose}>취소</Button>
            <Button variant="outlined" sx={{width:'20%'}} onClick={() => { joinClass(); handleClose(); }}>참가</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default InvoteClassModal;