import io from "socket.io-client";
import { TextField, Grid, Button, Typography, Box } from '@mui/material';
import { useRef, useEffect, useState } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function RightChat({content}){
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Typography sx={{backgroundColor: 'yellow', margin: '3px'}} variant = 'body1'>{content}</Typography>
        </Box>
    )
}

function LeftChat({content}){
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
         <Typography sx={{backgroundColor: 'yellow', margin: '3px'}} variant = 'body1'>{content}</Typography>
        </Box>
    )
}
export default function ChatDisplay({ name, rewind }) {
    const [contents, setContents] = useState([{content:'안녕',name:'leeDonggyu'},{content:'그래',name:'홍길동'} ]);
    const [sendData, setSendData] = useState('');
    const socket = useRef();
    useEffect(() => {
        const _socket = io.connect("http://localhost:8081");
        _socket.emit('joinroom', 1);
        socket.current = _socket;

        _socket.on('broadcast', function (data) {
            console.log(data);
            setContents(prevContents => [...prevContents, data]);
        });
    }, [])

    function send() {
        if (sendData !== '') {
            socket.current.emit('send', { chatUserId: 1, data: sendData });
        }
    }

    return (
        <>
            <ArrowBackRoundedIcon sx={{ cursor: 'pointer' }} onClick={rewind} />
            <div>{name}</div>
            {
                contents.map(data => {
                    console.log(data.content)
                return (
                    <>
                        {data.name === 'leeDonggyu' ? <RightChat content={data.content} /> : <LeftChat content={data.content} />}
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