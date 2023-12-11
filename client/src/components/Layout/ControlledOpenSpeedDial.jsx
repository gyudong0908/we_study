import ChatRoundedIcon from '@mui/icons-material/ChatOutlined';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Stack from '@mui/material/Stack';
import Chat from './Chat';
import Memo from './Memo';
import * as React from 'react';

export default function ControlledOpenSpeedDial() {
  const actions = [
    { icon: <ChatRoundedIcon />, name: 'Chat' },
    { icon: <EditNoteRoundedIcon />, name: 'Memo' },
  ];

  const [open, setOpen] = React.useState(false);
  const [talkOpen, setTalkOpen] = React.useState(false);
  const [memoOpen, setMemoOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function onClickTalkHandler() {
    handleClose();
    setTalkOpen(true);
  }
  function closeChat() {
    setTalkOpen(false);
  }

  function onClickMemoHandler(){
    handleClose();
    setMemoOpen(true);
  }
  function closeMemo(){
    setMemoOpen(false);
  }

  return (
    <Stack>
      <Stack sx={{ height: 200, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 50, right: 50, }}>
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ transform: 'translateZ(0px)' }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick= {action.name==='Chat' ? onClickTalkHandler : onClickMemoHandler}
            />
          ))}
        </SpeedDial>
      </Stack>
      {
        talkOpen ? <Chat closeChat={closeChat} /> : memoOpen ? <Memo closeMemo={closeMemo} /> : null
      }
    </Stack>
  );
}
