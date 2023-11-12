import React from 'react';
import {AppBar, Toolbar, Typography, Stack, Button} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import loginImg from '../../public/images/web_neutral_sq_SI@1x.png';

function LandingPage(){
    const handleClick =()=>{
        console.log('login success');
    };

    return(
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
            zIndex: (theme) => theme.zIndex.drawer +1
        }}>
            <Toolbar disableGutters width='100%'>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
                <Typography variant='h6' noWrap component='a' href='/mypage' sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'lobster',
                    fontWeight: 700,
                    color: '#0091ea',
                    textDecoration: 'none',
                    justifyContent: 'center',
                }}>WeStudy</Typography>

                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
                <Typography variant='h5' noWrap component='a' href='/mypage' sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'lobster',
                    fontWeight: 700,
                    color: '#0091ea',
                    textDecoration: 'none',
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
                            style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'}}/>
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
        졸려요
    </Stack>
);

export default LandingPage;