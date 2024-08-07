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
  // TODO: Stuff cookie name into config
  // undefined or string id
  const weHaveSessionCookie = Cookies.get("work-session-id");

  const [initWorkSession] = useMutation(mutations.INIT_WORK_SESSION);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: {
          createSession: { id: sessionId },
        },
      } = await initWorkSession();
      // TODO: wrap into something like a helper
      const in30Minutes = 1 / 48;
      Cookies.set("work-session-id", sessionId, { expires: in30Minutes });
      setSessionId(sessionId);
    };

    // undefined cookie, go get the data and set the session id
    if (!weHaveSessionCookie) {
      fetchData();
    } else {
      setSessionId(weHaveSessionCookie);
    }
  }, []);

  const { data: existingPolygons } = useQuery(queries.GET_ALL_BY_SESSION_ID, {
    variables: {
      sessionId,
    },
  });

  const onCreate = (item: any) => {
    alert("onCreate!");
    console.log(JSON.stringify(item));
    // const { data } = useMutation();
    console.log(sessionId);
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
  const onSave = (item: any) => {
    alert("onSave!");
    console.log(item);
  };

  return (
    <Container maxWidth="sm">
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
