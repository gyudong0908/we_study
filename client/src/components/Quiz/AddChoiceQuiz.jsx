import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";
export default function AddChoiceQuiz({close, save}){
    const [choiceCount, setCoiceCount] = useState(1);
    const [question, setQuestion] = useState('');
    const [score, setScore] = useState('');
    const [answer, setAnswer] = useState('');
    const [optionList, setOptionList] = useState([]);

    function addOptionArray(){
        const newOptionList= [...optionList];
        newChoiceList.push(null);
        setChoiceList(newOptionList);
    }
    function modifyOptionList(idx, value){
        const newOptionList = [...optionList];
        newOptionList[idx] = {content: value};
        setOptionList(newOptionList);
    }
    function onSave(){
        const saveData = {
            question: question,
            score: score,
            answer: answer,
            optionText: optionList,
        }
        save(saveData);
    }

    return(
        <Stack>
            <Stack direction={'row'}>
                
                <TextField id="filled-basic" label="제목" variant="filled" placeholder="제목을 입력하세요"
                    onChange={(e)=>{setQuestion(e.target.value)}} 
                    value={question}
                 />
                <TextField id="filled-basic" label="점수" variant="filled" placeholder="배점을 입력하세요" 
                    onChange={(e)=>{setScore(e.target.value)}}
                    value={score}
                />
                <TextField id="filled-basic" label="정답" variant="filled" placeholder="정답을 입력하세요" 
                    onChange={(e)=>{setAnswer(e.target.value)}}
                    value={answer}
                />
            </Stack>
            {[...Array(choiceCount)].map((_, index) => (
                <TextField
                key={index}
                id={`filled-basic-${index}`}
                label={`선택지 ${index + 1}`}
                variant="filled"
                placeholder={`선택지를 입력하세요`}
                onChange={(e)=>{modifyOptionList(index, e.target.value)}}
                />
            ))}
            <Stack alignItems={'center'}>
            <AddCircleRoundedIcon sx={{cursor: 'pointer'}} onClick={()=>{setChoiceCount(()=>(choiceCount+1)); addOptionArray();}}></AddCircleRoundedIcon>
            </Stack>
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </Stack>
    )
}