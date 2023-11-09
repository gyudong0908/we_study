import * as React from 'react';
import {Stack, Typography, Modal, Button, TextField} from '@mui/material';

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

function CreateClassModal({open, handleClose}) {

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
                id="outlined-basic"
                label="클래스 이름 (필수)"
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 2 }}
                required
                />
            <TextField
                id="outlined-basic"
                label="교사 이름 (필수)"
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 2 }}
                required
                />
            <TextField
                id="outlined-basic"
                label="클래스 소개 (선택)"
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 2 }}
                />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{mt:2}}>
            <Button variant="outlined" type="reset" onClick={handleClose}>취소</Button>
            <Button variant="outlined">생성</Button>
        </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default CreateClassModal;
