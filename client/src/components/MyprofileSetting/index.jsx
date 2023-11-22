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
            disPatch(changeUserData({ ...user.userData, ...newUserData }));
            alert('저장되었습니다.');
        }).catch(err => {
            console.log(err);
        })
    }
    console.log(user)
    return (
        <>
            {user.userData !== undefined ?
                <>
                    <Typography variant='h4' sx={{mb:3, fontWeight: 'bold', color:'#0091ea'}}>프로필</Typography>
                    <Stack sx={{alignItems:'center', mb:3}}>
                        <ProfileCard userData={user.userData} newUserData={newUserData} setNewUserData={setNewUserData} />
                    </Stack>
                    <Button variant="outlined" size='large' sx={{ float:'right', width:'20%'}} onClick={saveProfile}>저장</Button>

                    <Typography variant='h4' sx={{mb:3, fontWeight: 'bold', color:'#0091ea', mt:15}}>클래스 별 알림 설정</Typography>
                    <SettiingAlarm></SettiingAlarm>
                </> : null
            }
        </>

    )
}