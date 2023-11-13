import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, PickersDay  } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Stack, CircularProgress, Typography, Box, Badge  } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useState } from 'react';

const ServerDay = (props) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.format('YYYY-MM-DD')) >= 0;
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <CircleRoundedIcon style={{ color: 'red', fontSize: '10pt' }}/> : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  };

function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginBottom: '40px'}}>
        <CircularProgress variant="determinate" {...props}  size={300}/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="div" color="text.secondary" fontWeight='bold'>
            {props.value}%
          </Typography>
        </Box>
      </Box>
    );
  }



export default function PrivateProgress(){
    const [highlightedDays, setHighlightedDays] = useState(['2023-11-01', '2023-11-02', '2023-11-03']);

    return(
        <Stack spacing={4} justifyContent='center'>
            <Typography variant='h4' fontWeight='bold' sx={{color:'#0091ea'}} >나의 학습 진행 상황</Typography>
            <Stack direction='row' spacing={30}>
                <Stack textAlign='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{marginBottom:'10px'}}>
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
                        />
                </DemoContainer>
                </LocalizationProvider>
                <Typography variant='h4' fontWeight='bold'>15/30</Typography>
                </Stack >
                <Stack textAlign='center'>
                <CircularProgressWithLabel value = {30} />
                    <Typography variant='h4' fontWeight='bold'>과제</Typography>
                </Stack>
                <Stack textAlign='center'>
                <CircularProgressWithLabel value = {50}/>
                    <Typography variant='h4' fontWeight='bold'>퀴즈</Typography>
                </Stack>
        </Stack>
      </Stack>
    )
}