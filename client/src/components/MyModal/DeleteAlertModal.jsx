import React from 'react';
import { Stack, Typography, Modal, Button, TextField, Alert } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

};

function DeleteAlertModal({ onClose, deleteData, onClickDelete}) {
    

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Stack sx={style}>
        <Alert variant="outlined" severity="warning" sx={{
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            backgroundColor:'white',
            padding:'50px'
            }}>
            <Stack direction='row' sx={{alignItems:'center',}}>
              <Stack marginRight={'20px'}>
                <Typography>삭제하시겠습니까?</Typography>
              </Stack>
              <Stack direction='row' spacing={1} >
                <Button variant="outlined" color='warning' onClick={()=>{onClickDelete(deleteData); onClose()}}>확인</Button>
                <Button variant="outlined" color='warning' 
                  onClick={()=>{onClose(); }}>취소</Button>
              </Stack>
            </Stack>
          </Alert>
        </Stack>
      </Modal>
    </div>
  );
}

export default DeleteAlertModal;
