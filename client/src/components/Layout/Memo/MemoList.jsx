import { Stack, Typography, Button } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export default function MemoList({ memos, moveView, moveCreate, deleteMemo }) {
    return (
        <Stack mt={1}>
            {
                memos.map(memo => (
                    <Stack direction='row'>
                        <DeleteForeverRoundedIcon 
                                onClick={() => { deleteMemo(memo.id) }} 
                                sx={{ 
                                    cursor: 'pointer',
                                    fontSize:'20px',
                                    '&:hover': { transform: 'scale(1.1)',color:'red' },
                                }} 
                            />
                        
                        <Stack direction='row' sx={{width:'400px', justifyContent:'space-between'}}>
                            <Stack sx={{width:'60%', mb:1}}>
                                <Typography
                                    onClick={() => { moveView(memo); }}
                                    sx={{
                                        ml:1, 
                                        cursor: 'pointer',
                                        '&:hover': { transform: 'scale(1.03)', },
                                        whiteSpace:'nowrap',
                                        wordWrap: 'normal',
                                        overflow:'hidden',
                                        textOverflow:'ellipsis',
                                    }}
                                >{memo.title}</Typography>
                            </Stack>
                            <Stack direction={'row'} sx={{width:'40%', justifyContent:'flex-end'}}>
                                <Typography variant='caption'>
                                    {dayjs(memo.updatedAt).format('YYYY-MM-DD hh:mm A')}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                ))
            }
            <Stack sx={{
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Button
                    variant='outlined'
                    sx={{
                        position: 'absolute',
                        bottom: 15,
                        width:'5rem',
                        height:'2.5rem',
                        }}
                    onClick={moveCreate}
                >
                    <BorderColorRoundedIcon />
                </Button>
            </Stack>

        </Stack>
    )
}