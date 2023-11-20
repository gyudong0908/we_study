import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Card, CardActions, CardContent, Button, Typography, Stack, Grid, TextField } from '@mui/material';

export default function WorkDetail(){
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

    const navigate = useNavigate();
    const handleGoBack = () => {
        // 이전 페이지로 이동
        navigate(-1);
      };

    return(
        <Stack
            sx={{
                direction: 'column',
                spacing: '10px',
                marginTop: '100px',
                marginLeft: '270px',
                marginRight: '70px',
                marginBottom: '200px'
            }}>
            <Stack sx={{mb:2, alignItems:'flex-end'}}>
                <Button variant='outlined' sx={{width:'20%'}} onClick={handleGoBack}>목록</Button>
            </Stack>
            <Stack sx={{mb:5}}>
            <Card>
                <CardContent sx={{padding:'30px'}}>
                    <Grid container spacing={1} sx={{alignItems:'center', width:'100%'}}>
                        <Grid item><AccountCircleRoundedIcon fontSize='large'/></Grid>
                        <Grid item><Typography variant='h6'>{workData[0].name}</Typography></Grid>
                        <Grid item><Typography variant='caption'>{workData[0].date}</Typography></Grid>
                    </Grid>
                    <Stack sx={{mt:3, mb:5}}>
                        <Typography variant='h5'>{workData[0].title}</Typography>
                        <Typography variant='body1' sx={{
                                mt:3
                            }}>
                                {workData[0].content}
                        </Typography>
                    </Stack>
                    <CardActions sx={{justifyContent:'flex-end', mb:3}}>
                        <Button size="medium">첨부된 파일</Button>
                     </CardActions>
                     <Stack direction='row' spacing={1} sx={{justifyContent:'flex-end', alignItems:'center',}}>
                        <Button variant='outlined' sx={{width:'10%'}}>삭제</Button>
                        <Button variant='outlined' sx={{width:'10%'}}>수정</Button>
                    </Stack> 
                </CardContent>
            </Card>
            </Stack>
            
            <InputGrade />
            <CheckGrade />
            
            
        </Stack>
    );
}

function InputGrade(){
    return(
        <Stack sx={{mb:5}}>
                <Card>
                    <CardContent sx={{padding:'30px'}}>
                    <Stack sx={{mb:2}}>
                        <Typography variant='h4' sx={{mb:1, fontWeight:'bold', color:'#0091ea'}}>성적 입력하기</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{justifyContent:'center', alignItems:'center', mb:5}}>
                        <TextField
                            id="outlined-number"
                            label="점수를 입력하세요."
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{width:'35%'}}
                        />
                        <TextField
                            id="outlined-multiline"
                            label="피드백을 입력하세요."
                            multiline
                            rows={5}
                            defaultValue="학생 과제의 잘한 점, 보완해야할 점 등"
                            sx={{width:'65%'}}
                        />
                    </Stack>
                    <Stack direction='row' spacing={1} sx={{justifyContent:'flex-end', alignItems:'center',}}>
                        <Button variant='outlined' sx={{width:'20%'}}>저장</Button>
                    </Stack> 
                    </CardContent>
                </Card>
            </Stack>
    );
}

function CheckGrade(){
    return(
        <Stack>
                <Card >
                    <CardContent sx={{padding:'30px'}}>
                    <Stack sx={{mb:2}}>
                        <Typography variant='h4' sx={{mb:1, fontWeight:'bold', color:'#0091ea'}}>성적 확인하기</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{justifyContent:'center', alignItems:'center', mb:5}}>
                        <Stack direction='column' sx={{ width:'35%', float:'top'}}>
                            <Typography variant='h5' sx={{ fontWeight:'bold', mb:1}}>점수</Typography>
                            <Stack sx={{backgroundColor:'lightgrey', padding:'30px', borderRadius:'5px', height:'50px', justifyContent:'center', alignItems:'center'}}>
                                <Typography>sdfsd</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='column' sx={{ width:'65%',}}>
                            <Typography variant='h5' sx={{ fontWeight:'bold', mb:1}}>피드백</Typography>
                            <Stack sx={{backgroundColor:'lightgrey', padding:'30px', borderRadius:'5px', justifyContent:'center', alignItems:'center'}}>
                                <Typography>가닝러미ㅏㄴ얼;ㅣ마ㅓㄴ디ㅏ러미;ㅏ넝리ㅏ먼이ㅏ러미;ㄴ어ㅣ라ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㄴㅁㅇㄹㅁㄴ</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={1} sx={{justifyContent:'flex-end',alignItems:'center',}}>
                        <Button variant='outlined' sx={{width:'10%'}}>삭제</Button>
                        <Button variant='outlined' sx={{width:'10%'}}>수정</Button>
                    </Stack> 
                    </CardContent>
                </Card>
            </Stack>
    );
}