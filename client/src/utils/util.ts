import { useMutation } from "@apollo/client";
import { nanoid } from "nanoid";
import { polygon, centroid } from "@turf/turf";
import Cookies from 'js-cookie'
import { Feature } from "../components/MapBox/MapBoxTypes.ts";
import { mutations } from "@graphql";

export const polygonFactory = (coordinates: number[][][]): Feature => {
  const uuid = nanoid();

  return {
    id: uuid,
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: coordinates,
      type: "Polygon",
    },
  };
};

export const labelPolygon = (
  coordinates: number[][][],
  label: string
): Feature => {
  const uuid = nanoid();

  // convert to a standard polygon so we can get the center item
  const poly = polygon(coordinates);

  // get the center point so we can stick a label onto it
  const centerPoints = centroid(poly);

  return {
    id: uuid,
    type: "Feature",
    properties: {
      description: label,
    },
    geometry: {
      coordinates: centerPoints.geometry.coordinates,
      type: "Point",
    },
  };
};

export const getSessionID = () => {
  const cName = 'work-session-id'; 
  const cookieValue = Cookies.get(cName);
  if(cookieValue) {
    return cookieValue;
  } else {
    const sessionId = useMutation(mutations.INIT_WORK_SESSION);
    Cookies.set(cName, sessionId);
    return sessionId;
  }
};
