import { React, useEffect, useState, } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import dayjs from 'dayjs';
import {
    Table, TableContainer, TableCell, TableBody, TableHead, TableRow, TextField,
    Grid, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Checkbox
} from '@mui/material';
import {useSelector} from 'react-redux';

export default function WorksForStudent() {
    const [submitData, setSubmitData] = useState([]);
    const [workData, setWorkData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { workId } = useParams();
    const user = useSelector(state=>state.userData);

    const navigate = useNavigate();
    const handleGoBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
    };

    function getSubmits() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/submits?workId=${workId}`, { withCredentials: true }).then((response) => {
            for (const item of response.data) {
                if(item.userId === user.userData.id){
                    setIsSubmit(true);
                    break;
                }                
            }
            setSubmitData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }
    function getWork() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/work?workId=${workId}`, { withCredentials: true }).then(response => {
            setWorkData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if(user.userData){
            getSubmits();
            getWork()    
        }
    }, [user.userData])

    return (
        <Stack
            sx={{
                // direction: 'column',
                // spacing: '10px',
                // marginTop: '100px',
                // marginLeft: '270px',
                // marginRight: '70px',
                // marginBottom: '200px',

                // direction: 'column',
                // marginTop: '115px',
                // marginLeft: '320px',
                // marginRight: '50px',
                // marginBottom: '150px',
                direction:'column',
                marginTop:'115px',
                marginLeft:'20rem',
                marginRight:'10rem',
                marginBottom:'10rem'
            }}>
            <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>📑 과제 제출하기</Typography>
            </Stack>
            <Stack sx={{ mb: 2, alignItems: 'flex-end' }}>
                <Button variant='outlined' sx={{ width: '20%' }} onClick={handleGoBack}>목록</Button>
            </Stack>
            <Stack sx={{ mb: 3 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="work-header"
                        sx={{ margin: '5px' }}
                    >
                        <Grid container spacing={0} sx={{ alignItems: 'center' }}>
                            <Grid item xs={10}>
                                <Typography variant='h6' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{workData.title}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ paddingRight: '5px' }}>
                                <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'flex-end' }}>{dayjs(workData.createAt).format('YYYY-MM-DD hh:mm A')}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails sx={{ whiteSpace: 'pre-line', margin: '5px' }}>
                        <Stack sx={{ mr: 2, ml: 2, mb: 2 }}>
                            <Typography variant='subtitile1' sx={{ fontWeight: 'bold' }}>🔔 과제 마감 기한 : {dayjs(workData.dueDateTime).format('YYYY년 MM월 DD일 hh:mm A')}</Typography>
                        </Stack>
                        <Stack sx={{ mt: 2, mr: 2, ml: 2, mb: 3 }}>
                            <Typography variant='body1' sx={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}>{workData.description}</Typography>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>
            {!isSubmit &&(
                <Stack sx={{ mb: 5 }}>
                    <SubmitWork close={()=>{setIsSubmit(true)}} submitData={submitData} setSubmitData={setSubmitData} workId={workId} />
                </Stack>)
            }
            <TableContainer sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                <Table sx={{ width: '100%' }} aria-label='works table'>
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
                        {submitData.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">{item.User.nickName}</TableCell>
                                    <TableCell align="center"
                                        onClick={() => {
                                            if(item.userId !== user.userData.id && item.private === true){
                                                return;
                                            }
                                            navigate(`/mypage/classes/${item.id}/workdetail/student`);
                                        }}
                                        sx={{
                                            align: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // 변경하고자 하는 배경 색상
                                            },
                                        }}>
                                        { (item.userId !== user.userData.id) && (item.private === true)? '🔒 '+ item.title: item.title}
                                    </TableCell>
                                    <TableCell align="center">{dayjs(item.createdAt).format('YYYY-DD-MM hh:mm A')}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

function SubmitWork({ submitData, setSubmitData, workId, close }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [isprivate, setIsPrivate] = useState(false);

    const inputToggleChange = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    function submit() {
        axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/create/submit?workId=${workId}`, { title: title, content: content, file: file, private: isprivate }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            setSubmitData([...submitData, response.data]);
            setTitle('');
            setContent('');
            setFile('');
            setExpanded(false);
            close();
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Accordion
            expanded={expanded}
            onChange={inputToggleChange}
            sx={{ mb: 10, borderRadius: '10px' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                ✍️ 과제를 제출하세요.
            </AccordionSummary>
            <AccordionDetails sx={{ whiteSpace: 'pre-line' }}>
                <Stack direction={'row'} alignItems={'center'}>
                    <TextField
                        id="inputAssignmentTitle"
                        label="제목을 입력하세요."
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <label htmlFor="checkBox">private</label>
                    <Checkbox id = "checkBox" onChange={(e)=>{setIsPrivate(e.target.checked)}}/>
                </Stack>
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
                    onChange={(e) => { setContent(e.target.value) }}
                />
                <InputFileUpload setFile={setFile} file={file} />
                <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ marginTop: '10px', }}>
                    <Button variant="outlined" onClick={inputToggleChange} sx={{ width: '10%' }}>취소</Button>
                    <Button variant="outlined" onClick={submit} sx={{ width: '10%' }}>제출</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

function InputFileUpload({ setFile, file }) {
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
                <button>{file ? file.name : '파일을 선택하세요'}</button>
            </label>
            {file && (
                <>
                    <Typography variant='caption' sx={{ float: 'right' }}>File Type: {file.type}</Typography>
                </>
            )}
        </div>
    );
}