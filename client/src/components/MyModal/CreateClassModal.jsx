import React from 'react';
import {Stack, Typography, Modal, Button, TextField} from '@mui/material';
import { useState } from 'react';
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

function CreateClassModal({open, handleClose}) {
   const [name,setName] = useState('');
   const [teacher,setTeacher] = useState('');
   const [description,setDescription] = useState('');

  function createClass(){      
    if(name !=='' && teacher !==''){
      const data = {
        name : name,
        section	: teacher,
        description : description,
        ownerId : "me"
      }
    //   axios.post('http://localhost:8081/class',data,{ withCredentials: true }).then(()=>{
    //     alert('생성이 완료 되었습니다.');
    //   }).catch(err=>{
    //     alert('오류발생',err);
    //   })
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
                sx={{ mt: 2 }}
                required
                onChange={(e)=>{setName(e.target.value);}}
                value={name}
                />
            <TextField
                id="teacherName"
                label="교사 이름 (필수)"
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 2 }}
                required
                onChange={(e)=>{setTeacher(e.target.value);}}
                value={teacher}
                />
            <TextField
                id="classDesc"
                label="클래스 소개 (선택)"
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 2 }}
                onChange={(e)=>{setDescription(e.target.value);}}
                value={description}
                />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{mt:2}}>
            <Button variant="outlined" type="reset" onClick={handleClose}>취소</Button>
            <Button variant="outlined" onClick={()=>{createClass();handleClose();}}>생성</Button>
        </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default CreateClassModal;
