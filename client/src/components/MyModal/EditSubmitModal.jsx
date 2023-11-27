import React from 'react';
import { Stack, Typography, Modal, Button, TextField, Checkbox } from '@mui/material';
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

function EditSubmitModal({ onClose, submitData, setsubmitData }) {
  const [editTitle, setEditTitle] = useState(submitData.title);
  const [editContent, setEditContent] = useState(submitData.content);
  const [file, setFile] = useState('');
  const [isPrivate, setIsPrivate] = useState(submitData.private);
  console.log(isPrivate)

  const updateSubmit = () => {
    const updateData = {
      title: editTitle,
      content: editContent,
      updatedAt: new Date(),
      file: file,
      private: isPrivate
    }
    const newSetData = {
      title: editTitle,
      content: editContent,
      updatedAt: new Date(),
      downloadPath: submitData.downloadPath,
      fileName: submitData.fileName,
      private: isPrivate
    }

    axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${submitData.id}`, updateData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.data.fileName) {
        newSetData.downloadPath = response.data.downloadPath;
        newSetData.fileName = response.data.fileName;
      }
      setsubmitData({ ...submitData, ...newSetData });
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Stack sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'}>
            제출과제 수정
          </Typography>
          <Stack id="modal-modal-description">
            <Stack direction={'row'} alignItems={'center'}>
              <TextField
                id="inputNoticeTitle"
                label='제목을 입력하세요.'
                variant="outlined"
                fullWidth
                rows={8}
                sx={{ mt: 3 }}
                required
                onChange={(e) => { setEditTitle(e.target.value); }}
                value={editTitle}
              />
              <label htmlFor="checkBox">private</label>
              <Checkbox id = "checkBox" onChange={(e)=>{setIsPrivate(e.target.checked)}} checked={isPrivate}/>
            </Stack>
            <TextField
              id="teacherName"
              label='세부 내용을 입력하세요.'
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mt: 2 }}
              required
              onChange={(e) => { setEditContent(e.target.value); }}
              value={editContent}
            />
            <InputFileUpload setFile={setFile} file={file}></InputFileUpload>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
            <Button variant="outlined" type="reset" onClick={onClose}>취소</Button>
            <Button variant="outlined" onClick={() => { updateSubmit(); onClose(); }}>저장</Button>
          </Stack>
        </Stack>
      </Modal>
    </div>
  );
}
function InputFileUpload({ setFile, file }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx, .png, .jpeg, .jpg" // Specify accepted file types if necessary
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
      />
      <label htmlFor="fileInput">
        <button>{file ? file.name : '파일을 선택하세요'}</button>
      </label>
      {file && (
        <>
          <Typography variant='caption' sx={{ float: 'right' }}>File Type: {file.type}</Typography>
        </>
      )}
    </div>
  );
}

export default EditSubmitModal;
