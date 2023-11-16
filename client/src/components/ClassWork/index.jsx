import InputWork from '../Input/InputWork';
import WorkAccordion from './WorkAccordion';
import {Typography, Stack} from '@mui/material';

export default function ClassWork({ isTeacher }) {
  const curriculumTopics = ['Node.js', 'React']
  const assignments = [{title:'1', content:'22'}, {title:'2', content:'33'}]
  return (
    <>
      <InputWork isTeacher={isTeacher} curriculumTopics={curriculumTopics}></InputWork>
        {curriculumTopics.map((topic, index)=>(
          <Stack sx={{mb:5}}>
            <Stack key={index} sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                {topic}
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} assignments={assignments} />
          </Stack>
        ))} 
          <Stack sx={{mb:5}}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                기타
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} assignments={assignments} />
          </Stack>
      
    </>
  );
}