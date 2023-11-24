import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import ClassDashboard from '../ClassDashboard';
import ClassNotice from '../ClassNotice';
import ClassPeople from '../ClassPeople';
import ClassWork from '../ClassWork';
import ClassSetting from '../ClassSetting';
import ClassGrade from '../ClassGrade';
import { useParams } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Stack sx={{ p: 3 }}>{children}</Stack>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClassTabs({ isTeacher, classData, setClassData }) {
  const [value, setValue] = React.useState(0);
  const {classId} = useParams();

  React.useEffect(()=>{
      setValue(0);
  },[classId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      title: '대시보드',
      content: <ClassDashboard isTeacher={isTeacher} />,
    },
    {
      title: '공지사항',
      content: <ClassNotice isTeacher={isTeacher} />,
    },
    {
      title: '과제',
      content: <ClassWork isTeacher={isTeacher} />,
    },
    {
      title: '참여자',
      content: <ClassPeople />,
    },
    {
      title: '성적',
      content: <ClassGrade isTeacher={isTeacher} />,
    },
    {
      title: '클래스 설정',
      content: <ClassSetting isTeacher={isTeacher} classData={classData} setClassData={setClassData} />,
    },
  ];

  return (
    <Stack sx={{ width: '100%' }}>
      <Stack sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            !isTeacher && tab.title === '클래스 설정' ? null :
              <Tab key={index} label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Stack>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Stack>
  );
}
