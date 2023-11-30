import { Stack, Button, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function StudentAnswer(){
    const {quizId, studentId} = useParams();
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);

    function getAnswer(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswer?quizId=${quizId}&userId=${studentId}`, { withCredentials: true }).then((response)=>{
            console.log(response.data)
            setQuiz(response.data);
            setQuestions(response.data.Questions);
        }).catch(err=>{
            console.log(err)
        })    
    }
    function editAnswer(questionId, target){
        console.log(target)
        axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswer?answerId=${target.id}`,target ,{ withCredentials: true }).then(()=>{
            setQuestions(questions.map(question=>(question.id === questionId? {...question, StudentAnswers:[target]}: question)));
        }).catch(err=>{ 
            console.log(err);
        })
    }
    
    useEffect(()=>{
        getAnswer()
    },[])
    return(
        <Stack        
        sx={{
            direction: 'column',
            marginTop: '115px',
            marginLeft: '320px',
            marginRight: '50px',
            marginBottom: '150px', 
        }}>
        {
            quiz &&(
                <>
                <div>퀴즈 제목: {quiz.title}</div>
                <div>퀴즈 설명: {quiz.description}</div>
                <div>퀴즈 마감기한: {quiz.dueDateTime}</div>
                </>
            )
        }
        {
            questions&& (
                questions.map((question, index)=>{
                    return(
                        <>
                        <div>문제: {question.title}</div>
                        <div>배점: {question.score}</div>
                        <div>정답: {question.answer}</div>
                        {
                            question.Choices.length !==0?(
                                        question.Choices.map((choice, choiceIdx)=>{
                                            return(
                                                <div>{choice.optionText}</div>
                                            )}
                            )): <TextField placeholder="답을 입력해" onChange={(e)=>{onChangeAnswer(e,index, question.id);}}/>
                        }
                        {
                            question.StudentAnswers.map(studentAnswer=>{
                                return(
                                    <>
                                    <div>학생의 정답: {studentAnswer.answer}</div>
                                    <div>틀림유무: {studentAnswer.check? '맞음':'틀림'}</div>
                                    <FormControlLabel control={<Checkbox value={studentAnswer.check} onChange={(e)=>{editAnswer(question.id, {...studentAnswer, check:e.target.checked})}} />} label="내가 고쳐줄게" />
                                    </>
                                )
                            })
                        }
                        </>
                    )
                })
            )
        }
        </Stack>
    )
}