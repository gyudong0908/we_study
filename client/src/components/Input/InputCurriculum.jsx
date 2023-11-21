import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, TextField,} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function InputCurriculum({ isTeacher, setCurriculums, curriculums}) {
    const [curriculumList,setCurriculumList] = useState([]);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const {classId} = useParams();

    function keyUpHandler(e){
        e.preventDefault();
        if(e.key === 'Enter'){
          console.log(content)
            setCurriculumList([...curriculumList,content]);
            setContent(''); 
        }
    }
    function onClickDelete(key){
      const copyCurriculumList = [...curriculumList];
      copyCurriculumList.splice(key,1);
      setCurriculumList(copyCurriculumList);
    }

    function onClickSave(){
      const resultString = '🔹\u00a0'+curriculumList.join(`\n🔹\u00a0`);
      const data = {
        title: title,
        content: resultString,
      };

      axios.post(`http://localhost:8081/curriculum?classId=${classId}`,data,{ withCredentials: true }).then(response=>{
        setCurriculums([...curriculums,response.data])
      })
      .catch(err=>{
        alert('오류 발생:', err);
      });   
      setTitle('');
      setCurriculumList([]);
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
              id="inputTopicTitle"
              label="단원명을 하나 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <TextField
              id="inputTopicSubTitle"
              label="세부 목차를 하나씩 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={content}
              onChange={(e)=>{setContent(e.target.value)}}
              onKeyPress={(e)=>{keyUpHandler(e);}}
            />
            <Typography variant="h5" sx={{marginBottom:'15px', fontWeight:'bold'}}>{title}</Typography>
              {
                curriculumList.map((data,key)=>{
                    return(
                        <Stack direction="row" sx={{display: 'flex', justifyContent: 'space-between'}}>
                          <Typography  variant="body1" gutterBottom key={key} sx={{marginLeft:"10px", marginBottom:'5px'}}> 🔹 {data} </Typography>
                          <CloseRoundedIcon key={key} onClick={()=>{onClickDelete(key)}} sx={{cursor:'pointer', fontSize:'medium'}}></CloseRoundedIcon>
                        </Stack>
                    )
                })  
              }
            <Typography variant="h5" sx={{marginLeft:"10px"}}>{content}</Typography>

            <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'15px'}}>
              <Button variant="outlined" type="reset">취소</Button>
              <Button variant="outlined" tyep='submit' onClick={onClickSave}>저장</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
      </div>
  );
}
