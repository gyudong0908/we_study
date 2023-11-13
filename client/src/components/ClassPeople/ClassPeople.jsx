import { Stack, Grid, styled, Button } from "@mui/material";
import {Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { purple } from '@mui/material/colors';

export default function PeopleComponent({name}){
    console.log(name)
    const ColorButton = styled(Button)(({ theme }) => ({
        margin : '10px',
        borderRadius : '20px',
        background: 'linear-gradient(to bottom, #A1D4F7 20%, 70% ,#6213EB)',
        color : 'white',
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));

    return(
        <Grid container columns={24}>
            {/* 이 밑은 지금은 icon으로 넣었지만 나중에 profile사진으로 넣을 수 있음 */}
            <Grid item xs={1}>
            <AccountCircleIcon sx={{
                fontSize : '40pt',
            }}/>
            </Grid>
            <Grid item xs={23}> 
            <Stack sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h4' sx={{alignSelf : 'center', marginLeft : '20px'}}>{name}</Typography>
                <ColorButton>1대1 채팅하기</ColorButton>
            </Stack>
            </Grid>
        </Grid>
    );
}