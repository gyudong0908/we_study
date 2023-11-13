import { Stack } from "@mui/material";
import {Typography} from "@mui/material";
import PeopleComponent from "./ClassPeople";
import StudyProgress from "../ClassDashboard/StudyProgress";

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
                <PeopleComponent name = {"이창현"}></PeopleComponent>
            </Stack>
            <Stack>
                <Stack sx={{
                    borderBottom : '1px solid black',
                    paddingBottom : '5px',
                    display: "flex",
                    justifyContent: 'space-between'
                }}>
                    <Typography variant='h4'>학생</Typography>
                    <Typography variant='h4'>총 학생수 | {students.length}명</Typography>
                </Stack>
                {
                    students.map(name=>{
                        return <PeopleComponent name = {name}></PeopleComponent>
                    })
                }
            </Stack>
        </Stack>
    )
}