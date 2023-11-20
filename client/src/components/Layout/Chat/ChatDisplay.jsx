import io from "socket.io-client";
import { TextField, Grid, Button, Typography, Box, Stack, Avatar } from '@mui/material';
import { useRef, useEffect, useState } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useSelector } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';

function RightChat({ content, createdAt }) {
    return (
        <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '10px' }}>
                <Typography variant='body2' sx={{ marginTop: '12px' }}>{dayjs(createdAt).format('h:mm:ss A')}</Typography>
                <Typography sx={{ backgroundColor: 'yellow', margin: '3px', border: '1px solid black', borderRadius: '2px', maxWidth: 270 }} variant='body1'>{content}</Typography>
            </Box>
        </Stack>
    )
}

function LeftChat({ content, user, createdAt }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: '10px' }}>
            <Avatar sx={{ height: 50, width: 50 }} src={user.downloadPath} />
            <Stack>
                <Typography>{user.nickName}</Typography>
                <Typography sx={{ backgroundColor: 'yellow', margin: '3px', border: '1px solid black', borderRadius: '2px', maxWidth: 270 }} variant='body1'>{content}</Typography>
            </Stack>
            <Typography variant='body2' sx={{ marginTop: '12px' }}>{dayjs(createdAt).format('h:mm:ss A')}</Typography>
        </Box>
    )
}
export default function ChatDisplay({ rewind, value, classChatId, chatTitle, chatUserId, socket }) {
    const [contents, setContents] = useState([]);
    const [sendData, setSendData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.userData);
    const stackRef = useRef(null);
    const state = value === 0 ? 'classChat' : 'individualChat';

    function getMessage() {
        axios.get(`http://localhost:8081/chatMessages?chatId=${classChatId}`, { withCredentials: true }).then((response) => {
            console.log(response.data)
            setContents(response.data);
            setIsLoading(true);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        socket.emit('joinroom', state + classChatId);
        socket.on('broadcast', function (data) {
            console.log(data.user)
            setContents(prevContents => [...prevContents, { createdAt: data.createdAt, content: data.content, user: data.user }]);
        });
        getMessage();
    }, [])

    useEffect(() => {
        if (stackRef.current) {
            stackRef.current.scrollTop = stackRef.current.scrollHeight;
        }
    }, [contents]);

    function send() {
        if (sendData !== '') {
            socket.emit('send', { chatUserId: chatUserId, data: sendData, chatId: classChatId, chatCode: state + classChatId, userId: user.userData.id });
            setSendData('');
        }
    }

    return (
        <>
            {
                isLoading ?
                    <>
                        <ArrowBackRoundedIcon sx={{ cursor: 'pointer' }} onClick={() => { rewind(); }} />
                        <Typography variant="h4">{chatTitle}</Typography>
                        <Stack
                            ref={stackRef}
                            sx={{ overflowY: 'auto', height: '330px', marginBottom: `10px`, borderBottom: '1px solid black' }}>
                            {
                                contents.map(data => {
                                    return (
                                        <>
                                            {
                                                data.user.id === user.userData.id ?
                                                    <RightChat content={data.content} createdAt={data.createdAt} /> :
                                                    <LeftChat content={data.content} user={data.user} createdAt={data.createdAt} />
                                            }
                                        </>
                                    );
                                })
                            }
                        </Stack>
                        <Box display='flex' alignItems='center'>
                            <Box flex={1}>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    placeholder="입력하세요"
                                    variant="filled"
                                    size="small"
                                    onChange={(e) => { setSendData(e.target.value) }}
                                    value={sendData}
                                    sx={{ width: '100%' }}
                                    onKeyUp={(e) => { if (e.key === 'Enter') { send() } }}
                                />
                            </Box>
                            <Box>
                                <Button variant="contained" color="success" onClick={send}>보내기</Button>
                            </Box>
                        </Box >
                    </> : null
            }
        </>
    )
}