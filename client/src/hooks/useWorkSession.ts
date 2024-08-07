import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { mutations } from "@src/graphql";

export function useWorkSession() {
  const [sessionId, setSessionId] = useState("");

  const weHaveSessionCookie = Cookies.get("work-session-id");
  const [initWorkSession] = useMutation(mutations.INIT_WORK_SESSION);

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

  return sessionId;
}
