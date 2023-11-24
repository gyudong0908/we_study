import { Stack, Button, styled, Typography, Box } from "@mui/material"
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { createRef, useEffect, useState } from "react";
import axios from 'axios';
export default function CalenderPage() {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [workData, setWorkData] = useState([]);
    const [ClassData, setClassData] = useState([]);
    const calendarRef = createRef();


    function getData(){
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/works/user`, { withCredentials: true }).then((response)=>{
            console.log(response.data)
            let items = [];
            let calendars = [];
            let classIds = [];
            response.data.map((data, idx) => {
                let colorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16)
                    items.push({
                        id: idx,
                        calendarId: data.id,
                        title: data['Curriculums.Works.title'],
                        start: data['Curriculums.Works.createdAt'],
                        end: data['Curriculums.Works.dueDateTime'],
                        isAllday: true,
                        category: 'allday',
                        isReadOnly: true,
                        color: 'white',
                        // backgroundColor: colorCode,
                        // borderColor: 'none',
                        customStyle: {
                            color: 'white',
                            // backgroundColor: 'none',
                            borderRadius: '5px',
                            marginTop: '10px'
                        }
                    })
                    if( !classIds.find((classId) => classId === data.id)){
                        calendars.push({
                            id: data.id,
                            name: data.title,
                            color: colorCode,
                            backgroundColor: colorCode,
                            dragBackgroundColor: colorCode,
                            borderColor: colorCode,
                        })
                        classIds.push(data.id);
                    }
                })
            setWorkData(items);
            setClassData(calendars);

        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getData();
    },[])

    const template = {
        monthGridHeader(model) {
            const date = parseInt(model.date.split('-')[2], 10);
            if (model.isToday) {
                return <span style={{ padding: "10px", backgroundColor: '#1A73E8', borderRadius: '20px' }} >{date}</span>
            } else {
                return <span style={{ margin: "15px" }}>{date}</span>;
            }
        },
        monthDayName(model) {
            return <div style={{ fontSize: "20pt", fontWeight: 'bold' }}>{model.label}</div>;
        },
        monthMoreTitleDate(moreTitle) {
            const { date } = moreTitle;
            return `<span>${date}</span>`;
        },

    }
    const theme = {
        common: {
            dayName: {
                fontSize: '30pt',
            },
        },
    }

    const MoveButton = styled(Button)(({ theme }) => ({
        margin: '10px',
        borderRadius: '20px',
        background: 'none',
        color: 'black',
        fontSize: '30pt'
    }));

    function movePrev() {
        calendarRef.current.getInstance().prev();
        setCalendarDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);
            return newDate;
        })
    }
    function moveNext() {
        calendarRef.current.getInstance().next();
        setCalendarDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);
            return newDate;
        })
    }
    function moveNow() {
        calendarRef.current.getInstance().today();
        setCalendarDate(new Date());
    }

    return (
        <Box sx={{
            marginTop: '70px',
            marginLeft: '270px',
            marginRight: '70px',
        }}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <MoveButton onClick={movePrev}>&lt;</MoveButton>
                <Typography sx={{ fontSize: '30pt' }}>{calendarDate.getMonth() + 1}月  {calendarDate.getFullYear()}</Typography>
                <MoveButton onClick={moveNext}>&gt;</MoveButton>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={moveNow}>현재날짜로 돌아가기</Button>
            </Box>

            <Calendar
                ref={calendarRef}
                height="730px"
                calendars={ClassData}
                disableDblClick={true}
                disableClick={true}
                isReadOnly={false}
                events={workData}
                timezones={[
                    {
                        timezoneOffset: 540,
                        displayLabel: 'GMT+09:00',
                        tooltip: 'Seoul'
                    }
                ]}
                theme={theme}
                template={template}
                useFormPopup
                useDetailPopup
                useCreationPopup
                view='month' // You can also set the `defaultView` option.
                month={{
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    // startDayOfWeek: 1, // 시작 요일 설정
                    // narrowWeekend: true, // 주말 작게 하기
                    // visibleWeeksCount: 1, // 보고 싶은 주의 수 정하기
                    // isAlways6Weeks: true,
                    // workweek: true, // 주말 빼기
                    visibleEventCount: 2, // 보고 싶은 이벤수 정하기
                }}
            />
        </Box>
    )
}