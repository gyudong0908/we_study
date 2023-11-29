import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";

export default function AddEssayQuiz({close, save}){
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
        <Stack spacing={2} sx={{
            mt:5, mb:5, 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius:'20px',
            padding:'1.5rem',
            }}
        >
            <Stack>
                <TextField id="scoreField" label="배점" variant="outlined" placeholder="배점을 입력하세요" 
                    onChange={(e)=>{setScore(e.target.value)}}
                    value={score}
                    InputProps={{
                        endAdornment: '점',
                    }}
                    sx={{width:'15rem'}}
                />
            </Stack>
            <TextField id="questionField" label="문제" variant="outlined" placeholder="제목을 입력하세요"
                    onChange={(e)=>{setQuestion(e.target.value)}} 
                    value={question}
                    sx={{wordBreak:'keep-all',}}
                 />
             <TextField id="outlined-basic" label="정답" variant="outlined"  placeholder="정답을 입력하세요" 
                onChange={(e)=>{setAnswer(e.target.value)}}
                value={answer}
                multiline
                rows={5}
            />
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </Stack>
           
        </>
    )
}