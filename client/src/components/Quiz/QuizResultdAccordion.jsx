import { Accordion, AccordionDetails, AccordionSummary, Stack, Table, Button,TableBody,  TableHead,TableCell, TableRow, Typography, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function QuizResultdAccordion({quiz}){
    const navigate = useNavigate();
    return(
        <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ margin: '5px' }}
        >
          <Stack sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>
            <Typography variant='h6'>퀴즈 제목: {quiz.title}</Typography>
            <Typography variant='h6'>마감 기한: {quiz.dueDateTime}</Typography>

          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ whiteSpace: 'pre-line', mr: '5px', ml: '5px', mb: '5px' }}>            
        <TableContainer sx={{ border: '1px solid black', borderRadius: '10px' }}>
                <Table sx={{ width: '100%' }} aria-label='works table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                                <Typography variant='subtitle1'>학생명</Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                                <Typography variant='subtitle1'>제출 날짜</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quiz.Questions[0] && quiz.Questions[0].StudentAnswers && (quiz.Questions[0].StudentAnswers.map((studentAnswer) => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <TableCell component="th" scope="row" align="center">{user.nickName}</TableCell> */}
                                    <TableCell align="center"
                                        onClick={() => {
                                            navigate(`/mypage/quiz/${quiz.id}/answer/teacher/${studentAnswer.User.id}`);
                                        }}
                                        sx={{
                                            align: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 변경하고자 하는 배경 색상
                                            },
                                        }}>
                                        {studentAnswer.User.nickName}
                                    </TableCell>
                                    <TableCell align="center">{dayjs(studentAnswer.updatedAt).format('YYYY-MM-DD hh:mm A')}</TableCell>
                                </TableRow>
                            );
                        }))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AccordionDetails>
      </Accordion>
    )
}