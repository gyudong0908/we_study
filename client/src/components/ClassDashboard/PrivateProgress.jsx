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

// function CircularProgressWithLabel(props) {
//   return (
//     <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginBottom: '40px' }}>
//       <CircularProgress variant="determinate" {...props} size={300} />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'absolute',
//         }}
//       >
//         <Typography variant="h4" component="div" color="text.secondary" fontWeight='bold'>
//           {props.value}%
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

const CircularProgressBar = ({ percentage }) => {
  return (
    <div style={{ width: '15vw', height: '15vh' }}>
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

  useEffect(() => {
    getAttendance();
  }, [])

  return (
    <Stack justifyContent='center'>
      <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
        <Typography variant='h4' sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }} >나의 학습 진행 상황</Typography>
      </Stack>
      <Stack direction='row' spacing={5}>
        <Stack direction='column' spacing={5} sx={{textAlign:'center',}}>
          <Typography variant='h4' fontWeight='bold'>출석</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
            <DemoContainer components={['DateCalendar', 'DateCalendar']}>
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
          <Button onClick={attendance}>출석</Button>
        </Stack >
        <Stack textAlign='center' direction='column' spacing={5} alignItems='center'>
          <Typography variant='h4' fontWeight='bold'>과제</Typography>
          <CircularProgressBar percentage={30}/>
        </Stack>
        <Stack textAlign='center' direction='column' spacing={5} alignItems='center'>
          <Typography variant='h4' fontWeight='bold'>퀴즈</Typography>
          <CircularProgressBar percentage={80}/>
        </Stack>
      </Stack>
    </Stack>
  )
}