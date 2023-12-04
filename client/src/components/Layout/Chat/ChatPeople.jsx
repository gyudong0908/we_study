import { Grid, styled, Stack } from "@mui/material";
import { Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { useEffect, useRef } from "react";

export default function ChatPeople(props) {

    return (
        <Stack>
            {props.data.map(data => {
                return (
                    <Grid container onClick={() => { props.onClickHandler(data.ClassChat.id, data.id, data.ClassChat.title) }} sx={{ cursor: 'pointer', '&:hover': { background: 'rgba(0, 0, 0, 0.1)' } }} >
                        {/* 이 밑은 지금은 icon으로 넣었지만 나중에 profile사진으로 넣을 수 있음 */}
                        <Grid item sx={{ marginLeft: '10px', justifyContent:'center', alignItems:'center' }} xs={1}>
                            <SchoolRoundedIcon />
                        </Grid>
                        <Grid item xs={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h5' sx={{ alignItems: 'center', margin:'1rem'}}>{data.ClassChat.title}</Typography>
                        </Grid >
                    </Grid>
                )
            })}
        </Stack>
    )
}