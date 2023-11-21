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

const columns = [
    { id: "name", label: '이름', width: 150 },
    { id: "topic", label: '단원명', width: 150 },
    { id: "workTitle", label: '과제명', width: 700 },
    { id: "dueDateTime",label: '제출시간', width: 100 },
    { id: "grade", label: '성적', width: 100 },
  ];
  
  function createData(name, topic, workTitle, dueDateTime, grade) {
    return { name, topic, workTitle, dueDateTime };
  }
  
  const rows = [
    createData('India', 'IN', '73604839737360483973736048397736048397373604839737360483977360483973736048397373604839773604839737360483973736048397', 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  
  export default function GradeTable({curriculums, setCurriculums}) {
    // function mapData(){
    //   return(
    //   curriculums.map(curriculum=>{
    //     const curriculumTitle = curriculum.title;
    //      curriculum.Works.map(work=>{
    //       const workTitle = work.title;
    //       work.Submits.map(submit=>{
    //         return(
    //           <TableRow>
    //             <TableCell>{submit.User.nickName}</TableCell>
    //             <TableCell>{curriculumTitle}</TableCell>
    //             <TableCell>{workTitle}</TableCell>
    //             <TableCell>{submit.updatedAt}</TableCell>
    //             <TableCell>{submit.grade}</TableCell>
    //           </TableRow>
    //         )
    //       })
    //      })
    //   })
    //   )
    // }
    console.log(curriculums)
    return (
      <Paper sx={{ width: '90%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  
                </TableCell>                
                {columns.map((column) => (                  
                  <TableCell>
                    <Typography sx={{width: column.width}}>{column.label}</Typography>                    
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {/* 선택한 유저에 맞는 데이터 렌더링 */}
            {curriculums.length !== 0
                ? curriculums.map((curriculum) =>
                    curriculum.Works.map((work) =>
                      work.Submits.map((submit) =>
                        selectedUser === submit.User.nickName ? (
                          <TableRow key={submit.id}>
                            <TableCell>{submit.User.nickName}</TableCell>
                            <TableCell>{curriculum.title}</TableCell>
                            <TableCell>{work.title}</TableCell>
                            <TableCell>{submit.updatedAt}</TableCell>
                            <TableCell>{submit.grade}</TableCell>
                          </TableRow>
                        ) : null
                      )
                    )
                  )
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction='row' justifyContent='space-between' sx={{marginLeft: '10px', marginTop: '10px'}}>
        <Typography variant='h5'>평균</Typography>
        <Typography sx={{ float: 'right', marginRight: '30px'}}>{rows.reduce((accumulator, ctrrentValue)=>{
              return accumulator + ctrrentValue.dueDateTime;
            },0)/ rows.length}</Typography>
            </Stack>
      </Paper>
    );
  }