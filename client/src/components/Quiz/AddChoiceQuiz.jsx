import { Stack, TextField, Button, Checkbox, Typography } from "@mui/material"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useState, useEffect } from "react";

export default function AddChoiceQuiz({close, save, index}){
    const [title, setTitle] = useState('');
    const [score, setScore] = useState('');
    const [answer, setAnswer] = useState([]);
    const [reason, setReason] = useState('');
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

    function onChangeAnswer(event, index) {
        console.log('Event value:', event.target.value);
        const selectedOptions = event.target.value.split(',' || ', ' || ' , ').map(option => option.trim());
        setAnswer(selectedOptions)
    }
    useEffect(() => {
        console.log('answer:', answer);
    }, [answer]);

    function onSave(){
        let answerToString = ''
        answer.map(item=>{
          answerToString += item.trim() + ","
        })
        console.log(answerToString)
        const saveData = {
            title: title,
            score: score,
            answer: answerToString.slice(0,-1),
            optionText: optionList,
            questionType: "객관식",
            reason: reason,
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
                        inputMode: 'numeric', // 숫자만 입력 받음
                      }}
                    sx={{width:'15rem'}}
                />
                <TextField id="answerField" label="정답" variant="outlined"
                    placeholder="정답 선택지 전체를 입력하세요. 복수정답의 경우 각 답을 , 로 구분하세요." 
                    onChange={(e) => { onChangeAnswer(e, index) }}
                    // value={answer}
                    sx={{ml:2, wordBreak:'keep-all', width:'calc(100% - 15rem)', whiteSpace:'pre-line'}}
                />
            </Stack>
            <TextField id="answerReasonField" label="정답의 근거" variant="outlined" placeholder="정답의 근거를 입력하세요"
                    onChange={(e)=>{setReason(e.target.value)}} 
                    value={reason}
                    sx={{wordBreak:'keep-all',whiteSpace:'pre-line'}}
                    multiline
                    // rows={3}
                 />
            <TextField id="questionField" label="문제" variant="outlined" placeholder="문제를 입력하세요"
                    onChange={(e)=>{setTitle(e.target.value)}} 
                    value={title}
                    sx={{ whiteSpace:'pre-line', wordBreak:'keep-all',}}
                    multiline
                    // rows={3}
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
                            sx={{wordBreak:'keep-all', whiteSpace:'pre-line',width:'100%'}}
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
                <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    <Button variant='outlined' sx={{width:'10rem',}} onClick={()=>{close();}}>취소</Button>
                    <Button variant='outlined' sx={{width:'10rem',}} onClick={()=>{close(); onSave();}}>확인</Button>
                </Stack>
            </Stack>
            
            
        </Stack>
    )
}

