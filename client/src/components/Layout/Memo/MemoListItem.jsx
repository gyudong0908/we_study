import { React, useState } from 'react';
import { Stack, Typography, Grid, Button } from '@mui/material';

export default function MemoListItem({memo, rewind}){

    return(
        <>
        <Stack sx={{ padding: '0px 30px' }}>
            
            <Typography variant='h4'>
                {memo.title}
            </Typography>
            <Typography variant='body1'>{memo.content}</Typography>
            <Typography variant='caption'>{memo.date}</Typography>
            <Grid container spacing={1} mt={15} sx={{ justifyContent: 'flex-end' }}>
                <Grid item>
                    <Button variant='outlined' onClick={rewind} sx={{borderRadius:'20px'}}>뒤로가기</Button>
                </Grid>
                <Grid item>
                    <Button variant='outlined' sx={{borderRadius:'20px'}}>수정하기</Button>
                </Grid>
            </Grid>
            
        </Stack>
        </>
    );
};