import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";

export default function AddOpenEndedQuiz({close, save}){
    const [question, setQuestion] = useState('');
    const [score, setScore] = useState('');
    const [answer, setAnswer] = useState('');
    function onSave(){
        const saveData = {
            question: question,
            score: score,
            answer: answer
        };
        save(saveData);
    }
    return(
        <>
            <TextField id="filled-basic" label="제목" variant="filled" placeholder="제목을 입력하세요"
                onChange={(e)=>{setQuestion(e.target.value)}} 
                value={question}
            />
            <TextField id="filled-basic" label="점수" variant="filled" placeholder="점수를 입력하세요" 
                onChange={(e)=>{setScore(e.target.value)}}
                value={score}
            />
            <TextField id="filled-basic" label="정답" variant="filled" placeholder="정답을 입력하세요" 
                onChange={(e)=>{setAnswer(e.target.value)}}
                value={answer}
            />
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </>
    )
}