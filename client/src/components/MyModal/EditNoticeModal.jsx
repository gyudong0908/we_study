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

function EditNoticeModal({ onClose, target, notices, setNotices }) {
    const [editTitle, setEditTitle] = useState(target.title);
    const [editContent, setEditContent] = useState(target.content);
    console.log(target);
    
    const UpdateNotice =()=>{
        const updateData = {
            title: editTitle,
            content: editContent,
            updatedAt: new Date()
        }

        axios.put(`http://localhost:8081/notice?noticeId=${target.id}`, updateData, { withCredentials: true }).then(() => {
            setNotices(notices.map(notice=>(notice.id === target.id? updateData :notice )));
        }).catch(err => {
            console.log(err);
        })
  }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'}>
            공지사항 수정
          </Typography>
          <Stack id="modal-modal-description">
            <TextField
              id="inputNoticeTitle"
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
              id="teacherName"
              label='세부 내용을 입력하세요.'
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
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
            <Button variant="outlined" type="reset" onClick={onClose}>취소</Button>
            <Button variant="outlined" onClick={()=>{UpdateNotice(); onClose();}}>저장</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}

export default EditNoticeModal;
