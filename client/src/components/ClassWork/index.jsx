import InputWork from '../Input/InputWork';
import WorkAccordion from './WorkAccordion';
import {Typography, Stack} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassWork({ isTeacher }) {
  const assignments = [
    {
    title: 'sdf',
    content: 'dfsdf',
    },
  ]
  const [works, setWorks] = useState([]);
  const {classId} = useParams();
  console.log('classId:', classId);

  function getWorks(){
    axios.get(`http://localhost:8081/topic/work?classId=${classId}`, { withCredentials: true }).then(data=>{
      setWorks(data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getWorks();
  },[])

  useEffect(()=>{
    console.log(works)
  },[works])
  
  return (
    <>
      <InputWork isTeacher={isTeacher} works={works} setWorks={setWorks} ></InputWork>
        {works.map((topic, index)=>(
          <Stack sx={{mb:5}}>
            <Stack key={index} sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                {topic.name}
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} works={works} setWorks={setWorks} assignments={assignments} />
          </Stack>
        ))} 
          <Stack sx={{mb:5}}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                기타
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} works={works} setWorks={setWorks} assignments={assignments} />
          </Stack>
      
    </>
  );
}