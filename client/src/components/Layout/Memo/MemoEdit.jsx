import { Stack, Button, TextField, Typography, InputBase } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoEdit({ selectMemo, moveList, editMemo }) {
    const [title, setTitle] = React.useState(null);
    const [content, setContent] = React.useState(null);

    return (
        <Stack>
        <Stack direction='row' mb={1}>
            <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
            <Stack sx={{
                alignItems:'center',
                justifyContent:'center',
                width:'25rem',
            }}>
                <Typography variant="h5" sx={{fontWeight:'bold', }}>✍️ 메모 수정하기</Typography> 
            </Stack> 
        </Stack>
        <Stack sx={{
                overflowY:'auto',
                height:'230px',
                padding:'0.5rem',
            }}>
            <InputBase
                placeholder="제목을 입력하세요"
                defaultValue={selectMemo.title}
                onChange={(e) => { setTitle(e.target.value) }}
                multiline
                sx={{
                    fontSize:'1.2rem',
                    width: '100%',
                    wordBreak:'break-all',
                    overflowWrap:'break-word',
                    whiteSpace:'pre-line',
                    color:'navy'
                }}
            />
            <InputBase
                placeholder="본문을 입력하세요"
                multiline
                defaultValue={selectMemo.content}
                onChange={(e) => { setContent(e.target.value) }}
                sx={{
                    width:'100%',
                    wordBreak:'break-all',
                    overflowWrap:'break-word',
                    overflowY:'auto',
                    whiteSpace:'pre-line',
                }}
            />
            <Stack sx={{
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                <Button 
                    variant='outlined'
                    onClick={() => {
                        if (title === '') {
                            alert('제목은 필수로 입력해야 합니다.');
                            return
                        }
                        editMemo(selectMemo.id, { title: title != null ? title : selectMemo.title, content: content != null ? content : selectMemo.content });
                        moveList();
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 13,
                        width:'6rem',
                        height:'2.5rem',                        
                    }}
                >확인</Button>
            </Stack>
        </Stack>
            
            
        </Stack>
    )
}