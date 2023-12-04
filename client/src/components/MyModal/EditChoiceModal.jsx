import React from 'react';
import { Stack, Typography, Modal, Button, TextField } from '@mui/material';
import { useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

function EditChoiceModal({open, handleClose, target, editQuestion,}) {
  const [title, setTitle] = useState('');
  const [score, setScore] = useState('');
  const [answer, setAnswer] = useState([]);
  const [reason, setReason] = useState('');
  const [optionList, setOptionList] = useState([]);

  function onEdit() {
    if (title !== '' && answer !== '') {
      const data = {
        title: title,
        score: score,
        answer: Array.isArray(answer) ? answer : [answer], 
        questionType: target.questionType,
        reason: reason,
      }
      editQuestion(target.id, data);
    }
  }

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

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} spacing={3}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{textAlign:'center',}}>
            문제 수정하기
          </Typography>
          <Stack id="modal-modal-description">
            <TextField id="scoreField" label="배점" variant="outlined" placeholder="배점을 입력하세요" 
                      onChange={(e)=>{setScore(e.target.value)}}
                      InputProps={{
                          endAdornment: '점',
                      }}
                      sx={{width:'15rem'}}
                      defaultValue={target.score}
                      // value={target.score}
                  />
              </Stack>
              <TextField id="questionField" label="문제" variant="outlined" placeholder="문제를 입력하세요"
                      onChange={(e)=>{setTitle(e.target.value)}} 
                      // value={title}
                      defaultValue={target.title}
                      multiline
                      sx={{wordBreak:'keep-all', whiteSpace: 'pre-line' }}
                  />
              <TextField id="outlined-basic" label="정답" variant="outlined"  placeholder="정답을 입력하세요" 
                  onChange={(e)=>{setAnswer(e.target.value)}}
                  // value={answer}
                  defaultValue={target.answer}
                  multiline
                  rows={3}
              />
              <TextField id="outlined-basic" label="정답의 근거" variant="outlined"  placeholder="정답의 근거를 입력하세요" 
                  onChange={(e)=>{setReason(e.target.value)}}
                  // value={reason}
                  defaultValue={target.reason}
                  multiline
                  sx={{wordBreak:'keep-all', whiteSpace: 'pre-line' }}
              />
              <Stack direction={'column'} spacing={2}>
                {target.optionList.map((_, index) => (
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
              </Stack>
              <Stack direction={'row'} spacing={1} sx={{ justifyContent: 'flex-end' }}>
                  <Button variant='outlined' sx={{width:'10rem',}} onClick={handleClose}>취소</Button>
                  <Button variant='outlined' sx={{width:'10rem',}} onClick={()=>{handleClose(); onEdit();}}>수정</Button>
              </Stack>
          </Stack>
      </Modal>
    </div>
  );
}


export default EditChoiceModal;
