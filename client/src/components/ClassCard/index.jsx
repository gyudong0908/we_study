import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
