import { nanoid } from "nanoid";
import { polygon, centroid } from "@turf/turf";
import {
  Feature,
  FeatureCollectionType,
} from "../components/MapBox/MapBoxTypes.ts";

export const polygonFactory = (coordinates: number[][][], properties = {}, id = null): Feature => {
  const uuid = id || nanoid();

  return {
    id: uuid,
    type: "Feature",
    properties: properties,
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

export const extractDbObjectFromMapBoxObject = (
  mapboxObject: FeatureCollectionType,
  sessionId: string
) => {
  return mapboxObject?.features?.map((feature: Feature) => {
    return {
      coordinates: JSON.stringify(feature?.geometry?.coordinates),
      properties: JSON.stringify(feature?.properties),
      mapboxId: feature?.id,
      workSessionId: sessionId,
    };
  });
};
