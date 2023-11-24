import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import loginImg from '../../public/images/web_neutral_sq_SI@1x.png';

function LandingPage() {
    const handleClick = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_ADDRESS}/auth/google`;
    };

    return (
        <>
            <AppBar sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                height: '65px',
                width: '100%',
                padding: '8px 24px',
                borderBottomStyle: 'solid',
                borderBottomColor: '#E5EAF2',
                borderBottomWidth: 'thin',
                display: 'flex',
                justifyContent: 'center',
                position: 'fixed',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}>
                <Toolbar disableGutters width='100%'>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
                    <Typography variant='h6' noWrap component={Link} to='/mypage' sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'lobster',
                        textDecoration: 'none',
                        justifyContent: 'center',
                        fontWeight: 700,
                        background : 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent', 

                    }}>WeStudy</Typography>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
                    <Typography variant='h5' noWrap component={Link} to='/mypage' sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'lobster',
                        textDecoration: 'none',
                        fontWeight: 700,
                        background : 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent', 
                    }}>WeStudy</Typography>

                    <Stack
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'flex' },
                            flexDirection: 'row-reverse',
                            color: 'black',
                        }}>
                        <Button onClick={handleClick}>
                            <img src={loginImg} alt="Sign in with Google"
                                style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }} />
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            {body}
        </>
    );
};

const body = (
    <Stack sx={{
        direction: 'column',
        spacing: 'px',
        marginTop: '100px',
        padding: '0px 24px',
    }}>
        동규님께 이실직고 :
        지난주 목요일의 야심찼던 포부가 무색하게 이번 주말에는 프로그래밍은 거의 하지 않았읍니다.
        새벽에 열심히 하려고 했는데 지금 너무 졸려서 자야할 것 같읍니다^_ㅠ
        이번주 다시 열심히 해보도록 하겠읍니다 아자아자 파..파이팅(눈치)<br></br>
        &nbsp;&nbsp;&nbsp;댓글: 아닙니다... 제가 더 열심히 하면 되죠... ui는 망가질거 같지만 힘내 볼게요 ㅠㅠㅠㅠ(장난)
    </Stack>
);

export default LandingPage;