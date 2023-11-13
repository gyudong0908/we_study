import React from 'react';
import { Link } from 'react-router-dom';
import {Stack, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CssBaseline} from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';


function MySideNav(){
    const welcomeText = <div>✍️ 시작해볼까요?<br />최혜린님</div>
    const drawer = (
        <div>
          <Toolbar />
          <Stack sx={{overflow: 'auto'}}>
            <List>
                <ListItem
                    sx={{textAlign: 'center'}}>
                    <ListItemText 
                        primaryTypographyProps={{fontSize: '20px'}} 
                        primary={welcomeText}/>
                </ListItem>
                <ListItem
                    sx={{textAlign: 'center', flexDirection:'column'}}>
                    <ListItemText 
                        primaryTypographyProps={{fontSize: '45px'}} 
                        primary="00:00:00"/>
                    <Stack flexDirection='row'>
                        <ListItemButton>Start</ListItemButton>
                        <ListItemButton>Stop</ListItemButton>
                    </Stack> 
                </ListItem>
            </List>
            <Divider />
            <Stack spacing={45}>
            <List>
                {['누적 학습 시간 랭킹', '캘린더', '나의 노트'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton component={Link} to={index === 0 ? '/mypage/rank' : index % 2 === 0 ? '/mypage' : '/mypage'}>
                        <ListItemIcon>
                            {index === 0 ? <MilitaryTechRoundedIcon /> : 
                            index % 2 === 0 ? <EditNoteRoundedIcon /> : <CalendarMonthRoundedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <List>
                {['Setting'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                    ))}
            </List>
            </Stack>
          </Stack>
        </div>
      );
    
    return(
        <Stack>
        <CssBaseline>
        <Drawer
          variant="permanent"
          open
          PaperProps={{
            sx: { width: "240px" },
          }}
          sx={{
            position: 'fixed',
            flexShrink: 0,
          }}>
          {drawer}
        </Drawer>
        </CssBaseline>
        </Stack>
    );
};

export default MySideNav;