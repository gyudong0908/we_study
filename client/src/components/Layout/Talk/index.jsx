import Box from '@mui/material/Box';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TalkPeople from './TalkPeople';
import { Button, Stack, styled, Typography } from '@mui/material';


export default function Talk({ closeTalk }) {
  const [value, setValue] = React.useState(0);

  const TabButton = styled(Button)(({ theme, isActive }) => ({
    margin: '10px',
    border: '1px solid black',
    flex: 1,
    color: isActive ? 'white' : 'black',
    backgroundColor: isActive ? 'grey' : 'white',
    '&:hover': {
      backgroundColor: isActive ? 'grey' : 'white',
    },
  }));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classData = [
    { name: "KOSTA 265기" },
    { name: "2023 OUTTA 데이터분석" },
  ];
  const personalData = [
    { name: "이동규" },
    { name: "조정석" },
    { name: "최혜린" },
  ];


  const tabs = [
    {
      title: '클래스',
      content: <TalkPeople data={classData} />,
    },
    {
      title: '개인',
      content: <TalkPeople data={personalData} />,
    },
  ];

  return (
    <Box sx={{
      width: 400,
      height: 500,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'white',
    }}>
      <Stack>
        <Stack sx={{ textAlign: 'right', display: 'inline-block' }}>
          <CloseIcon onClick={closeTalk} sx={{ cursor: 'pointer', '&:hover': { border: '2px solid skyblue' } }} />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <TabButton onClick={() => { setValue(0) }} isActive={value === 0}>
            <Typography variant='h5'>클래스</Typography>
          </TabButton>
          <TabButton onClick={() => { setValue(1) }} isActive={value === 1}>
            <Typography variant='h5'>개인</Typography>
          </TabButton>
        </Box>
        {
          value === 0 ? <TalkPeople data={classData} /> : <TalkPeople data={personalData} />
        }
      </Stack>
    </Box>
  );
}