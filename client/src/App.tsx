import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MapBox from "@components/MapBox/MapBox.tsx";
import Controls from "@components/Controls/Controls";
import { queries } from "@src/graphql";
import { getSessionID } from "@utils/util.ts";

export default function App() {
  const sessionId = getSessionID();
  const { data } = useQuery(queries.GET_ALL_BY_SESSION_ID, {
    variables: {
      sessionId,
    },
  });

  const onCreate = (item: any) => {
    console.log(item);
  };
  const onUpdate = (item: any) => {
    console.log(item);
  };
  const onDelete = (item: any) => {
    console.log(item);
  };

  const clearPoints = (item: any) => {};
  const onSave = (item: any) => {
    console.log(item);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <MapBox
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          data={data}
        />
        <Controls
          sessionId={sessionId}
          clearPoints={clearPoints}
          onSave={onSave}
        />
      </Box>
    </Container>
  );
}
