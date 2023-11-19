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
    axios.get(`http://localhost:8081/class?classId=${classId}`, { withCredentials: true }).then(data => {
      setClassData(data.data);
      if (data.data.id == user.userData.id) {
        setIsTeacher(true);
      }
    });
  }
  useEffect(() => {
    getClassData()
  }, [classId])
  return (

    <Stack
      sx={{
        direction: 'column',
        spacing: '10px',
        marginTop: '100px',
        marginLeft: '270px',
        marginRight: '70px'
      }}
    >
      <ClassCard title={classData.title} section={classData.section} />
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
