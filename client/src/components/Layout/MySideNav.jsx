import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Stack, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CssBaseline} from '@mui/material';
import axios from 'axios';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';


function MySideNav(){
    const [classDatas, setClassDatas] = useState([]);
    const welcomeText = <div>✍️ 시작해볼까요?<br />최혜린님</div>

    function getClassData() {
        axios.get('http://localhost:8081/classes',{ withCredentials: true }).then((data)=>{
            setClassDatas(data.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getClassData();
    },[])

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
                {['누적 학습 시간 랭킹', '캘린더'].map((text, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to={index === 0 ? '/mypage/rank' : index === 1 ? '/mypage/calender' : '/mypage'}>
                        <ListItemIcon>
                            {index === 0 ? <MilitaryTechRoundedIcon /> : 
                            index === 1 ? <CalendarMonthRoundedIcon /> : <SchoolRoundedIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
                {classDatas.map((classData, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton href= {`http://localhost:5173/mypage/classes/${classData.id}`}>
                        <ListItemIcon>
                            <SchoolRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={classData.title}/>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <List>
                {['Setting'].map((text, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to='/mypage/setting'>
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