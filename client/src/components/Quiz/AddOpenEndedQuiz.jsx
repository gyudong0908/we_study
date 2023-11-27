import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";

export default function AddOpenEndedQuiz({close, save}){
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [answer, setAnswer] = useState('');
    function onSave(){
        const saveData = {
            title: title,
            grade: grade,
            answer: answer
        };
        save(saveData);
    }
    return(
        <>
            <TextField id="filled-basic" label="제목" variant="filled" placeholder="제목을 입력하세요"
                onChange={(e)=>{setTitle(e.target.value)}} 
                value={title}
            />
            <TextField id="filled-basic" label="점수" variant="filled" placeholder="점수를 입력하세요" 
                onChange={(e)=>{setGrade(e.target.value)}}
                value={grade}
            />
            <TextField id="filled-basic" label="정답" variant="filled" placeholder="정답을 입력하세요" 
                onChange={(e)=>{setAnswer(e.target.value)}}
                value={answer}
            />
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </>
    )
}