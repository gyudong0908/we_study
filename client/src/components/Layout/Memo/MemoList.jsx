import { Stack, Typography, Button } from "@mui/material";
import * as React from "react";
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

export default function MemoList({ memos, moveView, moveCreate, deleteMemo }) {
    return (
        <Stack marginTop={2}>
            {
                memos.map(memo => (
                    <Stack direction='row' justifyContent='space-between' marginTop={2}>
                        <Typography onClick={() => { moveView(memo); }} sx={{ cursor: 'pointer' }}>{memo.title}</Typography>
                        <Stack direction='row'>
                            <Typography>{dayjs(memo.updatedAt).format('YYYY-MM-DD hh:mm A')}</Typography>
                            <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => { deleteMemo(memo.id) }}></CloseIcon>
                        </Stack>
                    </Stack>
                ))
            }
            <Button
                sx={{ position: 'absolute', bottom: 0, left: '42%' }}
                onClick={moveCreate}
            >생성하기</Button>
        </Stack>
    )
}