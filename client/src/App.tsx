import { useQuery, useMutation } from "@apollo/client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MapBox from "@components/MapBox/MapBox.tsx";
import Controls from "@components/Controls/Controls";
import { queries, mutations } from "@src/graphql";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// should wrap all this logic into a service
// should wrap this out of app and into a separate HOC
export default function App() {
  const [sessionId, setSessionId] = useState("");
  const [showControls, setShowControls] = useState(false);
  // the polygon exists on the map but does not exist in the DB yet
  const [createdButNotSavedPolygon, setCreatedButNotSavedPolygon] = useState(
    {}
  );

  const weHaveSessionCookie = Cookies.get("work-session-id");
  const [initWorkSession] = useMutation(mutations.INIT_WORK_SESSION);
  const [savePolygon] = useMutation(mutations.CREATE_POLYGON);

  const searchParams = new URLSearchParams(window.location.search);
  const urlSessionId = searchParams.get("sessionId");

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          createSession: { id: sessionId },
        },
      } = await initWorkSession();
      // TODO: wrap into something like a helper
      const in30Minutes = 1 / 48;
      // I expire the cookie in 30 minutes for better / easier testing
      Cookies.set("work-session-id", sessionId, { expires: in30Minutes });
      setSessionId(sessionId);
    };

    // check if sessionId exists in the URL
    if (urlSessionId) {
      setSessionId(urlSessionId);
    } else {
      // undefined cookie, go get the data and set the session id
      if (!weHaveSessionCookie) {
        fetchData();
      } else {
        setSessionId(weHaveSessionCookie);
      }
    }
  }, []);

  // get any existing polygons
  const { data: existingPolygons } = useQuery(queries.GET_ALL_BY_SESSION_ID, {
    variables: {
      sessionId,
    },
  });

  // we created one but not given it any name / saved it.
  // its in a todo state
  const onCreate = (item: any) => {
    setCreatedButNotSavedPolygon(item);
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
          sessionId,
          polygon: item,
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
