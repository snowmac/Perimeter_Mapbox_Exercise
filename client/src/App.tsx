import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MapBox from '@components/MapBox/MapBox.tsx';
import Controls from '@components/Controls/Controls';

export default function App() {
  const sessionId = ''; 


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <MapBox />
        <Controls sessionId={sessionId} />
      </Box>
    </Container>
  );
}