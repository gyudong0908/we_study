import React from 'react';
import { Stack, Input, InputLabel } from '@mui/material';

export default function CreateMemo({memo}){
    return(
        <Stack sx={{ padding: '10px 30px' }}>
            <InputLabel>제목을 입력하세요</InputLabel>
            <Input fullWidth label='제목을 입력하세요' sx={{mb:3}}/>

            <InputLabel>내용을 입력하세요</InputLabel>
            <Input fullWidth multiline label='내용을 입력하세요' rows={6}/>
        </Stack>
    );
};
