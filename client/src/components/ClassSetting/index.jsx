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
            axios.put(`${import.meta.env.VITE_SERVER_ADDRESS}/class?classId=${classId}`, {
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
            <Box>
                <Stack sx={{ borderBottom: '1.5px solid black', mb: 3,}}>
                    <Typography variant='h4' sx={{ mb: 2, fontWeight: 'bold', color: '#0091ea' }}>클래스 세부 정보</Typography>
                </Stack>
                
                <Stack sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', p: 4, mt: 2, mb: 3 }}>
                    <Stack sx={{ mb: 3 }}>
                        <TextField id="outlined-basic" label="클래스이름(필수)" variant="outlined" value={newClassData.title}
                            onChange={(e) => { setNewClassData({ ...newClassData, title: e.target.value }) }} />
                    </Stack>
                    <Stack sx={{ mb: 3 }}>
                        <TextField id="outlined-basic" label="교사 이름(필수)" variant="outlined" value={newClassData.section}
                            onChange={(e) => { setNewClassData({ ...newClassData, section: e.target.value }) }} />
                    </Stack>
                    <Stack>
                        <TextField id="outlined-basic" label="클래스 소개(선택)" variant="outlined" value={newClassData.description}
                            onChange={(e) => { setNewClassData({ ...newClassData, description: e.target.value }) }} />
                    </Stack>
                </Stack>
                <Button variant="outlined" size='large' sx={{ float: 'right', width: '20%' }} onClick={saveClassData}>저장</Button>

                <Stack sx={{ borderBottom: '1.5px solid black', mb: 3,}}>
                    <Typography variant='h4' sx={{ mb: 2, fontWeight: 'bold', color: '#0091ea', mt:15 }}>클래스 초대 코드 관리</Typography>
                </Stack>
                
                <Stack sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '5px', p: 4, mt: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6'>클래스 코드</Typography>
                        <Typography>{classData.code}</Typography>
                    </Box>
                    <Stack sx={{ mt: 2, flexDirection: 'column' }}>
                        <Typography variant='caption' sx={{ color: 'grey' }}>* 학생 초대에는 클래스 코드가 사용됩니다.</Typography>
                        <Typography variant='caption' sx={{ color: 'grey' }}>* 클래스 참여 예정 학생에게 해당 코드를 공유해주세요.</Typography>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}