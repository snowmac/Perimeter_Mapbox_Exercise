import { nanoid } from "nanoid";
import { polygon, centroid } from "@turf/turf";
import { Feature } from "../components/MapBox/MapBoxTypes.ts";

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