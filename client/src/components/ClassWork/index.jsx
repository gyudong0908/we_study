import InputWork from '../Input/InputWork';
import WorkAccordion from './WorkAccordion';
import { Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ClassWork({ isTeacher }) {
  const [works, setWorks] = useState([]);
  const { classId } = useParams();

  function getWorks() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/curriculums/work?classId=${classId}`, { withCredentials: true }).then(data => {
      setWorks(data.data);
    }).catch(err => {
      console.log(err);
    })
  }
  console.log(works);

  useEffect(() => {
    getWorks();
  }, [classId])


  return (
    <>
      {
        isTeacher && (
          <InputWork isTeacher={isTeacher} works={works} setWorks={setWorks} ></InputWork>
        )
      }
      {works.map((topic, index) => {
        return (
          <Stack key={index} sx={{ mb: 5 }}>
            <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
              <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea', wordBreak: 'keep-all', wordWrap: 'break-word' }}>
                {topic.title}
              </Typography>
            </Stack>
            <WorkAccordion isTeacher={isTeacher} works={works} setWorks={setWorks} assignments={topic.Works} topicId={topic.id} />
          </Stack>
        )
      })}
    </>
  );
}
