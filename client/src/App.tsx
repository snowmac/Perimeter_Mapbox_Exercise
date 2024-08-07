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
  const [deletePolygon] = useMutation(mutations.DELETE_POLYGON);

  // get any existing polygons
  const { data: existingPolygons, loading } = useQuery(queries.GET_ALL_BY_SESSION_ID, {
    variables: {
      sessionId,
    },
  });

  if(loading) return <p>Loading...</p>;

  // we created one but not given it any name / saved it.
  // its in a todo state
  const onCreate = (item: any) => {
    setUnsavedPolygons([
      ...unsavedPolygons,
      ...extractDbObjectFromMapBoxObject(item, sessionId),
    ]);
    setShowControls(true);
  };

  const onUpdate = (item: any) => {
    const updatedItem = extractDbObjectFromMapBoxObject(item, sessionId);
    // we need to update the unsaved polygon
    unsavedPolygons.forEach((polygon, index) => {
      if (polygon.mapboxId === updatedItem[0].mapboxId) {
        unsavedPolygons[index] = updatedItem[0];
      }
    });
    setUnsavedPolygons(unsavedPolygons);
    setShowControls(true);
  };

  const onDelete = (item: any) => {
    console.log('Deleting:', item);
    const mapboxId = item.features[0].id;
    // delete the unsaved polygon if it exists
    const updatedUnsavedPolygons = unsavedPolygons.filter(
      (polygon) => polygon.mapboxId !== mapboxId
    );
    setUnsavedPolygons(updatedUnsavedPolygons);

    // delete the polygon from the DB
    deletePolygon({ variables: { id: mapboxId } });
  };

  const onSave = async (item: any) => {
    if (!unsavedPolygons.length) return;
    // mapbox allows you to create more then 1 polygon in the map.
    // we currently don't support select polygon then name it.
    // so for now we take the polygon created, the first one
    // and save that to the DB, so if you have Two polygons unsaved, only the first will get the name
    // the other won't be saved :/
    // probably a bad design
    // TODO: Tech debt- allow to select polygon then name it
    const polygon = unsavedPolygons[0];
    console.log(polygon);
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
        {showControls && <Controls sessionId={sessionId} onSave={onSave} />}
      </Box>
    </Container>
  );
}
