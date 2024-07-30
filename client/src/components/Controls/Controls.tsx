import { Button, Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import IosShareIcon from '@mui/icons-material/IosShare';

const ControlButton = styled(Button)`
    margin-left: 1.2rem;
`;

const Controls = () => {
    return (
        <Container sx={{padding: 1}}>
            <ControlButton variant="outlined">View All</ControlButton>
            <ControlButton variant="outlined">Save</ControlButton>
            <ControlButton variant="outlined"><IosShareIcon/></ControlButton>
        </Container>
    )
}

export default Controls; 