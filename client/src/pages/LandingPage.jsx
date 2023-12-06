import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import loginImg from '../../public/images/web_neutral_sq_SI@1x.png';
import logo from '../../public/images/logo.png';
import serviceInfo1 from '../../public/images/LP1.png';
import serviceInfo2 from '../../public/images/LP2.png';
import serviceInfo3 from '../../public/images/LP3.png';
import serviceInfo4 from '../../public/images/LP4.png';

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
                    <Stack sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: '30px', height: '30px' }}>
                        <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Stack>
                    <Typography variant='h6' noWrap component={Link} to='/mypage' sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'lobster',
                        textDecoration: 'none',
                        justifyContent: 'center',
                        fontWeight: 700,
                        background: 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',

                    }}>WeStudy</Typography>

                    <Stack sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: '30px', height: '30px' }}>
                        <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Stack>
                    <Typography variant='h5' noWrap component={Link} to='/mypage' sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'lobster',
                        textDecoration: 'none',
                        fontWeight: 700,
                        background: 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
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
    <Stack 
        spacing={10}
        sx={{
        direction: 'column',
        marginTop: '7rem',
        padding: '0px 20rem',
    }}>
        <img src={serviceInfo1} alt="serviceInfo1" style={{ maxWidth: '100%', height: 'auto' }} />
        <img src={serviceInfo2} alt="serviceInfo2" style={{ maxWidth: '100%', height: 'auto' }} />
        <img src={serviceInfo3} alt="serviceInfo3" style={{ maxWidth: '100%', height: 'auto' }} />
        <img src={serviceInfo4} alt="serviceInfo4" style={{ maxWidth: '100%', height: 'auto' }} />
    </Stack>
);

export default LandingPage;