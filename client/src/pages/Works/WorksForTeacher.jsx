import React from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow,
        Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Button,  } from '@mui/material';

export default function WorksForTeacher(){
    const assignment = {title:'과제1', content:'과제 내용입니다.'};
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
                            <Typography variant='h6'>{assignment.title}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{paddingRight:'5px'}}>
                            <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>2023년 11월 16일</Typography>
                        </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
                        <Typography variant='body1'>{assignment.content}</Typography>
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