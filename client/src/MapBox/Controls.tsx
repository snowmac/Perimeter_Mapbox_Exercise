import { Button, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

const ControlButton = styled(Button)`
    margin-left: 1.2rem;
`;

const Controls = () => {
    return (
        <Container sx={{padding: 1}}>
            <ControlButton variant="outlined">Hello World</ControlButton>
            <ControlButton variant="outlined">Hello World</ControlButton>
            <ControlButton variant="outlined">Hello World</ControlButton>
        </Container>
    )
}

export default Controls; 