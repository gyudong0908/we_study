import {Card, CardContent, TextField, Stack, Typography, Box, Switch} from '@mui/material';

export default function SettiingAlarm(){
    return(
        <Card sx={{ maxWidth: '1500px' }}>
            <CardContent>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>265기 Node.js 기반 DevOps 개발자 양성 과정 | 이창현</Typography>
                <Switch defaultChecked />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography>2023 OUTTA 부트캠프 데이터반 | OUTTA</Typography>
                <Switch defaultChecked />
            </Box>
            </CardContent>

        </Card>
    )
}