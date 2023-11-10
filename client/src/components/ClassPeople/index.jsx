import { Stack } from "@mui/material";
import {Typography} from "@mui/material";
import PeopleCompoent from "./ClassPeople";

export default function ClassPeople(){
    const students = ['이동규', '조정석', '최혜린'];

    return(
        <Stack sx={{ marginRight: '100px'}}>
            <Stack sx={{ marginBottom : '60px'}}>
                <Stack sx={{
                    borderBottom : '1px solid black',
                    paddingBottom : '5px'
                }}>
                    <Typography variant='h4'>교사</Typography>
                </Stack>
                <PeopleCompoent name = {"이창현"}></PeopleCompoent>
            </Stack>
            <Stack>
                <Stack sx={{
                    borderBottom : '1px solid black',
                    paddingBottom : '5px',
                }}>
                    <Typography variant='h4'>학생</Typography>
                </Stack>
                {
                    students.map(name=>{
                        return <PeopleCompoent name = {name}></PeopleCompoent>
                    })
                }
            </Stack>
        </Stack>
    )
}