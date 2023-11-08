import ChatRoundedIcon from '@mui/icons-material/ChatOutlined';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const actions = [
  { icon: <ChatRoundedIcon />, name: 'Chat' },
  { icon: <EditNoteRoundedIcon />, name: 'Note' },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position:'fixed', bottom: 50, right: 50, transform: 'translateZ(0px)' }}
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
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Stack>
  );
}
