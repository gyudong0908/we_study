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
        // height: 500,       
        background : 'linear-gradient(to bottom, #0091ea 25%, 75%, #6200ea)',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
        alignItems:'center',
        zIndex: '1',
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
                    <Stack sx={{ background: 'white', margin:'20px', height:'100%', borderRadius: '20px', width:'95%'}}>
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
                        color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>  
                    <Stack spacing={4} sx={{padding:'15px'}}>
                        <Stack direction='row' alignItems='center' spacing={5}>
                            <Avatar alt="Travis Howard" src={userData.downloadPath} sx={{width: 100, height:100}}/>          
                            <Stack direction={'column'} spacing={2}>
                                <Stack direction='row'>
                                    <Typography variant="h5" mr={5}>이름 _ {userData.nickName}</Typography>
                                    <Typography variant="h5">성별 _ {userData.gender}</Typography>
                                </Stack>
                                <Stack direction='row' spacing={5}>
                                    <Typography variant="h5">직업 _ {userData.job}</Typography>
                                    <Typography variant="h5">생년월일 _ {dayjs(userData.birthDay).format('YYYY/MM/DD')}</Typography>
                                </Stack>
                                <Typography variant="h5">이메일 _ {userData.email}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='column' spacing={2}>
                            <Typography variant="h5" xs={{wordBreak:'keep-all', wordWrap:'break-word'}}>📌 목표 _ {userData.goal}</Typography>
                            <Typography variant='h5' xs={{wordBreak:'keep-all', wordWrap:'break-word'}}>📌 한 줄 소개 _ {userData.aboutMe}</Typography>
                        </Stack>
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