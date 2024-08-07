import { useQuery, useMutation } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MapBox from "@components/MapBox/MapBox.tsx";
import Controls from "@components/Controls/Controls";
import { queries, mutations } from "@src/graphql";
import { useState } from "react";
import { useWorkSession } from "@src/hooks/useWorkSession.ts"; 
import { extractDbObjectFromMapBoxObject } from "@utils/util";

// should wrap all this logic into a service
// should wrap this out of app and into a separate HOC
export default function App() {
  const sessionId = useWorkSession(); 
  const [showControls, setShowControls] = useState(false);
  // the polygon exists on the map but does not exist in the DB yet
  const [unsavedPolygons, setUnsavedPolygons] = useState<any[]>([]);

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
    setUnsavedPolygons(extractDbObjectFromMapBoxObject(item, sessionId));    
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
    // mapbox allows you to create more then 1 polygon in the map. 
    // we currently don't support select polygon then name it. 
    // so for now we take the polygon created, the first one
    // and save that to the DB, so if you have Two polygons unsaved, only the first will get the name
    // the other won't be saved :/ 
    // probably a bad design
    // TODO: Tech debt- allow to select polygon then name it
    const polygon = unsavedPolygons[0];
    try {
      const { data } = await savePolygon({
        variables: {
            workSessionId: sessionId,
            name: item.name,
            coordinates: polygon.coordinates,
            properties: polygon.properties,
            mapboxId: polygon.mapboxId, 
        },
      });
      console.log("Polygon saved:", data);
      setUnsavedPolygons([]);
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
