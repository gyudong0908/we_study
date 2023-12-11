import io from "socket.io-client";
import { Button, Typography, Box, Stack, Avatar, InputBase } from '@mui/material';
import { useRef, useEffect, useState } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useSelector } from 'react-redux';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from 'axios';
import dayjs from 'dayjs';

function RightChat({ content, createdAt }) {
    return (
        <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: '10px' }}>
                <Typography variant='caption' sx={{ marginTop: '12px' }}>{dayjs(createdAt).format('h:mmA')}</Typography>
                <Typography sx={{ 
                    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
                    backgroundColor:'#00a5ff',
                    margin: '1px 1px 1px 5px', 
                    maxWidth: 270, 
                    borderBottomLeftRadius: '8px', 
                    borderTopLeftRadius: '8px', 
                    borderTopRightRadius: '8px', 
                    padding: '0.5rem',
                    color:'navy'
                    }} 
                    variant='body1'>{content}</Typography>
            </Box>
        </Stack>
    )
}

function LeftChat({ content, user, createdAt }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: '10px' }}>
            <Avatar sx={{ height: '2rem', width: '2rem', marginBottom:'10px' }} src={user.downloadPath} />
            <Stack>
                <Typography sx={{
                    ml:'5px'
                }}
                variant="caption">{user.nickName}</Typography>
                <Typography sx={{
                    borderBottomRightRadius: '8px',
                    borderTopRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    padding: '0.5rem',
                    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.2)',
                    backgroundColor:'white',
                    margin: '3px 5px 1px 5px', 
                    maxWidth: 270 
                }} 
                variant='body1'>{content}</Typography>
            </Stack>
            <Typography variant='caption' sx={{ marginTop: '12px' }}>{dayjs(createdAt).format('h:mm A')}</Typography>
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
        axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/chatMessages?chatId=${classChatId}`, { withCredentials: true }).then((response) => {
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
                    <Stack>
                        <Stack direction='row' sx={{mb:2}}>
                            <ArrowBackRoundedIcon sx={{ cursor: 'pointer',  }} onClick={() => { rewind(); }} />
                            <Stack sx={{
                                alignItems:'center',
                                justifyContent:'center',
                                width:'21rem'}}>
                                <Typography variant="h5" sx={{fontWeight:'bold', }}>{chatTitle}</Typography> 
                            </Stack>
                        </Stack>
                            
                        <Stack
                            ref={stackRef}
                            sx={{ 
                                overflowY: 'auto',
                                height: '350px',
                                mb:1,
                                padding:'0.5rem',
                                overflowWrap:'break-word',
                            }}>
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
                            <Stack
                                sx={{
                                    width:'300px',
                                    height:'6rem',
                                    whiteSpace:'pre-line',
                                    overflowY:'auto',
                                    wordBreak:'break-all',
                                    mr:1
                                }}
                            >
                                <InputBase
                                    placeholder="입력하세요"
                                    onChange={(e) => { setSendData(e.target.value) }}
                                    value={sendData}
                                    onKeyPress={(e) => {if (e.key === 'Enter') { send() } }}
                                    fullWidth
                                    multiline
                                />
                            </Stack>
                            <Button
                                variant="outlined"
                                onClick={send}
                                sx={{
                                    height:"3rem",
                                    width:'3rem',
                                    justifyContent:'center',
                                    alignItems:'center',
                                }}>
                                <SendRoundedIcon />
                            </Button>
                        </Box >
                    </Stack> : null
            }
        </>
    )
}