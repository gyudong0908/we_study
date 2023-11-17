import React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Card, CardActions, CardContent, Button, Typography, Stack, Grid } from '@mui/material';

export default function WorkDetail(){
    const assignment = {title:'과제1', content:'과제 내용입니다.'};
    const workData = [
        {
            id:1,
            name:'이동규',
            title:'과제 제출합니다.',
            content:'제출 과제에 대한 세부 설명입니다.',
            date:'2023.11.16.'
        },
        {
            id:2,
            name:'최혜린',
            title:'과제 제출!!!',
            content:'제출 과제에 대한 세부 설명입니다.',
            date:'2023.11.17.'
        },
    ];

    return(
        <Stack
            sx={{
                direction: 'column',
                spacing: '10px',
                marginTop: '100px',
                marginLeft: '270px',
                marginRight: '70px'
            }}>
            <Card sx={{mb:2}}>
                <CardContent sx={{padding:'30px'}}>
                    <Grid container spacing={1} sx={{alignItems:'center', width:'100%'}}>
                        <Grid item><AccountCircleRoundedIcon fontSize='large'/></Grid>
                        <Grid item><Typography variant='h6'>{workData[0].name}</Typography></Grid>
                        <Grid item><Typography variant='caption'>{workData[0].date}</Typography></Grid>
                    </Grid>
                    <Stack sx={{mt:5}}>
                        <Typography variant='h5'>{workData[0].title}</Typography>
                        <Typography variant='body1' sx={{
                                mt:3
                            }}>
                                {workData[0].content}
                        </Typography>
                    </Stack>
                    <CardActions sx={{justifyContent:'flex-end'}}>
                        <Button size="medium">첨부된 파일</Button>
                     </CardActions>
                </CardContent>
                
            </Card>
            <Grid container  spacing={1}>
                <Grid item><Button variant='outlined'>목록</Button></Grid>
                <Grid container sx={{justifyContent:'flex-end'}} spacing={1}>
                    <Grid item><Button variant='outlined'>삭제</Button></Grid>
                    <Grid item><Button variant='outlined'>수정</Button></Grid>
                </Grid>
                     
        </Grid>
        </Stack>
    );
}