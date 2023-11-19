import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChatPeople from './ChatPeople';
import ChatDisplay from './ChatDisplay';
import { Button, styled, Typography, Box, Stack } from '@mui/material';
import axios from 'axios';
import io from "socket.io-client";

export default function Chat({ closeChat }) {
  const [value, setValue] = React.useState(0);
  const [chatId, setChatId] = React.useState(null);
  const [chatTitle, setChatTitle] = React.useState('');
  const [chatUserId, setChatUserId] = React.useState();
  const [chatUsers, setChatUsers] = React.useState([]);
  const socket = io.connect("http://localhost:8081");

  const TabButton = styled(Button)(({ theme, isActive }) => ({
    margin: '10px',
    border: '1px solid black',
    flex: 1,
    color: isActive ? 'white' : 'black',
    backgroundColor: isActive ? 'grey' : 'white',
    '&:hover': {
      backgroundColor: isActive ? 'grey' : 'white',
    },
  }))
  function getClassChats() {
    axios.get(`http://localhost:8081/classchats`, { withCredentials: true }).then((response) => {
      setChatUsers(response.data)
    }).catch(err => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getClassChats();
  }, [])

  function onClickHandler(classChatId, chatUserId, title) {
    setChatId(classChatId);
    setChatUserId(chatUserId);
    setChatTitle(title);
  }

  function rewind() {
    setChatId(null);
    socket.disconnect();
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
          <CloseIcon onClick={closeChat} sx={{
            cursor: 'pointer',
            margin: '10px',
            color: 'black',
            '&:hover': { transform: 'scale(1.1)' },
          }} />
        </Stack>
        {
          chatId !== null ? <ChatDisplay rewind={rewind} value={value} classChatId={chatId} chatTitle={chatTitle} chatUserId={chatUserId} socket={socket} /> : (
            <div>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <TabButton onClick={() => { setValue(0) }} isActive={value === 0}>
                  <Typography variant='h5'>클래스</Typography>
                </TabButton>
                <TabButton onClick={() => { setValue(1) }} isActive={value === 1}>
                  <Typography variant='h5'>개인</Typography>
                </TabButton>
              </Box>
              {
                value === 0 ? <ChatPeople data={chatUsers} onClickHandler={onClickHandler} /> : <ChatPeople data={personalData} onClickHandler={onClickHandler} />
              }
            </div>
          )
        }
      </Stack>
    </Stack>
  );
}
