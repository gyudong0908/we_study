import {React, useState, useEffect} from 'react';
import { Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StudyProgress({progress, setProgress}){
    const students = ['이동규', '조정석', '최혜린'];
    console.log('another:',progress[1]['Curriculums.Works.Submits.User.nickName']);

    return(
        <>
        <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
            <Typography variant='h4' sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}} >학습 진행 상황</Typography>
        </Stack>
        {StudentTable(progress)}
        </>
    );
}

function StudentTable({progress}){
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // progress가 변경될 때마다 nickNames를 업데이트
      const nickNames = progress.map((data) => (
        data['Curriculums.Works.Submits.User.nickName'] || ''
      ));
      setUsers(nickNames);
    }, [progress]);
    console.log('users:', users);

    return(
        <TableContainer sx={{marginBottom:'30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Table sx={{ width:'100%' }} aria-label='study progress table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>학생명</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>출결</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>제출된 과제 수</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>미제출 과제 수</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>퀴즈 제출률</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user)=>{
                            return(
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{user}</TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                </TableRow>
                            );
                        })
                    }
                    
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudyProgress;