import { Stack, Typography, Button, TextField } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoView({ selectMemo, moveList, moveEdit }) {
    return (
        <Stack>
        <Stack direction='row' sx={{mb:1, alignItems:'center'}}>
            <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
            <Stack sx={{
                    alignItems:'center',
                    justifyContent:'center',
                    width:'17rem',
                }}>
                    <Typography variant="h5">📝</Typography> 
            </Stack>
            <Typography variant='caption'>{dayjs(selectMemo.updatedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
        </Stack>
        <Stack sx={{
                overflowY:'auto',
                height:'230px',
                padding:'0.5rem',
                // backgroundColor:'grey'
            }}>
            <Typography sx={{
                mb:2,
                fontSize:'1.2rem',
                color:'navy',
                wordBreak:'break-all',
                overflowWrap:'break-word',
                }}>
                {selectMemo.title}</Typography>
            <Typography sx={{
                width:'100%',
                wordBreak:'break-all',
                whiteSpace:'pre-line',
                overflowWrap:'break-word',
                overflowY:'auto',
                }}>
                {selectMemo.content}</Typography>
            <Stack sx={{
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                <Button 
                    variant='outlined'
                    onClick={() => { moveEdit(selectMemo) }}
                    sx={{
                        position: 'absolute',
                        bottom: 13,
                        width:'6rem',
                        height:'2.5rem',
                    }}
                >수정하기</Button>
            </Stack>
        </Stack>
        </Stack>
    )
}