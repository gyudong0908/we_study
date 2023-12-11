import { Button, Stack, Typography, InputBase } from "@mui/material";
import * as React from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoCreate({ moveList, createMemo }) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    return (
        <Stack>
            <Stack direction='row' mb={1}>
                <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
                <Stack sx={{
                    alignItems:'center',
                    justifyContent:'center',
                    width:'25rem',
                }}>
                    <Typography variant="h5" sx={{fontWeight:'bold', }}>✍️ 새 메모</Typography> 
                </Stack>                
            </Stack>
            <Stack sx={{
                overflowY:'auto',
                height:'230px',
                padding:'0.5rem',
            }}>
                <InputBase
                    placeholder="제목을 입력하세요"
                    onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
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
                    onChange={(e) => { setContent(e.target.value) }}
                    value={content}
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
                        createMemo({ title: title, content: content }); moveList();
                        }}
                        sx={{
                            position: 'absolute',
                            bottom: 13,
                            width:'6rem',
                            height:'2.5rem',
                        }}
                    >생성하기</Button>
                </Stack>
                
            </Stack>
            
        </Stack>
    )
}