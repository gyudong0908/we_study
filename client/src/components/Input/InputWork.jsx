import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { InputLabel, MenuItem, Select, FormControl} from '@mui/material';
import { Button, Stack, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function InputWork({ isTeacher, curriculumTopics, works, setWorks}) {
  const styles = {marginBottom:'40px'};
  const [curriculumTopic, setCurriculumTopic] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputTopicId, setInputTopicId] = useState('');
  const [inputDueDateTime, setInputDueDateTime] = useState('');
  //const {topicId} = useParams();

  const [expanded, setExpanded] = useState(false);
  const inputToggleChange=()=>{
    setExpanded((prevExpanded)=>!prevExpanded);
  };

  const handleChange = (event) => {
    const selectedTopicId = event.target.value;
    setCurriculumTopic(selectedTopicId);
    setInputTopicId(selectedTopicId);
  };

  function onClickSave(){
    const data = {
      title: inputTitle,
      description: inputDescription,
      topicId: inputTopicId,
      dueDateTime: inputDueDateTime.toISOString(),
    }

    axios.post('http://localhost:8081/work?topicId=1', data, { withCredentials:true }).then((response)=>{
      setWorks([response.data, ...works]);
      setInputTitle('');
      setCurriculumTopic('');
      setInputDescription('');
      setInputTopicId('');
      setInputDueDateTime('');
      setExpanded(false);
    }).catch(err=>{
      console.log(err);
    })
  };

  // useEffect(() => {
  //   console.log("curriculumTopic:", curriculumTopic);
  //   console.log("inputTitle:", inputTitle);
  //   console.log("inputDescription:", inputDescription);
  //   console.log("inputTopicId:", inputTopicId);
  //   console.log("inputDueDateTime:", inputDueDateTime);
  //   console.log("expanded:", expanded);
  // }, [curriculumTopic, inputTitle, inputDescription, inputTopicId, inputDueDateTime, expanded]);

  return (
    <div style={styles}>
    {isTeacher && (
        <Accordion 
          expanded={expanded}
          onChange={inputToggleChange}
          sx={{ mb: 10 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            ✍️ 과제를 입력하세요.
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            <Stack sx={{flexDirection:'row', mb:2}}>
              <FormControl required sx={{ mr:2, minWidth:140 }}>
                <InputLabel id="selectTopic">단원 선택</InputLabel>
                <Select
                  labelId="curriculumTopic"
                  id="curriculumTopicRequired"
                  label="단원 선택 필수 *"
                  value={curriculumTopic}
                  onChange={handleChange}
                >
                  {curriculumTopics.map((topic, index)=>(
                    <MenuItem key={index} value={topic}>{topic}</MenuItem>
                  ))}
                  <MenuItem key='etc'>기타</MenuItem>
                </Select>
              </FormControl>
              <Picker inputDueDateTime={inputDueDateTime} setInputDueDateTime={setInputDueDateTime}/>
            </Stack>
            
            <TextField
              id="inputWorkTitle"
              label="제목을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              onChange={(e)=>{setInputTitle(e.target.value)}}
              value={inputTitle}
            />
            <TextField
              id="inputWorkDescription"
              label="세부 내용을 입력하세요."
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mb: 2 }}
              required
              onChange={(e)=>{setInputDescription(e.target.value)}}
              value={inputDescription}
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

function Picker({inputDueDateTime, setInputDueDateTime}){
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack components='DateTimePicker'>
        <DateTimePicker onChange={(value)=>{setInputDueDateTime(value)}} value={inputDueDateTime}/>
      </Stack>
    </LocalizationProvider>
  );
}


