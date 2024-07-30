import { Box, Container, TextField, Snackbar, Button } from "@mui/material";
import { Check as CheckIcon } from '@mui/icons-material';
import { useState } from "react";

const ShareLink = ({ shareUrl }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setOpenSnackbar(true);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container sx={{ py: 1, px: 1 }}>
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    fontFamily: 'Monaco, monospace',
                    fontSize: '14px',
                    overflowX: 'auto',
                    position: 'relative'
                }}
                onClick={handleCopy}
            >
                <TextField
                    value={shareUrl}
                    multiline
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                        sx: {
                            '& textarea': {
                                fontFamily: 'Monaco, monospace',
                                fontSize: 'inherit',
                                whiteSpace: 'pre'
                            }
                        }
                    }}
                    rows={1}
                />
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    message="Copied to clipboard!"
                    action={
                        <Button color="inherit" onClick={handleCloseSnackbar}>
                            <CheckIcon />
                        </Button>
                    }
                />
            </Box>
        </Container>
    )
}

export default ShareLink; 