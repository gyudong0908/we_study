import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CssBaseline } from '@mui/material';
import axios from 'axios';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { useSelector, useDispatch } from 'react-redux';
import { setClassCards, deleteClassCards } from '../../reducer/classCardsSlice';


function MySideNav() {
    const classDatas = useSelector((state) => state.classCards);
    const user = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const welcomeText = <div>✍️ 시작해볼까요?<br />{user.userData === undefined ? '' : user.userData.nickName + '님'}</div>

    function getClassData() {
        axios.get('http://localhost:8081/classes', { withCredentials: true }).then((data) => {
            dispatch(setClassCards(data.data));
        }).catch(err => {
            console.log(err);
        })
    }

    const handleStartTime = () => {
        const startTime = new Date(); // 현재 시각을 가져옵니다.
        const class_Id = 1; // 예시로 클래스 ID를 1로 가정합니다. 실제 ID에 맞게 변경해주세요.

        // 서버에 데이터를 업데이트하는 요청을 보냅니다.
        axios.put('http://localhost:5173/mypage/rank', { start_time: startTime }, { withCredentials: true })
            .then((response) => {
                // 업데이트 성공 시 처리 로직
                console.log('시작 시간이 업데이트되었습니다.');
            })
            .catch((error) => {
                // 에러 처리 로직
                console.error('시작 시간 업데이트 중 오류가 발생했습니다:', error);
            });
    };


    useEffect(() => {
        getClassData();
    }, [])

    const drawer = (
        <div>
            <Toolbar />
            <Stack sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem
                        sx={{ textAlign: 'center' }}>
                        <ListItemText
                            primaryTypographyProps={{ fontSize: '20px' }}
                            primary={welcomeText} />
                    </ListItem>
                    <ListItem
                        sx={{ textAlign: 'center', flexDirection: 'column' }}>
                        <ListItemText
                            primaryTypographyProps={{ fontSize: '45px' }}
                            primary="00:00:00" />
                        <Stack flexDirection='row'>
                            <ListItemButton onClick={handleStartTime}>Start</ListItemButton>
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
                                <ListItemButton onClick={() => { navigate(`/mypage/classes/${classData.id}`) }}>
                                    <ListItemIcon>
                                        <SchoolRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={classData.title} />
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

    return (
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