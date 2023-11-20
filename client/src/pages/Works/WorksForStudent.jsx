import {React, useEffect, useState, } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import dayjs from 'dayjs'
import { Table, TableContainer, TableCell, TableBody, TableHead, TableRow, TextField,
        Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';

export default function WorksForStudent(){
    const assignment = {title:'과제1', content:'과제 내용입니다.'};
    const [workData,setWorkData] = useState([]);
    const {workId} = useParams();

    const navigate = useNavigate();
    const handleGoBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
      };
    
    function getSubmits(){
        axios.get(`http://localhost:8081/submits?workId=${workId}`, {withCredentials: true}).then((response)=>{
            setWorkData(response.data)
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getSubmits();
    },[])
    
    return(
        <Stack
            sx={{
                direction: 'column',
                spacing: '10px',
                marginTop: '100px',
                marginLeft: '270px',
                marginRight: '70px'
            }}>
            <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
                <Typography variant="h4" component="span" sx={{mb:1, fontWeight: 'bold', color:'#0091ea'}}>📑 과제 제출하기</Typography>
            </Stack>
            <Stack sx={{mb:2, alignItems:'flex-end'}}>
                <Button variant='outlined' sx={{width:'20%'}} onClick={handleGoBack}>목록</Button>
            </Stack>
            <Stack sx={{mb:3}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="work-header">
                        <Grid container spacing={0} sx={{ alignItems:'center'}}>
                        <Grid item xs={6}>
                            <Typography variant='h6'>{assignment.title}</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{paddingRight:'5px'}}>
                            <Typography variant='caption' sx={{display:'flex', justifyContent:'flex-end'}}>2023년 11월 16일</Typography>
                        </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
                        <Typography variant='body1'>{assignment.content}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Stack>
            <Stack sx={{mb:5}}>
                <SubmitWork  workData = {workData} setWorkData ={setWorkData} workId={workId}/>
            </Stack>
            
            <TableContainer sx={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'10px'}}>
            <Table sx={{ width:'100%' }} aria-label='works table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>학생명</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>과제명</Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: '0.5px solid #333' }}>
                            <Typography variant='subtitle1'>제출 날짜</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {workData.map((item) => {
                    return(
                    <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="center">{item.User.nickName}</TableCell>
                    <TableCell align="center" sx={{
                            align:'center', 
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 변경하고자 하는 배경 색상
                            },}}>
                        <Link to="/mypage/classes/:classId/workdetail" style={{textDecoration:'none', color:'black'}}>
                            {item.title}
                        </Link>
                    </TableCell>
                    <TableCell align="center">{dayjs(item.createAt).format('YYYY-DD-MM hh:mm A')}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </TableContainer>
        </Stack>
    );
}

function SubmitWork({workData, setWorkData, workId}){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    function submit(){
        axios.post(`http://localhost:8081/create/submit?workId=${workId}`, { title: title, content:content, file:file}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response)=>{
            setWorkData([...workData, response.data]);
            setTitle('');
            setContent('');
            setFile('');
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <Accordion sx={{ mb: 10, borderRadius:'10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            ✍️ 과제를 제출하세요.
          </AccordionSummary>
          <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
            <TextField
              id="inputAssignmentTitle"
              label="제목을 입력하세요."
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              required
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <TextField
              id="inputAssignmentContent"
              label="세부 내용을 입력하세요."
              variant="outlined"
              fullWidth
              multiline
              rows={8}
              sx={{ mb: 2 }}
              required
              value={content}
              onChange={(e)=>{setContent(e.target.value)}}
            />
            <InputFileUpload setFile={setFile} file={file} />
            <Stack direction="row" justifyContent="flex-end" gap={1} sx={{marginTop:'10px'}}>
              <Button variant="outlined" onClick={submit}>제출</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
    );
}

function InputFileUpload({setFile, file}) {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFile(file);
    };
  
    return (
      <div style={{ position: 'relative' }}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf, .doc, .docx, .png, .jpeg, .jpg" // Specify accepted file types if necessary
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        /> 
        <label htmlFor="fileInput">
        <button>{file? file.name: '파일을 선택하세요'}</button>
        </label>
        {file && (
            <>
            <Typography variant='caption' sx={{float:'right'}}>File Type: {file.type}</Typography>
            </>
        )}
      </div>
    );
}