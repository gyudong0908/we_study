import { FormControl, FormLabel, Button, RadioGroup, FormControlLabel, Radio, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function QuizSolvePage(){
    const {quizId} = useParams();
    const [quiz, setQuiz] = useState({});
    const [answers, setAnswers] = useState([]);

    function getQuizData(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quiz?quizId=${quizId}`, { withCredentials: true }).then((response)=>{
            console.log(response);
            setQuiz(response.data);
            setAnswers(new Array(response.data.Questions.length));
        }).catch(err=>{
            console.log(err);
        })
    }
    function onChangeAnswer(event, index, questionId){
        const newAnswers = [...answers];
        newAnswers[index] = {questionId: questionId, answer: event.target.value};
        setAnswers(newAnswers);
    }
    function onSubmit(){
        axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswer?quizId=${quizId}`,answers, { withCredentials: true }).then(()=>{
            alert('제출되었습니다!');
            window.close();
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getQuizData();        
    },[])
    console.log(answers)
    return(
        <Stack
        sx={{
            direction: 'column',
            marginTop: '115px',
            marginLeft: '320px',
            marginRight: '50px',
            marginBottom: '150px', 
        }}>
        {quiz &&(
            <>
            <div>퀴즈 제목: {quiz.title}</div>
            <div>퀴즈 설명: {quiz.description}</div>            
            <div>퀴즈 마감기한: {quiz.dueDateTime}</div>            
            </>
        )
        }
        {
            quiz.Questions&&(
            quiz.Questions.map((question, index)=>{
                return(
                    <>
                    <div>문제: {question.title}</div>
                    <div>배점: {question.score}</div>
                    {
                        question.Choices.length !==0?(
                            <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                onChange={(e)=>{onChangeAnswer(e,index, question.id);}}
                            >
                                {
                                    question.Choices.map((choice, choiceIdx)=>{
                                        return(
                                            <FormControlLabel value={choice.optionText} control={<Radio />} label={choice.optionText} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                        ): <TextField placeholder="답을 입력해" onChange={(e)=>{onChangeAnswer(e,index, question.id);}}/>
                    }
                    </>
                )
            }))
        }
        <Button onClick={()=>{onSubmit();}}>제출</Button>
        </Stack>
    )
}