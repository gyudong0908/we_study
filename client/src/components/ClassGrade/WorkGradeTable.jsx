import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem,
  Paper, Divider } from '@mui/material';
import { Typography, Stack, Box } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';

// const columns = [
//   { id: "topic", label: '단원명', width: 150 },
//   { id: "workTitle", label: '과제명', width: 700 },
//   { id: "dueDateTime", label: '제출시간', width: 100 },
//   { id: "grade", label: '성적', width: 100 },
// ];

function createData(name, topic, workTitle, dueDateTime, grade) {
  return { name, topic, workTitle, dueDateTime };
}

export default function WorkGradeTable({ curriculums, setCurriculums }) {
  const [selectedUser, setSelectedUser] = useState('학생명');
  const [selectedCurriculum, setSelectedCurriculum] = useState('커리큘럼');
  const [sumGrade, setSumgrade] = useState();
  const [count, setCount] = useState();

  
  const uniqueUsers = new Set(
    curriculums.flatMap((curriculum) =>
      curriculum.Works.flatMap((work) =>
        work.Submits.map((submit) => submit.User.nickName)
      )
    )
  );

  React.useEffect(() => {
    // 여기서 selectedUser 또는 selectedCurriculum이 변경될 때 성적의 합계를 계산합니다.
    let sum = 0;
    let count = 0;

    curriculums.map((curriculum) => {
      if (selectedCurriculum && curriculum.title !== selectedCurriculum) {
        return null;
      }
      return curriculum.Works.map((work) =>
        work.Submits.map((submit) => {
          if (!selectedUser) {
            sum += submit.grade;
            count +=1
          } else if (selectedUser === submit.User.nickName) {
            sum += submit.grade;
            count +=1
          }
        }
        )
      )
    }
    )

    setSumgrade(sum);
    setCount(count);
  }, [[],selectedUser, selectedCurriculum]);

  return (
    <Paper sx={{ width: '100%', overflow: 'auto',}}>
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
              <TableCell sx={{ width: 150 }}>
                <Select value={selectedCurriculum} onChange={(e) => { setSelectedCurriculum(e.target.value) }}>
                  <MenuItem value="커리큘럼">커리큘럼</MenuItem>
                  {curriculums.map((curriculum) => (curriculum.Works.length !== 0 ?
                    <MenuItem key={curriculum.id} value={curriculum.title}>
                      {curriculum.title}
                    </MenuItem> : null
                  ))}
                </Select>
              </TableCell>
              <TableCell sx={{ width: 200, textAlign:'center', }}>
                과제명
              </TableCell>
              <TableCell sx={{ width: 200, textAlign:'center' }}>
                제출시간
              </TableCell>
              <TableCell sx={{ width: 100, textAlign:'center', justifyContent:'center' }}>
                성적
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 선택한 유저에 맞는 데이터 렌더링 */}
            {curriculums.length !== 0 ?
              curriculums.map((curriculum) => {
                if (selectedCurriculum && curriculum.title !== selectedCurriculum && selectedCurriculum !== '커리큘럼') {
                  return null;
                }
                return curriculum.Works.map((work) =>
                  work.Submits.map((submit) => {
                    if (!selectedUser|| selectedUser === '학생명') {
                      return (
                        <TableRow key={submit.id}>
                          <TableCell>{submit.User.nickName}</TableCell>
                          <TableCell sx={{whiteSpace:'pre-line', textOverflow:'ellipsis'}}>{curriculum.title}</TableCell>
                          <TableCell sx={{whiteSpace:'pre-line', textOverflow:'ellipsis'}}>{work.title}</TableCell>
                          <TableCell>
                            <Typography sx={{textAlign:'center', wordBreak:'keep-all'}}>{dayjs(submit.updatedAt).format('YYYY-MM-DD hh:mmA')}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{textAlign:'center'}}>{submit.grade}</Typography>
                          </TableCell>
                        </TableRow>
                      )
                    } else if (selectedUser === submit.User.nickName) {
                      return (
                        <TableRow key={submit.id}>
                          <TableCell>{submit.User.nickName}</TableCell>
                          <TableCell sx={{whiteSpace:'pre-line', textOverflow:'ellipsis'}}>{curriculum.title}</TableCell>
                          <TableCell sx={{whiteSpace:'pre-line', textOverflow:'ellipsis'}}>{work.title}</TableCell>
                          <TableCell>
                            <Typography sx={{textAlign:'center', wordBreak:'keep-all'}}>{dayjs(submit.updatedAt).format('YYYY-MM-DD hh:mmA')}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography sx={{textAlign:'center'}}>{submit.grade}</Typography>
                          </TableCell>
                        </TableRow>)
                    }
                  }
                  )
                )
              }
              )
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider variant='large' />
      <Stack direction='row' sx={{alignItems:'center', justifyContent: 'space-between', padding:'15px'}}>
        <Typography sx={{ml:1, fontWeight:'bold'}}>Average</Typography>
        <Typography sx={{mr:1, fontWeight:'bold'}}>{(sumGrade/count).toFixed(1)} 점</Typography>
      </Stack>
    </Paper>
  );
}