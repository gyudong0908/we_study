import { Typography } from "@mui/material"    //부트스트랩 쓸때처럼 import 해주란듯.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import StickyHeadTable from "../components/RankPage/StickyHeadTable";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


import Grid from "@mui/material/Grid";

import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';




import * as React from 'react';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';








const card = (
  <React.Fragment>
    <CardContent sx={{height:"58.88px"}}>
      <Typography sx={{ fontSize: 18}} color="text.secondary" gutterBottom>
       Top 20
      </Typography>
    </CardContent>

  </React.Fragment>
);





export default function RankPage() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

 
  return (
    <Stack
      sx={{
        direction: 'column',
        spacing: 'px',
        marginTop: '100px',
        marginLeft: '300px',
        marginRight: '70px',
        marginBottom: '200px',
      }}
    >
      <Typography variant="h3" textAlign="center" gutterBottom>
        학습랭킹
      </Typography>

      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        이번주 누적 학습시간에 따른 학습랭킹을 소개합니다.<p></p>
        나의 일주일 공부 시간을 확인하고 <p></p>
        스터디 메이트들과 함께 계속 달려봐요!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Box sx={{ minWidth: 150,  m: 1, maxWidth: 180}}>
      <Card variant="outlined">{card}</Card>
    </Box>
        </Grid>
        <Grid item xs={6}>
          <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{ fontSize: '18px' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
        </Grid>
      </Grid>




      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}

      >

        <StickyHeadTable />

        <StickyHeadTable />
      </Stack>
    </Stack>



  )
}