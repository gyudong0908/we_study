import React from 'react';
import { Stack, Typography, Modal, Button, TextField } from '@mui/material';
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

function EditCurriculumModal({ onClose, target, curriculums, setCurriculums }) {
  const [editTitle, setEditTitle] = useState(target.title);
  const [editContent, setEditContent] = useState(target.content);
  console.log(target);

  const UpdateCurriculum = () => {
    const updateData = {
      title: editTitle,
      content: editContent,
      updatedAt: new Date()
    }

    axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/curriculum?curriculumId=${target.id}`, updateData, { withCredentials: true }).then(() => {
      setCurriculums(curriculums.map(curriculum => (curriculum.id === target.id ? updateData : curriculum)));
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'}>
            커리큘럼 수정
          </Typography>
          <Stack id="modal-modal-description">
            <TextField
              id="inputNoticeTitle"
              label='단원명을 입력하세요.'
              variant="outlined"
              fullWidth
              rows={8}
              sx={{ mt: 3 }}
              required
              onChange={(e) => { setEditTitle(e.target.value); }}
              value={editTitle}
            />
            <TextField
              id="teacherName"
              label='세부 목차를 입력하세요.'
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mt: 3 }}
              required
              onChange={(e) => { setEditContent(e.target.value); }}
              value={editContent}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 5 }}>
            <Button variant="outlined" type="reset" sx={{width:'20%'}} onClick={onClose}>취소</Button>
            <Button variant="outlined"sx={{width:'20%'}} onClick={() => { UpdateCurriculum(); onClose(); }}>저장</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default EditCurriculumModal;
