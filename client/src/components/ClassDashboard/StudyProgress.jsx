import {React, useState, useEffect} from 'react';
import { Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function StudyProgress({progress, setProgress}){

    return(
        <>
        <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
            <Typography variant='h4' sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}} >학습 진행 상황</Typography>
        </Stack>
        <StudentTable progress = {progress} />
        </>
    );
}

function StudentTable({progress}){
    const [users, setUsers] = useState([]);
    const [totalWorks, setTotalWorks] = useState([]);
    const [totalSubmits, setTotalSubmits] = useState([]);
    const combinedArray = [{
        users: users, 
        totalWorks: totalWorks,
        totalSubmits: totalSubmits,
    }];

    useEffect(() => {
        // progress가 변경될 때마다 nickNames를 업데이트
        const nickNames = progress.map((data) => (
            data['Curriculums.Works.Submits.User.nickName'] || ''
        ));
        const countWorks = progress.map((data)=>(
            data['Curriculums.Works.id'] || ''
        ));

       // 중복값 제거
        const uniqueNickNames = Array.from(new Set(nickNames));
        setUsers(uniqueNickNames);
        const uniqueCountWorks = Array.from(new Set(countWorks));
        setTotalWorks(uniqueCountWorks);
    }, [progress]);
    // console.log('users:', users);
    // console.log('totalWorksId:', totalWorks);
    // console.log('combined:', combinedArray);
    
    useEffect(()=>{
        const submitsCounts = {};
        progress.forEach((item) => {
        const nickName = item['Curriculums.Works.Submits.User.nickName'];
          if (submitsCounts[nickName]) {
            submitsCounts[nickName] += item.countSubmits;
          } else {
            submitsCounts[nickName] = item.countSubmits;
          }
        });
        setTotalSubmits(
            Object.entries(submitsCounts).map(([nickName, count]) => ({ nickName, count }))
          );
    }, [progress]);
    // console.log('nickNameCounts:', totalSubmits);
    

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
                        combinedArray.map((data, index) => (
                            data.users.map((user, userIndex) => {
                                // 이 부분 추가 했습니다.
                                // user가 '' 일때도 들어가 있으니까 만약 user가 ''이면 바로 return을 시켜서 다음 map으로 돌아가게 했습니다!
                            if(user === ''){
                                return
                            }
                            const countTotalWorks = data.totalWorks.length;
                            const matchingSubmits = data.totalSubmits.find(submit => submit.nickName === user);
                            // 이 부분 바꿨습니다
                            // const countTotalSubmits = matchingSubmits.count;                            
                            
                            return(
                                <TableRow key={`${index}-${userIndex}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{user}</TableCell>
                                    <TableCell align="center">
                                        {matchingSubmits ? (
                                            <>
                                            {/* 밑의  countTotalSubmits를 matchingSubmits.count로 바꿨습니다*/}
                                                {matchingSubmits.count}/{countTotalWorks} ({(matchingSubmits.count / countTotalWorks * 100).toFixed(1)}%)
                                            </>
                                        ) : (
                                            0
                                        )}
                                    </TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                    <TableCell align="center">ㅇㅇㅇ</TableCell>
                                </TableRow>
                            )
                            })
                        ))
                    }
                    
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudyProgress;