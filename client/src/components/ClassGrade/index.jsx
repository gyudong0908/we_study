import { Stack, Typography } from '@mui/material';
import GradeTable from './GradeTable';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ClassGrade({ isTeacher }) {
  const {classId} = useParams();
  const [curriculums,  setCurriculums] = useState([]);
  function getSubmitData(){
    axios.get(`http://localhost:8081/class/submits?classId=${classId}`,{ withCredentials: true }).then(data=>{
      console.log(data.data.Curriculums)
      setCurriculums(data.data.Curriculums);
    })
  }
  useEffect(()=>{
    getSubmitData();
  },[])
    return (
      <Stack isTeacher={isTeacher}>
        <Typography variant="h4" component="span" sx={{mb:2, fontWeight: 'bold', color:'#0091ea'}}>
          학생 성적 관리
        </Typography>
        <GradeTable curriculums={ curriculums } setCurriculums={setCurriculums} />
      </Stack>
    );
  }