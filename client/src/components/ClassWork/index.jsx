import InputWork from '../Input/InputWork';
import WorkAccordion from './WorkAccordion';
import {Typography, Stack} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ClassWork({ isTeacher }) {
  const [works, setWorks] = useState([]);
  const {classId} = useParams();

  function getWorks(){
    axios.get(`http://localhost:8081/curriculums/work?classId=${classId}`, { withCredentials: true }).then(data=>{
      setWorks(data.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getWorks();
  },[classId])
  
  
  return (
    <>
    {
      isTeacher&&(
        <InputWork isTeacher={isTeacher} works={works} setWorks={setWorks} ></InputWork>
      )
    }
        {works.map((topic, index)=>(
          <Stack key={index} sx={{mb:5}}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
              <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                {topic.title}
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} assignments={topic.Works} topicId={topic.id} />
          </Stack>
        ))} 
    </>
  );
}
