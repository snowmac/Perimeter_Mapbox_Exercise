import { Button, Container, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useState } from "react";
import ShareLink from "./ShareLink.tsx";

const ControlButton = styled(Button)`
  margin-left: 1.2rem;
`;

const Controls = ({ sessionId, onSave, name = "" }) => {
  const [nameChanged, setNameChanged] = useState(name);
  const [showShareLink, setShowShareLink] = useState(false);
  
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.append("sessionId", sessionId);

  const handleSave = () => {
    if (nameChanged) {
      onSave({
        // how to get and pass coordinates???
        name: nameChanged,
        sessionId,
      });
    }
  };

  return (
    <Container sx={{ padding: 1 }}>
      <Input
        name="polyName"
        onChange={(e) => setNameChanged(e.target.value)}
        value={nameChanged}
      />

      <ControlButton variant="outlined" onClick={handleSave}>
        Save
      </ControlButton>

      <ControlButton
        variant="outlined"
        onClick={() => setShowShareLink(!showShareLink)}
      >
        <IosShareIcon />
      </ControlButton>

      {showShareLink && (
        <Container sx={{ py: 1, px: 1 }}>
          <ShareLink shareUrl={shareUrl} />
        </Container>
      )}
    </Container>
  );
};

export default Controls;
