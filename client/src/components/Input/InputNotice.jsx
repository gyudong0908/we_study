import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function InputNotice({ isTeacher, notices, setNotices}) {
  const styles = {marginBottom:'40px'};
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent,setInputcontent] = useState('');
  const {classId} = useParams();

  function onClickSave(){
    const data = {
      title: inputTitle,
      content: inputContent,
    }

    axios.post(`http://localhost:8081/notice?classId=${classId}`,data,{ withCredentials: true }).then(()=>{
      setNotices([data, ...notices ]);
      setInputTitle('')
      setInputcontent('')
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div style={styles}>
    {isTeacher && (
        <Accordion sx={{ mb: 10 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            ✍️ 공지사항을 입력하세요.
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            <TextField
              id="inputNoticeTitle"
              label="제목을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={inputTitle}
              onChange={(e)=>{setInputTitle(e.target.value)}}
            />
            <TextField
              id="inputNoticeContent"
              label="세부 내용을 입력하세요."
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mb: 2 }}
              value={inputContent}
              onChange={(e)=>{setInputcontent(e.target.value)}}
              required
            />
            <Stack direction="row" justifyContent="flex-end" gap={1}>
              <Button variant="outlined" type="reset">
                취소
              </Button>
              <Button variant="outlined" onClick={onClickSave}>저장</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
      </div>
  );
}


