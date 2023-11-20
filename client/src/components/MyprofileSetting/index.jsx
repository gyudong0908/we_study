import { Stack, Typography, Button } from "@mui/material"
import ProfileCard from "./ProfileCard"
import SettiingAlarm from "./SettingAlarm"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useState } from "react"
import { changeUserData } from "../../reducer/userdata"
export default function MyProfileSetting() {
    const user = useSelector(state => state.userData);
    const disPatch = useDispatch();
    const [newUserData, setNewUserData] = useState({});

    function saveProfile() {
        axios.put('http://localhost:8081/user', newUserData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            disPatch(changeUserData({ ...user, ...newUserData }));
            alert('저장되었습니다.');
        }).catch(err => {
            console.log(err);
        })
    }
    console.log(user)
    return (
        <Stack spacing={4}>
            {user.userData !== undefined ?
                <>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant="h2" fontWeight="bold">프로필</Typography>
                        <Button variant="contained" size='large' sx={{ marginBottom: '30px' }} onClick={saveProfile}>저장</Button>
                    </Stack>
                    <ProfileCard userData={user.userData} newUserData={newUserData} setNewUserData={setNewUserData}></ProfileCard>
                    <Typography variant="h2" fontWeight="bold">클래스 별 알림 설정</Typography>
                    <SettiingAlarm></SettiingAlarm>
                </> : null
            }
        </Stack>

    )
}