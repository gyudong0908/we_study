import { Stack, Button, styled,Typography, Box } from "@mui/material"
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { createRef, useEffect, useState } from "react";
export default function CalenderPage() {
    const [calendarDate, setCalendarDate] = useState(new Date());

    const template = {
            monthGridHeader(model) {
                const date = parseInt(model.date.split('-')[2], 10);                  
                return <span style={{margin: "15px"}}>{date}</span>;
              },
              monthDayName(model) {
                return <div style={{fontSize: "20pt", fontWeight: 'bold'}}>{model.label}</div>;
              },       
              monthMoreTitleDate(moreTitle) {
                const { date } = moreTitle;          
                return `<span>${date}</span>`;
              },              
                           
    }

    const MoveButton = styled(Button)(({ theme }) => ({
        margin : '10px',
        borderRadius : '20px',
        background: 'none',
        color : 'black',
        fontSize: '30pt'
      }));

    const calendarRef = createRef();
    let items = [];
    const myEvent = [
        {
            "kind": "calendar#event",
            "etag": "\"3361384297940000\"",
            "id": "698ncij21h77rg7rm1aou5fedo",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=Njk4bmNpajIxaDc3cmc3cm0xYW91NWZlZG8gMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T10:55:48.000Z",
            "updated": "2023-04-05T10:55:48.970Z",
            "summary": "최종 발표",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-05-17"
            },
            "end": {
                "date": "2023-05-18"
            },
            "transparency": "transparent",
            "iCalUID": "698ncij21h77rg7rm1aou5fedo@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361384426764000\"",
            "id": "73t2bn3j1kledm9lh6bsma5uci",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=NzN0MmJuM2oxa2xlZG05bGg2YnNtYTV1Y2kgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T10:56:43.000Z",
            "updated": "2023-04-05T10:56:53.382Z",
            "summary": "발표 준비",
            "colorId": "4",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-05-11"
            },
            "end": {
                "date": "2023-05-17"
            },
            "transparency": "transparent",
            "iCalUID": "73t2bn3j1kledm9lh6bsma5uci@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361384526990000\"",
            "id": "7gajtb0hg339e2lmcpphiq4ks1",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=N2dhanRiMGhnMzM5ZTJsbWNwcGhpcTRrczEgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T10:57:43.000Z",
            "updated": "2023-04-05T10:57:43.495Z",
            "summary": "기획 및 설계",
            "colorId": "5",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-04-05"
            },
            "end": {
                "date": "2023-04-12"
            },
            "transparency": "transparent",
            "iCalUID": "7gajtb0hg339e2lmcpphiq4ks1@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361385260720000\"",
            "id": "731g32ga882j5l1drodko6i2le",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=NzMxZzMyZ2E4ODJqNWwxZHJvZGtvNmkybGUgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T11:03:50.000Z",
            "updated": "2023-04-05T11:03:50.360Z",
            "summary": "DB 구현 및  스터디",
            "colorId": "1",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-04-05"
            },
            "end": {
                "date": "2023-04-12"
            },
            "transparency": "transparent",
            "iCalUID": "731g32ga882j5l1drodko6i2le@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361385390048000\"",
            "id": "3be1c0hvotnujbu7m8iiosn5ei",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=M2JlMWMwaHZvdG51amJ1N204aWlvc241ZWkgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T11:04:55.000Z",
            "updated": "2023-04-05T11:04:55.024Z",
            "summary": "프로트",
            "colorId": "7",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-04-12"
            },
            "end": {
                "date": "2023-05-03"
            },
            "transparency": "transparent",
            "iCalUID": "3be1c0hvotnujbu7m8iiosn5ei@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361385525698000\"",
            "id": "5a0bcjngk01g0fafbuk1t1fq2r",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=NWEwYmNqbmdrMDFnMGZhZmJ1azF0MWZxMnIgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T11:06:02.000Z",
            "updated": "2023-04-05T11:06:02.849Z",
            "summary": "통합 및 테스트",
            "colorId": "11",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-05-03"
            },
            "end": {
                "date": "2023-05-11"
            },
            "transparency": "transparent",
            "iCalUID": "5a0bcjngk01g0fafbuk1t1fq2r@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3361481868180000\"",
            "id": "1g49kfkh0qi66lhu78adbhj766",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=MWc0OWtma2gwcWk2NmxodTc4YWRiaGo3NjYgMTExZDNiNTJiMDQyNDU3Mjc3NzM4ZTY0Mzc2MThiNzViNzNmZDA3YWYxZjY0NzU0Mzg4OWVkMjBiM2E2YThlMEBn",
            "created": "2023-04-05T11:05:22.000Z",
            "updated": "2023-04-06T00:28:54.090Z",
            "summary": "백엔드",
            "colorId": "6",
            "creator": {
                "email": "hny20210204@gmail.com"
            },
            "organizer": {
                "email": "111d3b52b042457277738e6437618b75b73fd07af1f647543889ed20b3a6a8e0@group.calendar.google.com",
                "displayName": "AgileProject",
                "self": true
            },
            "start": {
                "date": "2023-04-12"
            },
            "end": {
                "date": "2023-05-03"
            },
            "transparency": "transparent",
            "iCalUID": "1g49kfkh0qi66lhu78adbhj766@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        }
    ]

    function changeEvent() {
        myEvent.map((data, idx) => {
            items.push({
                id: idx,
                calendarId: '0',
                title: data.summary,
                start: data.start.date,
                end: data.end.date,
                isAllday: true,
                category: 'allday',
                isReadOnly: true,
                color: 'white',
                backgroundColor: 'none',
                borderColor: 'none',
                customStyle:{
                    color: 'white',
                    backgroundColor: '#0B8043',
                    borderRadius: '5px',
                    marginTop: '10px'
                }
            })
        })
    }
    changeEvent();

    function movePrev(){
        calendarRef.current.getInstance().prev();
        setCalendarDate((prevDate)=>{
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth()-1);
            return newDate;})
    }
    function moveNext(){
        calendarRef.current.getInstance().next();
        setCalendarDate((prevDate)=>{
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth()+1);
            return newDate;})
    }
    function moveNow(){
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
                <Typography sx={{ fontSize: '30pt'}}>{calendarDate.getMonth()+1}月  {calendarDate.getFullYear()}</Typography>
                <MoveButton onClick={moveNext}>&gt;</MoveButton>
            </Stack>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={moveNow}>현재날짜로 돌아가기</Button>
            </Box>

            <Calendar
                ref={calendarRef}
                height="730px"
                calendars={[
                    {
                        id: '0',
                        name: 'dsadsadsa',
                        // color: 'blue',
                        // backgroundColor: 'blue',
                        // dragBackgroundColor: 'blue',
                        // borderColor: 'blue',
                    },
                ]}
                disableDblClick={true}
                disableClick={true}
                isReadOnly={false}
                events={items}
                timezones={[
                    {
                        timezoneOffset: 540,
                        displayLabel: 'GMT+09:00',
                        tooltip: 'Seoul'
                    }
                ]}
                theme={{
                    common: {
                        dayName: {
                          fontSize: '30pt',
                        },
                      },
                }}
                template= {template}
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