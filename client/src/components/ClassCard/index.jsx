import { Card, CardContent, Typography } from '@mui/material';

export default function ClassCard({ title, section }) {

  return (
    <Card variant="outlined" sx={{ px: 2, py: 4 }}>
      <CardContent>
        <Typography variant="h5" component="p" textAlign="center">
          {title}
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          {section}
        </Typography>        
      </CardContent>
    </Card>
  );
}
