import { makeExecutableSchema } from "@graphql-tools/schema";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  getAllPolygonsBySession,
  getOnePolygon,
  createPolygon,
  updatePolygon,
  deletePolygon,
} from "./polygon.service";

test("getAllPolygonsBySession should return an array of polygons", async () => {
  const sessionId = "session123";
  const polygons = await getAllPolygonsBySession(null, { sessionId });
  expect(Array.isArray(polygons)).toBe(true);
});

test("getOnePolygon should return a single polygon", async () => {
  const id = 1;
  const polygon = await getOnePolygon(null, { id });
  expect(polygon).toBeDefined();
});

test("createPolygon should create a new polygon", async () => {
  const polygonData = {
    name: "Polygon 1",
    coordinates: "...",
    properties: {},
    mapboxId: "mapbox123",
    workSessionId: "session123",
  };
  const createdPolygon = await createPolygon(null, polygonData);
  expect(createdPolygon).toBeDefined();
});
