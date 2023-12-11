import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Card, CardActions, CardContent, Button, Typography, Stack, Grid, TextField, Avatar } from '@mui/material';
import EditSubmitModal from '../../components/MyModal/EditSubmitModal';
import axios from 'axios';
import dayjs from 'dayjs';
import DeleteAlertModal from '../../components/MyModal/DeleteAlertModal';


export default function WorkDetail() {
    const { submitId } = useParams();
    const [submitData, setsubmitData] = useState([]);
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    function getSubmitData() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${submitId}`, { withCredentials: true }).then(response => {
            console.log(response.data)
            setsubmitData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    function onClose() {
        setOpen(false);
    }

    useEffect(() => {
        getSubmitData();
    }, [])
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
                        // direction: 'column',
                        // spacing: '10px',
                        // marginTop: '100px',
                        // marginLeft: '270px',
                        // marginRight: '70px',
                        // marginBottom: '200px'
                        // direction: 'column',
                        // marginTop: '115px',
                        // marginLeft: '320px',
                        // marginRight: '50px',
                        // marginBottom: '150px',
                        direction:'column',
                        marginTop:'115px',
                        marginLeft:'20rem',
                        marginRight:'10rem',
                        marginBottom:'10rem'
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
                                {submitData.grade ? null :
                                    <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                                        <Button variant='outlined' sx={{ width: '10%' }} onClick={() => { setAlertOpen(true) }}>삭제</Button>
                                        <Button variant='outlined' sx={{ width: '10%' }} onClick={() => { setOpen(true) }}>수정</Button>
                                    </Stack>
                                }
                            </CardContent>
                        </Card>
                    </Stack>
                    <InputGrade submitData={submitData} setsubmitData={setsubmitData} submitId={submitId} />
                    <CheckGrade submitData={submitData} submitId={submitId} setsubmitData={setsubmitData} />
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

function InputGrade({ submitData, setsubmitData, submitId }) {
    const [grade, setGrade] = useState();
    const [feedback, setFeedback] = useState('');
    function onSave(editData) {
        axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${submitId}`, editData, { withCredentials: true }).then(() => {
            if (editData.feedback) {
                setFeedback('');
            } else if (editData.grade) {
                setGrade('');
            }
            setsubmitData({ ...submitData, ...editData });
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Stack sx={{ mb: 5 }}>
            <Card>
                <CardContent sx={{ padding: '30px' }}>
                    <Stack sx={{ mb: 2 }}>
                        <Typography variant='h4' sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>성적 입력하기</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', mb: 5 }}>
                        <TextField
                            id="outlined-number"
                            label="점수를 입력하세요."
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => { setGrade(e.target.value) }}
                            value={grade}
                            sx={{ width: '35%' }}
                        />
                        <TextField
                            id="outlined-multiline"
                            label="피드백을 입력하세요."
                            multiline
                            rows={5}
                            placeholder="학생 과제의 잘한 점, 보완해야할 점 등"
                            onChange={(e) => { setFeedback(e.target.value) }}
                            value={feedback}
                            sx={{ width: '65%' }}
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={() => { onSave({ grade: grade }) }}>성적 저장</Button>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={() => { onSave({ feedback: feedback }) }}>피드백 저장</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}

function CheckGrade({ submitData, submitId, setsubmitData }) {
    function initData(initData) {
        axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/submit?submitId=${submitId}`, initData, { withCredentials: true }).then(() => {
            setsubmitData({ ...submitData, ...initData });
        }).catch(err => {
            console.log(err);
        })
    }
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
                    <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={() => { initData({ grade: null }) }}>성적 초기화</Button>
                        <Button variant='outlined' sx={{ width: '20%' }} onClick={() => { initData({ feedback: '' }) }}>피드백 초기화</Button>

                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}