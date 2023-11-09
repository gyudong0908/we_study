import React, {useState, useEffect} from 'react';
import {Card, CardContent, Stack, Typography, Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import axios from 'axios';

const fixedCardData = [
  { id: 1, title: '강의 1', content: 'cardContent' },
  { id: 2, title: '강의 2', content: '카드 내용 2' },
  { id: 3, title: '강의 3', content: '카드 내용 3' },
  { id: 3, title: '강의 4', content: '카드 내용 4' },
];

export default function MyPage() {
  const [classCards, setClassCards] = React.useState([]);
  const fetchCardData = async()=>{
    try{
      // const response = await axios.get('http://localhost:8081/class', { withCredentials: true });
  
      const cardData = response.data;
      const newCard = (
        <Card variant="outlined">
          <CardContent sx={{height: '10rem', width:'10rem'}}>
            <Typography variant="h6">{cardData.name}</Typography>
            <Typography variant="subtitle2">{cardData.section}</Typography>
            <Typography variant="body2">{cardData.description}</Typography>
          </CardContent>
        </Card>
      );
  
      setClassCards((prevCards)=>[...prevCards, newCard]);
    } catch(error){
      console.error('get 요청 실패:', error);
    }
  };
  
  useEffect(()=>{
    //페이지 로드 시 GET 요청 전송
    fetchCardData();
  }, []);


  return (
    <Stack
      sx={{
        direction: 'column',
        spacing: 'px',
        marginTop: '100px',
        marginLeft: '270px',
        marginRight: '70px',
      }}
    >
      <Stack direction='column' spacing={10}>
      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={12} md={8}>
            <Typography variant='h4' sx={{ fontWeight:'bold' }}>생성한 클래스</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {classCards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              {card}
            </Grid>
          ))} 
        </Grid>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={12} md={8}>
            <Typography variant='h4' sx={{ fontWeight:'bold' }}>참여 중인 클래스</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          
          {fixedCardData.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent sx={{ width:'10rem', height: '10rem'}}>
                  <Typography variant="h5">{card.title}</Typography>
                  <Typography variant="body1">{card.content}</Typography>
                  <Typography variant="body2" marginTop={'10px'}>{card.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))} 
        </Grid>
      </Stack>
      </Stack>
    </Stack>
  );
}
