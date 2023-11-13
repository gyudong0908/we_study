import * as React from 'react';
import {Card, CardContent, TextField, Stack, Typography, Box} from '@mui/material';

export default function ProfileCard() {
  return (
    <Card sx={{ maxWidth: '600px' }}>
      <CardContent>
        <Stack spacing={2}>
            <Typography>ID입니당</Typography>
            <Stack direction={'row'} spacing={2}>
            <TextField id="filled-basic" label="생년월일" variant="filled" />
            <TextField id="filled-basic" label="성별" variant="filled" />
            <TextField id="filled-basic" label="직업" variant="filled" />
            </Stack>
            <TextField id="filled-basic" label="학습 목적" variant="filled" />
            <TextField id="filled-basic" label="프로필 사진 추가하는 구역" variant="filled" />
        </Stack>
      </CardContent>
    </Card>
  );
}