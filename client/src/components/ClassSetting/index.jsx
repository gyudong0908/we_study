import {Typography, TextField, Stack, Box, Button} from '@mui/material';

export default function ClassSetting({isTeacher}){
    return(
        <>
        <Box sx={{marginRight: '30px'}}>
        <Button variant="contained" size='large' sx={{float: 'right', marginTop:'10px'}}>저장</Button>
        <Stack spacing={2}>
            <Typography variant='h2'>클래스 세부 정보</Typography>
            <TextField id="outlined-basic" label="클래스이름(필수)" variant="filled" />
            <TextField id="outlined-basic" label="교사 이름(필수)" variant="filled" />
            <TextField id="outlined-basic" label="클래스 소개(선택)" variant="filled" />
        </Stack>
        <Stack spacing={3} sx={{marginTop: '70px'}}>
        <Typography variant='h2'>클래스 초대 코드 관리</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>클래스 코드</Typography>
                <Typography>5asr5sge</Typography>                
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>초대 링크</Typography>
                <Typography>https://classroom.google.sadfsad</Typography>                
            </Box>
        </Stack>
        </Box>
        </>
    )
}