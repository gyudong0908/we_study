import {React, useState, useEffect} from 'react';
import { Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';

function StudyProgress({progress}){

    return(
        <>
        <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
            <Typography variant='h4' sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}} >학습 진행 상황</Typography>
        </Stack>
        <StudentTable progress = {progress}/>
        </>
    );
}

function StudentTable({progress}){

    return(
        <TableContainer sx={{marginBottom:'30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Table sx={{ width:'100%' }} aria-label='study progress table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>학생명</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>과제 제출</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>출석률</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>퀴즈 제출</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {
                            progress.map((item, index)=>{
                                return(
                                    <TableRow key={`${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center" scope='row' component={'th'}>
                                            <Typography variant='subtitle1'>{item.nickName}</Typography>                                        
                                        </TableCell>
                                        <TableCell align="center" scope='row' component={'th'}>
                                            <Typography variant='subtitle1'>{item.countSubmits}</Typography>                                        
                                        </TableCell>
                                        <TableCell align="center" scope='row' component={'th'}>
                                            <Typography variant='subtitle1'>{item.totalAttendance +'/'+ dayjs().daysInMonth()}</Typography>                                        
                                        </TableCell>
                                        <TableCell align="center" scope='row' component={'th'}>
                                            <Typography variant='subtitle1'>{item.countQuiz}</Typography>                                        
                                        </TableCell>
                                    </TableRow>                    
                                )
                            })
                        }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudyProgress;