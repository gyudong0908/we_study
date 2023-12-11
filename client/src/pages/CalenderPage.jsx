import { Stack, Button, styled, Typography, Box } from "@mui/material"
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { createRef, useEffect, useState } from "react";
import axios from 'axios';
export default function CalenderPage() {
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [itemData, setItemData] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const calendarRef = createRef();


    async function getData() {
        // async를 사용하여 요청을 2번 해서 받은 다음 어떻게 잘 분류해 보자
        const workResponse = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/works/user`, { withCredentials: true });
        const quizResponse = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/quizzes/user`, { withCredentials: true });
        const classesResponse = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/user/classes`, { withCredentials: true });
        const colorList = ['#C2FFB8','#E8887A','#FFC873','#FFF966','#6AE8DC','#C2A3FF','#FF99B3']

        let items = [];
        let calendars = [];
        workResponse.data.map((data, idx) => {
            items.push({
                id: idx,
                calendarId: data.id,
                title: '과제' + data['Curriculums.Works.title'],
                start: data['Curriculums.Works.createdAt'],
                end: data['Curriculums.Works.dueDateTime'],
                isAllday: true,
                category: 'allday',
                isReadOnly: true,
                color: 'black',
                // backgroundColor: colorCode,
                // borderColor: 'none',
                customStyle: {
                    color: 'white',
                    // backgroundColor: 'none',
                    borderRadius: '5px',
                    marginTop: '10px'
                }
            })
        })
        quizResponse.data.map((data, idx) => {
            items.push({
                id: idx,
                calendarId: data.id,
                title: '퀴즈' + data['Quizzes.title'],
                start: data['Quizzes.startDateTime'],
                end: data['Quizzes.dueDateTime'],
                isAllday: true,
                category: 'task',
                isReadOnly: true,
                color: 'black',
                // backgroundColor: colorCode,
                // borderColor: 'none',
                customStyle: {
                    color: 'white',
                    // backgroundColor: 'none',
                    borderRadius: '5px',
                    marginTop: '10px'
                }
            })
        })
        classesResponse.data.map((data,idx) => {
            const colorCode = colorList[idx % 7]
            calendars.push({
                id: data.id,
                name: data.title,
                color: colorCode,
                backgroundColor: colorCode,
                dragBackgroundColor: colorCode,
                borderColor: colorCode,
            })
        })
        setItemData(items);
        setCalendarData(calendars);
    }

    useEffect(() => {
        getData();
    }, [])

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
            // marginTop: '70px',
            // marginLeft: '270px',
            // marginRight: '70px',
            // marginTop: '100px',
            // marginLeft: '320px',
            // marginRight: '50px',
            // marginBottom: '150px',
            marginTop:'115px',
            marginLeft:'30rem',
            marginRight:'20rem',
            marginBottom:'10rem'
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
                height="630px"                
                calendars={calendarData}
                disableDblClick={true}
                disableClick={true}
                isReadOnly={true}
                events={itemData}
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
                    visibleEventCount: 1, // 보고 싶은 이벤수 정하기
                }}
            />
        </Box>
    )
}