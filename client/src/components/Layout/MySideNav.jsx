import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CssBaseline, Typography } from '@mui/material';
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

    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false); // 타이머가 실행 중인지 여부

    const [startClicked, setStartClicked] = useState(false);
    const [stopDisabled, setStopDisabled] = useState(true);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };


    useEffect(() => {
        const startTimeFromStorage = sessionStorage.getItem('startTime');
        const storedTimer = sessionStorage.getItem('timer');

        if (startTimeFromStorage !== null) {
            const currentTime = new Date().getTime(); // 현재 시간을 가져옵니다.
            const timeDifferenceInSeconds = Math.floor((currentTime - startTimeFromStorage) / 1000);

            setStartClicked(true);
            setStopDisabled(false);
            setTimer(timeDifferenceInSeconds);
            setTimerRunning(true);
        } else if (storedTimer !== null) {
            setStartClicked(false);  //임시로 false로 바꿈
            setStopDisabled(true);    //임시로 true로 바꿈
            setTimer(parseInt(storedTimer, 10));
            setTimerRunning(false);  //임시로 false로 바꿈
        }
    }, []);

    useEffect(() => {
        let intervalId;

        if (timerRunning) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        else {
            clearInterval(intervalId); // 타이머가 멈추면 interval을 지웁니다.
        }

        return () => clearInterval(intervalId);
    }, [timerRunning]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const welcomeText = <div>✍️ 시작해볼까요?<br />{user.userData === undefined ? '' : user.userData.nickName + '님'}</div>

    function getClassData() {

        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/classes`, { withCredentials: true }).then((data) => {
            dispatch(setClassCards(data.data));
        }).catch(err => {
            console.log(err);
        })
    }


    const handleStartTime = () => {
        const storedTimer = sessionStorage.getItem('timer');
        const startTime = new Date(); // 현재 시각을 가져옵니다.

        const timeDifference = storedTimer !== null ? parseInt(storedTimer, 10) : 0;
        sessionStorage.setItem('startTime', startTime.getTime() - (timeDifference * 1000));

        setStartClicked(true);
        setStopDisabled(false);
        setTimerRunning(true);

        // 서버에 데이터를 업데이트하는 요청을 보냅니다.
        axios.post(`http://localhost:8081/rank`, { startTime: startTime }, { withCredentials: true })
            .then((response) => {
                // 업데이트 성공 시 처리 로직
                console.log('시작 시간이 업데이트되었습니다.');
            })
            .catch((error) => {
                // 에러 처리 로직
                console.log('여긴 에러')
                console.error('시작 시간 업데이트 중 오류가 발생했습니다:', error);
            });
    };

    const handleStopTime = () => {
        const stopTime = new Date(); // Stop 버튼을 눌렀을 때의 현재 시각을 가져옵니다.
        sessionStorage.removeItem('startTime');
        sessionStorage.setItem('timer', timer);

        setStartClicked(false);
        setStopDisabled(true);
        setTimerRunning(false);

        // 서버에 데이터를 업데이트하는 요청을 보냅니다.
        axios.post(`http://localhost:8081/rank/stop`, { stopTime: stopTime }, { withCredentials: true })
            .then((response) => {
                console.log('종료 시간이 업데이트되었습니다.');
                console.log(response.data)
            })
            .catch((error) => {
                console.error('종료 시간 업데이트 중 오류가 발생했습니다:', error);
            });
    };

    useEffect(() => {
        getClassData();
    }, [])

    const drawer = (
        <div>
            <Toolbar />
            <Stack>
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
                            // primary="00:00:00" />
                            primary={formatTime(timer)} />
                        <Stack flexDirection='row'>
                            <ListItemButton onClick={() => {
                                handleStartTime();

                            }}
                                disabled={startClicked}
                            >Start</ListItemButton>
                            <ListItemButton
                                onClick={() => {
                                    handleStopTime();

                                }}
                                disabled={stopDisabled}

                            >Stop</ListItemButton>
                        </Stack>
                    </ListItem>
                </List>
                <Divider />
                <Stack>
                    <List>
                        {['누적 학습 시간 랭킹', '캘린더', '프로필 설정'].map((text, index) => (
                            <ListItem key={index} disablePadding sx={{paddingTop:'0.2rem', paddingBottom:'0.2rem'}} >
                                <ListItemButton component={Link}
                                    to={index === 0 ? '/mypage/rank' : 
                                        index === 1 ? '/mypage/calender' : 
                                        index === 2 ? '/mypage/setting' : '/mypage'}>
                                    <ListItemIcon sx={{paddingLeft:'0.5rem'}}>
                                        {index === 0 ? <MilitaryTechRoundedIcon /> :
                                            index === 1 ? <CalendarMonthRoundedIcon /> : 
                                            <SettingsRoundedIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{marginTop:'0.5rem', marginBottom:'0.5rem'}}/>
                        {classDatas.map((classData, index) => (
                            <ListItem key={index} disablePadding sx={{paddingTop:'0.2rem', paddingBottom:'0.2rem'}}>
                                <ListItemButton onClick={() => { navigate(`/mypage/classes/${classData.id}`) }}>
                                    <ListItemIcon sx={{paddingLeft:'0.5rem'}}>
                                        <SchoolRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{wordBreak:'keep-all'}} primary={classData.title} />
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
                        sx:{ 
                            width: "270px",
                            backgroundColor:'#fff',
                            zIndex: '1',
                            overflowX:'hidden',
                            overflowY:'auto',
                            paddingBottom:'1.5rem',
                            paddingTop:'1rem',
                            // paddingRight:'0.3rem',
                            // paddingLeft: '0.5rem',
                        },
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