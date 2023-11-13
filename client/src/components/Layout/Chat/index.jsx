import Stack from '@mui/material/Stack';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChatPeople from './ChatPeople';
import ChatDisplay from './ChatDisplay';
import { Button, styled, Typography } from '@mui/material';


export default function Chat({ closeChat }) {
  const [value, setValue] = React.useState(0);
  const [chatId, setChatId] = React.useState('');

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

  function onClickHandler(name) {
    setChatId(name);
  }

  function rewind() {
    setChatId('');
  }

  const classData = [
    { name: "KOSTA 265기" },
    { name: "2023 OUTTA 데이터분석" },
  ];
  const personalData = [
    { name: "이동규" },
    { name: "조정석" },
    { name: "최혜린" },
  ];

  return (
    <Stack sx={{
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
          <CloseIcon onClick={closeChat} sx={{ cursor: 'pointer', '&:hover': { border: '2px solid skyblue' } }} />
        </Stack>
        {
          chatId !== '' ? <ChatDisplay rewind={rewind} name={chatId} /> : (
            <div>
              <Stack sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <TabButton onClick={() => { setValue(0) }} isActive={value === 0}>
                  <Typography variant='h5'>클래스</Typography>
                </TabButton>
                <TabButton onClick={() => { setValue(1) }} isActive={value === 1}>
                  <Typography variant='h5'>개인</Typography>
                </TabButton>
              </Stack>
              {
                value === 0 ? <ChatPeople data={classData} onClickHandler={onClickHandler} /> : <ChatPeople data={personalData} onClickHandler={onClickHandler} />
              }
            </div>
          )
        }
      </Stack>
    </Stack>
  );
}
