import { Stack, Box, Typography } from "@mui/material";
import PeopleComponent from "./ClassPeople";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";

export default function ClassPeople() {
    const [students, setStudent] = useState([])
    const [teacher, setTeacher] = useState({});
    const { classId } = useParams();
    function getUser() {
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/class/user?classId=${classId}`, { withCredentials: true }).then(response => {
            let newData = [];
            for (const user of response.data.userData) {
                if (user.id === response.data.teacherId) {
                    setTeacher(user);
                } else {
                    newData.push(user);
                }
            }
            setStudent(newData);
        })
    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <Stack>
            <Stack sx={{ mb: 5 }}>
                <Stack sx={{ borderBottom: '1.5px solid black', mb: 2 }}>
                    <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>
                        교사
                    </Typography>
                </Stack>
                <PeopleComponent people={teacher} />
            </Stack>
            <Stack>
                <Box sx={{
                    borderBottom: '1.5px solid black', mb: 2,
                    alignItems: 'center', justifyContent: 'space-between', display: 'flex'
                }}>
                    <Typography variant="h4" component="span" sx={{ mb: 1, fontWeight: 'bold', color: '#0091ea' }}>
                        학생
                    </Typography>
                    <Typography variant='body1'>총 학생수 | {students.length}명</Typography>
                </Box>
                {
                    students.map(student => {
                        console.log(student)
                        return <PeopleComponent people={student}></PeopleComponent>
                    })
                }
            </Stack>

        </Stack>
    )
}