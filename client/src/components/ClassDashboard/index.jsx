import BasicAccordion from './DashboardAccordion';
import StudyProgress from './StudyProgress';
import { Stack, Typography } from '@mui/material';
import InputCurriculum from '../Input/InputCurriculum.jsx';
import PrivateProgress from './PrivateProgress.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ClassDashboard({ isTeacher }) {
  const [curriculums, setCurriculums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { classId} = useParams();

  const [attendances, setAttendances] = useState([]);
  // function getAttendances() {
  //   console.log(777777777777777)
  //   axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class/attendances?classId=${classId}`, { withCredentials: true 
  //   }).then(data => {            
  //     setAttendances(data.data);
  //   }).catch(err => {
  //     console.log(777777777777777)
  //     console.log(err);
  //   })
  // }
  console.log('attendances:',attendances);



  const [progress, setProgress] = useState([]);
  // function getProgress() {
  //   axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class/progress?classId=${classId}`, { withCredentials: true }).then(data => {
  //     setProgress(data.data);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }
  async function fetchData() {
    try {
      // 완료
      const progressWorkData = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/progress/work?classId=${classId}`, { withCredentials: true });
      const progressData = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/progress/quiz?classId=${classId}`, { withCredentials: true });
      const attendanceData = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class/attendances?classId=${classId}`, { withCredentials: true });
      setAttendances(attendanceData.data);
      setProgress(progressWorkData.data.map((progressWorkData, idx)=>{return {id: progressData[idx].id, nickName: progressData[idx].nickName, countSubmits: progressWorkData.countSubmits, countQuiz:progressData[idx].countQuiz}}))
    } catch (err) {
      console.error(err);
    }
  }


  console.log('progress:',progress);

  useEffect(() => {
    // getProgress(); 
    // getAttendances(); 
    fetchData();
  }, [classId])


  async function getCurriculums() {
    try {
      let data = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/curriculums?classId=${classId}`, { withCredentials: true });
      if (data.data) {
        const sortData = data.data.sort((a, b) => new Date(a.creationTime) - new Date(b.creationTime));
        setCurriculums(sortData);
      }
      setIsLoading(true);
    } catch (err) {
      alert('에러 발생');
      console.log(err);
    }
  }

  useEffect(() => {
    getCurriculums()
    return setIsLoading(false);
  }, [classId])
  console.log('curriculums:',curriculums);

  return (
    <>
      {isLoading ?
        <Stack>
          {
            isTeacher && (
              <InputCurriculum isTeacher={isTeacher} marginBottom={20} setCurriculums={setCurriculums} curriculums={curriculums}></InputCurriculum>
            )
          }
          {
            !isTeacher && (
              <PrivateProgress />
            )
          }
          {
            isTeacher && (
              <StudyProgress progress={progress} setProgress={setProgress} attendances={attendances}/>
            )
          }
          <Stack sx={{ borderBottom: '1.5px solid black', mb: 2, mt: 5 }}>
            <Typography variant='h4' sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }} >커리큘럼</Typography>
          </Stack>
          <BasicAccordion isTeacher={isTeacher} curriculums={curriculums} setCurriculums={setCurriculums} />
        </Stack> :
        null
      }
    </>
  );
}
