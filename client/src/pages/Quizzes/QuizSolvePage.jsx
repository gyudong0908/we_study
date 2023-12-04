import { FormControl, FormLabel, Button, RadioGroup, FormControlLabel, Checkbox, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';

export default function QuizSolvePage() {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({});
    const [answers, setAnswers] = useState([]);
    const newAnswers = [...answers];

    function getQuizData() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?quizId=${quizId}`, { withCredentials: true }).then((response) => {
            console.log(response);
            setQuiz(response.data);
            setAnswers(new Array(response.data.Questions.length));
        }).catch(err => {
            console.log(err);
        })
    }
    
    function onChangeEssayAnswer(event, index, questionId){
        newAnswers[index] = {questionId: questionId, answer: event.target.value};
        setAnswers(newAnswers);
    }

    function onChangeChoiceAnswer(event, index, questionId){
        //현재 질문 관련 모든 체크 박스 확인, 선택 옵션을 배열에 추가
        const selectedOptions = quiz.Questions[index].Choices
        .filter((choice, choiceIdx) => event.target.checked && event.target.value === choice.optionText)
        .map((choice) => choice.optionText);

        
        if(newAnswers[index]){
            newAnswers[index].answer = [...newAnswers[index].answer, ...selectedOptions];
        }else{
            newAnswers[index] = {questionId: questionId, answer: selectedOptions};
        }
        setAnswers(newAnswers);
    }

    function onSubmit(){
        axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswer?quizId=${quizId}`,answers, { withCredentials: true }).then(()=>{

            alert('제출되었습니다!');
            window.close();
        }).catch(err => {
            if (err.status = 527) {
                alert('제출 시간이 초과되었습니다!');
                window.close();
                return
            }
            console.log(err);
        })
    }


    useEffect(()=>{
        getQuizData();        
    },[])
    console.log('answers:',answers)
    console.log('questions:',quiz)
    return(
        <Stack
            sx={{
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
      {quiz && (
                    <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h3' fontWeight={'bold'}>{quiz.title}</Typography>
                        <Typography sx={{ color: '#757575', mt: 1 }}>※ 퀴즈 응시 중에는 페이지를 새로고침 하지 마십시오. ※</Typography>
                        <Typography variant='h6' sx={{ mt: 3 }}>퀴즈 응시 기간 : {dayjs(quiz.startDateTime).format('YYYY-MM-DD hh:mm A')} ~ {dayjs(quiz.dueDateTime).format('YYYY-MM-DD hh:mm A')}</Typography>
                        <Typography variant='subtitle1' sx={{
                            mt: 1,
                            wordBreak: 'keep-all',
                        }}>
                            {quiz.description}
                        </Typography>
                    </Stack>
                )
            }
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', mt: 5 }}>
            {
                quiz.Questions&&(
                quiz.Questions.map((question, index)=>{
                    return(
                        <Stack direction='row' sx={{
                            mt:2, 
                            mb:1, 
                            width:'60rem', 
                            border:'0.5px solid #757575',
                            borderRadius: '10px',
                            padding:'1.5rem',
                            }}>
                            <Stack direction='column' sx={{width:'50%'}}>
                                <Stack direction='row' sx={{justifyContent:'space-between'}}>
                                    <Typography variant='h6'>[ 문제 {index+1} ]</Typography>
                                    <Typography sx={{pr:'1.5rem'}}>[ 배점 ] {question.score}점</Typography>
                                </Stack>
                                
                                <Stack sx={{mt:2, mb:2, whiteSpace:'pre-line', overflow: 'auto'}}>
                                    <Typography variant='subtitle1'>{question.title}</Typography>
                                </Stack>
                            </Stack>
                        {
                            question.Choices.length !==0?(
                                <FormControl
                                sx={{width:'50%', pl:'1.5rem'}}
                                onChange={(e)=>{onChangeChoiceAnswer(e,index, question.id);}}>
                                    {
                                        question.Choices.map((choice, choiceIdx)=>{
                                            return(
                                                <FormControlLabel
                                                    value={choice.optionText}
                                                    control={<Checkbox />} 
                                                    label={<span>{`${choiceIdx + 1}) ${choice.optionText}`}</span>}
                                                    sx={{whiteSpace:'pre-line', overflow: 'auto'}} />
                                            )
                                        })
                                    }
                            </FormControl>
                            ): <TextField 
                                placeholder="답을 입력하세요"
                                onChange={(e)=>{onChangeEssayAnswer(e,index, question.id);}}
                                fullWidth
                                multiline
                                sx={{whiteSpace:'pre-line', overflow:'auto',width:'50%', pl:'1.5rem'}}
                                rows={5}
                                />
                        }
                        </Stack>
                    )
        
                }))
                
            }
            <Stack sx={{mt:5}}>
                <Button
                    variant='outlined'
                    sx={{width:'15rem', padding:'0.5rem'}}
                    onClick={()=>{onSubmit();}}>
                        <Typography variant="h5">제출</Typography>
                    </Button>
                </Stack>
            </Stack>


        </Stack>
    )
}