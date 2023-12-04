import { React, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Table, TableContainer, TableCell, TableBody, TableHead, TableRow,
    Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Button,
} from '@mui/material';

export default function WorksForTeacher() {
    const { workId } = useParams();
    const [uploadedWorks, setUploadedWorks] = useState([]);
    const [submitData, setSubmitData] = useState([]);

    function getUploadedWorks() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/work?workId=${workId}`, { withCredentials: true }).then(data => {
            setUploadedWorks(data.data);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    function getSubmits() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/submits?workId=${workId}`, { withCredentials: true }).then((response) => {
            setSubmitData(response.data)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUploadedWorks();
        getSubmits()
    }, [workId])

    useEffect(() => {
        console.log('workId:', workId);
    }, [workId]);

    const navigate = useNavigate();
    const handleGoBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
    };

    return (
        <Stack
            sx={{
                // direction: 'column',
                // spacing: '10px',
                // marginTop: '100px',
                // marginLeft: '270px',
                // marginRight: '70px',
                // marginBottom: '200px',

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

            <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>📑 제출된 과제 확인하기</Typography>
            </Stack>
            <Stack sx={{ mb: 2, alignItems: 'flex-end' }}>
                <Button variant='outlined' sx={{ width: '20%' }} onClick={handleGoBack}>목록</Button>
            </Stack>
            <Stack sx={{ mb: 5 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="work-header"
                        sx={{ margin: '5px' }}
                    >
                        <Grid container spacing={0} sx={{ alignItems: 'center' }}>
                            <Grid item xs={10}>
                                <Typography variant='h6' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{uploadedWorks.title}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ paddingRight: '5px' }}>
                                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dayjs(uploadedWorks.createAt).format('YYYY-MM-DD hh:mm A')}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ whiteSpace: 'pre-line', margin: '5px' }}>
                        <Stack sx={{ mr: 2, ml: 2, mb: 2 }}>
                            <Typography variant='subtitile1' sx={{ fontWeight: 'bold' }}>🔔 과제 마감 기한 : {dayjs(uploadedWorks.dueDateTime).format('YYYY년 MM월 DD일 hh:mm A')}</Typography>
                        </Stack>
                        <Stack sx={{ mt: 2, mr: 2, ml: 2, mb: 3 }}>
                            <Typography variant='body1' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{uploadedWorks.description}</Typography>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>



            <TableContainer sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <Table sx={{ width: '100%' }} aria-label='works table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                                <Typography variant='subtitle1'>학생명</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                                <Typography variant='subtitle1'>과제명</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                                <Typography variant='subtitle1'>제출 날짜</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submitData.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">{item.User.nickName}</TableCell>
                                    <TableCell align="center"
                                        onClick={() => {
                                            navigate(`/mypage/classes/${item.id}/workdetail/teacher`);
                                        }}
                                        sx={{
                                            align: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 변경하고자 하는 배경 색상
                                            },
                                        }}>
                                        {item.title}
                                    </TableCell>
                                    <TableCell align="center">{dayjs(item.createdAt).format('YYYY-MM-DD hh:mm A')}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack >
    );
}

// assignment = [
// {
//     id:1,
//     topicId : 2,
//     title:'테스트1',
//     description:'테스트1내용',
//     dueDateTime: '2023-11-23T05:00:00.000Z',
//     createdAt: '2023-11-17T08:38:23.000Z'
// },
// {
//     id: 2,
//     topicId : 2,
//     title:'테스트2',
//     description:'테스트2내용',
//     dueDateTime: '2023-11-23T06:00:00.000Z',
//     createdAt: '2023-11-17T08:54:34.000Z'
// }
// ]