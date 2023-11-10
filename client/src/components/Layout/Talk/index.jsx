import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TalkPeople from './TalkPeople';
import { Stack } from '@mui/material';

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

export default function Talk({closeTalk}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classData = [
    {name:"KOSTA 265기"},
    {name:"2023 OUTTA 데이터분석"},
  ];
  const personalData = [
    {name:"이동규"},
    {name:"조정석"},
    {name:"최혜린"},
  ]


  const tabs = [
    {
      title: '클래스',
      content: <TalkPeople data={classData}/>,
    },
    {
      title: '개인',
      content: <TalkPeople data={personalData}/>,
    },
  ];

  return (
    <Box sx={{
         width: 550,
         height: 500,
         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
         position:'fixed',
         bottom: 0,
         right: 0,
         background : 'white',
         display: 'flex',
         justifyContent: 'space-between'
        }}>
      <Stack>
        <Box>
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
    </Stack>
    <CloseIcon onClick = {closeTalk} sx={{cursor:'pointer'}}/>
    </Box>
  );
}
