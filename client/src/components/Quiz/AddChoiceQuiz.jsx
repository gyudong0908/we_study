import { Stack, TextField, Button, Checkbox, Typography } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useState, useEffect } from "react";

export default function AddChoiceQuiz({close, save}){
    const [title, setTitle] = useState('');
    const [score, setScore] = useState('');
    const [answer, setAnswer] = useState('');
    const [optionList, setOptionList] = useState([]);

    function addOptionArray(){
        const newOptionList= [...optionList];
        newOptionList.push(null);
        setOptionList(newOptionList);
    }
    function modifyOptionList(idx, value){
        const newOptionList = [...optionList];
        newOptionList[idx] = {optionText: value};
        setOptionList(newOptionList);
    }

    function removeOption(idx) {
        const newOptionList = [...optionList];
        newOptionList.splice(idx, 1);
        setOptionList(newOptionList);
      }

    useEffect(() => {
        console.log(optionList);
    }, [optionList]);

    function onSave(){
        const saveData = {
            title: title,
            score: score,
            answer: answer,
            optionText: optionList,
            questionType: "객관식",
        }
        save(saveData);
    }

    return(
        <Stack spacing={2} sx={{
            mt:5, mb:5, 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            borderRadius:'20px',
            padding:'1.5rem',
            }}
        >
            <Stack direction={'row'} sx={{mb:2}}>
                <TextField id="scoreField" label="배점" variant="outlined" placeholder="배점을 입력하세요" 
                    onChange={(e)=>{setScore(e.target.value)}}
                    value={score}
                    InputProps={{
                        endAdornment: '점',
                      }}
                />
                <TextField id="answerField" label="정답" variant="outlined" placeholder="정답을 입력하세요" 
                    onChange={(e)=>{setAnswer(e.target.value)}}
                    value={answer}
                    InputProps={{
                        endAdornment: '번',
                      }}
                    sx={{ml:2}}
                />
            </Stack>
            <TextField id="questionField" label="문제" variant="outlined" placeholder="제목을 입력하세요"
                    onChange={(e)=>{setTitle(e.target.value)}} 
                    value={title}
                    sx={{wordBreak:'keep-all',}}
                 />
            <Stack direction={'column'} spacing={2}>
                {optionList.map((_, index) => (
                    <Stack direction={'row'} spacing={1} >
                        <TextField
                            key={index}
                            id={`multiple-choice-${index}`}
                            label={`선택지 ${index + 1}`}
                            variant="outlined"
                            placeholder={`선택지를 입력하세요`}
                            onChange={(e)=>{modifyOptionList(index, e.target.value)}}
                            value={optionList[index]?optionList[index].optionText: '' }
                            sx={{wordBreak:'keep-all', width:'100%'}}
                            />
                        <Button sx={{cursor: 'pointer',color:'#757575'}} onClick={() => { removeOption(index); }}>
                            <RemoveCircleOutlineRoundedIcon />
                        </Button>
                    </Stack>
                ))}
                <Stack direction={'row'} sx={{justifyContent:'center'}}>
                    <Button sx={{cursor:'pointer', width:'50%', color:'#757575'}}
                        onClick={()=>{ addOptionArray();}}>
                        <AddCircleRoundedIcon />
                        <Typography ml={1}>선택지 생성</Typography>
                    </Button>
                </Stack>
            </Stack>
            
            <Button onClick={()=>{close(); onSave();}}>확인</Button>
        </Stack>
    )
}

