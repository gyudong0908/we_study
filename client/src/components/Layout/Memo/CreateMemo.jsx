import React from 'react';
import { Stack, Input, InputLabel, Button } from '@mui/material';

export default function CreateMemo({setCreateMemoVisible, inputTitle, inputContent, setInputTitle, setInputContent}){
    return(
        <Stack sx={{ padding: '10px 30px' }}>
            <Button variant='outlined' onClick={()=>{setCreateMemoVisible(false)}} sx={{borderRadius:'20px', float:'left'}}>뒤로가기</Button>
            <InputLabel>제목을 입력하세요</InputLabel>
            <Input fullWidth label='제목을 입력하세요' value={inputTitle} sx={{mb:3}} onChange={(e)=>{setInputTitle(e.target.value)}}/>
            <InputLabel>내용을 입력하세요</InputLabel>
            <Input fullWidth multiline label='내용을 입력하세요' value={inputContent} rows={6} onChange={(e)=>{setInputContent(e.target.value)}}/>
        </Stack>
    );
};
