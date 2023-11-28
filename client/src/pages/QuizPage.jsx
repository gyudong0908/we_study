import { Card, CardContent, Stack, Typography, Grid, Button, Menu, MenuItem, FormControlLabel, FormControl, RadioGroup, Radio, FormLabel } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from 'react';
import AddChoiceQuiz from '../components/Quiz/AddChoiceQuiz';
import AddOpenEndedQuiz from '../components/Quiz/AddOpenEndedQuiz';
export default function QuizPage(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [isChoiceQuizOpen, setIsChoiceQuizOpen] = useState(false);
    const [isOpenEndedQuizOpen, setIsOpenEndedQuizOpen] = useState(false);
    const [choiceQuizs, setChoiceQuizs] = useState([]);
    const [OpenEndedQuizs, setOpenEndedQuizs] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    function saveChoiceQuiz(choiceQuiz){
        // axios 요청 자리
        setChoiceQuizs([...choiceQuizs, choiceQuiz]);
    }
    function saveOpenEndedQuiz(OpenEndedQuiz){
        setOpenEndedQuizs([...OpenEndedQuizs, OpenEndedQuiz]);
    }
    return (
        <Stack
            sx={{
            direction: 'column',
            spacing: '10px',
            marginTop: '100px',
            marginLeft: '270px',
            marginRight: '70px',
            marginBottom: '200px',  
            }}
            >
                <Typography variant='h2' fontWeight={'bold'}>Quiz 생성</Typography>
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
                <MenuItem onClick={()=>{setIsOpenEndedQuizOpen(true); handleClose();}}>서술형</MenuItem>
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
                OpenEndedQuizs.map((data,idx)=>{
                    return (
                        <Stack marginBottom={'10px'}>
                        <div>제목: {data.question}</div>
                        <div>점수: {data.score}점</div>
                        <div>정답: {data.answer}</div>
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
            <Stack alignItems={'center'}>
                <AddCircleRoundedIcon sx={{cursor: 'pointer'}} onClick={handleClick}></AddCircleRoundedIcon>
            </Stack>

            <Button>저장</Button>
        </Stack>
    )
}