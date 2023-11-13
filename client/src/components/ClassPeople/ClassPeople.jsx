import { Stack, Grid, styled, Button, Box } from "@mui/material";
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
            <Grid item xs={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* 이 밑은 지금은 icon으로 넣었지만 나중에 profile사진으로 넣을 수 있음 */}
                <AccountCircleIcon sx={{ fontSize: '30px', marginY:'auto'}} />
            </Grid>
            <Grid item xs={23} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'>{name}</Typography>
                <ColorButton sx={{ textShadow: '1px 1px 3px #6200ea', marginLeft: '10px' }}>1 : 1 💬</ColorButton>
            </Grid>
        </Grid>
    );
}