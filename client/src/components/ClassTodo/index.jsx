import InputAssignment from '../Input/InputAssignment';
import AssignmentAccordion from './AssignmentAccordion';
import {Typography, Stack} from '@mui/material';

export default function ClassTodo({ isTeacher, assignments, curriculumTopics }) {

  return (
    <>
      <InputAssignment isTeacher={isTeacher} curriculumTopics={curriculumTopics}></InputAssignment>
        {curriculumTopics.map((topic, index)=>(
          <Stack sx={{mb:5}}>
            <Stack key={index} sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                {topic}
              </Typography>
            </Stack>
            <AssignmentAccordion assignments={assignments} />
          </Stack>
        ))} 
          <Stack sx={{mb:5}}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                기타
              </Typography>
            </Stack>
            <AssignmentAccordion assignments={assignments} />
          </Stack>
      
    </>
  );
}