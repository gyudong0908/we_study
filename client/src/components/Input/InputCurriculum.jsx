import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

export default function InputCurriculum({ isTeacher}) {
    const [curriculumList,setCurriculumList] = useState([]);
    const [title,setTitle] = useState('');
    const [curriculum,setCurriculum] = useState('');
    function keyUpHandler(e){
        e.preventDefault();
        if(e.key === 'Enter'){
            setCurriculumList([...curriculumList,curriculum]);
            setCurriculum('');
        }

    }

    const styles = {marginBottom:'40px'};

  return (
    <div style={styles}>
    {isTeacher && (
        <Accordion sx={{ mb: 10 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            ✍️ 커리큘럼을 입력하세요.
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            <TextField
              id="outlined-basic"
              label="제목을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <TextField
              id="outlined-basic"
              label="내용을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={curriculum}
              onChange={(e)=>{setCurriculum(e.target.value)}}
              onKeyUp={(e)=>{keyUpHandler(e);}}
            />
            <Typography variant="h5" sx={{marginBottom:'15px', fontWeight:'bold'}}>{title}</Typography>
              {
                curriculumList.map((data,key)=>{
                    return(
                        <Stack direction="row" sx={{display: 'flex', justifyContent: 'space-between'}}>
                          <Typography variant="body1" gutterBottom key={key} sx={{marginLeft:"10px", marginBottom:'5px'}}>🔹 {data} </Typography>
                          <CloseRoundedIcon sx={{cursor:'pointer', fontSize:'medium'}}></CloseRoundedIcon>
                        </Stack>
                    )
                })  
              }
            <Typography variant="h5" sx={{marginLeft:"10px"}}>{curriculum}</Typography>

            <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
              <Button variant="outlined" type="reset">
                취소
              </Button>
              <Button variant="outlined">저장</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
      </div>
  );
}
