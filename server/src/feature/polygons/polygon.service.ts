import { PrismaClient } from "@prisma/client";

// TODO: extract into reusable types
type IdField = {
  id: number;
};

type Polygon = {
  id: number;
  name: string;
  coordinates: string;
  properties: any;
  mapboxId: string;
  workSessionId: string;
  updatedAt: Date;
  createdAt: Date;
};

const prisma = new PrismaClient();

export const getAllPolygonsBySession = async (
  _,
  { sessionId }: { sessionId: string }
) => {
  return await prisma.polygon.findMany({
    where: { work_session_id: sessionId },
  });
};

export const getOnePolygon = async (_, { id }: IdField) => {
  return await prisma.polygon.findUnique({ where: { id: id } });
};

export const createPolygon = async (
  _,
  { name, coordinates, properties, mapboxId, workSessionId }: Polygon
) => {
  // Ensure that workSessionId is a valid value
  if (!workSessionId) {
    throw new Error("Invalid workSessionId");
  }

  return await prisma.polygon.create({
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
      mapbox_id: mapboxId,
      work_session_id: workSessionId,
      updated_at: new Date(),
      created_at: new Date(),
    },
  });
};

export const updatePolygon = async (
  _,
  { id, name, coordinates, properties, mapboxId }: Polygon
) => {
  return await prisma.polygon.update({
    where: { id },
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
      mapbox_id: mapboxId,
      updated_at: new Date(),
    },
  });
};

export const deletePolygon = async (_, { id }: { id: IdField }) => {
  let status = "deleted";

  try {
    await prisma.polygon.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting polygon:", error);
    status = "error";
  }

  return { status };
};
