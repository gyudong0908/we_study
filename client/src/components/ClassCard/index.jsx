// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ClassCard({ title, section }) {
  const {classId} = useParams();
  function attendance(){
    axios.post(`http://localhost:8081/attendance?classId=${classId}`,null,{ withCredentials: true }).then(()=>{
      alert('출석이 완료 되었습니다.');
    })
    .catch(err=>{
      console.log(err);
      alert('출석에 실패하였습니다.');
    })
  }
  return (
    <Card variant="outlined" sx={{ px: 2, py: 4 }}>
      <CardContent>
        <Typography variant="h5" component="p" textAlign="center">
          {title}
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          {section}
        </Typography>
        <Button onClick={attendance}>출석</Button>
      </CardContent>
    </Card>
  );
}
