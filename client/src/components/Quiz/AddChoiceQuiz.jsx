import { Stack, TextField, Button } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from "react";
export default function AddChoiceQuiz({close, save}){
    const [choiceCount, setCoiceCount] = useState(1);
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [answer, setAnswer] = useState('');
    const [choiceList, setChoiceList] = useState([]);

    function addChoiceArray(){
        const newChoiceList= [...choiceList];
        newChoiceList.push(null);
        setChoiceList(newChoiceList);
    }
    function modifyChoiceList(idx, value){
        const newChoiceList = [...choiceList];
        newChoiceList[idx] = {content: value};
        setChoiceList(newChoiceList);
    }
    function onSave(){
        const saveData = {
            title: title,
            grade: grade,
            answer: answer,
            choiceList: choiceList
        }
        save(saveData);
    }

    return(
        <Stack>
            <Stack direction={'row'}>
                
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
            </Stack>
            {[...Array(choiceCount)].map((_, index) => (
                <TextField
                key={index}
                id={`filled-basic-${index}`}
                label={`선택지 ${index + 1}`}
                variant="filled"
                placeholder={`선택지를 입력하세요`}
                onChange={(e)=>{modifyChoiceList(index, e.target.value)}}
                />
            ))}
            <Stack alignItems={'center'}>
            <AddCircleRoundedIcon sx={{cursor: 'pointer'}} onClick={()=>{setCoiceCount(()=>(choiceCount+1)); addChoiceArray();}}></AddCircleRoundedIcon>
            </Stack>
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </Stack>
    )
}