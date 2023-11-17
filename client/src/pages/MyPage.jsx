import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Stack, Typography, Grid } from '@mui/material';
import axios from 'axios';
import {setClassCards, deleteClassCards} from '../reducer/classCardsSlice';



export default function MyPage() {
  // const [classCards, setClassCards] = React.useState([]);
  // const [data, setData] = useState([]);
  const data = useSelector((state)=>state.classCards);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCardData = async () => {
    dispatch(deleteClassCards());
    try {
      const response = await axios.get('http://localhost:8081/classes', { withCredentials: true });
      const createdClassData = response.data;
      console.log(createdClassData);
      dispatch(setClassCards(createdClassData))
    } catch (error) {
      console.error('get 요청 실패:', error);
    }
  };

  useEffect(() => {
    //페이지 로드 시 GET 요청 전송
    // fetchCardData();
  }, []);



  return (
    <Stack
      sx={{
        direction: 'column',
        spacing: 'px',
        marginTop: '100px',
        marginLeft: '270px',
        marginRight: '70px',
      }}>
      <Stack direction='column' spacing={10}>
        <Stack direction="column" spacing={1}>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item flexShrink={0}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#0092ea' }}>내가 가르치는 클래스</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            {data.map((data) => {
              console.log(data);
              return (
                <Grid item key={data.id}>
                  {bindedClassCard(data, navigate)}
                </Grid>
              );
            })}
          </Grid>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item flexShrink={0}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#0092ea' }}>내가 배우는 클래스</Typography>
            </Grid>
          </Grid>
          {/* <Grid container spacing={2} sx={{width:'100%'}}>
            {data.map((data, index) => {
              //console.log(data);
              return(
                <Grid item key={index}>
                  {bindedClassCard(data)}
                </Grid> 
              );
              })}
        </Grid> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

function bindedClassCard(data, navigate) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ width: '250px', height: '244px', cursor: 'pointer' }}
        onClick={() => { navigate(`/mypage/classes/${data.id}`) }}>
        <Stack sx={{ backgroundColor: '#0092ea', width: '100%', height: '40%', borderRadius: '4px', opacity: '80%', mb: 2 }} />
        <Typography variant="h5">{data.title}</Typography>
        <Typography variant="subtitle1">교사명 : {data.section}</Typography>
        <Typography variant="body2" marginTop={'10px'}>{data.description}</Typography>
      </CardContent>
    </Card>
  );
}