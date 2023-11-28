import { Stack, Typography, Button, TextField } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function MemoView({ selectMemo, moveList, moveEdit }) {
    return (
        <Stack sx={{ margin: '4px' }}>
            <ArrowBackRoundedIcon onClick={moveList} sx={{ cursor: 'pointer' }} />
            <Stack direction='row' justifyContent='space-between'>
                <Typography sx={{ marginBottom: 2 }}>제목: {selectMemo.title}</Typography>
                <Typography>{dayjs(selectMemo.updatedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
            </Stack>
            <TextField
                multiline
                focused
                rows={10}
                InputProps={{
                    readOnly: true,
                }}
                value={selectMemo.content}
                variant="standard"
            ></TextField>
            <Button onClick={() => { moveEdit(selectMemo) }}>수정하기</Button>
        </Stack>
    )
}