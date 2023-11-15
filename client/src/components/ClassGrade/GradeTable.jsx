import { React, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

function GradeTable(){
    const [data, setData] = useState([
        { id: 1, name: '최혜린', grade1: 70, grade2: 90 },
        { id: 2, name: '이동규', grade1: 85, grade2: 98 },
        { id: 3, name: '조정석', grade1: 79, grade2: 95 },
      ]);

    const handleInputChange = (id, field, value) => {
    const newData = data.map(item => (item.id === id ? { ...item, [field]: value } : item));
        setData(newData);
    };

    return(
        <TableContainer sx={{marginBottom:'30px'}}>
            <Table sx={{ width:'100%' }} aria-label='study progress table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>학생명</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>Overall</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>과제1</TableCell>
                        <TableCell align="center" sx={{ borderBottom: '1px solid black' }}>과제2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {data.map((item) => {
                    const grade1 = parseInt(item.grade1, 10);
                    const grade2 = parseInt(item.grade2, 10);
                    const average = ( grade1 + grade2 )/2;

                    return(
                    <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="center">
                        {item.name}
                    </TableCell>
                    <TableCell align="center">{average}</TableCell>
                    <TableCell align="center">
                        <TextField
                            value={grade1}
                            type="number"
                            inputProps={{max:100}}
                            onChange={(e) => {
                                const newValue = Math.min(parseInt(e.target.value, 10), 100);
                                handleInputChange(item.id, 'grade1', newValue);
                            }}
                            />
                    </TableCell>
                    <TableCell align="center">
                        <TextField
                            value={grade2}
                            type="number"
                            inputProps={{inputProps : {max:100}}}
                            onChange={(e) => {
                                const newValue = Math.min(parseInt(e.target.value, 10), 100);
                                handleInputChange(item.id, 'grade2', newValue);
                            }}
                            />
                    </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GradeTable;