import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function QuizResultsPage(){
    const {classId} = useParams();
    function getQuizResults(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/studentAnswers?classId=${classId}`, { withCredentials: true }).then((response)=>{
            console.log(response)
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getQuizResults();
    },[])
}