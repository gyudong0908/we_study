import { Card, CardContent, Stack, Typography, Grid, IconButton, Button, Menu, MenuItem, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useEffect, useState } from 'react';
import AddChoiceQuiz from '../../components/Quiz/AddChoiceQuiz';
import AddOpenEndedQuiz from '../../components/Quiz/AddOpenEndedQuiz';
import AddEssayQuiz from '../../components/Quiz/AddEssayQuiz';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function QuizPage(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [isChoiceQuizOpen, setIsChoiceQuizOpen] = useState(false);
    const [isOpenEndedQuizOpen, setIsOpenEndedQuizOpen] = useState(false);
    const [isEssayQuizOpen, setIsEssayQuizOpen] = useState(false);
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
        console.log(questions)
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
                <Stack>
                    <Typography variant='h2' fontWeight={'bold'}>{quiz.title}</Typography>
                    <Stack direction={'row'} sx={{mt:5, alignItems:'center'}}>
                        <Typography variant='h6' width={'50%'}>퀴즈 시작일 : {quiz.startDateTime}</Typography>
                        <Typography variant='h6' width={'50%'}>퀴즈 마감일 : {quiz.dueDateTime}</Typography>
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
            {
                questions.map((data,idx)=>{
                    return (
                        <Stack marginBottom={'10px'}>
                            <Button onClick={()=>{onDelete(data)}}>삭제</Button>
                        <div>문제: {data.title}</div>
                        <div>배점: {data.score}점</div>
                        <div>정답: {data.answer}</div>
                            {data.Choices &&(
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">문제</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                    >
                                        {
                                            data.Choices.map((choice, idx)=>{
                                                return(
                                                    <FormControlLabel value={idx+1} control={<Radio />} label={choice.optionText} />
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            )}

                        </Stack>
                    )
                })
            }
            {isChoiceQuizOpen && (
                <AddChoiceQuiz close={()=>{setIsChoiceQuizOpen(false)}} save={saveQuestion}></AddChoiceQuiz>
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
            <Stack sx={{alignItems:'center', mt:4,}}>
                <Button onClick={handleClick} sx={{cursor:'pointer', width:'50%'}}>
                    <AddCircleOutlineOutlinedIcon fontSize='large'/>
                    <Typography variant='h6' ml={1}>문항 생성</Typography>
                </Button>
            </Stack>
        </Stack>
    )
}