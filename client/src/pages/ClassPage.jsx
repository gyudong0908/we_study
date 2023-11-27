import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { useLoaderData, useParams } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import ClassTabs from '../components/ClassTabs';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function ClassPage() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [classData, setClassData] = useState({});
  const user = useSelector(state => state.userData);
  const { classId } = useParams();

  function getClassData() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class?classId=${classId}`, { withCredentials: true }).then(data => {
      setClassData(data.data);
      if (user.userData) {
        if (data.data.teacher == user.userData.id) {
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
        }
      }
    });
  }
  console.log(classData)
  useEffect(() => {
    getClassData()

  }, [classId, user])
  return (

    <Stack
      sx={{
        direction: 'column',
        marginTop: '115px',
        marginLeft: '320px',
        marginRight: '50px',
        marginBottom: '150px',

          // marginTop:'120px',
          // marginLeft:'300px',
          // marginBottom:'200px',
          // display:'flex',
          // flexDirection:'column',
          // width:'cal(100% - 3rem)',
          // maxWidth: '55rem',

      }}
    >
      <ClassCard title={classData.title} section={classData.section} description={classData.description} />
      <ClassTabs
        isTeacher={isTeacher}
        classData={classData}
        setClassData={setClassData}
      // curriculums={curriculums}
      // notices={notices}
      // assignments={assignments}
      // curriculumTopics={curriculumTopics}
      />
    </Stack>
  );
}
