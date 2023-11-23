import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoCreate({ moveList, createMemo }) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    return (
        <Stack sx={{ margin: '4px' }}>
            <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
            <TextField label="제목을 입력하세요"
                sx={{ width: 400, marginBottom: 2 }}
                variant="standard"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
            />
            <TextField label="본문을 입력하세요"
                sx={{ width: 400 }}
                multiline
                rows={8}
                variant="standard"
                onChange={(e) => { setContent(e.target.value) }}
                value={content}
            />
            <Button onClick={() => {
                if (title === '') {
                    alert('제목은 필수로 입력해야 합니다.');
                    return
                }
                createMemo({ title: title, content: content }); moveList();
            }}>생성하기</Button>
        </Stack>
    )
}