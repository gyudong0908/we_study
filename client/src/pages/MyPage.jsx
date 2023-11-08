import {Card, CardContent, Stack, Typography, Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import * as React from 'react';

const cardData = [
  { id: 1, title: '강의 1', content: 'cardContent' },
  { id: 2, title: '강의 2', content: '카드 내용 2' },
  { id: 3, title: '강의 3', content: '카드 내용 3' },
  { id: 3, title: '강의 4', content: '카드 내용 3' },
];

export default function MyPage() {
  return (
    <Stack
      sx={{
        direction: 'column',
        spacing: 'px',
        marginTop: '100px',
        marginLeft: '300px',
        marginRight: '65px',
      }}
    >
      <Stack direction='column' spacing={10}>
      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={12} md={8}>
            <Typography sx={{ fontSize: 30, fontWeight:'bold' }}>생성한 클래스</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {cardData.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                  <CardContent sx={{height: '10rem', width:'10rem'}}>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2">{card.content}</Typography>
                  </CardContent>
              </Card>
            </Grid>
          ))} 
        </Grid>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={12} md={8}>
            <Typography sx={{ fontSize: 30, fontWeight:'bold' }}>참여 중인 클래스</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {cardData.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent sx={{height: '10rem', width:'10rem'}}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2">{card.content}</Typography>
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
