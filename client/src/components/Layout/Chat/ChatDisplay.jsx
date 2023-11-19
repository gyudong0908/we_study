import io from "socket.io-client";
import { TextField, Grid, Button, Typography, Box } from '@mui/material';
import { useRef, useEffect, useState } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useSelector } from 'react-redux';
import axios from 'axios';

function RightChat({ content }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography sx={{ backgroundColor: 'yellow', margin: '3px', border: '1px solid black', borderRadius: '2px' }} variant='body1'>{content}</Typography>
        </Box>
    )
}

function LeftChat({ content }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography sx={{ backgroundColor: 'yellow', margin: '3px', border: '1px solid black', borderRadius: '2px' }} variant='body1'>{content}</Typography>
        </Box>
    )
}
export default function ChatDisplay({ rewind, value, classChatId, chatTitle, chatUserId, socket }) {
    const [contents, setContents] = useState([]);
    const [sendData, setSendData] = useState('');
    const user = useSelector(state => state.userData);
    const state = value === 0 ? 'classChat' : 'individualChat';

    function getMessage() {
        axios.get(`http://localhost:8081/chatMessages?chatId=${classChatId}`, { withCredentials: true }).then((response) => {
            console.log(response);
            setContents(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        socket.emit('joinroom', state + classChatId);

        socket.on('broadcast', function (data) {
            console.log(data);
            setContents(prevContents => [...prevContents, { content: data.content, nickName: data.nickName }]);
        });
        getMessage();
    }, [])

    function send() {
        if (sendData !== '') {
            socket.emit('send', { chatUserId: chatUserId, data: sendData, chatId: classChatId, chatCode: state + classChatId, nickName: user.userData.nickName });
        }
    }

    return (
        <>
            <ArrowBackRoundedIcon sx={{ cursor: 'pointer' }} onClick={() => { rewind(); }} />
            <div>{chatTitle}</div>
            {
                contents.map(data => {
                    console.log(data.content)
                    return (
                        <>
                            {data.nickName === user.userData.nickName ? <RightChat content={data.content} /> : <LeftChat content={data.content} />}
                        </>
                    );
                })
            }
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        placeholder="입력하세요"
                        variant="filled"
                        size="small"
                        onChange={(e) => { setSendData(e.target.value) }}
                        value={sendData}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="success" onClick={send}>보내기</Button>
                </Grid>
            </Grid>
        </>

    )
}