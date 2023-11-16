import { React, useState } from 'react';
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

export default function InputWork({ isTeacher, curriculumTopics}) {
  const styles = {marginBottom:'40px'};
  const [curriculumTopic, setCurriculumTopic] = useState('');
  const handleChange = (event) => {
    setCurriculumTopic(event.target.value);
  };

  return (
    <div style={styles}>
    {isTeacher && (
        <Accordion sx={{ mb: 10 }}>
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
                    <MenuItem key={index}>{topic}</MenuItem>
                  ))}
                  <MenuItem key='etc'>기타</MenuItem>
                </Select>
              </FormControl>
              <Picker />
            </Stack>
            
            <TextField
              id="inputAssignmentTitle"
              label="제목을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              id="inputAssignmentContent"
              label="세부 내용을 입력하세요."
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mb: 2 }}
              required
            />
            <Stack direction="row" justifyContent="flex-end" gap={1}>
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

function Picker(){
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack components='DateTimePicker'>
        <DateTimePicker />
      </Stack>
    </LocalizationProvider>
  );
}


