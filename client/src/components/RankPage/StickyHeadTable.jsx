import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: '랭킹', minWidth: 170 },
  { id: 'code', label: 'ID', minWidth: 100 },
  {
    id: 'population',
    label: '누적 학습 시간',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population) {

  return { name, code, population };
}

// const rows = [
// createData('unlucky8', 'IN', 1324171354),
// createData('China', 'CN', 1403500365),
// createData('Italy', 'IT', 60483973),
// createData('United States', 'US', 327167434),
// createData('Canada', 'CA', 37602103),
// createData('Australia', 'AU', 25475400),
// createData('Germany', 'DE', 83019200),
// createData('Ireland', 'IE', 4857000),
// createData('Mexico', 'MX', 12657769),
// createData('Japan', 'JP', 126317000),
// createData('France', 'FR', 67022000),
// createData('United Kingdom', 'GB', 67545757),
// createData('Russia', 'RU', 146793744),
// createData('Nigeria', 'NG', 200962417),
// createData('Brazil', 'BR', 210147125),
// ];

export default function StickyHeadTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const rows = data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.nickName}</TableCell>
                    <TableCell align="right">{row.totalStudyTime}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}