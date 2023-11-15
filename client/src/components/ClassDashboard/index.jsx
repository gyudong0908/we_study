import BasicAccordion from './DashboardAccordion';
import StudyProgress from './StudyProgress';
import { Stack, Typography } from '@mui/material';
import InputCurriculum from '../Input/InputCurriculum.jsx';
import PrivateProgress from './PrivateProgress.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassDashboard({isTeacher }) {
  const [curriculums,setCurriculums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { classId } = useParams();

  async function getCurriculums(){
    try{
      const data =  await axios.get(`http://localhost:8081/works?classId=${classId}&category=커리큘럼`,{ withCredentials: true });
      const sortData = data.data.sort((a,b)=> new Date(a.creationTime) - new Date(b.creationTime));
      setCurriculums(sortData);
      setIsLoading(true);
    }catch{
      alert('에러 발생');
      console.log(err);
    }
  }

  useEffect(()=>{
    getCurriculums()
    return setIsLoading(false);
  },[])

  return (
    <>
    {isLoading?
      <Stack>
        <InputCurriculum isTeacher={isTeacher} marginBottom={20} setCurriculums={setCurriculums}></InputCurriculum>
        <PrivateProgress />
        <StudyProgress />
        <Typography variant="h4" component="span" sx={{mb:2, fontWeight: 'bold', color:'#0091ea'}}>
          커리큘럼
        </Typography>
        <BasicAccordion isTeacher={isTeacher} curriculums={curriculums} setCurriculums={setCurriculums} />
      </Stack>:
      null
   }
    </>
  );
}
