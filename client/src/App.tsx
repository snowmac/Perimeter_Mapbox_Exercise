import { useQuery, useMutation } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MapBox from "@components/MapBox/MapBox.tsx";
import Controls from "@components/Controls/Controls";
import { queries, mutations } from "@src/graphql";
import { useState } from "react";
import { useWorkSession } from "@src/hooks/useWorkSession.ts"; 

// should wrap all this logic into a service
// should wrap this out of app and into a separate HOC
export default function App() {
  const sessionId = useWorkSession(); 
  const [showControls, setShowControls] = useState(false);
  // the polygon exists on the map but does not exist in the DB yet
  const [unsavedPolygons, setUnsavedPolygons] = useState([]);

  const [savePolygon] = useMutation(mutations.CREATE_POLYGON);

  // get any existing polygons
  const { data: existingPolygons } = useQuery(queries.GET_ALL_BY_SESSION_ID, {
    variables: {
      sessionId,
    },
  });

  // we created one but not given it any name / saved it.
  // its in a todo state
  const onCreate = (item: any) => {
    console.log(JSON.stringify(item))
    
  };

  const onUpdate = (item: any) => {
    alert("onUpdate!");
    console.log(item);
  };
  const onDelete = (item: any) => {
    alert("onDelete!");
    console.log(item);
  };

  const clearPoints = (item: any) => {};

  const onSave = async (item: any) => {
    try {
      const { data } = await savePolygon({
        variables: {
          workSessionId: sessionId,
          name: item.name,
          coordinates: createdButNotSavedPolygon,
          properties: createdButNotSavedPolygon,
          mapboxId: createdButNotSavedPolygon, 
        },
      });
      console.log("Polygon saved:", data);
      // Reset the createdButNotSavedPolygon state
      setCreatedButNotSavedPolygon({});
    } catch (error) {
      console.error("Error saving polygon:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <MapBox
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          data={existingPolygons}
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
