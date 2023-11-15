import { Stack, Box, Typography } from "@mui/material";
import PeopleComponent from "./ClassPeople";

export default function ClassPeople(){
    const students = ['이동규', '조정석', '최혜린'];

    return(
        <Stack>
            <Stack sx={{ mb:5 }}>
                <Stack sx={{borderBottom:'1.5px solid black', mb:2}}>
                    <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                        교사
                    </Typography>
                </Stack>
                <PeopleComponent name = {"이창현"} />
            </Stack>
            <Stack>
                <Box sx={{borderBottom:'1.5px solid black', mb:2, 
                    alignItems:'center', justifyContent:'space-between', display:'flex'}}>
                    <Typography variant="h4" component="span" sx={{ mb:1, fontWeight: 'bold', color:'#0091ea'}}>
                        학생
                    </Typography>
                    <Typography variant='body1'>총 학생수 | {students.length}명</Typography>
                </Box>
                {
                    students.map(name=>{
                        return <PeopleComponent name = {name}></PeopleComponent>
                    })
                }
            </Stack>
        </Stack>
    )
}