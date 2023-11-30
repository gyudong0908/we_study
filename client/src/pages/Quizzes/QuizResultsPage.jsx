import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizResultdAccordion from "../../components/Quiz/QuizResultdAccordion";
import { Stack, Typography } from "@mui/material";

export default function QuizResultsPage(){
    const {classId} = useParams();
    const [quizs, setQuizs] = useState([]);

    function getQuizResults(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswers?classId=${classId}`, { withCredentials: true }).then((response)=>{
            console.log(response.data)
            setQuizs(response.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getQuizResults();
    },[])
    return(
        <Stack
        sx={{
            direction: 'column',
            marginTop: '115px',
            marginLeft: '320px',
            marginRight: '50px',
            marginBottom: '150px',
          }}
        >
            <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
                <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>📑 퀴즈 제출 확인하기</Typography>
            </Stack>
        {
            quizs.map(quiz=>(
                <QuizResultdAccordion quiz = {quiz}></QuizResultdAccordion>
            ))
        }
        </Stack>
    )
}