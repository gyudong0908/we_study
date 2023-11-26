import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Card, CardActions, CardContent, Button, Typography, Stack, Grid, TextField, Avatar } from '@mui/material';
import EditSubmitModal from '../../components/MyModal/EditSubmitModal';
import axios from 'axios';
import dayjs from 'dayjs';
import DeleteAlertModal from '../../components/MyModal/DeleteAlertModal';
import { useSelector } from 'react-redux';


export default function WorkDetailForStudent() {
    const { submitId } = useParams();
    const user = useSelector(state=>state.userData);
    const [submitData, setsubmitData] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [isMine, setIsMine] = useState(false);

    function getSubmitData() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${submitId}`, { withCredentials: true }).then(response => {
            if(response.data.userId === user.userData.id ){
                setIsMine(true);
            }
            setsubmitData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    function onClose() {
        setOpen(false);
    }

    useEffect(() => {
        if(user.userData){
            getSubmitData();
        }
    }, [user.userData])

    function onClickDelete(target) {
        axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${target.id}`, { withCredentials: true }).then(response => {
            navigate(-1);
        }).catch(err => {
            console.log(err);
        })
    }
    const navigate = useNavigate();
    const handleGoBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
    };

    return (
        <>
            {submitData.length !== 0 ?
                <Stack
                    sx={{
                        direction: 'column',
                        spacing: '10px',
                        marginTop: '100px',
                        marginLeft: '270px',
                        marginRight: '70px',
                        marginBottom: '200px'
                    }}>
                    <Stack sx={{ mb: 2, alignItems: 'flex-end' }}>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={handleGoBack}>목록</Button>
                    </Stack>
                    <Stack sx={{ mb: 5 }}>
                        <Card>
                            <CardContent sx={{ padding: '30px' }}>
                                <Grid container spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
                                    <Grid item><Avatar fontSize='large' src={submitData.User.downloadPath} /></Grid>
                                    <Grid item><Typography variant='h6'>{submitData.User.nickName}</Typography></Grid>
                                    <Grid item><Typography variant='caption'>{dayjs(submitData.updatedAt).format('YYYY-MM-DD hh:mm A')}</Typography></Grid>
                                </Grid>
                                <Stack sx={{ mt: 3, mb: 5 }}>
                                    <Typography variant='h5'>{submitData.title}</Typography>
                                    <Typography variant='body1' sx={{
                                        mt: 3,
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {submitData.content}
                                    </Typography>
                                </Stack>
                                <CardActions sx={{ justifyContent: 'flex-end', mb: 3 }}>
                                    <Button size="medium" href={submitData.downloadPath}>{submitData.fileName}</Button>
                                </CardActions>
                                {submitData.grade || !isMine ? null :
                                    <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                                        <Button variant='outlined' sx={{ width: '10%' }} onClick={() => { setAlertOpen(true) }}>삭제</Button>
                                        <Button variant='outlined' sx={{ width: '10%' }} onClick={() => { setOpen(true) }}>수정</Button>
                                    </Stack>
                                }
                            </CardContent>
                        </Card>
                    </Stack>
                    <CheckGrade submitData={submitData} />
                </Stack> : null}
            {
                open ? <EditSubmitModal
                    submitData={submitData}
                    setsubmitData={setsubmitData}
                    onClose={onClose}
                ></EditSubmitModal> : null
            }
            {
                alertOpen && (
                    <DeleteAlertModal
                        onClose={() => { setAlertOpen(); }}
                        deleteData={submitData}
                        onClickDelete={onClickDelete}
                    />)
            }
        </>
    );
}

function CheckGrade({ submitData}) {
    return (
        <Stack>
            <Card >
                <CardContent sx={{ padding: '30px' }}>
                    <Stack sx={{ mb: 2 }}>
                        <Typography variant='h4' sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>성적 확인하기</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', mb: 5 }}>
                        <Stack direction='column' sx={{ width: '35%', float: 'top' }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>점수</Typography>
                            <Stack sx={{ backgroundColor: 'lightgrey', padding: '30px', borderRadius: '5px', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography>{submitData.grade}</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='column' sx={{ width: '65%', }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>피드백</Typography>
                            <Stack sx={{ backgroundColor: 'lightgrey', padding: '30px', borderRadius: '5px', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography>{submitData.feedback}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}