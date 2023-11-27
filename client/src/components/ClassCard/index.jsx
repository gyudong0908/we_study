import { Stack, Card, CardContent, Typography } from '@mui/material';

export default function ClassCard({ title, section, description }) {

  return (
    <Card variant="outlined" sx={{ px: 2, py: 4 }}>
        <CardContent>
          <Stack direction='row' sx={{width:'100%', justifyContent:'space-between',}}>
            <Stack sx={{width:'45%', justifyContent:'center'}}>
              <Typography variant="h4" component="p" sx={{textAlign:'center', mb:2, wordBreak:'keep-all',}}>{title}</Typography>
              <Typography variant='h5' sx={{textAlign:'center', color:'#757575'}}>🧑‍🏫 {section}</Typography>  
            </Stack>
        <Stack direction='column' sx={{width:'45%', justifyContent:'center'}}>
          <Stack sx={{mb:2}}>
            <Typography variant='subtitle1' sx={{color:'#757575',}}>📌 클래스 소개</Typography>
          </Stack>
          <Stack >
            <Typography variant='subtitle1' sx={{wordBreak:'keep-all',}}>{description}</Typography>
          </Stack>

        </Stack>  
        </Stack>
        </CardContent>
   
    </Card>
  );
}
