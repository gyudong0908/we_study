import { Stack, Button, TextField } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoEdit({ selectMemo, moveList, editMemo }) {
    const [title, setTitle] = React.useState(null);
    const [content, setContent] = React.useState(null);
    return (
        <Stack sx={{ margin: '4px' }}>
            <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
            <TextField label="제목을 입력하세요"
                sx={{ width: 400, marginBottom: 2 }}
                variant="standard"
                defaultValue={selectMemo.title}
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <TextField label="본문을 입력하세요"
                sx={{ width: 400 }}
                multiline
                rows={8}
                variant="standard"
                defaultValue={selectMemo.content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <Button onClick={() => {
                if (title === '') {
                    alert('제목은 필수로 입력해야 합니다.');
                    return
                }
                editMemo(selectMemo.id, { title: title != null ? title : selectMemo.title, content: content != null ? content : selectMemo.content }); moveList();
            }}>변경하기</Button>
        </Stack>
    )
}