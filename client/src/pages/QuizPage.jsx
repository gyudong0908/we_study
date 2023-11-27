import { Card, CardContent, Stack, Typography, Grid, Button, Menu, MenuItem } from '@mui/material';
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
        setChoiceQuizs([...choiceQuiz]);
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
                <Typography variant='h2' fontWeight={'bold'}>Qize 생성</Typography>
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
                    return (<div></div>)
                })
            }
            {

            }
            {isChoiceQuizOpen && (
                <AddChoiceQuiz close={()=>{setIsChoiceQuizOpen(false)}}></AddChoiceQuiz>
                )

            }
            {isOpenEndedQuizOpen && (
                <AddOpenEndedQuiz close={()=>{setOpenEndedQuizs(false)}}></AddOpenEndedQuiz>
                )
            }
            <Stack alignItems={'center'}>
                <AddCircleRoundedIcon sx={{cursor: 'pointer'}} onClick={handleClick}></AddCircleRoundedIcon>
            </Stack>

            <Button>저장</Button>
        </Stack>
    )
}