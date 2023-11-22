import * as React from 'react';
import { Card, CardContent, TextField, Stack, FormControl, Select, InputLabel, MenuItem, Avatar, Input } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ProfileCard({ userData, newUserData, setNewUserData }) {
  const [birthDay, setBirthDay] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [job, setJob] = React.useState(null);
  const [goal, setGoal] = React.useState(null);
  const [profile, setProfile] = React.useState(null);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setNewUserData({ ...newUserData, file: selectedFile });
    readFile(selectedFile);
  };

  function readFile(profile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setProfile(fileContent);
    };
    reader.readAsDataURL(profile);
  }
  return (
    <Card sx={{ maxWidth: '700px' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' alignItems='center'>
              <Avatar alt="Remy Sharp" sx={{ width: 60, height: 60, marginLeft: '10px', marginRight: '10px' }} src={profile ? profile : userData.downloadPath} />
              <InputLabel htmlFor="file-input" sx={{ cursor: 'pointer' }}>프로필 사진 변경</InputLabel>
              <Input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </Stack>
            <TextField id="filled-basic" label="닉네임" sx={{ width: 200 }}
              defaultValue={userData.nickName} onChange={(e) => { setNewUserData({ ...newUserData, nickName: e.target.value }) }} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="생년월일" defaultValue={dayjs(userData.birthDay)} onChange={(value) => { setNewUserData({ ...newUserData, birthDay: value }) }} />
            </LocalizationProvider>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">성별</InputLabel>
              <Select
                label="성별"
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                defaultValue={userData.gender}
                onChange={(e) => { setNewUserData({ ...newUserData, gender: e.target.value }) }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'남자'}>남자</MenuItem>
                <MenuItem value={'여자'}>여자</MenuItem>
              </Select>
            </FormControl>
            <TextField id="filled-basic" label="직업"
              defaultValue={userData.job} onChange={(e) => { setNewUserData({ ...newUserData, job: e.target.value }) }} />
          </Stack>
          <TextField id="filled-basic" label="학습 목적"
            defaultValue={userData.goal} onChange={(e) => { setNewUserData({ ...newUserData, goal: e.target.value }) }} />
          <TextField id="filled-basic" label="한 줄 소개"
            defaultValue={userData.aboutMe} onChange={(e) => { setNewUserData({ ...newUserData, aboutMe: e.target.value }) }} />
        </Stack>
      </CardContent>
    </Card>
  );
}