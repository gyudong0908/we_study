import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem,
  Paper, Divider } from '@mui/material';
import { Typography, Stack, Box } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function QuizGradeTable({ quizzes, setQuizzes }) {
  const [selectedUser, setSelectedUser] = useState('학생명');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [sumGrade, setSumgrade] = useState();
  let [count, setCount] = useState(0);

  let uniqueUsers = new Set(quizzes.map((quiz) => quiz.nick_name));
  console.log('uniqueUsers:', uniqueUsers);

  React.useEffect(() => {
    let sum = 0;
    quizzes.forEach((quiz) => {
      if (!selectedUser || selectedUser === "학생명") {
        sum += quiz.grade;
        count += 1;
      } else if (selectedUser === quiz.nick_name) {
        sum += quiz.grade;
        count += 1;
      }
    });
  
    setSumgrade(sum);
    setCount(count);
    
  }, [selectedUser]);
  
  
  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer sx={{ maxHeight: 440, }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}>
                <Select value={selectedUser} onChange={(e) => { setSelectedUser(e.target.value) }}>
                  <MenuItem value="학생명">학생명</MenuItem>
                  {
                    [...uniqueUsers].map((user, idx) => (
                      <MenuItem key={idx} value={user}>
                        {user}
                      </MenuItem>
                    ))
                  }
                </Select>
              </TableCell>
              <TableCell sx={{ width: 200, textAlign: 'center', whiteSpace:'pre-line', textOverflow:'ellipsis' }}>
                퀴즈명
              </TableCell>
              <TableCell sx={{ width: 200, textAlign: 'center' }}>
                제출시간
              </TableCell>
              <TableCell sx={{ width: 100, textAlign: 'center', justifyContent:'center' }}>
                성적
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 선택한 유저에 맞는 데이터 렌더링 */}
            {quizzes.length !== 0 ?
              quizzes.map((quiz) => {
                if (!selectedUser|| selectedUser === '학생명') {
                  return (
                    <>
                      <TableRow key={quiz.id}>
                        <TableCell>{quiz.nick_name}</TableCell>
                        <TableCell>{quiz.title}</TableCell>
                        <TableCell sx={{textAlign: 'center', wordBreak:'keep-all'}}>{dayjs(quiz.updatedAt).format('YYYY-MM-DD hh:mmA')}</TableCell>
                        <TableCell>{quiz.grade}</TableCell>
                      </TableRow>
                    </>
                  );
                } else if (selectedUser === quiz.nick_name) {
                  return (
                    <>
                      <TableRow key={quiz.id}>
                        <TableCell>{quiz.nick_name}</TableCell>
                        <TableCell>{quiz.title}</TableCell>
                        <TableCell>
                          <Typography sx={{ wordBreak:'keep-all', textAlign: 'center' }}>{dayjs(quiz.updatedAt).format('YYYY-MM-DD hh:mmA')}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ textAlign: 'center',}}>{quiz.grade}</Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                }
              }) : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider variant='large' />
      <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', padding: '15px' }}>
        <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Average</Typography>
        <Typography sx={{ mr: 1, fontWeight: 'bold' }}>{(sumGrade / count).toFixed(1)} 점</Typography>
      </Stack>
    </Paper>
  );
  
}