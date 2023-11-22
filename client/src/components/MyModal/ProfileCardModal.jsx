import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import dayjs from 'dayjs';
import { Dialog, Avatar, Stack } from '@mui/material';

export default function ProfileCardModal({open, handleClose, userId}){
    const [userData, setUserData] = React.useState({});
    function getUserData(){
        axios.get(`http://localhost:8081/userinfo?userId=${userId}`, { withCredentials: true }).then((response)=>{
            console.log(1)
            setUserData(response.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    React.useEffect(()=>{
        if(open){
            getUserData();
        }
    },[open])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 500,
        // background: 'none',        
        background : 'linear-gradient(to bottom, #0091ea 25%, 75%, #6200ea)',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
      };
    return (
        <>
        {
            userData.id?
            <React.Fragment>
                {open?
                    <Stack
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    sx={style}
                    >
                    <Stack sx={{ background: 'white', margin: '20px', height:'100%', borderRadius: '20px', }}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Profile
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'black',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>  
                    <Stack spacing={4}>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Avatar alt="Travis Howard" src={userData.downloadPath} sx={{width: 100, height:100}}/>          
                        <Stack direction='row' spacing={4}>
                            <Typography variant="h5">이름: {userData.nickName}</Typography>
                            <Typography variant="h5">생년월일: {dayjs(userData.birthDay).format('YYYY년MM월DD일')}</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="h5">직업: {userData.job}</Typography>
                        <Typography variant="h5">성별: {userData.gender}</Typography>
                        <Typography variant="h5">이메일: {userData.email}</Typography>
                    </Stack>
                    <Typography variant="h5">목표: {userData.goal}</Typography>
                    </Stack>
                    </DialogContent>
                    </Stack>
                </Stack>:null
            }

          </React.Fragment>: null
        }
        </>
      )
}