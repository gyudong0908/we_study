import { React, useState } from 'react';
import { Stack, Grid, Typography } from '@mui/material';


export default function MemoList({memos, onClickHandler}){
   
    return(
        <Stack sx={{padding:'10px 30px'}}>
            {
                memos.map((memo)=>(
                    <Grid key={memo.id} container spacing={2}
                        onClick={()=>{onClickHandler(memo.id)}}
                        sx={{cursor:'pointer'}}>
                        <Grid item xs={6}>
                            <Typography variant='subtitle1'>{memo.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack sx={{ mb: 1, textAlign:'right' }}>
                                <Typography variant='caption'>{memo.date}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                ))
            }
        </Stack>
    );
};