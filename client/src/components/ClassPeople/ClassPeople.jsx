import { Stack, Grid, styled, Button, Box } from "@mui/material";
import { Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { purple } from '@mui/material/colors';

export default function PeopleComponent({ people }) {
    console.log(name)
    const ColorButton = styled(Button)(({ theme }) => ({
        margin: '10px',
        borderRadius: '20px',
        background: 'linear-gradient(to bottom, #A1D4F7 20%, 70% ,#6213EB)',
        color: 'white',
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    return (
        <Grid container columns={24}>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <AccountCircleIcon sx={{ fontSize: '40px', marginY: 'auto' }} />
                <Typography variant='h6' sx={{ textAlign: 'left', marginLeft: '10px' }}>{people.nickName}</Typography>
            </Grid>

            <Grid item xs={16} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ColorButton sx={{ textShadow: '1px 1px 3px #6200ea', marginLeft: '10px' }}>1 : 1 💬</ColorButton>
            </Grid>
        </Grid>
    );
}