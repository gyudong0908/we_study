import { React, useState } from 'react';
import { Stack, Typography, Grid, Button, Box } from '@mui/material';

export default function MemoListItem({memo, rewind, setInputTitle, setInputContent, handleModifyClick, setModifyId, setCreateMemoVisible, setSelectedMemoId}){
    console.log(memo)
    return(
        <>
        <Stack sx={{ padding: '0px 30px' }}>
            <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h4'>
                {memo.title}
            </Typography>
            <Typography variant='caption'>{new Date(memo.createdAt).toLocaleDateString().slice(0,-1)}</Typography>
            </Stack>
            <Typography variant='body1'>{memo.content}</Typography>
            <Grid container spacing={1} mt={15} sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                    <Button variant='outlined' onClick={rewind} sx={{borderRadius:'20px'}}>뒤로가기</Button>
                </Grid>
                <Grid item>
                    <Button variant='outlined' sx={{borderRadius:'20px'}} onClick={()=>{ setInputTitle(memo.title); setInputContent(memo.content); handleModifyClick(); setModifyId(memo.id); setCreateMemoVisible(true); setSelectedMemoId('')}}>수정하기</Button>
                </Grid>
            </Grid>
            
        </Stack>
        </>
    );
};