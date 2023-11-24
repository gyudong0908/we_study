// import { React, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography, Stack, Box } from '@mui/material';
import { useState } from 'react';

const columns = [
  { id: "topic", label: '단원명', width: 150 },
  { id: "workTitle", label: '과제명', width: 700 },
  { id: "dueDateTime", label: '제출시간', width: 100 },
  { id: "grade", label: '성적', width: 100 },
];

function createData(name, topic, workTitle, dueDateTime, grade) {
  return { name, topic, workTitle, dueDateTime };
}

export default function GradeTable({ curriculums, setCurriculums }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);
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
            return (
              <TableRow key={submit.id}>
                <TableCell>{submit.User.nickName}</TableCell>
                <TableCell>{curriculum.title}</TableCell>
                <TableCell>{work.title}</TableCell>
                <TableCell>{submit.updatedAt}</TableCell>
                <TableCell>{submit.grade}</TableCell>
              </TableRow>
            )
          } else if (selectedUser === submit.User.nickName) {
            sum += submit.grade;
            count +=1
            return (
              <TableRow key={submit.id}>
                <TableCell>{submit.User.nickName}</TableCell>
                <TableCell>{curriculum.title}</TableCell>
                <TableCell>{work.title}</TableCell>
                <TableCell>{submit.updatedAt}</TableCell>
                <TableCell>{submit.grade}</TableCell>
              </TableRow>)
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
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150 }}>
                <select value={selectedUser} onChange={(e) => { setSelectedUser(e.target.value) }}>
                  <option value="">Select a user</option>
                  {
                    [...uniqueUsers].map((user, idx) => (
                      <option key={idx} value={user}>
                        {user}
                      </option>
                    ))
                  }
                </select>
              </TableCell>
              <TableCell sx={{ width: 700 }}>
                <select value={selectedCurriculum} onChange={(e) => { setSelectedCurriculum(e.target.value) }}>
                  <option value="">Select a Curriculum</option>
                  {curriculums.map((curriculum) => (curriculum.Works.length !== 0 ?
                    <option key={curriculum.id} value={curriculum.title}>
                      {curriculum.title}
                    </option> : null
                  ))}
                </select>
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                과제명
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                제출시간
              </TableCell>
              <TableCell sx={{ width: 100 }}>
                성적
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 선택한 유저에 맞는 데이터 렌더링 */}
            {curriculums.length !== 0 ?
              curriculums.map((curriculum) => {
                if (selectedCurriculum && curriculum.title !== selectedCurriculum) {
                  return null;
                }
                return curriculum.Works.map((work) =>
                  work.Submits.map((submit) => {
                    if (!selectedUser) {
                      return (
                        <TableRow key={submit.id}>
                          <TableCell>{submit.User.nickName}</TableCell>
                          <TableCell>{curriculum.title}</TableCell>
                          <TableCell>{work.title}</TableCell>
                          <TableCell>{submit.updatedAt}</TableCell>
                          <TableCell>{submit.grade}</TableCell>
                        </TableRow>
                      )
                    } else if (selectedUser === submit.User.nickName) {
                      return (
                        <TableRow key={submit.id}>
                          <TableCell>{submit.User.nickName}</TableCell>
                          <TableCell>{curriculum.title}</TableCell>
                          <TableCell>{work.title}</TableCell>
                          <TableCell>{submit.updatedAt}</TableCell>
                          <TableCell>{submit.grade}</TableCell>
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
      <Stack direction='row' justifyContent='space-between' sx={{ marginLeft: '10px', marginTop: '10px' }}>
        <Typography variant='h5'>평균</Typography>
        <Typography sx={{ float: 'right', marginRight: '30px' }}>{sumGrade/count}</Typography>
      </Stack>
    </Paper>
  );
}