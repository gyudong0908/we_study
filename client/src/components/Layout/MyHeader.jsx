import { useState, React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Stack, Typography, Toolbar, IconButton, Menu, Avatar, Tooltip, Badge, MenuItem} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CreateClassModal from '../MyModal/CreateClassModal';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import InvoteClassModal from '../MyModal/InvoteClassModal';
import { useSelector } from 'react-redux/es/hooks/useSelector';
  
  function MyHeader() {
    const userSettings = ['누적 학습 시간 랭킹', 'Calendar','Setting', 'Logout'];
    const classSettings = ['클래스 만들기', '클래스 참여하기'];
    const user = useSelector(state=>state.userData);
    const StyledBadge = styled(Badge)(({theme})=>({
        '& .MuiBadge-badge': {
            right: -3,
            top: 5,
            border: 0,
        },
      }));
      
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const [anchorElClass, setAnchorElClass] = useState(null);
    const handleOpenClassMenu = (event) => {
      setAnchorElClass(event.currentTarget);
    };
    const handleCloseClassMenu = () => {
      setAnchorElClass(null);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
    setIsModalOpen(true);
    handleCloseClassMenu();
    };
    const [isInvoteModalOpen, setIsInvoteModalOpen] = useState(false);
    const handleOpenInvoteModal = () => {
      setIsInvoteModalOpen(true);
      handleCloseClassMenu();
      };
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setIsInvoteModalOpen(false);
    }

    const mypageTool = (
      <>
        <Tooltip title="Open classes">
          <IconButton aria-label='open class' onClick={handleOpenClassMenu}>
            <StyledBadge>
              <AddRoundedIcon fontSize='medium'/>
            </StyledBadge>
          </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElClass}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
            open={Boolean(anchorElClass)}
            onClose={handleCloseClassMenu}
          >
              <MenuItem key={classSettings[0]} onClick={handleOpenModal}>
                <Typography textAlign="center">{classSettings[0]}</Typography>
              </MenuItem>
              <MenuItem key={classSettings[1]} onClick={handleOpenInvoteModal}>
                <Typography textAlign="center">{classSettings[1]}</Typography>
              </MenuItem>
        </Menu>
        {isModalOpen && <CreateClassModal open={isModalOpen} handleClose={handleCloseModal} />}
        {isInvoteModalOpen && <InvoteClassModal open={isInvoteModalOpen} handleClose={handleCloseModal} />}
      </>
    );

    return (
        <header>
          <CssBaseline />
          <AppBar
              sx={{
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
                <Typography variant="h6" noWrap component={Link} to='/mypage'
                  sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'lobster',
                      fontWeight: 700,
                      background : 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent', 
                      textDecoration: 'none',
                      justifyContent: 'center',
                  }}>WeStudy</Typography>
                
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none', color:'black' }, mr: 1 }} />
                <Typography variant="h5" noWrap component={Link} to='/mypage'
                  sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'lobster',
                      fontWeight: 700,
                      background : 'linear-gradient(to bottom, #0091ea 35%, #6200ea)',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent', 
                      textDecoration: 'none',
                  }}>WeStudy</Typography>

                <Stack 
                    sx={{
                        flexGrow: 1, 
                        display: { xs: 'flex', md: 'flex' },
                        padding: '8px 16px',
                        flexDirection: 'row-reverse',
                    }}>
                  <Tooltip title="Check alarms">
                    <IconButton aria-label='alarm'>
                      <StyledBadge variant='dot' color='error'>
                        <NotificationsRoundedIcon fontSize='medium'/>
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                  {location.pathname.includes('/classes') ? (
                    <IconButton aria-label='home' component={Link} to='/mypage' >
                      <HomeRoundedIcon fontSize='medium' />
                    </IconButton>
                  ) : mypageTool}
                </Stack>
                
  
                <Stack sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={(user.userData)?user.userData.downloadPath:''} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userSettings.map((setting, index) => (
                      <MenuItem key={index} onClick={handleCloseUserMenu}
                        component={Link} to={index === 0 ? '/mypage/rank' : 
                          index === 1 ? '/mypage/calender' : 
                          index ===2 ? '/mypage/setting' : 'http://localhost:8081/logout'}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
            </Toolbar>
          </AppBar>
      </header>
    );
  }
  export default MyHeader;