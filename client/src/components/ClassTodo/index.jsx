import InputAssignment from '../Input/InputAssignment';
import AssignmentAccordion from './AssignmentAccordion';
import {Typography, Stack} from '@mui/material';

export default function ClassTodo({ isTeacher, assignments }) {
  return (
    <>
      <InputAssignment isTeacher={isTeacher}></InputAssignment>
      <Typography variant="h4" component="span" sx={{mb:'2', fontWeight: 'bold', marginBottom:'15px', color:'#0091ea'}}>
        공지사항
      </Typography>
      {/* <AssignmentAccordion assignments={assignments} /> */}
    </>
  );
}