import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, PickersDay } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Stack, CircularProgress, Typography, Box, Badge, Button } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.format('YYYY-MM-DD')) >= 0;
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <CircleRoundedIcon style={{ color: 'red', fontSize: '10pt' }} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

const CircularProgressBar = ({ percentage }) => {
  console.log(percentage)
  return (
    <div style={{ width: '11rem', height: '11rem' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={13}
        styles={buildStyles({
          textColor: '#757575',
          pathColor: '#3F51B5',
          trailColor: 'rgba(255,255,255,0.2)',
          textSize: '15px'
        })}
      />
    </div>
  );
};

export default function PrivateProgress() {
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [progress, setProgress] = useState({});
  const { classId } = useParams();

  function getAttendance() {
    axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/attendances?classId=${classId}`, { withCredentials: true }).then((response) => {
      setHighlightedDays(response.data.map((attendance) => new Date(attendance).toISOString().slice(0, 10)));
    }).catch(err => {
      console.log(err);
    })

  }
  function attendance() {
    axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/attendance?classId=${classId}`, null, { withCredentials: true }).then(() => {
      setHighlightedDays([...highlightedDays, new Date().toISOString().slice(0, 10)]);
      alert('출석이 완료 되었습니다.');
    })
      .catch(err => {
        console.log(err);
        alert('출석에 실패하였습니다.');
      })
  }

  async function getProgresss(){
    try{
      const progressWork = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/progress/private/work?classId=${classId}`, { withCredentials: true })
      const progressQuiz = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/progress/private/quiz?classId=${classId}`, { withCredentials: true })
      setProgress({totalSubmitCount: progressWork.data.totalSubmitCount, mySubmitCount: progressWork.data.mySubmitCount, totalQuizCount: progressQuiz.data.totalQuizCount, myQuizCount: progressQuiz.data.myQuizCount})
    }catch(err){
      console.log(err);
    }
  }
  console.log(progress)
// console.log(progress.totalSubmitCount / progress.mySubmitCount)
  useEffect(() => {
    getAttendance();
    getProgresss();
  }, [])

  return (
    <Stack sx={{overflow:'hidden', justifyContent:'center'}}>
      <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
        <Typography variant='h4' sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }} >나의 학습 진행 상황</Typography>
      </Stack>
      <Stack direction='row' sx={{mb:5, justifyContent:'space-evenly'}}>
        <Stack direction='column' spacing={3} sx={{textAlign:'center',alignItems:'center'}}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateCalendar', 'DateCalendar']} sx={{width:'20rem', height:'20rem', padding:0}}>
              <DateCalendar value={dayjs()} readOnly
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  },
                }}
                sx={{marginRight:'0px'}}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant='contained' 
            sx={{width:'10rem'}}
            onClick={attendance}>
            <Typography>출석</Typography>
          </Button>
        </Stack >
        <Stack justifyContent={'center'} direction='column' spacing={5} alignItems='center'>
          <Typography variant='h5' fontWeight='bold'>[ 과제 제출률 ]</Typography>
          <CircularProgressBar percentage={Math.floor((progress.mySubmitCount / progress.totalSubmitCount) *100) }/>
        </Stack>
        <Stack justifyContent={'center'} direction='column' spacing={5} alignItems='center'>
          <Typography variant='h5' fontWeight='bold'>[ 퀴즈 제출률 ]</Typography>
          <CircularProgressBar percentage={Math.floor((progress.myQuizCount / progress.totalQuizCount)*100)}/>
        </Stack>
      </Stack>
    </Stack>
  )
}