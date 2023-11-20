import { React, useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow,
        Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Button,  } from '@mui/material';

export default function WorksForTeacher(){
    const assignmentss = {title:'과제1', content:'과제 내용입니다.'};
    const workData = [
        {
            id:1,
            name:'이동규',
            title:'과제 제출합니다.',
            content:'제출 과제에 대한 세부 설명입니다.',
            date:'2023.11.16.'
        },
        {
            id:2,
            name:'최혜린',
            title:'과제 제출!!!',
            content:'제출 과제에 대한 세부 설명입니다.',
            date:'2023.11.17.'
        },
    ];

    const { topicId, assignmentId } = useParams();
    const location = useLocation();
  const { state } = location;
  const current = state ? state.assignment : [];
  const selectedAssignment = current.find((one) => one.id === parseInt(assignmentId, 10));

    useEffect(() => {
        // topicId와 assignmentId를 사용하여 필요한 데이터를 가져오거나 처리합니다.
        console.log('topicId:', topicId);
        console.log('assignmentId:', assignmentId);
    
        // TODO: 필요한 데이터를 가져오거나 처리하는 로직을 작성합니다.
      }, [topicId, assignmentId]);

    return(
        <Stack
            sx={{
                direction: 'column',
                spacing: '10px',
                marginTop: '100px',
                marginLeft: '270px',
                marginRight: '70px'
            }}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
                <Typography variant="h4" component="span" sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}}>📎 제출된 과제 확인하기</Typography>
            </Stack>
            <Stack sx={{mb:5}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="work-header">
                        <Grid container spacing={0} sx={{ alignItems:'center'}}>
                        <Grid item xs={6}>
                            <Typography variant='h6'>{selectedAssignment.title}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{paddingRight:'5px'}}>
                            <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>2023년 11월 16일</Typography>
                        </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
                        <Typography variant='body1'>{selectedAssignmentt.content}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Stack>

            <TableContainer sx={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Table sx={{ width:'100%' }} aria-label='works table'>
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
                {workData.map((item) => {
                    return(
                    <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="center">{item.name}</TableCell>
                    <TableCell align="center" sx={{
                            align:'center', 
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 변경하고자 하는 배경 색상
                            },}}>
                        <Link to="/mypage/classes/:classId/workdetail" style={{textDecoration:'none', color:'black'}}>
                            {item.title}
                        </Link>
                    </TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </Stack>
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