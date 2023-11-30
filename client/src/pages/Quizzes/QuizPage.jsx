import { Stack, Typography, Button, Menu, MenuItem, FormControlLabel, FormControl, Checkbox } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import AddChoiceQuiz from '../../components/Quiz/AddChoiceQuiz';
import AddOpenEndedQuiz from '../../components/Quiz/AddOpenEndedQuiz';
import AddEssayQuiz from '../../components/Quiz/AddEssayQuiz';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import EditOpenEndedModal from '../../components/MyModal/EditOpenEndedModal';

export default function QuizPage(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [isChoiceQuizOpen, setIsChoiceQuizOpen] = useState(false);
    const [isOpenEndedQuizOpen, setIsOpenEndedQuizOpen] = useState(false);
    const [isEssayQuizOpen, setIsEssayQuizOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isChoiceModalOpen, setChoiceModalOpen] = useState(false);
    const [target, setTarget] = useState('');

    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState({});
    const open = Boolean(anchorEl);
    const {quizId} = useParams()

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function saveQuestion(saveData){
        if(saveData.questionType === '객관식'){
            axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/question/choice?quizId=${quizId}`,saveData ,{ withCredentials: true }).then((response)=>{
                console.log(response.data)
                setQuestions([...questions, response.data]);
            }).catch(err=>{
                console.log(err);
            })
        }else{
            axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/question?quizId=${quizId}`,saveData ,{ withCredentials: true }).then((response)=>{
                setQuestions([...questions, response.data]);
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    function getQuizData(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?quizId=${quizId}`, { withCredentials: true }).then((response)=>{
            console.log(response.data);
            setQuiz(response.data);
            setQuestions(response.data.Questions);
        }).catch(err=>{
            console.log(err);
        })
    }

    function onDelete(target){
        axios.delete(`${import.meta.env.VITE_SERVER_ADDRESS}/question?questionId=${target.id}`, { withCredentials: true }).then(()=>{
            setQuestions(questions.filter(question=>question.id !== target.id));
        }).catch(err=>{
            console.log(err);
        })

    }
    // 아직 밑에 있는 수정은 단답형이랑 서술형만 가능함
    function editQuestion(questionId, target){
        axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/question?questionId=${questionId}`,target, { withCredentials: true }).then(()=>{
            setQuestions(questions.map(question=>(question.id === questionId? {...question, ...target}: question)));
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getQuizData()
        console.log('questions:',questions)
    },[])

    return (
        <Stack
            sx={{
                direction: 'column',
                marginTop: '115px',
                marginLeft: '320px',
                marginRight: '50px',
                marginBottom: '150px', 
            }}
            >
                <Stack sx={{justifyContent:'center',}}>
                    <Typography variant='h3' fontWeight={'bold'}>{quiz.title}</Typography>
                    <Stack direction={'row'} sx={{mt:3, alignItems:'center'}}>
                        <Typography variant='h6' width={'50%'}>퀴즈 시작일 : {dayjs(quiz.startDateTime).format('YYYY-MM-DD hh:mm A')}</Typography>
                        <Typography variant='h6' width={'50%'}>퀴즈 마감일 : {dayjs(quiz.dueDateTime).format('YYYY-MM-DD hh:mm A')}</Typography>
                    </Stack>
                    <Typography variant='subtitle1' sx={{
                        mt:1,
                        wordBreak:'keep-all',
                        }}>
                        {quiz.description}
                    </Typography>
                </Stack>
                
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
             >
                <MenuItem onClick={()=>{setIsChoiceQuizOpen(true); handleClose();}}>객관식</MenuItem>
                <MenuItem onClick={()=>{setIsOpenEndedQuizOpen(true); handleClose();}}>단답형</MenuItem>
                <MenuItem onClick={()=>{setIsEssayQuizOpen(true); handleClose();}}>서술형</MenuItem>
            </Menu>
            <Stack sx={{justifyContent:'center', alignItems:'center'}}>
            {
                questions.map((data,idx)=>{
                    return (
                        <Stack direction='row' sx={{
                            mt:5, 
                            mb:1, 
                            width:'80%', 
                            border:'0.5px solid #757575',
                            borderRadius:'10px',
                            padding:'1.5rem',
                            }}>
                            <Stack direction='column' sx={{width:'60%'}}>
                                <Typography variant='h6'>[ 문제 {idx+1} ]</Typography>
                                <Stack sx={{mt:2, mb:2, wordBreak:'keep-all'}}>
                                    <Typography variant='subtitle1'>{data.title}</Typography>
                                </Stack>
                                {data.Choices &&(
                                <FormControl>
                                    {
                                        data.Choices.map((choice, idx)=>{
                                            return(
                                                <FormControlLabel value={idx} 
                                                    control={<Checkbox />} 
                                                    label={choice.optionText} />
                                            )
                                        })
                                    }
                                </FormControl>
                            )}
                            </Stack>
                            <Stack direction='column' spacing={10} sx={{width:'40%', justifyContent:'space-evenly'}}>
                                <Stack direction='column' spacing={2}>
                                    <Typography variant='h6'>[ 배점 ]  {data.score}점</Typography>
                                    <Stack direction='column' spacing={1}>
                                        <Typography variant='h6'>[ 정답 ]</Typography>
                                        <Typography variant='subtitle1' sx={{wordBreak:'keep-all'}}>{data.answer}</Typography>
                                    </Stack>
                                    <Stack direction='column' spacing={1}>
                                        <Typography variant='h6'>[ 정답의 근거 ]</Typography>
                                        <Typography variant='subtitle1' sx={{wordBreak:'keep-all'}}>{data.reason}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction='row' spacing={1} sx={{justifyContent:'flex-end'}}>
                                    <Button variant='outlined' sx={{width:'10rem'}} onClick={()=>{setModalOpen(true); setTarget(data); }}>수정</Button>
                                    <Button variant='outlined' sx={{width:'10rem'}} onClick={()=>{onDelete(data)}}>삭제</Button>
                                </Stack>
                                
                            </Stack>
                        </Stack>
                    )
                })
            }
            </Stack>
            {isChoiceQuizOpen && (
                <AddChoiceQuiz close={()=>{setIsChoiceQuizOpen(false)}} save={saveQuestion} edit={()=>{setIsChoiceQuizOpen(true)}}></AddChoiceQuiz>
                )

            }
            {isOpenEndedQuizOpen && (
                <AddOpenEndedQuiz close={()=>{setIsOpenEndedQuizOpen(false)}} save={saveQuestion}></AddOpenEndedQuiz>
                )
            }
             {isEssayQuizOpen && (
                <AddEssayQuiz close={()=>{setIsEssayQuizOpen(false)}} save={saveQuestion}></AddEssayQuiz>
                )
            }
            {isModalOpen && (
                <EditOpenEndedModal 
                    open={isModalOpen}
                    handleClose = {()=>{setModalOpen(false)}}
                    target={target}
                    editQuestion={editQuestion}
                    />
                )
            }
            <Stack sx={{alignItems:'center', mt:4,}}>
                <Button onClick={handleClick} sx={{cursor:'pointer', width:'50%'}}>
                    <AddCircleOutlineOutlinedIcon fontSize='large'/>
                    <Typography variant='h6' ml={1}>문항 생성</Typography>
                </Button>
            </Stack>
        </Stack>
    )
}