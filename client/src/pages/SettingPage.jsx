import MyPfrofileSetting from "../components/MyprofileSetting";
import { Box } from "@mui/material";

export default function SettingPage() {
    return (
        <Box sx={{
            // marginTop: '100px',
            // marginLeft: '270px',
            // marginRight: '70px',
            // marginBotton: '200px',
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
        }}>
            <MyPfrofileSetting/>
        </Box>
    )
}