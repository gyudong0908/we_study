import { Grid, Stack } from "@mui/material";
import {Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function TalkPeople(props){
    return(
        <Stack sx={{cursor: 'pointer'}}>
        {props.data.map(data=>{
            return(
                <Grid container>
                {/* 이 밑은 지금은 icon으로 넣었지만 나중에 profile사진으로 넣을 수 있음 */}
                <Grid item>
                <AccountCircleIcon sx={{
                    fontSize : '40pt',
                }}/>
                </Grid>
                <Grid item> 
                    <Typography variant='h4' sx={{alignSelf : 'center', marginLeft : '20px'}}>{data.name}</Typography>
                </Grid>
            </Grid>
            )
        })}
        </Stack>
    )
}