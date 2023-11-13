import { Stack, Typography } from "@mui/material"
import ProfileCard from "./ProfileCard"
import SettiingAlarm from "./SettingAlarm"
export default function MyProfileSetting(){
    return (
        <Stack spacing={4}>
        <Typography variant="h2" fontWeight="bold">프로필</Typography>
        <ProfileCard></ProfileCard>
        <Typography variant="h2" fontWeight="bold">클래스 별 알림 설정</Typography>
        <SettiingAlarm></SettiingAlarm>
        </Stack>
        
    )
}