import MyPfrofileSetting from "../components/MyprofileSetting";
import { Box } from "@mui/material";

export default function SettingPage() {
    return (
        <Box sx={{
            marginTop: '100px',
            marginLeft: '270px',
            marginRight: '70px',
        }}>
            <MyPfrofileSetting/>
        </Box>
    )
}