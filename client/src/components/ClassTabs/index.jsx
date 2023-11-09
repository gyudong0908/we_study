import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import ClassDashboard from '../ClassDashboard';
import ClassNotice from '../ClassNotice';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function ClassTabs({ isTeacher, curriculums, notices }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      title: '대시보드',
      content: <ClassDashboard curriculums={curriculums} isTeacher={isTeacher} />,
    },
    {
      title: '공지사항',
      content: <ClassNotice notices={notices} isTeacher={isTeacher} />,
    },
    {
      title: '할일목록',
      content: <div>할일목록 내용</div>,
    },
    {
      title: '참여자',
      content: <div>참여자 내용</div>,
    },
    {
      title: '성적',
      content: <div>성적 내용</div>,
    },
    {
      title: '클래스 설정',
      content: <div>클래스 설정 내용</div>,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
