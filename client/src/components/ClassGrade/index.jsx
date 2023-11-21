import { Stack, Typography } from '@mui/material';
import GradeTable from './GradeTable';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function ClassGrade({ isTeacher }) {
  const {classId} = useParams();
  function getSubmitData(){
    axios.get(`http://localhost:8081/class/submits?classId=${classId}`,{ withCredentials: true }).then(data=>{
      console.log(data);
    })
  }
  getSubmitData()
    return (
      <Stack isTeacher={isTeacher}>
        <Typography variant="h4" component="span" sx={{mb:2, fontWeight: 'bold', color:'#0091ea'}}>
          학생 성적 관리
        </Typography>
        <GradeTable />
      </Stack>
    );
  }