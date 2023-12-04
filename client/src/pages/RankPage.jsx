import { Typography, FormControl, Select, MenuItem, Grid, Card, CardContent, Divider, Stack, Box } from "@mui/material"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import StickyHeadTable from "../components/RankPage/StickyHeadTable";
import * as React from 'react';
import axios from "axios";

const card = (
  <React.Fragment>
    <CardContent sx={{ height: "58.88px" }}>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        👑Top 20
      </Typography>
    </CardContent>

  </React.Fragment>
);

export default function RankPage() {
  const [selectedClass, setSelectedClass] = React.useState('');
  const [data, setData] = React.useState([]);
  const [dataByClass, setDataByClass] = React.useState([]);
  const [userClass, setUserClass] = React.useState([]);

  const handleChange = async (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);

    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/rank?classId=${classId}`, { withCredentials: true });
      setDataByClass(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/rank`, { withCredentials: true });
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  async function getUserClass() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/user/classes`, { withCredentials: true });
      console.log(response.data);
      setUserClass(response.data);
      if (response.data) {
        setSelectedClass(response.data[0].id);
        try {
          const rankResponse = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/rank?classId=${response.data[0].id}`, { withCredentials: true });
          setDataByClass(rankResponse.data);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };



  React.useEffect(() => {
    fetchData()
    getUserClass()
  }, []);

  return (
    <Stack
      sx={{
        // direction: 'column',
        // spacing: 'px',
        // marginTop: '100px',
        // marginLeft: '300px',
        // marginRight: '70px',
        // marginBottom: '200px',
        // direction: 'column',
        // marginTop: '115px',
        // marginLeft: '320px',
        // marginRight: '50px',
        // marginBottom: '150px',
        direction:'column',
        marginTop:'115px',
        marginLeft:'20rem',
        marginRight:'10rem',
        marginBottom:'10rem'
      }}
    >
      <Typography variant="h3" textAlign="center" gutterBottom>
        학습랭킹
      </Typography>

      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        이번주 누적 학습시간에 따른 학습랭킹을 소개합니다.<p></p>
        나의 일주일 공부 시간을 확인하고 <p></p>
        스터디 메이트들과 함께 계속 달려봐요!🔥
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 150, m: 1, maxWidth: 180 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedClass}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Select a class' }}
                style={{ fontSize: '18px' }}
              >
                <MenuItem value="">Select a class</MenuItem>
                {userClass.map((row, index) => {
                  return <MenuItem value={row.id} key={index}>{row.title}</MenuItem>
                })}

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
        <StickyHeadTable data={data} />
        <StickyHeadTable data={dataByClass} />

      </Stack>
    </Stack>

  )
}
