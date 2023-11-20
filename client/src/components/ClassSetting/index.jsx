import { Typography, TextField, Stack, Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chageClassCards } from '../../reducer/classCardsSlice';
export default function ClassSetting({ isTeacher, classData, setClassData }) {
    const { classId } = useParams();
    const [newClassData, setNewClassData] = useState({});
    const classDatas = useSelector((state) => state.classCards);
    const dispatch = useDispatch();

    function saveClassData() {
        if (newClassData.title !== '' && newClassData.section !== '') {
            axios.put(`http://localhost:8081/class?classId=${classId}`, {
                title: newClassData.title,
                section: newClassData.section,
                description: newClassData.description
            }, { withCredentials: true }).then(() => {
                dispatch(chageClassCards(classDatas.map(data => (data.id === newClassData.id ? newClassData : data))));
                setClassData(newClassData);
                alert('저장 되었습니다.');
            }).catch(err => {
                console.log(err);
            })
        }
    }
    function changeData() {
        setNewClassData(classData);
    }
    console.log(classDatas)
    useEffect(() => {
        changeData();
    }, [])
    return (
        <>
            <Box sx={{ marginRight: '30px' }}>
                <Button variant="contained" size='large' sx={{ float: 'right', marginTop: '10px' }} onClick={saveClassData}>저장</Button>
                <Stack spacing={2}>
                    <Typography variant='h2'>클래스 세부 정보</Typography>
                    <TextField id="outlined-basic" label="클래스이름(필수)" variant="filled" value={newClassData.title}
                        onChange={(e) => { setNewClassData({ ...newClassData, title: e.target.value }) }} />
                    <TextField id="outlined-basic" label="교사 이름(필수)" variant="filled" value={newClassData.section}
                        onChange={(e) => { setNewClassData({ ...newClassData, section: e.target.value }) }} />
                    <TextField id="outlined-basic" label="클래스 소개(선택)" variant="filled" value={newClassData.description}
                        onChange={(e) => { setNewClassData({ ...newClassData, description: e.target.value }) }} />
                </Stack>
                <Stack spacing={3} sx={{ marginTop: '70px' }}>
                    <Typography variant='h2'>클래스 초대 코드 관리</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>클래스 코드</Typography>
                        <Typography>{classData.code}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>초대 링크</Typography>
                        <Typography>https://classroom.google.sadfsad</Typography>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}