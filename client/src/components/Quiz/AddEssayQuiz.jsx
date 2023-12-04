import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";

export default function AddEssayQuiz({close, save}){
    const [title, setTitle] = useState('');
    const [score, setScore] = useState('');
    const [answer, setAnswer] = useState('');
    const [reason, setReason] = useState('');
    function onSave(){
        const saveData = {
            title: title,
            score: score,
            answer: answer,
            questionType: "서술형",
            reason: reason,
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
                    onChange={(e)=>{setTitle(e.target.value)}} 
                    value={title}
                    sx={{whiteSpace:'pre-line', overflow: 'auto'}}
                    multiline
                 />
             <TextField id="outlined-basic" label="정답" variant="outlined"  placeholder="정답을 입력하세요" 
                onChange={(e)=>{setAnswer(e.target.value)}}
                value={answer}
                multiline
                rows={5}
                sx={{whiteSpace:'pre-line', overflow: 'auto'}}
            />
            <TextField id="outlined-basic" label="정답의 근거" variant="outlined"  placeholder="정답의 근거를 입력하세요" 
                onChange={(e)=>{setReason(e.target.value)}}
                value={reason}
                multiline
                sx={{whiteSpace:'pre-line', overflow: 'auto'}}
            />
            <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'flex-end' }}>
                <Button variant='outlined' sx={{width:'10rem',}} onClick={()=>{close()}}>취소</Button>
                <Button variant='outlined' sx={{width:'10rem',}} onClick={()=>{close(); onSave();}}>확인</Button>
            </Stack>
        </Stack>
           
        </>
    )
}