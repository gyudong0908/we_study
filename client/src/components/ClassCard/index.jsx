import { Stack, Card, CardContent, Typography } from '@mui/material';

export default function ClassCard({ title, section, description }) {

  return (
    <Card variant="outlined" sx={{ px: 2, py: 4 }}>
        <CardContent>
       
          <Stack>
          <Typography variant="h5" component="p" textAlign="center">
            {title}
          </Typography>
          <Typography color="text.secondary" textAlign="center">
            {section}
          </Typography>  
        </Stack>
        <Stack>
          <Typography variant='h6' textAlign='center'>{description}</Typography>
        </Stack>  
    
        </CardContent>
   
    </Card>
  );
}
