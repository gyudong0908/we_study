import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StudyProgress(){
    const students = ['이동규', '조정석', '최혜린'];

    return(
        <>
        <Typography variant="h4" component="span" sx={{mb:'2', fontWeight: 'bold', marginBottom:'15px', color:'#0091ea'}}>
            학습 진행 상황
        </Typography>
        {StudentTable(students)}
        </>
    );
}

function StudentTable(students){
    return(
        <TableContainer sx={{marginBottom:'30px'}}>
            <Table sx={{ width:'100%' }} aria-label='study progress table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>학생명</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>출결</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>과제 제출</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>퀴즈 제출</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {students.map((row) => (
                    <TableRow
                    key={row.index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="center">
                        {row}
                    </TableCell>
                    <TableCell align="center">{row}</TableCell>
                    <TableCell align="center">{row}</TableCell>
                    <TableCell align="center">{row}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudyProgress;