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

    const [timer, setTimer] = useState(0); // 위에 있는 타이머
    const [timerRunning, setTimerRunning] = useState(false);

    const [currentStudyTime, setCurrentStudyTime] = useState(0); // 아래에 있는 타이머
    const [resetDisabled, setResetDisabled] = useState(false); // Reset 버튼 활성/비활성 상태

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

    // Reset 버튼을 눌렀을 때 실행되는 함수
    const handleResetTime = () => {
        setCurrentStudyTime((prevStudyTime) => prevStudyTime + timer);
        setTimer(0);
        sessionStorage.removeItem('startTime');
        sessionStorage.removeItem('timer');




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
            setStartClicked(false);
            setStopDisabled(true);
            setTimer(parseInt(storedTimer, 10));
            setTimerRunning(false);
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

    useEffect(() => {
        const storedCurrentStudyTime = sessionStorage.getItem('currentStudyTime');
        if (storedCurrentStudyTime !== null) {
            setCurrentStudyTime(parseInt(storedCurrentStudyTime, 10));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('currentStudyTime', String(currentStudyTime));
    }, [currentStudyTime]);


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


        axios.post(`http://localhost:8081/rank`, { startTime: startTime }, { withCredentials: true })
            .then((response) => {
                console.log('시작 시간이 업데이트되었습니다.');
            })
            .catch((error) => {
                console.log('여긴 에러')
                console.error('시작 시간 업데이트 중 오류가 발생했습니다:', error);
            });
    };

    const handleStopTime = () => {
        const stopTime = new Date();
        sessionStorage.removeItem('startTime');
        sessionStorage.setItem('timer', timer);

        setStartClicked(false);
        setStopDisabled(true);
        setTimerRunning(false);


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
                            primary={formatTime(timer)} />
                        <Stack flexDirection='row'>
                            <ListItemButton onClick={() => {
                                handleStartTime();

                            }}
                                disabled={startClicked}
                            >Start</ListItemButton>

                            <ListItemButton
                                onClick={handleResetTime}
                                disabled={false}  //Reset 버튼 항상 활성화
                            >
                                Reset
                            </ListItemButton>


                            <ListItemButton
                                onClick={() => {
                                    handleStopTime();

                                }}
                                disabled={stopDisabled}

                            >Stop</ListItemButton>
                        </Stack>




                        <Typography variant="body1" gutterBottom sx={{
                            mt:5, color:'#0091ea', fontWeight:'bold'
                        }}>
                            오늘의 누적 학습 시간
                        </Typography>
                        {/* 아래에 있는 타이머 */}
                        <Typography variant="h4" gutterBottom>
                            {formatTime(currentStudyTime)}
                        </Typography>

                    </ListItem>
                </List>
                <Divider />
                <Stack>
                    <List>
                        {['누적 학습 시간 랭킹', '캘린더', '프로필 설정'].map((text, index) => (
                            <ListItem key={index} disablePadding sx={{ paddingTop: '0.2rem', paddingBottom: '0.2rem' }} >
                                <ListItemButton component={Link}
                                    to={index === 0 ? '/mypage/rank' :
                                        index === 1 ? '/mypage/calender' :
                                            index === 2 ? '/mypage/setting' : '/mypage'}>
                                    <ListItemIcon sx={{ paddingLeft: '0.5rem' }}>
                                        {index === 0 ? <MilitaryTechRoundedIcon /> :
                                            index === 1 ? <CalendarMonthRoundedIcon /> :
                                                <SettingsRoundedIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
                        {classDatas.map((classData, index) => (
                            <ListItem key={index} disablePadding sx={{ paddingTop: '0.2rem', paddingBottom: '0.2rem' }}>
                                <ListItemButton onClick={() => { navigate(`/mypage/classes/${classData.id}`) }}>
                                    <ListItemIcon sx={{ paddingLeft: '0.5rem' }}>
                                        <SchoolRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText sx={{ wordBreak: 'keep-all' }} primary={classData.title} />
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
                        sx: {
                            width: "270px",
                            backgroundColor: '#fff',
                            zIndex: '1',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            paddingBottom: '1.5rem',
                            paddingTop: '1rem',
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