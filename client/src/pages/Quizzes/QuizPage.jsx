import { Card, CardContent, Stack, Typography, Grid, IconButton, Button, Menu, MenuItem, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState } from 'react';
import AddChoiceQuiz from '../../components/Quiz/AddChoiceQuiz';
import AddOpenEndedQuiz from '../../components/Quiz/AddOpenEndedQuiz';
import AddEssayQuiz from '../../components/Quiz/AddEssayQuiz';
import dayjs from 'dayjs';

export default function QuizPage(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [isChoiceQuizOpen, setIsChoiceQuizOpen] = useState(false);
    const [isOpenEndedQuizOpen, setIsOpenEndedQuizOpen] = useState(false);
    const [isEssayQuizOpen, setIsEssayQuizOpen] = useState(false);
    const [choiceQuizs, setChoiceQuizs] = useState([]);
    const [openEndedQuizs, setOpenEndedQuizs] = useState([]);
    const [essayQuizs, setEssayQuizs] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function saveChoiceQuiz(choiceQuiz){
        // axios 요청 자리
        setChoiceQuizs([...choiceQuizs, choiceQuizs]);
    }
    function saveOpenEndedQuiz(OpenEndedQuiz){
        setOpenEndedQuizs([...openEndedQuizs, openEndedQuizs]);
    }
    function saveEssayQuiz(OpenEndedQuiz){
        setEssayQuizs([...essayQuizs, essayQuizs]);
    }

    const dummyData = {
        title: 'Sample Quiz',
        description: '샘플 퀴즈에 대한 간단 설명입니다.',
        dueDateTime: dayjs().format('YYYY-MM-DD hh:mm A'),  
        startDateTime: dayjs().format('YYYY-MM-DD hh:mm A'), 
      };

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
                    <Typography variant='h2' fontWeight={'bold'}>{dummyData.title}</Typography>
                    <Stack direction={'row'} sx={{mt:5, alignItems:'center'}}>
                        <Typography variant='h6' width={'50%'}>퀴즈 시작일 : {dummyData.startDateTime}</Typography>
                        <Typography variant='h6' width={'50%'}>퀴즈 마감일 : {dummyData.dueDateTime}</Typography>
                    </Stack>
                    <Typography variant='subtitle1' sx={{
                        mt:1,
                        wordBreak:'keep-all',
                        }}>
                        {dummyData.description}
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
                choiceQuizs.map((data,idx)=>{
                    return (
                        <Stack marginBottom={'10px'}>
                        <div>문제: {data.question}</div>
                        <div>배점: {data.score}점</div>
                        <div>정답: {data.answer}번</div>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">문제</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                            >
                                {
                                    data.choiceList.map((choice, idx)=>{
                                        return(
                                            <FormControlLabel value={idx+1} control={<Radio />} label={choice.content} />
                                        )
                                    })
                                }
                            </RadioGroup>
                            </FormControl>
                        </Stack>
                    )
                })
            }
            {
                openEndedQuizs.map((data,idx)=>{
                    return (
                        <Stack marginBottom={'10px'}>
                        <div>제목: {data.question}</div>
                        <div>점수: {data.score}점</div>
                        <div>정답: {data.answer}</div>
                        <div>수정</div>
                        </Stack>
                    )
                })
            }
            {isChoiceQuizOpen && (
                <AddChoiceQuiz close={()=>{setIsChoiceQuizOpen(false)}} save={saveChoiceQuiz}></AddChoiceQuiz>
                )

            }
            {isOpenEndedQuizOpen && (
                <AddOpenEndedQuiz close={()=>{setIsOpenEndedQuizOpen(false)}} save={saveOpenEndedQuiz}></AddOpenEndedQuiz>
                )
            }
             {isEssayQuizOpen && (
                <AddEssayQuiz close={()=>{setIsEssayQuizOpen(false)}} save={saveEssayQuiz}></AddEssayQuiz>
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