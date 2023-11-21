import { React, useState } from 'react';
import { Stack, Grid, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function MemoList({memos, onClickHandler, onClickDelete}){
   
    return(
        <Stack sx={{padding:'10px 30px'}}>
            {
                memos.map((memo)=>(
                    <>
                    <Grid key={memo.id} container spacing={2}>
                        <Grid item xs={6} sx={{cursor:'pointer'}} onClick={()=>{onClickHandler(memo.id)}}>
                            <Typography  variant='subtitle1'>{memo.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack sx={{ mb: 1, float: 'right' }} direction='row'>
                                <Typography variant='caption'>{new Date(memo.createdAt).toLocaleDateString().slice(0,-1)}</Typography>
                                <CloseRoundedIcon onClick={()=>{console.log(memo.id);onClickDelete(memo.id)}} sx={{cursor:'pointer', fontSize:'large'}}></CloseRoundedIcon>
                            </Stack>
                        </Grid>
                    </Grid>
                    </>

                ))
            }
        </Stack>
    );
};